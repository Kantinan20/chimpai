import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
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
  const totalSteps = 3;

  const togglePreference = (id: string) => {
    setSelectedPreferences(prev => 
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
    onComplete([...selectedPreferences, `spice-${spiceLevel}`]);
    onClose();
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-xl font-semibold mb-2">What flavors call to you?</h3>
              <p className="text-muted-foreground">Select your taste preferences to get personalized recommendations</p>
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
              <h3 className="text-xl font-semibold mb-2">How much heat can you handle?</h3>
              <p className="text-muted-foreground">Choose your spice tolerance level</p>
            </div>
            <div className="space-y-4">
              {[
                { level: 1, label: "Mild", desc: "Just a gentle warmth", emoji: "😊" },
                { level: 2, label: "Medium", desc: "A nice kick of heat", emoji: "😋" },
                { level: 3, label: "Hot", desc: "Bring on the fire!", emoji: "🔥" }
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
          <div className="space-y-6 text-center">
            <div className="flex justify-center mb-4">
              <div className="p-4 rounded-full bg-primary/10">
                <Sparkles className="h-12 w-12 text-primary" />
              </div>
            </div>
            <h3 className="text-xl font-semibold">Your Flavor DNA is Ready!</h3>
            <p className="text-muted-foreground">
              We've analyzed your preferences and created your personalized Thai cuisine profile
            </p>
            <div className="bg-gradient-cultural rounded-lg p-4">
              <h4 className="font-medium mb-2">Your Profile:</h4>
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
                  🌶️ {spiceLevel === 1 ? 'Mild' : spiceLevel === 2 ? 'Medium' : 'Hot'}
                </Badge>
              </div>
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
              Flavor DNA Discovery
            </div>
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          <Progress value={(step / totalSteps) * 100} className="w-full" />
          
          {renderStep()}
          
          <div className="flex justify-between">
            {step > 1 && (
              <Button variant="outline" onClick={() => setStep(step - 1)}>
                Back
              </Button>
            )}
            <div className="flex-1" />
            {step < totalSteps ? (
              <Button 
                variant="thai" 
                onClick={handleNext}
                disabled={step === 1 && selectedPreferences.length === 0}
              >
                Next <ArrowRight className="h-4 w-4 ml-1" />
              </Button>
            ) : (
              <Button variant="hero" onClick={handleComplete}>
                Complete Profile
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default OnboardingModal;