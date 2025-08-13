import { PrismaClient } from '@prisma/client';

declare global {
  var __prisma: PrismaClient | undefined;
}

// Singleton pattern for Prisma client to avoid multiple instances
export const prisma = globalThis.__prisma || new PrismaClient({
  log: ['error'],
});

if (process.env.NODE_ENV !== 'production') {
  globalThis.__prisma = prisma;
}

// Database helper functions
export const db = {
  // User operations
  user: {
    async findByEmail(email: string) {
      return prisma.user.findUnique({
        where: { email },
      });
    },

    async create(data: {
      email: string;
      name: string;
      role?: 'USER' | 'MODERATOR' | 'ADMIN';
    }) {
      return prisma.user.create({
        data: {
          ...data,
          role: data.role || 'USER',
        },
      });
    },

    async updateLastActive(id: string) {
      return prisma.user.update({
        where: { id },
        data: { 
          lastActive: new Date(),
          loginCount: { increment: 1 },
        },
      });
    },
  },

  // Admin operations
  admin: {
    async findByEmail(email: string) {
      return prisma.admin.findUnique({
        where: { email },
      });
    },

    async create(data: {
      email: string;
      name: string;
      role?: 'SUPER_ADMIN' | 'ADMIN' | 'MODERATOR' | 'CONTENT_MANAGER';
    }) {
      return prisma.admin.create({
        data: {
          ...data,
          role: data.role || 'MODERATOR',
        },
      });
    },

    async updateLogin(id: string, ipAddress?: string) {
      return prisma.admin.update({
        where: { id },
        data: { 
          lastLogin: new Date(),
          loginCount: { increment: 1 },
        },
      });
    },
  },

  // Session operations
  session: {
    async create(data: {
      userId: string;
      token: string;
      expiresAt: Date;
      userAgent?: string;
      ipAddress?: string;
    }) {
      return prisma.session.create({ data });
    },

    async findByToken(token: string) {
      return prisma.session.findUnique({
        where: { token },
      });
    },

    async deleteByToken(token: string) {
      return prisma.session.delete({
        where: { token },
      });
    },

    async deleteExpired() {
      return prisma.session.deleteMany({
        where: {
          expiresAt: {
            lt: new Date(),
          },
        },
      });
    },

    async deleteAllForUser(userId: string) {
      return prisma.session.deleteMany({
        where: { userId },
      });
    },
  },

  // Job operations
  job: {
    async findMany(where?: any) {
      return prisma.job.findMany({
        where,
        include: {
          author: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
          _count: {
            select: {
              applications: true,
            },
          },
        },
        orderBy: { createdAt: 'desc' },
      });
    },

    async create(data: any) {
      return prisma.job.create({
        data,
        include: {
          author: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
        },
      });
    },

    async incrementViews(id: string) {
      return prisma.job.update({
        where: { id },
        data: { viewCount: { increment: 1 } },
      });
    },
  },

  // Content operations
  content: {
    async findMany(where?: any) {
      return prisma.content.findMany({
        where,
        include: {
          author: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
          _count: {
            select: {
              comments: true,
              likes: true,
            },
          },
        },
        orderBy: { createdAt: 'desc' },
      });
    },

    async create(data: any) {
      return prisma.content.create({
        data,
        include: {
          author: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
        },
      });
    },

    async incrementViews(id: string) {
      return prisma.content.update({
        where: { id },
        data: { views: { increment: 1 } },
      });
    },
  },

  // Analytics helper
  analytics: {
    async getStats() {
      const [
        totalUsers,
        totalJobs,
        totalContent,
        totalApplications,
        activeUsers,
      ] = await Promise.all([
        prisma.user.count(),
        prisma.job.count({ where: { status: 'PUBLISHED' } }),
        prisma.content.count({ where: { status: 'PUBLISHED' } }),
        prisma.jobApplication.count(),
        prisma.user.count({
          where: {
            lastActive: {
              gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // Last 30 days
            },
          },
        }),
      ]);

      return {
        totalUsers,
        totalJobs,
        totalContent,
        totalApplications,
        activeUsers,
      };
    },
  },
};

// Cleanup function
export async function disconnectDatabase() {
  await prisma.$disconnect();
}
