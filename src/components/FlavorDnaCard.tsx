import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Flame, Leaf, Heart } from "lucide-react";

interface FlavorDnaCardProps {
  onStartOnboarding: () => void;
}

const FlavorDnaCard = ({ onStartOnboarding }: FlavorDnaCardProps) => {
  return (
    <Card className="gradient-cultural border-primary/20 shadow-thai">
      <CardHeader className="text-center">
        <div className="flex justify-center mb-4">
          <div className="p-3 rounded-full bg-primary/10">
            <Sparkles className="h-8 w-8 text-primary" />
          </div>
        </div>
        <CardTitle className="text-2xl mb-2">ค้นพบดีเอ็นเอรสชาติของคุณ</CardTitle>
        <CardDescription className="text-base">
          ให้ AI วิเคราะห์รสนิยมของคุณเพื่อปลดล็อกคำแนะนำอาหารไทยส่วนบุคคล
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-6">
        <div className="flex flex-wrap gap-2 justify-center">
          <Badge variant="secondary" className="flex items-center gap-1">
            <Flame className="h-3 w-3" />
            ระดับความเผ็ด
          </Badge>
          <Badge variant="secondary" className="flex items-center gap-1">
            <Leaf className="h-3 w-3" />
            ความชอบในอาหาร
          </Badge>
          <Badge variant="secondary" className="flex items-center gap-1">
            <Heart className="h-3 w-3" />
            โปรไฟล์รสชาติ
          </Badge>
        </div>
        
        <Button 
          variant="hero" 
          className="w-full" 
          onClick={onStartOnboarding}
        >
          เริ่มต้นการเดินทางรสชาติ
        </Button>
      </CardContent>
    </Card>
  );
};

export default FlavorDnaCard;