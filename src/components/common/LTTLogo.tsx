import React, { useState } from 'react';

interface LTTLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
  lightMode?: boolean;
  className?: string;
}

export const LTTLogo: React.FC<LTTLogoProps> = ({
  size = 'md',
  showText = true,
  lightMode = false,
  className = '',
}) => {
  const [imgError, setImgError] = useState(false);

  const dimensions = {
    sm: { icon: 'h-7 w-auto max-w-[120px]', textTitle: 'text-xs', textSub: 'text-[9px]' },
    md: { icon: 'h-10 w-auto max-w-[160px]', textTitle: 'text-sm sm:text-base', textSub: 'text-[11px]' },
    lg: { icon: 'h-12 w-auto max-w-[200px]', textTitle: 'text-lg', textSub: 'text-xs' },
    xl: { icon: 'h-16 w-auto max-w-[260px]', textTitle: 'text-2xl', textSub: 'text-sm' },
  }[size];

  const logoUrl = 'https://upload.wikimedia.org/wikipedia/commons/1/1e/LTT_Logo_2024.png';

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Official LTT Logo Image */}
      {!imgError ? (
        <div className="shrink-0 flex items-center justify-center">
          <img
            src={logoUrl}
            alt="شركة ليبيا للاتصالات والتقنية - LTT"
            referrerPolicy="no-referrer"
            onError={() => setImgError(true)}
            className={`${dimensions.icon} object-contain transition-all duration-200`}
          />
        </div>
      ) : (
        <div className={`relative ${dimensions.icon} shrink-0 bg-blue-600 rounded-xl flex items-center justify-center text-white font-black px-2.5 shadow-sm`}>
          LTT
        </div>
      )}

      {/* Brand Name Typography */}
      {showText && (
        <div className="flex flex-col text-right leading-tight">
          <div className="flex items-center gap-1.5">
            <span className={`font-extrabold tracking-tight ${dimensions.textTitle} ${lightMode ? 'text-white' : 'text-slate-900'}`}>
              <span className="text-[#005FBE]">LTT</span> <span className="text-[#FF8204]">Techno</span>
            </span>
            <span className="bg-[#FF8204]/10 text-[#FF8204] text-[10px] font-extrabold px-1.5 py-0.5 rounded border border-[#FF8204]/20">
              المساعد الذكي
            </span>
          </div>
          <span className={`font-semibold ${dimensions.textSub} ${lightMode ? 'text-slate-300' : 'text-slate-500'}`}>
            شركة ليبيا للاتصالات والتقنية
          </span>
        </div>
      )}
    </div>
  );
};

