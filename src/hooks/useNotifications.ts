import { useState, useCallback, useEffect } from "react";
import { api, supabase } from "../services/api";
import { Notification } from "../types";
import { useAuth } from "@/contexts/AuthContext";


export function useNotifications() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const {user} = useAuth()

  const getNotifications = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await api.get<{
        success: boolean;
        data: { notifications: Notification[] };
      }>("/notifications");
      setNotifications(response.data.data.notifications);
      return response.data.data;
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.error?.message || "Failed to fetch notifications";
      setError(errorMessage);
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  const markAsRead = useCallback(async (notificationId: string) => {
    try {
      const response = await api.put<{ success: boolean; data: Notification }>(
        `/notifications/${notificationId}/read`
      );
      setNotifications((prev) =>
        prev.map((n: any) => (n.id === notificationId ? response.data.data : n))
      );
      return response.data.data;
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.error?.message || "Failed to mark as read";
      setError(errorMessage);
      return null;
    }
  }, []);

  const markAllAsRead = useCallback(async () => {
    try {
      await api.patch("/notifications/mark-all-seen");
      setNotifications((prev) => prev.map((n) => ({ ...n, seen: true })));
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.message || "Failed to mark all as read";
      setError(errorMessage);
    }
  }, []);

  const unreadCount = notifications.filter((n) => !n.seen).length;

  

  useEffect(  () => {
      const channel = supabase
      .channel('custom-notifications-channel')
      .on( 
        'postgres_changes',
        { event: '*', schema: 'public', table: 'notifications' ,filter: `userId=eq.${user?.id}`},//,
        (payload) => {
          if(payload.eventType === 'INSERT'){
            console.log('Change received!', payload.new)
            setNotifications((prev) => [payload.new as Notification, ...prev]);
          }
        }
      )
      .subscribe()


              
// .on("presence", { event: "sync" }, () => {
//       console.log("Realtime connection working ✅");
//     })
//     .subscribe((status) => {
//       console.log("Realtime connection status:", status);
//     });
    return () => {
      supabase.removeChannel(channel)
    }
    }, []);

    async  function fetchInitialNotifications() {
       const  data  = await supabase
              .from("notifications")
              .select("id,  createdAt")
              .eq("id",4)
              .single();

              console.log(data);
    }
  
  return {
    notifications,
    loading,
    error,
    unreadCount,
    refetch: getNotifications,
    markAsRead,
    markAllAsRead,
  };
}
