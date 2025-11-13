import { useState, useCallback, useEffect } from "react";
import { api, supabase } from "../services/api";
import { useAuth } from "@/contexts/AuthContext";
import { GroupChatMessage } from "@/types";

export function useMessages(groupId: number,chatId?:number) {
  const { user } = useAuth();
  const [messages, setMessages] = useState<GroupChatMessage[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const channel = supabase
      .channel("custom-messages-channel")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "group_chat_message",
          filter: `chatId=eq.${chatId}`,
        },
        async (payload: any) => {
          const msg = payload.new as GroupChatMessage;
          
           if(user?.id !== msg.senderId){
            const { data: sender } = await supabase
              .from("users")
              .select("id, name, email, role, createdAt, updatedAt")
              .eq("id", msg.senderId)
              .single();
              
            setMessages((prev: any) => [
              ...prev,
              { ...msg, sender }, // attach sender info
            ]);
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const getMessages = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await api.get<any>(`groups/${groupId}/messages?limit=${10}&page=${1}`);
      setMessages(response.data.data.messages);
      return response.data.data;
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.message || "Failed to fetch messages";
      setError(errorMessage);
      return [];
    } finally {
      setLoading(false);
    }
  }, [groupId]);

  const sendMessage = useCallback(
    async (message: GroupChatMessage) => {
      setLoading(true);
      setError(null);

      try {
        const response = await api.post<{
          success: boolean;
          data: GroupChatMessage;
        }>(`/groups/${groupId}/messages`, {
          content:message?.content,
        });
        const newMessage = response.data.data;
        return newMessage;
      } catch (err: any) {
        const errorMessage =
          err.response?.data?.message || "Failed to send message";
        setError(errorMessage);
        return null;
      } finally {
        setLoading(false);
      }
    },
    [groupId]
  );

  return {
    messages,
    loading,
    error,
    getMessages,
    sendMessage,
    setMessages,
  };
}
