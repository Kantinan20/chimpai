import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import FlavorDnaCard from "@/components/FlavorDnaCard";
import DishCard from "@/components/DishCard";
import OnboardingModal from "@/components/OnboardingModal";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { featuredDishes, trendingFoodsToday, recommendedRestaurants, top5ThaiFood2025 } from "@/data/mockData";
import { useToast } from "@/hooks/use-toast";
import thaiHeroImage from "@/assets/thai-hero.jpg";
import { TrendingUp, MapPin, Users, Star, Clock, Trophy, Globe } from "lucide-react";

const Index = () => {
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [userPreferences, setUserPreferences] = useState<string[]>([]);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleOnboardingComplete = (preferences: string[]) => {
    setUserPreferences(preferences);
    toast({
      title: "สร้างดีเอ็นเอรสชาติแล้ว! 🎉",
      description: "การเดินทางสู่อาหารไทยส่วนตัวของคุณเริ่มต้นแล้ว",
    });
  };

  const handleDishClick = (dishId: string) => {
    navigate(`/recipe/${dishId}`);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div 
          className="h-96 bg-cover bg-center relative"
          style={{ backgroundImage: `url(${thaiHeroImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/30" />
          <div className="container mx-auto px-4 h-full flex items-center relative z-10">
            <div className="max-w-2xl text-white">
              <h1 className="text-4xl md:text-6xl font-bold mb-4">
                ค้นพบรสชาติ
                <span className="block text-primary">
                  ไทยแท้
                </span>
              </h1>
              <p className="text-lg md:text-xl mb-6 text-white/90">
                การปรับแต่งด้วย AI พบกับประเพณีการทำอาหารหลายศตวรรษ
              </p>
              <Button 
                variant="hero" 
                size="lg"
                onClick={() => setShowOnboarding(true)}
              >
                เริ่มต้นการเดินทางรสชาติ
              </Button>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8 space-y-12">
        {/* Flavor DNA Section */}
        {userPreferences.length === 0 && (
          <section>
            <FlavorDnaCard onStartOnboarding={() => setShowOnboarding(true)} />
          </section>
        )}

        {/* Personalized Recommendations */}
        {userPreferences.length > 0 && (
          <section>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">แนะนำเฉพาะสำหรับคุณ</h2>
              <Badge variant="secondary" className="flex items-center gap-1">
                <TrendingUp className="h-4 w-4" />
                AI จับคู่
              </Badge>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredDishes
                .filter(dish => dish.isPersonalized)
                .map((dish) => (
                  <DishCard 
                    key={dish.id} 
                    dish={dish} 
                    onClick={() => handleDishClick(dish.id)}
                  />
                ))}
            </div>
          </section>
        )}

        {/* Trending Foods Today */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <TrendingUp className="h-6 w-6 text-primary" />
              เทรนด์อาหารวันนี้
            </h2>
            <Badge variant="destructive">HOT</Badge>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            {trendingFoodsToday.map((food) => (
              <div key={food.id} className="bg-card rounded-lg p-4 hover:shadow-lg transition-shadow">
                <div className="flex items-center gap-3 mb-3">
                  <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">
                    {food.trendingRank}
                  </div>
                  <div>
                    <h3 className="font-semibold">{food.name}</h3>
                    <p className="text-sm text-muted-foreground">{food.views} ครั้ง</p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">{food.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Recommended Restaurants */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <MapPin className="h-6 w-6 text-primary" />
              ร้านอาหารแนะนำ
            </h2>
            <Button variant="outline">ดูทั้งหมด</Button>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {recommendedRestaurants.map((restaurant) => (
              <div key={restaurant.id} className="bg-card rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                <div className="h-40 bg-gradient-to-r from-primary/20 to-primary/10"></div>
                <div className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold">{restaurant.name}</h3>
                    <Badge variant="secondary" className="text-xs">{restaurant.priceRange}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">{restaurant.cuisine}</p>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span>{restaurant.rating}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      <span>{restaurant.distance}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>{restaurant.openUntil}</span>
                    </div>
                  </div>
                  <p className="text-sm"><span className="font-medium">เมนูเด่น:</span> {restaurant.specialDish}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Top 5 Thai Foods 2025 */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <Trophy className="h-6 w-6 text-primary" />
              5 อาหารไทยยอดนิยมโลก 2025
            </h2>
            <Badge variant="outline" className="flex items-center gap-1">
              <Globe className="h-4 w-4" />
              Global
            </Badge>
          </div>
          <div className="space-y-4">
            {top5ThaiFood2025.map((food) => (
              <div key={food.id} className="bg-gradient-cultural rounded-lg p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-center gap-4">
                  <div className="bg-primary text-primary-foreground rounded-full w-12 h-12 flex items-center justify-center font-bold text-lg">
                    {food.rank}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-xl font-bold">{food.name}</h3>
                      <span className="text-muted-foreground">({food.englishName})</span>
                    </div>
                    <p className="text-muted-foreground mb-2">{food.description}</p>
                    <div className="flex flex-wrap gap-4 text-sm">
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span>{food.globalRating}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Globe className="h-4 w-4" />
                        <span>{food.countriesServed} ประเทศ</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <TrendingUp className="h-4 w-4" />
                        <span>{food.yearlySearches} ค้นหา/ปี</span>
                      </div>
                      <Badge variant="secondary">{food.culturalSignificance}</Badge>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Featured Dishes */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">อาหารไทยแนะนำ</h2>
            <Button variant="outline">ดูทั้งหมด</Button>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredDishes.map((dish) => (
              <DishCard 
                key={dish.id} 
                dish={dish} 
                onClick={() => handleDishClick(dish.id)}
              />
            ))}
          </div>
        </section>

        {/* Quick Stats */}
        <section className="grid md:grid-cols-3 gap-6">
          <div className="text-center p-6 bg-gradient-cultural rounded-lg">
            <MapPin className="h-8 w-8 text-primary mx-auto mb-2" />
            <h3 className="text-2xl font-bold">150+</h3>
            <p className="text-muted-foreground">ร้านอาหารไทย</p>
          </div>
          <div className="text-center p-6 bg-gradient-cultural rounded-lg">
            <Users className="h-8 w-8 text-primary mx-auto mb-2" />
            <h3 className="text-2xl font-bold">10K+</h3>
            <p className="text-muted-foreground">นักสำรวจอาหาร</p>
          </div>
          <div className="text-center p-6 bg-gradient-cultural rounded-lg">
            <TrendingUp className="h-8 w-8 text-primary mx-auto mb-2" />
            <h3 className="text-2xl font-bold">500+</h3>
            <p className="text-muted-foreground">สูตรอาหารแท้</p>
          </div>
        </section>
      </div>

      <OnboardingModal
        isOpen={showOnboarding}
        onClose={() => setShowOnboarding(false)}
        onComplete={handleOnboardingComplete}
      />
    </div>
  );
};

export default Index;
