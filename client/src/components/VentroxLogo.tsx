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
    sm: { icon: 32, text: "text-lg" },
    md: { icon: 42, text: "text-xl" },
    lg: { icon: 60, text: "text-3xl" }
  };

  const { icon: iconSize, text: textSize } = sizes[size];

  return (
    <div className={cn("flex items-center gap-2", className)} data-testid="ventrox-logo">
      <img
        src="/logo.png"
        alt="VentroX Tech Logo"
        width={iconSize}
        height={iconSize}
        loading="lazy"
        className={cn(
          "object-contain transition-all duration-300",
          animated && "animate-pulse-glow"
        )}
      />

      {variant === "full" && (
        <span className={cn(
          "font-bold tracking-tight",
          textSize
        )}>
          <span className="text-gradient">VentroX</span>
          <span className="text-foreground"> Tech</span>
        </span>
      )}
    </div>
  );
}

export function VentroxLogoIcon({ className, size = 32 }: { className?: string; size?: number }) {
  return (
    <img
      src="/logo.png"
      alt="VentroX Tech Logo"
      width={size}
      height={size}
      className={cn("object-contain", className)}
    />
  );
}
