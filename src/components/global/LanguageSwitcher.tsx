import React from 'react';
import { useRouter } from "next/navigation";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from '../ui/button';
import { Globe } from 'lucide-react';
import { useLocale, useTranslations } from "next-intl";

export default function LanguageSwitcher() {
  const t = useTranslations("sidebar");
  const router = useRouter();
  const currentLocale = useLocale();
  const languages = [
    { code: "en", label: "English" },
    { code: "fr", label: "French" },
    { code: "ko", label: "Korean" },
  ];
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 hover:scale-110 transition-transform cursor-pointer"
        >
          <Globe className="h-4 w-4" />
          <span className="sr-only">{t("Language")}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="center" side="top">
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => {
              if (lang.code !== currentLocale) {
                document.cookie = `locale=${lang.code}; path=/`;
                router.refresh();
              }
            }}
            className={
              "cursor-pointer flex items-center gap-2 px-2 py-2" +
              (lang.code === currentLocale ? " bg-primary text-white" : "")
            }
          >
            <span>{t(lang.label)}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu >
  );
}
