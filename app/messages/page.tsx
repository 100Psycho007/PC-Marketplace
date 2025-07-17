"use client";

import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { collection, query, where, getDocs, orderBy, limit, onSnapshot } from "firebase/firestore";
// import { useSession } from "next-auth/react";
import Chat from "@/components/Chat";

interface ChatRoom {
  id: string;
  participants: string[];
  listingId: string;
  lastMessage: string;
  lastMessageTime: any;
  otherUser: { id: string; name: string };
}

export default function MessagesPage() {
  // TODO: Replace with Neon Auth user/session
  const user = { id: "mockUser", name: "Mock User" };
  const [chatRooms, setChatRooms] = useState<ChatRoom[]>([]);
  const [selectedRoom, setSelectedRoom] = useState<ChatRoom | null>(null);

  useEffect(() => {
    // Listen for chat rooms where the user is a participant
    const q = query(collection(db, "chats"), where("participants", "array-contains", user.id));
    const unsubscribe = onSnapshot(q, async (snapshot) => {
      const rooms: ChatRoom[] = [];
      for (const doc of snapshot.docs) {
        const data = doc.data();
        // Get last message
        const messagesQ = query(collection(db, "chats", doc.id, "messages"), orderBy("createdAt", "desc"), limit(1));
        const messagesSnap = await getDocs(messagesQ);
        const lastMsgDoc = messagesSnap.docs[0];
        rooms.push({
          id: doc.id,
          participants: data.participants,
          listingId: data.listingId,
          lastMessage: lastMsgDoc?.data()?.text || "",
          lastMessageTime: lastMsgDoc?.data()?.createdAt || null,
          otherUser: { id: "otherUser", name: "Other User" }, // TODO: fetch real user info
        });
      }
      setChatRooms(rooms);
    });
    return unsubscribe;
  }, [user.id]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Messages</h1>
      <div className="bg-white rounded-lg shadow p-4">
        {chatRooms.length === 0 ? (
          <div className="text-muted-foreground">No conversations yet.</div>
        ) : (
          <ul>
            {chatRooms.map((room) => (
              <li key={room.id} className="border-b last:border-b-0 py-3 flex items-center justify-between cursor-pointer hover:bg-gray-50" onClick={() => setSelectedRoom(room)}>
                <div>
                  <div className="font-semibold">Chat with {room.otherUser.name}</div>
                  <div className="text-muted-foreground text-sm truncate max-w-xs">{room.lastMessage}</div>
                </div>
                <div className="text-xs text-muted-foreground">{room.lastMessageTime ? new Date(room.lastMessageTime.toDate?.() || room.lastMessageTime).toLocaleString() : ""}</div>
              </li>
            ))}
          </ul>
        )}
      </div>
      {/* Drawer for selected chat */}
      {selectedRoom && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/30" onClick={() => setSelectedRoom(null)}>
          <div className="w-full max-w-md h-full bg-white shadow-xl p-0 flex flex-col" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="text-lg font-bold">Chat with {selectedRoom.otherUser.name}</h2>
              <button onClick={() => setSelectedRoom(null)} className="text-muted-foreground hover:text-foreground">✕</button>
            </div>
            <div className="flex-1 overflow-y-auto">
              {/* Reuse Chat component */}
              <Chat roomId={selectedRoom.id} user={user} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 