import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { 
  MessageSquare, 
  X, 
  Send,
} from "lucide-react";

interface ChatMessage {
  id: number;
  sender: "user" | "agent";
  text: string;
  time: string;
}

const LiveChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 1,
      sender: "agent",
      text: "Hello! Welcome to FastFix support. How can I help you today?",
      time: "10:30 AM"
    }
  ]);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const closeChat = () => {
    setIsOpen(false);
  };

  const sendMessage = () => {
    if (!message.trim()) return;

    const now = new Date();
    const time = now.toLocaleString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });

    const newMessage: ChatMessage = {
      id: messages.length + 1,
      sender: "user",
      text: message,
      time
    };

    setMessages([...messages, newMessage]);
    setMessage("");

    // Simulate agent response after a short delay
    setTimeout(() => {
      const agentMessage: ChatMessage = {
        id: messages.length + 2,
        sender: "agent",
        text: "Thanks for your message. An agent will respond shortly. Is there anything else I can help you with?",
        time: new Date().toLocaleString('en-US', {
          hour: 'numeric',
          minute: '2-digit',
          hour12: true
        })
      };
      setMessages(prev => [...prev, agentMessage]);
    }, 1500);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isOpen ? (
        <Card className="w-80 overflow-hidden shadow-lg">
          <CardHeader className="bg-primary p-4 flex flex-row justify-between items-center">
            <CardTitle className="text-white text-base">FastFix Support</CardTitle>
            <Button 
              variant="ghost" 
              size="icon" 
              className="text-white hover:text-gray-200 h-6 w-6" 
              onClick={closeChat}
            >
              <X className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent className="p-0">
            <div className="h-72 p-4 bg-gray-50 overflow-y-auto">
              {messages.map((msg) => (
                <div 
                  key={msg.id} 
                  className={`flex mb-4 ${msg.sender === 'user' ? 'justify-end' : ''}`}
                >
                  {msg.sender === 'agent' && (
                    <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center mr-2 flex-shrink-0">
                      <span className="text-white text-sm font-bold">FF</span>
                    </div>
                  )}
                  <div 
                    className={`p-3 rounded-lg max-w-[80%] ${
                      msg.sender === 'user' 
                        ? 'bg-primary/10 text-primary rounded-tr-none' 
                        : 'bg-gray-200 rounded-tl-none'
                    }`}
                  >
                    <p className="text-sm">{msg.text}</p>
                    <span className="text-xs text-gray-500 mt-1 block">{msg.time}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-3 border-t">
              <div className="flex">
                <Input
                  type="text"
                  placeholder="Type your message..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="flex-1 rounded-r-none"
                />
                <Button 
                  onClick={sendMessage} 
                  className="rounded-l-none"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Button 
          className="w-14 h-14 rounded-full shadow-lg flex items-center justify-center" 
          onClick={toggleChat}
        >
          <MessageSquare className="h-6 w-6" />
        </Button>
      )}
    </div>
  );
};

export default LiveChat;
