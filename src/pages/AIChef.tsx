import { useState } from "react";
import { Send, Bot, User, Sparkles, Clock, MessageSquare, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

interface Message {
  id: string;
  type: "user" | "ai";
  content: string;
  timestamp: Date;
}

const AIChef = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      type: "ai",
      content: "สวัสดีครับ! ผมคือ AI Chef ที่จะช่วยคุณค้นหาสูตรอาหารไทย และให้คำแนะนำการทำอาหาร มีอะไรให้ผมช่วยไหมครับ?",
      timestamp: new Date(),
    }
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  // Chatbot quota for free users
  const [chatbotUsage, setChatbotUsage] = useState(15); // Used 15 out of 30
  const maxChatbots = 30;
  const chatbotPercentage = (chatbotUsage / maxChatbots) * 100;
  const isFreePlan = true;

  const suggestions = [
    "แนะนำอาหารไทยง่ายๆ สำหรับมือใหม่",
    "ส่วนผสมแทนหากไม่มีน้ำปลา",
    "วิธีทำแกงเขียวหวานให้หอม",
    "อาหารไทยเจสำหรับมังสวิรัติ"
  ];

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: inputMessage,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage("");
    setIsTyping(true);

    try {
      // เรียก API ของ Vercel (ตัวอย่าง endpoint)
      const response = await fetch("https://gemini-iota-brown.vercel.app/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: inputMessage })
      });

      const data = await response.json();
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: "ai",
        content: data.reply || "ขอโทษครับ ผมยังไม่เข้าใจคำถามนี้",
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, aiMessage]);
      setChatbotUsage(prev => Math.min(prev + 1, maxChatbots));
    } catch (err) {
      console.error("Error fetching AI response:", err);
      const errorMessage: Message = {
        id: (Date.now() + 2).toString(),
        type: "ai",
        content: "เกิดข้อผิดพลาดในการเชื่อมต่อ AI Chef ครับ 😢",
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInputMessage(suggestion);
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center space-x-3">
            <div className="h-10 w-10 bg-gradient-temple-gold rounded-full flex items-center justify-center">
              <Bot className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-primary">AI Chef</h1>
              <p className="text-sm text-muted-foreground">ผู้ช่วยเชฟอาหารไทย</p>
            </div>
            <div className="ml-auto">
              <Badge variant="secondary" className="flex items-center gap-1">
                <Sparkles className="h-3 w-3" />
                ออนไลน์
              </Badge>
            </div>
          </div>
        </div>
      </div>

      {/* Chatbot Quota */}
      {isFreePlan && (
        <div className="container mx-auto px-4 pt-4">
          <Card className="border-2 border-primary/20 shadow-md">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base flex items-center gap-2">
                  <MessageSquare className="h-5 w-5 text-primary" />
                  โควต้าแชทบอท AI Chef
                </CardTitle>
                <Badge variant="secondary" className="text-xs">
                  {chatbotUsage}/{maxChatbots} ครั้ง
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <Progress value={chatbotPercentage} className="h-2" />
              <p className="text-xs text-muted-foreground">
                คุณใช้งานไปแล้ว {chatbotUsage} ครั้งจาก {maxChatbots} ครั้งในเดือนนี้
                {chatbotUsage >= maxChatbots
                  ? " ⚠️ ถึงลิมิตแล้ว"
                  : ` (เหลืออีก ${maxChatbots - chatbotUsage} ครั้ง)`}
              </p>
              {chatbotUsage >= maxChatbots * 0.8 && (
                <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-3">
                  <p className="text-xs text-yellow-800 dark:text-yellow-200 flex items-center gap-2">
                    <Zap className="h-4 w-4" />
                    อัปเกรดเป็นแผน Premium เพื่อใช้งานแชทบอทได้ไม่จำกัด!
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}

      {/* Messages */}
      <div className="container mx-auto px-4 py-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`flex items-start space-x-2 max-w-[80%] ${message.type === "user" ? "flex-row-reverse space-x-reverse" : ""
                }`}
            >
              <div
                className={`h-8 w-8 rounded-full flex items-center justify-center flex-shrink-0 ${message.type === "user"
                    ? "bg-primary text-primary-foreground"
                    : "bg-gradient-temple-gold text-primary-foreground"
                  }`}
              >
                {message.type === "user" ? (
                  <User className="h-4 w-4" />
                ) : (
                  <Bot className="h-4 w-4" />
                )}
              </div>
              <Card
                className={`${message.type === "user"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted"
                  }`}
              >
                <CardContent className="p-3 space-y-1">
                  {message.content.split("\n").map((line, i) => (
                    <p key={i} className="text-sm">
                      {line}
                    </p>
                  ))}
                  <div className="flex items-center mt-2 opacity-70">
                    <Clock className="h-3 w-3 mr-1" />
                    <span className="text-xs">
                      {message.timestamp.toLocaleTimeString("th-TH", {
                        hour: "2-digit",
                        minute: "2-digit"
                      })}
                    </span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex justify-start">
            <div className="flex items-start space-x-2">
              <div className="h-8 w-8 bg-gradient-temple-gold rounded-full flex items-center justify-center">
                <Bot className="h-4 w-4 text-primary-foreground" />
              </div>
              <Card className="bg-muted">
                <CardContent className="p-3">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>

      {/* Suggestions */}
      {messages.length === 1 && (
        <div className="container mx-auto px-4 pb-4">
          <h3 className="text-sm font-medium text-muted-foreground mb-3">
            คำถามที่ได้รับความนิยม:
          </h3>
          <div className="grid grid-cols-1 gap-2">
            {suggestions.map((suggestion, index) => (
              <Button
                key={index}
                variant="outline"
                className="justify-start text-left h-auto p-3 text-sm"
                onClick={() => handleSuggestionClick(suggestion)}
              >
                {suggestion}
              </Button>
            ))}
          </div>
        </div>
      )}

      {/* Input */}
      <div className="fixed bottom-16 left-0 right-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-t border-border">
        <div className="container mx-auto px-4 py-3">
          <div className="flex space-x-2">
            <Input
              placeholder="ถามเกี่ยวกับอาหารไทย..."
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
              className="flex-1"
            />
            <Button
              onClick={handleSendMessage}
              disabled={!inputMessage.trim() || isTyping}
              size="icon"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIChef;
