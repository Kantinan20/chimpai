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
    const input = userInput.toLowerCase();
    
    // Recipe recommendations
    if (input.includes("มือใหม่") || input.includes("ง่าย") || input.includes("เริ่มต้น")) {
      return "สำหรับมือใหม่ ผมแนะนำ 3 เมนูง่ายๆ ครับ:\n\n1. ข้าวผัดกะเพรา - ใช้เวลาแค่ 15 นาที วัตถุดิบหาง่าย\n2. ผัดไทย - เมนูคลาสสิก เทคนิคไม่ซับซ้อน\n3. ไข่เจียวหมูสับ - พื้นฐานที่สำคัญ\n\nเริ่มจากเมนูไหนก่อนดีครับ?";
    }
    
    // Ingredient substitutions
    if (input.includes("น้ำปลา") || input.includes("แทน")) {
      return "หากไม่มีน้ำปลา มีทางเลือกดังนี้ครับ:\n\n1. ซอสถั่วเหลือง + เกลือ (อัตรา 3:1)\n2. ซีอิ๊วขาว + น้ำตาล + เกลือเล็กน้อย\n3. Worcestershire sauce (สำหรับคนต่างชาติ)\n\nแต่รสชาติจะต่างกันนิดหน่อยนะครับ";
    }
    
    // Cooking techniques
    if (input.includes("แกงเขียวหวาน") || input.includes("หอม") || input.includes("เคล็ดลับ")) {
      return "เคล็ดลับแกงเขียวหวานให้หอมเต็มที่:\n\n1. ใช้กะทิข้น (หัวกะทิ) ตั้งไฟให้แตกมัน\n2. ใส่พริกแกง ผัดจนหอมฉุน (3-5 นาที)\n3. ใส่เนื้อสัตว์ให้สุกก่อน\n4. ค่อยใส่กะทิเจือจางและผัก\n5. ใบมะกรูดฉีกใส่ท้ายสุด\n\nจะได้แกงที่หอม เข้มข้น ไม่แตกมันครับ";
    }
    
    // Vegetarian/Vegan
    if (input.includes("เจ") || input.includes("มังสวิรัติ") || input.includes("ไม่ทานเนื้อ")) {
      return "อาหารไทยเจ/มังสวิรัติที่แนะนำ:\n\n🌱 เมนูหลัก:\n- แกงส่มผักรวมเจ\n- ผัดผักบุ้งไฟแดง\n- ยำถั่วพลู\n- แกงเห็ดเผาะภูเขา\n\n🍜 เมนูเส้น:\n- ผัดซีอิ๊วเจ\n- ก๋วยเตี๋ยวต้มยำเจ\n\nทั้งหมดอร่อยและได้โปรตีนจากถั่วครับ";
    }
    
    // Spice level
    if (input.includes("เผ็ด") || input.includes("ทานเผ็ดไม่ได้") || input.includes("ไม่เผ็ด")) {
      return "สำหรับคนทานเผ็ดไม่ได้ แนะนำเมนูไทยรสชาติกลมกล่อม:\n\n😊 ไม่เผ็ดเลย:\n- ผัดไทยไม่ใส่พริก\n- ข้าวมันไก่\n- ห่อหมกปลา\n- ต้มข่าไก่\n\n🥥 เผ็ดน้อย:\n- แกงเขียวหวาน (ปรับได้)\n- ผัดกะเพรา (ไม่ใส่พริก)\n\nขอสูตรเมนูไหนดีครับ?";
    }
    
    // Healthy options
    if (input.includes("เพื่อสุขภาพ") || input.includes("ลดน้ำหนัก") || input.includes("คลีน")) {
      return "อาหารไทยเพื่อสุขภาพที่แนะนำ:\n\n💚 โปรตีนสูง แคลอรีต่ำ:\n- ยำวุ้นเส้น (150 kcal)\n- ต้มยำกุ้ง ไม่ใส่น้ำมัน (120 kcal)\n- ลาบปลา (180 kcal)\n\n🥗 ผักเยอะ:\n- สมุนไพรผักสด (30 kcal)\n- ยำผักบุ้ง (80 kcal)\n\nทั้งหมดอร่อย อิ่ม ไม่อ้วนครับ";
    }
    
    // Regional cuisine
    if (input.includes("อีสาน") || input.includes("เหนือ") || input.includes("ใต้") || input.includes("ภาค")) {
      return "อยากรู้จักอาหารไทยแต่ละภาคไหมครับ?\n\n🌾 อีสาน: ส้มตำ, ลาบ, ไก่ย่าง\n🏔️ เหนือ: ข้าวซอย, แกงฮังเล, น้ำพริกอ่อง\n🏖️ ใต้: แกงเหลือง, ผัดสะตอ, ขนมจีนน้ำยา\n🏛️ กลาง: ผัดไทย, ต้มยำกุ้ง, แกงเขียวหวาน\n\nอยากเรียนรู้เมนูไหนเพิ่มเติมครับ?";
    }
    
    // Storage and meal prep
    if (input.includes("เก็บ") || input.includes("อุ่น") || input.includes("ทำไว้") || input.includes("prep")) {
      return "เทคนิคการเก็บและอุ่นอาหารไทย:\n\n❄️ เก็บในตู้เย็น (3-4 วัน):\n- แกงต่างๆ, น้ำพริก\n- อาหารปรุงสุก\n\n🔥 การอุ่น:\n- แกง: ใช้ไฟอ่อน คนบ่อยๆ\n- ข้าว: เติมน้ำนิดหน่อย\n- ผัด: อุ่นด้วยไฟแรง รวดเร็ว\n\n⚠️ ไม่ควรเก็บนาน:\n- อาหารทะเล, สลัด, ยำ";
    }
    
    // Default response with suggestions
    return "ผมยินดีช่วยเรื่องอาหารไทยครับ! ลองถามผมเกี่ยวกับ:\n\n📖 สูตรอาหาร - ผัดไทย, ต้มยำ, แกงต่างๆ\n🔥 เทคนิคการทำ - วิธีผัด, ปรุง, ปรับรส\n🥗 อาหารเฉพาะ - เจ, เพื่อสุขภาพ, ไม่เผ็ด\n🌶️ ส่วนผสมทางเลือก - ปรับเปลี่ยนวัตถุดิบ\n🏛️ อาหารท้องถิ่น - อีสาน, เหนือ, ใต้, กลาง\n\nถามอะไรก็ได้เลยครับ! 😊";
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