import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { featuredDishes, recommendedRestaurants } from "@/data/mockData";
import { ArrowLeft, Clock, Users, Flame, Star, MapPin, Sparkles, CheckCircle } from "lucide-react";
import Header from "@/components/Header";

const RecipeDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dish = featuredDishes.find(d => d.id === id);
  const [checkedIngredients, setCheckedIngredients] = useState<string[]>([]);
  const [showRestaurants, setShowRestaurants] = useState(false);

  const handleIngredientCheck = (ingredient: string, checked: boolean) => {
    if (checked) {
      setCheckedIngredients([...checkedIngredients, ingredient]);
    } else {
      setCheckedIngredients(checkedIngredients.filter(i => i !== ingredient));
    }
  };

  const allIngredientsChecked = dish && "ingredients" in dish ? 
    checkedIngredients.length === dish.ingredients.length : false;

  const filteredRestaurants = recommendedRestaurants.filter(restaurant => 
    dish && restaurant.dishes.includes(dish.name)
  );

  if (!dish) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-8 text-center">
          <h1 className="text-2xl font-bold mb-4">ไม่พบสูตรอาหาร</h1>
          <Button onClick={() => navigate("/")} variant="outline">
            <ArrowLeft className="h-4 w-4 mr-2" />
            กลับสู่หน้าแรก
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
          กลับสู่เมนูอาหาร
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
                  AI จับคู่
                </Badge>
              )}
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle>ข้อมูลทั่วไป</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{dish.cookTime}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">4 ที่</span>
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
                  <span className="text-sm text-muted-foreground">ความเผ็ด:</span>
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
                <Button 
                  variant="cultural"
                  onClick={() => setShowRestaurants(true)}
                >
                  <MapPin className="h-4 w-4 mr-2" />
                  หาร้านอาหาร
                </Button>
              </div>
            </div>

            {/* Cultural Story */}
            {"story" in dish && (
              <Card className="bg-gradient-cultural border-primary/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-primary" />
                    เรื่องราวทางวัฒนธรรม
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
                  <CardTitle>ส่วนผสม</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    {dish.ingredients.map((ingredient, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <Checkbox
                          id={`ingredient-${index}`}
                          checked={checkedIngredients.includes(ingredient)}
                          onCheckedChange={(checked) => 
                            handleIngredientCheck(ingredient, checked as boolean)
                          }
                        />
                        <label 
                          htmlFor={`ingredient-${index}`}
                          className={`text-sm cursor-pointer ${
                            checkedIngredients.includes(ingredient) 
                              ? 'line-through text-muted-foreground' 
                              : ''
                          }`}
                        >
                          {ingredient}
                        </label>
                      </div>
                    ))}
                  </div>
                  <Button 
                    className="w-full" 
                    variant={allIngredientsChecked ? "default" : "secondary"}
                    onClick={() => {
                      if (allIngredientsChecked) {
                        console.log("เริ่มทำอาหาร");
                      }
                    }}
                  >
                    <CheckCircle className="h-4 w-4 mr-2" />
                    {allIngredientsChecked ? "เริ่มทำอาหาร" : `เตรียมส่วนผสม (${checkedIngredients.length}/${dish.ingredients.length})`}
                  </Button>
                </CardContent>
              </Card>
            )}

            {/* Nutrition */}
            {"nutrition" in dish && (
              <Card>
                <CardHeader>
                  <CardTitle>ข้อมูลโภชนาการ</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-sm text-muted-foreground">แคลอรี่</div>
                      <div className="text-lg font-semibold">{dish.nutrition.calories}</div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">โปรตีน</div>
                      <div className="text-lg font-semibold">{dish.nutrition.protein}</div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">คาร์โบไฮเดรต</div>
                      <div className="text-lg font-semibold">{dish.nutrition.carbs}</div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">ไขมัน</div>
                      <div className="text-lg font-semibold">{dish.nutrition.fat}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>

      {/* Restaurant Finder Dialog */}
      <Dialog open={showRestaurants} onOpenChange={setShowRestaurants}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-primary" />
              ร้านอาหารที่มี{dish?.name}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            {filteredRestaurants.length > 0 ? (
              filteredRestaurants.map((restaurant) => (
                <div 
                  key={restaurant.id}
                  className="flex items-center gap-3 p-3 border rounded-lg hover:bg-muted/50 cursor-pointer transition-colors"
                  onClick={() => {
                    window.open(`https://www.google.com/maps/dir/?api=1&destination=${restaurant.lat},${restaurant.lng}`, '_blank');
                    setShowRestaurants(false);
                  }}
                >
                  <img 
                    src={restaurant.image} 
                    alt={restaurant.name}
                    className="w-12 h-12 rounded object-cover"
                  />
                  <div className="flex-1">
                    <h3 className="font-medium">{restaurant.name}</h3>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span>{restaurant.rating}</span>
                      <span>•</span>
                      <span>{restaurant.distance}</span>
                    </div>
                  </div>
                  <Badge variant="outline">{restaurant.priceRange}</Badge>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <MapPin className="h-8 w-8 mx-auto mb-2 opacity-50" />
                <p>ไม่พบร้านอาหารที่มี{dish?.name}</p>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default RecipeDetail;