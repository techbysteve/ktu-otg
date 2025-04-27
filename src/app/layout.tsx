import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Toaster } from "@/components/ui/sonner";
import DynamicBreadcrumb from "@/components/dynamic-bread-crumb";
import Link from "next/link";

const inter = Inter({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "KTU On the Go (CSE)",
  description:
    "Your go-to platform for curated study materials tailored for B.Tech and M.Tech students under Kerala Technological University (KTU).",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // TODO: check out what this does?
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <main className="font-main ">
            <NavigationMenu className="border-b px-4 py-1">
              <h5 className="font-bold">
                ⚡ <Link href="/">KTU On the Go (CSE)</Link>
              </h5>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuLink
                    className={navigationMenuTriggerStyle()}
                    asChild
                  >
                    <a
                      href="https://github.com/steve-cse"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      GitHub
                    </a>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
            <div className="w-full max-w-5xl p-4 mx-auto">
              <DynamicBreadcrumb />

              {children}
            </div>
          </main>
          {/* Footer */}
          <footer className="w-full absolute bottom-0 border-t p-4 text-center text-sm text-muted-foreground">
            <p>
              Powered by{" "}
              <a
                href="https://www.bytecron.me/"
                target="_blank"
                className="underline"
              >
                Bytecron
              </a>
            </p>
          </footer>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
