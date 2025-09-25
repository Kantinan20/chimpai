import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, Star, MapPin, Flame } from "lucide-react";

interface DishCardProps {
  dish: {
    id: string;
    name: string;
    image: string;
    description: string;
    cookTime: string;
    difficulty: string;
    spiceLevel: number;
    rating: number;
    origin: string;
    isPersonalized?: boolean;
  };
  onClick?: () => void;
}

const DishCard = ({ dish, onClick }: DishCardProps) => {
  const getSpiceIcons = (level: number) => {
    return Array.from({ length: 3 }, (_, i) => (
      <Flame key={i} className={`h-3 w-3 ${i < level ? 'text-red-500' : 'text-gray-300'}`} />
    ));
  };

  return (
    <Card 
      className="group cursor-pointer transition-thai hover:shadow-thai hover:-translate-y-1" 
      onClick={onClick}
    >
      <div className="relative overflow-hidden rounded-t-lg">
        <img 
          src={dish.image} 
          alt={dish.name}
          className="w-full h-48 object-cover group-hover:scale-105 transition-thai"
        />
        {dish.isPersonalized && (
          <Badge className="absolute top-2 right-2 bg-primary text-primary-foreground">
            AI Match
          </Badge>
        )}
        <div className="absolute bottom-2 left-2 flex items-center gap-1 bg-black/70 rounded-full px-2 py-1">
          <Star className="h-3 w-3 text-yellow-400 fill-current" />
          <span className="text-white text-xs font-medium">{dish.rating}</span>
        </div>
      </div>
      
      <CardContent className="p-4 space-y-3">
        <div>
          <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">
            {dish.name}
          </h3>
          <p className="text-muted-foreground text-sm line-clamp-2">
            {dish.description}
          </p>
        </div>
        
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>{dish.cookTime}</span>
          </div>
          <div className="flex items-center gap-1">
            <MapPin className="h-4 w-4" />
            <span>{dish.origin}</span>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <span className="text-xs text-muted-foreground">Spice:</span>
            <div className="flex gap-1">{getSpiceIcons(dish.spiceLevel)}</div>
          </div>
          <Badge variant="outline">{dish.difficulty}</Badge>
        </div>
      </CardContent>
    </Card>
  );
};

export default DishCard;