import { useState } from "react";

// ─── DATA ─────────────────────────────────────────────────────────────────────

const SITEMAP = [
  {
    id: "home", label: "Home", url: "/", level: 0, type: "page",
    template: "front-page.php", cpt: "page",
    dynamic: ["Services grid","Events strip","Stats block","Gallery strip","Donation CTA","Testimonials"],
    priority: "P0", status: "Rebuild",
    notes: "Primary conversion hub. Hero + 6 dynamic modules.",
    children: []
  },
  {
    id: "about", label: "About NASOM", url: "/about", level: 0, type: "page",
    template: "page.php", cpt: "page",
    dynamic: ["Stats block","Board members preview"],
    priority: "P1", status: "Revise",
    notes: "Mission, vision, history. Links to sub-pages.",
    children: [
      { id:"about-board", label:"Board of Directors", url:"/about/board", type:"cpt-archive", template:"archive-team_member.php", cpt:"team_member", dynamic:["Board Member grid"], priority:"P1", status:"New CPT", notes:"Grid of team_member CPT filtered to Board role." },
      { id:"about-presidents", label:"Past Presidents & Chairmen", url:"/about/past-presidents", type:"cpt-archive", template:"archive-team_member.php", cpt:"team_member", dynamic:["Past Presidents list"], priority:"P2", status:"New CPT", notes:"Same CPT, filtered by role." },
      { id:"about-partners", label:"Partners & Sponsors", url:"/about/partners", type:"page", template:"page.php", cpt:"page", dynamic:["Partner logos ACF repeater"], priority:"P2", status:"New", notes:"Logo grid managed via ACF Repeater." },
      { id:"about-reports", label:"Annual Reports", url:"/about/annual-reports", type:"resource-archive", template:"archive-resource.php", cpt:"resource", dynamic:["Resource CPT filtered to Annual Reports"], priority:"P2", status:"New CPT", notes:"Downloadable PDFs." },
    ]
  },
  {
    id: "autism", label: "What Is Autism", url: "/what-is-autism", level: 0, type: "page",
    template: "page.php", cpt: "page",
    dynamic: ["Related resources block","Service CTA strip"],
    priority: "P1", status: "Revise",
    notes: "Awareness hub. Add resource block and diagnosis funnel.",
    children: [
      { id:"autism-signs", label:"Learn the Signs", url:"/what-is-autism/signs", type:"page", template:"page.php", cpt:"page", dynamic:[], priority:"P1", status:"Revise", notes:"Checklist / infographic." },
      { id:"autism-causes", label:"What Causes Autism", url:"/what-is-autism/causes", type:"page", template:"page.php", cpt:"page", dynamic:[], priority:"P2", status:"Revise", notes:"Factual overview." },
      { id:"autism-diagnosis", label:"Getting a Diagnosis", url:"/what-is-autism/diagnosis", type:"page", template:"page.php", cpt:"page", dynamic:["Assessment service CTA"], priority:"P1", status:"New", notes:"Funnel parents toward Assessment service." },
      { id:"autism-faq", label:"FAQ", url:"/what-is-autism/faq", type:"page", template:"page.php", cpt:"page", dynamic:[], priority:"P2", status:"New", notes:"Accordion FAQ." },
    ]
  },
  {
    id: "programmes", label: "Our Programmes", url: "/programmes", level: 0, type: "cpt-archive",
    template: "archive-service.php", cpt: "service",
    dynamic: ["FacetWP filter","Service card grid","Pagination"],
    priority: "P0", status: "New CPT",
    notes: "Renamed from 'Our Services'. Filterable CPT archive. Highest SEO value.",
    children: [
      { id:"prog-early", label:"Early Intervention", url:"/programmes/early-intervention", type:"cpt-single", template:"single-service.php", cpt:"service", dynamic:["Centres offering","Related","CTA"], priority:"P0", status:"New CPT", notes:"Ages 0–10." },
      { id:"prog-intensive", label:"Intensive Intervention", url:"/programmes/intensive-intervention", type:"cpt-single", template:"single-service.php", cpt:"service", dynamic:["Centres","Related","CTA"], priority:"P0", status:"New CPT", notes:"1:1 ABA-based." },
      { id:"prog-prevoc", label:"Pre-Vocational", url:"/programmes/pre-vocational", type:"cpt-single", template:"single-service.php", cpt:"service", dynamic:["Centres","Related","CTA"], priority:"P1", status:"New CPT", notes:"Ages 11–13." },
      { id:"prog-voc", label:"Vocational Training", url:"/programmes/vocational", type:"cpt-single", template:"single-service.php", cpt:"service", dynamic:["Centres","Related","CTA"], priority:"P1", status:"New CPT", notes:"Ages 14+." },
      { id:"prog-residential", label:"Residential", url:"/programmes/residential", type:"cpt-single", template:"single-service.php", cpt:"service", dynamic:["Centres","Related","CTA"], priority:"P1", status:"New CPT", notes:"Community living." },
      { id:"prog-assessment", label:"Assessment & Diagnosis", url:"/programmes/assessment", type:"cpt-single", template:"single-service.php", cpt:"service", dynamic:["Centres","Book CTA"], priority:"P0", status:"New CPT", notes:"High intent traffic." },
      { id:"prog-therapy", label:"Therapy Programmes", url:"/programmes/therapy", type:"cpt-single", template:"single-service.php", cpt:"service", dynamic:["Sub-therapies","Centres","CTA"], priority:"P0", status:"New CPT", notes:"OT, Behaviour, Social, Sensory, Creative." },
    ]
  },
  {
    id: "centres", label: "Our Centres", url: "/centres", level: 0, type: "cpt-archive",
    template: "archive-centre.php", cpt: "centre",
    dynamic: ["Interactive map","State filter","Centre cards with services"],
    priority: "P0", status: "New CPT",
    notes: "New top-level. Critical for national org. Map-based discovery.",
    children: [
      { id:"centre-ara", label:"Ara Damansara (HQ)", url:"/centres/ara-damansara", type:"cpt-single", template:"single-centre.php", cpt:"centre", dynamic:["Map","Services","Hours","Contact form"], priority:"P0", status:"New CPT", notes:"Main centre + HQ." },
      { id:"centre-teluk", label:"Teluk Pulai", url:"/centres/teluk-pulai", type:"cpt-single", template:"single-centre.php", cpt:"centre", dynamic:["Map","Services","Hours","Contact"], priority:"P1", status:"New CPT", notes:"" },
      { id:"centre-more", label:"[Other centres…]", url:"/centres/[slug]", type:"cpt-single", template:"single-centre.php", cpt:"centre", dynamic:[], priority:"P1", status:"New CPT", notes:"One page per active NASOM centre." },
    ]
  },
  {
    id: "get-involved", label: "Get Involved", url: "/get-involved", level: 0, type: "page",
    template: "page-get-involved.php", cpt: "page",
    dynamic: ["4 CTA cards","Impact stats"],
    priority: "P0", status: "Revise",
    notes: "Primary conversion hub. Most persuasive page on site.",
    children: [
      { id:"donate", label:"Donate", url:"/get-involved/donate", type:"page", template:"page-donate.php", cpt:"page", dynamic:["Amount selector","FPX + Stripe","Impact messaging"], priority:"P0", status:"Revise", notes:"Revenue-critical." },
      { id:"volunteer", label:"Volunteer", url:"/get-involved/volunteer", type:"page", template:"page.php", cpt:"page", dynamic:["Volunteer form","Centre selector","Events"], priority:"P1", status:"Revise", notes:"" },
      { id:"fundraise", label:"Fundraise", url:"/get-involved/fundraise", type:"page", template:"page.php", cpt:"page", dynamic:["Toolkit download","Corporate form","Partner logos"], priority:"P1", status:"Revise", notes:"Target corporates." },
      { id:"member", label:"Become a Member", url:"/get-involved/membership", type:"page", template:"page.php", cpt:"page", dynamic:["Membership tiers","Application form"], priority:"P1", status:"Revise", notes:"" },
      { id:"corporate", label:"Corporate Partnerships", url:"/get-involved/corporate", type:"page", template:"page.php", cpt:"page", dynamic:["CSR info","Partnership form","Partner logos"], priority:"P1", status:"New", notes:"New dedicated B2B/CSR channel." },
    ]
  },
  {
    id: "news", label: "News & Stories", url: "/news", level: 0, type: "blog-archive",
    template: "archive.php", cpt: "post",
    dynamic: ["Category filter","Post cards","Sidebar"],
    priority: "P1", status: "New",
    notes: "New section. SEO, awareness, donor engagement.",
    children: [
      { id:"news-post", label:"[Article]", url:"/news/[slug]", type:"blog-single", template:"single-post.php", cpt:"post", dynamic:["Related posts","Service CTA","Social share"], priority:"P1", status:"New", notes:"Individual article." },
      { id:"news-recaps", label:"Events Recaps", url:"/news/category/events-recap", type:"blog-archive", template:"archive.php (filtered)", cpt:"post", dynamic:["Filtered post grid"], priority:"P2", status:"New", notes:"Auto taxonomy archive." },
    ]
  },
  {
    id: "events", label: "Events", url: "/events", level: 0, type: "cpt-archive",
    template: "tribe/events/v2/list.php", cpt: "tribe_events",
    dynamic: ["Event Type filter","Date filter","Upcoming/Past tabs"],
    priority: "P1", status: "Revise",
    notes: "Promoted to top-level nav. Better utilisation of existing plugin.",
    children: [
      { id:"event-single", label:"[Event]", url:"/events/[slug]", type:"cpt-single", template:"tribe/events/single-event.php", cpt:"tribe_events", dynamic:["Venue map","Donation CTA","Related events"], priority:"P1", status:"Revise", notes:"" },
      { id:"events-upcoming", label:"Upcoming Events", url:"/events/category/upcoming-events", type:"taxonomy-archive", template:"tribe/list.php", cpt:"tribe_events", dynamic:[], priority:"P1", status:"Active", notes:"Existing taxonomy archive." },
    ]
  },
  {
    id: "resources", label: "Resources", url: "/resources", level: 0, type: "cpt-archive",
    template: "archive-resource.php", cpt: "resource",
    dynamic: ["Resource Type filter","Downloadable card grid","Search"],
    priority: "P1", status: "New CPT",
    notes: "New section. Guides, fact sheets, research. Serves international audience.",
    children: [
      { id:"resource-single", label:"[Resource]", url:"/resources/[slug]", type:"cpt-single", template:"single-resource.php", cpt:"resource", dynamic:["Download CTA","Related services","Share"], priority:"P1", status:"New CPT", notes:"" },
    ]
  },
  {
    id: "careers", label: "Careers", url: "/careers", level: 0, type: "cpt-archive",
    template: "archive-career.php", cpt: "career",
    dynamic: ["Department filter","Location filter","Active job cards"],
    priority: "P1", status: "New CPT",
    notes: "Converted from static page to dynamic CPT with is_active toggle.",
    children: [
      { id:"career-single", label:"[Job Listing]", url:"/careers/[slug]", type:"cpt-single", template:"single-career.php", cpt:"career", dynamic:["Job detail","Application form","Related roles"], priority:"P1", status:"New CPT", notes:"" },
    ]
  },
  {
    id: "gallery", label: "Gallery", url: "/gallery", level: 0, type: "page",
    template: "page-gallery.php", cpt: "gallery_album",
    dynamic: ["Photo grid by programme/event/centre","Album filter"],
    priority: "P2", status: "Revise",
    notes: "Renamed from 'Media & Gallery'. Better taxonomy tagging.",
    children: []
  },
  {
    id: "contact", label: "Contact Us", url: "/contact", level: 0, type: "page",
    template: "page.php", cpt: "page",
    dynamic: ["Contact form","Map embed (HQ)","Centre directory link"],
    priority: "P1", status: "Revise",
    notes: "Single contact + link to Centres for branch contacts.",
    children: []
  },
];

const STATUS_STYLE = {
  "New CPT":  { bg: "#1e3a5f", border: "#3b82f6", text: "#93c5fd" },
  "New":      { bg: "#064e3b", border: "#10b981", text: "#6ee7b7" },
  "Rebuild":  { bg: "#5b1a1a", border: "#ef4444", text: "#fca5a5" },
  "Revise":   { bg: "#451a03", border: "#f59e0b", text: "#fcd34d" },
  "Active":   { bg: "#1e293b", border: "#64748b", text: "#94a3b8" },
};
const PRIORITY_STYLE = {
  "P0": { bg: "#5b1a1a", border: "#ef4444", text: "#fca5a5" },
  "P1": { bg: "#1e3a5f", border: "#3b82f6", text: "#93c5fd" },
  "P2": { bg: "#064e3b", border: "#10b981", text: "#6ee7b7" },
};
const TYPE_COLOR = {
  "page":            "#64748b",
  "cpt-archive":     "#3b82f6",
  "cpt-single":      "#60a5fa",
  "blog-archive":    "#10b981",
  "blog-single":     "#34d399",
  "resource-archive":"#f59e0b",
  "taxonomy-archive":"#94a3b8",
};

const NAV_CHANGES = [
  { from:"Home",                     to:"Home",                    change:"Keep",               why:"No change needed." },
  { from:"About",                    to:"About NASOM",             change:"Rename",              why:"Clearer brand affiliation." },
  { from:"What is Autism",           to:"What Is Autism",          change:"Expand",              why:"Add Diagnosis + FAQ sub-pages." },
  { from:"Our Services",             to:"Our Programmes",          change:"Rebuild",             why:"Rename + convert to CPT archive. Critical SEO impact." },
  { from:"—",                        to:"Our Centres",             change:"New",                 why:"National org needs centre discovery. Urgent gap." },
  { from:"Career",                   to:"Careers",                 change:"Rebuild",             why:"Dynamic CPT with is_active toggle. Own top-level nav." },
  { from:"Get Involved",             to:"Get Involved",            change:"Expand",              why:"Add Corporate Partnerships child. Improve CTA design." },
  { from:"—",                        to:"News & Stories",          change:"New",                 why:"Blog for SEO, awareness, donor engagement." },
  { from:"—",                        to:"Resources",               change:"New",                 why:"Guides hub for parents, researchers, partners." },
  { from:"Media & Gallery",          to:"Gallery",                 change:"Rename",              why:"Events promoted to own top-level item." },
  { from:"Upcoming events (in Gallery)", to:"Events",             change:"Promote",             why:"Events deserve top-level visibility." },
  { from:"Contact Us",               to:"Contact Us",              change:"Keep",                why:"Standard. Link to Centres for branch contacts." },
];

const CHANGE_STYLE = {
  "New":     { bg:"#064e3b", border:"#10b981", text:"#6ee7b7" },
  "Rebuild": { bg:"#5b1a1a", border:"#ef4444", text:"#fca5a5" },
  "Expand":  { bg:"#1e3a5f", border:"#3b82f6", text:"#93c5fd" },
  "Rename":  { bg:"#451a03", border:"#f59e0b", text:"#fcd34d" },
  "Promote": { bg:"#2d1b69", border:"#a78bfa", text:"#c4b5fd" },
  "Keep":    { bg:"#1e293b", border:"#64748b", text:"#94a3b8" },
};

// ── constants
const BG    = "#060b14";
const CARD  = "#0c1624";
const CARD2 = "#101c2e";
const BORD  = "#1a2e48";
const TEXT  = "#e2e8f0";
const MUTED = "#64748b";

function Badge({ label, style, small }) {
  return (
    <span style={{
      display:"inline-block",
      padding: small ? "1px 7px" : "2px 9px",
      background: style.bg,
      border: "1px solid " + style.border,
      borderRadius: 20,
      fontSize: small ? 10 : 11,
      fontWeight: 700,
      color: style.text,
      letterSpacing:"0.03em",
      whiteSpace:"nowrap",
    }}>{label}</span>
  );
}

function PageNode({ page, onSelect, selected }) {
  const active = selected && selected.id === page.id;
  const pstyle = PRIORITY_STYLE[page.priority];
  const sstyle = STATUS_STYLE[page.status];
  const tcolor = TYPE_COLOR[page.type] || "#64748b";

  return (
    <div style={{ marginBottom: 6 }}>
      <div
        onClick={() => onSelect(active ? null : page)}
        style={{
          background: active ? "#0f1e35" : CARD,
          border: "1px solid " + (active ? "#3b82f6" : BORD),
          borderLeft: "3px solid " + tcolor,
          borderRadius: 8,
          padding: "10px 14px",
          cursor: "pointer",
          transition: "all 0.15s",
        }}
      >
        <div style={{ display:"flex", alignItems:"center", gap:8, flexWrap:"wrap" }}>
          <span style={{ fontSize:12, fontWeight:700, color: active ? "#60a5fa" : TEXT, flex:1, minWidth:0 }}>{page.label}</span>
          <Badge label={page.priority} style={pstyle} small />
          <Badge label={page.status} style={sstyle} small />
        </div>
        <div style={{ fontSize:10, color:MUTED, fontFamily:"monospace", marginTop:3 }}>{page.url}</div>
      </div>

      {page.children && page.children.length > 0 && (
        <div style={{ marginLeft:20, marginTop:4, borderLeft:"2px solid " + BORD, paddingLeft:12 }}>
          {page.children.map(child => (
            <div key={child.id} onClick={() => onSelect(child)} style={{
              background: selected && selected.id === child.id ? "#0f1e35" : CARD2,
              border: "1px solid " + (selected && selected.id === child.id ? "#3b82f6" : BORD),
              borderLeft: "3px solid " + (TYPE_COLOR[child.type] || "#64748b"),
              borderRadius: 7,
              padding: "8px 12px",
              marginBottom: 4,
              cursor: "pointer",
              transition: "all 0.15s",
            }}>
              <div style={{ display:"flex", alignItems:"center", gap:6, flexWrap:"wrap" }}>
                <span style={{ fontSize:11, color: selected && selected.id === child.id ? "#60a5fa" : "#94a3b8", flex:1 }}>
                  ↳ {child.label}
                </span>
                <Badge label={child.priority} style={PRIORITY_STYLE[child.priority]} small />
                <Badge label={child.status} style={STATUS_STYLE[child.status]} small />
              </div>
              <div style={{ fontSize:10, color:MUTED, fontFamily:"monospace", marginTop:2 }}>{child.url}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function DetailPanel({ page }) {
  if (!page) return (
    <div style={{ display:"flex", alignItems:"center", justifyContent:"center", height:"100%", color:MUTED, fontSize:13 }}>
      Select a page to inspect
    </div>
  );

  const tcolor = TYPE_COLOR[page.type] || "#64748b";

  return (
    <div style={{ padding:"24px 28px", overflowY:"auto", maxHeight:"100%" }}>
      <div style={{ marginBottom:20 }}>
        <div style={{ fontSize:20, fontWeight:800, color:TEXT, letterSpacing:"-0.3px" }}>{page.label}</div>
        <div style={{ fontSize:12, color:MUTED, fontFamily:"monospace", marginTop:4 }}>{page.url}</div>
        <div style={{ display:"flex", gap:6, marginTop:10, flexWrap:"wrap" }}>
          {page.priority && <Badge label={page.priority} style={PRIORITY_STYLE[page.priority]} />}
          {page.status && <Badge label={page.status} style={STATUS_STYLE[page.status]} />}
          {page.type && <span style={{ fontSize:11, padding:"2px 9px", background:"#1e293b", border:"1px solid "+tcolor+"44", color:tcolor, borderRadius:20 }}>{page.type}</span>}
        </div>
      </div>

      {page.notes && (
        <div style={{ background:"#0f1e35", border:"1px solid #1d4ed8", borderLeft:"3px solid #3b82f6", borderRadius:8, padding:"12px 16px", marginBottom:16, fontSize:13, color:"#93c5fd" }}>
          {page.notes}
        </div>
      )}

      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10, marginBottom:16 }}>
        <div style={{ background:CARD2, border:"1px solid "+BORD, borderRadius:7, padding:"12px 14px" }}>
          <div style={{ fontSize:10, fontWeight:700, color:MUTED, textTransform:"uppercase", letterSpacing:"0.08em", marginBottom:5 }}>Template</div>
          <div style={{ fontSize:12, color:"#60a5fa", fontFamily:"monospace" }}>{page.template || "—"}</div>
        </div>
        <div style={{ background:CARD2, border:"1px solid "+BORD, borderRadius:7, padding:"12px 14px" }}>
          <div style={{ fontSize:10, fontWeight:700, color:MUTED, textTransform:"uppercase", letterSpacing:"0.08em", marginBottom:5 }}>CPT</div>
          <div style={{ fontSize:12, color:"#34d399", fontFamily:"monospace" }}>{page.cpt || "—"}</div>
        </div>
      </div>

      {page.dynamic && page.dynamic.length > 0 && (
        <div style={{ marginBottom:16 }}>
          <div style={{ fontSize:10, fontWeight:700, color:MUTED, textTransform:"uppercase", letterSpacing:"0.08em", marginBottom:8 }}>Dynamic Modules</div>
          <div style={{ display:"flex", flexWrap:"wrap", gap:6 }}>
            {page.dynamic.map((d,i) => (
              <span key={i} style={{ fontSize:11, padding:"3px 10px", background:"#1e293b", border:"1px solid #334155", color:"#94a3b8", borderRadius:6 }}>{d}</span>
            ))}
          </div>
        </div>
      )}

      {page.children && page.children.length > 0 && (
        <div>
          <div style={{ fontSize:10, fontWeight:700, color:MUTED, textTransform:"uppercase", letterSpacing:"0.08em", marginBottom:8 }}>Child Pages ({page.children.length})</div>
          {page.children.map(c => (
            <div key={c.id} style={{ display:"flex", gap:8, alignItems:"flex-start", padding:"8px 10px", background:CARD2, border:"1px solid "+BORD, borderRadius:6, marginBottom:5 }}>
              <span style={{ color:MUTED, fontSize:12, flexShrink:0 }}>↳</span>
              <div style={{ flex:1, minWidth:0 }}>
                <div style={{ fontSize:12, color:TEXT, fontWeight:600 }}>{c.label}</div>
                <div style={{ fontSize:10, color:MUTED, fontFamily:"monospace" }}>{c.url}</div>
              </div>
              <Badge label={c.priority} style={PRIORITY_STYLE[c.priority]} small />
              <Badge label={c.status} style={STATUS_STYLE[c.status]} small />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function NavChangesTab() {
  return (
    <div style={{ padding:"24px 28px", overflowY:"auto", maxHeight:"100%" }}>
      <div style={{ marginBottom:20 }}>
        <div style={{ fontSize:16, fontWeight:800, color:TEXT, marginBottom:6 }}>Navigation Structure Changes</div>
        <div style={{ fontSize:12, color:MUTED }}>Current nav → recommended nav for the rebuilt site.</div>
      </div>
      {NAV_CHANGES.map((r, i) => {
        const cs = CHANGE_STYLE[r.change] || CHANGE_STYLE["Keep"];
        return (
          <div key={i} style={{ display:"grid", gridTemplateColumns:"1fr 1fr 90px 1.4fr", gap:10, padding:"10px 14px", background: i%2===0 ? CARD : CARD2, border:"1px solid "+BORD, borderRadius:8, marginBottom:5, alignItems:"center" }}>
            <div style={{ fontSize:12, color:MUTED, fontFamily:"monospace" }}>{r.from}</div>
            <div style={{ fontSize:12, color:TEXT, fontWeight:700 }}>{r.to}</div>
            <Badge label={r.change} style={cs} />
            <div style={{ fontSize:11, color:MUTED }}>{r.why}</div>
          </div>
        );
      })}
    </div>
  );
}

function StatsBar() {
  const total = SITEMAP.reduce((acc, p) => acc + 1 + p.children.length, 0);
  const newCPT = [...SITEMAP, ...SITEMAP.flatMap(p => p.children)].filter(p => p.status === "New CPT").length;
  const newPages = [...SITEMAP, ...SITEMAP.flatMap(p => p.children)].filter(p => p.status === "New").length;
  const p0 = [...SITEMAP, ...SITEMAP.flatMap(p => p.children)].filter(p => p.priority === "P0").length;

  const stats = [
    { label:"Top-level sections", value:SITEMAP.length, color:"#3b82f6" },
    { label:"Total pages / CPTs", value:total + "+", color:"#60a5fa" },
    { label:"New CPT archives", value:newCPT, color:"#f59e0b" },
    { label:"New pages", value:newPages, color:"#10b981" },
    { label:"P0 — Build first", value:p0, color:"#ef4444" },
  ];

  return (
    <div style={{ display:"flex", gap:0, borderBottom:"1px solid "+BORD, background:"#060b14" }}>
      {stats.map((s, i) => (
        <div key={i} style={{ flex:1, padding:"12px 16px", borderRight: i < stats.length-1 ? "1px solid "+BORD : "none", textAlign:"center" }}>
          <div style={{ fontSize:22, fontWeight:800, color:s.color, fontFamily:"monospace" }}>{s.value}</div>
          <div style={{ fontSize:10, color:MUTED, marginTop:2 }}>{s.label}</div>
        </div>
      ))}
    </div>
  );
}

function LegendRow() {
  const items = [
    ["P0 — Build first", PRIORITY_STYLE["P0"]],
    ["P1 — Phase 2",     PRIORITY_STYLE["P1"]],
    ["P2 — Phase 3",     PRIORITY_STYLE["P2"]],
    ["New CPT",   STATUS_STYLE["New CPT"]],
    ["New",       STATUS_STYLE["New"]],
    ["Rebuild",   STATUS_STYLE["Rebuild"]],
    ["Revise",    STATUS_STYLE["Revise"]],
  ];
  return (
    <div style={{ display:"flex", gap:6, flexWrap:"wrap", padding:"8px 20px", background:"#060b14", borderBottom:"1px solid "+BORD }}>
      {items.map(([label, style], i) => (
        <Badge key={i} label={label} style={style} small />
      ))}
    </div>
  );
}

// ─── APP ──────────────────────────────────────────────────────────────────────

export default function App() {
  const [selected, setSelected] = useState(null);
  const [tab, setTab] = useState("sitemap");
  const [filter, setFilter] = useState("all");

  const TABS = [
    { id:"sitemap",   label:"Sitemap" },
    { id:"nav",       label:"Nav Changes" },
  ];

  const FILTERS = [
    { id:"all",      label:"All" },
    { id:"P0",       label:"P0 Only" },
    { id:"P1",       label:"P1 Only" },
    { id:"new-cpt",  label:"New CPTs" },
    { id:"new",      label:"New Pages" },
  ];

  const filtered = SITEMAP.filter(p => {
    if (filter === "all")    return true;
    if (filter === "P0")     return p.priority === "P0" || p.children.some(c => c.priority === "P0");
    if (filter === "P1")     return p.priority === "P1" || p.children.some(c => c.priority === "P1");
    if (filter === "new-cpt")return p.status === "New CPT" || p.children.some(c => c.status === "New CPT");
    if (filter === "new")    return p.status === "New" || p.children.some(c => c.status === "New");
    return true;
  });

  return (
    <div style={{ background:BG, minHeight:"100vh", color:TEXT, fontFamily:"system-ui, -apple-system, sans-serif" }}>

      {/* Header */}
      <div style={{ background:"#070d1b", borderBottom:"1px solid "+BORD, padding:"14px 20px" }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:8 }}>
          <div>
            <div style={{ fontSize:15, fontWeight:800, color:TEXT, letterSpacing:"-0.3px" }}>NASOM — Recommended Sitemap</div>
            <div style={{ fontSize:11, color:MUTED, marginTop:2 }}>Information Architecture based on WordPress CMS Analysis</div>
          </div>
          <div style={{ display:"flex", gap:6 }}>
            {TABS.map(t => (
              <button key={t.id} onClick={() => setTab(t.id)} style={{
                padding:"7px 16px", background: tab===t.id ? "#1e3a5f" : "transparent",
                border:"1px solid " + (tab===t.id ? "#3b82f6" : BORD),
                borderRadius:20, color: tab===t.id ? "#93c5fd" : MUTED,
                fontFamily:"inherit", fontSize:12, cursor:"pointer", fontWeight: tab===t.id ? 700 : 400,
              }}>{t.label}</button>
            ))}
          </div>
        </div>
      </div>

      <StatsBar />

      {tab === "sitemap" && (
        <>
          <LegendRow />

          {/* Filter bar */}
          <div style={{ display:"flex", gap:6, padding:"10px 20px", background:"#060b14", borderBottom:"1px solid "+BORD }}>
            <span style={{ fontSize:11, color:MUTED, alignSelf:"center", marginRight:4 }}>Filter:</span>
            {FILTERS.map(f => (
              <button key={f.id} onClick={() => setFilter(f.id)} style={{
                padding:"4px 12px", background: filter===f.id ? "#1e3a5f" : "transparent",
                border:"1px solid " + (filter===f.id ? "#3b82f6" : BORD),
                borderRadius:20, color: filter===f.id ? "#93c5fd" : MUTED,
                fontFamily:"inherit", fontSize:11, cursor:"pointer",
              }}>{f.label}</button>
            ))}
          </div>

          {/* Body */}
          <div style={{ display:"grid", gridTemplateColumns:"380px 1fr", minHeight:"calc(100vh - 200px)" }}>
            {/* Left: tree */}
            <div style={{ borderRight:"1px solid "+BORD, padding:"16px 14px", overflowY:"auto" }}>
              {filtered.map(page => (
                <PageNode key={page.id} page={page} onSelect={setSelected} selected={selected} />
              ))}
            </div>
            {/* Right: detail */}
            <div style={{ background:"#090e1b" }}>
              <DetailPanel page={selected} />
            </div>
          </div>
        </>
      )}

      {tab === "nav" && (
        <div style={{ minHeight:"calc(100vh - 140px)" }}>
          <NavChangesTab />
        </div>
      )}
    </div>
  );
}

