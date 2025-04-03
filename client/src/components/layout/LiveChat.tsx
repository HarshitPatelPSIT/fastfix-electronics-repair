import { useState } from 'react';
import { X, MessageSquare, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface ChatMessage {
  text: string;
  sender: 'user' | 'agent';
  time: string;
}

const LiveChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      text: 'Hello! How can we help you today with your device repair needs?',
      sender: 'agent',
      time: '10:30 AM'
    }
  ]);

  const sendMessage = () => {
    if (!message.trim()) return;

    // Add user message
    const userMessage: ChatMessage = {
      text: message,
      sender: 'user',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    
    setMessages([...messages, userMessage]);
    setMessage('');
    
    // Simulate agent response after a delay
    setTimeout(() => {
      const agentMessage: ChatMessage = {
        text: 'Thank you for your message. One of our repair specialists will assist you shortly.',
        sender: 'agent',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, agentMessage]);
    }, 1000);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 rounded-full shadow-lg"
        size="icon"
      >
        <MessageSquare size={24} />
      </Button>
      
      {isOpen && (
        <div className="absolute bottom-16 right-0 w-80 bg-white rounded-lg shadow-xl overflow-hidden">
          <div className="bg-primary p-4">
            <div className="flex justify-between items-center">
              <h4 className="text-white font-bold">FastFix Support</h4>
              <Button 
                variant="ghost" 
                size="icon" 
                className="text-white hover:text-neutral-medium h-auto w-auto p-0"
                onClick={() => setIsOpen(false)}
              >
                <X size={18} />
              </Button>
            </div>
            <p className="text-white text-sm opacity-90">We're here to help!</p>
          </div>
          
          <div className="h-64 bg-neutral-light p-4 overflow-y-auto">
            {messages.map((msg, index) => (
              <div 
                key={index} 
                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'} mb-3`}
              >
                <div 
                  className={`p-3 rounded-lg shadow-sm max-w-[80%] ${
                    msg.sender === 'user' 
                      ? 'bg-primary text-white' 
                      : 'bg-white text-neutral-dark'
                  }`}
                >
                  <p className="text-sm">{msg.text}</p>
                  <span className={`text-xs ${msg.sender === 'user' ? 'text-white' : 'text-neutral-dark'} opacity-75`}>
                    {msg.time}
                  </span>
                </div>
              </div>
            ))}
          </div>
          
          <div className="p-3 border-t border-neutral-medium">
            <div className="flex">
              <Input
                type="text"
                placeholder="Type your message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={handleKeyDown}
                className="rounded-r-none"
              />
              <Button 
                className="rounded-l-none" 
                onClick={sendMessage}
                type="submit"
              >
                <Send size={18} />
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LiveChat;
