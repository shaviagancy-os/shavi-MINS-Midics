import React from 'react';

interface ShaviLogoProps {
  variant?: 'dark' | 'light';
  size?: 'sm' | 'md' | 'lg';
  showTagline?: boolean;
  taglineText?: string;
}

export const ShaviLogo: React.FC<ShaviLogoProps> = ({
  variant = 'light',
  size = 'md',
  showTagline = true,
  taglineText = 'Smart Growth Solutions',
}) => {
  const textColor = variant === 'dark' ? 'text-[#0F1117]' : 'text-white';
  const subTextColor = variant === 'dark' ? 'text-[#64748B]' : 'text-[#94A3B8]';

  const iconSizes = {
    sm: 'w-10 h-8',
    md: 'w-13 h-10',
    lg: 'w-16 h-12',
  };

  const titleSizes = {
    sm: 'text-xl',
    md: 'text-2xl',
    lg: 'text-3xl',
  };

  return (
    <div className="inline-flex items-center gap-3 select-none" dir="ltr">
      {/* Official Shavi Brand Mark (Calligraphic Arabic 'ش' Wave + 3 Pillars & Dots from Artboard 9@8x.png) */}
      <div className={`relative flex items-center justify-center shrink-0 ${iconSizes[size]}`}>
        <svg
          viewBox="90 85 335 245"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full drop-shadow-[0_2px_12px_rgba(225,29,46,0.3)]"
          aria-label="Shavi Logo"
        >
          <defs>
            <linearGradient
              id="shaviOfficialCrimson"
              x1="100"
              y1="100"
              x2="410"
              y2="315"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0%" stopColor="#D9232A" />
              <stop offset="55%" stopColor="#B81D24" />
              <stop offset="100%" stopColor="#941B1E" />
            </linearGradient>
          </defs>

          {/* Main Calligraphic Wave Body (S / ش Curve) */}
          <path
            d="M 186 315
               C 122 298, 95 235, 116 178
               C 134 132, 192 122, 236 146
               C 272 166, 288 215, 316 244
               C 338 265, 374 265, 384 232
               C 389 216, 388 196, 388 183
               C 394 185, 399 186, 404 186
               C 405 212, 404 242, 392 266
               C 376 298, 336 308, 298 290
               C 258 271, 242 222, 214 192
               C 194 171, 162 170, 148 196
               C 134 222, 146 274, 186 315 Z"
            fill="url(#shaviOfficialCrimson)"
          />

          {/* Three Calligraphic Vertical Blades (Teeth of ش) */}
          {/* Blade 1 (Left) */}
          <path
            d="M 330 126
               C 340 130, 346 144, 347 162
               L 348 180
               C 337 180, 332 174, 331 158
               L 330 126 Z"
            fill="url(#shaviOfficialCrimson)"
          />

          {/* Blade 2 (Middle) */}
          <path
            d="M 358 126
               C 368 130, 374 144, 375 162
               L 376 180
               C 365 180, 360 174, 359 158
               L 358 126 Z"
            fill="url(#shaviOfficialCrimson)"
          />

          {/* Blade 3 (Right - sits directly above the rising right wave tip) */}
          <path
            d="M 386 126
               C 396 130, 402 144, 403 162
               L 404 180
               C 393 180, 388 174, 387 158
               L 386 126 Z"
            fill="url(#shaviOfficialCrimson)"
          />

          {/* Three Circular Dots above the Blades */}
          <circle cx="328" cy="110" r="8.5" fill="url(#shaviOfficialCrimson)" />
          <circle cx="356" cy="110" r="8.5" fill="url(#shaviOfficialCrimson)" />
          <circle cx="384" cy="110" r="8.5" fill="url(#shaviOfficialCrimson)" />
        </svg>
      </div>

      <div className="flex flex-col leading-none">
        <span className={`font-en font-bold tracking-tight ${titleSizes[size]} ${textColor}`}>
          Shavi
        </span>
        {showTagline && (
          <span
            className={`font-en text-[10px] font-medium tracking-[0.08em] mt-0.5 ${subTextColor}`}
          >
            {taglineText}
          </span>
        )}
      </div>
    </div>
  );
};
