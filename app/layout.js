import { Inter } from "next/font/google";      // Add Inter Font in this project
import "./globals.css";
import "./prism.css";
import { ClerkProvider } from "@clerk/nextjs";
import { AppContextProvider } from "@/context/AppContext";
import { Toaster } from "react-hot-toast";

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

            {/* it is used to show toast notifications
            toast notifications are used to show success and error messages */}
            <Toaster toastOptions={
              {
                success : {style: {background: "black", color: "white"}},
                error : {style: {background: "black", color: "white"}}
              }

            } />

            {children}
          </body>
        </html>
      </AppContextProvider>

    </ClerkProvider>
  );
}
