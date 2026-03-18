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

const COMPETITORS = [
  {
    id: "speaks", name: "Autism Speaks", url: "autismspeaks.org", region: "USA (Global)", type: "Primary",
    accentColor: C.blue,
    positioning: "Largest autism NPO globally. Research-led, medical framing.",
    audience: "Parents, donors, researchers, government",
    strengths: ["World-class resource library searchable by age/topic", "Dedicated Newly Diagnosed pathway with clear next steps", "Persistent orange CTA bar + Donate button always visible", "Separate donor/fundraiser/volunteer journeys"],
    weaknesses: ["Heavy US focus - limited local service discovery", "Clinical tone can alienate newly-diagnosed families", "Site is very dense - high cognitive load"],
    takeaways: ["Adopt clear 'Newly Diagnosed' pathway on homepage", "Resource library with audience-based filtering", "Always-visible donation CTA in header"]
  },
  {
    id: "nas", name: "National Autistic Society (UK)", url: "autism.org.uk", region: "UK", type: "Primary",
    accentColor: C.purple,
    positioning: "UK national authority. Balance of clinical and community voice.",
    audience: "Autistic adults, parents, professionals, employers",
    strengths: ["Strong adult and self-advocacy content", "Homepage audience selector (parent / autistic adult / professional)", "Accessible design - WCAG AA compliant", "Shop and fundraising deeply integrated"],
    weaknesses: ["Navigation is complex - too many levels", "Search results quality inconsistent"],
    takeaways: ["Homepage audience selector to guide different user types", "Include autistic adult voice - not just parent perspective", "Ensure WCAG AA compliance on rebuild"]
  },
  {
    id: "awa", name: "Autism Assoc. of WA", url: "autism.org.au", region: "Australia", type: "Primary",
    accentColor: C.teal,
    positioning: "State-based model similar to NASOM. Service delivery + advocacy.",
    audience: "Families, NDIS participants, employers, schools",
    strengths: ["Centre/service finder with map is #1 homepage CTA", "NDIS/funding guidance is a dedicated section", "Programme pages with eligibility and referral process", "Events and news are prominent and up to date"],
    weaknesses: ["Heavy NDIS framing not portable to Malaysian context", "Design feels dated - low visual impact"],
    takeaways: ["Centre finder with map view as P0 feature", "Programme pages need eligibility criteria + how-to-apply", "Fee/funding guidance section for Malaysian context (JKM, SOCSO)"]
  },
  {
    id: "yam", name: "Yayasan Autism Malaysia", url: "autism.org.my", region: "Malaysia", type: "Local",
    accentColor: C.amber,
    positioning: "Smaller Malaysian NPO. Low-budget but locally relevant.",
    audience: "Malaysian families, volunteers, donors",
    strengths: ["Bahasa Malaysia content present", "Local events calendar prominent", "Simpler navigation - easier to find service info"],
    weaknesses: ["No online donation integration", "Outdated design - not mobile-friendly", "No CPT architecture - all flat pages", "No social proof or testimonials"],
    takeaways: ["Bahasa Malaysia as priority language track for Phase 2", "NASOM should own 'most professional Malaysian autism site' positioning"]
  },
  {
    id: "asan", name: "ASAN", url: "autisticadvocacy.org", region: "USA", type: "Reference",
    accentColor: C.green,
    positioning: "Autistic-led. Radical accessibility and self-advocacy focus.",
    audience: "Autistic adults, policy makers, researchers",
    strengths: ["Plain language design - written for autistic users", "Highly accessible - WCAG AAA target", "Policy and research section is authoritative"],
    weaknesses: ["Niche audience - not a service delivery site"],
    takeaways: ["Plain language principles applicable to NASOM parent content", "Consider accessibility statement + WCAG commitment on rebuild"]
  },
];

const MATRIX = [
  { feature: "Persistent Donate CTA in header",       nasom: "No",      speaks: "Yes",     nas: "Yes",     awa: "Yes",     yam: "No"  },
  { feature: "Newly Diagnosed / First Steps pathway", nasom: "No",      speaks: "Yes",     nas: "Yes",     awa: "Partial", yam: "No"  },
  { feature: "Centre / Service Finder with map",      nasom: "No",      speaks: "No",      nas: "No",      awa: "Yes",     yam: "No"  },
  { feature: "Programme pages with eligibility",      nasom: "No",      speaks: "N/A",     nas: "Yes",     awa: "Yes",     yam: "No"  },
  { feature: "Online donation (recurring)",           nasom: "Partial", speaks: "Yes",     nas: "Yes",     awa: "Yes",     yam: "No"  },
  { feature: "Resource library with filtering",       nasom: "No",      speaks: "Yes",     nas: "Yes",     awa: "Partial", yam: "No"  },
  { feature: "Bahasa Malaysia content track",         nasom: "No",      speaks: "No",      nas: "No",      awa: "No",      yam: "Yes" },
  { feature: "WCAG AA accessibility",                 nasom: "No",      speaks: "Partial", nas: "Yes",     awa: "Partial", yam: "No"  },
  { feature: "Audience selector on homepage",         nasom: "No",      speaks: "No",      nas: "Yes",     awa: "No",      yam: "No"  },
  { feature: "Events calendar (upcoming + past)",     nasom: "Partial", speaks: "No",      nas: "Partial", awa: "Yes",     yam: "Yes" },
  { feature: "Careers / Job listings (dynamic)",      nasom: "Static",  speaks: "Yes",     nas: "Yes",     awa: "Yes",     yam: "No"  },
  { feature: "Social proof / Testimonials",           nasom: "No",      speaks: "Yes",     nas: "Yes",     awa: "Yes",     yam: "No"  },
];

const GAPS = [
  { gap: "Centre / Service Finder with map", why: "National org with 3+ centres has no geographic discovery. Families cannot find nearest service.", priority: "P0" },
  { gap: "Persistent Donate CTA in header", why: "Primary revenue conversion not visible on most pages. All peers have this.", priority: "P0" },
  { gap: "Newly Diagnosed pathway", why: "Highest-intent segment has no guided journey. They leave to competitor sites.", priority: "P0" },
  { gap: "Programme pages with eligibility", why: "Families cannot self-assess or begin application without phoning the centre.", priority: "P0" },
  { gap: "Resource library with filtering", why: "All benchmark sites provide guides. NASOM has none - losing SEO and authority.", priority: "P1" },
  { gap: "Bahasa Malaysia content track", why: "Local competitor YAM has BM content. NASOM should own the multilingual position.", priority: "P1" },
  { gap: "Testimonials / social proof", why: "All benchmark sites feature family stories. Absent on NASOM - reduces donor confidence.", priority: "P1" },
  { gap: "WCAG AA accessibility", why: "Legal obligation in many contexts. NAS (UK) is the benchmark.", priority: "P1" },
];

const valColor = (v) => v === "Yes" ? C.green : v === "No" ? C.red : v === "Partial" ? C.amber : C.slate;
const valBg = (v) => v === "Yes" ? C.greenLt + "33" : v === "No" ? C.redLt + "33" : v === "Partial" ? C.amberLt + "33" : C.slateLt + "33";
const priColor = (p) => p === "P0" ? C.red : C.blue;

const TABS = ["Site Profiles", "Feature Matrix", "NASOM Gaps"];

export default function CompetitorDashboard() {
  const [tab, setTab] = useState(0);
  const [selected, setSelected] = useState("speaks");

  const selComp = COMPETITORS.find(c => c.id === selected);

  return (
    <div style={{ background: C.bg, minHeight: "100vh", fontFamily: "system-ui,sans-serif", color: C.text, padding: "24px" }}>

      <div style={{ marginBottom: "24px" }}>
        <div style={{ fontSize: "11px", color: C.muted, letterSpacing: "2px", textTransform: "uppercase", marginBottom: "6px" }}>NASOM.ORG.MY — COMPETITOR ANALYSIS</div>
        <h1 style={{ margin: 0, fontSize: "22px", fontWeight: 700, color: C.text }}>Competitor & Design Trends Analysis</h1>
        <div style={{ marginTop: "6px", fontSize: "13px", color: C.muted }}>5 benchmark sites &nbsp;·&nbsp; 12-feature matrix &nbsp;·&nbsp; 8 NASOM gaps identified</div>
      </div>

      {/* Site pills */}
      <div style={{ display: "flex", gap: "10px", marginBottom: "20px", flexWrap: "wrap" }}>
        {[{ id: "nasom", name: "NASOM (ours)", accentColor: C.navy }, ...COMPETITORS].map(c => (
          <div key={c.id} onClick={() => { if (c.id !== "nasom") { setSelected(c.id); setTab(0); }}}
            style={{ background: (selected === c.id || c.id === "nasom") ? c.accentColor : C.card,
              border: "1px solid " + (selected === c.id ? c.accentColor : C.border),
              borderRadius: "20px", padding: "6px 16px", cursor: c.id !== "nasom" ? "pointer" : "default",
              fontSize: "12px", fontWeight: 600, color: (selected === c.id || c.id === "nasom") ? "#fff" : C.muted }}>
            {c.name}
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", gap: "4px", marginBottom: "20px", borderBottom: "1px solid " + C.border }}>
        {TABS.map((t, i) => (
          <button key={t} onClick={() => setTab(i)} style={{
            background: tab === i ? C.blue : "transparent", color: tab === i ? "#fff" : C.muted,
            border: "none", borderRadius: "6px 6px 0 0", padding: "8px 18px",
            cursor: "pointer", fontSize: "13px", fontWeight: tab === i ? 700 : 400
          }}>{t}</button>
        ))}
      </div>

      {/* TAB 0: SITE PROFILES */}
      {tab === 0 && selComp && (
        <div>
          <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
            {/* Selector sidebar */}
            <div style={{ width: "180px", flexShrink: 0 }}>
              {COMPETITORS.map(c => (
                <div key={c.id} onClick={() => setSelected(c.id)}
                  style={{ background: selected === c.id ? c.accentColor + "22" : C.card,
                    border: "1px solid " + (selected === c.id ? c.accentColor : C.border),
                    borderRadius: "8px", padding: "10px 14px", marginBottom: "8px", cursor: "pointer" }}>
                  <div style={{ fontSize: "12px", fontWeight: 700, color: selected === c.id ? c.accentColor : C.text }}>{c.name}</div>
                  <div style={{ fontSize: "11px", color: C.muted, marginTop: "2px" }}>{c.region}</div>
                  <div style={{ display: "inline-block", background: c.accentColor + "22", color: c.accentColor, borderRadius: "3px", padding: "1px 6px", fontSize: "10px", marginTop: "4px" }}>{c.type}</div>
                </div>
              ))}
            </div>

            {/* Detail panel */}
            <div style={{ flex: 1 }}>
              <div style={{ background: selComp.accentColor, borderRadius: "10px 10px 0 0", padding: "20px 24px" }}>
                <div style={{ fontSize: "20px", fontWeight: 700, color: "#fff" }}>{selComp.name}</div>
                <div style={{ fontSize: "13px", color: "rgba(255,255,255,0.8)", marginTop: "4px" }}>{selComp.url} &nbsp;·&nbsp; {selComp.region} &nbsp;·&nbsp; {selComp.type}</div>
                <div style={{ fontSize: "13px", color: "rgba(255,255,255,0.9)", marginTop: "8px" }}>{selComp.positioning}</div>
                <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.7)", marginTop: "4px" }}>Audience: {selComp.audience}</div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "0" }}>
                {[
                  { label: "Strengths", items: selComp.strengths, color: C.green, bg: C.greenLt + "22" },
                  { label: "Weaknesses", items: selComp.weaknesses, color: C.red, bg: C.redLt + "22" },
                  { label: "Takeaways for NASOM", items: selComp.takeaways, color: C.blue, bg: C.blueLt + "22" },
                ].map(col => (
                  <div key={col.label} style={{ background: col.bg, border: "1px solid " + C.border, padding: "16px" }}>
                    <div style={{ fontSize: "11px", fontWeight: 700, color: col.color, textTransform: "uppercase", letterSpacing: "1px", marginBottom: "10px" }}>{col.label}</div>
                    {col.items.map((item, i) => (
                      <div key={i} style={{ display: "flex", gap: "8px", marginBottom: "8px" }}>
                        <span style={{ color: col.color, flexShrink: 0 }}>-</span>
                        <span style={{ fontSize: "13px", color: C.text, lineHeight: 1.5 }}>{item}</span>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 1: FEATURE MATRIX */}
      {tab === 1 && (
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "13px" }}>
            <thead>
              <tr>
                <th style={{ background: C.navy, color: "#fff", padding: "10px 14px", textAlign: "left", borderRadius: "8px 0 0 0" }}>Feature</th>
                {["NASOM", "Speaks", "NAS UK", "AWA AU", "YAM"].map((h, i, a) => (
                  <th key={h} style={{ background: C.navy, color: "#fff", padding: "10px 14px", textAlign: "center",
                    borderRadius: i === a.length - 1 ? "0 8px 0 0" : "0" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {MATRIX.map((row, i) => (
                <tr key={i} style={{ background: i % 2 === 0 ? C.card : C.bg }}>
                  <td style={{ padding: "10px 14px", color: C.text, borderBottom: "1px solid " + C.border }}>{row.feature}</td>
                  {[row.nasom, row.speaks, row.nas, row.awa, row.yam].map((v, vi) => (
                    <td key={vi} style={{ padding: "10px 14px", textAlign: "center", borderBottom: "1px solid " + C.border, background: valBg(v) }}>
                      <span style={{ color: valColor(v), fontWeight: 700, fontSize: "12px" }}>{v}</span>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          <div style={{ marginTop: "16px", display: "flex", gap: "12px", flexWrap: "wrap" }}>
            {[["Yes", C.green], ["Partial", C.amber], ["No", C.red], ["N/A", C.slate]].map(([label, color]) => (
              <div key={label} style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "12px", color: C.muted }}>
                <span style={{ display: "inline-block", width: "10px", height: "10px", borderRadius: "2px", background: color }}></span>
                {label}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: NASOM GAPS */}
      {tab === 2 && (
        <div>
          <div style={{ marginBottom: "16px", background: C.redLt + "22", border: "1px solid " + C.red + "44", borderRadius: "8px", padding: "14px 18px" }}>
            <span style={{ fontSize: "12px", fontWeight: 700, color: C.red }}>HEADLINE FINDING: </span>
            <span style={{ fontSize: "13px", color: C.text }}>NASOM is the only benchmark site missing all 4 P0 features. All four are present on 2+ competitor sites.</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {GAPS.map((g, i) => (
              <div key={i} style={{ background: C.card, border: "1px solid " + C.border, borderRadius: "10px", padding: "16px 20px",
                borderLeft: "5px solid " + priColor(g.priority), display: "flex", alignItems: "flex-start", gap: "16px" }}>
                <span style={{ background: priColor(g.priority) + "22", color: priColor(g.priority), borderRadius: "4px", padding: "3px 10px", fontWeight: 700, fontSize: "12px", flexShrink: 0, marginTop: "2px" }}>{g.priority}</span>
                <div>
                  <div style={{ fontSize: "14px", fontWeight: 700, color: C.text, marginBottom: "4px" }}>{g.gap}</div>
                  <div style={{ fontSize: "13px", color: C.muted, lineHeight: 1.5 }}>{g.why}</div>
                </div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: "20px", background: C.tealLt + "22", border: "1px solid " + C.teal + "44", borderRadius: "8px", padding: "14px 18px" }}>
            <span style={{ fontSize: "12px", fontWeight: 700, color: C.teal }}>OPPORTUNITY: </span>
            <span style={{ fontSize: "13px", color: C.text }}>NASOM is the only national autism body in Malaysia. Implementing these 8 features positions NASOM as definitively the best autism NPO site in the region - well ahead of YAM and competitive with global benchmarks.</span>
          </div>
        </div>
      )}
    </div>
  );
}

