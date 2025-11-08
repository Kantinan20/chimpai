import { useState } from "react";
import { User, Settings, Heart, BookOpen, Award, ChefHat, Edit2, Bell, Shield, LogOut, Palette, UserCircle, Eye, EyeOff, Crown, HelpCircle, Sparkles, Check, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";

const Profile = () => {
  const { toast } = useToast();
  const [notifications, setNotifications] = useState(true);
  const [privateProfile, setPrivateProfile] = useState(false);
  const [personalInfoVisible, setPersonalInfoVisible] = useState(true);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isSubscriptionDialogOpen, setIsSubscriptionDialogOpen] = useState(false);
  const [currentPlan, setCurrentPlan] = useState<"free" | "basic" | "plus" | "pro">("free");
  const [isPremiumMode, setIsPremiumMode] = useState(false);

  // Profile state
  const [userName, setUserName] = useState("คุณสมชาย ใจดี");
  const [personalInfo, setPersonalInfo] = useState({
    gender: "ชาย",
    age: 28,
    chronicDiseases: ["ไม่มี"],
    foodAllergies: ["ไม่มี"]
  });

  // Edit form state
  const [editForm, setEditForm] = useState({
    name: userName,
    gender: personalInfo.gender,
    age: personalInfo.age.toString(),
    chronicDiseases: personalInfo.chronicDiseases.join(", "),
    foodAllergies: personalInfo.foodAllergies.join(", ")
  });

  const handleEditProfile = () => {
    setEditForm({
      name: userName,
      gender: personalInfo.gender,
      age: personalInfo.age.toString(),
      chronicDiseases: personalInfo.chronicDiseases.join(", "),
      foodAllergies: personalInfo.foodAllergies.join(", ")
    });
    setIsEditDialogOpen(true);
  };

  const handleSaveProfile = () => {
    setUserName(editForm.name);
    setPersonalInfo({
      gender: editForm.gender,
      age: parseInt(editForm.age) || 0,
      chronicDiseases: editForm.chronicDiseases.split(",").map(d => d.trim()).filter(d => d),
      foodAllergies: editForm.foodAllergies.split(",").map(a => a.trim()).filter(a => a)
    });
    setIsEditDialogOpen(false);
    toast({
      title: "บันทึกสำเร็จ",
      description: "ข้อมูลโปรไฟล์ของคุณได้รับการอัปเดตแล้ว",
    });
  };

  const handleUpgradePlan = (plan: "basic" | "plus" | "pro") => {
    setCurrentPlan(plan);
    setIsPremiumMode(true);
    setIsSubscriptionDialogOpen(false);
    toast({
      title: "อัปเกรดสำเร็จ! 🎉",
      description: `คุณได้อัปเกรดเป็น ${plan === "basic" ? "Basic" : plan === "plus" ? "Plus" : "Pro"} แล้ว`,
    });
  };

  const subscriptionPlans = [
    {
      id: "basic",
      name: "Basic",
      price: "฿79",
      period: "/เดือน",
      features: [
        "แชทบอทไม่จำกัดทุกเวลา",
        "เข้าถึงสูตรอาหารพื้นฐาน",
        "รับการแจ้งเตือนพิเศษ"
      ],
      color: "from-slate-600 to-slate-800"
    },
    {
      id: "plus",
      name: "Plus",
      price: "฿189",
      period: "/เดือน",
      features: [
        "บันทึกและกดถูกใจสูตรได้ไม่จำกัด",
        "รับคำแนะนำเมนูที่เหมาะกับคุณ",
        "ระบบวางแผนมื้ออาหารอัจฉริยะ",
        "ฟีเจอร์ทั้งหมดของ Basic"
      ],
      color: "from-primary to-thai-green",
      popular: true
    },
    {
      id: "pro",
      name: "Pro",
      price: "฿299",
      period: "/เดือน",
      features: [
        "บันทึกสูตรไม่จำกัด",
        "AI Chatbot ส่วนตัว 24/7",
        "วางแผนมื้ออาหารเชื่อมกับข้อมูลสุขภาพ",
        "ส่วนลดพิเศษร้านอาหาร",
        "ฟีเจอร์ทั้งหมดของ Plus"
      ],
      color: "from-yellow-600 to-amber-700"
    }
  ];

  const getPlanLabel = () => {
    if (currentPlan === "free") return "Free";
    if (currentPlan === "basic") return "Basic";
    if (currentPlan === "plus") return "Plus";
    if (currentPlan === "pro") return "Pro";
    return "Free";
  };

  const userStats = [
    {
      label: "สูตรที่บันทึก",
      value: "24",
      icon: BookOpen,
      color: "text-primary"
    },
    {
      label: "ร้านโปรด",
      value: "12",
      icon: Heart,
      color: "text-secondary"
    },
    {
      label: "เลเวลเชฟ",
      value: "มือใหม่",
      icon: ChefHat,
      color: "text-thai-green"
    },
    {
      label: "คะแนนรีวิว",
      value: "4.8",
      icon: Award,
      color: "text-yellow-600"
    }
  ];

  const flavorProfile = [
    { name: "เผ็ด", level: 80, color: "bg-red-500" },
    { name: "หวาน", level: 60, color: "bg-pink-500" },
    { name: "เปรี้ยว", level: 70, color: "bg-yellow-500" },
    { name: "เค็ม", level: 40, color: "bg-blue-500" },
    { name: "หอม", level: 90, color: "bg-thai-green" }
  ];

  const menuItems = [
    {
      title: "แก้ไขโปรไฟล์",
      subtitle: "เปลี่ยนรูปภาพ ชื่อ และข้อมูลส่วนตัว",
      icon: Edit2,
      action: handleEditProfile
    },
    {
      title: "การแจ้งเตือน",
      subtitle: notifications ? "เปิดการแจ้งเตือน" : "ปิดการแจ้งเตือน",
      icon: Bell,
      isSwitch: true,
      checked: notifications,
      onChange: setNotifications
    },
    {
      title: "ความเป็นส่วนตัว",
      subtitle: privateProfile ? "โปรไฟล์ส่วนตัว" : "โปรไฟล์สาธารณะ",
      icon: Shield,
      isSwitch: true,
      checked: privateProfile,
      onChange: setPrivateProfile
    },
    {
      title: "ตั้งค่า",
      subtitle: "ภาษา, ธีม และการตั้งค่าอื่นๆ",
      icon: Settings,
      action: () => console.log("Settings")
    }
  ];

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-primary">
            โปรไฟล์
          </h1>
          {/* Premium Mode Toggle for Demo */}
          <div className="flex items-center gap-2 text-xs">
            <span className="text-muted-foreground">Demo Mode:</span>
            <Switch 
              checked={isPremiumMode} 
              onCheckedChange={(checked) => {
                setIsPremiumMode(checked);
                if (!checked) setCurrentPlan("free");
                toast({
                  title: checked ? "Premium Mode เปิดใช้งาน" : "Free Mode เปิดใช้งาน",
                  description: checked ? "กำลังแสดงฟีเจอร์พรีเมียม" : "กำลังแสดงฟีเจอร์ฟรี",
                });
              }}
            />
            <span className={isPremiumMode ? "text-yellow-500 font-semibold" : "text-muted-foreground"}>
              {isPremiumMode ? "Premium" : "Free"}
            </span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 space-y-6">
        {/* Profile Header */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center space-x-4">
              <div className="h-16 w-16 bg-gradient-temple-gold rounded-full flex items-center justify-center">
                <User className="h-8 w-8 text-primary-foreground" />
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-bold text-foreground">
                  {userName}
                </h2>
                
                {/* Account Dropdown Menu - ChatGPT Style */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors group mt-1">
                      <span>somchai@example.com</span>
                      <ChevronDown className="h-3 w-3 group-hover:translate-y-0.5 transition-transform" />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent 
                    align="start" 
                    className="w-64 bg-slate-900 border-slate-800 text-slate-100 shadow-2xl"
                  >
                    <DropdownMenuLabel className="pb-2">
                      <div className="flex items-center gap-2 text-xs">
                        <span className="text-slate-400">แผนปัจจุบัน:</span>
                        <Badge 
                          variant={isPremiumMode ? "default" : "secondary"} 
                          className={isPremiumMode ? "bg-gradient-to-r from-yellow-600 to-amber-700 text-white" : "bg-slate-700 text-slate-300"}
                        >
                          {isPremiumMode && <Crown className="h-3 w-3 mr-1" />}
                          {getPlanLabel()}
                        </Badge>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator className="bg-slate-800" />
                    
                    <DropdownMenuItem 
                      onClick={() => setIsSubscriptionDialogOpen(true)}
                      className="hover:bg-slate-800 cursor-pointer py-3 focus:bg-slate-800 focus:text-slate-100"
                    >
                      <Crown className="h-4 w-4 mr-3 text-yellow-500" />
                      <div>
                        <div className="font-semibold">อัปเกรดแผน</div>
                        <div className="text-xs text-slate-400">ปลดล็อกฟีเจอร์พรีเมียม</div>
                      </div>
                    </DropdownMenuItem>
                    
                    <DropdownMenuItem 
                      onClick={handleEditProfile}
                      className="hover:bg-slate-800 cursor-pointer py-3 focus:bg-slate-800 focus:text-slate-100"
                    >
                      <UserCircle className="h-4 w-4 mr-3" />
                      <div>
                        <div className="font-semibold">ตั้งค่าส่วนตัว</div>
                        <div className="text-xs text-slate-400">จัดการข้อมูลของคุณ</div>
                      </div>
                    </DropdownMenuItem>
                    
                    <DropdownMenuItem 
                      className="hover:bg-slate-800 cursor-pointer py-3 focus:bg-slate-800 focus:text-slate-100"
                    >
                      <Settings className="h-4 w-4 mr-3" />
                      <div>
                        <div className="font-semibold">ตั้งค่าแอป</div>
                        <div className="text-xs text-slate-400">ธีม, ภาษา และการแจ้งเตือน</div>
                      </div>
                    </DropdownMenuItem>
                    
                    <DropdownMenuItem 
                      className="hover:bg-slate-800 cursor-pointer py-3 focus:bg-slate-800 focus:text-slate-100"
                    >
                      <HelpCircle className="h-4 w-4 mr-3" />
                      <div>
                        <div className="font-semibold">ศูนย์ช่วยเหลือ</div>
                        <div className="text-xs text-slate-400">คำถามที่พบบ่อย & การสนับสนุน</div>
                      </div>
                    </DropdownMenuItem>
                    
                    <DropdownMenuSeparator className="bg-slate-800" />
                    
                    <DropdownMenuItem 
                      className="hover:bg-red-900/20 cursor-pointer py-3 text-red-400 focus:bg-red-900/20 focus:text-red-400"
                    >
                      <LogOut className="h-4 w-4 mr-3" />
                      <div className="font-semibold">ออกจากระบบ</div>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

                <div className="flex items-center mt-2">
                  <Badge variant="secondary" className="mr-2">
                    <Award className="h-3 w-3 mr-1" />
                    สมาชิกระดับเงิน
                  </Badge>
                  <Badge variant="outline">
                    เข้าร่วม 6 เดือน
                  </Badge>
                </div>
              </div>
              <Button variant="outline" size="icon" onClick={handleEditProfile}>
                <Edit2 className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4">
          {userStats.map((stat, index) => {
            const isLocked = !isPremiumMode && (stat.label === "สูตรที่บันทึก" || stat.label === "ร้านโปรด");
            return (
              <Card key={index} className={isLocked ? "opacity-50 relative" : ""}>
                <CardContent className="pt-6">
                  {isLocked && (
                    <div className="absolute inset-0 bg-background/80 backdrop-blur-sm rounded-lg flex items-center justify-center">
                      <Crown className="h-6 w-6 text-yellow-500" />
                    </div>
                  )}
                  <div className="flex items-center space-x-3">
                    <div className={`${stat.color}`}>
                      <stat.icon className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">{stat.value}</p>
                      <p className="text-sm text-muted-foreground">{stat.label}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Personal Information */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center space-x-2">
                <UserCircle className="h-5 w-5 text-primary" />
                <span>ข้อมูลส่วนตัว</span>
              </CardTitle>
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleEditProfile}
                >
                  <Edit2 className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setPersonalInfoVisible(!personalInfoVisible)}
                  className="flex items-center gap-2"
                >
                  {personalInfoVisible ? (
                    <>
                      <Eye className="h-4 w-4" />
                      <span className="text-xs">แสดงต่อผู้อื่น</span>
                    </>
                  ) : (
                    <>
                      <EyeOff className="h-4 w-4" />
                      <span className="text-xs">ซ่อนจากผู้อื่น</span>
                    </>
                  )}
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between items-center py-2 border-b border-border">
              <span className="text-sm text-muted-foreground">เพศ</span>
              <span className="font-medium">{personalInfo.gender}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-border">
              <span className="text-sm text-muted-foreground">อายุ</span>
              <span className="font-medium">{personalInfo.age} ปี</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-border">
              <span className="text-sm text-muted-foreground">โรคประจำตัว</span>
              <span className="font-medium">{personalInfo.chronicDiseases.join(", ")}</span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-sm text-muted-foreground">อาหารที่แพ้</span>
              <span className="font-medium">{personalInfo.foodAllergies.join(", ")}</span>
            </div>
            {!personalInfoVisible && (
              <div className="bg-muted/50 rounded-lg p-3 mt-2">
                <p className="text-xs text-muted-foreground flex items-center gap-2">
                  <Shield className="h-3 w-3" />
                  ข้อมูลนี้จะไม่แสดงต่อผู้ใช้คนอื่น
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Flavor Profile */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <ChefHat className="h-5 w-5 text-primary" />
              <span>โปรไฟล์รสชาติของคุณ</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {flavorProfile.map((flavor, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="font-medium">{flavor.name}</span>
                  <span className="text-muted-foreground">{flavor.level}%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${flavor.color}`}
                    style={{ width: `${flavor.level}%` }}
                  />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Theme Toggle */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Palette className="h-5 w-5 text-primary" />
              <span>ธีมแอปพลิเคชัน</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ThemeToggle />
          </CardContent>
        </Card>

        {/* Menu Items */}
        <Card>
          <CardContent className="p-0">
            {menuItems.map((item, index) => (
              <div key={index}>
                <div
                  className="flex items-center justify-between p-4 cursor-pointer hover:bg-muted/50 transition-colors"
                  onClick={item.action}
                >
                  <div className="flex items-center space-x-3">
                    <div className="text-primary">
                      <item.icon className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-medium">{item.title}</p>
                      <p className="text-sm text-muted-foreground">{item.subtitle}</p>
                    </div>
                  </div>
                  {item.isSwitch ? (
                    <Switch
                      checked={item.checked}
                      onCheckedChange={item.onChange}
                    />
                  ) : (
                    <div className="text-muted-foreground">
                      <Edit2 className="h-4 w-4" />
                    </div>
                  )}
                </div>
                {index < menuItems.length - 1 && <Separator />}
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Logout */}
        <Card>
          <CardContent className="p-4">
            <Button
              variant="outline"
              className="w-full justify-start text-destructive border-destructive hover:bg-destructive hover:text-destructive-foreground"
            >
              <LogOut className="h-4 w-4 mr-2" />
              ออกจากระบบ
            </Button>
          </CardContent>
        </Card>

        {/* Edit Profile Dialog */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>แก้ไขข้อมูลส่วนตัว</DialogTitle>
              <DialogDescription>อัปเดตข้อมูลโปรไฟล์ของคุณ</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name">ชื่อ-นามสกุล</Label>
                <Input id="name" value={editForm.name} onChange={(e) => setEditForm({ ...editForm, name: e.target.value })} placeholder="กรอกชื่อ-นามสกุล" />
              </div>
              <div className="space-y-2">
                <Label>เพศ</Label>
                <RadioGroup value={editForm.gender} onValueChange={(value) => setEditForm({ ...editForm, gender: value })}>
                  <div className="flex items-center space-x-2"><RadioGroupItem value="ชาย" id="male" /><Label htmlFor="male">ชาย</Label></div>
                  <div className="flex items-center space-x-2"><RadioGroupItem value="หญิง" id="female" /><Label htmlFor="female">หญิง</Label></div>
                  <div className="flex items-center space-x-2"><RadioGroupItem value="อื่นๆ" id="other" /><Label htmlFor="other">อื่นๆ</Label></div>
                </RadioGroup>
              </div>
              <div className="space-y-2">
                <Label htmlFor="age">อายุ</Label>
                <Input id="age" type="number" value={editForm.age} onChange={(e) => setEditForm({ ...editForm, age: e.target.value })} placeholder="กรอกอายุ" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="chronic">โรคประจำตัว</Label>
                <Input id="chronic" value={editForm.chronicDiseases} onChange={(e) => setEditForm({ ...editForm, chronicDiseases: e.target.value })} placeholder="เช่น เบาหวาน, ความดันโลหิตสูง (คั่นด้วยจุลภาค)" />
                <p className="text-xs text-muted-foreground">หากไม่มีให้ใส่ "ไม่มี"</p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="allergies">อาหารที่แพ้</Label>
                <Input id="allergies" value={editForm.foodAllergies} onChange={(e) => setEditForm({ ...editForm, foodAllergies: e.target.value })} placeholder="เช่น ทะเล, ถั่ว, นม (คั่นด้วยจุลภาค)" />
                <p className="text-xs text-muted-foreground">หากไม่มีให้ใส่ "ไม่มี"</p>
              </div>
            </div>
            <div className="flex gap-2 justify-end">
              <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>ยกเลิก</Button>
              <Button onClick={handleSaveProfile}>บันทึก</Button>
            </div>
          </DialogContent>
        </Dialog>

        {/* Subscription Plans Dialog */}
        <Dialog open={isSubscriptionDialogOpen} onOpenChange={setIsSubscriptionDialogOpen}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-slate-950 border-slate-800 text-slate-100">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-center bg-gradient-to-r from-yellow-400 to-amber-600 bg-clip-text text-transparent">
                เลือกแผนที่เหมาะกับคุณ
              </DialogTitle>
              <DialogDescription className="text-center text-slate-400">
                ปลดล็อกประสบการณ์อาหารไทยสุดพิเศษด้วย AI
              </DialogDescription>
            </DialogHeader>
            
            <div className="grid md:grid-cols-3 gap-4 py-6">
              {subscriptionPlans.map((plan) => (
                <Card 
                  key={plan.id}
                  className={`relative bg-slate-900 border-slate-800 hover:border-slate-700 transition-all duration-300 ${
                    plan.popular ? 'ring-2 ring-primary shadow-lg shadow-primary/20' : ''
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <Badge className="bg-gradient-to-r from-primary to-thai-green text-white px-4 py-1">
                        <Sparkles className="h-3 w-3 mr-1" />
                        ยอดนิยม
                      </Badge>
                    </div>
                  )}
                  
                  <CardHeader>
                    <div className={`w-full h-24 rounded-lg bg-gradient-to-br ${plan.color} flex items-center justify-center mb-4`}>
                      <Crown className="h-12 w-12 text-white" />
                    </div>
                    <CardTitle className="text-slate-100 text-2xl">{plan.name}</CardTitle>
                    <div className="flex items-baseline gap-1 mt-2">
                      <span className="text-4xl font-bold text-slate-100">{plan.price}</span>
                      <span className="text-slate-400">{plan.period}</span>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    <ul className="space-y-3">
                      {plan.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm text-slate-300">
                          <Check className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <Button
                      onClick={() => handleUpgradePlan(plan.id as "basic" | "plus" | "pro")}
                      className={`w-full ${
                        plan.popular 
                          ? 'bg-gradient-to-r from-primary to-thai-green hover:opacity-90' 
                          : 'bg-slate-800 hover:bg-slate-700 text-slate-100'
                      }`}
                      disabled={currentPlan === plan.id}
                    >
                      {currentPlan === plan.id ? (
                        <>
                          <Check className="h-4 w-4 mr-2" />
                          แผนปัจจุบัน
                        </>
                      ) : (
                        `เลือกแผน ${plan.name}`
                      )}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <div className="text-center text-xs text-slate-400 pb-2">
              💡 ทุกแผนสามารถยกเลิกได้ทุกเมื่อ ไม่มีค่าผูกมัด
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default Profile;