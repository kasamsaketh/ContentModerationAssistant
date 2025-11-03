import { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { 
  HomeIcon, 
  ShieldCheckIcon, 
  ChartBarIcon,
  CogIcon,
  BookOpenIcon,
  ExclamationTriangleIcon
} from "@heroicons/react/24/outline";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

interface DashboardLayoutProps {
  children: ReactNode;
}

const navigation = [
  { name: 'Overview', href: '/dashboard', icon: HomeIcon },
  { name: 'Flagged Content', href: '/dashboard/flagged', icon: ExclamationTriangleIcon },
  { name: 'Analytics', href: '/dashboard/analytics', icon: ChartBarIcon },
  { name: 'Slang Dictionary', href: '/dashboard/dictionary', icon: BookOpenIcon },
  { name: 'Settings', href: '/dashboard/settings', icon: CogIcon },
];

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-background">
      <div className="flex">
        {/* Sidebar */}
        <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
          <Card className="flex-1 bg-gradient-card border-r border-border rounded-none">
            {/* Logo */}
            <div className="flex items-center h-16 px-6 border-b border-border">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-gradient-primary shadow-primary">
                  <ShieldCheckIcon className="h-6 w-6 text-primary-foreground" />
                </div>
                <div>
                  <h1 className="text-lg font-semibold text-card-foreground">
                    Content Moderator
                  </h1>
                  <p className="text-xs text-muted-foreground">AI Assistant</p>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-4 py-6 space-y-2">
              {navigation.map((item) => {
                const isActive = location.pathname === item.href;
                return (
                  <Link key={item.name} to={item.href}>
                    <Button
                      variant={isActive ? "default" : "ghost"}
                      className={cn(
                        "w-full justify-start gap-3 font-medium",
                        isActive && "bg-primary text-primary-foreground shadow-primary"
                      )}
                    >
                      <item.icon className="h-5 w-5" />
                      {item.name}
                    </Button>
                  </Link>
                );
              })}
            </nav>

            {/* Bottom Section */}
            <div className="px-4 pb-6">
              <Card className="p-4 bg-background border-border">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 rounded-full bg-gradient-success">
                    <ChartBarIcon className="h-4 w-4 text-success-foreground" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">System Status</p>
                    <p className="text-xs text-success">All systems operational</p>
                  </div>
                </div>
                <div className="text-xs text-muted-foreground">
                  <p>Accuracy: 94.2%</p>
                  <p>Processed: 1,247 today</p>
                </div>
              </Card>
            </div>
          </Card>
        </div>

        {/* Main content */}
        <div className="flex-1 md:pl-64">
          <main className="p-6">
            {children}
          </main>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-10">
        <Card className="rounded-none bg-gradient-card border-t border-border">
          <div className="flex justify-around py-2">
            {navigation.slice(0, 4).map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Link key={item.name} to={item.href} className="flex-1">
                  <Button
                    variant={isActive ? "default" : "ghost"}
                    size="sm"
                    className={cn(
                      "w-full flex-col h-auto py-2 px-1",
                      isActive && "bg-primary text-primary-foreground"
                    )}
                  >
                    <item.icon className="h-5 w-5 mb-1" />
                    <span className="text-xs">{item.name.split(' ')[0]}</span>
                  </Button>
                </Link>
              );
            })}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default DashboardLayout;