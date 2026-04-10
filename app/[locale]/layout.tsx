import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { PageBackground } from "@/components/page-background";
import { SiteFooter } from "@/components/site-footer";
import { SocialBar } from "@/components/social-bar";
import { routing } from "@/i18n/routing";
import { siteMeta } from "@/lib/constants";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin", "cyrillic"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin", "cyrillic"],
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata" });
  return {
    title: {
      default: `${siteMeta.name} · ${t("roleSuffix")}`,
      template: `%s · ${siteMeta.name}`,
    },
    description: t("description"),
  };
}

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html
      lang={locale}
      className={`${geistSans.variable} ${geistMono.variable} h-full scroll-smooth bg-transparent antialiased`}
    >
      <body className="min-h-full bg-transparent font-sans text-slate-900 dark:text-slate-100">
        <NextIntlClientProvider messages={messages}>
          <PageBackground />
          <div className="relative z-10 flex min-h-full flex-col">
            {children}
            <SiteFooter />
          </div>
          <SocialBar />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
