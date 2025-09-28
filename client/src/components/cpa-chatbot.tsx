import { useState, useEffect, useRef } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Bot, Send, X, MessageCircle, Phone, Calendar } from "lucide-react";
import { useBusinessConfig } from "@/hooks/use-business-config";
import { apiRequest } from "@/lib/queryClient";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
  suggestedActions?: string[];
}

interface CPAChatResponse {
  message: string;
  suggestedActions?: string[];
  requiresFollowUp?: boolean;
  leadData?: {
    intent: string;
    urgency: "low" | "medium" | "high";
    serviceNeeded?: string;
  };
}

export default function CPAChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { data: businessConfig } = useBusinessConfig();

  // Get welcome message when chatbot opens
  const { data: welcomeData, isLoading: isLoadingWelcome } = useQuery<CPAChatResponse>({
    queryKey: ["/api/chat/welcome"],
    enabled: isOpen && messages.length === 0,
  });

  // Send chat message mutation
  const sendMessageMutation = useMutation({
    mutationFn: async (messageData: { messages: any[], userContext?: any }) => {
      const response = await apiRequest("POST", "/api/chat/message", messageData);
      return await response.json() as CPAChatResponse;
    },
    onSuccess: (response: CPAChatResponse) => {
      setIsTyping(false);
      const assistantMessage: ChatMessage = {
        role: "assistant",
        content: response.message,
        timestamp: new Date(),
        suggestedActions: response.suggestedActions
      };
      setMessages(prev => [...prev, assistantMessage]);
    },
    onError: () => {
      setIsTyping(false);
      const errorMessage: ChatMessage = {
        role: "assistant", 
        content: "I apologize, but I'm experiencing technical difficulties. Please call us at (301) 640-8549 for immediate assistance.",
        timestamp: new Date(),
        suggestedActions: ["Call (301) 640-8549", "Try again"]
      };
      setMessages(prev => [...prev, errorMessage]);
    }
  });

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Add welcome message when chatbot opens
  useEffect(() => {
    if (isOpen && welcomeData && messages.length === 0) {
      const welcomeMessage: ChatMessage = {
        role: "assistant",
        content: welcomeData.message,
        timestamp: new Date(),
        suggestedActions: welcomeData.suggestedActions
      };
      setMessages([welcomeMessage]);
    }
  }, [isOpen, welcomeData, messages.length]);

  const handleSendMessage = async () => {
    if (!inputValue.trim() || sendMessageMutation.isPending) return;

    const userMessage: ChatMessage = {
      role: "user",
      content: inputValue.trim(),
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    // Convert messages to OpenAI format
    const apiMessages = [...messages, userMessage].map(msg => ({
      role: msg.role,
      content: msg.content
    }));

    sendMessageMutation.mutate({ messages: apiMessages });
  };

  const handleQuickAction = (action: string) => {
    setInputValue(action);
    setTimeout(() => handleSendMessage(), 100);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (!isOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setIsOpen(true)}
          size="lg"
          className="rounded-full h-14 w-14 bg-blue-600 hover:bg-blue-700 shadow-lg"
          data-testid="chatbot-open-button"
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 w-96 max-w-[calc(100vw-2rem)]">
      <Card className="shadow-2xl border-0 overflow-hidden">
        {/* Header */}
        <CardHeader className="bg-blue-800 text-white p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-white/20 rounded-full p-2">
                <Bot className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">Selam CPA Assistant</h3>
                <p className="text-blue-100 text-sm">Online now</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(false)}
              className="text-white hover:bg-white/20"
              data-testid="chatbot-close-button"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>

        {/* Messages */}
        <CardContent className="p-0">
          <div className="h-96 overflow-y-auto bg-gray-50">
            <div className="p-4 space-y-4">
              {isLoadingWelcome && (
                <div className="flex justify-start">
                  <div className="bg-white rounded-lg p-3 shadow-sm max-w-[80%]">
                    <div className="flex items-center gap-2">
                      <div className="animate-pulse bg-gray-300 h-2 w-2 rounded-full"></div>
                      <div className="animate-pulse bg-gray-300 h-2 w-2 rounded-full delay-100"></div>
                      <div className="animate-pulse bg-gray-300 h-2 w-2 rounded-full delay-200"></div>
                    </div>
                  </div>
                </div>
              )}

              {messages.map((message, index) => (
                <div key={index} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div className={`rounded-lg p-3 max-w-[80%] shadow-sm ${
                    message.role === "user" 
                      ? "bg-blue-600 text-white" 
                      : "bg-white text-gray-800"
                  }`}>
                    <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                    
                    {message.suggestedActions && message.suggestedActions.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-3">
                        {message.suggestedActions.map((action, actionIndex) => (
                          <Button
                            key={actionIndex}
                            variant="outline"
                            size="sm"
                            onClick={() => handleQuickAction(action)}
                            className="text-xs h-7 bg-blue-50 border-blue-200 text-blue-700 hover:bg-blue-100"
                            data-testid={`quick-action-${actionIndex}`}
                          >
                            {action.includes("Call") && <Phone className="h-3 w-3 mr-1" />}
                            {action.includes("Schedule") && <Calendar className="h-3 w-3 mr-1" />}
                            {action}
                          </Button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-white rounded-lg p-3 shadow-sm max-w-[80%]">
                    <div className="flex items-center gap-1">
                      <div className="animate-pulse bg-gray-400 h-2 w-2 rounded-full"></div>
                      <div className="animate-pulse bg-gray-400 h-2 w-2 rounded-full delay-100"></div>
                      <div className="animate-pulse bg-gray-400 h-2 w-2 rounded-full delay-200"></div>
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>
          </div>

          {/* Input */}
          <div className="border-t bg-white p-4">
            <div className="flex gap-2">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Type your message..."
                disabled={sendMessageMutation.isPending}
                className="flex-1"
                data-testid="chatbot-input"
              />
              <Button
                onClick={handleSendMessage}
                disabled={!inputValue.trim() || sendMessageMutation.isPending}
                size="sm"
                className="bg-blue-600 hover:bg-blue-700"
                data-testid="chatbot-send-button"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
            
            {/* Privacy notice */}
            <p className="text-xs text-gray-500 mt-2">
              By using this chat service, you agree to the monitoring and recording of the chat and the processing of your personal data in accordance with our Privacy Policy.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}