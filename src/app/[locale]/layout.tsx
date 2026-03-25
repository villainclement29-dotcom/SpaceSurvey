import type { Metadata } from "next";
import { Tektur, Michroma } from "next/font/google";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";

const tektur = Tektur({ subsets: ["latin"], variable: "--font-tektur" });
const michroma = Michroma({ subsets: ["latin"], weight: "400", variable: "--font-michroma" });
import "@/app/globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StarField from "@/components/StarField";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  return {
    title: "Space Veille",
    description: t("description"),
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();

  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning className={`${tektur.variable} ${michroma.variable}`}>
      <body>
        <StarField />
        <NextIntlClientProvider messages={messages}>
          <Header />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
