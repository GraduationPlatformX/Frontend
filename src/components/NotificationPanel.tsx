import { useEffect, useState } from "react";
import {
  Bell,
  MessageSquare,
  UserPlus,
  FileText,
  Calendar,
  Users,
} from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Card } from "./ui/card";
import { NotificationType } from "../types";
import { formatRelativeTime } from "../lib/utils";
import { useNotifications } from "@/hooks";



export function NotificationPanel() {
  const {
    refetch,
    notifications,
    loading,
    // error,
    markAllAsRead,
    markAsRead,
    unreadCount,
  } = useNotifications();
  const [isOpen, setIsOpen] = useState(false);

  

   useEffect(() => {
      refetch();
  }, []);

  

  const getNotificationIcon = (type?: NotificationType) => {
    switch (type) {
      case "COMMENT":
        return <MessageSquare className="h-4 w-4 text-blue-500" />;
      case "REQUEST":
        return <UserPlus className="h-4 w-4 text-purple-500" />;
      case "SUBMISSION":
        return <FileText className="h-4 w-4 text-green-500" />;
      case "MILESTONE":
        return <Calendar className="h-4 w-4 text-orange-500" />;
      case "GROUP":
        return <Users className="h-4 w-4 text-indigo-500" />;
      default:
        return <Bell className="h-4 w-4" />;
    }
  };

  return (
    <div className="relative">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => {
          setIsOpen(!isOpen);
          
        }}
        className="relative"
      >
        <Bell className="h-5 w-5" />
        {unreadCount > 0 && (
          <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center text-xs">
            {unreadCount}
          </Badge>
        )}
      </Button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />
          <Card className="absolute right-0 top-12 w-80 z-20 max-h-96 overflow-y-auto">
            <div className="p-4 border-b border-gray-200 flex items-center justify-between">
              <h3 className="font-semibold">Notifications</h3>
              {unreadCount > 0 && (
                <Button variant="link" size="sm" onClick={markAllAsRead}>
                  Mark all as read
                </Button>
              )}
            </div>
            <div className="divide-y divide-gray-200">
              {loading ? (
                <div className="p-8 text-center text-gray-500">
                  <span>Please wait...</span>
                </div>
              ) : notifications.length === 0 ? (
                <div className="p-8 text-center text-gray-500">
                  <Bell className="h-12 w-12 mx-auto mb-2 opacity-20" />
                  <p>No notifications</p>
                </div>
              ) : (
                notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`p-4 cursor-pointer hover:bg-gray-50 ${
                      !notification.seen ? "bg-blue-50" : ""
                    }`}
                    onClick={() => markAsRead(notification.id.toString())}
                  >
                    <div className="flex gap-3">
                      <div className="mt-0.5">
                        {getNotificationIcon(notification.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm">{notification.message}</p>
                        <p className="text-xs text-gray-500 mt-1">
                          {formatRelativeTime(
                            notification.createdAt.toString()
                          )}
                        </p>
                      </div>
                      {!notification.seen && (
                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-1" />
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          </Card>
        </>
      )}
    </div>
  );
}
