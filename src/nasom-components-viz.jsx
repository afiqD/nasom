import { useState } from "react";

const C = {
  bg: "#060b14", card: "#0c1624", border: "#1a2e48",
  text: "#e2e8f0", muted: "#64748b", dim: "#1e2d3d",
  navy: "#1A3A5C", navyDk: "#0F2540",
  blue: "#1E6FA8", blueLt: "#D6EAF8", blueMed: "#2E86C1",
  teal: "#117A65", tealLt: "#D1F2EB", tealMed: "#148F77",
  amber: "#A04000", amberLt: "#FDEBD0",
  red: "#922B21", redLt: "#FADBD8",
  green: "#1E6F45", greenLt: "#D5F5E3",
  purple: "#6B2D8B", purpLt: "#EFE0F8",
  slate: "#5D6D7E", slateLt: "#EAECEE",
  white: "#FFFFFF", off: "#F8FAFB",
  grey1: "#E8ECF0", grey2: "#C8D0D8", grey3: "#A0ADB8",
  disabled: "#BDC3C7", disabledTxt: "#95A5A6",
  body: "#2C3E50",
};

const priColor = (p) => p === "P0" ? C.red : p === "P1" ? C.blue : C.teal;

const COMPONENTS = [
  { id: "C-01", name: "Button",        cat: "Atom",     priority: "P0", class: ".nasom-btn" },
  { id: "C-02", name: "Badge / Tag",   cat: "Atom",     priority: "P0", class: ".nasom-badge" },
  { id: "C-03", name: "Input Field",   cat: "Atom",     priority: "P0", class: ".nasom-input" },
  { id: "C-04", name: "Icon",          cat: "Atom",     priority: "P1", class: ".nasom-icon" },
  { id: "C-05", name: "Card",          cat: "Molecule", priority: "P0", class: ".nasom-card" },
  { id: "C-06", name: "Form Group",    cat: "Molecule", priority: "P0", class: ".nasom-form-group" },
  { id: "C-07", name: "Alert",         cat: "Molecule", priority: "P1", class: ".nasom-alert" },
  { id: "C-08", name: "Breadcrumb",    cat: "Molecule", priority: "P1", class: ".nasom-breadcrumb" },
  { id: "C-09", name: "Navigation",    cat: "Organism", priority: "P0", class: ".nasom-nav" },
  { id: "C-10", name: "Filter Bar",    cat: "Organism", priority: "P0", class: ".nasom-filter-bar" },
  { id: "C-11", name: "Enquiry Form",  cat: "Organism", priority: "P0", class: ".nasom-programme-form" },
  { id: "C-12", name: "Donate Widget", cat: "Pattern",  priority: "P0", class: ".nasom-donate-widget" },
];

const TOKENS = [
  { token: "--color-action",     value: "#117A65", label: "Teal (CTA)" },
  { token: "--color-primary",    value: "#1A3A5C", label: "Navy" },
  { token: "--color-link",       value: "#1E6FA8", label: "Blue" },
  { token: "--color-danger",     value: "#922B21", label: "Red" },
  { token: "--color-warning",    value: "#A04000", label: "Amber" },
  { token: "--color-text",       value: "#2C3E50", label: "Body" },
  { token: "--color-muted",      value: "#5D6D7E", label: "Muted" },
  { token: "--color-border",     value: "#CDD3D8", label: "Border" },
  { token: "--color-bg",         value: "#F8FAFB", label: "Off-white" },
  { token: "--color-disabled",   value: "#BDC3C7", label: "Disabled" },
];

const SPACING = [
  { token: "--space-1", px: "4px",  usage: "Icon padding, micro gaps" },
  { token: "--space-2", px: "8px",  usage: "Badge padding, chip gaps" },
  { token: "--space-3", px: "12px", usage: "Input x-padding" },
  { token: "--space-4", px: "16px", usage: "Button x-padding, card grid gap" },
  { token: "--space-5", px: "24px", usage: "Card internal padding" },
  { token: "--space-6", px: "32px", usage: "Section internal margin" },
  { token: "--space-7", px: "48px", usage: "Section vertical spacing" },
  { token: "--space-8", px: "64px", usage: "Hero padding, major breaks" },
  { token: "--radius-sm", px: "4px", usage: "Badge, tag, chip" },
  { token: "--radius-md", px: "8px", usage: "Card, input, button" },
  { token: "--radius-lg", px: "12px", usage: "Modal, panel, mega-menu" },
];

// ─── COMPONENT PREVIEWS ──────────────────────────────────────────────────────

function ButtonPreview() {
  const [state, setState] = useState("default");
  const [variant, setVariant] = useState("primary");
  const [size, setSize] = useState("md");

  const heights = { sm: "36px", md: "44px", lg: "52px" };
  const fonts   = { sm: "12px", md: "14px", lg: "16px" };
  const pads    = { sm: "12px 14px", md: "12px 20px", lg: "14px 28px" };

  const getStyle = () => {
    const base = {
      height: heights[size], padding: pads[size], fontSize: fonts[size],
      fontWeight: 600, borderRadius: "8px", border: "none",
      cursor: state === "disabled" ? "not-allowed" : "pointer",
      transition: "all 0.15s", display: "inline-flex", alignItems: "center",
      justifyContent: "center", gap: "8px", minWidth: "120px",
    };
    if (variant === "primary") {
      if (state === "disabled")   return { ...base, background: C.disabled, color: C.disabledTxt };
      if (state === "hover")      return { ...base, background: C.tealMed, color: C.white, outline: "3px solid " + C.teal, outlineOffset: "2px" };
      if (state === "active")     return { ...base, background: C.navy, color: C.white, transform: "scale(0.98)" };
      return { ...base, background: C.teal, color: C.white };
    }
    if (variant === "secondary") {
      if (state === "disabled")   return { ...base, background: "transparent", color: C.disabled, border: "2px solid " + C.disabled };
      if (state === "hover")      return { ...base, background: C.blueLt, color: C.navy, border: "2px solid " + C.navy };
      return { ...base, background: "transparent", color: C.navy, border: "2px solid " + C.navy };
    }
    if (variant === "ghost") {
      if (state === "hover")      return { ...base, background: "rgba(255,255,255,0.15)", color: C.white, border: "2px solid " + C.white };
      return { ...base, background: "transparent", color: C.white, border: "2px solid " + C.white };
    }
    if (variant === "danger") {
      if (state === "hover")      return { ...base, background: "#C0392B", color: C.white };
      return { ...base, background: C.red, color: C.white };
    }
    if (variant === "text") {
      return { ...base, background: "transparent", color: C.blue, textDecoration: "underline", minWidth: "auto" };
    }
    return base;
  };

  const labels = { default: "Donate Now", hover: "Donate Now", active: "Donate Now", disabled: "Unavailable", loading: "Processing..." };
  const bgPanelColor = variant === "ghost" ? C.navyDk : C.off;

  return (
    <div>
      <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "16px" }}>
        {["primary","secondary","ghost","danger","text"].map(v => (
          <button key={v} onClick={() => setVariant(v)} style={{
            background: variant === v ? C.blue : C.card, color: variant === v ? C.white : C.muted,
            border: "1px solid " + C.border, borderRadius: "5px", padding: "4px 12px",
            cursor: "pointer", fontSize: "12px", fontWeight: 600
          }}>{v}</button>
        ))}
        <div style={{ width: "1px", background: C.border }}></div>
        {["sm","md","lg"].map(s => (
          <button key={s} onClick={() => setSize(s)} style={{
            background: size === s ? C.teal : C.card, color: size === s ? C.white : C.muted,
            border: "1px solid " + C.border, borderRadius: "5px", padding: "4px 12px",
            cursor: "pointer", fontSize: "12px"
          }}>{s}</button>
        ))}
      </div>

      <div style={{ background: bgPanelColor, borderRadius: "10px", padding: "32px", marginBottom: "16px", display: "flex", justifyContent: "center" }}>
        <button style={getStyle()}>
          {state === "loading" && <span style={{ fontSize: "12px" }}>⟳</span>}
          {labels[state] || "Donate Now"}
        </button>
      </div>

      <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
        {["default","hover","active","disabled","loading"].map(s => (
          <button key={s} onClick={() => setState(s)} style={{
            background: state === s ? C.navy : C.dim, color: state === s ? C.white : C.muted,
            border: "1px solid " + C.border, borderRadius: "5px", padding: "4px 12px",
            cursor: "pointer", fontSize: "12px"
          }}>{s}</button>
        ))}
      </div>

      <div style={{ marginTop: "16px", background: C.dim, borderRadius: "6px", padding: "12px 14px" }}>
        <div style={{ fontSize: "11px", color: C.muted, marginBottom: "4px" }}>Props</div>
        <code style={{ fontSize: "12px", color: C.teal }}>{"variant=\"" + variant + "\" size=\"" + size + "\" " + (state === "disabled" ? "disabled " : "") + (state === "loading" ? "loading " : "")}</code>
      </div>
    </div>
  );
}

function BadgePreview() {
  const [selected, setSelected] = useState("programme-ei");
  const BADGE_TYPES = [
    { type: "programme-ei",  label: "Early Intervention", bg: C.tealLt,  txt: C.teal },
    { type: "programme-aba", label: "ABA Therapy",        bg: C.blueLt,  txt: C.blue },
    { type: "audience-child",label: "For Children",       bg: C.greenLt, txt: C.green },
    { type: "audience-adult",label: "For Adults",         bg: C.purpLt,  txt: C.purple },
    { type: "status-active", label: "Active",             bg: C.greenLt, txt: C.green },
    { type: "status-closing",label: "Closing Soon",       bg: C.amberLt, txt: C.amber },
    { type: "status-full",   label: "Full",               bg: C.redLt,   txt: C.red },
    { type: "language-bm",   label: "Bahasa Malaysia",    bg: C.slateLt, txt: C.slate },
  ];
  const current = BADGE_TYPES.find(b => b.type === selected) || BADGE_TYPES[0];
  return (
    <div>
      <div style={{ background: C.off, borderRadius: "10px", padding: "32px", marginBottom: "16px", display: "flex", justifyContent: "center", flexWrap: "wrap", gap: "10px" }}>
        {BADGE_TYPES.map(b => (
          <span key={b.type} onClick={() => setSelected(b.type)} style={{
            background: b.bg, color: b.txt, borderRadius: "4px", padding: "4px 10px",
            fontSize: "12px", fontWeight: 700, cursor: "pointer",
            border: selected === b.type ? "2px solid " + b.txt : "2px solid transparent",
          }}>{b.label}</span>
        ))}
      </div>
      <div style={{ background: C.dim, borderRadius: "6px", padding: "12px 14px" }}>
        <code style={{ fontSize: "12px", color: C.teal }}>{"type=\"" + current.type + "\" label=\"" + current.label + "\""}</code>
      </div>
    </div>
  );
}

function InputPreview() {
  const [inputState, setInputState] = useState("default");
  const [value, setValue] = useState("");
  const stateStyles = {
    default:  { borderColor: C.grey2 },
    focus:    { borderColor: C.blue, outline: "3px solid " + C.blueLt, outlineOffset: "1px" },
    filled:   { borderColor: C.teal },
    error:    { borderColor: C.red, background: C.redLt },
    disabled: { borderColor: C.grey2, background: C.grey1, cursor: "not-allowed" },
  };
  const s = stateStyles[inputState] || stateStyles.default;
  return (
    <div>
      <div style={{ background: C.off, borderRadius: "10px", padding: "32px", marginBottom: "16px" }}>
        <div style={{ marginBottom: "4px", fontSize: "13px", fontWeight: 600, color: C.navy }}>
          Child's Name <span style={{ color: C.red }}>*</span>
        </div>
        <input
          readOnly={inputState === "disabled"}
          value={inputState === "filled" ? "Ahmad Irfan" : value}
          onChange={e => setValue(e.target.value)}
          placeholder="e.g. Ahmad Irfan"
          style={{
            width: "100%", height: "44px", padding: "0 12px",
            borderRadius: "8px", border: "2px solid " + (s.borderColor || C.grey2),
            background: s.background || C.white, fontSize: "14px", color: C.body,
            outline: s.outline || "none", outlineOffset: s.outlineOffset || "0",
            boxSizing: "border-box",
          }}
        />
        {inputState === "error" && (
          <div style={{ marginTop: "4px", fontSize: "12px", color: C.red }}>Please enter the child's name</div>
        )}
        {inputState === "default" && (
          <div style={{ marginTop: "4px", fontSize: "12px", color: C.slate }}>As per birth certificate or registration</div>
        )}
        {inputState === "filled" && (
          <div style={{ marginTop: "4px", fontSize: "12px", color: C.teal }}>Looks good</div>
        )}
      </div>
      <div style={{ display: "flex", gap: "8px", marginBottom: "12px", flexWrap: "wrap" }}>
        {["default","focus","filled","error","disabled"].map(s => (
          <button key={s} onClick={() => setInputState(s)} style={{
            background: inputState === s ? C.navy : C.dim, color: inputState === s ? C.white : C.muted,
            border: "1px solid " + C.border, borderRadius: "5px", padding: "4px 12px",
            cursor: "pointer", fontSize: "12px"
          }}>{s}</button>
        ))}
      </div>
    </div>
  );
}

function CardPreview() {
  const [variant, setVariant] = useState("programme");
  const [hovered, setHovered] = useState(false);

  const cardStyle = {
    background: C.white, borderRadius: "8px", padding: "20px",
    border: hovered ? "1px solid " + C.teal : "1px solid " + C.grey2,
    borderLeft: hovered ? "4px solid " + C.teal : "1px solid " + C.grey2,
    boxShadow: hovered ? "0 4px 12px rgba(0,0,0,0.10)" : "0 1px 4px rgba(0,0,0,0.06)",
    transform: hovered ? "translateY(-2px)" : "translateY(0)",
    transition: "all 0.15s", cursor: "pointer", maxWidth: "300px",
    display: "flex", flexDirection: "column", gap: "8px"
  };

  const VARIANTS = {
    programme: (
      <div style={cardStyle} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
        <span style={{ background: C.tealLt, color: C.teal, borderRadius: "4px", padding: "3px 8px", fontSize: "11px", fontWeight: 700, alignSelf: "flex-start" }}>Early Intervention</span>
        <div style={{ fontSize: "15px", fontWeight: 700, color: C.navy }}>Early Autism Intervention Programme</div>
        <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
          <span style={{ background: C.greenLt, color: C.green, borderRadius: "4px", padding: "2px 7px", fontSize: "11px" }}>For Children</span>
          <span style={{ background: C.blueLt, color: C.blue, borderRadius: "4px", padding: "2px 7px", fontSize: "11px" }}>2–8 years</span>
        </div>
        <div style={{ fontSize: "13px", color: C.body, lineHeight: 1.5, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
          Structured early intervention using evidence-based approaches to support developmental milestones in young children.
        </div>
        <span style={{ background: C.slateLt, color: C.slate, borderRadius: "4px", padding: "2px 7px", fontSize: "11px", alignSelf: "flex-start" }}>Subang Jaya Centre</span>
        <div style={{ marginTop: "auto", paddingTop: "8px" }}>
          <span style={{ color: C.blue, fontSize: "13px", fontWeight: 600 }}>Learn More →</span>
        </div>
      </div>
    ),
    news: (
      <div style={cardStyle} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
        <div style={{ height: "140px", background: C.grey1, borderRadius: "6px", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <span style={{ color: C.grey3, fontSize: "12px" }}>16:9 featured image</span>
        </div>
        <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
          <span style={{ background: C.blueLt, color: C.blue, borderRadius: "4px", padding: "2px 7px", fontSize: "11px", fontWeight: 700 }}>Community</span>
          <span style={{ color: C.slate, fontSize: "12px" }}>12 March 2026</span>
        </div>
        <div style={{ fontSize: "15px", fontWeight: 700, color: C.navy }}>NASOM Opens New Training Centre in Petaling Jaya</div>
        <div style={{ fontSize: "13px", color: C.body, lineHeight: 1.5, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
          The new centre will serve an additional 120 children annually, expanding NASOM's presence in the Klang Valley region.
        </div>
        <span style={{ color: C.blue, fontSize: "13px", fontWeight: 600 }}>Read More →</span>
      </div>
    ),
    job: (
      <div style={cardStyle} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div style={{ fontSize: "15px", fontWeight: 700, color: C.navy }}>Speech-Language Therapist</div>
          <span style={{ background: C.tealLt, color: C.teal, borderRadius: "4px", padding: "2px 7px", fontSize: "11px", fontWeight: 700, flexShrink: 0, marginLeft: "8px" }}>SLT</span>
        </div>
        <div style={{ fontSize: "12px", color: C.slate }}>Therapy Department · Subang Jaya Centre</div>
        <div style={{ fontSize: "12px", color: C.red, fontWeight: 600 }}>Closing: 15 April 2026 (18 days)</div>
        <div style={{ fontSize: "13px", color: C.body, lineHeight: 1.5, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
          We are seeking a passionate SLT to join our early intervention team. Fresh graduates are welcome to apply.
        </div>
        <div style={{ marginTop: "auto", paddingTop: "8px" }}>
          <span style={{ color: C.blue, fontSize: "13px", fontWeight: 600 }}>View & Apply →</span>
        </div>
      </div>
    ),
    event: (
      <div style={cardStyle} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
        <div style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
          <div style={{ background: C.navy, borderRadius: "6px", padding: "8px 12px", textAlign: "center", flexShrink: 0 }}>
            <div style={{ fontSize: "22px", fontWeight: 700, color: C.white, lineHeight: 1 }}>22</div>
            <div style={{ fontSize: "11px", color: C.blueLt, marginTop: "2px" }}>APR</div>
          </div>
          <div>
            <div style={{ fontSize: "15px", fontWeight: 700, color: C.navy }}>NASOM Fundraising Walk 2026</div>
            <div style={{ fontSize: "12px", color: C.slate, marginTop: "4px" }}>Padang Merbok, Kuala Lumpur</div>
          </div>
        </div>
        <span style={{ background: C.greenLt, color: C.green, borderRadius: "4px", padding: "2px 7px", fontSize: "11px", fontWeight: 700, alignSelf: "flex-start" }}>Free Entry</span>
        <div style={{ marginTop: "auto", paddingTop: "8px" }}>
          <span style={{ color: C.blue, fontSize: "13px", fontWeight: 600 }}>Register →</span>
        </div>
      </div>
    ),
  };

  return (
    <div>
      <div style={{ display: "flex", gap: "8px", marginBottom: "16px", flexWrap: "wrap" }}>
        {["programme","news","job","event"].map(v => (
          <button key={v} onClick={() => { setVariant(v); setHovered(false); }} style={{
            background: variant === v ? C.blue : C.dim, color: variant === v ? C.white : C.muted,
            border: "1px solid " + C.border, borderRadius: "5px", padding: "4px 12px",
            cursor: "pointer", fontSize: "12px", fontWeight: 600
          }}>{v}</button>
        ))}
      </div>
      <div style={{ background: C.off, borderRadius: "10px", padding: "24px", display: "flex", justifyContent: "center" }}>
        {VARIANTS[variant]}
      </div>
      <div style={{ marginTop: "12px", background: C.dim, borderRadius: "6px", padding: "10px 14px", fontSize: "12px", color: C.muted }}>
        Hover over the card to see the hover state
      </div>
    </div>
  );
}

function AlertPreview() {
  const [type, setType] = useState("success");
  const ALERTS = {
    success: { bg: "#D5F5E3", border: "#1E6F45", icon: "✓", color: "#1E6F45", label: "Success", msg: "Your enquiry has been submitted. We will be in touch within 2 business days." },
    warning: { bg: "#FDEBD0", border: "#A04000", icon: "!", color: "#A04000", label: "Warning", msg: "This programme has limited places available. Enquire as soon as possible." },
    error:   { bg: "#FADBD8", border: "#922B21", icon: "✕", color: "#922B21", label: "Error",   msg: "There was a problem submitting your form. Please check the highlighted fields." },
    info:    { bg: "#D6EAF8", border: "#1E6FA8", icon: "i", color: "#1E6FA8", label: "Info",    msg: "Applications for this programme close on 30 April 2026." },
  };
  const a = ALERTS[type];
  return (
    <div>
      <div style={{ display: "flex", gap: "8px", marginBottom: "16px" }}>
        {Object.keys(ALERTS).map(t => (
          <button key={t} onClick={() => setType(t)} style={{
            background: type === t ? ALERTS[t].border : C.dim,
            color: type === t ? C.white : C.muted,
            border: "1px solid " + C.border, borderRadius: "5px", padding: "4px 12px",
            cursor: "pointer", fontSize: "12px", fontWeight: 600
          }}>{t}</button>
        ))}
      </div>
      <div style={{ background: a.bg, border: "1px solid " + a.border, borderLeft: "4px solid " + a.border, borderRadius: "8px", padding: "14px 18px", display: "flex", gap: "12px", alignItems: "flex-start" }}>
        <div style={{ width: "22px", height: "22px", borderRadius: "50%", background: a.border, color: C.white, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12px", fontWeight: 700, flexShrink: 0, marginTop: "1px" }}>{a.icon}</div>
        <div>
          <div style={{ fontSize: "13px", fontWeight: 700, color: a.color, marginBottom: "4px" }}>{a.label}</div>
          <div style={{ fontSize: "13px", color: C.body, lineHeight: 1.5 }}>{a.msg}</div>
        </div>
      </div>
    </div>
  );
}

function NavPreview() {
  const [navState, setNavState] = useState("default");
  const [megaOpen, setMegaOpen] = useState(false);

  const isScrolled = navState === "scrolled";
  const navBg = isScrolled ? C.navyDk : C.white;
  const navTxt = isScrolled ? C.white : C.navy;
  const borderBottom = isScrolled ? "none" : "1px solid " + C.grey2;

  return (
    <div>
      <div style={{ display: "flex", gap: "8px", marginBottom: "16px", flexWrap: "wrap" }}>
        {["default","scrolled","mobile"].map(s => (
          <button key={s} onClick={() => { setNavState(s); setMegaOpen(false); }} style={{
            background: navState === s ? C.navy : C.dim, color: navState === s ? C.white : C.muted,
            border: "1px solid " + C.border, borderRadius: "5px", padding: "4px 12px",
            cursor: "pointer", fontSize: "12px", fontWeight: 600
          }}>{s}</button>
        ))}
      </div>

      {navState !== "mobile" ? (
        <div style={{ borderRadius: "10px", overflow: "hidden", boxShadow: "0 2px 12px rgba(0,0,0,0.15)" }}>
          <div style={{ background: navBg, borderBottom, padding: "0 24px", height: "72px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "16px" }}>
            <div style={{ fontWeight: 800, fontSize: "16px", color: isScrolled ? C.white : C.teal, letterSpacing: "1px" }}>NASOM</div>
            <div style={{ display: "flex", gap: "4px", alignItems: "center", flex: 1, justifyContent: "center" }}>
              {["About", "Autism", "Programmes", "Centres", "Events", "News"].map(item => (
                <div key={item} onClick={() => item === "Programmes" && setMegaOpen(!megaOpen)} style={{
                  padding: "8px 12px", fontSize: "13px", fontWeight: 500, color: navTxt,
                  borderBottom: item === "Programmes" && megaOpen ? "3px solid " + C.teal : "3px solid transparent",
                  cursor: "pointer"
                }}>{item}{item === "Programmes" ? " ▾" : ""}</div>
              ))}
            </div>
            <div style={{ background: C.teal, color: C.white, borderRadius: "6px", padding: "8px 18px", fontSize: "13px", fontWeight: 700, cursor: "pointer", flexShrink: 0 }}>Donate</div>
          </div>
          {megaOpen && (
            <div style={{ background: C.navyDk, padding: "24px 32px", display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "24px" }}>
              {[
                { group: "For Children", items: ["Early Intervention", "ABA Therapy", "Structured Teaching"] },
                { group: "For Adults & Families", items: ["Vocational Training", "Parent Support", "Community Integration"] },
                { group: "Featured Programme", items: ["Early Intensive Programme → (featured)"] },
              ].map(col => (
                <div key={col.group}>
                  <div style={{ fontSize: "11px", fontWeight: 700, color: C.blueLt, textTransform: "uppercase", letterSpacing: "1px", marginBottom: "10px" }}>{col.group}</div>
                  {col.items.map(item => (
                    <div key={item} style={{ fontSize: "13px", color: C.grey1, padding: "5px 0", cursor: "pointer", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>{item}</div>
                  ))}
                </div>
              ))}
            </div>
          )}
          {megaOpen && <div style={{ height: "4px", background: C.card }}></div>}
        </div>
      ) : (
        <div style={{ borderRadius: "10px", overflow: "hidden" }}>
          <div style={{ background: C.white, borderBottom: "1px solid " + C.grey2, padding: "0 20px", height: "64px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ fontWeight: 800, fontSize: "16px", color: C.teal }}>NASOM</div>
            <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
              <div style={{ background: C.teal, color: C.white, borderRadius: "20px", padding: "6px 14px", fontSize: "12px", fontWeight: 700 }}>Donate</div>
              <div style={{ fontSize: "20px", cursor: "pointer", color: C.navy }}>☰</div>
            </div>
          </div>
          <div style={{ background: C.navyDk, padding: "20px" }}>
            {["About NASOM","What Is Autism","Our Programmes ▾","Our Centres","Get Involved","News & Stories","Events","Contact Us"].map(item => (
              <div key={item} style={{ padding: "12px 0", fontSize: "14px", color: C.white, borderBottom: "1px solid rgba(255,255,255,0.08)", cursor: "pointer" }}>{item}</div>
            ))}
          </div>
          <div style={{ background: C.teal, padding: "14px 20px", display: "flex", justifyContent: "center" }}>
            <span style={{ color: C.white, fontWeight: 700, fontSize: "14px" }}>Donate Now</span>
          </div>
        </div>
      )}
    </div>
  );
}

function FilterBarPreview() {
  const [active, setActive] = useState([]);
  const [loading, setLoading] = useState(false);
  const FILTERS = [
    { facet: "Type", options: ["Early Intervention","ABA","Structured Teaching","Vocational"] },
    { facet: "Audience", options: ["Children","Adults","Families"] },
    { facet: "Age", options: ["2–6 yrs","7–12 yrs","13+ yrs"] },
  ];
  const toggle = (opt) => {
    const next = active.includes(opt) ? active.filter(a => a !== opt) : [...active, opt];
    setActive(next);
    setLoading(true);
    setTimeout(() => setLoading(false), 600);
  };
  const count = Math.max(0, 7 - active.length);

  return (
    <div>
      <div style={{ background: loading ? C.dim : C.white, borderRadius: "8px", padding: "12px 16px", border: "1px solid " + C.grey2, borderBottom: "2px solid " + C.teal, display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap", transition: "background 0.2s" }}>
        {FILTERS.map(f => (
          <div key={f.facet} style={{ display: "flex", alignItems: "center", gap: "4px" }}>
            <span style={{ fontSize: "11px", color: C.slate, fontWeight: 600, marginRight: "4px" }}>{f.facet}:</span>
            {f.options.map(opt => (
              <button key={opt} onClick={() => toggle(opt)} style={{
                background: active.includes(opt) ? C.teal : C.off,
                color: active.includes(opt) ? C.white : C.body,
                border: "1px solid " + (active.includes(opt) ? C.teal : C.grey2),
                borderRadius: "4px", padding: "4px 10px", fontSize: "12px",
                cursor: loading ? "not-allowed" : "pointer", fontWeight: active.includes(opt) ? 700 : 400
              }}>{opt}</button>
            ))}
          </div>
        ))}
        <div style={{ marginLeft: "auto", fontSize: "12px", color: loading ? C.muted : C.teal, fontWeight: 600, flexShrink: 0 }}>
          {loading ? "Updating..." : "Showing " + count + " of 7 programmes"}
        </div>
        {active.length > 0 && !loading && (
          <button onClick={() => setActive([])} style={{ background: "transparent", color: C.red, border: "none", fontSize: "12px", cursor: "pointer", padding: "0 4px" }}>Clear All ✕</button>
        )}
      </div>
      {count === 0 && (
        <div style={{ marginTop: "8px", background: C.redLt, border: "1px solid " + C.red, borderRadius: "6px", padding: "10px 14px", fontSize: "13px", color: C.red }}>
          No programmes match your filters. <span style={{ textDecoration: "underline", cursor: "pointer" }} onClick={() => setActive([])}>Clear Filters</span>
        </div>
      )}
    </div>
  );
}

function DonatePreview() {
  const [freq, setFreq] = useState("monthly");
  const [amount, setAmount] = useState(60);
  const [customAmt, setCustomAmt] = useState("");
  const PRESETS = [30, 60, 120, 300];
  const IMPACT = { 30: "1 week of therapy support", 60: "1 month of speech therapy", 120: "1 month of full intervention", 300: "1 term of structured teaching" };

  return (
    <div style={{ background: C.off, borderRadius: "10px", padding: "24px", maxWidth: "480px" }}>
      <div style={{ fontSize: "18px", fontWeight: 700, color: C.navy, marginBottom: "16px" }}>Support a Malaysian child with autism</div>
      <div style={{ display: "flex", borderRadius: "8px", overflow: "hidden", border: "2px solid " + C.teal, marginBottom: "20px" }}>
        {["monthly","one-time"].map(f => (
          <button key={f} onClick={() => setFreq(f)} style={{
            flex: 1, height: "44px", border: "none", cursor: "pointer", fontSize: "13px", fontWeight: 700,
            background: freq === f ? C.teal : C.white,
            color: freq === f ? C.white : C.slate,
            transition: "all 0.15s"
          }}>{f === "monthly" ? "Monthly" : "One-time"}</button>
        ))}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: "8px", marginBottom: "16px" }}>
        {PRESETS.map(p => (
          <button key={p} onClick={() => { setAmount(p); setCustomAmt(""); }} style={{
            height: "52px", border: "2px solid " + (amount === p && !customAmt ? C.teal : C.grey2),
            background: amount === p && !customAmt ? C.teal : C.white, color: amount === p && !customAmt ? C.white : C.body,
            borderRadius: "8px", fontSize: "14px", fontWeight: 700, cursor: "pointer",
            transition: "all 0.15s"
          }}>RM {p}</button>
        ))}
      </div>
      <input value={customAmt} onChange={e => { setCustomAmt(e.target.value); setAmount(Number(e.target.value) || 0); }}
        placeholder="Custom amount (RM)"
        style={{ width: "100%", height: "44px", borderRadius: "8px", border: "2px solid " + C.grey2, padding: "0 12px", fontSize: "14px", color: C.body, marginBottom: "16px", boxSizing: "border-box" }}
      />
      <div style={{ background: C.teal, borderRadius: "8px", padding: "12px 16px", marginBottom: "20px" }}>
        <span style={{ fontSize: "13px", color: C.white }}>
          {"RM " + amount + (freq === "monthly" ? "/month" : " once") + " = " + (IMPACT[amount] || "a meaningful contribution to autism support")}
        </span>
      </div>
      <button style={{ width: "100%", height: "52px", background: C.teal, color: C.white, border: "none", borderRadius: "8px", fontSize: "16px", fontWeight: 700, cursor: "pointer" }}>
        {"Donate RM " + amount + (freq === "monthly" ? " Monthly" : "")}
      </button>
      <div style={{ textAlign: "center", marginTop: "10px", fontSize: "11px", color: C.slate }}>
        Secure payment via iPay88 (MY) · Stripe (International)
      </div>
    </div>
  );
}

// ─── COMPONENT REGISTRY ──────────────────────────────────────────────────────
const PREVIEWS = {
  "C-01": { component: ButtonPreview,    desc: "States, variants, and size switcher" },
  "C-02": { component: BadgePreview,     desc: "All badge types — click to inspect each" },
  "C-03": { component: InputPreview,     desc: "All input states with live example" },
  "C-05": { component: CardPreview,      desc: "All card variants with hover state" },
  "C-07": { component: AlertPreview,     desc: "Success, warning, error, and info alerts" },
  "C-09": { component: NavPreview,       desc: "Desktop default, scrolled, and mobile states" },
  "C-10": { component: FilterBarPreview, desc: "Live filter chips with results counter" },
  "C-12": { component: DonatePreview,    desc: "Fully interactive amount selector" },
};

const TABS = ["Component Showcase", "Design Tokens", "Spacing Scale"];

export default function ComponentDashboard() {
  const [tab, setTab] = useState(0);
  const [selected, setSelected] = useState("C-01");
  const [catFilter, setCatFilter] = useState("All");

  const selComp = COMPONENTS.find(c => c.id === selected);
  const Preview = PREVIEWS[selected] ? PREVIEWS[selected].component : null;
  const previewDesc = PREVIEWS[selected] ? PREVIEWS[selected].desc : "Spec documented in NASOM_Component_Library.docx";

  const cats = ["All", "Atom", "Molecule", "Organism", "Pattern"];
  const filtered = catFilter === "All" ? COMPONENTS : COMPONENTS.filter(c => c.cat === catFilter);

  return (
    <div style={{ background: C.bg, minHeight: "100vh", fontFamily: "system-ui,sans-serif", color: C.text, padding: "20px" }}>

      {/* Header */}
      <div style={{ marginBottom: "20px" }}>
        <div style={{ fontSize: "10px", color: C.muted, letterSpacing: "2px", textTransform: "uppercase", marginBottom: "5px" }}>NASOM.ORG.MY — UI COMPONENT LIBRARY</div>
        <div style={{ display: "flex", alignItems: "center", gap: "16px", flexWrap: "wrap" }}>
          <h1 style={{ margin: 0, fontSize: "20px", fontWeight: 700 }}>Interactive Component Showcase</h1>
          <span style={{ fontSize: "12px", color: C.muted }}>12 components · toggle states · variant switcher</span>
        </div>
      </div>

      {/* Stat pills */}
      <div style={{ display: "flex", gap: "8px", marginBottom: "20px", flexWrap: "wrap" }}>
        {[
          { label: "Total", val: 12, col: C.blue },
          { label: "Atoms", val: 4, col: C.teal },
          { label: "Molecules", val: 4, col: C.purple },
          { label: "Organisms", val: 3, col: C.amber },
          { label: "Patterns", val: 1, col: C.green },
          { label: "P0 Components", val: COMPONENTS.filter(c => c.priority === "P0").length, col: C.red },
        ].map(s => (
          <div key={s.label} style={{ background: C.card, border: "1px solid " + C.border, borderRadius: "7px", padding: "10px 16px" }}>
            <div style={{ fontSize: "20px", fontWeight: 700, color: s.col }}>{s.val}</div>
            <div style={{ fontSize: "11px", color: C.muted }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", gap: "4px", marginBottom: "20px", borderBottom: "1px solid " + C.border }}>
        {TABS.map((t, i) => (
          <button key={t} onClick={() => setTab(i)} style={{
            background: tab === i ? C.blue : "transparent", color: tab === i ? C.white : C.muted,
            border: "none", borderRadius: "6px 6px 0 0", padding: "8px 18px",
            cursor: "pointer", fontSize: "13px", fontWeight: tab === i ? 700 : 400
          }}>{t}</button>
        ))}
      </div>

      {/* TAB 0: SHOWCASE */}
      {tab === 0 && (
        <div style={{ display: "flex", gap: "16px" }}>

          {/* Sidebar */}
          <div style={{ width: "200px", flexShrink: 0 }}>
            {/* Cat filter */}
            <div style={{ display: "flex", flexDirection: "column", gap: "4px", marginBottom: "12px" }}>
              {cats.map(c => (
                <button key={c} onClick={() => setCatFilter(c)} style={{
                  background: catFilter === c ? C.blue + "22" : "transparent",
                  color: catFilter === c ? C.blue : C.muted,
                  border: "1px solid " + (catFilter === c ? C.blue : "transparent"),
                  borderRadius: "5px", padding: "4px 10px", cursor: "pointer", fontSize: "12px",
                  textAlign: "left"
                }}>{c}</button>
              ))}
            </div>
            {/* Component list */}
            {filtered.map(comp => (
              <div key={comp.id} onClick={() => setSelected(comp.id)} style={{
                background: selected === comp.id ? C.blue + "22" : C.card,
                border: "1px solid " + (selected === comp.id ? C.blue : C.border),
                borderRadius: "7px", padding: "8px 12px", marginBottom: "5px", cursor: "pointer"
              }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "2px" }}>
                  <span style={{ fontSize: "10px", fontFamily: "monospace", color: C.muted }}>{comp.id}</span>
                  <span style={{ fontSize: "10px", fontWeight: 700, color: priColor(comp.priority) }}>{comp.priority}</span>
                </div>
                <div style={{ fontSize: "12px", fontWeight: 600, color: C.text }}>{comp.name}</div>
                <div style={{ fontSize: "10px", color: C.muted, marginTop: "2px" }}>{comp.cat}</div>
              </div>
            ))}
          </div>

          {/* Main panel */}
          <div style={{ flex: 1 }}>
            {selComp && (
              <div>
                {/* Component header */}
                <div style={{ background: C.navyDk, borderRadius: "8px", padding: "14px 20px", marginBottom: "16px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                    <div>
                      <div style={{ fontSize: "10px", fontFamily: "monospace", color: "#7090b0", marginBottom: "4px" }}>
                        {selComp.id} · {selComp.cat} · {selComp.class}
                      </div>
                      <div style={{ fontSize: "18px", fontWeight: 700, color: C.white }}>{selComp.name}</div>
                      <div style={{ fontSize: "12px", color: C.muted, marginTop: "4px" }}>{previewDesc}</div>
                    </div>
                    <span style={{ background: priColor(selComp.priority) + "33", color: priColor(selComp.priority), borderRadius: "5px", padding: "3px 10px", fontSize: "12px", fontWeight: 700 }}>{selComp.priority}</span>
                  </div>
                </div>

                {/* Preview area */}
                <div style={{ background: C.card, border: "1px solid " + C.border, borderRadius: "10px", padding: "24px" }}>
                  {Preview ? <Preview /> : (
                    <div style={{ textAlign: "center", color: C.muted, padding: "40px 20px" }}>
                      <div style={{ fontSize: "14px", marginBottom: "8px" }}>Interactive preview in development</div>
                      <div style={{ fontSize: "12px" }}>Full specification in NASOM_Component_Library.docx</div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 1: DESIGN TOKENS */}
      {tab === 1 && (
        <div>
          <h2 style={{ fontSize: "16px", fontWeight: 700, marginBottom: "16px", marginTop: 0 }}>Colour Tokens</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: "10px", marginBottom: "24px" }}>
            {TOKENS.map(t => (
              <div key={t.token} style={{ background: C.card, border: "1px solid " + C.border, borderRadius: "8px", overflow: "hidden" }}>
                <div style={{ height: "48px", background: t.value }}></div>
                <div style={{ padding: "10px 12px" }}>
                  <code style={{ fontSize: "11px", color: C.teal, display: "block", marginBottom: "3px" }}>{t.token}</code>
                  <div style={{ fontSize: "12px", fontWeight: 600, color: C.text }}>{t.value}</div>
                  <div style={{ fontSize: "11px", color: C.muted, marginTop: "2px" }}>{t.label}</div>
                </div>
              </div>
            ))}
          </div>
          <div style={{ background: C.card, border: "1px solid " + C.border, borderRadius: "8px", padding: "14px 18px" }}>
            <div style={{ fontSize: "12px", fontWeight: 700, color: C.amber, marginBottom: "6px" }}>IMPLEMENTATION NOTE</div>
            <div style={{ fontSize: "13px", color: C.text }}>All tokens defined once in <code style={{ color: C.teal }}>/assets/css/nasom-tokens.css</code> as CSS custom properties. Never hardcode hex values in component CSS — always reference tokens. Grep for raw hex to catch violations: <code style={{ color: C.teal }}>grep -r "#[0-9A-F]" assets/css/components/</code></div>
          </div>
        </div>
      )}

      {/* TAB 2: SPACING SCALE */}
      {tab === 2 && (
        <div>
          <h2 style={{ fontSize: "16px", fontWeight: 700, marginBottom: "16px", marginTop: 0 }}>Spacing Scale</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            {SPACING.map((s, i) => {
              const isRadius = s.token.includes("radius");
              const px = parseInt(s.px);
              return (
                <div key={s.token} style={{ background: C.card, border: "1px solid " + C.border, borderRadius: "7px", padding: "12px 16px", display: "flex", alignItems: "center", gap: "16px" }}>
                  <code style={{ fontSize: "12px", color: C.teal, width: "140px", flexShrink: 0 }}>{s.token}</code>
                  <div style={{ width: "48px", flexShrink: 0, textAlign: "right", fontSize: "13px", fontWeight: 700, color: C.text }}>{s.px}</div>
                  <div style={{ width: Math.min(px * 3, 200) + "px", height: isRadius ? "24px" : "12px", background: C.teal,
                    borderRadius: isRadius ? s.px : "2px", flexShrink: 0, transition: "width 0.3s" }}></div>
                  <div style={{ fontSize: "12px", color: C.muted, flex: 1 }}>{s.usage}</div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

