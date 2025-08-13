import { Router } from 'express';
import { db } from '../../lib/database';

const router = Router();

// Login endpoint
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Basic validation
    if (!email || !password) {
      return res.status(400).json({ 
        error: 'Email and password are required' 
      });
    }

    // Check for admin user
    if (email === 'admin@dreamswide.et' && password === 'admin123') {
      const admin = await db.admin.findByEmail(email);
      
      if (admin) {
        // Update login count and last login
        await db.admin.updateLogin(admin.id, req.ip);
        
        // Create session
        const sessionToken = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        const expiresAt = new Date(Date.now() + 8 * 60 * 60 * 1000); // 8 hours
        
        await db.session.create({
          userId: admin.id,
          token: sessionToken,
          expiresAt,
          userAgent: req.get('User-Agent'),
          ipAddress: req.ip,
        });

        res.json({
          success: true,
          user: {
            id: admin.id,
            email: admin.email,
            name: admin.name,
            role: admin.role,
            loginTime: new Date().toISOString(),
            sessionToken,
          }
        });
      } else {
        res.status(401).json({ error: 'Invalid credentials' });
      }
    } else {
      res.status(401).json({ error: 'Invalid credentials' });
    }
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Logout endpoint
router.post('/logout', async (req, res) => {
  try {
    const { sessionToken } = req.body;

    if (sessionToken) {
      // Delete session from database
      try {
        await db.session.deleteByToken(sessionToken);
      } catch (error) {
        // Session might not exist, that's okay
        console.log('Session not found or already deleted');
      }
    }

    res.json({ success: true, message: 'Logged out successfully' });
  } catch (error) {
    console.error('Logout error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Verify session endpoint
router.post('/verify', async (req, res) => {
  try {
    const { sessionToken } = req.body;

    if (!sessionToken) {
      return res.status(401).json({ error: 'No session token provided' });
    }

    const session = await db.session.findByToken(sessionToken);

    if (!session) {
      return res.status(401).json({ error: 'Invalid session' });
    }

    // Check if session is expired
    if (session.expiresAt < new Date()) {
      // Delete expired session
      await db.session.deleteByToken(sessionToken);
      return res.status(401).json({ error: 'Session expired' });
    }

    res.json({ success: true, valid: true });
  } catch (error) {
    console.error('Session verification error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get current user info
router.get('/me', async (req, res) => {
  try {
    const sessionToken = req.headers.authorization?.replace('Bearer ', '');

    if (!sessionToken) {
      return res.status(401).json({ error: 'No session token provided' });
    }

    const session = await db.session.findByToken(sessionToken);

    if (!session || session.expiresAt < new Date()) {
      return res.status(401).json({ error: 'Invalid or expired session' });
    }

    const admin = await db.admin.findByEmail('admin@dreamswide.et'); // Simplified for demo

    if (!admin) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({
      success: true,
      user: {
        id: admin.id,
        email: admin.email,
        name: admin.name,
        role: admin.role,
        lastLogin: admin.lastLogin,
        loginCount: admin.loginCount,
      }
    });
  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Clean up expired sessions (maintenance endpoint)
router.post('/cleanup', async (req, res) => {
  try {
    const result = await db.session.deleteExpired();
    res.json({ 
      success: true, 
      message: `Cleaned up ${result.count} expired sessions` 
    });
  } catch (error) {
    console.error('Cleanup error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
