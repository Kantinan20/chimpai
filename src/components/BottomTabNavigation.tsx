import { useLocation, useNavigate } from "react-router-dom";
import { Home, MapPin, Bot, User, ShoppingCart } from "lucide-react";
import { cn } from "@/lib/utils";

const BottomTabNavigation = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const tabs = [
    {
      id: "home",
      label: "หน้าหลัก",
      icon: Home,
      path: "/",
    },
    {
      id: "places",
      label: "สถานที่",
      icon: MapPin,
      path: "/places",
    },
    {
      id: "order",
      label: "สั่งซื้อ",
      icon: ShoppingCart,
      path: "/order-ingredients",
    },
    {
      id: "ai-chef",
      label: "AI Chef",
      icon: Bot,
      path: "/ai-chef",
    },
    {
      id: "profile",
      label: "โปรไฟล์",
      icon: User,
      path: "/profile",
    },
  ];

  const handleTabClick = (path: string) => {
    navigate(path);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-t border-border">
      <div className="flex items-center justify-around h-16 px-2">
        {tabs.map((tab) => {
          const isActive = location.pathname === tab.path;
          const Icon = tab.icon;
          
          return (
            <button
              key={tab.id}
              onClick={() => handleTabClick(tab.path)}
              className={cn(
                "flex flex-col items-center justify-center min-w-0 flex-1 py-2 px-1 transition-thai",
                isActive 
                  ? "text-primary" 
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <Icon 
                className={cn(
                  "h-5 w-5 mb-1",
                  isActive && "drop-shadow-[0_0_8px_hsl(var(--primary)/0.5)]"
                )} 
              />
              <span className="text-xs font-medium truncate">
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default BottomTabNavigation;