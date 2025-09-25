import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { featuredDishes } from "@/data/mockData";
import { ArrowLeft, Clock, Users, Flame, Star, MapPin, Sparkles, Play } from "lucide-react";
import Header from "@/components/Header";

const RecipeDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dish = featuredDishes.find(d => d.id === id);

  if (!dish) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-8 text-center">
          <h1 className="text-2xl font-bold mb-4">Recipe Not Found</h1>
          <Button onClick={() => navigate("/")} variant="outline">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Button>
        </div>
      </div>
    );
  }

  const getSpiceIcons = (level: number) => {
    return Array.from({ length: 3 }, (_, i) => (
      <Flame key={i} className={`h-4 w-4 ${i < level ? 'text-red-500' : 'text-gray-300'}`} />
    ));
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <Button 
          onClick={() => navigate("/")} 
          variant="ghost" 
          className="mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Dishes
        </Button>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Image and Basic Info */}
          <div className="space-y-6">
            <div className="relative overflow-hidden rounded-xl shadow-thai">
              <img 
                src={dish.image} 
                alt={dish.name}
                className="w-full h-80 object-cover"
              />
              {dish.isPersonalized && (
                <Badge className="absolute top-4 right-4 bg-primary text-primary-foreground">
                  <Sparkles className="h-3 w-3 mr-1" />
                  AI Match
                </Badge>
              )}
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle>Quick Info</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{dish.cookTime}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">4 servings</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                  <span className="text-sm">{dish.rating}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{dish.origin}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">Spice:</span>
                  <div className="flex gap-1">{getSpiceIcons(dish.spiceLevel)}</div>
                </div>
                <Badge variant="outline">{dish.difficulty}</Badge>
              </CardContent>
            </Card>
          </div>

          {/* Recipe Details */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold mb-2">{dish.name}</h1>
              <p className="text-lg text-muted-foreground mb-4">{dish.description}</p>
              
              <div className="flex gap-3">
                <Button variant="hero" size="lg">
                  <Play className="h-4 w-4 mr-2" />
                  Start AR Cooking
                </Button>
                <Button variant="cultural">
                  Find Restaurants
                </Button>
              </div>
            </div>

            {/* Cultural Story */}
            {"story" in dish && (
              <Card className="bg-gradient-cultural border-primary/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-primary" />
                    Cultural Story
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-foreground/80">{dish.story}</p>
                </CardContent>
              </Card>
            )}

            {/* Ingredients */}
            {"ingredients" in dish && (
              <Card>
                <CardHeader>
                  <CardTitle>Ingredients</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {dish.ingredients.map((ingredient, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-primary" />
                        <span>{ingredient}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}

            {/* Nutrition */}
            {"nutrition" in dish && (
              <Card>
                <CardHeader>
                  <CardTitle>Nutrition Facts</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-sm text-muted-foreground">Calories</div>
                      <div className="text-lg font-semibold">{dish.nutrition.calories}</div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Protein</div>
                      <div className="text-lg font-semibold">{dish.nutrition.protein}</div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Carbs</div>
                      <div className="text-lg font-semibold">{dish.nutrition.carbs}</div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Fat</div>
                      <div className="text-lg font-semibold">{dish.nutrition.fat}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetail;