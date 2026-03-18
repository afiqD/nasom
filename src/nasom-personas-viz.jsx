import { useState } from "react";

const C = {
  bg: "#060b14", card: "#0c1624", border: "#1a2e48",
  text: "#e2e8f0", muted: "#64748b",
  navy: "#1A3A5C", blue: "#3b82f6", blueLt: "#dbeafe",
  teal: "#10b981", tealLt: "#d1fae5",
  amber: "#f59e0b", amberLt: "#fef3c7",
  red: "#ef4444", redLt: "#fee2e2",
  green: "#22c55e", greenLt: "#dcfce7",
  purple: "#a855f7", purpleLt: "#f3e8ff",
  slate: "#64748b", slateLt: "#f1f5f9",
};

const PERSONAS = [
  {
    id: "P01", name: "Farah Ismail", age: 34, role: "First-Time Autism Parent",
    location: "Petaling Jaya, Selangor", context: "Malaysia", contextType: "MY",
    accentColor: C.teal, accentLt: C.tealLt,
    initials: "FI",
    avatar: "Mother of a 3-year-old recently diagnosed with ASD. Full-time exec at an SME. Works long hours. Husband supportive but less research-driven.",
    quote: "I just need to know what to do next. Where do I take him? What programme is right for him?",
    demographics: [
      ["Location", "Petaling Jaya, Selangor"],
      ["Household income", "RM 8,000 - 12,000/month"],
      ["Education", "Bachelor's degree"],
      ["Tech literacy", "High — smartphone-first"],
      ["Language", "English primary, BM secondary"],
    ],
    goals: [
      "Find an appropriate therapy programme as quickly as possible",
      "Understand what autism means for her child's development",
      "Connect with other parents who have been through this",
      "Access government funding or subsidies for therapy costs",
    ],
    frustrations: [
      "Cannot tell which programme is appropriate for her child's age/diagnosis",
      "No eligibility criteria or how-to-apply info — must phone to get basics",
      "No information about costs or whether JKM/SOCSO applies",
      "Cannot find nearest centre or which centres offer which programmes",
    ],
    behaviors: [
      "Searches Google at 10pm after child is asleep",
      "Reads parent forums (Facebook groups, Reddit Malaysia)",
      "Compares 3-4 organisations before making contact",
      "Prefers WhatsApp over phone for first contact",
    ],
    primaryAction: "Service/Programme Enquiry",
    secondaryAction: "Centre Finder",
    journeyStage: "Newly Diagnosed",
    priority: "P0",
    implications: ["Newly Diagnosed pathway on homepage", "Programme pages with eligibility + how-to-apply", "Centre finder with map"],
  },
  {
    id: "P02", name: "David Tan", age: 52, role: "Diaspora Donor",
    location: "London, UK", context: "Global", contextType: "GL",
    accentColor: C.blue, accentLt: C.blueLt,
    initials: "DT",
    avatar: "Malaysian-Chinese in UK for 20+ years. Senior engineer. Still strongly identifies with Malaysia. Has a nephew with autism back in KL. Donates to causes he trusts.",
    quote: "I want to support autism care back home but I need to know the money goes somewhere real.",
    demographics: [
      ["Location", "London, UK"],
      ["Household income", "GBP 80,000+/year"],
      ["Education", "Master's degree (engineering)"],
      ["Tech literacy", "High — desktop-first, LinkedIn regular"],
      ["Language", "English primary"],
    ],
    goals: [
      "Donate to a credible Malaysian autism org as a recurring gift",
      "See evidence that his donation has real impact",
      "Complete donation in a familiar, secure international payment flow",
      "Share the cause with his UK-based professional network",
    ],
    frustrations: [
      "No international payment option — only local bank transfer prominent",
      "No impact reporting — cannot see what donations have funded",
      "No recurring donation option — one-time only",
      "Donation page looks unpolished and raises trust concerns",
    ],
    behaviors: [
      "Reads about the cause before donating — wants reports and numbers",
      "Pays by credit card or PayPal — unfamiliar with local gateways",
      "More likely to donate at year-end or after a news trigger",
      "Shares causes on LinkedIn, not Facebook",
    ],
    primaryAction: "Donate (Recurring)",
    secondaryAction: "Read Impact Report",
    journeyStage: "Consideration",
    priority: "P0",
    implications: ["Persistent Donate CTA in header (with international payment)", "Impact statistics on Donate page", "Annual Reports visible and downloadable"],
  },
  {
    id: "P03", name: "Nurul Azreen", age: 27, role: "Therapist Job Seeker",
    location: "Shah Alam, Selangor", context: "Malaysia", contextType: "MY",
    accentColor: C.amber, accentLt: C.amberLt,
    initials: "NA",
    avatar: "Fresh grad in Speech-Language Therapy. Looking for first job with an established NPO. Values mission-driven work over salary. Active on Instagram and LinkedIn.",
    quote: "I want to work somewhere that actually makes a difference. Is NASOM a good place to grow?",
    demographics: [
      ["Location", "Shah Alam, Selangor"],
      ["Education", "BSc Speech-Language Therapy"],
      ["Tech literacy", "High — mobile-first, heavy social media"],
      ["Language", "BM primary, English fluent"],
      ["Status", "Final year / recent graduate"],
    ],
    goals: [
      "Find a role matching her specialism (SLT, OT, ABA) at a reputable org",
      "Understand career development path and training at NASOM",
      "Know which centre/location she would be based at",
      "Apply quickly without a lengthy process",
    ],
    frustrations: [
      "Careers page is static with no listed vacancies",
      "Cannot tell if NASOM is actively hiring or what roles exist",
      "No information about culture, training, or team",
      "No direct application — only a generic contact form",
    ],
    behaviors: [
      "Looks at Jobstreet and LinkedIn, but prefers applying directly to org sites",
      "Checks the organisation's social media before applying",
      "Talks to peers who have worked there before applying",
      "Responds well to employee testimonials and team photos",
    ],
    primaryAction: "View Job Listings",
    secondaryAction: "Apply for Role",
    journeyStage: "Active Job Search",
    priority: "P1",
    implications: ["Dynamic Careers CPT with active job listings"],
  },
  {
    id: "P04", name: "Izzatul Husna", age: 39, role: "Corporate CSR Manager",
    location: "KLCC, Kuala Lumpur", context: "Malaysia", contextType: "MY",
    accentColor: C.purple, accentLt: C.purpleLt,
    initials: "IH",
    avatar: "CSR and sustainability manager at a GLC. Has an annual CSR budget to allocate. Needs to justify partnerships to senior management with clear reporting.",
    quote: "If I'm recommending NASOM to my leadership team, the website has to look credible — and I need to see what the partnership looks like.",
    demographics: [
      ["Location", "KLCC, Kuala Lumpur"],
      ["Industry", "Government-linked company (GLC)"],
      ["Education", "MBA"],
      ["Tech literacy", "High — corporate tools, desktop-first"],
      ["Language", "English and BM equally"],
    ],
    goals: [
      "Identify credible disability-focused NPOs for annual CSR partnership",
      "Understand what a NASOM partnership looks like (event, volunteering, financial)",
      "Get a proposal brief to share with her leadership team",
      "Ensure the org has track record and public reporting",
    ],
    frustrations: [
      "No dedicated Corporate Partnerships section on the site",
      "Cannot find partnership enquiry process — only generic contact page",
      "No annual reports or financial transparency visible",
      "Site does not look polished enough to share with a CEO",
    ],
    behaviors: [
      "Googles 'autism NGO Malaysia CSR partnership' to discover orgs",
      "Evaluates sites on first impression — unprofessional = out immediately",
      "Downloads annual reports before committing to any outreach",
      "Needs a clear proposal pack she can forward to her boss",
    ],
    primaryAction: "Corporate Partnership Enquiry",
    secondaryAction: "Download Annual Report",
    journeyStage: "Discovery / Evaluation",
    priority: "P1",
    implications: ["Corporate Partnerships section with enquiry flow", "Annual Reports visible and downloadable"],
  },
  {
    id: "P05", name: "Ahmad Faris", age: 44, role: "Returning Parent (Ongoing)",
    location: "Subang Jaya, Selangor", context: "Malaysia", contextType: "MY",
    accentColor: C.green, accentLt: C.greenLt,
    initials: "AF",
    avatar: "Father of a 12-year-old at NASOM's centre for 9 years. Knows the staff well. Uses the site primarily to check events, news, and fundraising campaigns. Loyal donor.",
    quote: "I already trust NASOM. I just want to stay informed and support when I can.",
    demographics: [
      ["Location", "Subang Jaya, Selangor"],
      ["Household income", "RM 12,000+/month"],
      ["Tech literacy", "Medium — smartphone, not a power user"],
      ["Language", "BM primary, English conversational"],
      ["Relationship", "9 years, ongoing centre user"],
    ],
    goals: [
      "Stay updated on events, fundraising campaigns, and news",
      "Re-engage with donation campaigns he has supported before",
      "Share NASOM content with family and community WhatsApp groups",
      "Find information about transition planning as child approaches adulthood",
    ],
    frustrations: [
      "Events calendar is buried under Gallery — hard to find upcoming events",
      "No newsletter or notification when new events/campaigns launch",
      "News/stories section absent — no way to follow NASOM progress",
      "No adult transition or vocational programme info visible",
    ],
    behaviors: [
      "Visits site every 1-2 months or when triggered by WhatsApp/Facebook",
      "Shares fundraising campaigns in family and parent WhatsApp groups",
      "Would donate again if he saw a specific campaign with a clear goal",
      "Reads NASOM Facebook page more often than the website",
    ],
    primaryAction: "Browse Events / News",
    secondaryAction: "Donate to Campaign",
    journeyStage: "Re-engagement",
    priority: "P1",
    implications: ["Events calendar promoted to top-level nav", "News & Stories section with shareable articles", "Bahasa Malaysia content (Phase 2)"],
  },
  {
    id: "P06", name: "Dr. Priya Nair", age: 36, role: "International Researcher",
    location: "Singapore (NUS)", context: "Global", contextType: "GL",
    accentColor: C.red, accentLt: C.redLt,
    initials: "PN",
    avatar: "Post-doc researcher in developmental psychology at NUS. Studying autism in Southeast Asia. Needs Malaysian intervention data and a credible research partner.",
    quote: "I need to understand what interventions are actually being delivered in Malaysia and find the right contact for a collaboration.",
    demographics: [
      ["Location", "Singapore"],
      ["Institution", "National University of Singapore"],
      ["Education", "PhD Developmental Psychology"],
      ["Tech literacy", "Very high — academic tools, desktop-first"],
      ["Language", "English primary"],
    ],
    goals: [
      "Understand what evidence-based programmes NASOM delivers",
      "Access published data, reports, or research outputs from NASOM",
      "Identify the right contact for a research collaboration proposal",
      "Assess NASOM's credibility as a research partner",
    ],
    frustrations: [
      "No research or publications section on the site",
      "No resources or downloadable reports",
      "Generic contact form — no way to identify the right person",
      "Programme descriptions too thin to evaluate evidence base",
    ],
    behaviors: [
      "Searches Google Scholar and PubMed first, then org sites",
      "Evaluates org by publication history and staff credentials",
      "Reaches out via email with a formal proposal",
      "Would cite NASOM data in publications if it existed",
    ],
    primaryAction: "Access Research / Resources",
    secondaryAction: "Research Collaboration Enquiry",
    journeyStage: "Discovery",
    priority: "P1",
    implications: ["Resources CPT with research papers and guides"],
  },
];

const DESIGN_IMPLICATIONS = [
  { implication: "Newly Diagnosed pathway on homepage", personas: ["P01"], why: "Highest-intent arrival segment — needs guided journey immediately", priority: "P0" },
  { implication: "Persistent Donate CTA in header (intl. payment)", personas: ["P02"], why: "David cannot donate if he cannot find or trust the donation flow", priority: "P0" },
  { implication: "Programme pages with eligibility + how-to-apply", personas: ["P01", "P06"], why: "Farah cannot choose; Priya cannot evaluate without this information", priority: "P0" },
  { implication: "Centre finder with map + programmes per centre", personas: ["P01"], why: "National org — geographic discovery must come before any other decision", priority: "P0" },
  { implication: "Dynamic Careers CPT with active listings", personas: ["P03"], why: "Nurul will not apply if the page shows nothing current", priority: "P1" },
  { implication: "Corporate Partnerships section + enquiry flow", personas: ["P04"], why: "Izzatul will not contact NASOM with no dedicated partnership channel", priority: "P1" },
  { implication: "Events calendar at top-level nav", personas: ["P05"], why: "Ahmad re-engages primarily through events — burying it loses him", priority: "P1" },
  { implication: "News & Stories section with shareable articles", personas: ["P05"], why: "Ahmad shares to WhatsApp — he needs shareable content to exist", priority: "P1" },
  { implication: "Resources CPT with research papers + guides", personas: ["P06", "P01"], why: "Priya needs evidence base; Farah needs practical parent guides", priority: "P1" },
  { implication: "Annual Reports visible and downloadable", personas: ["P04", "P02"], why: "Both Izzatul and David evaluate credibility — reports are proof", priority: "P1" },
  { implication: "Impact statistics on Donate page", personas: ["P02"], why: "David needs to justify the gift to himself and his network", priority: "P1" },
  { implication: "Bahasa Malaysia content track", personas: ["P01", "P05"], why: "Both have BM as primary or equal language for family comms", priority: "P2" },
];

const TABS = ["Overview", "Persona Profiles", "Design Implications"];

const priColor = (p) => p === "P0" ? C.red : p === "P1" ? C.blue : C.teal;

export default function PersonaDashboard() {
  const [tab, setTab] = useState(0);
  const [selected, setSelected] = useState("P01");
  const [contextFilter, setContextFilter] = useState("All");
  const [priFilter, setPriFilter] = useState("All");

  const selP = PERSONAS.find(p => p.id === selected);

  const filteredPersonas = PERSONAS.filter(p =>
    (contextFilter === "All" || p.contextType === contextFilter)
  );

  const filteredImplications = DESIGN_IMPLICATIONS.filter(d =>
    priFilter === "All" || d.priority === priFilter
  );

  return (
    <div style={{ background: C.bg, minHeight: "100vh", fontFamily: "system-ui,sans-serif", color: C.text, padding: "24px" }}>

      {/* Header */}
      <div style={{ marginBottom: "24px" }}>
        <div style={{ fontSize: "11px", color: C.muted, letterSpacing: "2px", textTransform: "uppercase", marginBottom: "6px" }}>NASOM.ORG.MY — USER PERSONAS</div>
        <h1 style={{ margin: 0, fontSize: "22px", fontWeight: 700 }}>User Persona Report</h1>
        <div style={{ fontSize: "13px", color: C.muted, marginTop: "6px" }}>6 personas &nbsp;·&nbsp; 2 audience contexts (MY + Global) &nbsp;·&nbsp; 12 design implications</div>
      </div>

      {/* Stats */}
      <div style={{ display: "flex", gap: "10px", marginBottom: "20px", flexWrap: "wrap" }}>
        {[
          { label: "Total Personas", val: 6, color: C.blue },
          { label: "Malaysian Segments", val: 4, color: C.teal },
          { label: "Global Segments", val: 2, color: C.purple },
          { label: "P0 Personas", val: PERSONAS.filter(p => p.priority === "P0").length, color: C.red },
          { label: "P0 Design Implications", val: DESIGN_IMPLICATIONS.filter(d => d.priority === "P0").length, color: C.red },
        ].map(s => (
          <div key={s.label} style={{ background: C.card, border: "1px solid " + C.border, borderRadius: "8px", padding: "12px 18px" }}>
            <div style={{ fontSize: "22px", fontWeight: 700, color: s.color }}>{s.val}</div>
            <div style={{ fontSize: "11px", color: C.muted, marginTop: "2px" }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", gap: "4px", marginBottom: "20px", borderBottom: "1px solid " + C.border }}>
        {TABS.map((t, i) => (
          <button key={t} onClick={() => setTab(i)} style={{
            background: tab === i ? C.blue : "transparent",
            color: tab === i ? "#fff" : C.muted,
            border: "none", borderRadius: "6px 6px 0 0", padding: "8px 20px",
            cursor: "pointer", fontSize: "13px", fontWeight: tab === i ? 700 : 400
          }}>{t}</button>
        ))}
      </div>

      {/* TAB 0: OVERVIEW CARDS */}
      {tab === 0 && (
        <div>
          <div style={{ display: "flex", gap: "8px", marginBottom: "16px" }}>
            {["All", "MY", "GL"].map(f => (
              <button key={f} onClick={() => setContextFilter(f)} style={{
                background: contextFilter === f ? C.blue : C.card,
                color: contextFilter === f ? "#fff" : C.muted,
                border: "1px solid " + C.border, borderRadius: "6px", padding: "5px 14px",
                cursor: "pointer", fontSize: "12px", fontWeight: 600
              }}>{f === "MY" ? "Malaysia" : f === "GL" ? "Global" : "All"}</button>
            ))}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "14px" }}>
            {filteredPersonas.map(p => (
              <div key={p.id} onClick={() => { setSelected(p.id); setTab(1); }}
                style={{ background: C.card, border: "1px solid " + C.border, borderRadius: "12px",
                  overflow: "hidden", cursor: "pointer",
                  borderTop: "4px solid " + p.accentColor }}>
                {/* Card header */}
                <div style={{ padding: "16px 16px 0" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "10px" }}>
                    <div style={{ width: "44px", height: "44px", borderRadius: "50%", background: p.accentColor,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: "14px", fontWeight: 700, color: "#fff", flexShrink: 0 }}>
                      {p.initials}
                    </div>
                    <div>
                      <div style={{ fontSize: "14px", fontWeight: 700, color: C.text }}>{p.name}</div>
                      <div style={{ fontSize: "12px", color: C.muted }}>Age {p.age} &nbsp;·&nbsp; {p.location}</div>
                    </div>
                  </div>
                  <div style={{ background: p.accentLt, borderRadius: "6px", padding: "8px 12px", marginBottom: "12px" }}>
                    <div style={{ fontSize: "12px", fontWeight: 700, color: p.accentColor, marginBottom: "2px" }}>{p.role}</div>
                    <div style={{ fontSize: "12px", color: C.body || "#2C3E50", lineHeight: 1.4, fontStyle: "italic" }}>"{p.quote}"</div>
                  </div>
                </div>
                {/* Card footer */}
                <div style={{ padding: "0 16px 14px", display: "flex", gap: "8px", flexWrap: "wrap" }}>
                  <span style={{ background: priColor(p.priority) + "22", color: priColor(p.priority), borderRadius: "4px", padding: "2px 8px", fontSize: "11px", fontWeight: 700 }}>{p.priority}</span>
                  <span style={{ background: p.contextType === "MY" ? C.teal + "22" : C.purple + "22",
                    color: p.contextType === "MY" ? C.teal : C.purple,
                    borderRadius: "4px", padding: "2px 8px", fontSize: "11px" }}>{p.context}</span>
                  <span style={{ background: C.border, color: C.muted, borderRadius: "4px", padding: "2px 8px", fontSize: "11px" }}>{p.journeyStage}</span>
                </div>
                <div style={{ background: C.border, height: "1px" }}></div>
                <div style={{ padding: "10px 16px", fontSize: "12px", color: C.muted }}>
                  <span style={{ color: p.accentColor, fontWeight: 600 }}>Primary: </span>{p.primaryAction}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 1: PERSONA PROFILES */}
      {tab === 1 && (
        <div style={{ display: "flex", gap: "16px" }}>
          {/* Sidebar */}
          <div style={{ width: "200px", flexShrink: 0 }}>
            {PERSONAS.map(p => (
              <div key={p.id} onClick={() => setSelected(p.id)}
                style={{ background: selected === p.id ? p.accentColor + "22" : C.card,
                  border: "1px solid " + (selected === p.id ? p.accentColor : C.border),
                  borderRadius: "8px", padding: "10px 14px", marginBottom: "8px", cursor: "pointer" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <div style={{ width: "30px", height: "30px", borderRadius: "50%", background: p.accentColor,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: "11px", fontWeight: 700, color: "#fff", flexShrink: 0 }}>{p.initials}</div>
                  <div>
                    <div style={{ fontSize: "12px", fontWeight: 700, color: C.text, lineHeight: 1.2 }}>{p.name}</div>
                    <div style={{ fontSize: "10px", color: C.muted, marginTop: "1px" }}>{p.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Detail panel */}
          {selP && (
            <div style={{ flex: 1 }}>
              {/* Banner */}
              <div style={{ background: selP.accentColor, borderRadius: "10px", padding: "20px 24px", marginBottom: "16px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "12px" }}>
                  <div style={{ width: "56px", height: "56px", borderRadius: "50%", background: "rgba(255,255,255,0.25)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: "18px", fontWeight: 700, color: "#fff" }}>{selP.initials}</div>
                  <div>
                    <div style={{ fontSize: "22px", fontWeight: 700, color: "#fff" }}>{selP.name}</div>
                    <div style={{ fontSize: "14px", color: "rgba(255,255,255,0.85)", marginTop: "2px" }}>{selP.role} &nbsp;·&nbsp; Age {selP.age} &nbsp;·&nbsp; {selP.location}</div>
                  </div>
                </div>
                <div style={{ background: "rgba(255,255,255,0.15)", borderRadius: "6px", padding: "10px 14px",
                  fontSize: "13px", color: "#fff", fontStyle: "italic", marginBottom: "10px" }}>
                  "{selP.quote}"
                </div>
                <div style={{ fontSize: "13px", color: "rgba(255,255,255,0.85)", lineHeight: 1.5 }}>{selP.avatar}</div>
                <div style={{ display: "flex", gap: "8px", marginTop: "12px", flexWrap: "wrap" }}>
                  <span style={{ background: "rgba(255,255,255,0.2)", color: "#fff", borderRadius: "4px", padding: "3px 10px", fontSize: "12px", fontWeight: 700 }}>{selP.priority}</span>
                  <span style={{ background: "rgba(255,255,255,0.2)", color: "#fff", borderRadius: "4px", padding: "3px 10px", fontSize: "12px" }}>{selP.context}</span>
                  <span style={{ background: "rgba(255,255,255,0.2)", color: "#fff", borderRadius: "4px", padding: "3px 10px", fontSize: "12px" }}>{selP.journeyStage}</span>
                </div>
              </div>

              {/* Demographics */}
              <div style={{ background: C.card, border: "1px solid " + C.border, borderRadius: "8px", padding: "16px", marginBottom: "14px" }}>
                <div style={{ fontSize: "12px", fontWeight: 700, color: C.muted, textTransform: "uppercase", letterSpacing: "1px", marginBottom: "10px" }}>Demographics</div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6px" }}>
                  {selP.demographics.map((d, i) => (
                    <div key={i} style={{ background: C.bg, borderRadius: "4px", padding: "6px 10px" }}>
                      <span style={{ fontSize: "11px", color: C.muted }}>{d[0]}: </span>
                      <span style={{ fontSize: "12px", color: C.text, fontWeight: 600 }}>{d[1]}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Goals / Frustrations / Behaviours */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "10px", marginBottom: "14px" }}>
                {[
                  { label: "Goals", items: selP.goals, color: C.teal, bg: C.tealLt },
                  { label: "Frustrations", items: selP.frustrations, color: C.red, bg: C.redLt },
                  { label: "Digital Behaviours", items: selP.behaviors, color: C.blue, bg: C.blueLt },
                ].map(col => (
                  <div key={col.label} style={{ background: C.card, border: "1px solid " + C.border, borderRadius: "8px", overflow: "hidden" }}>
                    <div style={{ background: col.color, padding: "8px 12px" }}>
                      <span style={{ fontSize: "12px", fontWeight: 700, color: "#fff" }}>{col.label}</span>
                    </div>
                    <div style={{ padding: "12px" }}>
                      {col.items.map((item, i) => (
                        <div key={i} style={{ display: "flex", gap: "8px", marginBottom: "8px" }}>
                          <span style={{ color: col.color, flexShrink: 0, fontSize: "13px" }}>-</span>
                          <span style={{ fontSize: "12px", color: C.text, lineHeight: 1.5 }}>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* CTA + Implications */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
                <div style={{ background: C.card, border: "1px solid " + C.border, borderRadius: "8px", padding: "14px" }}>
                  <div style={{ fontSize: "11px", fontWeight: 700, color: selP.accentColor, textTransform: "uppercase", marginBottom: "8px" }}>Conversion Actions</div>
                  <div style={{ marginBottom: "8px" }}>
                    <span style={{ fontSize: "11px", color: C.muted }}>Primary: </span>
                    <span style={{ fontSize: "13px", fontWeight: 700, color: C.text }}>{selP.primaryAction}</span>
                  </div>
                  <div>
                    <span style={{ fontSize: "11px", color: C.muted }}>Secondary: </span>
                    <span style={{ fontSize: "13px", color: C.text }}>{selP.secondaryAction}</span>
                  </div>
                </div>
                <div style={{ background: C.card, border: "1px solid " + C.border, borderRadius: "8px", padding: "14px" }}>
                  <div style={{ fontSize: "11px", fontWeight: 700, color: selP.accentColor, textTransform: "uppercase", marginBottom: "8px" }}>Design Implications</div>
                  {selP.implications.map((imp, i) => (
                    <div key={i} style={{ background: selP.accentColor + "15", borderRadius: "4px", padding: "4px 8px", marginBottom: "4px",
                      fontSize: "12px", color: C.text }}>{imp}</div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB 2: DESIGN IMPLICATIONS */}
      {tab === 2 && (
        <div>
          <div style={{ background: C.redLt + "22", border: "1px solid " + C.red + "44", borderRadius: "8px", padding: "14px 18px", marginBottom: "16px" }}>
            <span style={{ fontSize: "12px", fontWeight: 700, color: C.red }}>KEY INSIGHT: </span>
            <span style={{ fontSize: "13px", color: C.text }}>P01 (Farah) and P02 (David) drive all 4 P0 design decisions. Design for these two personas first — everything else is P1.</span>
          </div>

          <div style={{ display: "flex", gap: "8px", marginBottom: "16px" }}>
            {["All", "P0", "P1", "P2"].map(f => (
              <button key={f} onClick={() => setPriFilter(f)} style={{
                background: priFilter === f ? C.blue : C.card,
                color: priFilter === f ? "#fff" : C.muted,
                border: "1px solid " + C.border, borderRadius: "6px", padding: "5px 14px",
                cursor: "pointer", fontSize: "12px", fontWeight: 600
              }}>{f}</button>
            ))}
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            {filteredImplications.map((d, i) => (
              <div key={i} style={{ background: C.card, border: "1px solid " + C.border, borderRadius: "10px", padding: "14px 18px",
                display: "flex", alignItems: "flex-start", gap: "14px",
                borderLeft: "5px solid " + priColor(d.priority) }}>
                <span style={{ background: priColor(d.priority) + "22", color: priColor(d.priority),
                  borderRadius: "4px", padding: "3px 10px", fontWeight: 700, fontSize: "12px", flexShrink: 0, marginTop: "2px" }}>{d.priority}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: "14px", fontWeight: 700, color: C.text, marginBottom: "4px" }}>{d.implication}</div>
                  <div style={{ fontSize: "13px", color: C.muted, lineHeight: 1.5 }}>{d.why}</div>
                </div>
                <div style={{ display: "flex", gap: "4px", flexShrink: 0 }}>
                  {d.personas.map(pid => {
                    const pMatch = PERSONAS.find(p => p.id === pid);
                    return pMatch ? (
                      <div key={pid} onClick={() => { setSelected(pid); setTab(1); }}
                        style={{ width: "28px", height: "28px", borderRadius: "50%", background: pMatch.accentColor,
                          display: "flex", alignItems: "center", justifyContent: "center",
                          fontSize: "9px", fontWeight: 700, color: "#fff", cursor: "pointer", flexShrink: 0 }}>
                        {pMatch.initials}
                      </div>
                    ) : null;
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

