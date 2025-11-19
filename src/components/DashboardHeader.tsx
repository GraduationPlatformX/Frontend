import { LogOut } from "lucide-react";
import { Button } from "./ui/button";
import { useAuth as AuthContext } from "../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { NotificationPanel } from "./NotificationPanel";
import { Avatar } from "./ui/avatar";

interface DashboardHeaderProps {
  title: string;
  icon: React.ReactNode;
}

export function DashboardHeader({ title, icon }: DashboardHeaderProps) {
  const { user ,logout} = AuthContext();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="border-b border-gray-200 bg-white">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link to={"/dashboard"}>{icon}</Link>
            <div>
              <h1 className="text-xl font-semibold">{title}</h1>
              <p className="text-sm text-gray-500">
                Welcome back, {user?.name}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <NotificationPanel />
            <Avatar name={user?.name} />
            <Button variant="outline" size="sm" onClick={handleLogout}>
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
