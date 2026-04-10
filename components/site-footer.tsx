import { Github, Linkedin, Mail } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { siteMeta } from "@/lib/constants";
import { PAGE_SECTION_ITEMS } from "@/lib/page-nav";

const navLinkClass =
  "text-sm text-stone-400 transition hover:text-teal-400 dark:text-stone-500 dark:hover:text-teal-300";

const iconLinkClass =
  "inline-flex size-9 items-center justify-center rounded-lg border border-stone-600/90 text-stone-400 transition hover:border-teal-500/60 hover:bg-stone-800/50 hover:text-teal-300";

export async function SiteFooter() {
  const year = new Date().getFullYear();
  const tNav = await getTranslations("Nav");
  const tFooter = await getTranslations("Footer");
  const tHero = await getTranslations("Hero");

  return (
    <footer
      className="border-t border-stone-200/80 bg-stone-950 text-stone-300 dark:border-stone-800/90"
      aria-labelledby="footer-heading"
    >
      <div className="mx-auto max-w-7xl px-6 pb-[max(6rem,env(safe-area-inset-bottom))] pt-14 sm:px-8 sm:pb-24 sm:pt-16">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <p id="footer-heading" className="sr-only">
              {tFooter("heading")}
            </p>
            <Link
              href="/"
              className="font-serif text-lg font-semibold tracking-tight text-white"
            >
              {siteMeta.name}
            </Link>
            <p className="mt-2 max-w-sm text-sm leading-relaxed text-stone-400">
              {tHero("role")}
            </p>
          </div>

          <nav
            className="flex flex-wrap gap-x-6 gap-y-2"
            aria-label="Footer navigation"
          >
            {PAGE_SECTION_ITEMS.map((item) => (
              <Link
                key={item.sectionId}
                href={{ pathname: "/", hash: item.hash }}
                className={navLinkClass}
              >
                {tNav(item.sectionId)}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2 lg:justify-end">
            <a
              href={siteMeta.github}
              target="_blank"
              rel="noopener noreferrer"
              className={iconLinkClass}
              aria-label="GitHub"
            >
              <Github className="size-[18px]" aria-hidden />
            </a>
            <a
              href={siteMeta.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className={iconLinkClass}
              aria-label="LinkedIn"
            >
              <Linkedin className="size-[18px]" aria-hidden />
            </a>
            <a
              href={`mailto:${siteMeta.email}`}
              className={iconLinkClass}
              aria-label="Email"
            >
              <Mail className="size-[18px]" aria-hidden />
            </a>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-stone-800/90 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-stone-500">
            {tFooter("rights", { year, name: siteMeta.name })}
          </p>
          <a
            href={`mailto:${siteMeta.email}`}
            className="text-xs text-stone-500 transition hover:text-teal-400 sm:text-end"
          >
            {siteMeta.email}
          </a>
        </div>
      </div>
    </footer>
  );
}
