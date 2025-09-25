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
        <CardTitle className="text-2xl mb-2">Discover Your Flavor DNA</CardTitle>
        <CardDescription className="text-base">
          Let AI analyze your taste preferences to unlock personalized Thai cuisine recommendations
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-6">
        <div className="flex flex-wrap gap-2 justify-center">
          <Badge variant="secondary" className="flex items-center gap-1">
            <Flame className="h-3 w-3" />
            Spice Level
          </Badge>
          <Badge variant="secondary" className="flex items-center gap-1">
            <Leaf className="h-3 w-3" />
            Dietary Preferences
          </Badge>
          <Badge variant="secondary" className="flex items-center gap-1">
            <Heart className="h-3 w-3" />
            Flavor Profile
          </Badge>
        </div>
        
        <Button 
          variant="hero" 
          className="w-full" 
          onClick={onStartOnboarding}
        >
          Start Flavor Journey
        </Button>
      </CardContent>
    </Card>
  );
};

export default FlavorDnaCard;