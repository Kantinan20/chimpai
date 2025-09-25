import padThaiImage from "@/assets/pad-thai.jpg";
import tomYumImage from "@/assets/tom-yum.jpg";
import greenCurryImage from "@/assets/green-curry.jpg";

export const featuredDishes = [
  {
    id: "1",
    name: "Pad Thai",
    image: padThaiImage,
    description: "Thailand's most famous stir-fried noodle dish with shrimp, tofu, bean sprouts, and a perfect balance of sweet, sour, and salty flavors.",
    cookTime: "25 min",
    difficulty: "Easy",
    spiceLevel: 1,
    rating: 4.8,
    origin: "Central Thailand",
    isPersonalized: true,
    story: "Created in the 1930s as part of Thailand's national identity campaign, Pad Thai represents the harmony of flavors that defines Thai cuisine.",
    ingredients: [
      "Rice noodles",
      "Shrimp or tofu", 
      "Bean sprouts",
      "Eggs",
      "Tamarind paste",
      "Fish sauce",
      "Palm sugar",
      "Crushed peanuts",
      "Lime wedges",
      "Thai chilies"
    ],
    nutrition: {
      calories: 320,
      protein: "18g",
      carbs: "45g", 
      fat: "12g"
    }
  },
  {
    id: "2", 
    name: "Tom Yum Goong",
    image: tomYumImage,
    description: "A hot and sour Thai soup with shrimp, mushrooms, and aromatic herbs that awakens all your senses.",
    cookTime: "20 min",
    difficulty: "Medium", 
    spiceLevel: 3,
    rating: 4.9,
    origin: "Central Thailand",
    story: "This iconic soup embodies the essence of Thai cuisine - the perfect balance of hot, sour, salty, and aromatic flavors in every spoonful.",
    ingredients: [
      "Fresh shrimp",
      "Lemongrass",
      "Galangal",
      "Kaffir lime leaves", 
      "Thai chilies",
      "Fish sauce",
      "Lime juice",
      "Mushrooms",
      "Tomatoes",
      "Cilantro"
    ],
    nutrition: {
      calories: 120,
      protein: "15g", 
      carbs: "8g",
      fat: "3g"
    }
  },
  {
    id: "3",
    name: "Green Curry",
    image: greenCurryImage, 
    description: "Creamy coconut curry with fresh green chilies, Thai basil, and your choice of meat or vegetables.",
    cookTime: "35 min",
    difficulty: "Medium",
    spiceLevel: 2,
    rating: 4.7,
    origin: "Central Thailand", 
    isPersonalized: true,
    story: "Green curry showcases the art of Thai curry paste making, where fresh herbs and spices are ground together to create complex flavors.",
    ingredients: [
      "Green curry paste",
      "Coconut milk", 
      "Chicken or vegetables",
      "Thai eggplant",
      "Thai basil",
      "Fish sauce",
      "Palm sugar",
      "Kaffir lime leaves",
      "Green chilies",
      "Jasmine rice"
    ],
    nutrition: {
      calories: 380,
      protein: "22g",
      carbs: "28g", 
      fat: "25g"
    }
  }
];

export const mockRestaurants = [
  {
    id: "1",
    name: "Thai Garden",
    address: "123 Main St, Downtown",
    rating: 4.6,
    distance: "0.8 miles",
    specialties: ["Pad Thai", "Tom Yum"]
  },
  {
    id: "2", 
    name: "Bangkok Street Food",
    address: "456 Food Ave, Midtown", 
    rating: 4.8,
    distance: "1.2 miles",
    specialties: ["Green Curry", "Mango Sticky Rice"]
  }
];

export const flavorPreferences = [
  { id: "spicy", label: "Spicy", icon: "🌶️" },
  { id: "mild", label: "Mild", icon: "🥥" },
  { id: "sweet", label: "Sweet", icon: "🍯" },
  { id: "sour", label: "Sour", icon: "🍋" },
  { id: "vegetarian", label: "Vegetarian", icon: "🥬" },
  { id: "vegan", label: "Vegan", icon: "🌱" },
  { id: "healthy", label: "Healthy", icon: "💚" },
  { id: "comfort", label: "Comfort Food", icon: "🍜" }
];