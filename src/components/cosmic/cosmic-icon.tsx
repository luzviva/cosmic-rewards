import { cn } from "@/lib/utils";

interface CosmicIconProps {
  type: 'rocket' | 'planet' | 'star' | 'astronaut' | 'satellite' | 'meteor' | 'coin' | 'galaxy';
  className?: string;
  size?: number;
}

export const CosmicIcon = ({ type, className, size = 24 }: CosmicIconProps) => {
  const iconElements = {
    rocket: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/>
        <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/>
        <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/>
        <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/>
      </svg>
    ),
    planet: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/>
        <path d="m8 12 8-8"/>
        <path d="M12 8v8"/>
        <path d="m16 12-8 8"/>
      </svg>
    ),
    star: (
      <svg viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="1">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
      </svg>
    ),
    astronaut: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="4"/>
        <circle cx="12" cy="12" r="9"/>
        <path d="M8.5 8.5 12 12l3.5-3.5"/>
        <path d="M12 2v2"/>
        <path d="M12 20v2"/>
        <path d="M4.93 4.93l1.41 1.41"/>
        <path d="M17.66 17.66l1.41 1.41"/>
      </svg>
    ),
    satellite: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 10a7.31 7.31 0 0 0 10 10Z"/>
        <path d="m9 15 3-3"/>
        <path d="M17 13a6 6 0 0 0-6-6"/>
        <path d="M21 13A10 10 0 0 0 11 3"/>
      </svg>
    ),
    meteor: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="1"/>
        <path d="m19 19-7-7"/>
        <path d="m5 5 7 7"/>
        <path d="m12 2 0 20"/>
        <path d="m2 12 20 0"/>
      </svg>
    ),
    coin: (
      <svg viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="1">
        <circle cx="12" cy="12" r="10"/>
        <path d="M9 12l2 2 4-4" stroke="white" strokeWidth="2" fill="none"/>
      </svg>
    ),
    galaxy: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 12c-2-2.67-4-4-6-4a4 4 0 1 0 0 8c2 0 4-1.33 6-4Z"/>
        <path d="M12 12c2 2.67 4 4 6 4a4 4 0 0 0 0-8c-2 0-4 1.33-6 4Z"/>
      </svg>
    )
  };

  return (
    <div
      className={cn("inline-flex items-center justify-center", className)}
      style={{ width: size, height: size }}
    >
      {iconElements[type]}
    </div>
  );
};