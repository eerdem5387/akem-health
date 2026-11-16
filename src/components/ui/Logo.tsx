import Image from "next/image";

type LogoProps = {
  size?: "sm" | "md";
};

export function Logo({ size = "sm" }: LogoProps) {
  const badgeSize = size === "sm" ? "h-9 w-9" : "h-11 w-11";
  const textSize = size === "sm" ? "text-headline-sm" : "text-headline-md";

  return (
    <div className="flex items-center gap-space-sm">
      <Image
        alt="Akem Health"
        className={`${badgeSize} shrink-0 object-contain`}
        height={44}
        width={44}
        src="/images/brand/logo-mark.png"
        unoptimized
      />
      <span className={`${textSize} font-bold tracking-tight text-primary`}>
        Akem<span className="text-secondary"> Health</span>
      </span>
    </div>
  );
}
