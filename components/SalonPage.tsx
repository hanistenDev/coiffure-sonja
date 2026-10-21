import { SalonRoot } from "@/components/shared/SalonRoot";
import { overrides } from "@/salons/sonja/overrides";
import type { ResolvedSalon, SectionId } from "@/types/salon";

export function SalonPage({ salon }: { salon: ResolvedSalon }) {
  const Nav = overrides.navigation;
  const Foot = overrides.footer;
  const Sticky = overrides.stickyCta;

  return (
    <SalonRoot salon={salon}>
      <div id="home" />
      {Nav ? <Nav salon={salon} /> : null}
      <main className="min-w-0 overflow-x-clip">
        {salon.layout.sections.map((id) => {
          const Section = overrides[id as SectionId];
          if (!Section) return null;
          return <Section key={id} salon={salon} />;
        })}
      </main>
      {Foot ? <Foot salon={salon} /> : null}
      {Sticky ? <Sticky salon={salon} /> : null}
    </SalonRoot>
  );
}
