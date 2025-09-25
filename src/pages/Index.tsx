import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import FlavorDnaCard from "@/components/FlavorDnaCard";
import DishCard from "@/components/DishCard";
import OnboardingModal from "@/components/OnboardingModal";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { featuredDishes } from "@/data/mockData";
import { useToast } from "@/hooks/use-toast";
import thaiHeroImage from "@/assets/thai-hero.jpg";
import { TrendingUp, MapPin, Users } from "lucide-react";

const Index = () => {
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [userPreferences, setUserPreferences] = useState<string[]>([]);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleOnboardingComplete = (preferences: string[]) => {
    setUserPreferences(preferences);
    toast({
      title: "Flavor DNA Created! 🎉",
      description: "Your personalized Thai food journey begins now",
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
                Discover Authentic 
                <span className="block text-primary">
                  Thai Flavors
                </span>
              </h1>
              <p className="text-lg md:text-xl mb-6 text-white/90">
                AI-powered personalization meets centuries of culinary tradition
              </p>
              <Button 
                variant="hero" 
                size="lg"
                onClick={() => setShowOnboarding(true)}
              >
                Start Your Flavor Journey
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
              <h2 className="text-2xl font-bold">Personalized for You</h2>
              <Badge variant="secondary" className="flex items-center gap-1">
                <TrendingUp className="h-4 w-4" />
                AI Matched
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

        {/* Featured Dishes */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Featured Thai Dishes</h2>
            <Button variant="outline">View All</Button>
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
            <p className="text-muted-foreground">Thai Restaurants</p>
          </div>
          <div className="text-center p-6 bg-gradient-cultural rounded-lg">
            <Users className="h-8 w-8 text-primary mx-auto mb-2" />
            <h3 className="text-2xl font-bold">10K+</h3>
            <p className="text-muted-foreground">Food Explorers</p>
          </div>
          <div className="text-center p-6 bg-gradient-cultural rounded-lg">
            <TrendingUp className="h-8 w-8 text-primary mx-auto mb-2" />
            <h3 className="text-2xl font-bold">500+</h3>
            <p className="text-muted-foreground">Authentic Recipes</p>
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
