import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Svjetlost Graf - digitalna stamparija u Dobrinji | Nezvanicni demo",
  description: "Nezvanicni demonstracijski koncept za Svjetlost Graf u Sarajevu. Pregled javno navedenih usluga stampe, uveza i graficke dorade.",
  robots: { index: false, follow: false, googleBot: { index: false, follow: false } },
  icons: { icon: "/favicon.svg" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="bs"><body>{children}</body></html>;
}

