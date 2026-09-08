import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import {
  ArrowRight,
  Sparkles,
  Bot,
  Target,
  PenLine,
  Palette,
  Check,
  X,
  Clock,
  Wallet,
  ShieldCheck,
  Users,
  Compass,
  Eye,
  Flag,
  Heart,
  Star,
  MessageCircle,
  Mail,
  Phone,
  Quote,
  Globe,
  Share2,
} from "lucide-react";

import founderImg from "@/assets/founder-tejas.jpg";
import heroBg from "@/assets/hero-bg.jpg";
import case1 from "@/assets/case-1.jpg";
import case2 from "@/assets/case-2.jpg";
import case3 from "@/assets/case-3.jpg";
import case4 from "@/assets/case-4.jpg";
import case5 from "@/assets/case-5.jpg";
import case6 from "@/assets/case-6.jpg";

export const Route = createFileRoute("/")({
  component: LandingPage,
});

/* ---------- Data ---------- */

const stats = [
  { value: "5+", label: "Years in the trenches" },
  { value: "Strategy-led", label: "Every engagement" },
  { value: "MSME", label: "Built for Indian founders" },
  { value: "1:1", label: "Senior attention, always" },
];

const clientLogoIndexes = [...Array.from({ length: 21 }, (_, index) => index + 1), 23];
const clientLogos = clientLogoIndexes.map((index) => ({
  src: `/client-logos/logo-${String(index).padStart(2, "0")}.png`,
  alt: index === 7 ? "Fuelcats India Pvt Ltd" : `Perspective Media Labs client logo ${index}`,
  darkBackground: index === 7,
}));

const services = [
  { icon: Compass, title: "Strategy and Positioning", desc: "Sharpen who you are, who you're for, and why you win - before we spend a rupee." },
  { icon: Palette, title: "Brand and Design", desc: "Identity, decks, brochures, stationery, and packaging - designed by specialists, owned by us." },
  { icon: PenLine, title: "Content and Copy", desc: "Weekly content engines that sound like you, not like every other brand on the feed." },
  { icon: Share2, title: "Social Media and Performance", desc: "Organic to paid - content calendars, community management, and Meta, Google, LinkedIn campaigns under one roof." },
  { icon: Globe, title: "Website and Digital Presence", desc: "Landing pages, business websites, GMB, and SEO - one brief, one owner, one finished product." },
  { icon: Bot, title: "AI Automations and Reporting", desc: "Lead capture, WhatsApp automation, CRM hygiene, and monthly reports - One dashboard, one story." },
];

const serviceDetails: Record<string, string[]> = {
  "Strategy and Positioning": ["Understand your audience, competitors, and market opportunities.", "Define your positioning, key messages, and brand voice.", "Build a practical marketing roadmap around your business goals."],
  "Brand and Design": ["Create a consistent visual identity across your brand touchpoints.", "Design pitch decks, brochures, stationery, and packaging.", "Coordinate specialist designers through one accountable point of contact."],
  "Content and Copy": ["Plan content themes and a regular publishing calendar.", "Write website copy, social posts, and campaign messaging in your brand voice.", "Keep content consistent with your audience and marketing goals."],
  "Social Media and Performance": ["Plan and manage organic content and community conversations.", "Build paid campaigns across Meta, Google, and LinkedIn.", "Review creative and campaign performance to guide ongoing improvements."],
  "Website and Digital Presence": ["Create landing pages and business websites with clear customer journeys.", "Improve your Google Business Profile and search visibility.", "Coordinate copy, design, and development from brief to launch."],
  "AI Automations and Reporting": ["Connect lead capture and WhatsApp follow-ups to your workflow.", "Organise CRM data and automate repetitive marketing tasks.", "Bring key results into a clear dashboard and monthly report."],
};

const cases = [
  { img: case1, tag: "D2C Beauty", industry: "Beauty & Personal Care", title: "Loveska Skincare", scope: "Full-funnel rebuild and creative testing loop across paid social and lifecycle.", metric: "3.2× ROAS in 90 days", note: "Rebuilt funnel + creative testing loop", stats: [{ v: "3.2×", l: "ROAS in 90 days" }, { v: "90 days", l: "End-to-end rebuild" }, { v: "Full funnel", l: "Awareness to retention" }] },
  { img: case2, tag: "B2B SaaS", industry: "B2B SaaS", title: "Metryx Analytics", scope: "Account-based LinkedIn program plus intent-driven nurture for enterprise pipeline.", metric: "60% cheaper qualified leads", note: "LinkedIn ABM + intent-based nurture", stats: [{ v: "60%", l: "Lower cost per SQL" }, { v: "120 days", l: "Program build" }, { v: "ABM", l: "Full-cycle GTM motion" }] },
  { img: case3, tag: "F&B", industry: "Food & Beverage", title: "Cofact Cafés", scope: "Local SEO, creator-led launches, and community-first content across 12 cities.", metric: "12 cities, 40k community", note: "Local SEO + creator-led launches", stats: [{ v: "12 cities", l: "Simultaneous launches" }, { v: "40k+", l: "Community members" }, { v: "Local SEO", l: "Creator-led rollout" }] },
  { img: case4, tag: "Fintech", industry: "Consumer Fintech", title: "Payloop", scope: "Full-funnel performance and app-store optimization for consumer fintech growth.", metric: "5× app installs QoQ", note: "Full-funnel performance + ASO", stats: [{ v: "5×", l: "App installs QoQ" }, { v: "60 days", l: "Optimization sprint" }, { v: "Full funnel", l: "Paid + ASO + lifecycle" }] },
  { img: case5, tag: "Manufacturing", industry: "Industrial Manufacturing", title: "Shreyas Industries", scope: "Technical SEO overhaul and long-form industrial content engine for B2B buyers.", metric: "1st page for 27 keywords", note: "Technical SEO + industrial content", stats: [{ v: "27", l: "Page-one keywords" }, { v: "180 days", l: "SEO program" }, { v: "Technical SEO", l: "Plus content engine" }] },
  { img: case6, tag: "Fashion D2C", industry: "Fashion & Apparel", title: "Onward Studios", scope: "Retention automation and email/SMS lifecycle for a repeat-purchase D2C brand.", metric: "42% repeat purchase rate", note: "Retention automation + email flows", stats: [{ v: "42%", l: "Repeat purchase rate" }, { v: "90 days", l: "Lifecycle rebuild" }, { v: "Retention", l: "Email + SMS automation" }] },
];

const compare = [
  {
    key: "cost",
    label: "Cost model",
    inhouse: "High fixed salaries + tools",
    agency: "Retainers + hidden addons",
    us: "Flexible, outcome-linked",
  },
  {
    key: "expertise",
    label: "Expertise",
    inhouse: "Limited to who you hired",
    agency: "Junior teams, senior pitches",
    us: "Senior operators, strategy-led",
  },
  {
    key: "speed",
    label: "Speed to launch",
    inhouse: "Weeks of hiring & ramp",
    agency: "Onboarding + approval chains",
    us: "Live in days, not months",
  },
  {
    key: "attention",
    label: "Ownership",
    inhouse: "Everyone owns it, no one owns it",
    agency: "Passed between account managers",
    us: "One concierge, one accountable owner",
  },
  {
    key: "strategy",
    label: "Strategy fit",
    inhouse: "In-the-weeds thinking",
    agency: "Templated playbooks",
    us: "Built around your business, not ours",
  },
];

const testimonials = [
  { name: "Ananya Rao", role: "Founder, Loveska", initials: "AR", quote: "It felt less like hiring an agency and more like getting a CMO on speed dial. The reporting alone saved us 6 hours a week." },
  { name: "Rohit Menon", role: "CEO, Metryx", initials: "RM", quote: "They understood our SaaS funnel in one call. Two months in, our CAC is half of what it was - with better leads." },
  { name: "Sneha Kulkarni", role: "Marketing Head, Cofact", initials: "SK", quote: "Fresh, bold, and refreshingly honest. They kill bad ideas fast so the good ones get real budget." },
  { name: "Vikram Shah", role: "Co-founder, Payloop", initials: "VS", quote: "The AI automations they set up quietly run our lead ops. It's the most leverage we've ever gotten from a marketing partner." },
];

const values = [
  { icon: Eye, title: "Vision", text: "Make world-class marketing accessible to every Indian MSME - not just the funded few." },
  { icon: Flag, title: "Mission", text: "Be the concierge that founders trust to think, execute, and report - where the right tools quietly do what tools should, so your concierge can focus on what actually matters." },
  { icon: Heart, title: "Values", text: "Honesty over hype. Craft over volume. Outcomes over optics. Long games over quick wins." },
];

const approach = [
  { word: "Perspective", desc: "We start where every good strategy starts - understanding your business, your customer, and your market from the inside out." },
  { word: "Media", desc: "Then we build the channels, creative, and campaigns that actually move the needle - not vanity metrics." },
  { word: "Labs", desc: "We use smart tools and automation to measure, iterate, and improve everything quietly in the background. Nothing runs blind. Everything runs better." },
];

/* ---------- Page ---------- */

function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      <Nav />
      <Hero />
      <StatsBar />
      <Clientele />
      <Services />
      <Values />
      <Comparison />
      <Savings />
      <Approach />
      <Portfolio />
      <Testimonials />
      <Founder />
      <ContactSection />
      <Footer />
      <WhatsAppWidget />
    </div>
  );
}

/* ---------- Nav ---------- */

function Nav() {
  const links = [
    { href: "#services", label: "Services" },
    { href: "#work", label: "Work" },
    { href: "#approach", label: "Approach" },
    { href: "#founder", label: "Founder" },
    { href: "#contact", label: "Contact" },
  ];
  return (
    <header className="sticky top-0 z-40 backdrop-blur-xl bg-background/80 border-b border-border">
      <div className="container-page flex items-center justify-between h-18 py-3">
        <a href="#top" className="flex items-center gap-3 min-w-0">
          <img src="/pml-logo-mark.svg" alt="Perspective Media Labs" className="h-12 w-auto shrink-0" />
          <div className="min-w-0 leading-tight hidden sm:block">
            <div className="text-[18px] font-semibold text-navy truncate">Perspective Media Labs</div>
          </div>
        </a>
        <nav className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="text-sm font-medium text-navy-soft hover:text-primary-deep transition-colors">
              {l.label}
            </a>
          ))}
        </nav>
        <a href="#contact" className="btn-primary text-sm">
          Book a call <ArrowRight className="w-4 h-4" />
        </a>
      </div>
    </header>
  );
}

/* ---------- Hero ---------- */

function Hero() {
  return (
    <section id="top" className="relative hero-bg overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-0 opacity-40 pointer-events-none"
        style={{ backgroundImage: `url(${heroBg})`, backgroundSize: "cover", backgroundPosition: "right center", maskImage: "linear-gradient(to left, black, transparent 70%)" }}
      />
      <div className="container-page relative py-24 md:py-32 grid md:grid-cols-12 gap-10 items-center">
        <div className="md:col-span-7 animate-fade-up">
          <span className="eyebrow"><Sparkles className="w-3.5 h-3.5" /> India's marketing concierge for growing businesses</span>
          <h1 className="mt-6 font-serif text-5xl md:text-7xl font-semibold text-navy leading-[1.02]">
            Marketing that runs
            <span className="block italic text-primary-deep">like it's yours.</span>
          </h1>
          <p className="mt-6 text-lg text-navy-soft max-w-xl leading-relaxed">
            One senior concierge. Smarter tools doing the heavy lifting. A partner that thinks like a founder, ships like an operator, and reports like a CFO - built for Indian MSMEs and startups.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#contact" className="btn-primary">Start with a free audit <ArrowRight className="w-4 h-4" /></a>
            <a href="#work" className="btn-ghost">See our work</a>
          </div>
          <div className="mt-10 flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex -space-x-2">
              {["A", "R", "S", "V"].map((c) => (
                <div key={c} className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-primary-deep text-primary-foreground grid place-items-center text-xs font-semibold ring-2 ring-background">{c}</div>
              ))}
            </div>
            <span>Trusted by founders across D2C, SaaS, F&B and manufacturing.</span>
          </div>
        </div>
        <div className="md:col-span-5 relative animate-fade-up">
          <div className="relative rounded-3xl overflow-hidden border border-border bg-card shadow-[var(--shadow-elegant)]">
            <div className="p-6 bg-gradient-to-br from-primary-deep to-navy text-primary-foreground">
              <div className="flex items-center justify-between text-xs uppercase tracking-widest opacity-80">
                <span>Concierge dashboard</span><span>This week</span>
              </div>
              <div className="mt-4 font-serif text-3xl">₹4.8L saved · 2.1× ROAS</div>
              <div className="mt-1 text-sm opacity-80">Auto-optimized across Meta, Google, LinkedIn</div>
            </div>
            <div className="p-6 space-y-4">
              {[
                { l: "Qualified leads", v: "+312", tone: "text-success" },
                { l: "Cost per lead", v: "-46%", tone: "text-primary-deep" },
                { l: "Content shipped", v: "18 pieces", tone: "text-navy" },
              ].map((r) => (
                <div key={r.l} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                  <span className="text-sm text-muted-foreground">{r.l}</span>
                  <span className={`font-semibold ${r.tone}`}>{r.v}</span>
                </div>
              ))}
              <div className="flex items-center gap-2 pt-2 text-xs text-muted-foreground">
                <Bot className="w-4 h-4 text-primary" /> Optimized 14 minutes ago
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Stats bar ---------- */

function StatsBar() {
  return (
    <section className="border-y border-border bg-surface">
      <div className="container-page grid grid-cols-2 md:grid-cols-4 divide-x divide-border">
        {stats.map((s) => (
          <div key={s.label} className="py-8 px-6 text-center">
            <div className="font-serif text-3xl md:text-4xl font-semibold text-primary-deep">{s.value}</div>
            <div className="mt-1 text-sm text-navy-soft">{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ---------- Clientele ---------- */

function Clientele() {
  return (
    <section className="py-16">
      <div className="container-page text-center">
        <p className="text-xs tracking-widest uppercase text-muted-foreground">Trusted by leading brands</p>
      </div>
      <div className="mt-8 relative overflow-hidden">
        <div className="flex items-center gap-8 animate-marquee whitespace-nowrap w-max">
          {[...clientLogos, ...clientLogos].map((logo, i) => (
            <div key={`${logo.src}-${i}`} className="flex h-36 w-72 shrink-0 items-center justify-center">
              <img src={logo.src} alt={logo.alt} className={`h-32 w-64 object-contain transition-transform hover:scale-105 ${logo.darkBackground ? "rounded-xl bg-navy p-3" : "mix-blend-multiply"}`} loading="lazy" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Services ---------- */

function Services() {
  return (
    <section id="services" className="py-24 bg-surface">
      <div className="container-page">
        <div className="max-w-2xl">
          <span className="eyebrow">What we do</span>
          <h2 className="mt-4 font-serif text-4xl md:text-5xl font-semibold text-navy">One concierge. Six capabilities. Zero handoffs.</h2>
          <p className="mt-4 text-navy-soft text-lg">Everything a modern marketing team does - folded into one senior relationship, briefed and delivered by us.</p>
        </div>
        <div className="mt-14 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s) => (
            <div key={s.title} className="card-elevated p-8 flex flex-col items-start">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-primary-deep grid place-items-center text-primary-foreground">
                <s.icon className="w-6 h-6" />
              </div>
              <h3 className="mt-6 font-serif text-xl font-semibold text-navy">{s.title}</h3>
              <p className="mt-2 flex-1 text-navy-soft leading-relaxed">{s.desc}</p>
              <Dialog>
                <DialogTrigger asChild>
                  <button type="button" className="mt-6 self-center md:self-start inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-semibold text-primary-deep transition-colors hover:bg-primary-deep hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 cursor-pointer" aria-label={`Know more about ${s.title}`}>
                    Know more <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </button>
                </DialogTrigger>
                <DialogContent className="w-[calc(100%-2rem)] max-w-md max-h-[85dvh] overflow-y-auto rounded-2xl sm:rounded-2xl border-primary/20 bg-card p-6 sm:p-8">
                  <img
                    src="/pml-logo-mark.svg"
                    alt=""
                    aria-hidden="true"
                    draggable={false}
                    className="pointer-events-none absolute left-1/2 top-1/2 h-auto w-3/5 max-w-64 -translate-x-1/2 -translate-y-1/2 select-none opacity-[0.045]"
                  />
                  <div className="relative w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-primary-deep grid place-items-center text-primary-foreground">
                    <s.icon className="w-6 h-6" aria-hidden="true" />
                  </div>
                  <DialogHeader className="relative text-left">
                    <DialogTitle className="font-serif text-2xl leading-tight text-navy">{s.title}</DialogTitle>
                    <DialogDescription className="pt-2 text-navy-soft leading-relaxed">{s.desc}</DialogDescription>
                  </DialogHeader>
                  <ul className="relative space-y-3 border-t border-border pt-4">
                    {serviceDetails[s.title].map((detail) => (
                      <li key={detail} className="flex gap-3 text-sm leading-relaxed text-navy-soft">
                        <Check className="mt-1 h-4 w-4 shrink-0 text-primary-deep" aria-hidden="true" />
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </DialogContent>
              </Dialog>
            </div>
          ))}
        </div>
        <p className="mt-8 text-sm text-muted-foreground max-w-3xl">
          Creative work across design, print, web, and video is executed through our curated network of vetted specialists - briefed, managed, and reported by us. You pay actuals. Always.
        </p>
      </div>
    </section>
  );
}

/* ---------- Comparison ---------- */

function Comparison() {
  return (
    <section className="py-24">
      <div className="container-page">
        <div className="max-w-2xl">
          <span className="eyebrow">The concierge model</span>
          <h2 className="mt-4 font-serif text-4xl md:text-5xl font-semibold text-navy">Not a hire. Not an agency. Something better.</h2>
          <p className="mt-4 text-navy-soft text-lg">A smarter way to run marketing - less overhead, more ownership, real outcomes.</p>
        </div>

        <div className="mt-14 grid lg:grid-cols-[1.1fr_1.1fr_1.4fr] gap-6">
          <ComparisonCard variant="muted" title="In-house team" items={compare.map((r) => r.inhouse)} labels={compare.map((r) => r.label)} bad />
          <ComparisonCard variant="muted" title="Traditional agency" items={compare.map((r) => r.agency)} labels={compare.map((r) => r.label)} bad />
          <ComparisonCard variant="primary" title="Perspective concierge" items={compare.map((r) => r.us)} labels={compare.map((r) => r.label)} />
        </div>
      </div>
    </section>
  );
}

function ComparisonCard({ variant, title, items, labels, bad }: { variant: "muted" | "primary"; title: string; items: string[]; labels: string[]; bad?: boolean }) {
  const primary = variant === "primary";
  return (
    <div
      className={`rounded-3xl p-8 border ${primary ? "text-primary-foreground border-transparent shadow-[var(--shadow-elegant)]" : "bg-card border-border shadow-[var(--shadow-card)]"}`}
      style={primary ? { background: "var(--gradient-primary)" } : undefined}
    >
      <div className="flex items-center justify-between">
        <h3 className={`font-serif text-2xl font-semibold ${primary ? "text-primary-foreground" : "text-navy"}`}>{title}</h3>
        {primary && <span className="text-xs font-semibold uppercase tracking-widest bg-white/15 px-3 py-1 rounded-full">Us</span>}
      </div>
      <ul className="mt-6 space-y-4">
        {items.map((it, i) => (
          <li key={i} className="flex gap-3">
            <span className={`mt-0.5 w-6 h-6 rounded-full grid place-items-center shrink-0 ${primary ? "bg-white/20" : bad ? "bg-destructive/10 text-destructive" : "bg-primary/10 text-primary-deep"}`}>
              {bad ? <X className="w-3.5 h-3.5" /> : <Check className={`w-3.5 h-3.5 ${primary ? "text-white" : ""}`} />}
            </span>
            <div className="min-w-0">
              <div className={`text-[11px] font-semibold uppercase tracking-widest ${primary ? "text-white/70" : "text-muted-foreground"}`}>{labels[i]}</div>
              <div className={`text-sm ${primary ? "text-primary-foreground" : "text-navy"}`}>{it}</div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ---------- Savings ---------- */

function Savings() {
  const items = [
    { icon: Clock, big: "20+ hrs", label: "Saved every week", note: "No hiring, no vendor herding, no status calls." },
    { icon: Wallet, big: "60%", label: "Lower fixed cost", note: "Pay for outcomes, not for people warming chairs." },
    { icon: ShieldCheck, big: "1 owner", label: "End-to-end accountability", note: "One WhatsApp thread, one number that answers." },
  ];
  return (
    <section className="py-24 bg-navy text-primary-foreground relative overflow-hidden">
      <div aria-hidden className="absolute inset-0 opacity-30" style={{ background: "radial-gradient(600px 300px at 20% 0%, oklch(0.66 0.11 210 / 0.5), transparent 60%)" }} />
      <div className="container-page relative">
        <div className="max-w-2xl">
          <span className="eyebrow">Time & cost</span>
          <h2 className="mt-4 font-serif text-4xl md:text-5xl font-semibold">Founder time is the real budget.</h2>
          <p className="mt-4 text-white/70 text-lg">We measure success not just in ROAS - but in the hours we hand back to you.</p>
        </div>
        <div className="mt-14 grid md:grid-cols-3 gap-6">
          {items.map((i) => (
            <div key={i.label} className="rounded-2xl bg-white/5 border border-white/10 p-8 backdrop-blur">
              <i.icon className="w-8 h-8 text-primary" />
              <div className="mt-6 font-serif text-5xl font-semibold">{i.big}</div>
              <div className="mt-1 font-semibold">{i.label}</div>
              <p className="mt-3 text-sm text-white/70">{i.note}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Approach ---------- */

function Approach() {
  return (
    <section id="approach" className="py-24">
      <div className="container-page">
        <div className="max-w-2xl">
          <span className="eyebrow">Our approach</span>
          <h2 className="mt-4 font-serif text-4xl md:text-5xl font-semibold text-navy">The name is the method.</h2>
          <p className="mt-4 text-navy-soft text-lg">Perspective. Media. Labs. Three words. One way of working.</p>
        </div>
        <div className="mt-14 grid md:grid-cols-3 gap-6">
          {approach.map((a, i) => (
            <div key={a.word} className="relative p-8 rounded-3xl border border-border bg-surface">
              <div className="font-serif text-6xl font-semibold text-primary/20 absolute top-4 right-6">0{i + 1}</div>
              <h3 className="font-serif text-3xl font-semibold text-primary-deep">{a.word}<span className="text-navy">.</span></h3>
              <p className="mt-4 text-navy-soft leading-relaxed">{a.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Portfolio ---------- */

function Portfolio() {
  const [mobileCard, setMobileCard] = useState(0);
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const active = openIdx !== null ? cases[openIdx] : null;

  useEffect(() => {
    if (active) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpenIdx(null); };
      window.addEventListener("keydown", onKey);
      return () => { document.body.style.overflow = prev; window.removeEventListener("keydown", onKey); };
    }
  }, [active]);

  const handleCta = () => {
    setOpenIdx(null);
    setTimeout(() => {
      document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
    }, 50);
  };

  return (
    <section id="work" className="py-24 bg-surface">
      <div className="container-page">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-2xl">
            <span className="eyebrow">Results that speak</span>
            <h2 className="mt-4 font-serif text-4xl md:text-5xl font-semibold text-navy">Work we're proud of.</h2>
            <p className="mt-4 text-navy-soft text-lg">A snapshot of what happens when strategy, creative, and smart execution actually work together.</p>
          </div>
          <a href="#contact" className="btn-ghost text-sm">Get a similar plan <ArrowRight className="w-4 h-4" /></a>
        </div>
        <div className="mt-14 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cases.map((c, i) => (
            <button
              key={c.title}
              type="button"
              onClick={() => setOpenIdx(i)}
              className={`group card-elevated overflow-hidden text-left w-full min-w-0 ${i === mobileCard ? "block" : "hidden md:block"}`}
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img src={c.img} alt={c.title} loading="lazy" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
              </div>
              <div className="p-6">
                <div className="text-xs font-semibold uppercase tracking-widest text-primary-deep">{c.tag}</div>
                <h3 className="mt-2 font-serif text-xl font-semibold text-navy">{c.title}</h3>
                <div className="mt-3 font-serif text-2xl font-semibold text-navy">{c.metric}</div>
                <p className="mt-1 text-sm text-navy-soft">{c.note}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="container-page mt-6 flex items-center justify-between gap-4 md:hidden" aria-label="Work card navigation">
        <button type="button" onClick={() => setMobileCard((index) => (index - 1 + cases.length) % cases.length)} className="inline-flex min-h-11 items-center gap-2 rounded-full bg-primary/10 px-4 text-sm font-semibold text-primary-deep hover:bg-primary/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
          <ArrowRight className="h-4 w-4 rotate-180" aria-hidden="true" /> Previous
        </button>
        <span className="text-sm text-navy-soft" aria-live="polite" aria-atomic="true">{mobileCard + 1} / {cases.length}</span>
        <button type="button" onClick={() => setMobileCard((index) => (index + 1) % cases.length)} className="inline-flex min-h-11 items-center gap-2 rounded-full bg-primary/10 px-4 text-sm font-semibold text-primary-deep hover:bg-primary/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
          Next <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>

      {active && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`${active.title} case study`}
          className="fixed inset-0 z-[60] grid place-items-center p-4 md:p-8 bg-navy/70 backdrop-blur-sm animate-fade-up"
          onClick={() => setOpenIdx(null)}
        >
          <div
            className="relative bg-white text-navy rounded-3xl w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-[var(--shadow-elegant)]"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setOpenIdx(null)}
              aria-label="Close"
              className="absolute top-4 right-4 h-10 w-10 rounded-full grid place-items-center bg-surface hover:bg-primary/10 text-navy hover:text-primary-deep transition-colors z-10"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="p-8 md:p-10 border-b border-border">
              <div className="flex flex-wrap items-center gap-3">
                <span className="text-xs font-semibold uppercase tracking-widest text-primary-deep bg-primary/10 border border-primary/20 px-3 py-1 rounded-full">{active.industry}</span>
              </div>
              <h3 className="mt-4 font-serif text-3xl md:text-4xl font-semibold text-navy">{active.title}</h3>
              <p className="mt-3 text-navy-soft leading-relaxed max-w-2xl">{active.scope}</p>
            </div>

            <div className="p-8 md:p-10 border-b border-border">
              <div className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-4">Platform screenshots</div>
              <div className="flex gap-4 overflow-x-auto pb-2 -mx-2 px-2">
                {[1, 2, 3, 4].map((n) => (
                  <div
                    key={n}
                    className="shrink-0 w-72 h-44 rounded-2xl bg-gradient-to-br from-surface to-accent/40 border border-border grid place-items-center text-sm text-muted-foreground"
                  >
                    Platform screenshot {n}
                  </div>
                ))}
              </div>
            </div>

            <div className="p-8 md:p-10 border-b border-border">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {active.stats.map((s) => (
                  <div key={s.l} className="rounded-2xl border border-border bg-surface p-6">
                    <div className="font-serif text-3xl font-semibold text-primary-deep">{s.v}</div>
                    <div className="mt-1 text-sm text-navy-soft">{s.l}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-8 md:p-10 border-b border-border space-y-4">
              <div>
                <div className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">The challenge</div>
                <p className="mt-2 text-navy-soft leading-relaxed">
                  The brand needed a complete repositioning before any media spend made sense. We started with a communication audit - mapping the gap between how the team talked about the product and how customers actually described it. The findings pointed to a positioning mismatch that was quietly draining every campaign of efficiency.
                </p>
              </div>
              <div>
                <div className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">What we did</div>
                <p className="mt-2 text-navy-soft leading-relaxed">
                  We rebuilt the messaging architecture, refreshed the creative system, and set up a disciplined testing loop across the full funnel. Reporting was consolidated into a single weekly view, so decisions were made on evidence, not opinions. The team kept doing what they do best while the concierge handled everything else end to end.
                </p>
              </div>
            </div>

            <div className="p-8 md:p-10 flex flex-wrap items-center justify-between gap-4">
              <p className="text-sm text-muted-foreground">Want a plan like this for your business?</p>
              <button type="button" onClick={handleCta} className="btn-primary">
                Get a similar plan <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

/* ---------- Vision / Mission / Values ---------- */

function Values() {
  return (
    <section className="py-24">
      <div className="container-page">
        <div className="max-w-2xl">
          <span className="eyebrow">Why we exist</span>
          <h2 className="mt-4 font-serif text-4xl md:text-5xl font-semibold text-navy">Built on three commitments.</h2>
        </div>
        <div className="mt-14 grid md:grid-cols-3 gap-6">
          {values.map((v) => (
            <div key={v.title} className="p-8 rounded-3xl border border-border bg-card shadow-[var(--shadow-card)]">
              <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary-deep grid place-items-center">
                <v.icon className="w-6 h-6" />
              </div>
              <h3 className="mt-6 font-serif text-2xl font-semibold text-navy">{v.title}</h3>
              <p className="mt-3 text-navy-soft leading-relaxed">{v.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Testimonials ---------- */

function Testimonials() {
  return (
    <section className="py-24 bg-surface">
      <div className="container-page">
        <div className="max-w-2xl">
          <span className="eyebrow">In their words</span>
          <h2 className="mt-4 font-serif text-4xl md:text-5xl font-semibold text-navy">Founders who stopped Googling "marketing agency."</h2>
        </div>
        <div className="mt-14 grid md:grid-cols-2 gap-6">
          {testimonials.map((t) => (
            <figure key={t.name} className="card-elevated p-8">
              <Quote className="w-8 h-8 text-primary" />
              <blockquote className="mt-4 text-lg text-navy leading-relaxed">"{t.quote}"</blockquote>
              <figcaption className="mt-6 flex items-center gap-4">
                <div className="w-11 h-11 rounded-full bg-gradient-to-br from-primary to-primary-deep text-primary-foreground grid place-items-center font-semibold">{t.initials}</div>
                <div className="min-w-0">
                  <div className="font-semibold text-navy">{t.name}</div>
                  <div className="text-sm text-muted-foreground">{t.role}</div>
                </div>
                <div className="ml-auto flex text-primary">
                  {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Founder ---------- */

function Founder() {
  return (
    <section id="founder" className="py-24">
      <div className="container-page grid md:grid-cols-12 gap-12 items-center">
        <div className="md:col-span-5">
          <div className="relative rounded-3xl overflow-hidden border border-border shadow-[var(--shadow-elegant)]">
            <img src={founderImg} alt="Tejas Rokhade, Founder" loading="lazy" className="w-full h-auto object-cover" />
            <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-navy/90 to-transparent text-primary-foreground">
              <div className="text-xs uppercase tracking-widest opacity-80">Founder</div>
              <div className="font-serif text-2xl font-semibold">Tejas Rokhade</div>
            </div>
          </div>
        </div>
        <div className="md:col-span-7 text-justify">
          <span className="eyebrow"><Users className="w-3.5 h-3.5" /> Meet the founder</span>
          <h2 className="mt-4 font-serif text-4xl md:text-5xl font-semibold text-navy">Built by an operator who's been on your side of the table.</h2>
          <p className="mt-6 text-lg text-navy-soft leading-relaxed text-justify">
            After half a decade running growth for D2C brands, SaaS startups, and traditional MSMEs across India, Tejas kept hearing the same story: agencies were too generic, hiring was too slow, and modern tooling was too intimidating to figure out alone.
          </p>
          <p className="mt-4 text-lg text-navy-soft leading-relaxed text-justify">
            Perspective Media Labs is his answer - a concierge for founders who want the outcomes of a full marketing team without the overhead of one.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#contact" className="btn-primary text-sm">Talk to Tejas <ArrowRight className="w-4 h-4" /></a>
            <a href="https://wa.me/918668411092" target="_blank" rel="noreferrer" className="btn-ghost text-sm">WhatsApp <MessageCircle className="w-4 h-4" /></a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Contact ---------- */

function ContactSection() {
  const [sent, setSent] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    let frame: number;
    const resetForm = () => {
      formRef.current?.reset();
      setSent(false);
      frame = requestAnimationFrame(() => formRef.current?.reset());
    };
    resetForm();
    window.addEventListener("pageshow", resetForm);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pageshow", resetForm);
    };
  }, []);
  return (
    <section id="contact" className="py-24 bg-navy text-primary-foreground relative overflow-hidden">
      <div aria-hidden className="absolute inset-0 opacity-40" style={{ background: "radial-gradient(700px 400px at 100% 0%, oklch(0.66 0.11 210 / 0.5), transparent 60%)" }} />
      <div className="container-page relative grid md:grid-cols-12 gap-12">
        <div className="md:col-span-5 flex min-w-0 flex-col items-start">
          <span className="eyebrow"><Target className="w-3.5 h-3.5" /> Start the conversation</span>
          <h2 className="mt-4 font-serif text-4xl md:text-5xl font-semibold">Let's map your first 90 days.</h2>
          <p className="mt-4 text-white/70 text-lg">Free 30-minute audit. No pitch deck. Just a real look at what's working, what isn't, and what one concierge could unlock.</p>
          <ul className="mt-8 space-y-4 text-white/85">
            <li className="flex items-center gap-3"><Mail className="w-5 h-5 text-primary" /> connect@perspectivemedialabs.com</li>
            <li className="flex items-center gap-3"><Phone className="w-5 h-5 text-primary" /> +91 8668411092</li>
          </ul>
          <div className="relative mt-6 aspect-square w-full overflow-hidden rounded-2xl border border-white/15 bg-white/5 md:aspect-auto md:min-h-24 md:flex-1">
            <iframe
              title="Perspective Media Labs location on Google Maps"
              src="https://maps.google.com/maps?q=18.6441317,73.8501899&z=16&output=embed"
              className="absolute inset-0 block h-full w-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
        </div>
        <form
          ref={formRef}
          autoComplete="off"
          onSubmit={(e) => { e.preventDefault(); setSent(true); }}
          className="md:col-span-7 self-start bg-white/[0.04] backdrop-blur border border-white/10 rounded-3xl p-8 pb-6 space-y-5"
        >
          <div className="grid md:grid-cols-2 gap-5">
            <Field label="Your name" name="name" placeholder="Enter your full name" />
            <Field label="Work email" name="email" type="email" placeholder="Enter your work email" />
            <Field label="Company" name="company" placeholder="Enter your company name" />
            <Field label="Phone" name="phone" placeholder="Enter your phone number" />
          </div>
          <div>
            <label className="text-xs font-semibold uppercase tracking-widest text-white/70">What do you need help with?</label>
            <textarea
              name="message"
              autoComplete="off"
              rows={4}
              placeholder="Tell us how we can help your business"
              className="mt-2 w-full bg-white/5 border border-white/15 rounded-xl px-4 py-3 text-primary-foreground placeholder:text-white/40 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/30"
            />
          </div>
          <label className="flex items-start gap-3 px-4 text-sm leading-relaxed text-white/80 cursor-pointer">
            <input
              type="checkbox"
              name="termsAccepted"
              required
              className="mt-1 h-4 w-4 shrink-0 accent-primary cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-navy"
            />
            <span>By submitting this form, I agree to the Terms and Conditions and consent to being contacted by Perspective Media Labs regarding my enquiry.</span>
          </label>
          <button type="submit" className="btn-primary w-full sm:w-auto">
            {sent ? "Thanks - we'll be in touch" : (<>Request my free audit <ArrowRight className="w-4 h-4" /></>)}
          </button>
        </form>
      </div>
    </section>
  );
}

function Field({ label, name, type = "text", placeholder }: { label: string; name: string; type?: string; placeholder?: string }) {
  return (
    <div>
      <label htmlFor={name} className="text-xs font-semibold uppercase tracking-widest text-white/70">{label}</label>
      <input
        id={name}
        name={name}
        type={type}
        autoComplete="off"
        placeholder={placeholder}
        className="mt-2 w-full bg-white/5 border border-white/15 rounded-xl px-4 py-3 text-primary-foreground placeholder:text-white/40 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/30"
      />
    </div>
  );
}

/* ---------- Footer ---------- */

function Footer() {
  return (
    <footer className="py-3 bg-background">
      <div className="hidden">
        <div>
          <div className="flex items-center gap-3">
            <img src="/pml-logo-mark.svg" alt="Perspective Media Labs" className="h-11 w-auto" />
            <div>
              <div className="font-semibold text-navy">Perspective Media Labs</div>
            </div>
          </div>
          <p className="mt-4 text-sm text-navy-soft max-w-sm">Marketing that feels like it's yours - strategy-led, run by a senior operator, built for Indian MSMEs.</p>
        </div>
        <div>
          <div className="text-xs uppercase tracking-widest text-muted-foreground">Explore</div>
          <ul className="mt-3 space-y-2 text-sm text-navy">
            <li><a className="hover:text-primary-deep" href="#services">Services</a></li>
            <li><a className="hover:text-primary-deep" href="#work">Work</a></li>
            <li><a className="hover:text-primary-deep" href="#approach">Approach</a></li>
            <li><a className="hover:text-primary-deep" href="#founder">Founder</a></li>
          </ul>
        </div>
        <div>
          <div className="text-xs uppercase tracking-widest text-muted-foreground">Get in touch</div>
          <ul className="mt-3 space-y-2 text-sm text-navy">
            <li>connect@perspectivemedialabs.com</li>
            <li>+91 8668411092</li>
          </ul>
        </div>
      </div>
      <div className="container-page mt-0 pt-3 border-t border-border flex flex-wrap justify-center text-center gap-3 text-xs text-muted-foreground">
        <span>© {new Date().getFullYear()} Perspective Media Labs. All rights reserved.</span>
        <span>Made with perspective, not templates.</span>
      </div>
    </footer>
  );
}

/* ---------- WhatsApp widget ---------- */

function WhatsAppWidget() {
  return (
    <a
      href="https://wa.me/918668411092"
      target="_blank"
      rel="noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full grid place-items-center text-white shadow-[var(--shadow-elegant)] hover:scale-110 transition-transform"
      style={{ background: "linear-gradient(135deg, #22c35e, #128c4a)" }}
    >
      <svg viewBox="0 0 24 24" aria-hidden="true" className="w-7 h-7 fill-current">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.372-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.372-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982 1-3.648-.235-.374a9.86 9.86 0 0 1-1.511-5.26c.001-5.45 4.436-9.884 9.889-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.002 5.45-4.437 9.884-9.887 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 0.16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.479-8.413" />
      </svg>
    </a>
  );
}
