"use client";
import { useState, useEffect } from 'react';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import type React from "react";
import { ThemeProvider, useTheme } from "next-themes";
import { SessionProvider } from "next-auth/react";
import { MantineProvider } from '@mantine/core';

function MantineThemeProvider({ children }: { children: React.ReactNode; }) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch by only rendering after mounting on client side
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <>{children}</>;
  }

  return (
    <MantineProvider
      theme={{
        colorScheme: resolvedTheme as 'light' | 'dark',
      }}
    >
      {children}
    </MantineProvider>
  );
}

function Providers({ children }: { children: React.ReactNode; }) {
  const client = new QueryClient();

  return (
    <QueryClientProvider client={client}>
      <SessionProvider>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <MantineThemeProvider>
            <Toaster />
            {children}
          </MantineThemeProvider>
        </ThemeProvider>
      </SessionProvider>
    </QueryClientProvider>
  );
}

export default Providers

