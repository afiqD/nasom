import { useState } from "react";

const C = {
  bg: "#060b14", card: "#0c1624", border: "#1a2e48",
  text: "#e2e8f0", muted: "#64748b", navy: "#1A3A5C",
  blue: "#3b82f6", blueLt: "#dbeafe", teal: "#10b981", tealLt: "#d1fae5",
  amber: "#f59e0b", amberLt: "#fef3c7", red: "#ef4444", redLt: "#fee2e2",
  green: "#22c55e", greenLt: "#dcfce7", slate: "#64748b", slateLt: "#f1f5f9",
  purple: "#a855f7", purpleLt: "#f3e8ff",
};

const HEURISTICS = [
  {
    id: "H01", name: "Visibility of System Status", score: 2,
    findings: ["No breadcrumb trail on inner pages", "Active nav item not visually distinguished", "No progress indicator on multi-step forms"],
    recs: ["Add breadcrumbs to all inner pages", "Apply active state styling to current nav item", "Add step indicators to multi-step forms"],
    priority: "P1", effort: "Low"
  },
  {
    id: "H02", name: "Match Between System and Real World", score: 3,
    findings: ["Nav label 'Services' does not match NASOM's own language", "Jargon terms used without definitions", "Date formats inconsistent"],
    recs: ["Rename 'Services' to 'Our Programmes'", "Add inline tooltip for clinical/acronym terms", "Standardise date format sitewide"],
    priority: "P0", effort: "Low"
  },
  {
    id: "H03", name: "User Control and Freedom", score: 2,
    findings: ["No 'Back to...' link after CPT single pages", "Forms have no Cancel or Reset option", "Donation flow has no back-step"],
    recs: ["Add breadcrumb + sibling nav on CPT singles", "Add Cancel link on all forms", "Build donation flow with back-step support"],
    priority: "P1", effort: "Medium"
  },
  {
    id: "H04", name: "Consistency and Standards", score: 2,
    findings: ["3 different primary button variants observed", "H1 used multiple times per page", "Footer and header links overlap but differ"],
    recs: ["Define single CTA button component", "Enforce one H1 per page across all templates", "Align footer and header nav link sets"],
    priority: "P0", effort: "Low"
  },
  {
    id: "H05", name: "Error Prevention", score: 2,
    findings: ["Donation form allows empty amount submission", "Event registration allows past-date selection", "No confirmation before form submission"],
    recs: ["Add required validation on donation form", "Disable past dates in date pickers", "Add confirmation step before final submit"],
    priority: "P1", effort: "Medium"
  },
  {
    id: "H06", name: "Recognition Over Recall", score: 3,
    findings: ["No persistent Donate CTA in header", "Programme archive has no thumbnails or type tags", "No related content suggestions"],
    recs: ["Pin Donate as styled CTA button in header", "Add programme type icon/badge to archive", "Add Related Programmes block to CPT singles"],
    priority: "P0", effort: "Low"
  },
  {
    id: "H07", name: "Flexibility and Efficiency of Use", score: 2,
    findings: ["No search functionality on the site", "No filter or sort on listings", "No skip-nav link for keyboard users"],
    recs: ["Implement SearchWP + FacetWP filters", "Add filter bar to programme and event archives", "Add skip-to-content link as first focusable element"],
    priority: "P1", effort: "High"
  },
  {
    id: "H08", name: "Aesthetic and Minimalist Design", score: 2,
    findings: ["7+ competing CTAs on homepage", "Dense text blocks with no whitespace", "Footer has 30+ links with no grouping"],
    recs: ["Limit homepage to 2 primary CTAs above fold", "Break dense text into scannable chunks", "Restructure footer into 4-5 labelled columns"],
    priority: "P0", effort: "Medium"
  },
  {
    id: "H09", name: "Help Users Recognise and Recover from Errors", score: 2,
    findings: ["Generic error messages ('Required field')", "404 page provides no navigation", "Failed payment has no retry path"],
    recs: ["Rewrite all form errors to be specific", "Build custom 404 with search + popular pages", "Add Try Again to failed payment page"],
    priority: "P1", effort: "Low"
  },
  {
    id: "H10", name: "Help and Documentation", score: 1,
    findings: ["No FAQ for families navigating services", "No onboarding for new donors or volunteers", "No glossary of clinical terms"],
    recs: ["Add FAQ under What Is Autism (P1)", "Add onboarding email series for new donors", "Add autism glossary as Resources CPT entry"],
    priority: "P1", effort: "Medium"
  },
];

const UX_AREAS = [
  { area: "Navigation & Wayfinding", score: 2, issues: "No breadcrumbs, no active state, no search", fix: "Breadcrumbs, active nav, SearchWP" },
  { area: "Visual Hierarchy & CTAs", score: 2, issues: "7+ competing CTAs, 3 button variants", fix: "2 primary CTAs, design system" },
  { area: "Form Usability", score: 2, issues: "No validation, no confirmation, generic errors", fix: "Inline validation, confirm steps" },
  { area: "Content Clarity", score: 3, issues: "Jargon without context, dense text", fix: "Glossary tooltips, chunked layout" },
  { area: "Mobile Experience", score: 2, issues: "No skip-nav, small tap targets", fix: "Sticky Donate CTA, skip-nav, 44px min" },
  { area: "Error Handling", score: 1, issues: "Dead-end 404, no payment retry", fix: "Custom 404, payment retry flow" },
];

const FIXES = [
  { id: "UX-P0-01", fix: "Rename 'Services' to 'Our Programmes'", effort: "Low", priority: "P0", heuristic: "H02" },
  { id: "UX-P0-02", fix: "Pin Donate CTA button in header on all pages", effort: "Low", priority: "P0", heuristic: "H06" },
  { id: "UX-P0-03", fix: "Limit homepage hero to 2 primary CTAs", effort: "Low", priority: "P0", heuristic: "H08" },
  { id: "UX-P0-04", fix: "Enforce single CTA button style across templates", effort: "Low", priority: "P0", heuristic: "H04" },
  { id: "UX-P1-01", fix: "Add breadcrumbs to all inner page templates", effort: "Low", priority: "P1", heuristic: "H01" },
  { id: "UX-P1-02", fix: "Add skip-to-content as first focusable element", effort: "Low", priority: "P1", heuristic: "H07" },
  { id: "UX-P1-03", fix: "Build custom 404 with search + popular pages", effort: "Low", priority: "P1", heuristic: "H09" },
  { id: "UX-P1-04", fix: "Rewrite all form errors to be specific", effort: "Low", priority: "P1", heuristic: "H09" },
  { id: "UX-P1-05", fix: "Add programme type badge to archive listings", effort: "Medium", priority: "P1", heuristic: "H06" },
  { id: "UX-P1-06", fix: "Implement SearchWP + FacetWP on archives", effort: "High", priority: "P1", heuristic: "H07" },
];

const scoreColor = (s) => s <= 2 ? C.red : s === 3 ? C.amber : C.green;
const scoreBg = (s) => s <= 2 ? C.redLt : s === 3 ? C.amberLt : C.greenLt;
const priColor = (p) => p === "P0" ? C.red : p === "P1" ? C.blue : C.teal;
const effortColor = (e) => e === "High" ? C.red : e === "Medium" ? C.amber : C.teal;

const overallScore = Math.round(HEURISTICS.reduce((s, h) => s + h.score, 0) / HEURISTICS.length * 10) / 10;

const TABS = ["Scorecard", "Heuristics Detail", "UX Areas", "Fix List"];

export default function UsabilityDashboard() {
  const [tab, setTab] = useState(0);
  const [selected, setSelected] = useState(null);
  const [filter, setFilter] = useState("All");

  const filtered = filter === "All" ? HEURISTICS :
    filter === "P0" ? HEURISTICS.filter(h => h.priority === "P0") :
    filter === "Low Score" ? HEURISTICS.filter(h => h.score <= 2) :
    HEURISTICS.filter(h => h.effort === filter);

  const sel = selected !== null ? HEURISTICS.find(h => h.id === selected) : null;

  return (
    <div style={{ background: C.bg, minHeight: "100vh", fontFamily: "system-ui,sans-serif", color: C.text, padding: "24px" }}>

      {/* Header */}
      <div style={{ marginBottom: "24px" }}>
        <div style={{ fontSize: "11px", color: C.muted, letterSpacing: "2px", textTransform: "uppercase", marginBottom: "6px" }}>NASOM.ORG.MY — UX AUDIT</div>
        <div style={{ display: "flex", alignItems: "flex-end", gap: "16px", flexWrap: "wrap" }}>
          <h1 style={{ margin: 0, fontSize: "22px", fontWeight: 700, color: C.text }}>Website Usability Heuristics Audit</h1>
          <div style={{ background: scoreBg(overallScore), color: scoreColor(overallScore), borderRadius: "6px", padding: "4px 14px", fontWeight: 700, fontSize: "15px" }}>
            Overall: {overallScore}/5
          </div>
        </div>
        <div style={{ marginTop: "6px", fontSize: "13px", color: C.muted }}>Nielsen&apos;s 10 Heuristics &nbsp;·&nbsp; 10 criteria assessed &nbsp;·&nbsp; {FIXES.filter(f => f.priority === "P0").length} P0 fixes identified</div>
      </div>

      {/* Stats bar */}
      <div style={{ display: "flex", gap: "12px", marginBottom: "20px", flexWrap: "wrap" }}>
        {[
          { label: "Overall Score", val: overallScore + "/5", color: scoreColor(overallScore) },
          { label: "Critical (≤2/5)", val: HEURISTICS.filter(h => h.score <= 2).length, color: C.red },
          { label: "P0 Fixes", val: FIXES.filter(f => f.priority === "P0").length, color: C.red },
          { label: "Low Effort P0", val: FIXES.filter(f => f.priority === "P0" && f.effort === "Low").length, color: C.teal },
          { label: "Total Fixes", val: FIXES.length, color: C.blue },
        ].map(s => (
          <div key={s.label} style={{ background: C.card, border: "1px solid " + C.border, borderRadius: "8px", padding: "12px 18px", minWidth: "110px" }}>
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
            border: "none", borderRadius: "6px 6px 0 0", padding: "8px 18px",
            cursor: "pointer", fontSize: "13px", fontWeight: tab === i ? 700 : 400
          }}>{t}</button>
        ))}
      </div>

      {/* TAB 0: SCORECARD */}
      {tab === 0 && (
        <div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "12px" }}>
            {HEURISTICS.map(h => (
              <div key={h.id} onClick={() => { setSelected(h.id); setTab(1); }}
                style={{ background: C.card, border: "1px solid " + C.border, borderRadius: "10px", padding: "16px", cursor: "pointer",
                  borderLeft: "4px solid " + scoreColor(h.score) }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "8px" }}>
                  <span style={{ fontSize: "11px", color: C.muted, fontFamily: "monospace" }}>{h.id}</span>
                  <span style={{ background: scoreBg(h.score), color: scoreColor(h.score), borderRadius: "4px", padding: "2px 8px", fontWeight: 700, fontSize: "13px" }}>{h.score}/5</span>
                </div>
                <div style={{ fontSize: "13px", fontWeight: 600, color: C.text, marginBottom: "8px", lineHeight: 1.4 }}>{h.name}</div>
                <div style={{ display: "flex", gap: "6px" }}>
                  <span style={{ background: priColor(h.priority) + "22", color: priColor(h.priority), borderRadius: "4px", padding: "2px 7px", fontSize: "11px", fontWeight: 700 }}>{h.priority}</span>
                  <span style={{ background: effortColor(h.effort) + "22", color: effortColor(h.effort), borderRadius: "4px", padding: "2px 7px", fontSize: "11px" }}>{h.effort} effort</span>
                </div>
                {/* Score bar */}
                <div style={{ marginTop: "10px", background: C.border, borderRadius: "4px", height: "4px" }}>
                  <div style={{ background: scoreColor(h.score), borderRadius: "4px", height: "4px", width: (h.score / 5 * 100) + "%" }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 1: HEURISTICS DETAIL */}
      {tab === 1 && (
        <div style={{ display: "flex", gap: "16px" }}>
          {/* Left list */}
          <div style={{ width: "220px", flexShrink: 0 }}>
            <div style={{ marginBottom: "8px" }}>
              {["All", "P0", "Low Score", "Low", "Medium", "High"].map(f => (
                <button key={f} onClick={() => setFilter(f)} style={{
                  display: "block", width: "100%", textAlign: "left",
                  background: filter === f ? C.blue + "22" : "transparent",
                  color: filter === f ? C.blue : C.muted,
                  border: "none", borderRadius: "4px", padding: "6px 10px",
                  cursor: "pointer", fontSize: "12px", marginBottom: "2px"
                }}>{f}</button>
              ))}
            </div>
            <div style={{ marginTop: "12px" }}>
              {filtered.map(h => (
                <div key={h.id} onClick={() => setSelected(selected === h.id ? null : h.id)}
                  style={{ background: selected === h.id ? C.blue + "22" : C.card,
                    border: "1px solid " + (selected === h.id ? C.blue : C.border),
                    borderRadius: "6px", padding: "10px 12px", marginBottom: "6px", cursor: "pointer" }}>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span style={{ fontSize: "11px", fontFamily: "monospace", color: C.muted }}>{h.id}</span>
                    <span style={{ fontSize: "12px", fontWeight: 700, color: scoreColor(h.score) }}>{h.score}/5</span>
                  </div>
                  <div style={{ fontSize: "12px", color: C.text, marginTop: "4px", lineHeight: 1.3 }}>{h.name}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right detail */}
          <div style={{ flex: 1 }}>
            {sel ? (
              <div>
                <div style={{ background: C.card, border: "1px solid " + C.border, borderRadius: "10px", padding: "20px", marginBottom: "16px",
                  borderLeft: "5px solid " + scoreColor(sel.score) }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "12px" }}>
                    <div>
                      <span style={{ fontSize: "11px", fontFamily: "monospace", color: C.muted }}>{sel.id}</span>
                      <h2 style={{ margin: "4px 0 0", fontSize: "18px", color: C.text }}>{sel.name}</h2>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <div style={{ background: scoreBg(sel.score), color: scoreColor(sel.score), borderRadius: "6px", padding: "4px 14px", fontWeight: 700, fontSize: "20px" }}>{sel.score}/5</div>
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: "8px" }}>
                    <span style={{ background: priColor(sel.priority) + "22", color: priColor(sel.priority), borderRadius: "4px", padding: "3px 10px", fontSize: "12px", fontWeight: 700 }}>{sel.priority}</span>
                    <span style={{ background: effortColor(sel.effort) + "22", color: effortColor(sel.effort), borderRadius: "4px", padding: "3px 10px", fontSize: "12px" }}>{sel.effort} effort</span>
                  </div>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                  <div style={{ background: C.redLt + "33", border: "1px solid " + C.red + "44", borderRadius: "8px", padding: "16px" }}>
                    <div style={{ fontSize: "12px", fontWeight: 700, color: C.red, marginBottom: "10px", textTransform: "uppercase", letterSpacing: "1px" }}>Findings</div>
                    {sel.findings.map((f, i) => (
                      <div key={i} style={{ display: "flex", gap: "8px", marginBottom: "8px" }}>
                        <span style={{ color: C.red, fontSize: "14px", flexShrink: 0, marginTop: "1px" }}>-</span>
                        <span style={{ fontSize: "13px", color: C.text, lineHeight: 1.5 }}>{f}</span>
                      </div>
                    ))}
                  </div>
                  <div style={{ background: C.tealLt + "33", border: "1px solid " + C.teal + "44", borderRadius: "8px", padding: "16px" }}>
                    <div style={{ fontSize: "12px", fontWeight: 700, color: C.teal, marginBottom: "10px", textTransform: "uppercase", letterSpacing: "1px" }}>Recommendations</div>
                    {sel.recs.map((r, i) => (
                      <div key={i} style={{ display: "flex", gap: "8px", marginBottom: "8px" }}>
                        <span style={{ color: C.teal, fontSize: "14px", flexShrink: 0, marginTop: "1px" }}>-</span>
                        <span style={{ fontSize: "13px", color: C.text, lineHeight: 1.5 }}>{r}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div style={{ color: C.muted, fontSize: "14px", padding: "40px", textAlign: "center" }}>
                Select a heuristic from the list to see findings and recommendations
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 2: UX AREAS */}
      {tab === 2 && (
        <div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "14px" }}>
            {UX_AREAS.map(a => (
              <div key={a.area} style={{ background: C.card, border: "1px solid " + C.border, borderRadius: "10px", padding: "18px",
                borderTop: "4px solid " + scoreColor(a.score) }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "12px" }}>
                  <span style={{ fontSize: "14px", fontWeight: 700, color: C.text }}>{a.area}</span>
                  <span style={{ background: scoreBg(a.score), color: scoreColor(a.score), borderRadius: "4px", padding: "2px 10px", fontWeight: 700, fontSize: "14px" }}>{a.score}/5</span>
                </div>
                <div style={{ background: C.border, borderRadius: "4px", height: "6px", marginBottom: "12px" }}>
                  <div style={{ background: scoreColor(a.score), borderRadius: "4px", height: "6px", width: (a.score / 5 * 100) + "%" }}></div>
                </div>
                <div style={{ marginBottom: "8px" }}>
                  <span style={{ fontSize: "11px", color: C.red, fontWeight: 600, textTransform: "uppercase" }}>Issues: </span>
                  <span style={{ fontSize: "12px", color: C.text }}>{a.issues}</span>
                </div>
                <div>
                  <span style={{ fontSize: "11px", color: C.teal, fontWeight: 600, textTransform: "uppercase" }}>Fix: </span>
                  <span style={{ fontSize: "12px", color: C.text }}>{a.fix}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: FIX LIST */}
      {tab === 3 && (
        <div>
          <div style={{ marginBottom: "16px", display: "flex", gap: "8px" }}>
            {["All", "P0", "P1"].map(f => (
              <button key={f} onClick={() => setFilter(f)} style={{
                background: filter === f ? C.blue : C.card, color: filter === f ? "#fff" : C.muted,
                border: "1px solid " + C.border, borderRadius: "6px", padding: "6px 16px",
                cursor: "pointer", fontSize: "12px", fontWeight: 600
              }}>{f}</button>
            ))}
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            {FIXES.filter(f => filter === "All" || f.priority === filter).map((fix, i) => (
              <div key={fix.id} style={{ background: C.card, border: "1px solid " + C.border, borderRadius: "8px", padding: "14px 18px",
                display: "flex", alignItems: "center", gap: "16px", flexWrap: "wrap",
                borderLeft: "4px solid " + priColor(fix.priority) }}>
                <span style={{ fontSize: "11px", fontFamily: "monospace", color: C.muted, minWidth: "90px" }}>{fix.id}</span>
                <span style={{ flex: 1, fontSize: "13px", color: C.text, minWidth: "200px" }}>{fix.fix}</span>
                <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                  <span style={{ background: effortColor(fix.effort) + "22", color: effortColor(fix.effort), borderRadius: "4px", padding: "2px 8px", fontSize: "11px" }}>{fix.effort}</span>
                  <span style={{ background: priColor(fix.priority) + "22", color: priColor(fix.priority), borderRadius: "4px", padding: "2px 8px", fontSize: "11px", fontWeight: 700 }}>{fix.priority}</span>
                  <span style={{ fontSize: "11px", fontFamily: "monospace", color: C.muted }}>{fix.heuristic}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

