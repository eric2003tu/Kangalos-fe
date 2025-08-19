import { ReactNode } from "react";

interface HeroSectionProps {
  title: string;
  subtitle: string;
  children?: ReactNode;
}

export function HeroSection({ title, subtitle, children }: HeroSectionProps) {
  return (
    <div className="mb-12 text-center">
      <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
        {title}
      </h1>
      <p className="mt-4 text-lg leading-7 text-gray-600">
        {subtitle}
      </p>
      {children}
    </div>
  );
}