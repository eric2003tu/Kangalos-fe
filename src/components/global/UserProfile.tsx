"use client";
import { useRouter } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Settings, HelpCircle, Users, Info, LogOut, Sun, Moon, Globe } from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { toast } from "react-hot-toast";
import { useSession, signOut } from "next-auth/react";

export default function UserProfile() {
    const tAuth = useTranslations("Auth");
    const tSidebar = useTranslations("sidebar");
    const { setTheme, theme } = useTheme();
    const router = useRouter();
    const currentLocale = useLocale();
    const { data: session, status } = useSession();

    if (status === "loading") {
        return <div>Loading...</div>; // Or a skeleton loader
    }

    if (status !== "authenticated" || !session?.user) {
        return null;
    }

    const { user } = session;
    const username = user.username || `${user.firstName} ${user.lastName}`;
    const userRoles = user.userType || tAuth("noRoles");

    const getInitials = (firstName?: string, lastName?: string) => {
        if (firstName && lastName) {
            return `${firstName.charAt(0).toUpperCase()}${lastName.charAt(0).toUpperCase()}`;
        }
        if (firstName) {
            return `${firstName.substring(0, 2).toUpperCase()}`;
        }
        return "UR";
    };

    const initials = getInitials(user.firstName, user.lastName);

    const handleLogout = async (e: React.MouseEvent) => {
        e.preventDefault();
        await signOut({ redirect: false });
        toast.success(tAuth("logoutSuccess"));
        router.push('/login');
    };

    const supportedLocales = ["en", "fr", "ko"];
    const handleChangeLocale = () => {
        const currentIdx = supportedLocales.indexOf(currentLocale);
        const nextLocale = supportedLocales[(currentIdx + 1) % supportedLocales.length];
        document.cookie = `locale=${nextLocale}; path=/`;
        router.refresh();
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <div className="p-[6px] cursor-pointer">
                    <Avatar className="h-[36px] w-[36px] bg-primary hover:bg-background">
                        <AvatarFallback className="text-primary font-black">{initials}</AvatarFallback>
                    </Avatar>
                </div>
            </DropdownMenuTrigger>

            <DropdownMenuContent
                className="w-[90vw] sm:w-80 bg-background text-muted-foreground shadow-md"
                align="end"
                sideOffset={8}
            >
                <div className="flex gap-4 pl-6 py-5 border-b">
                    <Avatar className="h-12 w-12">
                        <AvatarFallback className="text-xl font-bold text-background bg-primary">{initials}</AvatarFallback>
                    </Avatar>

                    <div>
                        <p className="text-base">{username}</p>
                        <p className="text-sm text-gray-600">{userRoles}</p>
                        <Link className="cursor-pointer text-xs underline" href='/portal/profile'>
                            {tAuth("editProfile")}
                        </Link>
                    </div>
                </div>

                <DropdownMenuGroup>
                    <DropdownMenuItem className="px-0 py-0 focus:bg-primary rounded-none group" onClick={handleChangeLocale}>
                        <div className="cursor-pointer flex gap-3 px-5 py-3 w-full">
                            <Globe className="text-primary group-hover:text-white" size={24} />
                            <span className="group-hover:text-white">
                                {tAuth("changeLanguage", {
                                    language:
                                        currentLocale === "en"
                                            ? tSidebar("French")
                                            : currentLocale === "fr"
                                                ? tSidebar("Korean")
                                                : tSidebar("English")
                                })}
                            </span>
                        </div>
                    </DropdownMenuItem>

                    <DropdownMenuItem
                        className="px-0 py-0 focus:bg-primary rounded-none group"
                        onClick={() => setTheme(theme === "light" ? "dark" : "light")}
                    >
                        <div className="cursor-pointer flex gap-3 px-5 py-3 w-full">
                            <Sun className="text-primary group-hover:text-white dark:hidden" size={24} />
                            <Moon className="hidden text-primary group-hover:text-white dark:block" size={24} />
                            <span className="group-hover:text-white">
                                {tAuth("changeTheme", { mode: theme === "light" ? tSidebar("Dark") : tSidebar("Light") })}
                            </span>
                        </div>
                    </DropdownMenuItem>

                    <DropdownMenuItem asChild className="px-0 py-0 focus:bg-primary rounded-none group">
                        <Link
                            className="cursor-pointer flex gap-3 px-5 py-3 w-full"
                            href='/portal/settings'
                        >
                            <Settings size={24} className="text-primary group-hover:text-white" />
                            <span className="group-hover:text-white">{tAuth("settings")}</span>
                        </Link>
                    </DropdownMenuItem>

                    <DropdownMenuItem asChild className="px-0 py-0 focus:bg-primary rounded-none group">
                        <Link
                            className="cursor-pointer flex gap-3 px-5 py-3 w-full"
                            href='/portal/profile'
                        >
                            <Users size={24} className="text-primary group-hover:text-white" />
                            <span className="group-hover:text-white">{tAuth("account")}</span>
                        </Link>
                    </DropdownMenuItem>

                    <DropdownMenuItem asChild className="px-0 py-0 focus:bg-primary rounded-none group">
                        <Link className="cursor-pointer flex gap-3 px-5 py-3 w-full" href='/help'>
                            <HelpCircle size={24} className="text-primary group-hover:text-white" />
                            <span className="group-hover:text-white">{tAuth("help")}</span>
                        </Link>
                    </DropdownMenuItem>

                    <DropdownMenuItem asChild className="px-0 py-0 focus:bg-primary rounded-none group">
                        <Link className="cursor-pointer flex gap-3 px-5 py-3 w-full" href='/about'>
                            <Info size={24} className="text-primary group-hover:text-white" />
                            <span className="group-hover:text-white">{tAuth("about")}</span>
                        </Link>
                    </DropdownMenuItem>

                    <DropdownMenuItem asChild className="px-0 py-0 focus:bg-primary rounded-none group">
                        <button
                            className="cursor-pointer flex gap-3 px-5 py-3 w-full text-left"
                            onClick={handleLogout}
                        >
                            <LogOut size={24} className="text-primary group-hover:text-white" />
                            <span className="group-hover:text-white">{tAuth("logout")}</span>
                        </button>
                    </DropdownMenuItem>
                </DropdownMenuGroup>

                <DropdownMenuSeparator />
                <div className="p-4 text-xs text-gray-500">
                    <p className="mb-1">{tAuth("version")}</p>
                    <p className="mb-1">{tAuth("developedBy")}</p>
                    <p className="mb-1">{tAuth("status")}</p>
                    <p className="mb-1">{tAuth("lastUpdated")}: {new Date().toLocaleDateString()}</p>
                </div>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
