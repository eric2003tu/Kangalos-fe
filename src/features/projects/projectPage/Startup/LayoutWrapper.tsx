import { ReactNode } from "react";

interface LayoutWrapperProps {
  children: ReactNode;
  className?: string;
}

export function LayoutWrapper({ children, className = "" }: LayoutWrapperProps) {
  return (
    <div className={`mx-auto w-full max-w-4xl px-4 sm:px-6 lg:px-8 ${className}`}>
      {children}
    </div>
  );
}