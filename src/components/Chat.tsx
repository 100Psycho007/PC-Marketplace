"use client";

import { useEffect, useState, useRef } from "react";
import { db } from "@/lib/firebase";
import {
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot,
  serverTimestamp,
} from "firebase/firestore";

interface Message {
  id: string;
  text: string;
  sender: string;
  createdAt: any;
}

interface ChatProps {
  roomId: string;
  user: { name: string; id: string };
}

export default function Chat({ roomId, user }: ChatProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const q = query(
      collection(db, "chats", roomId, "messages"),
      orderBy("createdAt", "asc")
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setMessages(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Message[]
      );
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    });
    return unsubscribe;
  }, [roomId]);

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    await addDoc(collection(db, "chats", roomId, "messages"), {
      text: input,
      sender: user?.name || "Anonymous",
      senderId: user?.id || "",
      createdAt: serverTimestamp(),
    });
    setInput("");
  };

  return (
    <div className="flex flex-col h-full border rounded shadow bg-white">
      <div className="flex-1 overflow-y-auto p-4">
        {messages.map((msg) => (
          <div key={msg.id} className="mb-2">
            <span className="font-bold">{msg.sender}: </span>
            <span>{msg.text}</span>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <form onSubmit={sendMessage} className="flex p-2 border-t">
        <input
          className="flex-1 border rounded px-2 py-1"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message…"
        />
        <button type="submit" className="ml-2 px-4 py-1 bg-blue-500 text-white rounded">
          Send
        </button>
      </form>
    </div>
  );
} 