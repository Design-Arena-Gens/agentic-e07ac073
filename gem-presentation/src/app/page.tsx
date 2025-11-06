"use client";

import { useEffect, useMemo, useState } from "react";

const sections = [
  { id: "overview", label: "Overview" },
  { id: "snapshot", label: "2024 Snapshot" },
  { id: "spotlights", label: "Regional Spotlights" },
  { id: "personas", label: "Founder Personas" },
  { id: "roadmap", label: "Strategic Roadmap" },
  { id: "qa", label: "Q&A" },
];

const metrics = [
  {
    label: "Total Early-stage Entrepreneurial Activity",
    value: "11.8%",
    change: "+0.7 pts YoY",
    description:
      "Share of working-age adults engaged in nascent or new ventures.",
  },
  {
    label: "Perceived Opportunities",
    value: "54%",
    change: "+4 pts YoY",
    description:
      "Adults who see good opportunities to start a business in their area.",
  },
  {
    label: "Fear of Failure",
    value: "38%",
    change: "-2 pts YoY",
    description:
      "Adults who would be deterred from starting a business by fear of failure.",
  },
  {
    label: "High-Growth Ambition",
    value: "19%",
    change: "+1 pt YoY",
    description:
      "Entrepreneurs expecting to create 10+ jobs within five years.",
  },
];

const capabilityScores = [
  { region: "North America", score: 84 },
  { region: "Western Europe", score: 78 },
  { region: "Latin America", score: 72 },
  { region: "Sub-Saharan Africa", score: 63 },
  { region: "MENA", score: 58 },
  { region: "South & East Asia", score: 70 },
];

const regionalHighlights = [
  {
    region: "North America",
    momentum: "Opportunity-driven rebound",
    insight:
      "Startup activity rebounded to pre-2020 levels with record opportunity perception and easier access to angel funding.",
    focusAreas: ["AI-enabled services", "Healthtech", "Climate resilience"],
  },
  {
    region: "Latin America",
    momentum: "Resilient founders",
    insight:
      "Despite macro volatility, founders show high entrepreneurial confidence and strong community support structures.",
    focusAreas: ["Fintech inclusion", "Food systems", "Creative economy"],
  },
  {
    region: "Africa",
    momentum: "Leapfrog innovation",
    insight:
      "Mobile-first solutions and public-private sandboxes drive rapid experimentation and high-growth startups.",
    focusAreas: ["Clean energy", "Agri-tech", "Logistics"],
  },
  {
    region: "Europe",
    momentum: "Scaling challenges",
    insight:
      "Founders excel in innovation but lag in growth ambition; access to scale-up capital remains uneven.",
    focusAreas: ["Deeptech commercialization", "Capital mobility", "Talent visas"],
  },
];

const personaTracks = [
  {
    name: "Vision-led Innovators",
    share: "28%",
    narrative:
      "Mission-driven founders leveraging research partnerships and deeptech breakthroughs.",
    needs: ["IP acceleration", "Cross-border funding", "Specialized mentors"],
  },
  {
    name: "Resilient Builders",
    share: "42%",
    narrative:
      "Founders in emerging markets solving infrastructure and inclusion gaps with capital efficiency.",
    needs: ["Micro-equity instruments", "Regulatory clarity", "Export gateways"],
  },
  {
    name: "Digital Natives",
    share: "30%",
    narrative:
      "Web-native entrepreneurs scaling AI, creator, and platform businesses with global teams from day one.",
    needs: ["Fractional leadership pools", "Data compliance playbooks", "Revenue-based financing"],
  },
];

const roadmap = [
  {
    phase: "Now",
    focus: "Strengthen Entrepreneurial Confidence",
    actions: [
      "Launch localized founder storytelling campaigns to reduce fear of failure by five points.",
      "Expand opportunity recognition workshops in secondary cities.",
      "Activate corporate-startup challenge funds around resilience themes.",
    ],
  },
  {
    phase: "Next 12 Months",
    focus: "Accelerate Scaling Pathways",
    actions: [
      "Stand up a global mentor exchange that pairs alumni founders with new cohorts.",
      "Co-invest with development finance institutions on founder-friendly growth capital.",
      "Deploy digital sandboxes for regulated sectors (fintech, health, climate).",
    ],
  },
  {
    phase: "24+ Months",
    focus: "Institutionalize Ecosystem Infrastructure",
    actions: [
      "Create a GEM Observatory with real-time dashboards and open data standards.",
      "Establish entrepreneurial leadership academies in partnership with universities.",
      "Align policy labs to test tax incentives and cross-border talent mobility.",
    ],
  },
];

const qaPrompts = [
  "How do we translate regional momentum into cross-market collaborations?",
  "Where should we invest to close the scale-up capital gap for high-growth founders?",
  "What metrics will we track to demonstrate ecosystem ROI within 12 months?",
  "How can GEM partners amplify the founder personas that outperform in 2024?",
];

function useActiveSection(sectionIds: string[]) {
  const [active, setActive] = useState(sectionIds[0]);

  useEffect(() => {
    const observers = sectionIds.map((id) => {
      const element = document.getElementById(id);

      if (!element) {
        return null;
      }

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActive(id);
            }
          });
        },
        { threshold: 0.3 }
      );

      observer.observe(element);

      return observer;
    });

    return () => {
      observers.forEach((observer) => observer?.disconnect());
    };
  }, [sectionIds]);

  return active;
}

function RegionBarChart() {
  const maxScore = useMemo(
    () => Math.max(...capabilityScores.map((item) => item.score)),
    []
  );

  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur">
      <h3 className="text-lg font-semibold text-white">
        Entrepreneurial Capability Index
      </h3>
      <p className="mt-1 text-sm text-slate-300">
        Composite score blending startup skills, networks, and innovation culture
        (0-100 scale).
      </p>
      <div className="mt-6 grid grid-cols-6 items-end gap-4 sm:gap-6">
        {capabilityScores.map((item) => (
          <div key={item.region} className="flex flex-col items-center gap-2">
            <div
              className="w-full rounded-xl bg-gradient-to-t from-emerald-400 via-teal-300 to-cyan-200 shadow-lg shadow-emerald-500/30 transition-transform hover:-translate-y-1"
              style={{ height: `${(item.score / maxScore) * 180}px` }}
            />
            <span className="text-sm font-semibold text-emerald-100">
              {item.score}
            </span>
            <span className="text-center text-xs font-medium text-slate-300">
              {item.region}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Home() {
  const activeSection = useActiveSection(sections.map((section) => section.id));

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="relative">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -left-32 top-10 h-72 w-72 rounded-full bg-emerald-500/20 blur-3xl" />
          <div className="absolute right-12 top-40 h-96 w-96 rounded-full bg-cyan-500/30 blur-3xl" />
          <div className="absolute bottom-8 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-purple-500/20 blur-3xl" />
        </div>
        <header className="sticky top-0 z-30 border-b border-white/5 bg-slate-950/90 backdrop-blur">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
            <div>
              <p className="text-xs uppercase tracking-[0.35em] text-emerald-300">
                GEM 2024
              </p>
              <p className="text-sm font-semibold text-white">
                Global Entrepreneurship Monitor | Strategic Briefing
              </p>
            </div>
            <nav className="hidden gap-4 text-sm font-medium sm:flex">
              {sections.map((section) => (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  className={`rounded-full px-4 py-2 transition ${
                    activeSection === section.id
                      ? "bg-emerald-400/20 text-white shadow-emerald-500/20"
                      : "text-slate-300 hover:text-white"
                  }`}
                >
                  {section.label}
                </a>
              ))}
            </nav>
          </div>
        </header>
        <main className="relative mx-auto max-w-6xl space-y-24 px-6 pb-24 pt-16 sm:pt-20">
          <section
            id="overview"
            className="grid gap-8 rounded-3xl border border-white/10 bg-white/5 p-10 backdrop-blur-xl lg:grid-cols-[1.2fr_1fr]"
          >
            <div className="space-y-6">
              <span className="inline-flex items-center gap-2 rounded-full border border-emerald-300/40 bg-emerald-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-emerald-200">
                Opening Slide
              </span>
              <h1 className="text-4xl font-bold leading-tight text-white sm:text-5xl">
                GEM 2024: Entrepreneurship as a Catalyst for Inclusive Growth
              </h1>
              <p className="text-lg text-slate-200">
                A data-rich briefing on how founders are reshaping economies,
                where ecosystems are accelerating, and what partners must do to
                unlock the next wave of impact.
              </p>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-4">
                  <p className="text-sm uppercase tracking-widest text-slate-400">
                    Audience
                  </p>
                  <p className="mt-2 text-base font-semibold text-white">
                    Ministers, ecosystem builders, anchor corporates, and
                    founder communities.
                  </p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-4">
                  <p className="text-sm uppercase tracking-widest text-slate-400">
                    Desired Outcome
                  </p>
                  <p className="mt-2 text-base font-semibold text-white">
                    Align on bold actions that fuel resilient, opportunity-led
                    entrepreneurship in every region.
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap gap-3">
                {sections.map((section) => (
                  <a
                    key={section.id}
                    href={`#${section.id}`}
                    className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold tracking-widest text-emerald-100 transition hover:border-emerald-300/60 hover:bg-emerald-500/10"
                  >
                    {section.label}
                  </a>
                ))}
              </div>
            </div>
            <div className="flex flex-col justify-between rounded-3xl border border-emerald-300/30 bg-gradient-to-br from-emerald-400/30 via-cyan-400/20 to-purple-400/20 p-6 text-slate-900 shadow-[0_0_60px_-20px_rgba(16,185,129,0.8)]">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.4em] text-emerald-950/80">
                  Signal
                </p>
                <h2 className="mt-2 text-2xl font-black">
                  Entrepreneurship is now the frontline strategy for inclusive
                  growth.
                </h2>
                <p className="mt-4 text-sm font-semibold text-emerald-950/70">
                  GEM spans 51 economies | 150k+ interviews | 25 years of
                  benchmark data.
                </p>
              </div>
              <div className="mt-6 space-y-2 rounded-2xl bg-white/20 p-4 text-sm font-medium text-emerald-950/80">
                <p>3 narrative arcs:</p>
                <ul className="list-disc space-y-1 pl-5">
                  <li>Opportunity confidence is rising faster than capital.</li>
                  <li>Founder personas are fragmenting into three winning plays.</li>
                  <li>Ecosystems must institutionalize scale-up infrastructure.</li>
                </ul>
              </div>
            </div>
          </section>

          <section id="snapshot" className="space-y-10">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.35em] text-emerald-300">
                  Slide 2
                </p>
                <h2 className="mt-1 text-3xl font-bold text-white">
                  2024 Global Entrepreneurship Snapshot
                </h2>
              </div>
              <p className="text-sm text-slate-300 max-w-xl">
                GEM’s longitudinal data reveals a confident yet cautious founder
                base. Opportunity recognition is up, but ecosystems must close
                capability gaps to sustain momentum.
              </p>
            </div>
            <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
              <div className="grid gap-6 sm:grid-cols-2">
                {metrics.map((metric) => (
                  <div
                    key={metric.label}
                    className="rounded-3xl border border-white/10 bg-gradient-to-br from-slate-900/80 to-slate-900/30 p-6 shadow-lg shadow-teal-500/10"
                  >
                    <p className="text-sm font-semibold text-emerald-200">
                      {metric.label}
                    </p>
                    <p className="mt-4 text-4xl font-black text-white">
                      {metric.value}
                    </p>
                    <p className="mt-2 text-sm font-semibold text-emerald-300">
                      {metric.change}
                    </p>
                    <p className="mt-3 text-sm text-slate-300">
                      {metric.description}
                    </p>
                  </div>
                ))}
              </div>
              <RegionBarChart />
            </div>
            <div className="rounded-3xl border border-white/5 bg-white/5 p-8 text-sm text-slate-200 backdrop-blur">
              <h3 className="text-lg font-semibold text-white">
                Insight to emphasize when presenting
              </h3>
              <p className="mt-2 leading-relaxed text-slate-300">
                Early-stage activity has outpaced pre-pandemic trends in half of
                tracked economies. Yet capability scores reveal a widening gap
                between talent density and access to advanced support, signaling
                the need for coordinated ecosystem investments.
              </p>
            </div>
          </section>

          <section id="spotlights" className="space-y-10">
            <div>
              <p className="text-xs uppercase tracking-[0.35em] text-emerald-300">
                Slides 3-6
              </p>
              <h2 className="mt-1 text-3xl font-bold text-white">
                Regional Spotlights
              </h2>
              <p className="mt-2 max-w-2xl text-sm text-slate-300">
                Tailor the conversation to each region’s momentum drivers. These
                slides highlight narrative anchors, opportunity spaces, and
                partnership angles for stakeholders.
              </p>
            </div>
            <div className="grid gap-6 lg:grid-cols-2">
              {regionalHighlights.map((region) => (
                <div
                  key={region.region}
                  className="flex flex-col gap-4 rounded-3xl border border-white/10 bg-slate-900/70 p-6 transition hover:border-emerald-300/50 hover:bg-slate-900/90"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-semibold text-white">
                      {region.region}
                    </h3>
                    <span className="rounded-full border border-emerald-300/40 bg-emerald-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-emerald-100">
                      {region.momentum}
                    </span>
                  </div>
                  <p className="text-sm text-slate-300">{region.insight}</p>
                  <div>
                    <p className="text-xs uppercase tracking-[0.3em] text-emerald-300">
                      Prime Focus Areas
                    </p>
                    <ul className="mt-3 grid gap-2 text-sm text-emerald-100 sm:grid-cols-3">
                      {region.focusAreas.map((area) => (
                        <li
                          key={area}
                          className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-center font-semibold"
                        >
                          {area}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section
            id="personas"
            className="space-y-10 rounded-3xl border border-white/10 bg-gradient-to-br from-slate-900/70 via-slate-900/50 to-slate-900/30 p-8"
          >
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.35em] text-emerald-300">
                  Slide 7
                </p>
                <h2 className="mt-1 text-3xl font-bold text-white">
                  2024 Founder Personas to Champion
                </h2>
              </div>
              <p className="max-w-xl text-sm text-slate-300">
                GEM interviews point to three high-performing founder archetypes.
                Equip your teams with the support structures they need to thrive.
              </p>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {personaTracks.map((persona) => (
                <div
                  key={persona.name}
                  className="flex flex-col gap-4 rounded-3xl border border-white/10 bg-slate-950/60 p-6"
                >
                  <div>
                    <p className="text-xs uppercase tracking-[0.3em] text-emerald-300">
                      {persona.share} of high-performing founders
                    </p>
                    <h3 className="mt-2 text-xl font-semibold text-white">
                      {persona.name}
                    </h3>
                    <p className="mt-3 text-sm text-slate-300">
                      {persona.narrative}
                    </p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <p className="text-xs uppercase tracking-[0.3em] text-emerald-300">
                      Critical Support
                    </p>
                    <ul className="mt-3 space-y-2 text-sm text-slate-100">
                      {persona.needs.map((need) => (
                        <li key={need} className="leading-snug">
                          • {need}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
            <div className="rounded-3xl border border-emerald-300/30 bg-emerald-500/10 p-6 text-sm text-emerald-100">
              <p className="font-semibold uppercase tracking-[0.3em] text-emerald-200">
                Presenter note
              </p>
              <p className="mt-2 text-emerald-50">
                Use this slide to prompt stakeholder commitments—match each
                persona to a tangible support initiative before moving on.
              </p>
            </div>
          </section>

          <section id="roadmap" className="space-y-10">
            <div>
              <p className="text-xs uppercase tracking-[0.35em] text-emerald-300">
                Slides 8-9
              </p>
              <h2 className="mt-1 text-3xl font-bold text-white">
                Strategic Roadmap for GEM Partners
              </h2>
              <p className="mt-2 max-w-2xl text-sm text-slate-300">
                Align stakeholders around a time-bound agenda. Each phase
                references measurable outcomes anchored in GEM indicators.
              </p>
            </div>
            <div className="grid gap-6 lg:grid-cols-3">
              {roadmap.map((phase) => (
                <div
                  key={phase.phase}
                  className="flex flex-col gap-4 rounded-3xl border border-white/10 bg-slate-900/70 p-6"
                >
                  <div>
                    <p className="text-xs uppercase tracking-[0.3em] text-emerald-300">
                      {phase.phase}
                    </p>
                    <h3 className="mt-2 text-xl font-semibold text-white">
                      {phase.focus}
                    </h3>
                  </div>
                  <ul className="space-y-3 text-sm text-slate-200">
                    {phase.actions.map((action) => (
                      <li key={action} className="rounded-2xl border border-white/5 bg-white/5 p-3 leading-snug">
                        {action}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <div className="grid gap-6 rounded-3xl border border-emerald-300/30 bg-emerald-500/10 p-6 text-sm text-emerald-100 lg:grid-cols-[1.1fr_0.9fr]">
              <div>
                <p className="font-semibold uppercase tracking-[0.3em] text-emerald-200">
                  Impact Metrics To Track
                </p>
                <ul className="mt-3 space-y-2 text-emerald-50">
                  <li>Increase opportunity perception to 60% across participating economies.</li>
                  <li>Cut fear of failure below 35% through storytelling and safety nets.</li>
                  <li>Double the share of founders with high-growth ambition in underperforming regions.</li>
                  <li>Publish quarterly ecosystem scorecards via the GEM Observatory.</li>
                </ul>
              </div>
              <div className="rounded-2xl border border-white/10 bg-slate-950/60 p-4 text-emerald-50">
                <p className="text-xs uppercase tracking-[0.3em] text-emerald-200">
                  Facilitation Cue
                </p>
                <p className="mt-2">
                  Invite participants to map their commitments onto this roadmap
                  live. Capture pledges in a shared workspace and revisit them at
                  future GEM forums.
                </p>
              </div>
            </div>
          </section>

          <section
            id="qa"
            className="rounded-3xl border border-white/10 bg-gradient-to-br from-slate-900/70 to-slate-900/30 p-10"
          >
            <p className="text-xs uppercase tracking-[0.35em] text-emerald-300">
              Final Slide
            </p>
            <h2 className="mt-2 text-3xl font-bold text-white">
              Q&amp;A | From Data to Action
            </h2>
            <p className="mt-4 max-w-2xl text-sm text-slate-300">
              Close with forward-looking prompts that keep the conversation
              anchored in measurable ecosystem outcomes.
            </p>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {qaPrompts.map((prompt) => (
                <div
                  key={prompt}
                  className="rounded-3xl border border-white/10 bg-white/5 p-5 text-slate-200"
                >
                  {prompt}
                </div>
              ))}
            </div>
            <div className="mt-8 flex flex-wrap items-center justify-between gap-4 rounded-3xl border border-emerald-300/30 bg-emerald-500/10 p-6 text-sm text-emerald-100">
              <div>
                <p className="font-semibold uppercase tracking-[0.3em] text-emerald-200">
                  Closing message
                </p>
                <p className="mt-2 text-emerald-50">
                  “GEM’s data is a call to design fearless ecosystems. Let’s
                  transform insight into collective investment.”
                </p>
              </div>
              <div className="text-right">
                <p className="text-xs uppercase tracking-[0.3em] text-emerald-200">
                  Contact
                </p>
                <p className="mt-2 text-emerald-50">insights@gem-global.org</p>
                <p className="text-emerald-50">+1 (000) 555-0121</p>
              </div>
            </div>
          </section>
        </main>
        <footer className="border-t border-white/5 bg-slate-950/80 py-6 text-center text-xs text-slate-400">
          <p>
            Global Entrepreneurship Monitor © {new Date().getFullYear()} | Data
            synthesized from GEM 2024 Global Report.
          </p>
        </footer>
      </div>
    </div>
  );
}
