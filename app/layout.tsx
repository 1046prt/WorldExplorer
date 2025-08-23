import type { Metadata } from "next";

import "@/styles/globals.css";
import "@/app/globals.css";
import { ThemeProvider } from "@/components/theme-provider";

export const metadata: Metadata = {
  title: "WorldExplorer",
  description: " Discover the world's knowledge",
  icons: {
    icon: [
      {
        url: "/images/logo/WORLD.svg",
        type: "image/svg+xml",
      },
    ],
    shortcut: "/images/logo/WORLD.svg",
    apple: "/images/logo/WORLD.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
