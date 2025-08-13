import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { 
  AlertDialog, 
  AlertDialogAction, 
  AlertDialogCancel, 
  AlertDialogContent, 
  AlertDialogDescription, 
  AlertDialogFooter, 
  AlertDialogHeader, 
  AlertDialogTitle, 
  AlertDialogTrigger 
} from '@/components/ui/alert-dialog';
import { Badge } from '@/components/ui/badge';
import { 
  LogOut, 
  Shield, 
  Clock, 
  User, 
  AlertTriangle,
  CheckCircle 
} from 'lucide-react';
import { useAuth, useSessionStatus } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

interface LogoutButtonProps {
  variant?: 'default' | 'outline' | 'ghost' | 'destructive';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  showText?: boolean;
  className?: string;
}

export function LogoutButton({ 
  variant = 'outline', 
  size = 'default', 
  showText = true,
  className = '' 
}: LogoutButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { logout, user } = useAuth();
  const { sessionTimeRemainingFormatted } = useSessionStatus();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      setIsLoading(true);
      await logout(true);
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const formatSessionTime = (minutes: number | null) => {
    if (!minutes) return 'Unknown';
    
    if (minutes < 60) {
      return `${minutes} min`;
    } else {
      const hours = Math.floor(minutes / 60);
      const remainingMinutes = minutes % 60;
      return `${hours}h ${remainingMinutes}m`;
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button 
          variant={variant} 
          size={size} 
          className={`transition-all duration-200 hover:scale-105 ${className}`}
          disabled={isLoading}
        >
          <LogOut className="h-4 w-4" />
          {showText && <span className="ml-2">Logout</span>}
        </Button>
      </AlertDialogTrigger>
      
      <AlertDialogContent className="max-w-md">
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-orange-500" />
            Confirm Logout
          </AlertDialogTitle>
          <AlertDialogDescription className="space-y-4">
            <div className="text-left">
              Are you sure you want to log out of your Dreams Wide admin account?
            </div>
            
            {/* User Info */}
            {user && (
              <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-ethiopian-green-100 rounded-full">
                    <User className="h-4 w-4 text-ethiopian-green-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{user.name}</p>
                    <p className="text-sm text-gray-600">{user.email}</p>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Shield className="h-4 w-4 text-blue-500" />
                    <span className="text-sm text-gray-600">Role:</span>
                  </div>
                  <Badge variant="outline" className="text-blue-600 border-blue-200">
                    {user.role}
                  </Badge>
                </div>
                
                {sessionTimeRemainingFormatted && (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-green-500" />
                      <span className="text-sm text-gray-600">Session:</span>
                    </div>
                    <Badge 
                      variant="outline" 
                      className={`${
                        sessionTimeRemainingFormatted < 30 
                          ? 'text-red-600 border-red-200' 
                          : 'text-green-600 border-green-200'
                      }`}
                    >
                      {formatSessionTime(sessionTimeRemainingFormatted)} remaining
                    </Badge>
                  </div>
                )}
              </div>
            )}
            
            {/* Warning */}
            <div className="bg-orange-50 border border-orange-200 rounded-lg p-3">
              <div className="flex items-start gap-2">
                <AlertTriangle className="h-4 w-4 text-orange-600 mt-0.5" />
                <div className="text-sm text-orange-800">
                  <p className="font-medium mb-1">Before you logout:</p>
                  <ul className="list-disc list-inside space-y-1 text-xs">
                    <li>Save any unsaved changes</li>
                    <li>Your session will be terminated</li>
                    <li>You'll need to login again to access admin features</li>
                  </ul>
                </div>
              </div>
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        
        <AlertDialogFooter className="gap-2">
          <AlertDialogCancel className="hover:bg-gray-100">
            <CheckCircle className="h-4 w-4 mr-2" />
            Stay Logged In
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={handleLogout}
            disabled={isLoading}
            className="bg-red-600 hover:bg-red-700 text-white"
          >
            <LogOut className="h-4 w-4 mr-2" />
            {isLoading ? 'Logging out...' : 'Logout'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

// Quick logout button without confirmation (for emergency use)
export function QuickLogoutButton({ className = '' }: { className?: string }) {
  const [isLoading, setIsLoading] = useState(false);
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleQuickLogout = async () => {
    try {
      setIsLoading(true);
      await logout(false); // Silent logout
      navigate('/');
    } catch (error) {
      console.error('Quick logout error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      onClick={handleQuickLogout}
      disabled={isLoading}
      variant="ghost"
      size="sm"
      className={`text-red-600 hover:text-red-700 hover:bg-red-50 ${className}`}
    >
      <LogOut className="h-3 w-3 mr-1" />
      {isLoading ? 'Logging out...' : 'Quick Logout'}
    </Button>
  );
}

// Session status indicator
export function SessionStatusIndicator() {
  const { sessionTimeRemainingFormatted } = useSessionStatus();
  const { refreshSession } = useAuth();

  if (!sessionTimeRemainingFormatted) return null;

  const isExpiringSoon = sessionTimeRemainingFormatted < 30;

  return (
    <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs ${
      isExpiringSoon 
        ? 'bg-red-100 text-red-700 border border-red-200' 
        : 'bg-green-100 text-green-700 border border-green-200'
    }`}>
      <Clock className="h-3 w-3" />
      <span>Session: {Math.ceil(sessionTimeRemainingFormatted)} min</span>
      {isExpiringSoon && (
        <Button
          onClick={refreshSession}
          size="sm"
          variant="ghost"
          className="h-5 px-2 text-xs"
        >
          Extend
        </Button>
      )}
    </div>
  );
}
