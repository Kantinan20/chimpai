import { useState } from "react";
import { MapPin, Star, Clock, Phone, Navigation } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

const Places = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const restaurants = [
    {
      id: "1",
      name: "ร้านอาหารไทยต้นตำรับ",
      rating: 4.8,
      distance: "0.5 กม.",
      cuisine: "อาหารไทยแท้",
      price: "฿฿฿",
      image: "/api/placeholder/300/200",
      address: "123 ถนนสุขุมวิท กรุงเทพฯ",
      phone: "02-123-4567",
      openHours: "10:00 - 22:00",
      specialties: ["ผัดไทย", "ต้มยำกุ้ง", "แกงเขียวหวาน"]
    },
    {
      id: "2", 
      name: "ครัวเรือนไทย",
      rating: 4.6,
      distance: "1.2 กม.",
      cuisine: "อาหารบ้าน",
      price: "฿฿",
      image: "/api/placeholder/300/200",
      address: "456 ซอยสุขุมวิท 21 กรุงเทพฯ",
      phone: "02-234-5678",
      openHours: "11:00 - 21:00",
      specialties: ["ข้าวผัด", "ลาบหมู", "ส้มตำ"]
    },
    {
      id: "3",
      name: "ตลาดน้ำดำเนินสะดวก",
      rating: 4.9,
      distance: "15 กม.",
      cuisine: "ตลาดน้ำ",
      price: "฿",
      image: "/api/placeholder/300/200",
      address: "ดำเนินสะดวก ราชบุรี",
      phone: "032-254-179",
      openHours: "06:00 - 18:00",
      specialties: ["ก๋วยเตี้ยวเรือ", "ขนมไทย", "ผลไม้สด"]
    }
  ];

  const filteredRestaurants = restaurants.filter(restaurant =>
    restaurant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    restaurant.cuisine.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
          <Badge variant="secondary" className="whitespace-nowrap">
            ใกล้ที่สุด
          </Badge>
          <Badge variant="outline" className="whitespace-nowrap">
            คะแนนสูง
          </Badge>
          <Badge variant="outline" className="whitespace-nowrap">
            ราคาประหยัด
          </Badge>
          <Badge variant="outline" className="whitespace-nowrap">
            เปิดอยู่
          </Badge>
        </div>

        {/* Restaurant List */}
        <div className="space-y-4">
          {filteredRestaurants.map((restaurant) => (
            <Card key={restaurant.id} className="overflow-hidden">
              <CardContent className="p-0">
                <div className="flex">
                  {/* Image */}
                  <div className="w-24 h-24 bg-muted flex-shrink-0">
                    <div className="w-full h-full bg-gradient-cultural rounded-l-lg flex items-center justify-center">
                      <MapPin className="h-8 w-8 text-primary" />
                    </div>
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