import { useState, useEffect, useRef } from "react";

// ─── DATA ────────────────────────────────────────────────────────────────────

const CPTS = [
  { id: "page",          label: "Pages",           slug: "page",          plugin: "Core",              status: "active",   color: "#0ea5e9" },
  { id: "tribe_events",  label: "Events",          slug: "tribe_events",  plugin: "The Events Cal.",   status: "active",   color: "#f59e0b" },
  { id: "service",       label: "Services",        slug: "service",       plugin: "ACF Pro",           status: "needs",    color: "#ef4444" },
  { id: "team_member",   label: "Team Members",    slug: "team_member",   plugin: "ACF Pro",           status: "partial",  color: "#8b5cf6" },
  { id: "career",        label: "Career Listings", slug: "career",        plugin: "ACF Pro",           status: "partial",  color: "#ec4899" },
  { id: "centre",        label: "Centres",         slug: "centre",        plugin: "ACF Pro + Maps",    status: "missing",  color: "#14b8a6" },
  { id: "testimonial",   label: "Testimonials",    slug: "testimonial",   plugin: "ACF Pro",           status: "missing",  color: "#a78bfa" },
  { id: "post",          label: "Blog / News",     slug: "post",          plugin: "Core",              status: "missing",  color: "#f97316" },
  { id: "resource",      label: "Resources",       slug: "resource",      plugin: "ACF Pro",           status: "missing",  color: "#22c55e" },
  { id: "gallery_album", label: "Gallery Albums",  slug: "gallery_album", plugin: "ACF Pro / Envira",  status: "active",   color: "#06b6d4" },
];

const RELATIONSHIPS = [
  { from: "service",      to: "centre",      label: "offered at" },
  { from: "centre",       to: "team_member", label: "managed by" },
  { from: "career",       to: "centre",      label: "based at" },
  { from: "tribe_events", to: "centre",      label: "held at" },
  { from: "tribe_events", to: "post",        label: "recap → post" },
  { from: "post",         to: "service",     label: "relates to" },
  { from: "resource",     to: "service",     label: "guides for" },
  { from: "testimonial",  to: "service",     label: "reviews" },
];

const TAXONOMIES = {
  tribe_events: [
    { name: "Event Category", type: "hierarchical", terms: ["Upcoming", "Past", "Fundraising", "Awareness", "Community"] },
    { name: "Event Type",     type: "flat",         terms: ["Run/Walk", "Book Sale", "Workshop", "Press Launch", "Gala"] },
    { name: "Event Location", type: "flat",         terms: ["PJ", "Shah Alam", "KL", "National"] },
  ],
  service: [
    { name: "Service Category", type: "hierarchical", terms: ["Intervention", "Therapy", "Vocational", "Residential", "Assessment", "Creative"] },
    { name: "Age Group",        type: "flat",         terms: ["0–6 yrs", "7–10 yrs", "11–13 yrs", "14+", "Adult"] },
    { name: "Delivery Mode",    type: "flat",         terms: ["Centre-based", "Residential", "Community"] },
  ],
  post: [
    { name: "Category", type: "hierarchical", terms: ["Autism Awareness", "Org News", "Research", "Event Recap", "Stories"] },
    { name: "Tag",      type: "flat",         terms: ["ASD", "Early Intervention", "Fundraising", "Volunteers"] },
  ],
  centre: [
    { name: "State",             type: "hierarchical", terms: ["Selangor", "KL", "Penang", "Johor"] },
    { name: "Programme Offered", type: "flat",         terms: ["Early Intervention", "Vocational", "Residential", "Therapy"] },
  ],
  career: [
    { name: "Department",    type: "flat", terms: ["Therapy", "Education", "Admin", "Management"] },
    { name: "Employ. Type",  type: "flat", terms: ["Full-time", "Part-time", "Contract"] },
  ],
  team_member: [
    { name: "Team Role", type: "flat", terms: ["Board Member", "Past President", "Staff"] },
  ],
  resource: [
    { name: "Resource Type", type: "flat", terms: ["Guide", "Fact Sheet", "Form", "Research"] },
  ],
};

const FIELDS = {
  service:      ["Title","Short Description","Full Description","Age Group (tax)","Service Category (tax)","Duration","Eligibility","Intake Process","Centre Locations (rel)","Featured Image","CTA Label + URL"],
  tribe_events: ["Title","Start DateTime","End DateTime","Venue (CPT rel)","Description","Event Type (tax)","Partner Org","Registration Link","Donation Target","Featured Image","Gallery","Is Featured?"],
  team_member:  ["Full Name","Title / Role","Bio","Photo","Member Type (tax)","Year (Tenure)","LinkedIn / Contact"],
  career:       ["Job Title","Department (tax)","Centre Location (rel)","Employment Type","Description","Qualifications","Application Deadline","Application Link","Is Active?"],
  centre:       ["Centre Name","Address","Google Maps Embed","Phone","Email","Services Offered (rel)","Operating Hours","Centre Manager (rel)","Photos"],
  testimonial:  ["Quote","Author Name","Author Role","Photo","Linked Service (rel)","Rating","Date"],
  post:         ["Title","Content","Category (tax)","Tags (tax)","Author","Featured Image","Related Service (rel)"],
  resource:     ["Title","Description","File Upload","Resource Type (tax)","Linked Service (rel)","Date Published"],
};

const TEMPLATES = [
  { name: "Homepage",         file: "front-page.php",          modules: ["Hero slider", "Services grid", "Events strip", "Stats block", "Gallery strip", "Donate CTA", "Testimonials"] },
  { name: "Services Archive", file: "archive-service.php",     modules: ["Filter bar (Cat, Age, Mode)", "Service cards grid", "Pagination"] },
  { name: "Service Single",   file: "single-service.php",      modules: ["Service detail", "Eligibility", "Intake CTA", "Related Services", "Centres"] },
  { name: "Events Archive",   file: "tribe/list",              modules: ["Category filter", "Date filter", "Event cards", "Past events tab"] },
  { name: "Event Single",     file: "tribe/single",            modules: ["Event detail", "Venue map", "Donate CTA", "Related events"] },
  { name: "Team Archive",     file: "archive-team_member.php", modules: ["Role tabs", "Member grid"] },
  { name: "Careers Archive",  file: "archive-career.php",      modules: ["Dept + Location filters", "Job cards", "Apply CTA"] },
  { name: "Centres Archive",  file: "archive-centre.php",      modules: ["Interactive map", "State filter", "Centre cards"] },
  { name: "Centre Single",    file: "single-centre.php",       modules: ["Centre info", "Map embed", "Services list", "Hours", "Contact form"] },
  { name: "Blog Archive",     file: "archive.php",             modules: ["Category filter", "Post cards", "Sidebar"] },
  { name: "Resources Archive",file: "archive-resource.php",    modules: ["Resource Type filter", "Download cards"] },
  { name: "Donation Page",    file: "page-donate.php",         modules: ["Amount selector", "Payment gateway", "Impact messaging"] },
  { name: "Search Results",   file: "search.php",              modules: ["Multi-CPT results", "Keyword highlight"] },
];

const PLUGINS = [
  { name: "Advanced Custom Fields Pro", priority: "Essential", purpose: "All custom fields for every CPT" },
  { name: "The Events Calendar PRO",    priority: "Essential", purpose: "Events, venues, recurring events" },
  { name: "WPForms / Gravity Forms",    priority: "Essential", purpose: "Contact, Application, Volunteer forms" },
  { name: "Yoast SEO / Rank Math",      priority: "Essential", purpose: "SEO + schema markup per CPT" },
  { name: "SearchWP",                   priority: "High",      purpose: "Multi-CPT weighted keyword search" },
  { name: "FacetWP",                    priority: "High",      purpose: "Filtering for Services, Careers, Centres" },
  { name: "Elementor Pro",              priority: "High",      purpose: "Page building for homepage & landing pages" },
  { name: "WP Rocket",                  priority: "High",      purpose: "Performance caching" },
  { name: "Smush / ShortPixel",         priority: "Medium",    purpose: "Image optimisation for gallery pages" },
  { name: "Members / PublishPress",     priority: "Medium",    purpose: "Role-based content editing access" },
  { name: "Polylang / WPML",            priority: "Future",    purpose: "Bahasa Malaysia + English dual language" },
];

const GAPS = [
  "Services are a single flat page — no CPT, no individual URLs, no filtering",
  "Careers is static — no way to deactivate filled positions dynamically",
  "No Blog/News section despite active events & newsworthy activity",
  "No Centres CPT — national multi-centre org with no location content model",
  "No Testimonials — social proof entirely absent from site",
  "Events Calendar installed but upcoming list is empty",
  "No resource library — autism info scattered across static pages",
  "Gallery untagged — photos not linked to events, programmes, or centres",
];

const IMPROVEMENTS = [
  { priority: "High",   item: "Convert Services to full CPT with individual pages",  benefit: "SEO, filterable archive, reusable relationships" },
  { priority: "High",   item: "Add dynamic Career Listings CPT",                     benefit: "Manage open/closed roles; filter by location" },
  { priority: "High",   item: "Introduce Centre/Location CPT",                       benefit: "Map-based search, local SEO, centre-level services" },
  { priority: "High",   item: "Launch Blog/News section",                            benefit: "Content marketing, search traffic, donor engagement" },
  { priority: "Medium", item: "Add Testimonials CPT",                                benefit: "Social proof on service pages and homepage" },
  { priority: "Medium", item: "Build Resource Library CPT",                          benefit: "SEO value, parent/caregiver utility" },
  { priority: "Medium", item: "Implement FacetWP + SearchWP",                        benefit: "Cross-CPT filtering & search without custom dev" },
  { priority: "Medium", item: "Theme Options Page (ACF Options)",                    benefit: "Non-devs can manage CTAs, stats, homepage modules" },
  { priority: "Low",    item: "Add Impact/Statistics fields",                         benefit: "Dynamic numbers without hardcoding" },
  { priority: "Low",    item: "Related Content blocks on all CPT singles",            benefit: "Reduces bounce rate, increases page depth" },
];

// ─── STATUS CONFIG ────────────────────────────────────────────────────────────
const STATUS = {
  active:   { label: "Active",    bg: "#052e16", text: "#4ade80", border: "#166534" },
  partial:  { label: "Partial",   bg: "#1c1917", text: "#fbbf24", border: "#78350f" },
  needs:    { label: "Needs CPT", bg: "#1c0a0a", text: "#f87171", border: "#7f1d1d" },
  missing:  { label: "Missing",   bg: "#1c0a0a", text: "#f87171", border: "#7f1d1d" },
};

const PRIORITY_COLOR = {
  Essential: "#ef4444",
  High:      "#f59e0b",
  Medium:    "#3b82f6",
  Future:    "#6b7280",
};

const PRIO_COLOR = {
  High:   "#ef4444",
  Medium: "#f59e0b",
  Low:    "#6b7280",
};

// ─── TABS ─────────────────────────────────────────────────────────────────────
const TABS = [
  { id: "overview",    label: "CMS Overview" },
  { id: "cpts",        label: "Content Types" },
  { id: "relations",   label: "Relationships" },
  { id: "taxonomies",  label: "Taxonomies" },
  { id: "fields",      label: "Fields" },
  { id: "templates",   label: "Templates" },
  { id: "plugins",     label: "Plugin Stack" },
  { id: "gaps",        label: "Gaps & Fixes" },
];

// ─── RELATIONSHIP DIAGRAM ─────────────────────────────────────────────────────
function RelationDiagram({ selected, onSelect }) {
  const positions = {
    service:      { x: 400, y: 160 },
    centre:       { x: 640, y: 300 },
    team_member:  { x: 760, y: 160 },
    career:       { x: 760, y: 440 },
    tribe_events: { x: 400, y: 440 },
    post:         { x: 160, y: 300 },
    resource:     { x: 160, y: 160 },
    testimonial:  { x: 160, y: 440 },
    page:         { x: 400, y: 300 },
    gallery_album:{ x: 640, y: 440 },
  };

  const W = 920, H = 560;

  const cptById = Object.fromEntries(CPTS.map(c => [c.id, c]));

  return (
    <div style={{ overflowX: "auto" }}>
      <svg width={W} height={H} style={{ fontFamily: "'DM Mono', monospace" }}>
        <defs>
          <marker id="arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
            <path d="M0,0 L0,6 L8,3 z" fill="#475569" />
          </marker>
          {CPTS.map(c => (
            <radialGradient key={c.id} id={`g-${c.id}`} cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor={c.color} stopOpacity="0.3" />
              <stop offset="100%" stopColor={c.color} stopOpacity="0.08" />
            </radialGradient>
          ))}
        </defs>

        {/* Edges */}
        {RELATIONSHIPS.map((rel, i) => {
          const from = positions[rel.from];
          const to   = positions[rel.to];
          if (!from || !to) return null;
          const mx = (from.x + to.x) / 2;
          const my = (from.y + to.y) / 2;
          const isHighlighted = selected === rel.from || selected === rel.to;
          return (
            <g key={i}>
              <line
                x1={from.x} y1={from.y} x2={to.x} y2={to.y}
                stroke={isHighlighted ? "#94a3b8" : "#334155"}
                strokeWidth={isHighlighted ? 2 : 1}
                strokeDasharray={isHighlighted ? "none" : "5,4"}
                markerEnd="url(#arrow)"
                opacity={selected && !isHighlighted ? 0.2 : 1}
              />
              <text x={mx} y={my - 6} textAnchor="middle" fill="#64748b" fontSize="10" opacity={isHighlighted ? 1 : 0.6}>
                {rel.label}
              </text>
            </g>
          );
        })}

        {/* Nodes */}
        {CPTS.map(cpt => {
          const pos = positions[cpt.id];
          if (!pos) return null;
          const isSelected = selected === cpt.id;
          const isRelated = RELATIONSHIPS.some(r => (r.from === selected && r.to === cpt.id) || (r.to === selected && r.from === cpt.id));
          const dimmed = selected && !isSelected && !isRelated;
          return (
            <g key={cpt.id} onClick={() => onSelect(isSelected ? null : cpt.id)} style={{ cursor: "pointer" }} opacity={dimmed ? 0.25 : 1}>
              <circle cx={pos.x} cy={pos.y} r={42} fill={`url(#g-${cpt.id})`} stroke={cpt.color} strokeWidth={isSelected ? 2.5 : 1.5} />
              {isSelected && <circle cx={pos.x} cy={pos.y} r={48} fill="none" stroke={cpt.color} strokeWidth={1} strokeDasharray="4,4" opacity={0.5} />}
              <text x={pos.x} y={pos.y - 6} textAnchor="middle" fill={cpt.color} fontSize="11" fontWeight="700">{cpt.label.split(" ")[0]}</text>
              <text x={pos.x} y={pos.y + 8} textAnchor="middle" fill={cpt.color} fontSize="11" fontWeight="700">{cpt.label.split(" ").slice(1).join(" ")}</text>
              <text x={pos.x} y={pos.y + 22} textAnchor="middle" fill="#64748b" fontSize="9">{cpt.slug}</text>
            </g>
          );
        })}
      </svg>
      <p style={{ color: "#475569", fontSize: 12, textAlign: "center", marginTop: 8 }}>Click any node to highlight its relationships</p>
    </div>
  );
}

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────
export default function App() {
  const [tab, setTab] = useState("overview");
  const [selectedCPT, setSelectedCPT] = useState(null);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [relSelected, setRelSelected] = useState(null);

  const cptById = Object.fromEntries(CPTS.map(c => [c.id, c]));

  // ── styles ──
  const S = {
    app: {
      background: "#020617",
      minHeight: "100vh",
      color: "#e2e8f0",
      fontFamily: "'DM Mono', 'Fira Code', monospace",
    },
    header: {
      background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
      borderBottom: "1px solid #1e3a5f",
      padding: "24px 32px 20px",
    },
    title: { fontSize: 22, fontWeight: 700, color: "#f8fafc", letterSpacing: "-0.5px", margin: 0 },
    subtitle: { fontSize: 12, color: "#64748b", marginTop: 4, letterSpacing: "0.05em" },
    nav: {
      display: "flex", gap: 2, padding: "0 32px",
      background: "#0f172a",
      borderBottom: "1px solid #1e293b",
      overflowX: "auto",
    },
    navBtn: (active) => ({
      padding: "12px 16px",
      background: "none",
      border: "none",
      borderBottom: active ? "2px solid #38bdf8" : "2px solid transparent",
      color: active ? "#38bdf8" : "#64748b",
      fontSize: 12,
      fontFamily: "inherit",
      cursor: "pointer",
      whiteSpace: "nowrap",
      letterSpacing: "0.03em",
      transition: "all 0.15s",
    }),
    body: { padding: "28px 32px", maxWidth: 1100, margin: "0 auto" },
    sectionTitle: { fontSize: 13, color: "#94a3b8", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 20, borderBottom: "1px solid #1e293b", paddingBottom: 10 },
    card: {
      background: "#0f172a",
      border: "1px solid #1e293b",
      borderRadius: 8,
      padding: "16px 20px",
    },
    grid2: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 },
    grid3: { display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 },
    tag: (color) => ({
      display: "inline-block",
      padding: "2px 8px",
      borderRadius: 4,
      fontSize: 11,
      fontWeight: 600,
      background: color + "22",
      color: color,
      border: `1px solid ${color}44`,
      marginRight: 6,
      marginBottom: 4,
    }),
    badge: (color, bg, border) => ({
      display: "inline-block",
      padding: "2px 8px",
      borderRadius: 4,
      fontSize: 10,
      fontWeight: 700,
      background: bg,
      color: color,
      border: `1px solid ${border}`,
    }),
  };

  // ── PANELS ──

  const Overview = () => (
    <div>
      <p style={S.sectionTitle}>1. CMS Overview — Platform, Builder & Plugin Stack</p>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        {[
          { label: "CMS Platform",      value: "WordPress", note: "Confirmed via /wp-content/ paths", icon: "🔵" },
          { label: "Page Builder",       value: "Elementor (likely)", note: "Full-width sections, hero sliders, icon boxes", icon: "🧩" },
          { label: "Theme Framework",    value: "Custom / Commercial", note: "Not Divi, Astra, or GeneratePress", icon: "🎨" },
          { label: "Events System",      value: "The Events Calendar", note: "tribe_events CPT confirmed in URL structure", icon: "📅" },
          { label: "Forms",              value: "CF7 / WPForms", note: "Name, Email, Phone, File Upload fields", icon: "📋" },
          { label: "Donations",          value: "iPay88 / Stripe", note: "External redirect — no WooCommerce detected", icon: "💳" },
          { label: "Membership",         value: "Paid Memberships Pro", note: "/be-a-member/ landing page", icon: "🎟" },
          { label: "Gallery",            value: "Envira Gallery", note: "Grid layout consistent with gallery plugin", icon: "🖼" },
          { label: "Hosting",            value: "Exabytes Malaysia", note: "Confirmed in footer", icon: "🖥" },
        ].map(row => (
          <div key={row.label} style={{ ...S.card, display: "flex", gap: 14, alignItems: "flex-start" }}>
            <span style={{ fontSize: 24, flexShrink: 0 }}>{row.icon}</span>
            <div>
              <div style={{ fontSize: 10, color: "#64748b", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 3 }}>{row.label}</div>
              <div style={{ fontSize: 15, fontWeight: 700, color: "#f1f5f9", marginBottom: 4 }}>{row.value}</div>
              <div style={{ fontSize: 11, color: "#475569" }}>{row.note}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const CPTs = () => (
    <div>
      <p style={S.sectionTitle}>2. Content Types — All Custom Post Types</p>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        {CPTS.map(cpt => {
          const st = STATUS[cpt.status];
          const isSelected = selectedCPT === cpt.id;
          return (
            <div
              key={cpt.id}
              onClick={() => setSelectedCPT(isSelected ? null : cpt.id)}
              style={{
                ...S.card,
                borderColor: isSelected ? cpt.color : "#1e293b",
                cursor: "pointer",
                transition: "border-color 0.15s",
                borderLeft: `4px solid ${cpt.color}`,
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 15, color: "#f1f5f9" }}>{cpt.label}</div>
                  <code style={{ fontSize: 11, color: "#64748b" }}>{cpt.slug}</code>
                </div>
                <span style={S.badge(st.text, st.bg, st.border)}>{st.label}</span>
              </div>
              <div style={{ fontSize: 11, color: "#64748b" }}>Plugin: <span style={{ color: "#94a3b8" }}>{cpt.plugin}</span></div>
              {isSelected && FIELDS[cpt.id] && (
                <div style={{ marginTop: 12, borderTop: "1px solid #1e293b", paddingTop: 10 }}>
                  <div style={{ fontSize: 10, color: "#475569", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 8 }}>Fields</div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
                    {FIELDS[cpt.id].map(f => (
                      <span key={f} style={{ fontSize: 11, padding: "2px 6px", background: "#1e293b", borderRadius: 4, color: "#94a3b8" }}>{f}</span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
      <p style={{ fontSize: 11, color: "#475569", marginTop: 12 }}>Click a card to expand its fields</p>
    </div>
  );

  const Relations = () => (
    <div>
      <p style={S.sectionTitle}>7. Content Relationships — Entity Relationship Map</p>
      <RelationDiagram selected={relSelected} onSelect={setRelSelected} />
      {relSelected && (
        <div style={{ ...S.card, marginTop: 16, borderColor: cptById[relSelected]?.color }}>
          <div style={{ fontWeight: 700, color: cptById[relSelected]?.color, marginBottom: 10 }}>
            {cptById[relSelected]?.label} relationships
          </div>
          {RELATIONSHIPS.filter(r => r.from === relSelected || r.to === relSelected).map((r, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8, fontSize: 13 }}>
              <span style={S.tag(cptById[r.from]?.color || "#64748b")}>{cptById[r.from]?.label}</span>
              <span style={{ color: "#64748b", fontSize: 11 }}>─ {r.label} →</span>
              <span style={S.tag(cptById[r.to]?.color || "#64748b")}>{cptById[r.to]?.label}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  const Taxonomies = () => (
    <div>
      <p style={S.sectionTitle}>3. Taxonomies — Grouping & Classification Structure</p>
      {Object.entries(TAXONOMIES).map(([cptId, taxList]) => {
        const cpt = cptById[cptId];
        if (!cpt) return null;
        return (
          <div key={cptId} style={{ ...S.card, marginBottom: 14, borderLeft: `4px solid ${cpt.color}` }}>
            <div style={{ fontWeight: 700, color: cpt.color, marginBottom: 12, fontSize: 14 }}>{cpt.label}</div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 10 }}>
              {taxList.map(tax => (
                <div key={tax.name} style={{ background: "#020617", borderRadius: 6, padding: "10px 12px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                    <span style={{ fontSize: 12, fontWeight: 700, color: "#e2e8f0" }}>{tax.name}</span>
                    <span style={S.badge(
                      tax.type === "hierarchical" ? "#a78bfa" : "#38bdf8",
                      tax.type === "hierarchical" ? "#1e1b4b" : "#082f49",
                      tax.type === "hierarchical" ? "#5b21b6" : "#0369a1"
                    )}>{tax.type}</span>
                  </div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
                    {tax.terms.map(t => (
                      <span key={t} style={{ fontSize: 10, padding: "2px 6px", background: "#1e293b", borderRadius: 3, color: "#64748b" }}>{t}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );

  const Fields = () => (
    <div>
      <p style={S.sectionTitle}>4. Content Fields — CPT Field Map</p>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 16 }}>
        {CPTS.filter(c => FIELDS[c.id]).map(c => (
          <button
            key={c.id}
            onClick={() => setSelectedCPT(selectedCPT === c.id ? null : c.id)}
            style={{
              padding: "6px 14px",
              borderRadius: 20,
              border: `1px solid ${selectedCPT === c.id ? c.color : "#1e293b"}`,
              background: selectedCPT === c.id ? c.color + "22" : "#0f172a",
              color: selectedCPT === c.id ? c.color : "#64748b",
              fontSize: 12,
              cursor: "pointer",
              fontFamily: "inherit",
            }}
          >{c.label}</button>
        ))}
      </div>
      {(selectedCPT ? CPTS.filter(c => c.id === selectedCPT) : CPTS.filter(c => FIELDS[c.id])).map(cpt => (
        <div key={cpt.id} style={{ ...S.card, marginBottom: 14, borderLeft: `4px solid ${cpt.color}` }}>
          <div style={{ fontWeight: 700, color: cpt.color, marginBottom: 12 }}>{cpt.label} <code style={{ fontSize: 11, color: "#475569" }}>({cpt.slug})</code></div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 6 }}>
            {FIELDS[cpt.id].map((f, i) => {
              const isRel = f.includes("(rel)");
              const isTax = f.includes("(tax)");
              return (
                <div key={i} style={{
                  padding: "6px 10px",
                  background: "#020617",
                  borderRadius: 5,
                  fontSize: 12,
                  color: isRel ? "#f59e0b" : isTax ? "#a78bfa" : "#94a3b8",
                  border: `1px solid ${isRel ? "#78350f" : isTax ? "#4c1d95" : "#1e293b"}`,
                }}>{f}</div>
              );
            })}
          </div>
          <div style={{ marginTop: 8, fontSize: 11, color: "#475569" }}>
            <span style={{ color: "#f59e0b" }}>■</span> Relationship &nbsp;
            <span style={{ color: "#a78bfa" }}>■</span> Taxonomy &nbsp;
            <span style={{ color: "#64748b" }}>■</span> Standard field
          </div>
        </div>
      ))}
    </div>
  );

  const Templates = () => (
    <div>
      <p style={S.sectionTitle}>5. Templates Required — Theme File Architecture</p>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
        {TEMPLATES.map((t, i) => (
          <div
            key={i}
            onClick={() => setSelectedTemplate(selectedTemplate === i ? null : i)}
            style={{
              ...S.card,
              cursor: "pointer",
              borderColor: selectedTemplate === i ? "#38bdf8" : "#1e293b",
            }}
          >
            <div style={{ fontWeight: 700, fontSize: 13, color: "#f1f5f9", marginBottom: 4 }}>{t.name}</div>
            <code style={{ fontSize: 10, color: "#475569" }}>{t.file}</code>
            {selectedTemplate === i && (
              <div style={{ marginTop: 10, display: "flex", flexWrap: "wrap", gap: 4 }}>
                {t.modules.map(m => (
                  <span key={m} style={{ fontSize: 11, padding: "2px 8px", background: "#082f49", border: "1px solid #0369a1", borderRadius: 4, color: "#38bdf8" }}>{m}</span>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
      <p style={{ fontSize: 11, color: "#475569", marginTop: 12 }}>Click a template to see its dynamic modules</p>
    </div>
  );

  const Plugins = () => (
    <div>
      <p style={S.sectionTitle}>10.4 Recommended Plugin Stack</p>
      {["Essential", "High", "Medium", "Future"].map(prio => {
        const list = PLUGINS.filter(p => p.priority === prio);
        if (!list.length) return null;
        return (
          <div key={prio} style={{ marginBottom: 20 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
              <div style={{ width: 10, height: 10, borderRadius: 2, background: PRIORITY_COLOR[prio] }} />
              <span style={{ fontSize: 11, fontWeight: 700, color: PRIORITY_COLOR[prio], letterSpacing: "0.1em", textTransform: "uppercase" }}>{prio}</span>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
              {list.map(p => (
                <div key={p.name} style={{ ...S.card, borderLeft: `3px solid ${PRIORITY_COLOR[prio]}` }}>
                  <div style={{ fontWeight: 700, fontSize: 13, color: "#f1f5f9", marginBottom: 4 }}>{p.name}</div>
                  <div style={{ fontSize: 11, color: "#64748b" }}>{p.purpose}</div>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );

  const Gaps = () => (
    <div>
      <p style={S.sectionTitle}>9. Scalability — Critical Gaps & Recommended Improvements</p>
      <div style={{ ...S.card, borderLeft: "4px solid #ef4444", marginBottom: 20 }}>
        <div style={{ fontWeight: 700, color: "#ef4444", marginBottom: 12 }}>⚠ Critical Gaps Identified</div>
        {GAPS.map((g, i) => (
          <div key={i} style={{ display: "flex", gap: 10, marginBottom: 8, alignItems: "flex-start" }}>
            <span style={{ color: "#ef4444", fontSize: 14, flexShrink: 0 }}>✗</span>
            <span style={{ fontSize: 12, color: "#94a3b8" }}>{g}</span>
          </div>
        ))}
      </div>
      <div style={{ ...S.card }}>
        <div style={{ fontWeight: 700, color: "#4ade80", marginBottom: 12 }}>✦ Recommended Improvements</div>
        {IMPROVEMENTS.map((item, i) => (
          <div key={i} style={{
            display: "flex", gap: 12, alignItems: "flex-start",
            marginBottom: 10, paddingBottom: 10,
            borderBottom: i < IMPROVEMENTS.length - 1 ? "1px solid #1e293b" : "none"
          }}>
            <span style={{
              flexShrink: 0, padding: "2px 8px", borderRadius: 4, fontSize: 10, fontWeight: 700,
              background: PRIO_COLOR[item.priority] + "22", color: PRIO_COLOR[item.priority],
              border: `1px solid ${PRIO_COLOR[item.priority]}44`,
            }}>{item.priority}</span>
            <div>
              <div style={{ fontSize: 13, color: "#e2e8f0", marginBottom: 2 }}>{item.item}</div>
              <div style={{ fontSize: 11, color: "#475569" }}>{item.benefit}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const panels = { overview: Overview, cpts: CPTs, relations: Relations, taxonomies: Taxonomies, fields: Fields, templates: Templates, plugins: Plugins, gaps: Gaps };
  const Panel = panels[tab];

  return (
    <div style={S.app}>
      {/* Header */}
      <div style={S.header}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div>
            <h1 style={S.title}>NASOM.ORG.MY — CMS Architecture</h1>
            <p style={S.subtitle}>WORDPRESS REVERSE-ENGINEERING ANALYSIS · MARCH 2026 · SENIOR ARCHITECT REVIEW</p>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            {[
              { label: "Active", color: "#4ade80" },
              { label: "Partial", color: "#fbbf24" },
              { label: "Missing", color: "#f87171" },
            ].map(b => (
              <div key={b.label} style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 11, color: "#64748b" }}>
                <div style={{ width: 8, height: 8, borderRadius: 2, background: b.color }} />
                {b.label}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Nav */}
      <div style={S.nav}>
        {TABS.map(t => (
          <button key={t.id} style={S.navBtn(tab === t.id)} onClick={() => setTab(t.id)}>{t.label}</button>
        ))}
      </div>

      {/* Body */}
      <div style={S.body}>
        <Panel />
      </div>
    </div>
  );
}
