import { CourseworksGallery } from "@/components/courseworks-gallery";
import { Hero } from "@/components/hero";
import { SectionContextSidebar } from "@/components/section-context-sidebar";
import { PersonalProjectsSection } from "@/components/personal-projects-section";
import { SubjectsSection } from "@/components/subjects-section";
import { TechnologiesSection } from "@/components/technologies-section";
import { WorkHistorySection } from "@/components/work-history-section";
import { setRequestLocale } from "next-intl/server";

type Props = { params: Promise<{ locale: string }> };

export default async function Home({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main className="min-w-0 flex-1 pb-28 lg:pl-[21rem] lg:pr-8">
      <SectionContextSidebar>
        <div data-page-section="top" className="scroll-mt-28">
          <Hero />
        </div>
        <div data-page-section="technologies" className="scroll-mt-28">
          <TechnologiesSection />
        </div>
        <div data-page-section="subjects" className="scroll-mt-28">
          <SubjectsSection />
        </div>
        <div data-page-section="courseworks" className="scroll-mt-28">
          <CourseworksGallery />
        </div>
        <div data-page-section="projects" className="scroll-mt-28">
          <PersonalProjectsSection />
        </div>
        <div data-page-section="experience" className="scroll-mt-28">
          <WorkHistorySection />
        </div>
      </SectionContextSidebar>
    </main>
  );
}
