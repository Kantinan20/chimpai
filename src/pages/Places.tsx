import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MapPin, Star, Clock, Phone, Navigation } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { recommendedRestaurants } from "@/data/mockData";

const Places = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<string>("nearest");

  const restaurants = recommendedRestaurants.map(restaurant => ({
    id: restaurant.id,
    name: restaurant.name,
    rating: restaurant.rating,
    distance: restaurant.distance,
    cuisine: restaurant.cuisine,
    price: restaurant.priceRange,
    image: restaurant.image,
    address: `${restaurant.distance} • ${restaurant.cuisine}`,
    phone: "02-123-4567",
    openHours: restaurant.openUntil,
    specialties: restaurant.dishes.slice(0, 3)
  }));

  const filteredRestaurants = restaurants
    .filter(restaurant =>
      restaurant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      restaurant.cuisine.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      switch (activeFilter) {
        case "nearest":
          return parseFloat(a.distance) - parseFloat(b.distance);
        case "top-rated":
          return b.rating - a.rating;
        case "affordable":
          return a.price.length - b.price.length;
        case "open":
          // Parse time and check if open (simplified)
          const getHour = (time: string) => parseInt(time.split(":")[0]);
          const aHour = getHour(a.openHours);
          const bHour = getHour(b.openHours);
          return bHour - aHour; // Later closing time first
        default:
          return 0;
      }
    });

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-primary mb-4">
            ค้นหาร้านอาหารไทย
          </h1>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="ค้นหาร้านอาหาร หรือประเภทอาหาร..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-6">
        {/* Quick Filters */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          <Badge 
            variant={activeFilter === "nearest" ? "default" : "outline"}
            className="whitespace-nowrap cursor-pointer transition-all hover:bg-primary/10"
            onClick={() => setActiveFilter("nearest")}
          >
            ใกล้ที่สุด
          </Badge>
          <Badge 
            variant={activeFilter === "top-rated" ? "default" : "outline"}
            className="whitespace-nowrap cursor-pointer transition-all hover:bg-primary/10"
            onClick={() => setActiveFilter("top-rated")}
          >
            คะแนนสูง
          </Badge>
          <Badge 
            variant={activeFilter === "affordable" ? "default" : "outline"}
            className="whitespace-nowrap cursor-pointer transition-all hover:bg-primary/10"
            onClick={() => setActiveFilter("affordable")}
          >
            ราคาประหยัด
          </Badge>
          <Badge 
            variant={activeFilter === "open" ? "default" : "outline"}
            className="whitespace-nowrap cursor-pointer transition-all hover:bg-primary/10"
            onClick={() => setActiveFilter("open")}
          >
            เปิดดึก
          </Badge>
        </div>

        {/* Restaurant List */}
        <div className="space-y-4">
          {filteredRestaurants.map((restaurant) => (
            <Card 
              key={restaurant.id} 
              className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => navigate(`/restaurant/${restaurant.id}`)}
            >
              <CardContent className="p-0">
                <div className="flex">
                  {/* Image */}
                  <div className="w-24 h-24 bg-muted flex-shrink-0 overflow-hidden rounded-l-lg">
                    <img 
                      src={restaurant.image} 
                      alt={restaurant.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1 p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold text-foreground">
                        {restaurant.name}
                      </h3>
                      <div className="flex items-center text-sm">
                        <Star className="h-4 w-4 text-yellow-500 mr-1" />
                        <span>{restaurant.rating}</span>
                      </div>
                    </div>
                    
                    <div className="space-y-1 text-sm text-muted-foreground">
                      <div className="flex items-center">
                        <MapPin className="h-3 w-3 mr-1" />
                        <span>{restaurant.distance} • {restaurant.cuisine}</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-3 w-3 mr-1" />
                        <span>{restaurant.openHours}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between mt-3">
                      <div className="flex gap-1">
                        {restaurant.specialties.slice(0, 2).map((specialty, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {specialty}
                          </Badge>
                        ))}
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <Phone className="h-3 w-3" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <Navigation className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredRestaurants.length === 0 && (
          <div className="text-center py-12">
            <MapPin className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">
              ไม่พบร้านอาหาร
            </h3>
            <p className="text-muted-foreground">
              ลองค้นหาด้วยคำค้นอื่น หรือเปลี่ยนตำแหน่งของคุณ
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Places;