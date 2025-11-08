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
      logo: "https://images.unsplash.com/photo-1557821552-17105176677c?w=80&h=80&fit=crop",
      description: "ส่วนผสมอาหารไทย พร้อมส่งถึงบ้าน",
      rating: 4.8,
      deliveryTime: "ส่งไว 2 ชั่วโมง",
      url: "https://shopee.co.th",
      badge: "ราคาถูกที่สุด",
      color: "bg-orange-500"
    },
    {
      id: "7eleven",
      name: "7-Eleven",
      logo: "https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=80&h=80&fit=crop",
      description: "สะดวกสบาย มีทุกที่",
      rating: 4.6,
      deliveryTime: "รับสินค้าภายใน 24 ชม.",
      url: "https://www.7eleven.co.th",
      badge: "สาขาใกล้บ้าน",
      color: "bg-green-600"
    },
    {
      id: "lotus",
      name: "Lotus's",
      logo: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=80&h=80&fit=crop",
      description: "ซูเปอร์มาร์เก็ตครบครัน",
      rating: 4.7,
      deliveryTime: "จัดส่งภายใน 3 ชม.",
      url: "https://www.lotuss.com",
      badge: "สินค้าสด",
      color: "bg-red-600"
    },
    {
      id: "tops",
      name: "Tops",
      logo: "https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=80&h=80&fit=crop",
      description: "ส่วนผสมคุณภาพพรีเมี่ยม",
      rating: 4.8,
      deliveryTime: "จัดส่งภายใน 2 ชม.",
      url: "https://www.tops.co.th",
      badge: "คุณภาพสูง",
      color: "bg-blue-600"
    },
    {
      id: "bigc",
      name: "BigC",
      logo: "https://images.unsplash.com/photo-1578916171728-46686eac8d58?w=80&h=80&fit=crop",
      description: "ช้อปครบจบในที่เดียว",
      rating: 4.5,
      deliveryTime: "จัดส่งภายใน 4 ชม.",
      url: "https://www.bigc.co.th",
      badge: "โปรโมชั่นเยอะ",
      color: "bg-purple-600"
    }
  ];

  const popularIngredients = [
    { name: "พริกไทย", price: "฿25", image: "https://images.unsplash.com/photo-1583623733237-4d5764e9c18b?w=200&h=150&fit=crop", inStock: true },
    { name: "กุ้งสด", price: "฿180/กก.", image: "https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?w=200&h=150&fit=crop", inStock: true },
    { name: "ตะไคร้", price: "฿15", image: "https://images.unsplash.com/photo-1629193917250-06238e94f144?w=200&h=150&fit=crop", inStock: true },
    { name: "น้ำปลา", price: "฿45", image: "https://images.unsplash.com/photo-1563636619-e9143da7973b?w=200&h=150&fit=crop", inStock: true },
    { name: "กะทิสด", price: "฿35", image: "https://images.unsplash.com/photo-1608181831042-5f88d2580e6b?w=200&h=150&fit=crop", inStock: false },
    { name: "ใบโหระพา", price: "฿10", image: "https://images.unsplash.com/photo-1628556270448-4d4e4148e1b1?w=200&h=150&fit=crop", inStock: true }
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

        {/* Popular Ingredients */}
        <section>
          <h2 className="text-2xl font-bold mb-6">ส่วนผสมยอดนิยม</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {popularIngredients.map((ingredient, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-0">
                  <div className="relative">
                    <img 
                      src={ingredient.image} 
                      alt={ingredient.name}
                      className="w-full h-32 object-cover rounded-t-lg"
                    />
                    {!ingredient.inStock && (
                      <Badge className="absolute top-2 right-2 bg-red-500">หมด</Badge>
                    )}
                  </div>
                  <div className="p-3">
                    <h3 className="font-semibold text-sm mb-1">{ingredient.name}</h3>
                    <p className="text-primary font-bold text-sm">{ingredient.price}</p>
                  </div>
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