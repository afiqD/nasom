import { useState } from "react";

// ─── PALETTE ──────────────────────────────────────────────────────────────────
const BG      = "#0a0f1e";
const CARD_BG = "#0d1a2e";
const BORDER  = "#1e3a5f";
const ACCENT  = "#38bdf8";
const TEXT    = "#e2e8f0";
const MUTED   = "#64748b";
const DIM     = "#475569";

// ─── DATA ─────────────────────────────────────────────────────────────────────
const USER_SEGMENTS = {
  Malaysia: [
    { id: "my-parent-new", label: "Parent (New Diagnosis)", icon: "👨‍👩‍👦", color: "#3b82f6", desc: "Urgent, emotional, mobile-first, BM/EN" },
    { id: "my-parent-ong", label: "Parent (Ongoing)",       icon: "🏠",      color: "#06b6d4", desc: "Repeat visitor, checks events and news" },
    { id: "my-donor",      label: "Donor (Campaign)",       icon: "💙",      color: "#10b981", desc: "Impulse-driven, mobile, social entry" },
    { id: "my-jobseeker",  label: "Job Seeker",             icon: "💼",      color: "#8b5cf6", desc: "Therapist / educator, Jobstreet / LinkedIn" },
    { id: "my-corporate",  label: "Corporate CSR",          icon: "🏢",      color: "#f59e0b", desc: "Desktop, professional, partnership-seeking" },
    { id: "my-volunteer",  label: "Volunteer (Local)",      icon: "🙌",      color: "#ec4899", desc: "Youth, Instagram / TikTok discovery" },
  ],
  Global: [
    { id: "gl-diaspora",   label: "Malaysian Diaspora",         icon: "🌏", color: "#f59e0b", desc: "UK/AU/SG, donates remotely, WhatsApp share" },
    { id: "gl-ngo",        label: "Intl NGO / Partner",         icon: "🤝", color: "#3b82f6", desc: "Full credibility assessment before contact" },
    { id: "gl-volunteer",  label: "Intl Volunteer",             icon: "✈️", color: "#10b981", desc: "Gap year, GoOverseas / Workaway entry" },
    { id: "gl-researcher", label: "Academic / Researcher",      icon: "🔬", color: "#8b5cf6", desc: "Google Scholar, Southeast Asia autism study" },
    { id: "gl-media",      label: "Media / Press",              icon: "📰", color: "#ec4899", desc: "Story research, spokesperson contact" },
    { id: "gl-govt",       label: "Government / Institutional", icon: "🏛️", color: "#06b6d4", desc: "Policy review, accreditation" },
  ],
};

const FLOWS = {
  "my-parent-new": {
    title: "Parent — New Diagnosis", context: "Malaysia", conversion: "Service Enquiry", priority: 5, color: "#3b82f6",
    steps: [
      { id: 1, phase: "Discover",  label: "Google Search",     action: "Searches 'autisme kanak-kanak Malaysia' or 'autism centre near me'",  template: null,                   cta: "Click NASOM result" },
      { id: 2, phase: "Land",      label: "Homepage",          action: "Reads hero tagline, sees Find a Programme and Donate CTAs",           template: "front-page.php",       cta: "Learn More" },
      { id: 3, phase: "Educate",   label: "Autism Guide",      action: "Reads signs, causes, FAQs — builds emotional trust",                  template: "page.php",             cta: "See Our Programmes" },
      { id: 4, phase: "Explore",   label: "Services Archive",  action: "Filters by Age Group (0-6 yrs) — sees Early Intervention",           template: "archive-service.php",  cta: "View Programme" },
      { id: 5, phase: "Evaluate",  label: "Service Detail",    action: "Reads Eligibility, Intake Process, Duration, Linked Centres",         template: "single-service.php",   cta: "Enquire Now" },
      { id: 6, phase: "Locate",    label: "Find Centre",       action: "Opens map, filters by State (Selangor), picks nearest centre",        template: "archive-centre.php",   cta: "View Centre" },
      { id: 7, phase: "Convert",   label: "Enquire",           action: "Submits contact form: Name, Child Age, Diagnosis, Phone",             template: "single-centre.php",    cta: "Submit Enquiry" },
      { id: 8, phase: "Nurture",   label: "Email + Resources", action: "Receives confirmation email with link to resources page",             template: "archive-resource.php", cta: "Explore Resources" },
    ],
    gaps: ["Services CPT missing — currently a flat hardcoded page", "Centres CPT not modelled at all", "Age Group taxonomy filter needs FacetWP"],
  },
  "my-donor": {
    title: "Donor — Campaign Triggered", context: "Malaysia", conversion: "Donation", priority: 4, color: "#10b981",
    steps: [
      { id: 1, phase: "Discover", label: "Social Media",       action: "Sees campaign post — Eco-Run, awareness month, emotional story",        template: null,                 cta: "Clicks link" },
      { id: 2, phase: "Land",     label: "Event / Homepage",   action: "Reads event story, sees donation appeal and impact stats",               template: "tribe-single.php",   cta: "Donate Now" },
      { id: 3, phase: "Intent",   label: "Donate Page",        action: "Picks amount RM10 / RM50 / RM100 / Custom, reads impact text",           template: "page-donate.php",    cta: "Proceed to Payment" },
      { id: 4, phase: "Convert",  label: "Payment Gateway",    action: "Completes payment via FPX bank selection (Malaysian-localised)",          template: null,                 cta: "Confirm Donation" },
      { id: 5, phase: "Confirm",  label: "Thank You",          action: "Receipt shown + share to WhatsApp and Facebook buttons",                 template: "page-thankyou.php",  cta: "Share with Friends" },
      { id: 6, phase: "Nurture",  label: "Email Receipt",      action: "Official receipt + upcoming event suggestion + Blog post link",           template: "archive.php",        cta: "See More Events" },
    ],
    gaps: ["Donate page needs Malaysian FPX / DuitNow gateway integration", "Impact Stats block (ACF Options) not yet built", "Thank-you page with WhatsApp share meta tags missing"],
  },
  "my-jobseeker": {
    title: "Job Seeker — Therapist", context: "Malaysia", conversion: "Job Application", priority: 3, color: "#8b5cf6",
    steps: [
      { id: 1, phase: "Discover",  label: "Job Board",          action: "Searches 'autism therapist job Selangor' on Jobstreet or LinkedIn",    template: null,                 cta: "Clicks NASOM listing" },
      { id: 2, phase: "Browse",    label: "Careers Archive",    action: "Filters by Department (Therapy) and Centre Location (Selangor)",       template: "archive-career.php", cta: "View Job" },
      { id: 3, phase: "Evaluate",  label: "Job Detail",         action: "Reads title, dept, location, requirements, deadline, benefits",         template: "single-career.php",  cta: "Apply Now" },
      { id: 4, phase: "Convert",   label: "Apply Form",         action: "Submits Name, Email, Phone, CV upload",                                 template: "single-career.php",  cta: "Submit Application" },
      { id: 5, phase: "Nurture",   label: "Confirmation Email", action: "Auto-confirmation email with About NASOM link to learn mission",        template: "page-about.php",     cta: "Learn About NASOM" },
    ],
    gaps: ["Careers is currently a static page — no CPT exists", "No job listing archive with filters", "No Is Active? toggle to auto-hide filled roles"],
  },
  "my-corporate": {
    title: "Corporate CSR Partner", context: "Malaysia", conversion: "Partnership Enquiry", priority: 4, color: "#f59e0b",
    steps: [
      { id: 1, phase: "Discover",  label: "Google / Referral",  action: "Searches 'CSR autism Malaysia' or gets word-of-mouth referral",        template: null,             cta: "Visits NASOM site" },
      { id: 2, phase: "Evaluate",  label: "Fundraise Page",     action: "Reviews partnership models, past corporate partners, event types",      template: "page.php",       cta: "See Our Impact" },
      { id: 3, phase: "Validate",  label: "About + Impact",     action: "Checks board, accreditation, registration number, stats block",         template: "page-about.php", cta: "View Past Events" },
      { id: 4, phase: "Evidence",  label: "Events Archive",     action: "Browses past events tab — Eco-Run, charity runs as precedent",          template: "tribe-list.php", cta: "Partner With Us" },
      { id: 5, phase: "Convert",   label: "Corporate Enquiry",  action: "Submits company name, CSR budget range, preferred partnership type",    template: "page.php",       cta: "Submit" },
      { id: 6, phase: "Close",     label: "Follow-Up",          action: "NASOM sends partnership deck, schedules intro call",                    template: null,             cta: "—" },
    ],
    gaps: ["Fundraise page needs past partner logos (ACF Repeater field)", "Corporate enquiry form separate from general contact form needed", "Impact Stats block on About page not built"],
  },
  "my-volunteer": {
    title: "Local Volunteer", context: "Malaysia", conversion: "Volunteer Application", priority: 3, color: "#ec4899",
    steps: [
      { id: 1, phase: "Discover",  label: "Instagram / TikTok", action: "Sees NASOM post or story shared by friend during awareness month",     template: null,                 cta: "Visits site" },
      { id: 2, phase: "Explore",   label: "Volunteer Page",     action: "Reads what volunteering involves, time commitment, skills needed",      template: "page.php",           cta: "Find a Centre" },
      { id: 3, phase: "Locate",    label: "Centres Archive",    action: "Picks a centre near home that accepts volunteers",                      template: "archive-centre.php", cta: "Apply" },
      { id: 4, phase: "Convert",   label: "Apply Form",         action: "Submits Name, Contact, Availability, Motivation statement",             template: "page.php",           cta: "Submit Application" },
      { id: 5, phase: "Onboard",   label: "Welcome Email",      action: "Receives volunteer guide and coordinator WhatsApp contact",             template: null,                 cta: "Confirm Placement" },
    ],
    gaps: ["Volunteer page lacks clear programme details and duration info", "Centres CPT not built — cannot show which centres accept volunteers", "No dedicated volunteer application form"],
  },
  "my-parent-ong": {
    title: "Parent (Ongoing)", context: "Malaysia", conversion: "Re-engagement", priority: 3, color: "#06b6d4",
    steps: [
      { id: 1, phase: "Direct",   label: "Direct Visit",    action: "Returns directly to NASOM — checks for updates, events, news",             template: "front-page.php",  cta: "See Events" },
      { id: 2, phase: "Explore",  label: "Events Archive",  action: "Browses upcoming events — workshops, support groups, fundraisers",          template: "tribe-list.php",  cta: "Register" },
      { id: 3, phase: "Engage",   label: "Blog / Stories",  action: "Reads latest autism awareness article or community story",                  template: "archive.php",     cta: "Read More" },
      { id: 4, phase: "Convert",  label: "Donate / Share",  action: "Makes a repeat donation or shares event on WhatsApp family group",          template: "page-donate.php", cta: "Donate Now" },
    ],
    gaps: ["Blog / News section does not currently exist", "Events calendar not actively maintained — upcoming list is empty"],
  },
  "gl-diaspora": {
    title: "Malaysian Diaspora Donor", context: "Global", conversion: "International Donation", priority: 5, color: "#f59e0b",
    steps: [
      { id: 1, phase: "Discover", label: "WhatsApp / Facebook", action: "Malaysian family member shares event post or campaign link",            template: null,                 cta: "Opens link" },
      { id: 2, phase: "Land",     label: "Homepage (EN)",       action: "Views English homepage — checks legitimacy, reads tagline",             template: "front-page.php",     cta: "Donate Now" },
      { id: 3, phase: "Trust",    label: "About",               action: "Checks ROS registration number, board members, years established",      template: "page-about.php",     cta: "Go to Donate" },
      { id: 4, phase: "Convert",  label: "Donate Page",         action: "Selects Stripe / PayPal — international cards, NOT FPX only",           template: "page-donate.php",    cta: "Complete Donation" },
      { id: 5, phase: "Confirm",  label: "Receipt Email (EN)",  action: "English receipt with official NASOM letterhead and donation ref no.",   template: null,                 cta: "Share" },
      { id: 6, phase: "Amplify",  label: "WhatsApp Share",      action: "Shares thank-you page back to family group chat",                       template: "page-thankyou.php",  cta: "—" },
    ],
    gaps: ["Stripe / PayPal not confirmed — FPX-only blocks all diaspora donors", "English content parity with BM not verified", "About page needs formal registration proof visibly displayed"],
  },
  "gl-ngo": {
    title: "Intl NGO / Partner", context: "Global", conversion: "Partnership Contact", priority: 3, color: "#3b82f6",
    steps: [
      { id: 1, phase: "Discover",   label: "NGO Directory",     action: "Finds NASOM via 'autism NGO Malaysia' on GuideStar or Google",         template: null,                   cta: "Visits site" },
      { id: 2, phase: "Governance", label: "About — Board",     action: "Reviews board composition, qualifications, governance structure",       template: "page.php",             cta: "Read More" },
      { id: 3, phase: "Scope",      label: "Services Archive",  action: "Reviews full programme range — depth and breadth of delivery",          template: "archive-service.php",  cta: "View Centres" },
      { id: 4, phase: "Reach",      label: "Centres Map",       action: "Checks geographic footprint — how many states, how many centres",       template: "archive-centre.php",   cta: "Read Research" },
      { id: 5, phase: "Evidence",   label: "Blog + Resources",  action: "Downloads annual report, reads research-category blog posts",           template: "archive-resource.php", cta: "Get In Touch" },
      { id: 6, phase: "Convert",    label: "Contact",           action: "Submits partnership enquiry with org name, country, proposal type",     template: "page-contact.php",     cta: "Submit" },
    ],
    gaps: ["Centres CPT with map view not built — geographic reach invisible", "Resource library with annual reports not built", "Blog / research category entirely missing"],
  },
  "gl-volunteer": {
    title: "Intl Volunteer", context: "Global", conversion: "Volunteer Application", priority: 4, color: "#10b981",
    steps: [
      { id: 1, phase: "Discover", label: "Volunteer Platform",  action: "Finds NASOM on Workaway / GoOverseas or via blog post",                template: null,                 cta: "Visit NASOM site" },
      { id: 2, phase: "Explore",  label: "Volunteer Page",      action: "Reads programme description, min duration 3 months, requirements",     template: "page.php",           cta: "Find Centres" },
      { id: 3, phase: "Locate",   label: "Centres Archive",     action: "Filters centres that accept volunteers and picks preferred location",   template: "archive-centre.php", cta: "Apply" },
      { id: 4, phase: "Convert",  label: "Volunteer Form",      action: "Submits: Name, Country, Skills, Availability dates, Motivation",       template: "page.php",           cta: "Submit Application" },
      { id: 5, phase: "Onboard",  label: "Welcome Email",       action: "Receives volunteer guide PDF and coordinator contact details",          template: null,                 cta: "Confirm Placement" },
    ],
    gaps: ["Centres CPT needs 'Accepts Volunteers' boolean field", "Volunteer form needs Country and Skills fields for international applicants", "Volunteer guide PDF should live in Resources CPT"],
  },
  "gl-researcher": {
    title: "Academic / Researcher", context: "Global", conversion: "Research Collaboration", priority: 4, color: "#8b5cf6",
    steps: [
      { id: 1, phase: "Discover",  label: "Academic Search",    action: "NASOM cited in SEA autism study or found via research network",         template: null,                   cta: "Visits site" },
      { id: 2, phase: "Research",  label: "Blog — Research",    action: "Reads NASOM-published research posts and event recaps",                 template: "archive.php",          cta: "See Resources" },
      { id: 3, phase: "Evidence",  label: "Resource Library",   action: "Downloads fact sheets, research papers, programme descriptions",        template: "archive-resource.php", cta: "Read Services" },
      { id: 4, phase: "Evaluate",  label: "Services Detail",    action: "Reviews evidence-based methodologies — ABA, OT, Social Skills",        template: "single-service.php",   cta: "Contact for Collab" },
      { id: 5, phase: "Convert",   label: "Contact",            action: "Proposes collaboration, dataset access, or publication partnership",    template: "page-contact.php",     cta: "Submit" },
    ],
    gaps: ["No Blog / News section — primary research evidence channel missing", "No Resource library built at all", "Service detail pages lack methodology references"],
  },
  "gl-media": {
    title: "Media / Press", context: "Global", conversion: "Story / Interview", priority: 2, color: "#ec4899",
    steps: [
      { id: 1, phase: "Discover",  label: "Google Search",   action: "Searches 'autism Malaysia organisation' for story research",              template: null,              cta: "Visits site" },
      { id: 2, phase: "Research",  label: "Blog / News",     action: "Reads recent news, event recaps, press releases",                         template: "archive.php",     cta: "Read About" },
      { id: 3, phase: "Validate",  label: "About",           action: "Confirms legitimacy — founding year, leadership, national scope",          template: "page-about.php",  cta: "Contact Press" },
      { id: 4, phase: "Convert",   label: "Contact",         action: "Requests interview with spokesperson or downloads media kit",              template: "page-contact.php",cta: "Submit" },
    ],
    gaps: ["No Blog / News section — no press coverage archive", "No dedicated Media / Press contact form or media kit download"],
  },
  "gl-govt": {
    title: "Government / Institutional", context: "Global", conversion: "Policy / Accreditation", priority: 2, color: "#06b6d4",
    steps: [
      { id: 1, phase: "Discover",  label: "Official Directory",  action: "Finds NASOM via MOE, MOH, or JKM autism service listings",             template: null,                   cta: "Visits site" },
      { id: 2, phase: "Validate",  label: "About",               action: "Reviews governance, ROS registration, programme accreditation",         template: "page-about.php",       cta: "View Services" },
      { id: 3, phase: "Scope",     label: "Services Archive",    action: "Reviews all programme types for policy alignment review",               template: "archive-service.php",  cta: "View Centres" },
      { id: 4, phase: "Reach",     label: "Centres Map",         action: "Assesses national coverage and gap areas in underserved states",        template: "archive-centre.php",   cta: "Contact" },
      { id: 5, phase: "Convert",   label: "Contact",             action: "Reaches out for formal collaboration, data sharing, or referral",       template: "page-contact.php",     cta: "Submit" },
    ],
    gaps: ["Centres CPT with national map view not built — coverage not visible", "About page needs accreditation and regulatory info prominently displayed"],
  },
};

const CONVERSION_MATRIX = [
  { goal: "Service Enquiry",    myP: 5, glP: 3, flows: ["my-parent-new", "my-parent-ong"] },
  { goal: "Donation",           myP: 4, glP: 5, flows: ["my-donor", "gl-diaspora"] },
  { goal: "Volunteering",       myP: 3, glP: 4, flows: ["my-volunteer", "gl-volunteer"] },
  { goal: "Membership",         myP: 4, glP: 2, flows: [] },
  { goal: "CSR Partnership",    myP: 4, glP: 3, flows: ["my-corporate"] },
  { goal: "Career Application", myP: 3, glP: 2, flows: ["my-jobseeker"] },
  { goal: "Research Collab",    myP: 2, glP: 4, flows: ["gl-researcher", "gl-ngo"] },
];

const HOMEPAGE_SECTIONS = [
  { order: 1, name: "Hero Banner",        serves: ["my-parent-new", "my-donor", "gl-diaspora"],        source: "ACF Options" },
  { order: 2, name: "Impact Statistics",  serves: ["gl-diaspora", "gl-ngo", "my-corporate"],           source: "ACF Options" },
  { order: 3, name: "Programmes Grid",    serves: ["my-parent-new", "my-parent-ong"],                  source: "Services CPT" },
  { order: 4, name: "Upcoming Events",    serves: ["my-donor", "my-corporate", "my-parent-ong"],       source: "Events CPT" },
  { order: 5, name: "Donate Strip",       serves: ["my-donor", "gl-diaspora"],                         source: "ACF Options" },
  { order: 6, name: "Testimonials",       serves: ["my-parent-new", "my-parent-ong"],                  source: "Testimonials CPT" },
  { order: 7, name: "Latest Stories",     serves: ["my-parent-ong", "gl-researcher", "gl-ngo"],        source: "Posts CPT" },
  { order: 8, name: "Partner Logos",      serves: ["my-corporate", "gl-ngo"],                          source: "ACF Repeater" },
];

const PHASE_COLORS = {
  Discover:"#6366f1", Land:"#3b82f6", Educate:"#0891b2", Explore:"#0d9488",
  Evaluate:"#15803d", Locate:"#16a34a", Convert:"#ca8a04", Confirm:"#d97706",
  Nurture:"#9333ea", Amplify:"#db2777", Trust:"#ea580c", Validate:"#7c3aed",
  Evidence:"#1d4ed8", Governance:"#0369a1", Scope:"#0e7490", Reach:"#166534",
  Research:"#7e22ce", Onboard:"#15803d", Browse:"#1e40af", Close:"#475569",
  Intent:"#059669", Direct:"#0369a1", Engage:"#7c3aed",
};

const stars = (n) => "★".repeat(n) + "☆".repeat(5 - n);

// ─── FLOW DIAGRAM ─────────────────────────────────────────────────────────────
function FlowDiagram({ flowId }) {
  const flow = FLOWS[flowId];
  if (!flow) return (
    <div style={{ color: MUTED, padding: 40, textAlign: "center" }}>
      Select a segment to view its flow
    </div>
  );

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 18, flexWrap: "wrap", gap: 8 }}>
        <div>
          <div style={{ fontSize: 17, fontWeight: 700, color: flow.color, marginBottom: 6 }}>{flow.title}</div>
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
            <span style={{ fontSize: 11, fontWeight: 600, padding: "2px 10px", borderRadius: 20, background: (flow.context === "Malaysia" ? "#3b82f6" : "#f59e0b") + "22", color: flow.context === "Malaysia" ? "#3b82f6" : "#f59e0b", border: "1px solid " + (flow.context === "Malaysia" ? "#3b82f622" : "#f59e0b22") }}>{flow.context}</span>
            <span style={{ fontSize: 11, fontWeight: 600, padding: "2px 10px", borderRadius: 20, background: "#10b98122", color: "#10b981", border: "1px solid #10b98122" }}>{"Converts: " + flow.conversion}</span>
          </div>
        </div>
        <div style={{ fontSize: 20, color: "#f59e0b", letterSpacing: 2 }}>{stars(flow.priority)}</div>
      </div>

      <div style={{ overflowX: "auto", paddingBottom: 8 }}>
        <div style={{ display: "flex", alignItems: "flex-start", minWidth: flow.steps.length * 150 }}>
          {flow.steps.map((step, i) => {
            const pc = PHASE_COLORS[step.phase] || MUTED;
            return (
              <div key={step.id} style={{ display: "flex", alignItems: "center", flex: 1, minWidth: 140 }}>
                <div style={{ flex: 1 }}>
                  <div style={{ textAlign: "center", marginBottom: 4 }}>
                    <span style={{ fontSize: 9, fontWeight: 700, color: pc, textTransform: "uppercase", letterSpacing: "0.08em" }}>{step.phase}</span>
                  </div>
                  <div style={{ background: CARD_BG, border: "1px solid " + pc + "55", borderTop: "3px solid " + pc, borderRadius: 8, padding: "10px", margin: "0 3px", minHeight: 110 }}>
                    <div style={{ fontSize: 11, fontWeight: 700, color: TEXT, marginBottom: 4 }}>{step.label}</div>
                    <div style={{ fontSize: 10, color: DIM, marginBottom: 6, lineHeight: 1.5 }}>{step.action}</div>
                    {step.template && (
                      <div style={{ fontSize: 9, padding: "2px 6px", background: "#082f49", border: "1px solid #0369a1", borderRadius: 3, color: ACCENT, display: "inline-block", marginBottom: 4 }}>{step.template}</div>
                    )}
                    {step.cta && step.cta !== "—" && (
                      <div style={{ marginTop: 5, fontSize: 9, padding: "3px 7px", background: pc + "22", border: "1px solid " + pc + "44", borderRadius: 3, color: pc, textAlign: "center" }}>{step.cta}</div>
                    )}
                  </div>
                  <div style={{ textAlign: "center", marginTop: 5 }}>
                    <span style={{ fontSize: 10, fontWeight: 700, color: pc, background: pc + "22", padding: "1px 7px", borderRadius: 10 }}>{step.id}</span>
                  </div>
                </div>
                {i < flow.steps.length - 1 && (
                  <div style={{ color: "#334155", fontSize: 22, flexShrink: 0, paddingBottom: 30 }}>›</div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {flow.gaps.length > 0 && (
        <div style={{ marginTop: 18, background: "#1c0a0a", border: "1px solid #7f1d1d", borderLeft: "4px solid #ef4444", borderRadius: 8, padding: "12px 16px" }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: "#ef4444", marginBottom: 8 }}>⚠ CMS Gaps Blocking This Flow</div>
          {flow.gaps.map((g, i) => (
            <div key={i} style={{ display: "flex", gap: 8, marginBottom: 5 }}>
              <span style={{ color: "#ef4444", fontSize: 11, flexShrink: 0 }}>✗</span>
              <span style={{ fontSize: 12, color: "#fca5a5", lineHeight: 1.5 }}>{g}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── CONVERSION MATRIX ────────────────────────────────────────────────────────
function ConversionMatrix() {
  return (
    <div>
      <p style={{ fontSize: 13, color: "#94a3b8", marginBottom: 20 }}>Bar length = priority (5 = highest).</p>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        {CONVERSION_MATRIX.map((row) => (
          <div key={row.goal} style={{ background: CARD_BG, border: "1px solid " + BORDER, borderRadius: 10, padding: "16px 18px" }}>
            <div style={{ fontWeight: 700, fontSize: 14, color: TEXT, marginBottom: 14 }}>{row.goal}</div>
            <div style={{ marginBottom: 10 }}>
              <div style={{ fontSize: 11, color: MUTED, marginBottom: 4 }}>Malaysia</div>
              <div style={{ background: "#1e293b", borderRadius: 4, height: 12, overflow: "hidden", marginBottom: 3 }}>
                <div style={{ width: (row.myP * 20) + "%", height: "100%", background: "linear-gradient(90deg,#1d4ed8,#38bdf8)", borderRadius: 4 }} />
              </div>
              <div style={{ fontSize: 12, color: ACCENT }}>{stars(row.myP)}</div>
            </div>
            <div style={{ marginBottom: 12 }}>
              <div style={{ fontSize: 11, color: MUTED, marginBottom: 4 }}>Global</div>
              <div style={{ background: "#1e293b", borderRadius: 4, height: 12, overflow: "hidden", marginBottom: 3 }}>
                <div style={{ width: (row.glP * 20) + "%", height: "100%", background: "linear-gradient(90deg,#92400e,#f59e0b)", borderRadius: 4 }} />
              </div>
              <div style={{ fontSize: 12, color: "#f59e0b" }}>{stars(row.glP)}</div>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
              {row.flows.map((fid) => {
                const f = FLOWS[fid];
                if (!f) return null;
                return (
                  <span key={fid} style={{ fontSize: 10, padding: "2px 8px", background: f.color + "22", border: "1px solid " + f.color + "44", color: f.color, borderRadius: 10 }}>
                    {f.title.split("—")[0].trim().split(" ").slice(0, 3).join(" ")}
                  </span>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── HOMEPAGE MAP ─────────────────────────────────────────────────────────────
function HomepageMap() {
  const [hovered, setHovered] = useState(null);
  const flowEntries = Object.entries(FLOWS);

  return (
    <div>
      <p style={{ fontSize: 13, color: "#94a3b8", marginBottom: 20 }}>Hover a section to highlight which user segments it targets.</p>
      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 20 }}>
        <div>
          {HOMEPAGE_SECTIONS.map((sec, i) => {
            const active = hovered === i;
            return (
              <div
                key={sec.order}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
                style={{ background: CARD_BG, border: "1px solid " + (active ? ACCENT : BORDER), borderRadius: 8, padding: "12px 16px", marginBottom: 8, display: "flex", alignItems: "center", gap: 14, transition: "border-color 0.2s" }}
              >
                <div style={{ width: 30, height: 30, borderRadius: 6, background: active ? "#0f2744" : "#060c18", border: "1px solid " + (active ? ACCENT : BORDER), display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700, color: active ? ACCENT : MUTED, flexShrink: 0 }}>{sec.order}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600, fontSize: 14, color: active ? TEXT : "#94a3b8" }}>{sec.name}</div>
                  <div style={{ fontSize: 11, color: MUTED }}>Source: {sec.source}</div>
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 4, justifyContent: "flex-end", maxWidth: 180 }}>
                  {sec.serves.map((fid) => {
                    const f = FLOWS[fid];
                    if (!f) return null;
                    return (
                      <span key={fid} style={{ fontSize: 10, padding: "2px 6px", background: f.color + "22", border: "1px solid " + f.color + "33", color: f.color, borderRadius: 8 }}>
                        {f.title.split("—")[0].trim().split(" ").slice(0, 2).join(" ")}
                      </span>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
        <div style={{ background: CARD_BG, border: "1px solid " + BORDER, borderRadius: 10, padding: "16px 18px" }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: "#94a3b8", marginBottom: 14, textTransform: "uppercase", letterSpacing: "0.08em" }}>Segment Coverage</div>
          {flowEntries.map(([fid, f]) => {
            const lit = hovered !== null && HOMEPAGE_SECTIONS[hovered]?.serves.includes(fid);
            return (
              <div key={fid} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8, opacity: hovered === null ? 1 : (lit ? 1 : 0.2), transition: "opacity 0.2s" }}>
                <div style={{ width: 10, height: 10, borderRadius: 2, background: f.color, flexShrink: 0 }} />
                <span style={{ fontSize: 11, color: TEXT }}>{f.title}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ─── APP ──────────────────────────────────────────────────────────────────────
export default function App() {
  const [tab, setTab]           = useState("flows");
  const [context, setContext]   = useState("Malaysia");
  const [selectedFlow, setFlow] = useState("my-parent-new");

  const segments = USER_SEGMENTS[context];
  const TABS = [
    { id: "flows",    label: "User Flows" },
    { id: "matrix",  label: "Conversion Matrix" },
    { id: "homepage",label: "Homepage Map" },
    { id: "segments",label: "All Segments" },
  ];

  function switchContext(c) {
    setContext(c);
    setFlow(c === "Malaysia" ? "my-parent-new" : "gl-diaspora");
  }

  return (
    <div style={{ background: BG, minHeight: "100vh", color: TEXT, fontFamily: "system-ui, sans-serif" }}>

      {/* Header */}
      <div style={{ background: "linear-gradient(135deg,#0a0f1e 0%,#0f1d35 60%,#0d1b2a 100%)", borderBottom: "1px solid " + BORDER, padding: "20px 28px 16px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 12 }}>
          <div>
            <h1 style={{ margin: 0, fontSize: 20, fontWeight: 800, color: "#f8fafc" }}>NASOM User Flow Recommendations</h1>
            <p style={{ margin: "4px 0 0", fontSize: 11, color: DIM, letterSpacing: "0.04em" }}>MALAYSIA & GLOBAL  •  12 SEGMENTS  •  MARCH 2026</p>
          </div>
          <div style={{ display: "flex", background: "#060c18", border: "1px solid " + BORDER, borderRadius: 8, overflow: "hidden" }}>
            {["Malaysia", "Global"].map((c) => (
              <button key={c} onClick={() => switchContext(c)} style={{ padding: "8px 18px", background: context === c ? "#0f2744" : "transparent", border: "none", color: context === c ? ACCENT : MUTED, fontFamily: "inherit", fontSize: 13, cursor: "pointer", fontWeight: context === c ? 700 : 400 }}>
                {c === "Malaysia" ? "🇲🇾 Malaysia" : "🌏 Global"}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Nav */}
      <div style={{ display: "flex", background: "#060c18", borderBottom: "1px solid " + BORDER, overflowX: "auto" }}>
        {TABS.map((t) => (
          <button key={t.id} onClick={() => setTab(t.id)} style={{ padding: "11px 22px", background: "none", border: "none", borderBottom: tab === t.id ? "2px solid " + ACCENT : "2px solid transparent", color: tab === t.id ? ACCENT : MUTED, fontSize: 13, fontFamily: "inherit", cursor: "pointer", whiteSpace: "nowrap", fontWeight: tab === t.id ? 600 : 400 }}>
            {t.label}
          </button>
        ))}
      </div>

      {/* Body */}
      <div style={{ padding: "24px 28px", maxWidth: 1140, margin: "0 auto" }}>

        {tab === "flows" && (
          <div style={{ display: "grid", gridTemplateColumns: "210px 1fr", gap: 20 }}>
            <div>
              <div style={{ fontSize: 10, color: DIM, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 10 }}>{context} Segments</div>
              {segments.map((seg) => (
                <div key={seg.id} onClick={() => setFlow(seg.id)} style={{ background: CARD_BG, border: "1px solid " + (selectedFlow === seg.id ? seg.color : BORDER), borderLeft: "4px solid " + seg.color, borderRadius: 8, padding: "10px 12px", marginBottom: 8, cursor: "pointer" }}>
                  <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                    <span style={{ fontSize: 18 }}>{seg.icon}</span>
                    <div>
                      <div style={{ fontSize: 12, fontWeight: 700, color: selectedFlow === seg.id ? seg.color : TEXT }}>{seg.label}</div>
                      <div style={{ fontSize: 10, color: DIM, lineHeight: 1.4, marginTop: 2 }}>{seg.desc}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ background: CARD_BG, border: "1px solid " + BORDER, borderRadius: 10, padding: "20px 22px" }}>
              <FlowDiagram flowId={selectedFlow} />
            </div>
          </div>
        )}

        {tab === "matrix" && (
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, color: MUTED, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 20 }}>Conversion Goal Priority — Malaysia vs. Global</div>
            <ConversionMatrix />
          </div>
        )}

        {tab === "homepage" && (
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, color: MUTED, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 20 }}>Homepage Section Architecture — Segment Coverage</div>
            <HomepageMap />
          </div>
        )}

        {tab === "segments" && (
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, color: MUTED, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 20 }}>All Segments — {context}</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>
              {segments.map((seg) => {
                const flow = FLOWS[seg.id];
                return (
                  <div key={seg.id} onClick={() => { setTab("flows"); setFlow(seg.id); }} style={{ background: CARD_BG, border: "1px solid " + BORDER, borderLeft: "4px solid " + seg.color, borderRadius: 10, padding: "16px 18px", cursor: "pointer" }}>
                    <div style={{ fontSize: 28, marginBottom: 8 }}>{seg.icon}</div>
                    <div style={{ fontWeight: 700, fontSize: 14, color: TEXT, marginBottom: 4 }}>{seg.label}</div>
                    <div style={{ fontSize: 12, color: MUTED, marginBottom: 12, lineHeight: 1.5 }}>{seg.desc}</div>
                    {flow && (
                      <>
                        <div style={{ fontSize: 11, color: "#94a3b8", marginBottom: 4 }}>Converts to: <span style={{ color: seg.color }}>{flow.conversion}</span></div>
                        <div style={{ fontSize: 16, color: "#f59e0b", marginBottom: 8 }}>{stars(flow.priority)}</div>
                        <div style={{ fontSize: 11, color: seg.color, fontWeight: 600 }}>View flow →</div>
                      </>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

