import { useState, useRef, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { MessageCircle, X, Send, Bot, User } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";
import { trackEvent } from "@/lib/analytics";
import { nanoid } from "nanoid";

interface ChatMessage {
  id: string;
  type: 'user' | 'bot';
  message: string;
  timestamp: Date;
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const [sessionId] = useState(() => nanoid());
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      // Add initial bot message
      setMessages([
        {
          id: nanoid(),
          type: 'bot',
          message: "Hi! I'm your CPA assistant. How can I help you today?",
          timestamp: new Date()
        }
      ]);
    }
  }, [isOpen, messages.length]);

  const chatMutation = useMutation({
    mutationFn: async (message: string) => {
      const response = await apiRequest("POST", "/api/chat", { sessionId, message });
      return response.json();
    },
    onSuccess: (data) => {
      setMessages(prev => [...prev, {
        id: nanoid(),
        type: 'bot',
        message: data.response,
        timestamp: new Date()
      }]);
    },
    onError: () => {
      setMessages(prev => [...prev, {
        id: nanoid(),
        type: 'bot',
        message: "I'm sorry, I'm having trouble responding right now. Please try again or contact us directly at (555) 123-4567.",
        timestamp: new Date()
      }]);
    }
  });

  const handleToggleChat = () => {
    setIsOpen(!isOpen);
    trackEvent('click', 'chatbot_toggle', isOpen ? 'close' : 'open');
  };

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const userMessage = inputMessage.trim();
    
    // Add user message
    setMessages(prev => [...prev, {
      id: nanoid(),
      type: 'user',
      message: userMessage,
      timestamp: new Date()
    }]);

    setInputMessage("");
    
    // Send to API
    chatMutation.mutate(userMessage);
    trackEvent('chat_message', 'chatbot', 'user_message');
  };

  const handleQuickAction = (action: string) => {
    let message = "";
    switch (action) {
      case "services":
        message = "What services do you offer?";
        break;
      case "pricing":
        message = "What are your pricing options?";
        break;
      case "consultation":
        message = "I'd like to schedule a consultation";
        break;
    }
    
    if (message) {
      setMessages(prev => [...prev, {
        id: nanoid(),
        type: 'user',
        message,
        timestamp: new Date()
      }]);
      chatMutation.mutate(message);
      trackEvent('click', `chatbot_quick_action_${action}`, 'chatbot');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Chat Button */}
      <Button
        onClick={handleToggleChat}
        className="bg-primary hover:bg-primary-dark text-white p-4 rounded-full shadow-lg transition-colors"
        size="icon"
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
      </Button>

      {/* Chat Window */}
      {isOpen && (
        <Card className="absolute bottom-16 right-0 w-80 bg-white rounded-lg shadow-2xl border border-gray-200">
          {/* Header */}
          <div className="bg-primary text-white p-4 rounded-t-lg flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                <Bot className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-semibold">CPA Assistant</h4>
                <p className="text-xs text-blue-100">Online now</p>
              </div>
            </div>
            <Button
              onClick={handleToggleChat}
              variant="ghost"
              size="sm"
              className="text-white hover:text-blue-100 hover:bg-white/10 transition-colors"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>

          {/* Messages */}
          <div className="h-64 overflow-y-auto p-4 space-y-3" id="chatMessages">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex gap-2 ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                {msg.type === 'bot' && (
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Bot className="text-primary w-4 h-4" />
                  </div>
                )}
                <div className={`max-w-60 p-3 rounded-lg ${
                  msg.type === 'user' 
                    ? 'bg-primary text-white ml-8' 
                    : 'bg-gray-100 text-charcoal'
                }`}>
                  <p className="text-sm">{msg.message}</p>
                </div>
                {msg.type === 'user' && (
                  <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0">
                    <User className="text-gray-600 w-4 h-4" />
                  </div>
                )}
              </div>
            ))}
            
            {chatMutation.isPending && (
              <div className="flex gap-2">
                <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <Bot className="text-primary w-4 h-4" />
                </div>
                <div className="bg-gray-100 p-3 rounded-lg">
                  <p className="text-sm text-gray-500">Typing...</p>
                </div>
              </div>
            )}

            {/* Quick Action Buttons - Only show if no messages yet or after initial message */}
            {messages.length <= 1 && (
              <div className="flex flex-wrap gap-2 ml-10">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleQuickAction('services')}
                  className="text-xs bg-primary/10 text-primary border-primary/20 hover:bg-primary/20"
                >
                  Our Services
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleQuickAction('pricing')}
                  className="text-xs bg-primary/10 text-primary border-primary/20 hover:bg-primary/20"
                >
                  Pricing
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleQuickAction('consultation')}
                  className="text-xs bg-primary/10 text-primary border-primary/20 hover:bg-primary/20"
                >
                  Book Consultation
                </Button>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="border-t border-gray-200 p-4">
            <div className="flex gap-2">
              <Input
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                className="flex-1 text-sm focus:border-primary focus:ring-1 focus:ring-primary"
                disabled={chatMutation.isPending}
              />
              <Button
                onClick={handleSendMessage}
                disabled={!inputMessage.trim() || chatMutation.isPending}
                className="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-lg transition-colors"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}
