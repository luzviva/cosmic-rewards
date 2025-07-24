import { Meteors } from "./meteors";
import { cn } from "@/lib/utils";

interface CosmicBackgroundProps {
  children: React.ReactNode;
  className?: string;
  meteorsCount?: number;
  showStars?: boolean;
}

export const CosmicBackground = ({ 
  children, 
  className, 
  meteorsCount = 20,
  showStars = true 
}: CosmicBackgroundProps) => {
  return (
    <div className={cn("relative min-h-screen bg-gradient-cosmic overflow-hidden", className)}>
      {/* Stars background */}
      {showStars && (
        <div className="absolute inset-0 bg-[radial-gradient(2px_2px_at_20px_30px,_hsl(270_91%_65%),transparent),radial-gradient(2px_2px_at_40px_70px,_hsl(221_83%_53%),transparent),radial-gradient(1px_1px_at_90px_40px,_hsl(45_93%_58%),transparent),radial-gradient(1px_1px_at_130px_80px,_hsl(270_91%_65%),transparent),radial-gradient(2px_2px_at_160px_30px,_hsl(221_83%_53%),transparent)] bg-repeat opacity-50 animate-twinkle" />
      )}
      
      {/* Meteors */}
      <Meteors number={meteorsCount} />
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};