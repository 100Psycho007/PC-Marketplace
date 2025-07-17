'use client';

import { useState, useEffect } from 'react';
// import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';

interface User {
  id: string;
  name: string;
  email: string;
  image?: string;
}

export default function ProfileClient() {
  // TODO: Replace with Neon Auth user/session
  const user: User = { id: 'mockUser', name: 'Mock User', email: 'mock@example.com' };
  const router = useRouter();
  // const [user, setUser] = useState<User | null>(null);
  // const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   if (status === 'loading') return;
  //   if (!session?.user) {
  //     router.push('/auth/signin');
  //     return;
  //   }
  //   setUser(session.user as User);
  //   setLoading(false);
  // }, [session, status, router]);

  // if (loading || status === 'loading') {
  //   return (
  //     <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
  //       <div className="backdrop-blur-xl bg-card/80 rounded-3xl p-8 border border-border shadow-2xl animate-pulse">
  //         <div className="h-32 w-32 bg-muted rounded-full mx-auto mb-6"></div>
  //         <div className="h-4 bg-muted rounded mb-2"></div>
  //         <div className="h-4 bg-muted rounded w-3/4"></div>
  //       </div>
  //       <div className="lg:col-span-2 backdrop-blur-xl bg-card/80 rounded-3xl p-8 border border-border shadow-2xl animate-pulse">
  //         <div className="h-4 bg-muted rounded mb-4"></div>
  //         <div className="h-4 bg-muted rounded mb-2"></div>
  //         <div className="h-4 bg-muted rounded w-3/4"></div>
  //       </div>
  //     </div>
  //   );
  // }

  // if (!user) {
  //   return null;
  // }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Profile Card */}
      <div className="backdrop-blur-xl bg-card/80 rounded-3xl p-8 border border-border shadow-2xl">
        <div className="text-center">
          <div className="relative mx-auto mb-6">
            <div className="h-32 w-32 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center text-4xl font-bold text-primary-foreground shadow-2xl">
              {user.name?.charAt(0).toUpperCase() || 'U'}
            </div>
            <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-success rounded-full border-4 border-background"></div>
          </div>
          
          <h2 className="text-2xl font-bold text-foreground mb-2">{user.name}</h2>
          <p className="text-muted-foreground mb-6">{user.email}</p>
          
          <div className="space-y-3">
            <Button className="w-full bg-gradient-to-r from-primary to-secondary text-primary-foreground font-semibold rounded-xl hover:from-primary/80 hover:to-secondary/80">
              Edit Profile
            </Button>
            <Button variant="outline" className="w-full border-border text-foreground hover:bg-muted/50">
              Change Password
            </Button>
          </div>
        </div>
      </div>

      {/* Profile Details */}
      <div className="lg:col-span-2 space-y-8">
        {/* Account Stats */}
        <div className="backdrop-blur-xl bg-card/80 rounded-3xl p-8 border border-border shadow-2xl">
          <h3 className="text-2xl font-bold text-foreground mb-6">Account Overview</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4 backdrop-blur-xl bg-muted rounded-2xl border border-border">
              <div className="text-3xl font-bold text-primary mb-2">12</div>
              <div className="text-muted-foreground">Active Listings</div>
            </div>
            <div className="text-center p-4 backdrop-blur-xl bg-muted rounded-2xl border border-border">
              <div className="text-3xl font-bold text-success mb-2">8</div>
              <div className="text-muted-foreground">Completed Sales</div>
            </div>
            <div className="text-center p-4 backdrop-blur-xl bg-muted rounded-2xl border border-border">
              <div className="text-3xl font-bold text-secondary mb-2">4.8</div>
              <div className="text-muted-foreground">Rating</div>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="backdrop-blur-xl bg-card/80 rounded-3xl p-8 border border-border shadow-2xl">
          <h3 className="text-2xl font-bold text-foreground mb-6">Recent Activity</h3>
          <div className="space-y-4">
            {[
              { action: 'Listed a new PC', time: '2 hours ago', type: 'listing' },
              { action: 'Received an offer', time: '1 day ago', type: 'offer' },
              { action: 'Completed a sale', time: '3 days ago', type: 'sale' },
              { action: 'Updated profile', time: '1 week ago', type: 'profile' }
            ].map((activity, index) => (
              <div key={index} className="flex items-center justify-between p-4 backdrop-blur-xl bg-muted rounded-xl border border-border">
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${
                    activity.type === 'listing' ? 'bg-primary' :
                    activity.type === 'offer' ? 'bg-warning' :
                    activity.type === 'sale' ? 'bg-success' : 'bg-secondary'
                  }`}></div>
                  <span className="text-foreground">{activity.action}</span>
                </div>
                <span className="text-muted-foreground text-sm">{activity.time}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Account Settings */}
        <div className="backdrop-blur-xl bg-card/80 rounded-3xl p-8 border border-border shadow-2xl">
          <h3 className="text-2xl font-bold text-foreground mb-6">Account Settings</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-2">Email Notifications</label>
                <div className="flex items-center space-x-3">
                  <input type="checkbox" className="w-4 h-4 text-primary bg-muted border-border rounded focus:ring-primary" defaultChecked />
                  <span className="text-foreground">Enabled</span>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-2">Two-Factor Auth</label>
                <div className="flex items-center space-x-3">
                  <input type="checkbox" className="w-4 h-4 text-success bg-muted border-border rounded focus:ring-success" />
                  <span className="text-foreground">Disabled</span>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <Button className="w-full bg-gradient-to-r from-primary to-secondary text-primary-foreground font-semibold rounded-xl hover:from-primary/80 hover:to-secondary/80">
                Download Data
              </Button>
              <Button variant="outline" className="w-full border-destructive/50 text-destructive hover:bg-destructive/10">
                Delete Account
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 