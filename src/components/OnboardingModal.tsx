import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { flavorPreferences } from "@/data/mockData";
import { CheckCircle, ArrowRight, Sparkles } from "lucide-react";

interface OnboardingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: (preferences: string[]) => void;
}

const OnboardingModal = ({ isOpen, onClose, onComplete }: OnboardingModalProps) => {
  const [step, setStep] = useState(1);
  const [selectedPreferences, setSelectedPreferences] = useState<string[]>([]);
  const [spiceLevel, setSpiceLevel] = useState<number>(1);
  const [gender, setGender] = useState<string>("");
  const [age, setAge] = useState<string>("");
  const [chronicDiseases, setChronicDiseases] = useState<string[]>([]);
  const [foodAllergies, setFoodAllergies] = useState<string[]>([]);
  const totalSteps = 6;

  const togglePreference = (id: string) => {
    setSelectedPreferences(prev => 
      prev.includes(id) 
        ? prev.filter(p => p !== id)
        : [...prev, id]
    );
  };

  const toggleChronicDisease = (id: string) => {
    setChronicDiseases(prev => 
      prev.includes(id) 
        ? prev.filter(p => p !== id)
        : [...prev, id]
    );
  };

  const toggleFoodAllergy = (id: string) => {
    setFoodAllergies(prev => 
      prev.includes(id) 
        ? prev.filter(p => p !== id)
        : [...prev, id]
    );
  };

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    }
  };

  const handleComplete = () => {
    onComplete([
      ...selectedPreferences, 
      `spice-${spiceLevel}`, 
      `gender-${gender}`, 
      `age-${age}`,
      ...chronicDiseases.map(d => `disease-${d}`),
      ...foodAllergies.map(a => `allergy-${a}`)
    ]);
    onClose();
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-xl font-semibold mb-2">รสชาติแบบไหนที่เรียกหาคุณ?</h3>
              <p className="text-muted-foreground">เลือกรสชาติที่คุณชอบเพื่อรับคำแนะนำส่วนบุคคล</p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {flavorPreferences.map((pref) => (
                <Card
                  key={pref.id}
                  className={`cursor-pointer transition-thai hover:shadow-thai ${
                    selectedPreferences.includes(pref.id) 
                      ? 'ring-2 ring-primary bg-primary/5' 
                      : 'hover:bg-muted/50'
                  }`}
                  onClick={() => togglePreference(pref.id)}
                >
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl mb-2">{pref.icon}</div>
                    <div className="font-medium">{pref.label}</div>
                    {selectedPreferences.includes(pref.id) && (
                      <CheckCircle className="h-5 w-5 text-primary mx-auto mt-2" />
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-xl font-semibold mb-2">คุณทานเผ็ดได้แค่ไหน?</h3>
              <p className="text-muted-foreground">เลือกระดับความเผ็ดที่คุณทานได้</p>
            </div>
            <div className="space-y-4">
              {[
                { level: 1, label: "อ่อน", desc: "ความร้อนเบาๆ", emoji: "😊" },
                { level: 2, label: "ปานกลาง", desc: "เผ็ดพอดี", emoji: "😋" },
                { level: 3, label: "เผ็ด", desc: "เผ็ดจัดจ้าน!", emoji: "🔥" }
              ].map((option) => (
                <Card
                  key={option.level}
                  className={`cursor-pointer transition-thai hover:shadow-thai ${
                    spiceLevel === option.level 
                      ? 'ring-2 ring-primary bg-primary/5' 
                      : 'hover:bg-muted/50'
                  }`}
                  onClick={() => setSpiceLevel(option.level)}
                >
                  <CardContent className="p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{option.emoji}</span>
                      <div>
                        <div className="font-medium">{option.label}</div>
                        <div className="text-sm text-muted-foreground">{option.desc}</div>
                      </div>
                    </div>
                    {spiceLevel === option.level && (
                      <CheckCircle className="h-5 w-5 text-primary" />
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-xl font-semibold mb-2">ข้อมูลพื้นฐานของคุณ</h3>
              <p className="text-muted-foreground">เพื่อคำแนะนำที่ดีขึ้น</p>
            </div>
            <div className="space-y-4">
              <div>
                <Label className="mb-3 block">เพศ</Label>
                <RadioGroup value={gender} onValueChange={setGender}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="male" id="male" />
                    <Label htmlFor="male" className="cursor-pointer">ชาย</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="female" id="female" />
                    <Label htmlFor="female" className="cursor-pointer">หญิง</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="other" id="other" />
                    <Label htmlFor="other" className="cursor-pointer">อื่นๆ</Label>
                  </div>
                </RadioGroup>
              </div>
              <div>
                <Label htmlFor="age" className="mb-2 block">อายุ</Label>
                <Input
                  id="age"
                  type="number"
                  placeholder="กรอกอายุของคุณ"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  min="1"
                  max="120"
                />
              </div>
            </div>
          </div>
        );
      case 4:
        const chronicDiseaseOptions = [
          { id: "diabetes", label: "เบาหวาน", icon: "🩺" },
          { id: "hypertension", label: "ความดันโลหิตสูง", icon: "💓" },
          { id: "heart", label: "โรคหัวใจ", icon: "❤️" },
          { id: "kidney", label: "โรคไต", icon: "🫘" },
          { id: "gout", label: "เก๊าท์", icon: "🦶" },
          { id: "none", label: "ไม่มี", icon: "✅" }
        ];
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-xl font-semibold mb-2">โรคประจำตัว</h3>
              <p className="text-muted-foreground">เพื่อแนะนำเมนูที่เหมาะสมกับสุขภาพ</p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {chronicDiseaseOptions.map((disease) => (
                <Card
                  key={disease.id}
                  className={`cursor-pointer transition-thai hover:shadow-thai ${
                    chronicDiseases.includes(disease.id) 
                      ? 'ring-2 ring-primary bg-primary/5' 
                      : 'hover:bg-muted/50'
                  }`}
                  onClick={() => toggleChronicDisease(disease.id)}
                >
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl mb-2">{disease.icon}</div>
                    <div className="font-medium text-sm">{disease.label}</div>
                    {chronicDiseases.includes(disease.id) && (
                      <CheckCircle className="h-5 w-5 text-primary mx-auto mt-2" />
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        );
      case 5:
        const allergyOptions = [
          { id: "seafood", label: "อาหารทะเล", icon: "🦐" },
          { id: "nuts", label: "ถั่ว", icon: "🥜" },
          { id: "dairy", label: "นม/ผลิตภัณฑ์นม", icon: "🥛" },
          { id: "egg", label: "ไข่", icon: "🥚" },
          { id: "gluten", label: "กลูเตน", icon: "🌾" },
          { id: "soy", label: "ถั่วเหลือง", icon: "🫘" },
          { id: "msg", label: "ผงชูรส", icon: "🧂" },
          { id: "none", label: "ไม่มี", icon: "✅" }
        ];
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-xl font-semibold mb-2">อาหารที่แพ้</h3>
              <p className="text-muted-foreground">เพื่อหลีกเลี่ยงส่วนผสมที่คุณแพ้</p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {allergyOptions.map((allergy) => (
                <Card
                  key={allergy.id}
                  className={`cursor-pointer transition-thai hover:shadow-thai ${
                    foodAllergies.includes(allergy.id) 
                      ? 'ring-2 ring-primary bg-primary/5' 
                      : 'hover:bg-muted/50'
                  }`}
                  onClick={() => toggleFoodAllergy(allergy.id)}
                >
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl mb-2">{allergy.icon}</div>
                    <div className="font-medium text-sm">{allergy.label}</div>
                    {foodAllergies.includes(allergy.id) && (
                      <CheckCircle className="h-5 w-5 text-primary mx-auto mt-2" />
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        );
      case 6:
        return (
          <div className="space-y-6 text-center">
            <div className="flex justify-center mb-4">
              <div className="p-4 rounded-full bg-primary/10">
                <Sparkles className="h-12 w-12 text-primary" />
              </div>
            </div>
            <h3 className="text-xl font-semibold">ดีเอ็นเอรสชาติของคุณพร้อมแล้ว!</h3>
            <p className="text-muted-foreground">
              เราได้วิเคราะห์ความชอบของคุณและสร้างโปรไฟล์อาหารไทยส่วนตัวแล้ว
            </p>
            <div className="bg-gradient-cultural rounded-lg p-4 space-y-3">
              <div>
                <h4 className="font-medium mb-2">รสชาติที่ชอบ:</h4>
                <div className="flex flex-wrap gap-2 justify-center">
                  {selectedPreferences.map((pref) => {
                    const preference = flavorPreferences.find(p => p.id === pref);
                    return preference ? (
                      <Badge key={pref} variant="secondary">
                        {preference.icon} {preference.label}
                      </Badge>
                    ) : null;
                  })}
                  <Badge variant="secondary">
                    🌶️ {spiceLevel === 1 ? 'อ่อน' : spiceLevel === 2 ? 'ปานกลาง' : 'เผ็ด'}
                  </Badge>
                </div>
              </div>
              {(gender || age) && (
                <div>
                  <h4 className="font-medium mb-2">ข้อมูลส่วนตัว:</h4>
                  <div className="flex flex-wrap gap-2 justify-center">
                    {gender && <Badge variant="secondary">เพศ: {gender === 'male' ? 'ชาย' : gender === 'female' ? 'หญิง' : 'อื่นๆ'}</Badge>}
                    {age && <Badge variant="secondary">อายุ: {age} ปี</Badge>}
                  </div>
                </div>
              )}
              {chronicDiseases.length > 0 && (
                <div>
                  <h4 className="font-medium mb-2">โรคประจำตัว:</h4>
                  <div className="flex flex-wrap gap-2 justify-center">
                    {chronicDiseases.map((disease) => (
                      <Badge key={disease} variant="secondary">
                        {disease === 'none' ? 'ไม่มี' : disease}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
              {foodAllergies.length > 0 && (
                <div>
                  <h4 className="font-medium mb-2">อาหารที่แพ้:</h4>
                  <div className="flex flex-wrap gap-2 justify-center">
                    {foodAllergies.map((allergy) => (
                      <Badge key={allergy} variant="secondary">
                        {allergy === 'none' ? 'ไม่มี' : allergy}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Sparkles className="h-5 w-5 text-primary" />
              การค้นพบดีเอ็นเอรสชาติ
            </div>
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          <Progress value={(step / totalSteps) * 100} className="w-full" />
          
          {renderStep()}
          
          <div className="flex justify-between">
            {step > 1 && (
              <Button variant="outline" onClick={() => setStep(step - 1)}>
                ย้อนกลับ
              </Button>
            )}
            <div className="flex-1" />
            {step < totalSteps ? (
              <Button 
                variant="thai" 
                onClick={handleNext}
                disabled={
                  (step === 1 && selectedPreferences.length === 0) ||
                  (step === 3 && (!gender || !age))
                }
              >
                ถัดไป <ArrowRight className="h-4 w-4 ml-1" />
              </Button>
            ) : (
              <Button variant="hero" onClick={handleComplete}>
                เสร็จสิ้นโปรไฟล์
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default OnboardingModal;