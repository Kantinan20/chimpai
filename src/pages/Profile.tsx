import { useState } from "react";
import { User, Heart, BookOpen, Award, ChefHat, Edit2, Crown, ChevronDown, Check, Sparkles, MessageSquare, Camera, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";
import { Progress } from "@/components/ui/progress";
import chimpaiLogo from "@/assets/chimpai-logo.png";
const Profile = () => {
  const {
    toast
  } = useToast();
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [currentPlan, setCurrentPlan] = useState<"free" | "basic" | "plus" | "pro">("free");
  const [demoMode, setDemoMode] = useState<"free" | "basic" | "plus" | "pro">("free");

  // Profile state
  const [userName, setUserName] = useState("คุณสมชาย ใจดี");
  const [userAvatar, setUserAvatar] = useState("");
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

  // Chatbot quota for free users
  const [chatbotUsage, setChatbotUsage] = useState(15); // Used 15 out of 30
  const maxChatbots = 30;
  const chatbotPercentage = chatbotUsage / maxChatbots * 100;
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
      description: "ข้อมูลโปรไฟล์ของคุณได้รับการอัปเดตแล้ว"
    });
  };
  const handleUpgradePlan = (plan: "basic" | "plus" | "pro") => {
    setCurrentPlan(plan);
    setDemoMode(plan);
    toast({
      title: "อัปเกรดสำเร็จ! 🎉",
      description: `คุณได้อัปเกรดเป็นแผน ${plan === "basic" ? "Basic" : plan === "plus" ? "Plus" : "Pro"} แล้ว`
    });
  };
  const getPlanLabel = () => {
    if (demoMode === "free") return "Free";
    if (demoMode === "basic") return "Basic";
    if (demoMode === "plus") return "Plus";
    if (demoMode === "pro") return "Pro";
    return "Free";
  };
  const subscriptionPlans = [{
    id: "basic",
    name: "Basic",
    price: "฿79",
    period: "/เดือน",
    features: ["แชทบอทไม่จำกัดทุกเวลา", "เข้าถึงสูตรอาหารพื้นฐาน", "รับการแจ้งเตือนพิเศษ"],
    gradient: "from-slate-100 to-slate-200",
    borderColor: "border-slate-300",
    textColor: "text-slate-800"
  }, {
    id: "plus",
    name: "Plus",
    price: "฿189",
    period: "/เดือน",
    features: ["บันทึกและกดถูกใจสูตรได้ไม่จำกัด", "รับคำแนะนำเมนูที่เหมาะกับคุณ", "ระบบวางแผนมื้ออาหารอัจฉริยะ", "ฟีเจอร์ทั้งหมดของ Basic"],
    gradient: "from-primary/10 to-thai-green/10",
    borderColor: "border-primary",
    textColor: "text-foreground",
    popular: true
  }, {
    id: "pro",
    name: "Pro",
    price: "฿299",
    period: "/เดือน",
    features: ["บันทึกสูตรไม่จำกัด", "AI Chatbot ส่วนตัว 24/7", "วางแผนมื้ออาหารเชื่อมกับข้อมูลสุขภาพ", "ส่วนลดพิเศษร้านอาหาร", "ฟีเจอร์ทั้งหมดของ Plus"],
    gradient: "from-yellow-50 to-amber-100",
    borderColor: "border-yellow-500",
    textColor: "text-foreground"
  }];
  return <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60 border-b border-border shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-primary">โปรไฟล์</h1>
          
          {/* Demo Mode Toggle */}
          <div className="flex items-center gap-3 bg-muted/50 px-4 py-2 rounded-full border border-border">
            <span className="text-xs text-muted-foreground font-medium">โหมดทดสอบ:</span>
            <div className="flex items-center gap-2">
              <Button variant={demoMode === "free" ? "default" : "ghost"} size="sm" onClick={() => {
              setDemoMode("free");
              setCurrentPlan("free");
            }} className="h-7 text-xs rounded-full">
                Free
              </Button>
              <Button variant={demoMode === "basic" ? "default" : "ghost"} size="sm" onClick={() => {
              setDemoMode("basic");
              setCurrentPlan("basic");
            }} className="h-7 text-xs rounded-full">
                Basic
              </Button>
              <Button variant={demoMode === "plus" ? "default" : "ghost"} size="sm" onClick={() => {
              setDemoMode("plus");
              setCurrentPlan("plus");
            }} className="h-7 text-xs rounded-full">
                Plus
              </Button>
              <Button variant={demoMode === "pro" ? "default" : "ghost"} size="sm" onClick={() => {
              setDemoMode("pro");
              setCurrentPlan("pro");
            }} className="h-7 text-xs rounded-full">
                Pro
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 space-y-6">
        {/* AI Chef Profile Card */}
        <Card className="overflow-hidden border-2 border-primary/20 shadow-temple">
          
          <CardContent className="pt-4">
            <p className="text-muted-foreground text-sm leading-relaxed">
              สวัสดีครับ! ผมคือ AI Chef Chimpai ผู้ช่วยส่วนตัวที่จะช่วยคุณค้นหาเมนูอาหารไทยที่ใช่ 
              วิเคราะห์รสชาติที่คุณชอบ และแนะนำร้านอาหารที่ตรงใจคุณที่สุด 🍜✨
            </p>
          </CardContent>
        </Card>

        {/* User Profile Card */}
        <Card className="shadow-thai">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="h-20 w-20 bg-gradient-to-br from-primary to-primary-glow rounded-full flex items-center justify-center shadow-temple">
                  {userAvatar ? <img src={userAvatar} alt={userName} className="h-full w-full rounded-full object-cover" /> : <User className="h-10 w-10 text-white" />}
                </div>
                <button className="absolute bottom-0 right-0 h-7 w-7 bg-white rounded-full shadow-md flex items-center justify-center border-2 border-background hover:bg-muted transition-colors">
                  <Camera className="h-4 w-4 text-primary" />
                </button>
              </div>
              
              <div className="flex-1">
                <h2 className="text-xl font-bold text-foreground">{userName}</h2>
                
                {/* Account Dropdown Menu */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors group mt-1">
                      <span>somchai@example.com</span>
                      <ChevronDown className="h-3 w-3 group-hover:translate-y-0.5 transition-transform" />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start" className="w-56 shadow-xl">
                    <DropdownMenuLabel className="pb-2">
                      <div className="flex items-center gap-2 text-xs">
                        <span className="text-muted-foreground">แผนปัจจุบัน:</span>
                        <Badge variant={demoMode !== "free" ? "default" : "secondary"}>
                          {demoMode !== "free" && <Crown className="h-3 w-3 mr-1" />}
                          {getPlanLabel()}
                        </Badge>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    
                    <DropdownMenuItem onClick={() => window.scrollTo({
                    top: document.body.scrollHeight,
                    behavior: 'smooth'
                  })} className="cursor-pointer py-3">
                      <Crown className="h-4 w-4 mr-3 text-primary" />
                      <div>
                        <div className="font-semibold">อัปเกรดแผน</div>
                        <div className="text-xs text-muted-foreground">ปลดล็อกฟีเจอร์พรีเมียม</div>
                      </div>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

                <div className="flex items-center gap-2 mt-2">
                  <Badge variant="secondary" className="text-xs">
                    <Award className="h-3 w-3 mr-1" />
                    สมาชิกระดับเงิน
                  </Badge>
                  <Badge variant="outline" className="text-xs">เข้าร่วม 6 เดือน</Badge>
                </div>
              </div>
              
              <Button variant="outline" size="sm" onClick={handleEditProfile} className="gap-2">
                <Edit2 className="h-4 w-4" />
                แก้ไข
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Chatbot Quota Bar (for Free users only) */}
        {demoMode === "free" && <Card className="border-2 border-primary/20 shadow-md">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base flex items-center gap-2">
                  <MessageSquare className="h-5 w-5 text-primary" />
                  โควต้าแชทบอท AI Chef
                </CardTitle>
                <Badge variant="secondary" className="text-xs">
                  {chatbotUsage}/{maxChatbots} ครั้ง
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <Progress value={chatbotPercentage} className="h-2" />
              <p className="text-xs text-muted-foreground">
                คุณใช้งานไปแล้ว {chatbotUsage} ครั้งจาก {maxChatbots} ครั้งในเดือนนี้
                {chatbotUsage >= maxChatbots ? " ⚠️ ถึงลิมิตแล้ว" : ` (เหลืออีก ${maxChatbots - chatbotUsage} ครั้ง)`}
              </p>
              {chatbotUsage >= maxChatbots * 0.8 && <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-3">
                  <p className="text-xs text-yellow-800 dark:text-yellow-200 flex items-center gap-2">
                    <Zap className="h-4 w-4" />
                    อัปเกรดเป็นแผน Premium เพื่อใช้งานแชทบอทได้ไม่จำกัด!
                  </p>
                </div>}
            </CardContent>
          </Card>}

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4">
          {[{
          label: "สูตรที่บันทึก",
          value: "24",
          icon: BookOpen,
          locked: demoMode === "free"
        }, {
          label: "ร้านโปรด",
          value: "12",
          icon: Heart,
          locked: demoMode === "free"
        }, {
          label: "เลเวลเชฟ",
          value: "มือใหม่",
          icon: ChefHat,
          locked: false
        }, {
          label: "คะแนนรีวิว",
          value: "4.8",
          icon: Award,
          locked: false
        }].map((stat, index) => <Card key={index} className={stat.locked ? "opacity-60 relative overflow-hidden" : ""}>
              <CardContent className="pt-6">
                {stat.locked && <div className="absolute inset-0 bg-background/80 backdrop-blur-[2px] flex items-center justify-center">
                    <div className="text-center">
                      <Crown className="h-6 w-6 text-primary mx-auto mb-1" />
                      <span className="text-xs text-muted-foreground font-medium">Premium</span>
                    </div>
                  </div>}
                <div className="flex items-center gap-3">
                  <div className="text-primary">
                    <stat.icon className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{stat.value}</p>
                    <p className="text-xs text-muted-foreground">{stat.label}</p>
                  </div>
                </div>
              </CardContent>
            </Card>)}
        </div>

        {/* Personal Information */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">ข้อมูลส่วนตัว</CardTitle>
            <CardDescription>จัดการข้อมูลโปรไฟล์ของคุณ</CardDescription>
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
              <span className="font-medium text-right">{personalInfo.chronicDiseases.join(", ")}</span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-sm text-muted-foreground">อาหารที่แพ้</span>
              <span className="font-medium text-right">{personalInfo.foodAllergies.join(", ")}</span>
            </div>
          </CardContent>
        </Card>

        {/* Subscription Section */}
        <div className="pt-6">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-foreground mb-2">แผนสมาชิก Chimpai</h2>
            <p className="text-muted-foreground">เลือกแผนที่เหมาะกับคุณและปลดล็อกประสบการณ์ครบครัน</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {subscriptionPlans.map(plan => <Card key={plan.id} className={`relative overflow-hidden transition-all hover:shadow-xl ${plan.popular ? 'border-2 border-primary scale-105' : 'border border-border'} ${demoMode === plan.id ? 'ring-2 ring-primary' : ''}`}>
                {plan.popular && <div className="absolute top-4 right-4">
                    <Badge className="bg-primary text-primary-foreground">
                      <Sparkles className="h-3 w-3 mr-1" />
                      แนะนำ
                    </Badge>
                  </div>}
                
                <div className={`h-32 bg-gradient-to-br ${plan.gradient} flex flex-col items-center justify-center border-b ${plan.borderColor}`}>
                  <h3 className={`text-2xl font-bold ${plan.textColor} mb-1`}>{plan.name}</h3>
                  <div className="flex items-baseline">
                    <span className={`text-4xl font-bold ${plan.textColor}`}>{plan.price}</span>
                    <span className={`text-sm ml-1 ${plan.textColor} opacity-70`}>{plan.period}</span>
                  </div>
                </div>

                <CardContent className="pt-6 space-y-4">
                  <ul className="space-y-3">
                    {plan.features.map((feature, idx) => <li key={idx} className="flex items-start gap-2 text-sm">
                        <Check className="h-4 w-4 text-thai-green mt-0.5 flex-shrink-0" />
                        <span className="text-muted-foreground">{feature}</span>
                      </li>)}
                  </ul>

                  <Button onClick={() => handleUpgradePlan(plan.id as "basic" | "plus" | "pro")} className="w-full" variant={demoMode === plan.id ? "secondary" : "default"} disabled={demoMode === plan.id}>
                    {demoMode === plan.id ? <>
                        <Check className="h-4 w-4 mr-2" />
                        แผนปัจจุบัน
                      </> : <>
                        <Crown className="h-4 w-4 mr-2" />
                        อัปเกรดเลย
                      </>}
                  </Button>
                </CardContent>
              </Card>)}
          </div>
        </div>
      </div>

      {/* Edit Profile Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>แก้ไขโปรไฟล์</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">ชื่อ-นามสกุล</Label>
              <Input id="name" value={editForm.name} onChange={e => setEditForm({
              ...editForm,
              name: e.target.value
            })} placeholder="กรอกชื่อของคุณ" />
            </div>

            <div className="space-y-2">
              <Label>เพศ</Label>
              <RadioGroup value={editForm.gender} onValueChange={value => setEditForm({
              ...editForm,
              gender: value
            })}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="ชาย" id="male" />
                  <Label htmlFor="male">ชาย</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="หญิง" id="female" />
                  <Label htmlFor="female">หญิง</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="อื่นๆ" id="other" />
                  <Label htmlFor="other">อื่นๆ</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-2">
              <Label htmlFor="age">อายุ</Label>
              <Input id="age" type="number" value={editForm.age} onChange={e => setEditForm({
              ...editForm,
              age: e.target.value
            })} placeholder="กรอกอายุของคุณ" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="diseases">โรคประจำตัว</Label>
              <Input id="diseases" value={editForm.chronicDiseases} onChange={e => setEditForm({
              ...editForm,
              chronicDiseases: e.target.value
            })} placeholder="ระบุโรคประจำตัว (คั่นด้วย ,)" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="allergies">อาหารที่แพ้</Label>
              <Input id="allergies" value={editForm.foodAllergies} onChange={e => setEditForm({
              ...editForm,
              foodAllergies: e.target.value
            })} placeholder="ระบุอาหารที่แพ้ (คั่นด้วย ,)" />
            </div>
          </div>

          <div className="flex gap-3">
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)} className="flex-1">
              ยกเลิก
            </Button>
            <Button onClick={handleSaveProfile} className="flex-1">
              บันทึก
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>;
};
export default Profile;