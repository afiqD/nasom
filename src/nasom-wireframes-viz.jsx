import { useState } from "react";

// ─── COLOUR TOKENS ──────────────────────────────────────────────────────────
const C = {
  bg: "#060b14", card: "#0c1624", border: "#1a2e48",
  text: "#e2e8f0", muted: "#64748b", dim: "#334155",
  navy: "#1A3A5C", navyDk: "#0F2540",
  blue: "#1E6FA8", blueLt: "#D6EAF8",
  teal: "#117A65", tealLt: "#D1F2EB",
  amber: "#A04000", amberLt: "#FDEBD0",
  red: "#922B21", redLt: "#FADBD8",
  green: "#1E6F45", greenLt: "#D5F5E3",
  purple: "#6B2D8B", purpleLt: "#EFE0F8",
  // wireframe zone palette
  wfHeader: "#1A3A5C",  wfHeaderTxt: "#fff",
  wfNav:    "#2D5F8A",  wfNavTxt:    "#fff",
  wfHero:   "#3A7BD5",  wfHeroTxt:   "#fff",
  wfCta:    "#117A65",  wfCtaTxt:    "#fff",
  wfCard:   "#C8D0D8",  wfCardTxt:   "#2C3E50",
  wfContent:"#D0DCE8",  wfContentTxt:"#2C3E50",
  wfAside:  "#E8ECF0",  wfAsideTxt:  "#2C3E50",
  wfAccent: "#D6EAF8",  wfAccentTxt: "#1A3A5C",
  wfForm:   "#FDEBD0",  wfFormTxt:   "#2C3E50",
  wfFooter: "#6B7A8A",  wfFooterTxt: "#fff",
  wfHighlt: "#D1F2EB",  wfHighltTxt: "#117A65",
};

const priColor = (p) => p === "P0" ? C.red : p === "P1" ? C.blue : C.teal;

// ─── WIREFRAME DATA ──────────────────────────────────────────────────────────
const PAGES = [
  {
    id: "WF-01", name: "Homepage", template: "front-page.php",
    personas: ["P01","P02","P05"], priority: "P0",
    desc: "Primary conversion hub — routes each segment to their highest-intent next step within 5 seconds.",
    zones: [
      { id: "z1", label: "GLOBAL HEADER", type: "header", height: 52, cols: 1,
        annotation: { title: "Global Header", lines: ["Logo left · Primary nav centre · Donate CTA right","height: 72px fixed · sticky on scroll · z-index 100","DONATE: filled teal button · always visible · 44px min height"] } },
      { id: "z2", label: "PRIMARY NAVIGATION", type: "nav", height: 44, cols: 1,
        annotation: { title: "Nav Bar", lines: ["Programmes → Mega-menu (7 children, 3 audience groups)","Centres, Events → dropdown · Others → direct link","Active state: 3px blue underline"] } },
      { id: "z3", label: "HERO — Newly Diagnosed Pathway", type: "hero", height: 120, cols: 1, highlight: true,
        annotation: { title: "Hero Zone (P0 Critical)", lines: ["Headline: 'Your child just received a diagnosis. We are here.'","2 CTAs: [Find a Programme]  [Find a Centre Near You]","Full-width · min-height 480px · navy gradient + image overlay","Mobile: stacked CTAs · reduced headline size"] } },
      { id: "z4", label: "STATS BAR — Years · Children · Centres · Programmes", type: "cta", height: 48, cols: 1,
        annotation: { title: "Stats Bar (Trust Signal)", lines: ["4 animated counters · teal bg · white text","Target: P02 David — credibility before donating"] } },
      { id: "z5", label: null, type: "card", height: 96, cols: 3, labels: ["Programme Card 1","Programme Card 2","Programme Card 3"],
        annotation: { title: "Programme Teaser (3 cards)", lines: ["CPT query: 3 active programmes · is_active=true","Each: type badge, title, audience tag, excerpt, [Learn More]","CTA below: [See All Programmes →]","Hover: card lifts with box-shadow"] } },
      { id: "z6", label: "CENTRES MAP WIDGET", type: "hero", height: 110, cols: 1,
        annotation: { title: "Centre Finder Widget (P0)", lines: ["Google Maps embed · 3 centre pins · click → info window","Below map: 3 centre mini-cards · name, state, phone, [View Centre]","Mobile: map collapses to list · Target: P01 Farah"] } },
      { id: "z7", label: null, type: "card", height: 80, cols: 3, labels: ["News Card 1","News Card 2","Events Feed"],
        annotation: { title: "News + Events Feed", lines: ["Left: 3 latest posts · category badge, date, title","Right: 2 upcoming tribe_events","Section CTAs: [All News] [All Events]"] } },
      { id: "z8", label: "DONATE CTA STRIP", type: "cta", height: 60, cols: 1, highlight: true,
        annotation: { title: "Donation CTA Strip (P0)", lines: ["'Every gift supports a Malaysian child with autism.'","[Donate Now]  [Fundraise for NASOM]","Navy bg · full-width · above fold on tablet"] } },
      { id: "z9", label: "GLOBAL FOOTER", type: "footer", height: 80, cols: 1,
        annotation: { title: "Global Footer", lines: ["4 cols: About | Programmes | Get Involved | Contact","Row 2: Social · Charity reg · Privacy · Terms","Dark navy · white text"] } },
    ]
  },
  {
    id: "WF-02", name: "Programmes Archive", template: "archive-programme.php",
    personas: ["P01","P06"], priority: "P0",
    desc: "CPT archive — Farah filters by child's age/audience to find the right programme within 2 clicks.",
    zones: [
      { id: "z1", label: "GLOBAL HEADER + NAV", type: "header", height: 52, cols: 1,
        annotation: { title: "Header", lines: ["Same as WF-01 · Active: 'Our Programmes' underlined"] } },
      { id: "z2", label: "PAGE HERO — Our Programmes", type: "nav", height: 56, cols: 1,
        annotation: { title: "Short Page Hero", lines: ["H1: 'Our Programmes' · Breadcrumb: Home > Our Programmes","1-line intro: evidence-based programmes","Height: 160px · no CTA — filter bar does the work"] } },
      { id: "z3", label: "FILTER BAR — Programme Type | Audience | Age | Centre", type: "accent", height: 48, cols: 1, highlight: true,
        annotation: { title: "FacetWP Filter Bar (P0 Critical)", lines: ["Chips: Programme Type · Audience Group · Age Range · Centre","Live count: 'Showing 5 of 7 programmes'","Sticky below header on scroll · Mobile: [Filter] → bottom sheet"] } },
      { id: "z4", label: null, type: "card", height: 100, cols: 3, labels: ["Programme Card","Programme Card","Programme Card"],
        annotation: { title: "Programme Cards Grid", lines: ["type badge (colour-coded) · title H3 · audience tag","age range pill · 2-line excerpt · centre badge · [Learn More]","3-col desktop · 2-col tablet · 1-col mobile","Empty state: [Clear Filters] link"] } },
      { id: "z5", label: null, type: "card", height: 100, cols: 3, labels: ["Programme Card","Programme Card","Programme Card"],
        annotation: { title: "(continued)", lines: ["FacetWP handles live reload · no page refresh","Hover: card border highlights blue"] } },
      { id: "z6", label: "PAGINATION  ←  1  2  3  →", type: "content", height: 44, cols: 1,
        annotation: { title: "Pagination + Results Count", lines: ["Prev / Page numbers / Next","'Showing 1–6 of 7 programmes'"] } },
      { id: "z7", label: "GLOBAL FOOTER", type: "footer", height: 60, cols: 1,
        annotation: { title: "Footer", lines: ["Same as WF-01"] } },
    ]
  },
  {
    id: "WF-03", name: "Programme Single", template: "single-programme.php",
    personas: ["P01","P06"], priority: "P0",
    desc: "Individual programme detail — Farah gets everything to decide and apply without phoning.",
    zones: [
      { id: "z1", label: "GLOBAL HEADER + NAV", type: "header", height: 52, cols: 1,
        annotation: { title: "Header", lines: ["Active nav: Our Programmes"] } },
      { id: "z2", label: "BREADCRUMB · [Programme Name] · type badge · audience · age range", type: "hero", height: 64, cols: 1,
        annotation: { title: "Hero + Breadcrumb", lines: ["H1: programme name · type badge · audience tag · age pill","Breadcrumb: Home > Programmes > [Name]","Height: 200px · blue gradient"] } },
      // 2-col layout represented as cols
      { id: "z3", label: "ABOUT THIS PROGRAMME  (main col — 65%)", type: "content", height: 80, cols: 1,
        annotation: { title: "About Block (Main Col)", lines: ["ACF: description rich text","Rendered with wp_kses_post()","65% width desktop · full width mobile"] } },
      { id: "z4", label: "ELIGIBILITY CRITERIA  ✓ age range  ✓ diagnosis", type: "highlight", height: 72, cols: 1,
        annotation: { title: "Eligibility Block (P0 Critical)", lines: ["ACF: eligibility rich text · teal background","Must be above fold on desktop","P01 Farah's primary decision-making block"] } },
      { id: "z5", label: "HOW TO APPLY — step-by-step process", type: "accent", height: 72, cols: 1,
        annotation: { title: "How to Apply Block", lines: ["ACF: how_to_apply rich text","Anchor link → enquiry form below: #programme-enquiry-form","[Enquire About This Programme →] inline CTA"] } },
      { id: "z6", label: "AT A GLANCE SIDEBAR  |  Type · Audience · Age · Centres  (35%)", type: "aside", height: 80, cols: 1,
        annotation: { title: "Sidebar (sticky desktop)", lines: ["ACF: programme_type, audience_group, age_from, age_to","centre_ref: CPT relationship → list centre names","[Enquire] teal CTA button · anchor to form","Centre ref card: name, address, phone, [View Centre]"] } },
      { id: "z7", label: "PROGRAMME ENQUIRY FORM  (WPForms)", type: "form", height: 90, cols: 1, highlight: true,
        annotation: { title: "Enquiry Form (P0 Critical)", lines: ["Fields: child name, age, diagnosis, parent, phone, email, centre, message","WPForms embed · id='programme-enquiry-form'","On submit: email to centre@nasom.org.my · confirmation page"] } },
      { id: "z8", label: "RELATED PROGRAMMES", type: "card", height: 72, cols: 3, labels: ["Related 1","Related 2","Related 3"],
        annotation: { title: "Related Programmes", lines: ["WP_Query: same programme_type · exclude current · limit 3","Heading: 'You Might Also Be Interested In'"] } },
      { id: "z9", label: "GLOBAL FOOTER", type: "footer", height: 56, cols: 1,
        annotation: { title: "Footer", lines: ["Same as WF-01"] } },
    ]
  },
  {
    id: "WF-04", name: "Donate Page", template: "page-donate.php",
    personas: ["P02","P05"], priority: "P0",
    desc: "Primary revenue conversion — convert David (diaspora, desktop, intl. payment) with maximum trust signals.",
    zones: [
      { id: "z1", label: "MINIMAL HEADER — Logo + Nav only (no Donate CTA on this page)", type: "header", height: 48, cols: 1,
        annotation: { title: "Minimal Header", lines: ["Logo + nav only · Donate CTA hidden on this page","Standard donation UX: reduce exit paths"] } },
      { id: "z2", label: "DONATE HERO — Charity reg. number · Years since founding", type: "hero", height: 60, cols: 1,
        annotation: { title: "Donate Hero (Trust First)", lines: ["'Your gift changes a Malaysian child's life.'","Charity reg no. visible · years since founding","Navy + photograph · height 200px"] } },
      { id: "z3", label: "ONE-TIME  /  MONTHLY toggle      RM 30  ·  RM 60  ·  RM 120  ·  RM 300  ·  [Custom]", type: "accent", height: 80, cols: 1, highlight: true,
        annotation: { title: "Donation Amount Selector (P0)", lines: ["One-time / Monthly tab toggle · Monthly pre-selected","Preset: RM 30, 60, 120, 300 + custom input","International note: 'From overseas? Use card or PayPal.'","WPForms + iPay88 / Stripe · MYR default"] } },
      { id: "z4", label: "IMPACT BAR — 'RM 60/month = 1 month of speech therapy'", type: "cta", height: 44, cols: 1,
        annotation: { title: "Impact Equivalency Bar", lines: ["Dynamic: updates based on selected amount","Teal bg · white text · JS calculation","ACF: impact_rate field on Donate page"] } },
      { id: "z5", label: "DONOR DETAILS FORM  — Name · Email · Country · Payment Method", type: "form", height: 90, cols: 1,
        annotation: { title: "Donor Details Form", lines: ["Fields: full name, email, phone, country, payment method","WPForms + iPay88 or Stripe redirect","Return URL: /thank-you/ · Privacy statement below"] } },
      { id: "z6", label: null, type: "card", height: 64, cols: 3, labels: ["Children Supported","Years of Impact","Active Programmes"],
        annotation: { title: "Impact Stats (P02 Social Proof)", lines: ["3 ACF number fields on Donate page","Updated annually · animated count-up","P02 David: reads before completing payment"] } },
      { id: "z7", label: "FAMILY TESTIMONIAL — photo · name · programme attended", type: "content", height: 80, cols: 1,
        annotation: { title: "Testimonial Block", lines: ["ACF: testimonial_quote, testimonial_name, testimonial_image","First name + programme only — privacy best practice","P02 David: reads everything before donating"] } },
      { id: "z8", label: null, type: "card", height: 60, cols: 3, labels: ["Fundraise for NASOM","Corporate Partnership","Legacy Giving"],
        annotation: { title: "Alternative Giving Options", lines: ["3 card links to sibling pages","Links: /get-involved/fundraise · /get-involved/corporate · /about/legacy"] } },
      { id: "z9", label: "GLOBAL FOOTER", type: "footer", height: 56, cols: 1,
        annotation: { title: "Footer", lines: ["Same as WF-01"] } },
    ]
  },
  {
    id: "WF-05", name: "Centres Archive + Map", template: "archive-centre.php",
    personas: ["P01"], priority: "P0",
    desc: "Centre discovery — Farah finds nearest centre and its programmes in under 30 seconds.",
    zones: [
      { id: "z1", label: "GLOBAL HEADER + NAV", type: "header", height: 52, cols: 1,
        annotation: { title: "Header", lines: ["Active nav: Our Centres"] } },
      { id: "z2", label: "PAGE HERO — Find a NASOM Centre Near You", type: "nav", height: 52, cols: 1,
        annotation: { title: "Short Page Hero", lines: ["H1: 'Find a NASOM Centre Near You'","Height: 140px · Breadcrumb: Home > Our Centres"] } },
      { id: "z3", label: "STATE FILTER — All  |  Selangor  |  KL  |  ...", type: "accent", height: 44, cols: 1,
        annotation: { title: "State Filter (FacetWP)", lines: ["Radio facet on state taxonomy","Updates map pins + card grid live"] } },
      { id: "z4", label: "GOOGLE MAPS — Centre pin markers (click → info window)", type: "hero", height: 140, cols: 1, highlight: true,
        annotation: { title: "Google Maps Embed (P0 Critical)", lines: ["Google Maps JS API · ACF: lat, lng per centre","Click pin → InfoWindow: name, address, phone, [View Centre]","Height: 340px · Mobile: 240px","Fallback: static map if JS disabled"] } },
      { id: "z5", label: null, type: "card", height: 96, cols: 3, labels: ["Centre Card 1","Centre Card 2","Centre Card 3"],
        annotation: { title: "Centre Cards", lines: ["name H3 · state badge · address · phone · email","programmes list from centre_ref relationship","[View Centre →] link · 3-col desktop · 1-col mobile","Syncs with map state filter"] } },
      { id: "z6", label: "GLOBAL FOOTER", type: "footer", height: 56, cols: 1,
        annotation: { title: "Footer", lines: ["Same as WF-01"] } },
    ]
  },
  {
    id: "WF-06", name: "Careers Archive", template: "archive-career.php",
    personas: ["P03"], priority: "P1",
    desc: "Dynamic job listings — Nurul finds active roles matching her specialism and applies directly.",
    zones: [
      { id: "z1", label: "GLOBAL HEADER + NAV", type: "header", height: 52, cols: 1,
        annotation: { title: "Header", lines: ["Active: Careers (footer nav desktop · visible mobile)"] } },
      { id: "z2", label: "HERO — Build Your Career in Autism Support", type: "hero", height: 64, cols: 1,
        annotation: { title: "Careers Hero", lines: ["'We are looking for therapists, educators, and support staff.'","Culture teaser: team photo block or video embed"] } },
      { id: "z3", label: "JOB TYPE FILTER — All | SLT | OT | ABA | Teaching | Support   (X active positions)", type: "accent", height: 48, cols: 1,
        annotation: { title: "Job Type Filter (FacetWP)", lines: ["Facet on job_type taxonomy","meta_query: is_active=1 always applied via pre_get_posts","Live results count"] } },
      { id: "z4", label: null, type: "card", height: 100, cols: 2, labels: ["Job Card — SLT | Subang Centre  Closing: 30 Apr","Job Card — OT | KL Centre  Closing: 15 May"],
        annotation: { title: "Job Listing Cards", lines: ["type badge (colour by specialism) · department · centre name","closing date: red text if within 7 days","[View & Apply →] · is_active=1 only"] } },
      { id: "z5", label: "EMPTY STATE — 'No positions open. Register interest below.'  +  WPForms", type: "form", height: 60, cols: 1,
        annotation: { title: "Empty State (if no listings)", lines: ["Conditional: shown when 0 active jobs","WPForms: name, email, specialism → HR email","P03 Nurul must not hit a dead end"] } },
      { id: "z6", label: null, type: "card", height: 72, cols: 3, labels: ["Professional Development","Team Environment","Mission-Driven Work"],
        annotation: { title: "Culture + Benefits Block", lines: ["3 benefit cards + employee testimonial quote","ACF fields on Careers page (no CPT needed)","P03 Nurul checks culture before applying"] } },
      { id: "z7", label: "GLOBAL FOOTER", type: "footer", height: 56, cols: 1,
        annotation: { title: "Footer", lines: ["Same as WF-01"] } },
    ]
  },
];

const ZONE_STYLES = {
  header:  { bg: C.wfHeader,  txt: C.wfHeaderTxt  },
  nav:     { bg: C.wfNav,     txt: C.wfNavTxt     },
  hero:    { bg: C.wfHero,    txt: C.wfHeroTxt    },
  cta:     { bg: C.wfCta,     txt: C.wfCtaTxt     },
  card:    { bg: C.wfCard,    txt: C.wfCardTxt    },
  content: { bg: C.wfContent, txt: C.wfContentTxt },
  aside:   { bg: C.wfAside,   txt: C.wfAsideTxt   },
  accent:  { bg: C.wfAccent,  txt: C.wfAccentTxt  },
  form:    { bg: C.wfForm,    txt: C.wfFormTxt    },
  footer:  { bg: C.wfFooter,  txt: C.wfFooterTxt  },
  highlight:{ bg: C.wfHighlt, txt: C.wfHighltTxt  },
};

const LEGEND = [
  { type: "header",  label: "Header / Nav" },
  { type: "hero",    label: "Hero / Feature" },
  { type: "cta",     label: "CTA / Action" },
  { type: "card",    label: "Card / Grid" },
  { type: "content", label: "Content Zone" },
  { type: "accent",  label: "Filter / Accent" },
  { type: "form",    label: "Form Zone" },
  { type: "highlight",label:"Eligibility / Key" },
  { type: "footer",  label: "Footer" },
];

const TABS = ["Wireframe Preview", "All Pages", "Component Guide"];

// ─── ZONE RENDERER ────────────────────────────────────────────────────────────
function ZoneBlock({ zone, onClick, isHighlighted }) {
  const s = ZONE_STYLES[zone.type] || ZONE_STYLES.content;
  const showGrid = zone.cols > 1;

  if (showGrid) {
    return (
      <div style={{ display: "flex", gap: "3px", marginBottom: "3px" }}>
        {(zone.labels || Array(zone.cols).fill("")).map((lbl, ci) => (
          <div key={ci}
            onClick={() => onClick(zone)}
            style={{
              flex: 1, height: zone.height + "px",
              background: s.bg, border: isHighlighted ? "2px solid #f59e0b" : "1px solid rgba(255,255,255,0.15)",
              borderRadius: "3px", display: "flex", alignItems: "center", justifyContent: "center",
              cursor: "pointer", transition: "opacity 0.15s",
              fontSize: "10px", fontWeight: 600, color: s.txt, textAlign: "center", padding: "4px",
              lineHeight: 1.3
            }}>
            {lbl}
          </div>
        ))}
      </div>
    );
  }

  return (
    <div onClick={() => onClick(zone)}
      style={{
        width: "100%", height: zone.height + "px", marginBottom: "3px",
        background: s.bg, border: isHighlighted ? "2px solid #f59e0b" : "1px solid rgba(255,255,255,0.12)",
        borderRadius: "3px", display: "flex", alignItems: "center", justifyContent: "center",
        cursor: "pointer", transition: "opacity 0.15s",
        fontSize: "11px", fontWeight: 600, color: s.txt, textAlign: "center",
        padding: "4px 8px", lineHeight: 1.3
      }}>
      {zone.label}
    </div>
  );
}

export default function WireframeDashboard() {
  const [tab, setTab] = useState(0);
  const [selectedPageId, setSelectedPageId] = useState("WF-01");
  const [activeZone, setActiveZone] = useState(null);
  const [showGrid, setShowGrid] = useState(false);
  const [gridOpacity, setGridOpacity] = useState(0.12);

  const selectedPage = PAGES.find(p => p.id === selectedPageId);

  const handleZoneClick = (zone) => {
    setActiveZone(activeZone && activeZone.id === zone.id ? null : zone);
  };

  return (
    <div style={{ background: C.bg, minHeight: "100vh", fontFamily: "system-ui,sans-serif", color: C.text, padding: "20px" }}>

      {/* Header */}
      <div style={{ marginBottom: "20px" }}>
        <div style={{ fontSize: "10px", color: C.muted, letterSpacing: "2px", textTransform: "uppercase", marginBottom: "5px" }}>NASOM.ORG.MY — WIREFRAME PREVIEW</div>
        <div style={{ display: "flex", alignItems: "center", gap: "16px", flexWrap: "wrap" }}>
          <h1 style={{ margin: 0, fontSize: "20px", fontWeight: 700 }}>Interactive Wireframe Spec</h1>
          <span style={{ fontSize: "12px", color: C.muted }}>6 pages · click any zone to see annotations</span>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", gap: "4px", marginBottom: "20px", borderBottom: "1px solid " + C.border }}>
        {["Wireframe Preview","All Pages","Component Guide"].map((t, i) => (
          <button key={t} onClick={() => setTab(i)} style={{
            background: tab === i ? C.blue : "transparent", color: tab === i ? "#fff" : C.muted,
            border: "none", borderRadius: "6px 6px 0 0", padding: "8px 18px",
            cursor: "pointer", fontSize: "13px", fontWeight: tab === i ? 700 : 400,
          }}>{t}</button>
        ))}
      </div>

      {/* TAB 0: WIREFRAME PREVIEW */}
      {tab === 0 && (
        <div style={{ display: "flex", gap: "16px" }}>

          {/* Left: page selector + controls */}
          <div style={{ width: "180px", flexShrink: 0 }}>
            <div style={{ fontSize: "11px", color: C.muted, textTransform: "uppercase", marginBottom: "8px", letterSpacing: "1px" }}>Pages</div>
            {PAGES.map(p => (
              <div key={p.id} onClick={() => { setSelectedPageId(p.id); setActiveZone(null); }}
                style={{
                  background: selectedPageId === p.id ? C.blue + "22" : C.card,
                  border: "1px solid " + (selectedPageId === p.id ? C.blue : C.border),
                  borderRadius: "7px", padding: "9px 12px", marginBottom: "6px", cursor: "pointer"
                }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "3px" }}>
                  <span style={{ fontSize: "10px", fontFamily: "monospace", color: C.muted }}>{p.id}</span>
                  <span style={{ fontSize: "10px", fontWeight: 700, color: priColor(p.priority) }}>{p.priority}</span>
                </div>
                <div style={{ fontSize: "12px", fontWeight: 600, color: C.text, lineHeight: 1.3 }}>{p.name}</div>
              </div>
            ))}

            {/* Legend */}
            <div style={{ marginTop: "16px" }}>
              <div style={{ fontSize: "11px", color: C.muted, textTransform: "uppercase", marginBottom: "8px", letterSpacing: "1px" }}>Zone Key</div>
              {LEGEND.map(l => {
                const s = ZONE_STYLES[l.type];
                return (
                  <div key={l.type} style={{ display: "flex", alignItems: "center", gap: "7px", marginBottom: "5px" }}>
                    <div style={{ width: "14px", height: "14px", borderRadius: "2px", background: s.bg, border: "1px solid rgba(255,255,255,0.15)", flexShrink: 0 }}></div>
                    <span style={{ fontSize: "11px", color: C.muted }}>{l.label}</span>
                  </div>
                );
              })}
            </div>

            {/* Grid overlay toggle */}
            <div style={{ marginTop: "16px", background: C.card, border: "1px solid " + C.border, borderRadius: "7px", padding: "10px 12px" }}>
              <div style={{ fontSize: "11px", color: C.muted, textTransform: "uppercase", marginBottom: "8px", letterSpacing: "1px" }}>Grid Overlay</div>
              <button onClick={() => setShowGrid(!showGrid)} style={{
                background: showGrid ? C.teal : C.border, color: "#fff",
                border: "none", borderRadius: "5px", padding: "5px 10px", cursor: "pointer", fontSize: "12px", width: "100%",
              }}>{showGrid ? "Grid On" : "Grid Off"}</button>
            </div>
          </div>

          {/* Centre: wireframe canvas */}
          <div style={{ flex: 1 }}>
            {selectedPage && (
              <div>
                {/* Page title bar */}
                <div style={{ background: C.navyDk, borderRadius: "8px", padding: "12px 18px", marginBottom: "12px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                    <div>
                      <div style={{ fontSize: "10px", fontFamily: "monospace", color: "#7090b0", marginBottom: "4px" }}>
                        {selectedPage.id} · {selectedPage.template} · Personas: {selectedPage.personas.join(", ")}
                      </div>
                      <div style={{ fontSize: "16px", fontWeight: 700, color: "#fff" }}>{selectedPage.name}</div>
                      <div style={{ fontSize: "12px", color: "#8aaac8", marginTop: "4px", lineHeight: 1.4 }}>{selectedPage.desc}</div>
                    </div>
                    <span style={{ background: priColor(selectedPage.priority) + "33", color: priColor(selectedPage.priority), borderRadius: "5px", padding: "3px 10px", fontSize: "12px", fontWeight: 700, flexShrink: 0, marginLeft: "12px" }}>{selectedPage.priority}</span>
                  </div>
                </div>

                {/* Canvas */}
                <div style={{ position: "relative", background: "#0a1420", border: "1px solid " + C.border, borderRadius: "8px", padding: "12px" }}>
                  {/* Grid overlay */}
                  {showGrid && (
                    <div style={{
                      position: "absolute", top: 0, left: 0, right: 0, bottom: 0,
                      pointerEvents: "none", zIndex: 10, borderRadius: "8px", overflow: "hidden",
                    }}>
                      {Array.from({ length: 12 }).map((_, i) => (
                        <div key={i} style={{
                          position: "absolute", top: 0, bottom: 0,
                          left: (i / 12 * 100) + "%", width: (1 / 12 * 100) + "%",
                          borderLeft: "1px solid rgba(99,179,237," + gridOpacity + ")",
                          borderRight: i === 11 ? "1px solid rgba(99,179,237," + gridOpacity + ")" : "none",
                        }}></div>
                      ))}
                    </div>
                  )}

                  {/* Zones */}
                  {selectedPage.zones.map(zone => (
                    <ZoneBlock
                      key={zone.id} zone={zone}
                      onClick={handleZoneClick}
                      isHighlighted={activeZone && activeZone.id === zone.id}
                    />
                  ))}
                </div>

                {/* Instruction hint */}
                {!activeZone && (
                  <div style={{ textAlign: "center", color: C.muted, fontSize: "12px", marginTop: "10px" }}>
                    Click any zone to see annotations
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Right: annotation panel */}
          <div style={{ width: "260px", flexShrink: 0 }}>
            <div style={{ fontSize: "11px", color: C.muted, textTransform: "uppercase", marginBottom: "8px", letterSpacing: "1px" }}>Annotation</div>
            {activeZone ? (
              <div style={{ background: C.card, border: "1px solid " + C.border, borderRadius: "8px", padding: "14px" }}>
                <div style={{ fontSize: "13px", fontWeight: 700, color: C.text, marginBottom: "10px", paddingBottom: "8px", borderBottom: "1px solid " + C.border }}>
                  {activeZone.annotation.title}
                </div>
                {activeZone.annotation.lines.map((line, i) => {
                  const isCode = line.startsWith("`") && line.endsWith("`");
                  const text = isCode ? line.slice(1, -1) : line;
                  return (
                    <div key={i} style={{ marginBottom: "6px" }}>
                      {isCode ? (
                        <code style={{ fontSize: "11px", color: C.teal, background: C.navyDk, borderRadius: "3px", padding: "2px 6px", display: "block", lineHeight: 1.6 }}>{text}</code>
                      ) : (
                        <div style={{ fontSize: "12px", color: C.text, lineHeight: 1.55 }}>— {line}</div>
                      )}
                    </div>
                  );
                })}
                {/* Zone type badge */}
                <div style={{ marginTop: "12px", paddingTop: "10px", borderTop: "1px solid " + C.border }}>
                  <span style={{ fontSize: "10px", color: C.muted }}>Zone type: </span>
                  <span style={{ fontSize: "11px", fontFamily: "monospace",
                    background: (ZONE_STYLES[activeZone.type]||ZONE_STYLES.content).bg,
                    color: (ZONE_STYLES[activeZone.type]||ZONE_STYLES.content).txt,
                    borderRadius: "3px", padding: "1px 7px" }}>{activeZone.type}</span>
                </div>
              </div>
            ) : (
              <div style={{ background: C.card, border: "1px dashed " + C.dim, borderRadius: "8px", padding: "28px 14px", textAlign: "center", color: C.muted, fontSize: "12px" }}>
                Select a zone to see its layout annotation
              </div>
            )}

            {/* Highlight indicator */}
            {activeZone && activeZone.highlight && (
              <div style={{ marginTop: "10px", background: C.amberLt + "22", border: "1px solid " + C.amber + "44", borderRadius: "6px", padding: "10px 12px" }}>
                <span style={{ fontSize: "11px", fontWeight: 700, color: C.amber }}>P0 CRITICAL ZONE</span>
                <div style={{ fontSize: "11px", color: C.text, marginTop: "4px" }}>This zone is highlighted because it is essential for the primary persona's conversion.</div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 1: ALL PAGES GRID */}
      {tab === 1 && (
        <div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "16px" }}>
            {PAGES.map(page => (
              <div key={page.id}
                onClick={() => { setSelectedPageId(page.id); setActiveZone(null); setTab(0); }}
                style={{ background: C.card, border: "1px solid " + C.border, borderRadius: "10px", overflow: "hidden", cursor: "pointer" }}>
                {/* Mini title */}
                <div style={{ background: C.navyDk, padding: "10px 14px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontSize: "10px", fontFamily: "monospace", color: "#7090b0" }}>{page.id}</span>
                    <span style={{ fontSize: "10px", fontWeight: 700, color: priColor(page.priority) }}>{page.priority}</span>
                  </div>
                  <div style={{ fontSize: "13px", fontWeight: 700, color: "#fff", marginTop: "2px" }}>{page.name}</div>
                  <div style={{ fontSize: "10px", fontFamily: "monospace", color: C.muted, marginTop: "2px" }}>{page.template}</div>
                </div>
                {/* Mini wireframe */}
                <div style={{ padding: "8px", background: "#0a1420" }}>
                  {page.zones.slice(0, 7).map(zone => {
                    const s = ZONE_STYLES[zone.type] || ZONE_STYLES.content;
                    const mini_h = Math.max(10, Math.round(zone.height * 0.22));
                    if (zone.cols > 1) {
                      return (
                        <div key={zone.id} style={{ display: "flex", gap: "2px", marginBottom: "2px" }}>
                          {Array(zone.cols).fill(0).map((_, ci) => (
                            <div key={ci} style={{ flex: 1, height: mini_h + "px", background: s.bg, borderRadius: "2px", border: "1px solid rgba(255,255,255,0.1)" }}></div>
                          ))}
                        </div>
                      );
                    }
                    return <div key={zone.id} style={{ height: mini_h + "px", background: s.bg, borderRadius: "2px", border: "1px solid rgba(255,255,255,0.1)", marginBottom: "2px" }}></div>;
                  })}
                </div>
                <div style={{ padding: "8px 14px 10px", fontSize: "11px", color: C.muted }}>
                  Personas: {page.personas.join(", ")} · {page.zones.length} zones
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: COMPONENT GUIDE */}
      {tab === 2 && (
        <div>
          {/* Button system */}
          <div style={{ marginBottom: "24px" }}>
            <h2 style={{ fontSize: "16px", fontWeight: 700, color: C.text, marginBottom: "12px", marginTop: 0 }}>Button System</h2>
            <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", marginBottom: "16px" }}>
              {[
                { label: "Primary CTA", bg: C.teal, txt: "#fff", note: "Donate, Enquire, Apply" },
                { label: "Secondary", bg: "transparent", txt: C.navy, border: C.navy, note: "Learn More, View Centre" },
                { label: "Ghost", bg: "#fff", txt: C.navy, note: "On dark backgrounds" },
                { label: "Destructive", bg: C.red, txt: "#fff", note: "Delete / Cancel (admin)" },
              ].map(b => (
                <div key={b.label} style={{ textAlign: "center" }}>
                  <div style={{ background: b.bg, color: b.txt, border: "2px solid " + (b.border || b.bg || C.teal),
                    borderRadius: "6px", padding: "10px 20px", fontSize: "13px", fontWeight: 600,
                    minWidth: "120px", minHeight: "44px", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "6px" }}>
                    {b.label}
                  </div>
                  <div style={{ fontSize: "11px", color: C.muted }}>{b.note}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Card taxonomy */}
          <h2 style={{ fontSize: "16px", fontWeight: 700, color: C.text, marginBottom: "12px" }}>Card System</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: "10px", marginBottom: "24px" }}>
            {[
              { type: "Programme", elements: ["Type badge (colour-coded)", "Title H3", "Audience group tag", "Age range pill", "2-line excerpt", "Centre badge", "[Learn More] CTA"], bg: C.wfCard },
              { type: "Centre", elements: ["Name H3", "State badge", "Address + phone + email", "Programmes list", "[View Centre →] CTA"], bg: C.wfAside },
              { type: "News / Story", elements: ["Featured image (16:9)", "Category badge", "Date", "Title H3", "2-line excerpt"], bg: C.wfContent },
              { type: "Event", elements: ["Date block (day/month)", "Event title", "Venue name", "Cost badge", "[Register] CTA"], bg: C.wfAccent },
              { type: "Job Listing", elements: ["Job title H3", "Type badge (by specialism)", "Centre location", "Closing date (red if <7 days)", "[View & Apply →]"], bg: C.wfCard },
              { type: "Resource", elements: ["Type badge", "Title", "Audience + language tags", "File icon", "[Download / View →]"], bg: C.wfHighlt },
            ].map(card => (
              <div key={card.type} style={{ background: card.bg, border: "1px solid " + C.border, borderRadius: "8px", padding: "14px" }}>
                <div style={{ fontSize: "12px", fontWeight: 700, color: C.navy, marginBottom: "8px" }}>{card.type} Card</div>
                {card.elements.map((el, i) => (
                  <div key={i} style={{ display: "flex", gap: "6px", marginBottom: "4px" }}>
                    <span style={{ color: C.teal, fontSize: "11px", flexShrink: 0 }}>—</span>
                    <span style={{ fontSize: "11px", color: "#2C3E50" }}>{el}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>

          {/* Accessibility */}
          <h2 style={{ fontSize: "16px", fontWeight: 700, color: C.text, marginBottom: "12px" }}>Accessibility Requirements (WCAG 2.1 AA)</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            {[
              { req: "Colour contrast 4.5:1 for body text", how: "Body: Navy on Off-white. White on Teal.", test: "axe DevTools" },
              { req: "Skip to content link", how: "First focusable element: <a href='#main-content'>", test: "Tab from address bar" },
              { req: "Focus indicators", how: "All interactive elements: 3px outline on :focus-visible", test: "Keyboard navigation" },
              { req: "Image alt text", how: "All <img>: descriptive alt. Decorative: alt=''", test: "Manual + axe scan" },
              { req: "Visible form labels", how: "All fields: <label> element. No placeholder-only.", test: "WPForms label settings" },
              { req: "44px touch targets", how: "Minimum 44×44px for all interactive elements mobile", test: "Chrome mobile emulation" },
            ].map((r, i) => (
              <div key={i} style={{ background: C.card, border: "1px solid " + C.border, borderRadius: "7px", padding: "10px 16px",
                borderLeft: "4px solid " + C.teal, display: "flex", gap: "12px", flexWrap: "wrap" }}>
                <div style={{ flex: "0 0 220px", fontSize: "12px", fontWeight: 700, color: C.text }}>{r.req}</div>
                <div style={{ flex: 1, fontSize: "12px", color: C.muted }}>{r.how}</div>
                <div style={{ fontSize: "11px", color: C.teal, fontFamily: "monospace" }}>{r.test}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

