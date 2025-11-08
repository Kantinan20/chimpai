import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { recommendedRestaurants } from "@/data/mockData";
import { ArrowLeft, Clock, Star, MapPin, Phone, Calendar, Users } from "lucide-react";
import Header from "@/components/Header";
import { useToast } from "@/hooks/use-toast";

const RestaurantDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const restaurant = recommendedRestaurants.find(r => r.id === id);
  const [showReservation, setShowReservation] = useState(false);
  const [reservationDate, setReservationDate] = useState("");
  const [reservationTime, setReservationTime] = useState("");
  const [guestCount, setGuestCount] = useState("2");
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");

  const handleReservation = () => {
    if (!reservationDate || !reservationTime || !customerName || !customerPhone) {
      toast({
        title: "กรุณากรอกข้อมูลให้ครบ",
        description: "โปรดระบุวันที่ เวลา ชื่อ และเบอร์โทรศัพท์",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "จองโต๊ะสำเร็จ! 🎉",
      description: `จองโต๊ะที่ ${restaurant?.name} วันที่ ${reservationDate} เวลา ${reservationTime} สำหรับ ${guestCount} ท่าน`,
    });
    
    setShowReservation(false);
    setReservationDate("");
    setReservationTime("");
    setGuestCount("2");
    setCustomerName("");
    setCustomerPhone("");
  };

  if (!restaurant) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-8 text-center">
          <h1 className="text-2xl font-bold mb-4">ไม่พบร้านอาหาร</h1>
          <Button onClick={() => navigate("/places")} variant="outline">
            <ArrowLeft className="h-4 w-4 mr-2" />
            กลับสู่หน้ารายการร้านอาหาร
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <Button 
          onClick={() => navigate("/places")} 
          variant="ghost" 
          className="mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          กลับสู่รายการร้านอาหาร
        </Button>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Image and Basic Info */}
          <div className="space-y-6">
            <div className="relative overflow-hidden rounded-xl shadow-thai">
              <img 
                src={restaurant.image} 
                alt={restaurant.name}
                className="w-full h-80 object-cover"
              />
              <Badge className="absolute top-4 right-4 bg-primary text-primary-foreground">
                {restaurant.priceRange}
              </Badge>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle>ข้อมูลร้าน</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-2">
                  <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  <span className="font-semibold">{restaurant.rating}</span>
                  <span className="text-sm text-muted-foreground">({restaurant.reviews} รีวิว)</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span>{restaurant.distance}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span>เปิดถึง {restaurant.openUntil}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span>02-XXX-XXXX</span>
                </div>
                <div className="pt-4 border-t">
                  <p className="text-sm text-muted-foreground mb-1">ราคาเฉลี่ย</p>
                  <p className="font-semibold">{restaurant.averagePrice}</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Restaurant Details */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold mb-2">{restaurant.name}</h1>
              <Badge variant="secondary" className="mb-4">{restaurant.cuisine}</Badge>
              <p className="text-lg text-muted-foreground mb-4">
                ร้านอาหารไทยชื่อดังในย่านนี้ มีบรรยากาศอบอุ่น เหมาะกับการมาพร้อมครอบครัวและเพื่อนฝูง
              </p>
              
              <div className="flex gap-3">
                <Button 
                  variant="default"
                  className="flex-1"
                  onClick={() => setShowReservation(true)}
                >
                  <Calendar className="h-4 w-4 mr-2" />
                  จองโต๊ะ
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => window.open(`https://www.google.com/maps/dir/?api=1&destination=${restaurant.lat},${restaurant.lng}`, '_blank')}
                >
                  <MapPin className="h-4 w-4 mr-2" />
                  นำทาง
                </Button>
              </div>
            </div>

            {/* Special Dishes */}
            <Card>
              <CardHeader>
                <CardTitle>เมนูเด่น</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {restaurant.dishes.map((dish, index) => (
                    <div key={index} className="flex items-center justify-between py-2 border-b last:border-0">
                      <span className="font-medium">{dish}</span>
                      <Badge variant="outline">ยอดนิยม</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Special Offer */}
            <Card className="bg-gradient-cultural border-primary/20">
              <CardContent className="p-6">
                <h3 className="text-lg font-bold mb-2">โปรโมชั่นพิเศษ</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  จองผ่าน Chimpai รับส่วนลด 10% สำหรับออเดอร์แรก
                </p>
                <Badge className="bg-primary">จองวันนี้รับของแถม</Badge>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Reservation Dialog */}
      <Dialog open={showReservation} onOpenChange={setShowReservation}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-primary" />
              จองโต๊ะที่ {restaurant.name}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">ชื่อ-นามสกุล</Label>
              <Input 
                id="name" 
                placeholder="กรอกชื่อของคุณ"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">เบอร์โทรศัพท์</Label>
              <Input 
                id="phone" 
                type="tel"
                placeholder="0XX-XXX-XXXX"
                value={customerPhone}
                onChange={(e) => setCustomerPhone(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="date">วันที่</Label>
              <Input 
                id="date" 
                type="date"
                value={reservationDate}
                onChange={(e) => setReservationDate(e.target.value)}
                min={new Date().toISOString().split('T')[0]}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="time">เวลา</Label>
              <Input 
                id="time" 
                type="time"
                value={reservationTime}
                onChange={(e) => setReservationTime(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="guests">จำนวนผู้เข้าใช้บริการ</Label>
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-muted-foreground" />
                <Input 
                  id="guests" 
                  type="number"
                  min="1"
                  max="20"
                  value={guestCount}
                  onChange={(e) => setGuestCount(e.target.value)}
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowReservation(false)}>
              ยกเลิก
            </Button>
            <Button onClick={handleReservation}>
              ยืนยันการจอง
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default RestaurantDetail;