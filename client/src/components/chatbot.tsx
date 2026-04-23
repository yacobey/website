import { useState, useRef, useEffect } from "react";
import { Send, X, Minus, MessageCircle } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";

const CALENDLY = "https://calendly.com/yber2001/30min";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

const SUGGESTIONS = [
  "Should I elect S-Corp status?",
  "What expenses can I deduct?",
  "What does a fractional CFO do?",
  "How do I respond to an IRS notice?",
];

function formatTime(d: Date) {
  return d.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: true });
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [messageCount, setMessageCount] = useState(0);
  const [emailCaptured, setEmailCaptured] = useState(false);
  const [emailInput, setEmailInput] = useState("");
  const [emailDismissed, setEmailDismissed] = useState(false);
  const [sessionId] = useState(() => crypto.randomUUID());
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  const handleOpen = () => {
    setIsOpen(true);
    setIsMinimized(false);
    if (messages.length === 0) {
      setMessages([{
        id: crypto.randomUUID(),
        role: "assistant",
        content: "Hi! I'm Ask Selam — your AI tax advisor. What tax or accounting question can I help you with today?",
        timestamp: new Date(),
      }]);
    }
  };

  const sendMessage = async (text: string) => {
    if (!text.trim() || isLoading || messageCount >= 3) return;

    const userMsg: Message = {
      id: crypto.randomUUID(),
      role: "user",
      content: text.trim(),
      timestamp: new Date(),
    };

    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    setInput("");
    setIsLoading(true);

    const newCount = messageCount + 1;
    setMessageCount(newCount);

    try {
      const conversationMessages = updatedMessages.map((m) => ({
        role: m.role,
        content: m.content,
      }));

      const res = await apiRequest("POST", "/api/chat", {
        sessionId,
        messages: conversationMessages,
      });
      const data = await res.json();

      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          role: "assistant",
          content: data.response || "Sorry, I couldn't get a response. Please try again.",
          timestamp: new Date(),
        },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          role: "assistant",
          content: "I'm having trouble connecting right now. Please call us at (301) 640-8549 or book a free call.",
          timestamp: new Date(),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (emailInput.trim()) {
      setEmailCaptured(true);
      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          role: "assistant",
          content: `Thanks! We'll follow up at ${emailInput}. In the meantime, feel free to book a free 30-min call with Yacob directly.`,
          timestamp: new Date(),
        },
      ]);
    }
  };

  const showEmailCapture = messageCount >= 2 && !emailCaptured && !emailDismissed;
  const showUpgradePrompt = messageCount >= 3;

  if (!isOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2">
        <button
          onClick={handleOpen}
          aria-label="Open chat"
          className="group relative flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-white rounded-full shadow-xl transition-all duration-200 px-5 py-3"
        >
          <span className="absolute inset-0 rounded-full bg-emerald-400 opacity-30 animate-ping pointer-events-none" />
          <MessageCircle className="w-5 h-5 flex-shrink-0" />
          <span className="text-sm font-semibold whitespace-nowrap">Ask Selam</span>
        </button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      <div
        className={`
          bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden flex flex-col
          w-[380px] max-sm:w-screen max-sm:rounded-none max-sm:fixed max-sm:bottom-0 max-sm:left-0 max-sm:right-0
          transition-all duration-200
          ${isMinimized ? "h-[56px]" : "h-[520px] max-sm:h-[70vh]"}
        `}
      >
        {/* Header */}
        <div className="bg-[#0a0f1e] px-4 py-3 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-2.5">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
            </span>
            <div>
              <div className="text-white font-bold text-sm leading-tight">Ask Selam</div>
              <div className="text-emerald-400 text-xs leading-tight">Selam CPA AI Advisor</div>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setIsMinimized((v) => !v)}
              className="p-1.5 text-gray-400 hover:text-white rounded transition-colors"
              aria-label="Minimize"
            >
              <Minus className="w-4 h-4" />
            </button>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 text-gray-400 hover:text-white rounded transition-colors"
              aria-label="Close chat"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {!isMinimized && (
          <>
            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 bg-white">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex flex-col ${msg.role === "user" ? "items-end" : "items-start"}`}>
                  <div
                    className={`
                      max-w-[85%] px-4 py-2.5 text-sm leading-relaxed
                      ${msg.role === "user"
                        ? "bg-emerald-500 text-white rounded-tl-2xl rounded-bl-2xl rounded-tr-sm"
                        : "bg-gray-100 text-gray-900 rounded-tr-2xl rounded-br-2xl rounded-tl-sm"
                      }
                    `}
                  >
                    {msg.content}
                  </div>
                  <span className="text-[10px] text-gray-400 mt-1 px-1">
                    {formatTime(msg.timestamp)}
                  </span>
                </div>
              ))}

              {/* Typing indicator */}
              {isLoading && (
                <div className="flex items-start">
                  <div className="bg-gray-100 rounded-tr-2xl rounded-br-2xl rounded-tl-sm px-4 py-3 flex gap-1 items-center">
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
              )}

              {/* Suggestions — before any user message */}
              {messageCount === 0 && !isLoading && (
                <div className="flex flex-wrap gap-2 pt-1">
                  {SUGGESTIONS.map((s) => (
                    <button
                      key={s}
                      onClick={() => sendMessage(s)}
                      className="text-xs px-3 py-1.5 border border-emerald-200 text-emerald-700 bg-emerald-50 hover:bg-emerald-100 rounded-full transition-colors text-left"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              )}

              {/* Email lead capture — after 2nd message */}
              {showEmailCapture && (
                <div className="bg-gray-50 border border-gray-200 rounded-xl p-3 space-y-2">
                  <p className="text-xs text-gray-600">
                    Want a personalized answer? Leave your email and we'll follow up.
                  </p>
                  <form onSubmit={handleEmailSubmit} className="flex gap-2">
                    <input
                      type="email"
                      value={emailInput}
                      onChange={(e) => setEmailInput(e.target.value)}
                      placeholder="you@example.com"
                      className="flex-1 text-xs border border-gray-200 rounded-lg px-2.5 py-1.5 focus:outline-none focus:ring-1 focus:ring-emerald-400"
                    />
                    <button
                      type="submit"
                      className="text-xs bg-emerald-500 hover:bg-emerald-400 text-white px-3 py-1.5 rounded-lg transition-colors"
                    >
                      Send
                    </button>
                  </form>
                  <button
                    onClick={() => setEmailDismissed(true)}
                    className="text-[10px] text-gray-400 hover:text-gray-500"
                  >
                    No thanks
                  </button>
                </div>
              )}

              {/* Upgrade prompt — after 3 messages */}
              {showUpgradePrompt && (
                <div className="bg-[#0a0f1e] rounded-xl p-4 text-center space-y-3">
                  <p className="text-white text-sm font-medium">
                    You've used your 3 free questions.
                  </p>
                  <p className="text-gray-400 text-xs">
                    Unlock unlimited access for $29 — one-time payment.
                  </p>
                  <div className="flex flex-col gap-2">
                    <a
                      href="/payment"
                      className="block bg-emerald-500 hover:bg-emerald-400 text-white text-sm font-semibold py-2 px-4 rounded-lg transition-colors"
                    >
                      Unlock Unlimited →
                    </a>
                    <a
                      href={CALENDLY}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block border border-white/20 text-gray-300 hover:text-white text-sm py-2 px-4 rounded-lg transition-colors"
                    >
                      Book a Free Call Instead →
                    </a>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            {!showUpgradePrompt && (
              <div className="border-t border-gray-100 px-3 py-3 bg-white flex-shrink-0">
                <form onSubmit={handleSubmit} className="flex gap-2 items-center">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask a tax question..."
                    disabled={isLoading}
                    className="flex-1 text-sm border border-gray-200 rounded-xl px-3.5 py-2.5 focus:outline-none focus:ring-2 focus:ring-emerald-400 disabled:opacity-50"
                    autoComplete="off"
                  />
                  <button
                    type="submit"
                    disabled={!input.trim() || isLoading}
                    className="bg-emerald-500 hover:bg-emerald-400 disabled:opacity-40 text-white p-2.5 rounded-xl transition-colors flex-shrink-0"
                    aria-label="Send"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </form>
                <p className="text-[10px] text-gray-400 mt-1.5 text-center">
                  Not legal or tax advice. For general information only.
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
