import { Inter } from "next/font/google";      // Add Inter Font in this project
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { AppContextProvider } from "@/context/AppContext";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});



export const metadata = {
  title: "Deepseek",                            // title which appears in browser tab
  description: "Full Stack Project",           // description for SEO
  icons: {
    icon: '/favicon.svg',
  },
};

export default function RootLayout({ children }) {
  return (

    <ClerkProvider>

      <AppContextProvider>

        <html lang="en">
          <body className={`${inter.className}  antialiased`}
          >
            {children}
          </body>
        </html>
      </AppContextProvider>

    </ClerkProvider>
  );
}
