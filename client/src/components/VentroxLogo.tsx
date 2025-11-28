import { cn } from "@/lib/utils";

interface VentroxLogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  variant?: "full" | "icon";
  animated?: boolean;
}

export function VentroxLogo({ 
  className, 
  size = "md", 
  variant = "full",
  animated = false 
}: VentroxLogoProps) {
  const sizes = {
    sm: { icon: 24, text: "text-lg" },
    md: { icon: 32, text: "text-xl" },
    lg: { icon: 48, text: "text-3xl" }
  };

  const { icon: iconSize, text: textSize } = sizes[size];

  return (
    <div className={cn("flex items-center gap-2", className)} data-testid="ventrox-logo">
      <svg
        width={iconSize}
        height={iconSize}
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={cn(
          "transition-all duration-300",
          animated && "animate-pulse-glow"
        )}
      >
        <defs>
          <linearGradient id="ventroxGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="hsl(217, 91%, 50%)" />
            <stop offset="100%" stopColor="hsl(271, 81%, 56%)" />
          </linearGradient>
          <linearGradient id="ventroxGradientLight" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="hsl(217, 91%, 60%)" />
            <stop offset="100%" stopColor="hsl(271, 81%, 66%)" />
          </linearGradient>
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        
        <g filter={animated ? "url(#glow)" : undefined}>
          <path
            d="M24 4L6 40H14L24 22L34 40H42L24 4Z"
            fill="url(#ventroxGradient)"
          />
          <path
            d="M24 4L6 40H14L24 22L34 40H42L24 4Z"
            fill="none"
            stroke="url(#ventroxGradientLight)"
            strokeWidth="1"
            strokeOpacity="0.5"
          />
          <path
            d="M18 28L24 18L30 28"
            fill="none"
            stroke="hsl(187, 100%, 45%)"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeOpacity="0.8"
          />
          <circle cx="24" cy="36" r="2" fill="hsl(187, 100%, 50%)" />
          <path
            d="M10 38L14 30M38 38L34 30"
            stroke="hsl(217, 91%, 60%)"
            strokeWidth="0.5"
            strokeOpacity="0.4"
            strokeLinecap="round"
          />
        </g>
      </svg>
      
      {variant === "full" && (
        <span className={cn(
          "font-bold tracking-tight",
          textSize
        )}>
          <span className="text-gradient">Ventrox</span>
          <span className="text-foreground"> Tech</span>
        </span>
      )}
    </div>
  );
}

export function VentroxLogoIcon({ className, size = 32 }: { className?: string; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <linearGradient id="ventroxGradientIcon" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="hsl(217, 91%, 50%)" />
          <stop offset="100%" stopColor="hsl(271, 81%, 56%)" />
        </linearGradient>
      </defs>
      <path
        d="M24 4L6 40H14L24 22L34 40H42L24 4Z"
        fill="url(#ventroxGradientIcon)"
      />
      <path
        d="M18 28L24 18L30 28"
        fill="none"
        stroke="hsl(187, 100%, 45%)"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeOpacity="0.8"
      />
      <circle cx="24" cy="36" r="2" fill="hsl(187, 100%, 50%)" />
    </svg>
  );
}
