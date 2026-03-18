import { useState } from "react";

const C = {
  navy: "#1A3A5C", navyDk: "#0F2540",
  blue: "#1E6FA8", blueLt: "#D6EAF8",
  teal: "#117A65", tealLt: "#D1F2EB",
  amber: "#A04000", amberLt: "#FDEBD0",
  red: "#922B21", redLt: "#FADBD8",
  slate: "#5D6D7E", slateLt: "#EAECEE",
  white: "#FFFFFF", off: "#F8FAFB",
  border: "#CDD3D8", body: "#2C3E50",
  green: "#1E8449", greenLt: "#D5F5E3",
};

const TREE = [
  { id: "home",       l: 0, label: "Home",                     url: "/",                                  pri: "P0", status: "Keep",    children: [] },
  { id: "about",      l: 0, label: "About NASOM",              url: "/about",                             pri: "P1", status: "Rename",  children: [
    { id: "about-board",    l: 1, label: "Board of Directors",       url: "/about/board",                       pri: "P1", status: "New CPT" },
    { id: "about-past",     l: 1, label: "Past Presidents",          url: "/about/past-presidents",             pri: "P2", status: "New CPT" },
    { id: "about-partners", l: 1, label: "Partners & Sponsors",      url: "/about/partners",                    pri: "P2", status: "New" },
    { id: "about-reports",  l: 1, label: "Annual Reports",           url: "/about/annual-reports",              pri: "P2", status: "New CPT" },
  ]},
  { id: "autism",     l: 0, label: "What Is Autism",           url: "/what-is-autism",                    pri: "P1", status: "Revise",  children: [
    { id: "autism-signs",   l: 1, label: "Learn the Signs",          url: "/what-is-autism/signs",              pri: "P1", status: "Revise" },
    { id: "autism-causes",  l: 1, label: "What Causes Autism",       url: "/what-is-autism/causes",             pri: "P2", status: "Revise" },
    { id: "autism-diag",    l: 1, label: "Getting a Diagnosis",      url: "/what-is-autism/diagnosis",          pri: "P1", status: "New",    highlight: true },
    { id: "autism-faq",     l: 1, label: "FAQ",                      url: "/what-is-autism/faq",                pri: "P2", status: "New" },
  ]},
  { id: "prog",       l: 0, label: "Our Programmes",           url: "/programmes",                        pri: "P0", status: "New CPT", highlight: true, megamenu: true, children: [
    { id: "prog-ei",        l: 1, label: "Early Intervention",       url: "/programmes/early-intervention",     pri: "P0", status: "New CPT", group: "Children (0-13)" },
    { id: "prog-ii",        l: 1, label: "Intensive Intervention",   url: "/programmes/intensive-intervention", pri: "P0", status: "New CPT", group: "Children (0-13)" },
    { id: "prog-assess",    l: 1, label: "Assessment & Diagnosis",   url: "/programmes/assessment",             pri: "P0", status: "New CPT", highlight: true, group: "Assessment & Therapy" },
    { id: "prog-therapy",   l: 1, label: "Therapy Programmes",       url: "/programmes/therapy",                pri: "P0", status: "New CPT", group: "Assessment & Therapy" },
    { id: "prog-prevoc",    l: 1, label: "Pre-Vocational",           url: "/programmes/pre-vocational",         pri: "P1", status: "New CPT", group: "Children (0-13)" },
    { id: "prog-voc",       l: 1, label: "Vocational Training",      url: "/programmes/vocational",             pri: "P1", status: "New CPT", group: "Adults (14+)" },
    { id: "prog-res",       l: 1, label: "Residential",              url: "/programmes/residential",            pri: "P1", status: "New CPT", group: "Adults (14+)" },
  ]},
  { id: "centres",    l: 0, label: "Our Centres",              url: "/centres",                           pri: "P0", status: "New CPT", highlight: true, children: [
    { id: "centres-map",    l: 1, label: "Find a Centre (Map)",      url: "/centres/map",                       pri: "P0", status: "New",    highlight: true },
    { id: "centres-hq",     l: 1, label: "Ara Damansara (HQ)",       url: "/centres/ara-damansara",             pri: "P0", status: "New CPT" },
    { id: "centres-tp",     l: 1, label: "Teluk Pulai",              url: "/centres/teluk-pulai",               pri: "P1", status: "New CPT" },
  ]},
  { id: "involve",    l: 0, label: "Get Involved",             url: "/get-involved",                      pri: "P0", status: "Revise",  children: [
    { id: "involve-donate", l: 1, label: "Donate",                   url: "/get-involved/donate",               pri: "P0", status: "Revise",  highlight: true },
    { id: "involve-vol",    l: 1, label: "Volunteer",                url: "/get-involved/volunteer",            pri: "P1", status: "Revise" },
    { id: "involve-fund",   l: 1, label: "Fundraise",                url: "/get-involved/fundraise",            pri: "P1", status: "Revise" },
    { id: "involve-mem",    l: 1, label: "Become a Member",          url: "/get-involved/membership",           pri: "P1", status: "Revise" },
    { id: "involve-corp",   l: 1, label: "Corporate Partnerships",   url: "/get-involved/corporate",            pri: "P1", status: "New",    highlight: true },
  ]},
  { id: "news",       l: 0, label: "News & Stories",           url: "/news",                              pri: "P1", status: "New",    highlight: true, children: [
    { id: "news-article",   l: 1, label: "[Article]",               url: "/news/[slug]",                       pri: "P1", status: "New" },
    { id: "news-recap",     l: 1, label: "Events Recaps",            url: "/news/category/events-recap",        pri: "P2", status: "New" },
  ]},
  { id: "events",     l: 0, label: "Events",                   url: "/events",                            pri: "P1", status: "Promote", children: [
    { id: "events-upcoming",l: 1, label: "Upcoming Events",          url: "/events/category/upcoming",          pri: "P1", status: "Active" },
    { id: "events-past",    l: 1, label: "Past Events",              url: "/events/category/past",              pri: "P2", status: "New" },
  ]},
  { id: "resources",  l: 0, label: "Resources",                url: "/resources",                         pri: "P1", status: "New CPT", highlight: true, children: [
    { id: "res-guides",     l: 1, label: "Guides & Fact Sheets",     url: "/resources/guides",                  pri: "P1", status: "New CPT" },
    { id: "res-research",   l: 1, label: "Research",                 url: "/resources/research",                pri: "P1", status: "New CPT" },
  ]},
  { id: "careers",    l: 0, label: "Careers",                  url: "/careers",                           pri: "P1", status: "Rebuild", children: [
    { id: "careers-jobs",   l: 1, label: "[Job Listing]",            url: "/careers/[slug]",                    pri: "P1", status: "New CPT" },
  ]},
  { id: "gallery",    l: 0, label: "Gallery",                  url: "/gallery",                           pri: "P2", status: "Rename",  children: [] },
  { id: "contact",    l: 0, label: "Contact Us",               url: "/contact",                           pri: "P1", status: "Keep",    children: [] },
];

const MOBILE_NAV = [
  { tier: "T1", label: "Home",                     action: "Direct link",    note: "" },
  { tier: "T1", label: "About NASOM",              action: "Accordion",      note: "" },
  { tier: "T2", label: "Board of Directors",        action: "Link",           note: "" },
  { tier: "T2", label: "Past Presidents",           action: "Link",           note: "" },
  { tier: "T2", label: "Partners & Sponsors",       action: "Link",           note: "" },
  { tier: "T2", label: "Annual Reports",            action: "Link",           note: "" },
  { tier: "T1", label: "What Is Autism",            action: "Accordion",      note: "" },
  { tier: "T2", label: "Learn the Signs",           action: "Link",           note: "" },
  { tier: "T2", label: "Getting a Diagnosis",       action: "Link",           note: "High-intent", highlight: true },
  { tier: "T2", label: "What Causes Autism",        action: "Link",           note: "" },
  { tier: "T2", label: "FAQ",                       action: "Link",           note: "" },
  { tier: "T1", label: "Our Programmes",            action: "Accordion",      note: "Flat list on mobile" },
  { tier: "T2", label: "Early Intervention",        action: "Link",           note: "" },
  { tier: "T2", label: "Intensive Intervention",    action: "Link",           note: "" },
  { tier: "T2", label: "Assessment & Diagnosis",    action: "Link",           note: "" },
  { tier: "T2", label: "Therapy Programmes",        action: "Link",           note: "" },
  { tier: "T2", label: "Pre-Vocational",            action: "Link",           note: "" },
  { tier: "T2", label: "Vocational Training",       action: "Link",           note: "" },
  { tier: "T2", label: "Residential",               action: "Link",           note: "" },
  { tier: "T1", label: "Our Centres",               action: "Accordion",      note: "" },
  { tier: "T2", label: "Find a Centre (Map)",       action: "Link",           note: "First item", highlight: true },
  { tier: "T2", label: "Ara Damansara (HQ)",        action: "Link",           note: "" },
  { tier: "T2", label: "Teluk Pulai",               action: "Link",           note: "" },
  { tier: "T1", label: "Get Involved",              action: "Accordion",      note: "" },
  { tier: "T2", label: "Donate",                    action: "Link",           note: "Accent colour", highlight: true },
  { tier: "T2", label: "Volunteer",                 action: "Link",           note: "" },
  { tier: "T2", label: "Fundraise",                 action: "Link",           note: "" },
  { tier: "T2", label: "Become a Member",           action: "Link",           note: "" },
  { tier: "T2", label: "Corporate Partnerships",    action: "Link",           note: "" },
  { tier: "T1", label: "News & Stories",            action: "Direct link",    note: "" },
  { tier: "T1", label: "Events",                    action: "Direct link",    note: "" },
  { tier: "T1", label: "Resources",                 action: "Direct link",    note: "" },
  { tier: "T1", label: "Careers",                   action: "Direct link",    note: "" },
  { tier: "T1", label: "Contact Us",                action: "Direct link",    note: "Bottom of drawer" },
  { tier: "CTA", label: "DONATE BUTTON",            action: "Sticky CTA",     note: "Outside drawer. Always visible.", highlight: true },
];

const UX_RULES = [
  { rule: "Donate CTA always visible", scope: "Both",    detail: "Persistent in header at all breakpoints. Never hidden in dropdown." },
  { rule: "9 primary nav items",       scope: "Desktop", detail: "Fits 1280px at 14-15px. At 1024px collapse Careers into a 'More' overflow dropdown." },
  { rule: "Mega-menu for Programmes",  scope: "Desktop", detail: "7 children need grouping by age/type. Mega-menu also surfaces names to SEO crawlers." },
  { rule: "Map link first in Centres", scope: "Both",    detail: "'Find a Centre (Map)' as first child. Parents searching locally are high-intent." },
  { rule: "Accordion on mobile",       scope: "Mobile",  detail: "Avoid nested menus. All children at one level. Accordions are faster and accessible." },
  { rule: "Sticky header on scroll",   scope: "Both",    detail: "Header (logo + nav + Donate CTA) stays fixed. Critical for conversion on long pages." },
  { rule: "Active state on current",   scope: "Desktop", detail: "Current L0 item highlighted via underline or colour. Essential in Programmes section." },
  { rule: "Language toggle (BM/EN)",   scope: "Both",    detail: "Compact toggle in header utility bar. Not hidden in footer." },
  { rule: "Contact Us in footer",      scope: "Both",    detail: "Once Centres + Get Involved established, Contact can move to footer-only." },
];

function priColor(p) {
  if (p === "P0") return { bg: C.redLt,   text: C.red };
  if (p === "P1") return { bg: C.blueLt,  text: C.blue };
  return                  { bg: C.tealLt, text: C.teal };
}

function statusColor(s) {
  if (s === "New CPT")  return { bg: C.blueLt,  text: C.blue };
  if (s === "New")      return { bg: C.tealLt,  text: C.teal };
  if (s === "Rebuild")  return { bg: C.redLt,   text: C.red };
  if (s === "Revise")   return { bg: C.amberLt, text: C.amber };
  if (s === "Promote")  return { bg: C.amberLt, text: C.amber };
  if (s === "Active")   return { bg: C.greenLt, text: C.green };
  return                       { bg: C.slateLt, text: C.slate };
}

function Badge({ label, bg, text, small }) {
  return (
    <span style={{
      background: bg, color: text,
      fontSize: small ? 10 : 11, fontWeight: 700,
      padding: small ? "1px 5px" : "2px 7px",
      borderRadius: 3, whiteSpace: "nowrap",
      fontFamily: "monospace", letterSpacing: "0.02em"
    }}>{label}</span>
  );
}

// ── TAB 1: SITE TREE ─────────────────────────────────────────────────────────

function TreeNode({ node, expanded, onToggle }) {
  const hasChildren = node.children && node.children.length > 0;
  const isOpen = expanded[node.id];
  const pc = priColor(node.pri);
  const sc = statusColor(node.status);

  return (
    <div>
      <div
        onClick={() => hasChildren && onToggle(node.id)}
        style={{
          display: "flex", alignItems: "center", gap: 8,
          padding: "7px 12px",
          background: node.highlight ? "#EBF5FB" : C.white,
          borderLeft: node.highlight ? "3px solid " + C.blue : "3px solid transparent",
          cursor: hasChildren ? "pointer" : "default",
          borderRadius: 4, marginBottom: 2,
          transition: "background 0.15s"
        }}
      >
        <span style={{ fontSize: 12, color: C.slate, fontFamily: "monospace", minWidth: 16 }}>
          {hasChildren ? (isOpen ? "▾" : "▸") : "·"}
        </span>
        <span style={{
          fontWeight: node.l === 0 ? 700 : 400,
          fontSize: node.l === 0 ? 14 : 13,
          color: node.l === 0 ? C.navy : C.body,
          fontFamily: "Inter, system-ui, sans-serif",
          flex: 1
        }}>
          {node.l === 0 ? node.label.toUpperCase() : node.label}
          {node.megamenu && <span style={{ marginLeft: 6, fontSize: 10, background: C.amberLt, color: C.amber, padding: "1px 5px", borderRadius: 3, fontWeight: 700 }}>MEGA</span>}
        </span>
        <span style={{ fontFamily: "monospace", fontSize: 11, color: C.slate, marginRight: 8 }}>{node.url}</span>
        <Badge label={node.pri} bg={pc.bg} text={pc.text} small />
        <span style={{ display: "inline-block", width: 8 }} />
        <Badge label={node.status} bg={sc.bg} text={sc.text} small />
      </div>

      {hasChildren && isOpen && (
        <div style={{ marginLeft: 28, borderLeft: "1px dashed " + C.border, paddingLeft: 12 }}>
          {node.children.map(child => (
            <div key={child.id} style={{
              display: "flex", alignItems: "center", gap: 8,
              padding: "5px 10px", marginBottom: 2,
              background: child.highlight ? "#EBF5FB" : C.off,
              borderRadius: 3,
              borderLeft: child.highlight ? "2px solid " + C.blue : "2px solid transparent",
            }}>
              <span style={{ fontSize: 10, color: C.slate }}>─</span>
              <span style={{ fontSize: 13, color: C.body, flex: 1 }}>{child.label}</span>
              <span style={{ fontFamily: "monospace", fontSize: 10, color: C.slate, marginRight: 8 }}>{child.url}</span>
              <Badge label={child.pri} bg={priColor(child.pri).bg} text={priColor(child.pri).text} small />
              <span style={{ display: "inline-block", width: 6 }} />
              <Badge label={child.status} bg={statusColor(child.status).bg} text={statusColor(child.status).text} small />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function TreeTab() {
  const [expanded, setExpanded] = useState({});
  const [filter, setFilter] = useState("all");

  const toggle = (id) => setExpanded(p => ({ ...p, [id]: !p[id] }));
  const expandAll = () => {
    const s = {};
    TREE.forEach(n => { if (n.children && n.children.length) s[n.id] = true; });
    setExpanded(s);
  };
  const collapseAll = () => setExpanded({});

  const filtered = filter === "all" ? TREE
    : filter === "p0" ? TREE.filter(n => n.pri === "P0")
    : filter === "new" ? TREE.filter(n => n.status === "New" || n.status === "New CPT")
    : TREE;

  return (
    <div>
      {/* Stats bar */}
      <div style={{ display: "flex", gap: 12, marginBottom: 16, flexWrap: "wrap" }}>
        {[
          { label: "P0 sections", val: TREE.filter(n => n.pri === "P0").length, bg: C.redLt, text: C.red },
          { label: "P1 sections", val: TREE.filter(n => n.pri === "P1").length, bg: C.blueLt, text: C.blue },
          { label: "P2 sections", val: TREE.filter(n => n.pri === "P2").length, bg: C.tealLt, text: C.teal },
          { label: "New CPTs",    val: TREE.filter(n => n.status === "New CPT").length + TREE.flatMap(n => n.children || []).filter(c => c.status === "New CPT").length, bg: C.blueLt, text: C.blue },
          { label: "Total pages", val: TREE.length + TREE.reduce((a, n) => a + (n.children ? n.children.length : 0), 0), bg: C.slateLt, text: C.slate },
        ].map(s => (
          <div key={s.label} style={{ background: s.bg, borderRadius: 6, padding: "6px 14px", display: "flex", flexDirection: "column", alignItems: "center" }}>
            <span style={{ fontSize: 20, fontWeight: 800, color: s.text }}>{s.val}</span>
            <span style={{ fontSize: 10, color: s.text, opacity: 0.8 }}>{s.label}</span>
          </div>
        ))}
      </div>

      {/* Controls */}
      <div style={{ display: "flex", gap: 8, marginBottom: 12, alignItems: "center" }}>
        <span style={{ fontSize: 12, color: C.slate }}>Filter:</span>
        {[["all","All"],["p0","P0 Only"],["new","New Only"]].map(([v,l]) => (
          <button key={v} onClick={() => setFilter(v)} style={{
            padding: "3px 10px", borderRadius: 4, fontSize: 12, cursor: "pointer",
            border: "1px solid " + (filter === v ? C.blue : C.border),
            background: filter === v ? C.blueLt : C.white,
            color: filter === v ? C.blue : C.slate, fontWeight: filter === v ? 700 : 400
          }}>{l}</button>
        ))}
        <span style={{ flex: 1 }} />
        <button onClick={expandAll} style={{ padding: "3px 10px", borderRadius: 4, fontSize: 12, cursor: "pointer", border: "1px solid " + C.border, background: C.white, color: C.slate }}>Expand All</button>
        <button onClick={collapseAll} style={{ padding: "3px 10px", borderRadius: 4, fontSize: 12, cursor: "pointer", border: "1px solid " + C.border, background: C.white, color: C.slate }}>Collapse All</button>
      </div>

      {/* Legend */}
      <div style={{ display: "flex", gap: 10, marginBottom: 12, flexWrap: "wrap" }}>
        {[
          { label: "P0 - Build first", bg: C.redLt, text: C.red },
          { label: "P1 - Phase 2",     bg: C.blueLt, text: C.blue },
          { label: "P2 - Phase 3",     bg: C.tealLt, text: C.teal },
          { label: "New CPT",          bg: C.blueLt, text: C.blue },
          { label: "Mega-menu",        bg: C.amberLt, text: C.amber },
        ].map(l => <Badge key={l.label} label={l.label} bg={l.bg} text={l.text} />)}
        <span style={{ fontSize: 11, color: C.slate, display: "flex", alignItems: "center" }}>
          <span style={{ background: C.blueLt, width: 4, height: 16, display: "inline-block", borderRadius: 2, marginRight: 4 }} />Highlighted = high priority
        </span>
      </div>

      {/* Tree */}
      <div style={{ border: "1px solid " + C.border, borderRadius: 6, overflow: "hidden" }}>
        <div style={{ background: C.navy, padding: "8px 14px", display: "flex", gap: 8 }}>
          <span style={{ fontSize: 12, fontWeight: 700, color: C.white, flex: 1 }}>Page / Label</span>
          <span style={{ fontSize: 12, color: "#AED6F1", fontFamily: "monospace", width: 220 }}>URL</span>
          <span style={{ fontSize: 12, color: "#AED6F1", width: 40 }}>Pri</span>
          <span style={{ fontSize: 12, color: "#AED6F1", width: 72 }}>Status</span>
        </div>
        <div style={{ padding: "8px 6px", maxHeight: 520, overflowY: "auto" }}>
          {filtered.map(node => (
            <TreeNode key={node.id} node={node} expanded={expanded} onToggle={toggle} />
          ))}
        </div>
      </div>
    </div>
  );
}

// ── TAB 2: DESKTOP NAV ───────────────────────────────────────────────────────

const DESKTOP_NAV_DATA = [
  { label: "About NASOM",   pri: "P1", type: "Dropdown",  children: ["Board of Directors","Past Presidents & Chairmen","Partners & Sponsors","Annual Reports"], notes: "Hover dropdown. 4 items." },
  { label: "What Is Autism",pri: "P1", type: "Dropdown",  children: ["Learn the Signs","What Causes Autism","Getting a Diagnosis","FAQ"], notes: "Awareness funnel. Diagnosis drives to Assessment." },
  { label: "Our Programmes",pri: "P0", type: "Mega-menu", groups: [
    { g: "Children (0-13)", items: ["Early Intervention","Intensive Intervention","Pre-Vocational"] },
    { g: "Adults (14+)",    items: ["Vocational Training","Residential"] },
    { g: "Assessment & Therapy", items: ["Assessment & Diagnosis","Therapy Programmes"] },
  ], notes: "MEGA-MENU: 7 children grouped by age/type." },
  { label: "Our Centres",   pri: "P0", type: "Dropdown",  children: ["Find a Centre (Map)","Ara Damansara (HQ)","Teluk Pulai","All Centres"], notes: "Map as first item. Critical for local discovery." },
  { label: "Get Involved",  pri: "P0", type: "Dropdown",  children: ["Donate","Volunteer","Fundraise","Become a Member","Corporate Partnerships"], notes: "Primary conversion hub. Donate also as header CTA button." },
  { label: "News & Stories",pri: "P1", type: "Dropdown",  children: ["Latest Articles","Events Recaps"], notes: "Light dropdown or direct link." },
  { label: "Events",        pri: "P1", type: "Dropdown",  children: ["Upcoming Events","Past Events"], notes: "Promoted from under Gallery." },
  { label: "Resources",     pri: "P1", type: "Dropdown",  children: ["Guides & Fact Sheets","Research","Annual Reports"], notes: "Simple dropdown." },
  { label: "Careers",       pri: "P1", type: "Direct",    children: ["Current Openings"], notes: "Direct link or minimal dropdown." },
];

function DesktopNavTab() {
  const [active, setActive] = useState(null);

  return (
    <div>
      {/* Header diagram */}
      <div style={{ background: C.navy, borderRadius: 6, padding: "6px 10px", marginBottom: 16, fontSize: 11, color: "#AED6F1", fontWeight: 600, letterSpacing: "0.05em" }}>
        DESKTOP HEADER LAYOUT
      </div>
      <div style={{ display: "flex", marginBottom: 20, border: "1px solid " + C.border, borderRadius: 6, overflow: "hidden" }}>
        <div style={{ background: C.navy, color: C.white, padding: "14px 16px", textAlign: "center", width: 100, flexShrink: 0 }}>
          <div style={{ fontSize: 13, fontWeight: 800 }}>NASOM</div>
          <div style={{ fontSize: 10, color: "#AED6F1" }}>LOGO</div>
        </div>
        <div style={{ flex: 1, background: "#EBF5FB", padding: "10px 16px", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ fontSize: 11, color: C.navy, textAlign: "center" }}>
            <div style={{ fontWeight: 700, marginBottom: 3 }}>PRIMARY NAVIGATION</div>
            <div style={{ color: C.slate, fontSize: 10 }}>About | Programmes | Centres | Get Involved | News | Events | Resources | Careers</div>
          </div>
        </div>
        <div style={{ background: C.greenLt, color: C.teal, padding: "14px 12px", textAlign: "center", width: 70, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <span style={{ fontSize: 12 }}>Search</span>
        </div>
        <div style={{ background: C.redLt, color: C.red, padding: "14px 14px", textAlign: "center", width: 90, flexShrink: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
          <div style={{ fontSize: 13, fontWeight: 800 }}>DONATE</div>
          <div style={{ fontSize: 9, color: C.slate }}>always visible</div>
        </div>
      </div>

      {/* Nav items */}
      <div style={{ fontSize: 12, color: C.slate, marginBottom: 8 }}>Click a nav item to see its dropdown / mega-menu structure:</div>
      <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 16 }}>
        {DESKTOP_NAV_DATA.map((item, i) => {
          const pc = priColor(item.pri);
          const isActive = active === i;
          return (
            <button key={i} onClick={() => setActive(isActive ? null : i)} style={{
              padding: "6px 12px", borderRadius: 5, cursor: "pointer", fontSize: 13, fontWeight: 600,
              border: "2px solid " + (isActive ? C.navy : C.border),
              background: isActive ? C.navy : C.white,
              color: isActive ? C.white : C.navy,
              transition: "all 0.15s",
              position: "relative"
            }}>
              {item.label}
              <span style={{
                position: "absolute", top: -6, right: -6,
                background: pc.bg, color: pc.text,
                fontSize: 9, fontWeight: 800, padding: "1px 4px", borderRadius: 3
              }}>{item.pri}</span>
            </button>
          );
        })}
        <div style={{
          padding: "6px 14px", borderRadius: 5, fontSize: 13, fontWeight: 800,
          background: C.red, color: C.white, border: "2px solid " + C.red
        }}>DONATE ⭐</div>
      </div>

      {/* Dropdown panel */}
      {active !== null && (
        <div style={{ border: "2px solid " + C.navy, borderRadius: 6, overflow: "hidden", marginBottom: 16 }}>
          <div style={{ background: C.navy, padding: "8px 14px", display: "flex", gap: 10, alignItems: "center" }}>
            <span style={{ color: C.white, fontWeight: 700, fontSize: 14 }}>{DESKTOP_NAV_DATA[active].label}</span>
            <Badge label={DESKTOP_NAV_DATA[active].pri} bg={priColor(DESKTOP_NAV_DATA[active].pri).bg} text={priColor(DESKTOP_NAV_DATA[active].pri).text} />
            <Badge label={DESKTOP_NAV_DATA[active].type} bg={DESKTOP_NAV_DATA[active].type === "Mega-menu" ? C.amberLt : C.slateLt} text={DESKTOP_NAV_DATA[active].type === "Mega-menu" ? C.amber : C.slate} />
            <span style={{ flex: 1 }} />
            <span style={{ fontSize: 11, color: "#AED6F1", fontStyle: "italic" }}>{DESKTOP_NAV_DATA[active].notes}</span>
          </div>
          <div style={{ padding: "12px 16px", background: C.off }}>
            {DESKTOP_NAV_DATA[active].groups ? (
              <div style={{ display: "flex", gap: 24 }}>
                {DESKTOP_NAV_DATA[active].groups.map((g, gi) => (
                  <div key={gi}>
                    <div style={{ fontSize: 11, fontWeight: 700, color: C.navy, marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.05em" }}>{g.g}</div>
                    {g.items.map((item, ii) => (
                      <div key={ii} style={{ padding: "4px 10px", background: C.white, borderRadius: 4, marginBottom: 3, fontSize: 13, color: C.body, border: "1px solid " + C.border }}>
                        {item}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                {DESKTOP_NAV_DATA[active].children.map((child, ci) => (
                  <div key={ci} style={{
                    padding: "6px 12px", background: C.white, borderRadius: 4, fontSize: 13, color: C.body,
                    border: "1px solid " + C.border,
                    borderLeft: child === "Donate" || child === "Find a Centre (Map)" ? "3px solid " + C.blue : "1px solid " + C.border
                  }}>
                    {child}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Nav spec table */}
      <div style={{ border: "1px solid " + C.border, borderRadius: 6, overflow: "hidden" }}>
        <div style={{ background: C.navy, padding: "8px 14px", display: "flex", gap: 8 }}>
          <span style={{ fontSize: 12, fontWeight: 700, color: C.white, width: 160 }}>Nav Label</span>
          <span style={{ fontSize: 12, color: "#AED6F1", width: 40 }}>Pri</span>
          <span style={{ fontSize: 12, color: "#AED6F1", width: 90 }}>Type</span>
          <span style={{ fontSize: 12, color: "#AED6F1", flex: 1 }}>Design Notes</span>
        </div>
        {DESKTOP_NAV_DATA.map((item, i) => {
          const pc = priColor(item.pri);
          return (
            <div key={i} onClick={() => setActive(active === i ? null : i)} style={{
              display: "flex", gap: 8, alignItems: "flex-start",
              padding: "8px 14px", cursor: "pointer",
              background: active === i ? "#EBF5FB" : (i % 2 === 0 ? C.off : C.white),
              borderBottom: "1px solid " + C.border
            }}>
              <span style={{ fontSize: 13, fontWeight: 600, color: C.navy, width: 160 }}>{item.label}</span>
              <span style={{ width: 40 }}><Badge label={item.pri} bg={pc.bg} text={pc.text} small /></span>
              <span style={{ width: 90 }}><Badge label={item.type} bg={item.type === "Mega-menu" ? C.amberLt : C.slateLt} text={item.type === "Mega-menu" ? C.amber : C.slate} small /></span>
              <span style={{ fontSize: 12, color: C.slate, flex: 1 }}>{item.notes}</span>
            </div>
          );
        })}
        <div style={{
          display: "flex", gap: 8, alignItems: "center",
          padding: "8px 14px", background: C.redLt,
          borderBottom: "1px solid " + C.border
        }}>
          <span style={{ fontSize: 13, fontWeight: 700, color: C.red, width: 160 }}>DONATE</span>
          <span style={{ width: 40 }}><Badge label="P0" bg={C.redLt} text={C.red} small /></span>
          <span style={{ width: 90 }}><Badge label="Sticky CTA" bg={C.redLt} text={C.red} small /></span>
          <span style={{ fontSize: 12, color: C.red, flex: 1, fontWeight: 600 }}>Persistent button. NOT a dropdown item. Always visible in header at all breakpoints.</span>
        </div>
      </div>
    </div>
  );
}

// ── TAB 3: MOBILE NAV ────────────────────────────────────────────────────────

function MobileNavTab() {
  const [openAccordions, setOpenAccordions] = useState({});
  const toggle = (i) => setOpenAccordions(p => ({ ...p, [i]: !p[i] }));

  const t1Items = MOBILE_NAV.filter(i => i.tier === "T1");
  const cta = MOBILE_NAV.find(i => i.tier === "CTA");

  // Rebuild grouped for interactive drawer
  const drawerGroups = [];
  let currentGroup = null;
  MOBILE_NAV.forEach((item, idx) => {
    if (item.tier === "CTA") return;
    if (item.tier === "T1") {
      currentGroup = { t1: item, t1idx: idx, children: [] };
      drawerGroups.push(currentGroup);
    } else if (currentGroup) {
      currentGroup.children.push({ ...item, idx });
    }
  });

  return (
    <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
      {/* Interactive phone mockup */}
      <div style={{ flexShrink: 0 }}>
        <div style={{ fontSize: 12, color: C.slate, marginBottom: 8, fontWeight: 600 }}>Interactive Mobile Drawer Preview</div>
        <div style={{
          width: 280, borderRadius: 20, border: "6px solid " + C.navy, overflow: "hidden",
          boxShadow: "0 8px 32px rgba(0,0,0,0.18)", background: C.off
        }}>
          {/* Status bar */}
          <div style={{ background: C.navyDk, padding: "4px 12px", display: "flex", justifyContent: "space-between" }}>
            <span style={{ fontSize: 9, color: "#AED6F1" }}>9:41</span>
            <span style={{ fontSize: 9, color: "#AED6F1" }}>●●●</span>
          </div>
          {/* Mobile header */}
          <div style={{ background: C.navy, padding: "8px 10px", display: "flex", alignItems: "center", gap: 6 }}>
            <div style={{ fontSize: 12, fontWeight: 800, color: C.white, flex: 1 }}>NASOM</div>
            <div style={{ background: C.red, color: C.white, fontSize: 10, fontWeight: 700, padding: "3px 8px", borderRadius: 4 }}>DONATE</div>
            <div style={{ color: C.white, fontSize: 14, marginLeft: 4 }}>&#9776;</div>
          </div>
          {/* Drawer */}
          <div style={{ maxHeight: 440, overflowY: "auto", background: C.white }}>
            {drawerGroups.map((g, gi) => {
              const isOpen = openAccordions[gi];
              const hasChildren = g.children.length > 0;
              const isAccordion = g.t1.action === "Accordion";
              return (
                <div key={gi}>
                  <div
                    onClick={() => isAccordion && hasChildren && toggle(gi)}
                    style={{
                      padding: "10px 14px", display: "flex", alignItems: "center",
                      borderBottom: "1px solid " + C.border,
                      cursor: isAccordion ? "pointer" : "default",
                      background: C.off
                    }}
                  >
                    <span style={{ flex: 1, fontSize: 13, fontWeight: 700, color: C.navy }}>{g.t1.label}</span>
                    {isAccordion && hasChildren && (
                      <span style={{ fontSize: 11, color: C.slate }}>{isOpen ? "▲" : "▼"}</span>
                    )}
                  </div>
                  {isOpen && g.children.map((child, ci) => (
                    <div key={ci} style={{
                      padding: "8px 24px",
                      borderBottom: "1px solid " + C.border,
                      display: "flex", gap: 6, alignItems: "center",
                      background: child.highlight ? "#EBF5FB" : C.white,
                    }}>
                      <span style={{ fontSize: 12, color: child.highlight ? C.blue : C.body }}>{child.label}</span>
                      {child.note && <span style={{ fontSize: 9, color: C.blue, fontWeight: 600 }}>({child.note})</span>}
                    </div>
                  ))}
                </div>
              );
            })}
          </div>
          {/* CTA note */}
          <div style={{ background: C.redLt, padding: "6px 10px", borderTop: "2px solid " + C.red }}>
            <div style={{ fontSize: 10, color: C.red, fontWeight: 700 }}>DONATE = persistent button in header</div>
            <div style={{ fontSize: 9, color: C.slate }}>Always visible. Not inside this drawer.</div>
          </div>
        </div>
      </div>

      {/* Mobile nav spec table */}
      <div style={{ flex: 1, minWidth: 280 }}>
        <div style={{ fontSize: 12, color: C.slate, marginBottom: 8, fontWeight: 600 }}>Mobile Menu Specification</div>
        <div style={{ border: "1px solid " + C.border, borderRadius: 6, overflow: "hidden" }}>
          <div style={{ background: C.navy, padding: "7px 12px", display: "flex", gap: 8 }}>
            <span style={{ fontSize: 11, fontWeight: 700, color: C.white, width: 40 }}>Tier</span>
            <span style={{ fontSize: 11, color: "#AED6F1", flex: 1 }}>Item</span>
            <span style={{ fontSize: 11, color: "#AED6F1", width: 100 }}>Interaction</span>
          </div>
          <div style={{ maxHeight: 440, overflowY: "auto" }}>
            {MOBILE_NAV.map((item, i) => {
              const isT1 = item.tier === "T1";
              const isCTA = item.tier === "CTA";
              return (
                <div key={i} style={{
                  display: "flex", gap: 8, alignItems: "center",
                  padding: isT1 ? "7px 12px" : "5px 12px",
                  background: isCTA ? C.amberLt : isT1 ? C.off : C.white,
                  borderBottom: "1px solid " + C.border,
                  borderLeft: isCTA ? "3px solid " + C.amber : isT1 ? "3px solid " + C.navy : "3px solid transparent",
                }}>
                  <span style={{
                    fontSize: 9, fontWeight: 700, width: 40, padding: "1px 4px", textAlign: "center",
                    borderRadius: 3, flexShrink: 0,
                    background: isCTA ? C.amber : isT1 ? C.navy : C.blueLt,
                    color: isCTA ? C.white : isT1 ? C.white : C.blue
                  }}>{item.tier}</span>
                  <span style={{
                    flex: 1, fontSize: isT1 || isCTA ? 13 : 12,
                    fontWeight: isT1 || isCTA ? 700 : 400,
                    color: isCTA ? C.amber : isT1 ? C.navy : C.body,
                    paddingLeft: isT1 ? 0 : 8
                  }}>
                    {item.label}
                    {item.highlight && <span style={{ marginLeft: 4, fontSize: 9, color: C.blue }}>★</span>}
                  </span>
                  <span style={{ fontSize: 11, color: C.slate, width: 100 }}>{item.action}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── TAB 4: UX PRINCIPLES ─────────────────────────────────────────────────────

function UXTab() {
  return (
    <div>
      <div style={{ marginBottom: 16, padding: "10px 14px", background: C.blueLt, borderRadius: 6, borderLeft: "4px solid " + C.blue, fontSize: 13, color: C.body }}>
        These principles govern navigation design across the rebuilt nasom.org.my. They are derived from the audience model: parents with high-urgency service needs, corporate CSR partners, and international donors.
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {UX_RULES.map((r, i) => {
          const scopeColor = r.scope === "Both" ? { bg: C.blueLt, text: C.blue } : r.scope === "Desktop" ? { bg: C.amberLt, text: C.amber } : { bg: C.tealLt, text: C.teal };
          return (
            <div key={i} style={{
              border: "1px solid " + C.border, borderRadius: 6, overflow: "hidden",
              display: "flex"
            }}>
              <div style={{ width: 4, background: i % 3 === 0 ? C.navy : i % 3 === 1 ? C.blue : C.slate, flexShrink: 0 }} />
              <div style={{ padding: "10px 14px", flex: 1, background: i % 2 === 0 ? C.off : C.white }}>
                <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 13, fontWeight: 700, color: C.navy, marginBottom: 3 }}>{r.rule}</div>
                    <div style={{ fontSize: 12, color: C.slate }}>{r.detail}</div>
                  </div>
                  <Badge label={r.scope} bg={scopeColor.bg} text={scopeColor.text} />
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div style={{ marginTop: 16, display: "flex", gap: 8, flexWrap: "wrap" }}>
        {[
          { label: "Both", bg: C.blueLt, text: C.blue },
          { label: "Desktop", bg: C.amberLt, text: C.amber },
          { label: "Mobile", bg: C.tealLt, text: C.teal },
        ].map(l => (
          <div key={l.label} style={{ display: "flex", gap: 6, alignItems: "center", fontSize: 11, color: C.slate }}>
            <Badge label={l.label} bg={l.bg} text={l.text} />
            {l.label === "Both" && "applies to both desktop & mobile"}
            {l.label === "Desktop" && "desktop-specific principle"}
            {l.label === "Mobile" && "mobile-specific principle"}
          </div>
        ))}
      </div>
    </div>
  );
}

// ── MAIN APP ─────────────────────────────────────────────────────────────────

export default function App() {
  const [tab, setTab] = useState(0);
  const tabs = ["Site Tree", "Desktop Nav", "Mobile Nav", "UX Principles"];

  return (
    <div style={{ fontFamily: "Inter, system-ui, sans-serif", background: C.off, minHeight: "100vh", color: C.body }}>
      {/* Header */}
      <div style={{ background: C.navyDk, padding: "14px 24px" }}>
        <div style={{ fontSize: 11, color: "#AED6F1", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 2 }}>NASOM.ORG.MY</div>
        <div style={{ fontSize: 20, fontWeight: 800, color: C.white }}>Site Tree, Navigation Bar & UX Specification</div>
        <div style={{ fontSize: 12, color: "#7FB3D3", marginTop: 2 }}>Interactive dashboard | Derived from Recommended Sitemap & IA</div>
      </div>

      {/* Tabs */}
      <div style={{ background: C.navy, display: "flex", gap: 2, padding: "0 24px" }}>
        {tabs.map((t, i) => (
          <button key={i} onClick={() => setTab(i)} style={{
            padding: "10px 18px", fontSize: 13, fontWeight: 600, cursor: "pointer",
            border: "none", borderRadius: "5px 5px 0 0",
            background: tab === i ? C.white : "transparent",
            color: tab === i ? C.navy : "#AED6F1",
            transition: "all 0.15s"
          }}>{t}</button>
        ))}
      </div>

      {/* Content */}
      <div style={{ padding: "20px 24px", maxWidth: 1100, margin: "0 auto" }}>
        {tab === 0 && <TreeTab />}
        {tab === 1 && <DesktopNavTab />}
        {tab === 2 && <MobileNavTab />}
        {tab === 3 && <UXTab />}
      </div>
    </div>
  );
}


