import type { Metadata } from "next";
import { Source_Code_Pro, Source_Sans_3, Source_Serif_4 } from "next/font/google";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { PageBackground } from "@/components/page-background";
import { SiteFooter } from "@/components/site-footer";
import { SocialBar } from "@/components/social-bar";
import { routing } from "@/i18n/routing";
import { siteMeta } from "@/lib/constants";

const sourceSans = Source_Sans_3({
  variable: "--font-source-sans",
  subsets: ["latin", "cyrillic", "cyrillic-ext"],
  display: "swap",
});

const sourceSerif = Source_Serif_4({
  variable: "--font-source-serif",
  subsets: ["latin", "cyrillic", "cyrillic-ext"],
  display: "swap",
});

const sourceCode = Source_Code_Pro({
  variable: "--font-source-mono",
  subsets: ["latin", "cyrillic", "cyrillic-ext"],
  display: "swap",
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
    description: t("description", { name: siteMeta.name }),
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
      className={`${sourceSans.variable} ${sourceSerif.variable} ${sourceCode.variable} h-full scroll-smooth bg-transparent antialiased`}
    >
      <body className="min-h-full bg-transparent font-sans text-stone-900 dark:text-stone-100">
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
