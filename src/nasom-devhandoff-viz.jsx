import { useState } from "react";

const C = {
  bg: "#060b14", card: "#0c1624", border: "#1a2e48",
  text: "#e2e8f0", muted: "#64748b",
  navy: "#1A3A5C", blue: "#3b82f6", blueLt: "#dbeafe",
  teal: "#10b981", tealLt: "#d1fae5",
  amber: "#f59e0b", amberLt: "#fef3c7",
  red: "#ef4444", redLt: "#fee2e2",
  green: "#22c55e", greenLt: "#dcfce7",
  slate: "#64748b", slateLt: "#f1f5f9",
};

const CPTS = [
  { slug: "programme", label: "Our Programmes", template: "archive-programme.php / single-programme.php",
    fields: ["title", "excerpt", "programme_type (tax)", "audience_group (tax)", "age_from", "age_to", "eligibility (rich text)", "how_to_apply (rich text)", "centre_ref (CPT ref)", "featured_image", "is_active (bool)"],
    tax: ["programme_type", "audience_group"], archive: "/programmes/", single: "/programmes/[slug]", status: "New", priority: "P0" },
  { slug: "centre", label: "Our Centres", template: "archive-centre.php / single-centre.php",
    fields: ["title", "address", "state (tax)", "lat", "lng", "phone", "email", "centre_type (tax)", "programmes_offered (CPT ref multi)", "featured_image", "is_active (bool)"],
    tax: ["state", "centre_type"], archive: "/centres/", single: "/centres/[slug]", status: "New", priority: "P0" },
  { slug: "career", label: "Careers", template: "archive-career.php / single-career.php",
    fields: ["title", "job_type (tax)", "department", "location_ref (CPT ref)", "closing_date", "salary_range", "description (rich text)", "how_to_apply (rich text)", "is_active (bool)"],
    tax: ["job_type"], archive: "/careers/", single: "/careers/[slug]", status: "Rebuild", priority: "P1" },
  { slug: "resource", label: "Resources", template: "archive-resource.php / single-resource.php",
    fields: ["title", "resource_type (tax)", "audience_type (tax)", "language (tax)", "file_url", "external_url", "description (rich text)", "featured_image", "publish_date"],
    tax: ["resource_type", "audience_type", "language"], archive: "/resources/", single: "/resources/[slug]", status: "New", priority: "P1" },
  { slug: "team_member", label: "Team / Board", template: "archive-team.php / single-team.php",
    fields: ["title", "role", "department (tax)", "bio (rich text)", "photo", "linkedin_url", "order (number)"],
    tax: ["department"], archive: "/about/board", single: "/about/board/[slug]", status: "Partial", priority: "P1" },
  { slug: "post", label: "News & Stories", template: "archive-post.php / single-post.php",
    fields: ["title", "content", "excerpt", "category (tax)", "tags (tax)", "featured_image", "author"],
    tax: ["category", "post_tag"], archive: "/news/", single: "/news/[slug]", status: "New", priority: "P1" },
  { slug: "tribe_events", label: "Events", template: "tribe-events/ (TEC)",
    fields: ["title", "description", "start_datetime", "end_datetime", "venue (CPT)", "organizer (CPT)", "event_category (tax)", "cost", "registration_url", "featured_image"],
    tax: ["tribe_events_cat"], archive: "/events/", single: "/events/[slug]", status: "Active", priority: "P1" },
];

const PLUGINS = [
  { name: "Advanced Custom Fields PRO", purpose: "All CPT field groups", install: "Upload ACF PRO zip", config: "Import field group JSON from /acf-exports/. Enable Local JSON sync.", priority: "P0", dep: "All CPTs" },
  { name: "The Events Calendar PRO", purpose: "Events CPT, venue/organiser, recurring, calendar views", install: "Upload TEC PRO zip", config: "URL slug = 'events'. Enable iCal. Default view = Month.", priority: "P0", dep: "Events" },
  { name: "WPForms PRO / Gravity Forms", purpose: "Contact, volunteer, partnership, membership forms", install: "Install via WP admin", config: "Enable email notifications. Enable Stripe add-on for donations.", priority: "P0", dep: "Forms" },
  { name: "Yoast SEO / Rank Math PRO", purpose: "Meta, OG tags, sitemaps, schema markup", install: "Install via WP admin", config: "Org name = NASOM. Enable breadcrumb schema. Connect GSC.", priority: "P0", dep: "SEO" },
  { name: "iPay88 / Billplz / Stripe", purpose: "Payment gateway for donations and event fees", install: "Install gateway plugin", config: "Enter merchant credentials. Set return URL. Enable test mode first.", priority: "P0", dep: "Payments" },
  { name: "SearchWP", purpose: "Sitewide search indexing all CPTs + custom fields", install: "Upload SearchWP zip", config: "Index all CPTs and custom fields. Enable live search.", priority: "P1", dep: "Search" },
  { name: "FacetWP", purpose: "Filter/sort on programme, centre, resource, career archives", install: "Upload FacetWP zip", config: "Create facets: programme_type, audience_group, state, resource_type.", priority: "P1", dep: "Filters" },
  { name: "WP Rocket", purpose: "Page caching, minification, lazy load, CDN", install: "Upload WP Rocket zip", config: "Enable page cache + lazy load. Set CDN URL if using Cloudflare.", priority: "P1", dep: "Performance" },
  { name: "Polylang / WPML", purpose: "Bahasa Malaysia language track (Phase 2 only)", install: "Install via WP admin - Phase 2", config: "Set EN as default. Add BM as secondary. Translate CPT slugs.", priority: "P2", dep: "Multilingual" },
];

const TEMPLATES = [
  { name: "Homepage", php: "front-page.php", cpt: "-", modules: "Hero (ACF), Programmes teaser, Centres map widget, Stats bar, News feed (3), Events feed (3), Donate CTA strip", priority: "P0" },
  { name: "Programmes Archive", php: "archive-programme.php", cpt: "programme", modules: "FacetWP filter bar (programme_type, audience_group), Loop of programme cards, Pagination", priority: "P0" },
  { name: "Programme Single", php: "single-programme.php", cpt: "programme", modules: "Hero, Eligibility block, How to Apply, Centre ref card, Related programmes, Enquiry form", priority: "P0" },
  { name: "Centres Archive", php: "archive-centre.php", cpt: "centre", modules: "Google Maps embed with pins, FacetWP state filter, Centre cards with address + programmes", priority: "P0" },
  { name: "Centre Single", php: "single-centre.php", cpt: "centre", modules: "Address + map, Phone/email/hours, Programmes offered (CPT query), Gallery (Envira)", priority: "P0" },
  { name: "Donate Page", php: "page-donate.php", cpt: "-", modules: "Donation form (WPForms + iPay88), One-time vs monthly toggle, Impact stats, Social proof", priority: "P0" },
  { name: "Get Involved Hub", php: "page-get-involved.php", cpt: "-", modules: "4 card blocks: Donate, Volunteer, Fundraise, Corporate Partnerships", priority: "P0" },
  { name: "Careers Archive", php: "archive-career.php", cpt: "career", modules: "Filter: job_type, is_active. Loop active jobs. Expired hidden via meta_query.", priority: "P1" },
  { name: "Career Single", php: "single-career.php", cpt: "career", modules: "Job title, type, location, closing date, Description, How to apply, Application form", priority: "P1" },
  { name: "Resources Archive", php: "archive-resource.php", cpt: "resource", modules: "FacetWP filters: resource_type, audience_type, language. Cards with download link.", priority: "P1" },
  { name: "News Archive", php: "archive-post.php", cpt: "post", modules: "Category filter, Featured post, Grid of post cards, Pagination", priority: "P1" },
  { name: "News Single", php: "single-post.php", cpt: "post", modules: "Featured image, Category badge, Author, Date, Content, Related posts (same category)", priority: "P1" },
  { name: "Team Archive", php: "archive-team_member.php", cpt: "team_member", modules: "Grid of member cards ordered by ACF order field, department filter", priority: "P1" },
  { name: "Custom 404", php: "404.php", cpt: "-", modules: "SearchWP search bar, Popular pages links, Contact CTA", priority: "P1" },
];

const priColor = (p) => p === "P0" ? C.red : p === "P1" ? C.blue : C.teal;
const statusColor = (s) => s === "New" ? C.teal : s === "Rebuild" ? C.red : s === "Partial" ? C.amber : s === "Active" ? C.green : C.slate;

const TABS = ["CPT Specs", "Plugin Stack", "Templates", "Build Order"];

export default function DevHandoffDashboard() {
  const [tab, setTab] = useState(0);
  const [selectedCpt, setSelectedCpt] = useState("programme");
  const [filterPri, setFilterPri] = useState("All");

  const sel = CPTS.find(c => c.slug === selectedCpt);

  return (
    <div style={{ background: C.bg, minHeight: "100vh", fontFamily: "system-ui,sans-serif", color: C.text, padding: "24px" }}>

      <div style={{ marginBottom: "24px" }}>
        <div style={{ fontSize: "11px", color: C.muted, letterSpacing: "2px", textTransform: "uppercase", marginBottom: "6px" }}>NASOM.ORG.MY — DEVELOPER HANDOFF</div>
        <h1 style={{ margin: 0, fontSize: "22px", fontWeight: 700, color: C.text }}>WordPress Developer Specification</h1>
        <div style={{ marginTop: "6px", fontSize: "13px", color: C.muted }}>7 CPTs &nbsp;·&nbsp; 9 Plugins &nbsp;·&nbsp; 14 Templates &nbsp;·&nbsp; P0 = 6 templates before content entry</div>
      </div>

      {/* Stats */}
      <div style={{ display: "flex", gap: "12px", marginBottom: "20px", flexWrap: "wrap" }}>
        {[
          { label: "Custom Post Types", val: CPTS.length, color: C.blue },
          { label: "P0 CPTs", val: CPTS.filter(c => c.priority === "P0").length, color: C.red },
          { label: "Plugins", val: PLUGINS.length, color: C.teal },
          { label: "Templates", val: TEMPLATES.length, color: C.blue },
          { label: "P0 Templates", val: TEMPLATES.filter(t => t.priority === "P0").length, color: C.red },
          { label: "Taxonomies", val: 5, color: C.amber },
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
            background: tab === i ? C.blue : "transparent", color: tab === i ? "#fff" : C.muted,
            border: "none", borderRadius: "6px 6px 0 0", padding: "8px 18px",
            cursor: "pointer", fontSize: "13px", fontWeight: tab === i ? 700 : 400
          }}>{t}</button>
        ))}
      </div>

      {/* TAB 0: CPT SPECS */}
      {tab === 0 && (
        <div style={{ display: "flex", gap: "16px" }}>
          {/* Left CPT list */}
          <div style={{ width: "200px", flexShrink: 0 }}>
            {CPTS.map(c => (
              <div key={c.slug} onClick={() => setSelectedCpt(c.slug)}
                style={{ background: selectedCpt === c.slug ? C.blue + "22" : C.card,
                  border: "1px solid " + (selectedCpt === c.slug ? C.blue : C.border),
                  borderRadius: "8px", padding: "10px 14px", marginBottom: "8px", cursor: "pointer" }}>
                <div style={{ fontSize: "11px", fontFamily: "monospace", color: selectedCpt === c.slug ? C.blue : C.muted }}>{c.slug}</div>
                <div style={{ fontSize: "13px", fontWeight: 600, color: C.text, marginTop: "2px" }}>{c.label}</div>
                <div style={{ display: "flex", gap: "6px", marginTop: "6px" }}>
                  <span style={{ background: priColor(c.priority) + "22", color: priColor(c.priority), borderRadius: "3px", padding: "1px 6px", fontSize: "10px", fontWeight: 700 }}>{c.priority}</span>
                  <span style={{ background: statusColor(c.status) + "22", color: statusColor(c.status), borderRadius: "3px", padding: "1px 6px", fontSize: "10px" }}>{c.status}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Right detail */}
          {sel && (
            <div style={{ flex: 1 }}>
              <div style={{ background: C.card, border: "1px solid " + C.border, borderRadius: "10px", padding: "20px", marginBottom: "14px",
                borderTop: "4px solid " + priColor(sel.priority) }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "12px" }}>
                  <div>
                    <div style={{ fontSize: "11px", fontFamily: "monospace", color: C.blue, marginBottom: "4px" }}>{sel.slug}</div>
                    <div style={{ fontSize: "20px", fontWeight: 700, color: C.text }}>{sel.label}</div>
                  </div>
                  <div style={{ display: "flex", gap: "8px" }}>
                    <span style={{ background: priColor(sel.priority) + "22", color: priColor(sel.priority), borderRadius: "4px", padding: "4px 12px", fontWeight: 700 }}>{sel.priority}</span>
                    <span style={{ background: statusColor(sel.status) + "22", color: statusColor(sel.status), borderRadius: "4px", padding: "4px 12px" }}>{sel.status}</span>
                  </div>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "12px" }}>
                  <div>
                    <div style={{ fontSize: "11px", color: C.muted, marginBottom: "4px", textTransform: "uppercase" }}>Archive URL</div>
                    <div style={{ fontFamily: "monospace", fontSize: "13px", color: C.teal }}>{sel.archive}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: "11px", color: C.muted, marginBottom: "4px", textTransform: "uppercase" }}>Single URL</div>
                    <div style={{ fontFamily: "monospace", fontSize: "13px", color: C.teal }}>{sel.single}</div>
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: "11px", color: C.muted, marginBottom: "4px", textTransform: "uppercase" }}>PHP Template</div>
                  <div style={{ fontFamily: "monospace", fontSize: "13px", color: C.slate }}>{sel.template}</div>
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                <div style={{ background: C.card, border: "1px solid " + C.border, borderRadius: "8px", padding: "16px" }}>
                  <div style={{ fontSize: "11px", fontWeight: 700, color: C.blue, textTransform: "uppercase", letterSpacing: "1px", marginBottom: "10px" }}>ACF Fields</div>
                  {sel.fields.map((f, i) => (
                    <div key={i} style={{ background: C.bg, border: "1px solid " + C.border, borderRadius: "4px", padding: "4px 10px", marginBottom: "4px", fontFamily: "monospace", fontSize: "12px", color: C.text }}>{f}</div>
                  ))}
                </div>
                <div style={{ background: C.card, border: "1px solid " + C.border, borderRadius: "8px", padding: "16px" }}>
                  <div style={{ fontSize: "11px", fontWeight: 700, color: C.teal, textTransform: "uppercase", letterSpacing: "1px", marginBottom: "10px" }}>Taxonomies</div>
                  {sel.tax.map((t, i) => (
                    <div key={i} style={{ background: C.teal + "22", border: "1px solid " + C.teal + "44", borderRadius: "4px", padding: "4px 10px", marginBottom: "4px", fontFamily: "monospace", fontSize: "12px", color: C.teal }}>{t}</div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB 1: PLUGIN STACK */}
      {tab === 1 && (
        <div>
          <div style={{ display: "flex", gap: "8px", marginBottom: "16px" }}>
            {["All", "P0", "P1", "P2"].map(f => (
              <button key={f} onClick={() => setFilterPri(f)} style={{
                background: filterPri === f ? C.blue : C.card, color: filterPri === f ? "#fff" : C.muted,
                border: "1px solid " + C.border, borderRadius: "6px", padding: "6px 14px", cursor: "pointer", fontSize: "12px"
              }}>{f}</button>
            ))}
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            {PLUGINS.filter(p => filterPri === "All" || p.priority === filterPri).map((p, i) => (
              <div key={i} style={{ background: C.card, border: "1px solid " + C.border, borderRadius: "10px", padding: "16px 20px",
                borderLeft: "4px solid " + priColor(p.priority) }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "8px" }}>
                  <div style={{ fontSize: "14px", fontWeight: 700, color: C.text }}>{p.name}</div>
                  <div style={{ display: "flex", gap: "8px" }}>
                    <span style={{ background: priColor(p.priority) + "22", color: priColor(p.priority), borderRadius: "4px", padding: "2px 10px", fontSize: "11px", fontWeight: 700 }}>{p.priority}</span>
                    <span style={{ background: C.blue + "11", color: C.muted, borderRadius: "4px", padding: "2px 10px", fontSize: "11px" }}>{p.dep}</span>
                  </div>
                </div>
                <div style={{ fontSize: "13px", color: C.muted, marginBottom: "8px" }}>{p.purpose}</div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                  <div>
                    <span style={{ fontSize: "11px", color: C.amber, fontWeight: 600 }}>INSTALL: </span>
                    <span style={{ fontSize: "12px", color: C.text }}>{p.install}</span>
                  </div>
                  <div>
                    <span style={{ fontSize: "11px", color: C.teal, fontWeight: 600 }}>CONFIG: </span>
                    <span style={{ fontSize: "12px", color: C.text }}>{p.config}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: TEMPLATES */}
      {tab === 2 && (
        <div>
          <div style={{ display: "flex", gap: "8px", marginBottom: "16px" }}>
            {["All", "P0", "P1"].map(f => (
              <button key={f} onClick={() => setFilterPri(f)} style={{
                background: filterPri === f ? C.blue : C.card, color: filterPri === f ? "#fff" : C.muted,
                border: "1px solid " + C.border, borderRadius: "6px", padding: "6px 14px", cursor: "pointer", fontSize: "12px"
              }}>{f}</button>
            ))}
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            {TEMPLATES.filter(t => filterPri === "All" || t.priority === filterPri).map((t, i) => (
              <div key={i} style={{ background: C.card, border: "1px solid " + C.border, borderRadius: "8px", padding: "14px 18px",
                borderLeft: "4px solid " + priColor(t.priority) }}>
                <div style={{ display: "flex", gap: "16px", alignItems: "flex-start", flexWrap: "wrap" }}>
                  <div style={{ minWidth: "180px" }}>
                    <div style={{ fontSize: "14px", fontWeight: 700, color: C.text }}>{t.name}</div>
                    <div style={{ fontFamily: "monospace", fontSize: "12px", color: C.slate, marginTop: "4px" }}>{t.php}</div>
                    {t.cpt !== "-" && <div style={{ fontFamily: "monospace", fontSize: "11px", color: C.teal, marginTop: "2px" }}>CPT: {t.cpt}</div>}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: "11px", color: C.muted, marginBottom: "4px", textTransform: "uppercase" }}>Dynamic Modules</div>
                    <div style={{ fontSize: "13px", color: C.text, lineHeight: 1.6 }}>{t.modules}</div>
                  </div>
                  <span style={{ background: priColor(t.priority) + "22", color: priColor(t.priority), borderRadius: "4px", padding: "3px 10px", fontSize: "11px", fontWeight: 700, flexShrink: 0 }}>{t.priority}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: BUILD ORDER */}
      {tab === 3 && (
        <div>
          {[
            { phase: "Phase 1 — P0 Sprint (Before Content Entry)", color: C.red, items: [
              "Install + configure all P0 plugins (ACF PRO, TEC PRO, WPForms, Yoast, iPay88)",
              "Register all 7 CPTs in nasom-cpts/ plugin with show_in_rest: true",
              "Import ACF field groups from /acf-exports/",
              "Build: front-page.php, archive-programme.php, single-programme.php",
              "Build: archive-centre.php, single-centre.php",
              "Build: page-donate.php, page-get-involved.php",
              "QA: all P0 templates on desktop + mobile breakpoints",
              "QA: donation flow end-to-end in test mode",
            ]},
            { phase: "Phase 2 — P1 Sprint (Site Relaunch)", color: C.blue, items: [
              "Install + configure P1 plugins (SearchWP, FacetWP, WP Rocket)",
              "Build: archive-career.php, single-career.php",
              "Build: archive-resource.php",
              "Build: archive-post.php, single-post.php",
              "Build: archive-team_member.php",
              "Build: 404.php",
              "Configure FacetWP facets on all archive pages",
              "Configure SearchWP index for all CPTs",
              "QA: all P1 templates + search + filters",
            ]},
            { phase: "Phase 3 — P2 (Post-Launch)", color: C.teal, items: [
              "Install Polylang/WPML for Bahasa Malaysia track",
              "Translate CPT slugs and all nav menus",
              "Translate homepage and key programme pages",
              "Performance audit with WP Rocket + Cloudflare",
              "WCAG AA accessibility audit + remediation",
            ]},
          ].map(ph => (
            <div key={ph.phase} style={{ marginBottom: "24px" }}>
              <div style={{ background: ph.color, borderRadius: "8px 8px 0 0", padding: "12px 20px", fontSize: "14px", fontWeight: 700, color: "#fff" }}>{ph.phase}</div>
              <div style={{ background: C.card, border: "1px solid " + C.border, borderRadius: "0 0 8px 8px", padding: "16px 20px" }}>
                {ph.items.map((item, i) => (
                  <div key={i} style={{ display: "flex", gap: "12px", padding: "8px 0", borderBottom: i < ph.items.length - 1 ? "1px solid " + C.border : "none" }}>
                    <span style={{ background: ph.color + "22", color: ph.color, borderRadius: "4px", width: "24px", height: "24px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "11px", fontWeight: 700, flexShrink: 0 }}>{i + 1}</span>
                    <span style={{ fontSize: "13px", color: C.text, lineHeight: 1.6 }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}


