import { useState } from "react";
import { Send, Bot, User, Sparkles, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

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

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: "ai",
        content: getAIResponse(inputMessage),
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const getAIResponse = (userInput: string): string => {
    const responses = [
      "สำหรับมือใหม่ ผมแนะนำให้เริ่มจากผัดไท่ครับ เป็นเมนูง่ายแต่อร่อย ส่วนผสมหาง่าย และไม่ซับซ้อน คุณต้องการสูตรไหมครับ?",
      "หากไม่มีน้ำปลา คุณสามารถใช้ซอสถั่วเหลือง หรือซีอิ๊วขาว ผสมกับเกลือนิดหน่อยแทนได้ครับ รสชาติจะคล้ายกัน",
      "เคล็ดลับแกงเขียวหวานให้หอม คือใช้กะทิข้นใส่ก่อน ผัดพริกแกงให้หอม แล้วค่อยใส่กะทิเจือจาง รสชาติจะกลมกล่อมครับ",
      "อาหารไทยเจที่แนะนำ ได้แก่ แกงส่มผักรวม ผัดผักบุ้งไฟแดง และยำมะม่วงไร้กุ้งแห้ง อร่อยไม่แพ้อาหารธรรมดาครับ"
    ];
    return responses[Math.floor(Math.random() * responses.length)];
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

      {/* Messages */}
      <div className="container mx-auto px-4 py-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`flex items-start space-x-2 max-w-[80%] ${
                message.type === "user" ? "flex-row-reverse space-x-reverse" : ""
              }`}
            >
              <div
                className={`h-8 w-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                  message.type === "user"
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
                className={`${
                  message.type === "user"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted"
                }`}
              >
                <CardContent className="p-3">
                  <p className="text-sm">{message.content}</p>
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