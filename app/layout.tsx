import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Svjetlost Graf — digitalna štamparija u Dobrinji | Nezvanični demo",
  description: "Nezvanični demonstracijski koncept za Svjetlost Graf u Sarajevu. Pregled javno navedenih usluga štampe, uveza i grafičke dorade.",
  robots: { index: false, follow: false, googleBot: { index: false, follow: false } },
  icons: { icon: "/favicon.svg" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="bs"><body>{children}</body></html>;
}
