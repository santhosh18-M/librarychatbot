import { useState, useRef, useEffect } from "react";
import { Send } from "lucide-react";
import { ChatMessage as ChatMsg } from "@/data/mockData";
import axios from "axios";
import { toast } from "sonner";

const API_URL = "http://localhost:5000/api/chat";

function getInitialHistory(): ChatMsg[] {
  return [
    { id: "welcome", text: "Hello! 👋 I'm your Smart Library Assistant. Ask me about books, due dates, fines, recommendations, or anything library-related!", sender: "bot", timestamp: new Date() },
  ];
}

export default function ChatPage() {
  const [messages, setMessages] = useState<ChatMsg[]>(getInitialHistory);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  const send = async () => {
    const text = input.trim();
    if (!text) return;

    const userMsg: ChatMsg = { id: Date.now().toString(), text, sender: "user", timestamp: new Date() };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput("");
    setTyping(true);

    try {
      // Map history for the AI (excluding system prompts if any, handled by backend)
      const mappedHistory = messages.map(m => ({
        role: m.sender === "user" ? "user" : "assistant",
        content: m.text
      }));

      const response = await axios.post(API_URL, {
        message: text,
        history: mappedHistory
      });
      const aiReply = response.data.reply;

      const botMsg: ChatMsg = {
        id: (Date.now() + 1).toString(),
        text: aiReply,
        sender: "bot",
        timestamp: new Date()
      };
      setMessages((prev) => [...prev, botMsg]);
    } catch (error: any) {
      console.error("Chat Error:", error);
      const errorMessage = error.response?.data?.details || error.response?.data?.error || "Failed to get a response from the assistant.";

      toast.error("Assistant Error", {
        description: errorMessage,
      });

      const errorBotMsg: ChatMsg = {
        id: (Date.now() + 1).toString(),
        text: "⚠️ " + errorMessage,
        sender: "bot",
        timestamp: new Date()
      };
      setMessages((prev) => [...prev, errorBotMsg]);
    } finally {
      setTyping(false);
    }
  };

  const formatTime = (d: Date) => d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  return (
    <div className="flex flex-col h-[calc(100vh-5rem)] max-w-4xl mx-auto">
      <div className="mb-4">
        <h1 className="text-2xl font-bold font-display">Chat Assistant</h1>
        <p className="text-sm text-muted-foreground">Ask me anything about the library</p>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto scrollbar-thin space-y-4 pr-2">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"} animate-fade-in`}>
            <div className={msg.sender === "user" ? "chat-bubble-user" : "chat-bubble-bot"}>
              <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.text}</p>
              <p className={`text-[10px] mt-1.5 ${msg.sender === "user" ? "text-primary-foreground/60" : "text-muted-foreground"}`}>
                {formatTime(msg.timestamp)}
              </p>
            </div>
          </div>
        ))}

        {typing && (
          <div className="flex justify-start">
            <div className="chat-bubble-bot flex gap-1.5 py-4 px-5">
              <span className="h-2 w-2 bg-muted-foreground/50 rounded-full animate-typing" style={{ animationDelay: "0s" }} />
              <span className="h-2 w-2 bg-muted-foreground/50 rounded-full animate-typing" style={{ animationDelay: "0.2s" }} />
              <span className="h-2 w-2 bg-muted-foreground/50 rounded-full animate-typing" style={{ animationDelay: "0.4s" }} />
            </div>
          </div>
        )}
        <div ref={endRef} />
      </div>

      {/* Input */}
      <div className="mt-4 glass-card-strong rounded-2xl p-2 flex items-center gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && send()}
          placeholder="Ask me anything..."
          className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground/60 py-2 px-4"
        />
        <button
          onClick={send}
          disabled={!input.trim()}
          className="p-2.5 rounded-xl gradient-primary text-primary-foreground disabled:opacity-40 hover:opacity-90 transition-opacity"
        >
          <Send className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
