import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, ExternalLink, Package, Star } from "lucide-react";

const OrderIngredients = () => {
  const retailers = [
    {
      id: "shopee",
      name: "Shopee",
      logo: "https://logo.clearbit.com/shopee.co.th",
      description: "ส่วนผสมอาหารไทย พร้อมส่งถึงบ้าน",
      rating: 4.8,
      deliveryTime: "ส่งไว 2 ชั่วโมง",
      url: "https://shopee.co.th",
      badge: "ราคาถูกที่สุด",
      color: "bg-orange-500"
    },
    {
      id: "lotus",
      name: "Lotus's",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Lotus%27s_logo.svg/200px-Lotus%27s_logo.svg.png",
      description: "ซูเปอร์มาร์เก็ตครบครัน",
      rating: 4.7,
      deliveryTime: "จัดส่งภายใน 3 ชม.",
      url: "https://www.lotuss.com",
      badge: "สินค้าสด",
      color: "bg-red-600"
    },
    {
      id: "bigc",
      name: "BigC",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Big_C_Logo.svg/200px-Big_C_Logo.svg.png",
      description: "ช้อปครบจบในที่เดียว",
      rating: 4.5,
      deliveryTime: "จัดส่งภายใน 4 ชม.",
      url: "https://www.bigc.co.th",
      badge: "โปรโมชั่นเยอะ",
      color: "bg-purple-600"
    },
    {
      id: "7eleven",
      name: "7-Eleven",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/7-eleven_logo.svg/200px-7-eleven_logo.svg.png",
      description: "สะดวกสบาย มีทุกที่",
      rating: 4.6,
      deliveryTime: "รับสินค้าภายใน 24 ชม.",
      url: "https://www.7eleven.co.th",
      badge: "สาขาใกล้บ้าน",
      color: "bg-green-600"
    }
  ];


  return (
    <div className="min-h-screen bg-background pb-20">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">สั่งซื้อส่วนผสม</h1>
          <p className="text-muted-foreground">ซื้อส่วนผสมอาหารไทยออนไลน์ ส่งถึงบ้านสะดวกสบาย</p>
        </div>

        {/* Retailers Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <ShoppingCart className="h-6 w-6 text-primary" />
            ร้านค้าพันธมิตร
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {retailers.map((retailer) => (
              <Card key={retailer.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4 mb-4">
                    <img 
                      src={retailer.logo} 
                      alt={retailer.name}
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <h3 className="text-xl font-bold mb-1">{retailer.name}</h3>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span>{retailer.rating}</span>
                      </div>
                      <Badge className={retailer.color}>{retailer.badge}</Badge>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">{retailer.description}</p>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                    <Package className="h-4 w-4" />
                    <span>{retailer.deliveryTime}</span>
                  </div>
                  <Button 
                    className="w-full"
                    onClick={() => window.open(retailer.url, '_blank')}
                  >
                    ซื้อเลย <ExternalLink className="h-4 w-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>


        {/* Info Banner */}
        <Card className="mt-8 bg-gradient-cultural border-primary/20">
          <CardContent className="p-6 text-center">
            <Package className="h-12 w-12 text-primary mx-auto mb-3" />
            <h3 className="text-xl font-bold mb-2">จัดส่งฟรี เมื่อซื้อครบ 500 บาท</h3>
            <p className="text-muted-foreground">
              รับส่วนผสมสดใหม่ถึงบ้าน พร้อมปรุงอาหารไทยแสนอร่อย
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default OrderIngredients;