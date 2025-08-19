import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import Home from "@/components/Home";
import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col relative bg-primary">
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero-image.png"
          alt="University Campus Background"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/80" />
      </div>

      {/* Header */}
      <header className=" top-0 z-[1000] w-full px-4 py-4 md:px-6 lg:px-8 sticky bg-white shadow-md">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center">
              <Image
                src="/images/ur-logo.png"
                alt={"User Avatar"}
                width={240}
                height={240}
                className="rounded-full object-cover"
              />
            </div>
            <div className="">
              <h1 className="text-xl font-bold">Kangalos</h1>
              <p className="text-xs text-primary">Project Management Platform</p>
            </div>
          </div>
          <Button asChild className="rounded-sm">
            <Link href="/login">Login</Link>
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 flex-1 flex items-center justify-center">
        <Home />
      </main>

      

      {/* Footer */}
      <footer className="relative z-10 w-full px-4 py-6 md:px-6 lg:px-8 border-t border-border/20 bg-white">
      <Footer/>
      </footer>
    </div>
  );
}
