import { Icon } from "@/components/ui/Icon";

type LogoProps = {
  size?: "sm" | "md";
};

export function Logo({ size = "sm" }: LogoProps) {
  const badgeSize = size === "sm" ? "h-8 w-8" : "h-10 w-10";
  const iconSize = size === "sm" ? "text-lg" : "text-xl";
  const textSize = size === "sm" ? "text-headline-sm" : "text-headline-md";

  return (
    <div className="flex items-center gap-space-sm">
      <span
        className={`flex ${badgeSize} shrink-0 items-center justify-center rounded-full bg-primary text-on-primary`}
      >
        <Icon name="health_and_safety" className={iconSize} />
      </span>
      <span className={`${textSize} font-bold tracking-tight text-primary`}>
        Akem<span className="text-secondary"> Health</span>
      </span>
    </div>
  );
}
