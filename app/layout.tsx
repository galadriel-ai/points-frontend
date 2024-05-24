import "@/app/globals.css";

import { Metadata, Viewport } from "next";
import { IBM_Plex_Mono as FontMono } from "next/font/google";
import localFont from "next/font/local";

import Footer from "@/app/common/footer";
import DesktopNav from "@/app/common/navbar";
import { Toaster } from "@/components/ui/sonner";
import { cn } from "@/lib/utils";

import { Provider } from "./provider";

const mondwest = localFont({
  src: "./fonts/PPMondwest-Regular.otf",
  variable: "--font-mondwest",
  display: "swap",
});

const neuebit = localFont({
  src: "./fonts/PPNeueBit-Bold.otf",
  variable: "--font-neuebit",
  display: "swap",
});

const fontMono = FontMono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body
        className={cn(
          "min-h-dvh min-w-[20rem] bg-primary font-mono antialiased relative",
          mondwest.variable,
          neuebit.variable,
          fontMono.variable
        )}
      >
        <svg
          width="1728"
          height="764"
          viewBox="0 0 1728 764"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute w-dvw h-auto aspect-auto top-0 left-1/2 -translate-x-1/2 z-10 bg-cover"
        >
          <path
            d="M744.856 501.78V548.535H698.109V501.78H604.615V764H698.109V642.044H744.856V595.289H862.038V501.78H744.856ZM1681.07 90.9617V44.207H1634.32V0H1399.94V44.207H1353.2V90.9617H1306.45V137.716H1446.69V90.9617H1587.25V137.716H1634.32V184.791H1446.69V231.545H1353.2V278.3H1306.45V372.129H1353.2V418.884H1399.94V465.639H1587.25V418.884H1634.32V764H1727.81V90.9617H1681.07ZM1634.32 325.375H1587.25V372.129H1423.31V278.3H1587.25V231.545H1634.32V325.375ZM1025.97 337.824V90.9617H979.22V44.207H932.473V0H698.099V44.207H651.352V90.9617H604.605V137.716H744.846V90.9617H885.407V137.716H932.473V184.791H744.846V231.545H651.352V278.3H604.605V372.129H651.352V418.884H698.099V465.639H885.407V418.884H932.473V465.639H1025.97V431.333H1025.98V337.824H1025.97ZM932.473 325.375H885.407V372.129H721.467V278.3H885.407V231.545H932.473V325.375ZM1494.08 595.289V548.535H1447.33V501.78H1212.96V548.535H1166.22V595.289H1119.47V764H1212.96V759.255H1540.82V595.289H1494.08ZM1447.33 689.118H1212.96V642.044H1259.7V595.289H1400.26V642.044H1447.33V689.118ZM416.977 0V44.207H510.791V0H416.977ZM510.791 314.122V137.716H276.736V231.545H416.977V278.3H370.23V325.375H323.483V372.129H136.176V325.375H89.1088V278.3H42.3618V0H-0.187988V372.129H42.3618V418.884H89.1088V465.639H323.483V418.884H370.23V372.129H416.977V465.639H417.627V548.535H370.56V501.78H183.253V548.535H136.506V595.289H89.7585V764H183.253V642.044H230V595.289H370.56V642.044H417.627V764H511.121V314.122H510.791ZM1119.46 0V465.639H1212.96V0H1119.46ZM932.484 501.78V764H1025.98V501.78H932.484Z"
            fill="url(#paint0_linear_6_1607)"
            fillOpacity="0.2"
          />
          <defs>
            <linearGradient
              id="paint0_linear_6_1607"
              x1="1437.08"
              y1="-30.2266"
              x2="1438.85"
              y2="874.23"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#2B2B2B" />
              <stop offset="1" stopColor="#0657E0" />
            </linearGradient>
          </defs>
        </svg>
        <Provider>
          <div className="relative flex flex-col justify-center items-center min-h-dvh z-20">
            <DesktopNav />
            {children}
            <Footer />
          </div>
        </Provider>
        <Toaster />
      </body>
    </html>
  );
}

export const metadata: Metadata = {
  metadataBase: new URL(`${process.env.NEXT_PUBLIC_WEBSITE_URL}`),
  title: "Galadriel",
  description: "The first L1 blockchain for AI",
  authors: [{ name: "Arunavo Ray", url: "https://www.arunavoray.dev/" }],
  keywords: ["galadriel", "blockchain", "ai", "L1 blockchain", "ethereum"],
  publisher: "Galadriel",
  openGraph: {
    title: "Galadriel",
    url: `https://${process.env.NEXT_PUBLIC_WEBSITE_DOMAIN}`,
    siteName: "Galadriel | The first L1 blockchain for AI",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: `https://${process.env.NEXT_PUBLIC_WEBSITE_DOMAIN}/api/og`,
        width: 1200,
        height: 630,
        alt: "Galadriel | The first L1 blockchain for AI",
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  twitter: {
    title: "Galadriel",
    card: "summary_large_image",
    creator: "@Galadriel_AI",
  },
  icons: {
    shortcut: `https://${process.env.NEXT_PUBLIC_WEBSITE_DOMAIN}/favicons/favicon.ico`,
  },
  appleWebApp: {
    capable: true,
    title: "Galadriel",
  },
  alternates: {
    canonical: `https://${process.env.NEXT_PUBLIC_WEBSITE_DOMAIN}`,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { color: "#0657E0" },
    { media: "(prefers-color-scheme: light)", color: "#0657E0" },
    { media: "(prefers-color-scheme: dark)", color: "#0657E0" },
  ],
};
