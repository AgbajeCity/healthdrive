import React, { useEffect } from 'react';
import PhoneInput, { Value } from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import { cn } from '@/lib/utils';

interface PhoneInputComponentProps {
  value?: Value;
  onChange?: (value?: Value) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
}

const PhoneInputComponent = React.forwardRef<HTMLInputElement, PhoneInputComponentProps>(
  ({ value, onChange, placeholder, className, disabled, ...props }, ref) => {
    
    useEffect(() => {
      // Add global styles for phone input
      const styleId = 'phone-input-styles';
      if (!document.getElementById(styleId)) {
        const style = document.createElement('style');
        style.id = styleId;
        style.textContent = `
          .phone-input-container {
            position: relative;
          }
          
          .PhoneInputCountryIcon {
            width: 1.5rem !important;
            height: 1.125rem !important;
            margin-right: 0.5rem !important;
          }
          
          .PhoneInputCountrySelect {
            position: absolute !important;
            left: 0.75rem !important;
            top: 50% !important;
            transform: translateY(-50%) !important;
            z-index: 10 !important;
            background: transparent !important;
            border: none !important;
            padding: 0 !important;
            margin: 0 !important;
            font-size: 0.875rem !important;
            color: hsl(var(--foreground)) !important;
            cursor: pointer !important;
            display: flex !important;
            align-items: center !important;
            gap: 0.25rem !important;
          }
          
          .PhoneInputCountrySelect:focus {
            outline: none !important;
          }
          
          .PhoneInputCountrySelectArrow {
            width: 0.75rem !important;
            height: 0.75rem !important;
            color: hsl(var(--muted-foreground)) !important;
          }
        `;
        document.head.appendChild(style);
      }
    }, []);

    return (
      <div className={cn("relative", className)}>
        <PhoneInput
          international
          countryCallingCodeEditable={false}
          defaultCountry="UG"
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          className="phone-input-container"
          numberInputProps={{
            className: cn(
              "flex h-12 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background",
              "file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground",
              "placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2",
              "focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
              "pl-16" // Add padding for the country selector
            ),
            ref,
            ...props
          }}
        />
      </div>
    );
  }
);

PhoneInputComponent.displayName = "PhoneInput";

export { PhoneInputComponent as PhoneInput };