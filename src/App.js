import React, { useState } from "react";

const GOLD = "#C9A84C";
const GOLD_LIGHT = "#E8C96B";
const GOLD_PALE = "#F5E6B8";
const DARK = "#0F0D0A";
const DARK2 = "#1A1610";
const DARK3 = "#241F17";
const DARK4 = "#2E2820";
const WARM = "#3D3020";
const TEXT = "#F0E8D5";
const TEXT_DIM = "#A8997A";
const GREEN = "#2A6B3C";

const LISTINGS = [
  {
    id: 1, type: "house", status: "available",
    title: "Executive Villa", suburb: "Borrowdale", city: "Harare",
    price: "$285,000", currency: "USD", beds: 5, baths: 3, sqm: 420,
    tag: "PRIME", desc: "Fully walled 5-bed executive home with solar, borehole & staff quarters on 2,000m².",
    img: "🏡", color: "#2A3F2E"
  },
  {
    id: 2, type: "stand", status: "available",
    title: "Residential Stand", suburb: "Ruwa", city: "Harare",
    price: "ZWG 4,200,000", currency: "ZWG", beds: null, baths: null, sqm: 1000,
    tag: "STAND", desc: "1,000m² serviced residential stand with title deeds ready. Ideal for low-density build.",
    img: "📐", color: "#3A2E1A"
  },
  {
    id: 3, type: "apartment", status: "available",
    title: "Modern 2-Bed Flat", suburb: "Avondale", city: "Harare",
    price: "$750 /mo", currency: "USD", beds: 2, baths: 1, sqm: 85,
    tag: "RENT", desc: "Secure complex, fitted kitchen, backup power. Walking distance to shops.",
    img: "🏢", color: "#1A2A3A"
  },
  {
    id: 4, type: "house", status: "available",
    title: "Family Home", suburb: "Kumalo", city: "Bulawayo",
    price: "$165,000", currency: "USD", beds: 4, baths: 2, sqm: 260,
    tag: "SALE", desc: "Well-maintained 4-bed in quiet Kumalo. Large garden, double garage, title deeds.",
    img: "🏠", color: "#2A1F35"
  },
  {
    id: 5, type: "stand", status: "available",
    title: "Commercial Stand", suburb: "Msasa", city: "Harare",
    price: "$95,000", currency: "USD", beds: null, baths: null, sqm: 2500,
    tag: "COMMERCIAL", desc: "Rare 2,500m² commercial stand along main road. Ideal for warehouse or offices.",
    img: "🏗️", color: "#2E2010"
  },
  {
    id: 6, type: "house", status: "under_construction",
    title: "Off-Plan Townhouse", suburb: "Waterfalls", city: "Harare",
    price: "$89,000", currency: "USD", beds: 3, baths: 2, sqm: 140,
    tag: "OFF-PLAN", desc: "3-bed townhouse in gated complex. 70% complete. Completion Q1 2026.",
    img: "🔨", color: "#1A2E25"
  },
];

const CONSULTANTS = [
  { name: "Arch. Tendai Moyo", role: "Architectural Design", exp: "12 yrs", city: "Harare", emoji: "📐", rating: 4.9 },
  { name: "Eng. Rudo Chikwanda", role: "Structural Engineering", exp: "9 yrs", city: "Bulawayo", emoji: "⚙️", rating: 4.8 },
  { name: "QS Farai Dube", role: "Bill of Quantities", exp: "7 yrs", city: "Harare", emoji: "📊", rating: 4.7 },
  { name: "Surv. Nkosi Sibanda", role: "Land Surveying", exp: "14 yrs", city: "Bulawayo", emoji: "🗺️", rating: 5.0 },
];

const SERVICES = [
  { icon: "📐", title: "Architectural Plans", desc: "Full house plans, extensions, and commercial blueprints. NRZ & EMA compliant." },
  { icon: "📊", title: "Bill of Quantities", desc: "Accurate material costings and BOQ reports for budgeting and tender purposes." },
  { icon: "🗺️", title: "Land Surveying", desc: "Boundary surveys, topographic mapping, and GPS geo-referencing." },
  { icon: "🏗️", title: "Project Management", desc: "End-to-end site supervision, contractor vetting, and progress reporting." },
];

export default function FinesseProperties() {
  const [tab, setTab] = useState("browse");
  const [filter, setFilter] = useState({ city: "all", type: "all", status: "all" });
  const [showSubmit, setShowSubmit] = useState(false);
  const [showBooking, setShowBooking] = useState(false);
  const [expandedListing, setExpandedListing] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

  const filtered = LISTINGS.filter(l => {
    if (filter.city !== "all" && l.city !== filter.city) return false;
    if (filter.type !== "all" && l.type !== filter.type) return false;
    if (filter.status !== "all" && l.status !== filter.status) return false;
    return true;
  });

  const statusLabel = s => ({ available: "Available", under_construction: "Under Construction", sold: "Sold" }[s] || s);
  const statusColor = s => ({ available: "#2A6B3C", under_construction: "#7A5A00", sold: "#6B2A2A" }[s] || "#444");

  return (
    <div style={{
      background: DARK, color: TEXT, minHeight: "100vh",
      fontFamily: "'Georgia', 'Times New Roman', serif",
      maxWidth: 480, margin: "0 auto", position: "relative", overflowX: "hidden"
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=Lato:wght@300;400;700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 3px; } ::-webkit-scrollbar-track { background: ${DARK2}; } ::-webkit-scrollbar-thumb { background: ${GOLD}; }
        .serif { font-family: 'Playfair Display', Georgia, serif; }
        .sans { font-family: 'Lato', sans-serif; }
        .gold { color: ${GOLD}; }
        .btn-gold { background: ${GOLD}; color: ${DARK}; border: none; cursor: pointer; font-family: 'Lato', sans-serif; font-weight: 700; letter-spacing: 1.5px; text-transform: uppercase; }
        .btn-gold:hover { background: ${GOLD_LIGHT}; }
        .btn-outline { background: transparent; color: ${GOLD}; border: 1px solid ${GOLD}; cursor: pointer; font-family: 'Lato', sans-serif; font-weight: 700; letter-spacing: 1px; text-transform: uppercase; }
        .btn-outline:hover { background: ${GOLD}; color: ${DARK}; }
        input, select, textarea { background: ${DARK3}; border: 1px solid ${WARM}; color: ${TEXT}; padding: 10px 12px; border-radius: 4px; width: 100%; font-family: 'Lato', sans-serif; font-size: 13px; outline: none; }
        input:focus, select:focus, textarea:focus { border-color: ${GOLD}; }
        select option { background: ${DARK3}; }
        .tab-active { color: ${GOLD}; border-bottom: 2px solid ${GOLD}; }
        .listing-card:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(201,168,76,0.15); }
        .listing-card { transition: all 0.2s ease; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        .fade-in { animation: fadeIn 0.4s ease forwards; }
        .star { color: ${GOLD}; }
        .overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.85); z-index: 100; display: flex; align-items: flex-end; justify-content: center; }
        .sheet { background: ${DARK2}; border-top: 2px solid ${GOLD}; padding: 24px; width: 100%; max-width: 480px; border-radius: 16px 16px 0 0; max-height: 90vh; overflow-y: auto; }
        label { display: block; font-size: 11px; letter-spacing: 1px; text-transform: uppercase; color: ${TEXT_DIM}; margin-bottom: 5px; margin-top: 14px; font-family: 'Lato', sans-serif; }
        .menu-overlay { position: fixed; inset: 0; z-index: 200; background: rgba(0,0,0,0.95); display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 28px; }
        .menu-item { font-family: 'Playfair Display', serif; font-size: 28px; color: ${TEXT_DIM}; cursor: pointer; letter-spacing: 2px; }
        .menu-item:hover { color: ${GOLD}; }
        .badge { display: inline-block; padding: 2px 7px; border-radius: 2px; font-size: 9px; font-weight: 700; letter-spacing: 1.5px; font-family: 'Lato', sans-serif; }
        .divider { height: 1px; background: linear-gradient(90deg, transparent, ${WARM}, transparent); margin: 20px 0; }
        .wa-btn { background: #25D366; color: white; border: none; border-radius: 6px; padding: 11px 18px; font-size: 13px; font-weight: 700; cursor: pointer; display: flex; align-items: center; gap: 8px; font-family: 'Lato', sans-serif; }
        .progress { height: 3px; background: ${WARM}; border-radius: 2px; overflow: hidden; margin-top: 6px; }
        .progress-fill { height: 100%; background: linear-gradient(90deg, ${GOLD}, ${GOLD_LIGHT}); border-radius: 2px; }
      `}</style>

      {/* HEADER */}
      <div style={{ background: DARK2, borderBottom: `1px solid ${WARM}`, padding: "14px 18px", display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, zIndex: 50 }}>
        <div>
          <div className="serif" style={{ fontSize: 20, fontWeight: 900, color: GOLD, letterSpacing: 1, lineHeight: 1 }}>FINESSE</div>
          <div className="sans" style={{ fontSize: 9, letterSpacing: 4, color: TEXT_DIM, textTransform: "uppercase" }}>Properties</div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ textAlign: "right" }}>
            <div className="sans" style={{ fontSize: 9, color: TEXT_DIM, letterSpacing: 1 }}>ZIMBABWE</div>
            <div style={{ fontSize: 9, color: GOLD, fontFamily: "Lato, sans-serif", fontWeight: 700 }}>🇿🇼 ZWE</div>
          </div>
          <button onClick={() => setMenuOpen(true)} style={{ background: "none", border: "none", cursor: "pointer", color: TEXT, fontSize: 20, lineHeight: 1 }}>☰</button>
        </div>
      </div>

      {/* MENU OVERLAY */}
      {menuOpen && (
        <div className="menu-overlay" onClick={() => setMenuOpen(false)}>
          <div style={{ position: "absolute", top: 18, right: 18, color: GOLD, fontSize: 28, cursor: "pointer" }}>✕</div>
          <div style={{ width: 60, height: 1, background: WARM, marginBottom: 8 }} />
          {["browse", "consult", "list", "about"].map(t => (
            <div key={t} className="menu-item" onClick={() => { setTab(t); setMenuOpen(false); }}>
              {t.toUpperCase()}
            </div>
          ))}
          <div style={{ width: 60, height: 1, background: WARM, marginTop: 8 }} />
          <div className="sans" style={{ color: TEXT_DIM, fontSize: 11, letterSpacing: 2 }}>FREE TO BROWSE · NO SIGN-UP</div>
        </div>
      )}

      {/* HERO BANNER */}
      {tab === "browse" && (
        <div style={{ background: `linear-gradient(135deg, ${DARK3} 0%, ${WARM} 50%, ${DARK2} 100%)`, padding: "28px 18px 22px", borderBottom: `1px solid ${WARM}`, position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", top: -20, right: -20, width: 120, height: 120, borderRadius: "50%", background: `radial-gradient(circle, rgba(201,168,76,0.12) 0%, transparent 70%)` }} />
          <div style={{ position: "absolute", bottom: -10, left: -10, width: 80, height: 80, borderRadius: "50%", background: `radial-gradient(circle, rgba(201,168,76,0.08) 0%, transparent 70%)` }} />
          <div className="badge" style={{ background: GOLD, color: DARK, marginBottom: 10 }}>✦ ZIMBABWE'S TRUSTED PLATFORM</div>
          <div className="serif" style={{ fontSize: 26, fontWeight: 900, lineHeight: 1.2, marginBottom: 6 }}>
            Find Your <span style={{ color: GOLD }}>Perfect</span><br />Property
          </div>
          <div className="sans" style={{ fontSize: 13, color: TEXT_DIM, marginBottom: 16 }}>Browse freely. No registration. No fees until you close.</div>
          <div style={{ display: "flex", gap: 8 }}>
            <div style={{ background: DARK4, borderRadius: 6, padding: "8px 12px", flex: 1, textAlign: "center" }}>
              <div className="serif" style={{ color: GOLD, fontWeight: 700, fontSize: 18 }}>{LISTINGS.length}+</div>
              <div className="sans" style={{ fontSize: 10, color: TEXT_DIM, letterSpacing: 1 }}>LISTINGS</div>
            </div>
            <div style={{ background: DARK4, borderRadius: 6, padding: "8px 12px", flex: 1, textAlign: "center" }}>
              <div className="serif" style={{ color: GOLD, fontWeight: 700, fontSize: 18 }}>2</div>
              <div className="sans" style={{ fontSize: 10, color: TEXT_DIM, letterSpacing: 1 }}>CITIES</div>
            </div>
            <div style={{ background: DARK4, borderRadius: 6, padding: "8px 12px", flex: 1, textAlign: "center" }}>
              <div className="serif" style={{ color: GOLD, fontWeight: 700, fontSize: 18 }}>100%</div>
              <div className="sans" style={{ fontSize: 10, color: TEXT_DIM, letterSpacing: 1 }}>FREE BROWSE</div>
            </div>
          </div>
        </div>
      )}

      {/* TAB NAV */}
      <div style={{ background: DARK2, display: "flex", borderBottom: `1px solid ${WARM}`, position: "sticky", top: 57, zIndex: 40 }}>
        {[
          { key: "browse", label: "Browse" },
          { key: "consult", label: "Consult" },
          { key: "list", label: "List" },
          { key: "about", label: "About" },
        ].map(t => (
          <button key={t.key} onClick={() => setTab(t.key)}
            className={`sans ${tab === t.key ? "tab-active" : ""}`}
            style={{ flex: 1, background: "none", border: "none", color: tab === t.key ? GOLD : TEXT_DIM, padding: "12px 4px", fontSize: 11, letterSpacing: 1.5, textTransform: "uppercase", cursor: "pointer", borderBottom: tab === t.key ? `2px solid ${GOLD}` : "2px solid transparent", fontWeight: 700 }}>
            {t.label}
          </button>
        ))}
      </div>

      {/* ── BROWSE TAB ── */}
      {tab === "browse" && (
        <div style={{ padding: "16px 14px" }}>
          {/* Filters */}
          <div style={{ background: DARK3, borderRadius: 8, padding: "14px", marginBottom: 16, border: `1px solid ${WARM}` }}>
            <div className="sans" style={{ fontSize: 10, letterSpacing: 2, color: GOLD, marginBottom: 10, fontWeight: 700 }}>FILTER LISTINGS</div>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              <select value={filter.city} onChange={e => setFilter({ ...filter, city: e.target.value })} style={{ flex: 1, minWidth: 100 }}>
                <option value="all">All Cities</option>
                <option value="Harare">Harare</option>
                <option value="Bulawayo">Bulawayo</option>
              </select>
              <select value={filter.type} onChange={e => setFilter({ ...filter, type: e.target.value })} style={{ flex: 1, minWidth: 100 }}>
                <option value="all">All Types</option>
                <option value="house">Houses</option>
                <option value="apartment">Apartments</option>
                <option value="stand">Stands</option>
              </select>
              <select value={filter.status} onChange={e => setFilter({ ...filter, status: e.target.value })} style={{ flex: 1, minWidth: 120 }}>
                <option value="all">All Status</option>
                <option value="available">Available</option>
                <option value="under_construction">Under Construction</option>
                <option value="sold">Sold</option>
              </select>
            </div>
          </div>

          {/* Listings */}
          <div className="sans" style={{ fontSize: 11, color: TEXT_DIM, letterSpacing: 1, marginBottom: 10 }}>
            {filtered.length} RESULT{filtered.length !== 1 ? "S" : ""} FOUND
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {filtered.map((l, i) => (
              <div key={l.id} className="listing-card fade-in" style={{ background: DARK2, borderRadius: 10, border: `1px solid ${WARM}`, overflow: "hidden", animationDelay: `${i * 60}ms` }}>
                {/* Image area */}
                <div style={{ background: l.color, height: 100, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 48, position: "relative" }}>
                  {l.img}
                  <div style={{ position: "absolute", top: 10, left: 10 }}>
                    <span className="badge" style={{ background: GOLD, color: DARK }}>{l.tag}</span>
                  </div>
                  <div style={{ position: "absolute", top: 10, right: 10 }}>
                    <span className="badge" style={{ background: statusColor(l.status), color: "white" }}>{statusLabel(l.status)}</span>
                  </div>
                </div>
                {/* Info */}
                <div style={{ padding: "14px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 4 }}>
                    <div className="serif" style={{ fontSize: 16, fontWeight: 700, lineHeight: 1.2 }}>{l.title}</div>
                    <div className="serif" style={{ color: GOLD, fontWeight: 700, fontSize: 14, textAlign: "right", whiteSpace: "nowrap", marginLeft: 8 }}>{l.price}</div>
                  </div>
                  <div className="sans" style={{ color: TEXT_DIM, fontSize: 12, marginBottom: 8 }}>📍 {l.suburb}, {l.city}</div>
                  <div style={{ display: "flex", gap: 12, marginBottom: 10 }}>
                    {l.beds && <span className="sans" style={{ fontSize: 11, color: TEXT_DIM }}>🛏 {l.beds} bed</span>}
                    {l.baths && <span className="sans" style={{ fontSize: 11, color: TEXT_DIM }}>🚿 {l.baths} bath</span>}
                    <span className="sans" style={{ fontSize: 11, color: TEXT_DIM }}>📐 {l.sqm}m²</span>
                  </div>
                  {expandedListing === l.id && (
                    <div className="sans fade-in" style={{ fontSize: 12, color: TEXT_DIM, marginBottom: 12, lineHeight: 1.6, borderTop: `1px solid ${WARM}`, paddingTop: 10 }}>
                      {l.desc}
                      <div style={{ marginTop: 12 }}>
                        <div style={{ display: "flex", gap: 8 }}>
                          <button className="wa-btn" style={{ flex: 1, justifyContent: "center" }}
                            onClick={() => window.open(`https://wa.me/263771234567?text=Hi, I'm interested in the ${encodeURIComponent(l.title)} in ${l.suburb}`)}>
                            <span>💬</span> WhatsApp Agent
                          </button>
                        </div>
                        <button className="btn-outline" style={{ width: "100%", padding: "10px", borderRadius: 6, marginTop: 8, fontSize: 11 }}>
                          📄 Request Title Deed Verification
                        </button>
                      </div>
                    </div>
                  )}
                  <button className="btn-outline" style={{ width: "100%", padding: "8px", borderRadius: 6, fontSize: 11 }}
                    onClick={() => setExpandedListing(expandedListing === l.id ? null : l.id)}>
                    {expandedListing === l.id ? "▲ Less" : "▼ View Details & Contact"}
                  </button>
                </div>
              </div>
            ))}
          </div>
          {filtered.length === 0 && (
            <div style={{ textAlign: "center", padding: "40px 20px", color: TEXT_DIM }}>
              <div style={{ fontSize: 32, marginBottom: 12 }}>🔍</div>
              <div className="serif" style={{ fontSize: 18, marginBottom: 8 }}>No listings found</div>
              <div className="sans" style={{ fontSize: 13 }}>Try adjusting your filters</div>
            </div>
          )}

          {/* Currency note */}
          <div style={{ background: DARK3, border: `1px solid ${WARM}`, borderRadius: 8, padding: 12, marginTop: 20, display: "flex", gap: 10, alignItems: "flex-start" }}>
            <span style={{ fontSize: 18 }}>💱</span>
            <div>
              <div className="sans" style={{ fontSize: 11, fontWeight: 700, color: GOLD, letterSpacing: 1, marginBottom: 2 }}>MULTI-CURRENCY LISTINGS</div>
              <div className="sans" style={{ fontSize: 11, color: TEXT_DIM }}>Prices listed in USD and ZWG. Payments via EcoCash, Innbucks, ZimSwitch, Visa/Mastercard through Paynow.</div>
            </div>
          </div>
        </div>
      )}

      {/* ── CONSULT TAB ── */}
      {tab === "consult" && (
        <div style={{ padding: "16px 14px" }} className="fade-in">
          <div style={{ marginBottom: 20 }}>
            <div className="badge" style={{ background: GOLD, color: DARK, marginBottom: 8 }}>✦ PROFESSIONAL SERVICES</div>
            <div className="serif" style={{ fontSize: 22, fontWeight: 900, lineHeight: 1.2, marginBottom: 6 }}>
              Build With <span style={{ color: GOLD }}>Confidence</span>
            </div>
            <div className="sans" style={{ fontSize: 13, color: TEXT_DIM }}>Vetted Zimbabwean engineers, architects & surveyors at your service.</div>
          </div>

          {/* Services */}
          <div className="sans" style={{ fontSize: 10, letterSpacing: 2, color: GOLD, marginBottom: 10, fontWeight: 700 }}>OUR SERVICES</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 24 }}>
            {SERVICES.map((s, i) => (
              <div key={i} style={{ background: DARK3, borderRadius: 8, padding: "14px", border: `1px solid ${WARM}`, display: "flex", gap: 14, alignItems: "flex-start" }}>
                <div style={{ fontSize: 24, lineHeight: 1 }}>{s.icon}</div>
                <div>
                  <div className="serif" style={{ fontWeight: 700, fontSize: 15, marginBottom: 4 }}>{s.title}</div>
                  <div className="sans" style={{ fontSize: 12, color: TEXT_DIM, lineHeight: 1.5 }}>{s.desc}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Consultants */}
          <div className="sans" style={{ fontSize: 10, letterSpacing: 2, color: GOLD, marginBottom: 10, fontWeight: 700 }}>FEATURED CONSULTANTS</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 20 }}>
            {CONSULTANTS.map((c, i) => (
              <div key={i} style={{ background: DARK2, borderRadius: 8, border: `1px solid ${WARM}`, padding: "14px", display: "flex", gap: 14, alignItems: "center" }}>
                <div style={{ width: 48, height: 48, borderRadius: "50%", background: DARK4, border: `2px solid ${GOLD}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, flexShrink: 0 }}>{c.emoji}</div>
                <div style={{ flex: 1 }}>
                  <div className="serif" style={{ fontWeight: 700, fontSize: 14 }}>{c.name}</div>
                  <div className="sans" style={{ fontSize: 11, color: GOLD, marginBottom: 2 }}>{c.role}</div>
                  <div className="sans" style={{ fontSize: 11, color: TEXT_DIM }}>{c.exp} exp · {c.city}</div>
                  <div style={{ display: "flex", gap: 1, marginTop: 4 }}>
                    {"★★★★★".split("").map((s, j) => (
                      <span key={j} style={{ color: j < Math.floor(c.rating) ? GOLD : WARM, fontSize: 10 }}>★</span>
                    ))}
                    <span className="sans" style={{ fontSize: 10, color: TEXT_DIM, marginLeft: 4 }}>{c.rating}</span>
                  </div>
                </div>
                <button className="wa-btn" style={{ padding: "8px 10px", fontSize: 11, flexShrink: 0 }}
                  onClick={() => window.open(`https://wa.me/263771234567?text=Hi, I'd like to book ${encodeURIComponent(c.name)} for ${encodeURIComponent(c.role)}`)}>
                  💬
                </button>
              </div>
            ))}
          </div>

          <button className="btn-gold" style={{ width: "100%", padding: "14px", borderRadius: 8, fontSize: 13 }}
            onClick={() => setShowBooking(true)}>
            📋 Book a Consultation
          </button>
        </div>
      )}

      {/* ── LIST TAB ── */}
      {tab === "list" && (
        <div style={{ padding: "16px 14px" }} className="fade-in">
          <div style={{ marginBottom: 20 }}>
            <div className="badge" style={{ background: GOLD, color: DARK, marginBottom: 8 }}>✦ LIST YOUR PROPERTY</div>
            <div className="serif" style={{ fontSize: 22, fontWeight: 900, lineHeight: 1.2, marginBottom: 6 }}>
              Reach Serious <span style={{ color: GOLD }}>Buyers</span>
            </div>
            <div className="sans" style={{ fontSize: 13, color: TEXT_DIM }}>Free to list. We earn a small fee only when you close a deal.</div>
          </div>

          {/* Fee info */}
          <div style={{ background: `linear-gradient(135deg, ${DARK3}, ${WARM})`, border: `1px solid ${GOLD}`, borderRadius: 10, padding: "16px", marginBottom: 20 }}>
            <div className="serif" style={{ color: GOLD, fontWeight: 700, fontSize: 16, marginBottom: 8 }}>Our Success-Fee Model</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {[
                { label: "Listing Your Property", value: "FREE" },
                { label: "Buyer Browsing & Contact", value: "FREE" },
                { label: "Success Fee (on close)", value: "1.5%–2%" },
                { label: "Payment via Paynow / EcoCash", value: "✓" },
              ].map((row, i) => (
                <div key={i} style={{ display: "flex", justifyContent: "space-between", borderBottom: i < 3 ? `1px solid ${WARM}` : "none", paddingBottom: i < 3 ? 8 : 0 }}>
                  <span className="sans" style={{ fontSize: 12, color: TEXT_DIM }}>{row.label}</span>
                  <span className="sans" style={{ fontSize: 12, color: row.value === "FREE" ? "#2A6B3C" : GOLD, fontWeight: 700 }}>{row.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Listing Form */}
          <div style={{ background: DARK2, borderRadius: 10, border: `1px solid ${WARM}`, padding: "18px" }}>
            <div className="sans" style={{ fontSize: 10, letterSpacing: 2, color: GOLD, marginBottom: 14, fontWeight: 700 }}>LISTING DETAILS</div>
            <label>Property Type</label>
            <select><option>House</option><option>Apartment / Flat</option><option>Residential Stand</option><option>Commercial Stand</option><option>Agricultural Land</option></select>
            <label>Listing Title</label>
            <input placeholder="e.g. 4-Bed Executive Home, Borrowdale" />
            <label>City</label>
            <select><option>Harare</option><option>Bulawayo</option><option>Mutare</option><option>Gweru</option><option>Other</option></select>
            <label>Suburb / Area</label>
            <input placeholder="e.g. Borrowdale, Kumalo, Msasa..." />
            <label>Asking Price</label>
            <div style={{ display: "flex", gap: 8 }}>
              <select style={{ width: "35%" }}><option>USD</option><option>ZWG</option></select>
              <input placeholder="Amount" style={{ flex: 1 }} />
            </div>
            <label>Status</label>
            <select><option>Available</option><option>Under Construction</option></select>
            <label>Description</label>
            <textarea rows={4} placeholder="Bedrooms, bathrooms, plot size, special features, title deed status..." />
            <label>Your WhatsApp Number</label>
            <input placeholder="+263 7X XXX XXXX" />
            <label>Ownership Verification</label>
            <select><option>Title Deeds (Original)</option><option>Agreement of Sale</option><option>Cession</option><option>Offer Letter</option></select>
            <div className="divider" />
            <button className="btn-gold" style={{ width: "100%", padding: "14px", borderRadius: 8, fontSize: 13 }}>
              ✦ Submit Listing
            </button>
            <div className="sans" style={{ fontSize: 11, color: TEXT_DIM, textAlign: "center", marginTop: 10, lineHeight: 1.5 }}>
              Our team reviews all listings within 24hrs. You'll be contacted via WhatsApp.
            </div>
          </div>
        </div>
      )}

      {/* ── ABOUT TAB ── */}
      {tab === "about" && (
        <div style={{ padding: "16px 14px" }} className="fade-in">
          <div style={{ textAlign: "center", marginBottom: 28, padding: "24px 0" }}>
            <div className="serif" style={{ fontSize: 36, fontWeight: 900, color: GOLD, letterSpacing: 2 }}>FINESSE</div>
            <div className="sans" style={{ fontSize: 11, letterSpacing: 5, color: TEXT_DIM, textTransform: "uppercase", marginBottom: 16 }}>Properties · Zimbabwe</div>
            <div style={{ width: 60, height: 2, background: GOLD, margin: "0 auto 16px" }} />
            <div className="sans" style={{ fontSize: 13, color: TEXT_DIM, lineHeight: 1.7 }}>
              Zimbabwe's most trusted property marketplace. Built for local buyers, sellers, and builders — with zero barriers to entry.
            </div>
          </div>

          {[
            { icon: "🔓", title: "Free to Browse", desc: "No account. No paywall. Search and contact agents at zero cost." },
            { icon: "🏗️", title: "Built for Zimbabwe", desc: "Multi-currency (USD + ZWG), EcoCash & Innbucks payments, local professionals." },
            { icon: "✅", title: "Verified Listings", desc: "We verify title deeds, agreements of sale, and ownership before publishing." },
            { icon: "💼", title: "Success-Fee Model", desc: "We only earn when you close. A small platform fee is charged post-transaction." },
            { icon: "🤝", title: "WhatsApp First", desc: "Direct WhatsApp anchors on every listing for instant, familiar communication." },
          ].map((item, i) => (
            <div key={i} style={{ display: "flex", gap: 14, marginBottom: 18, borderBottom: `1px solid ${WARM}`, paddingBottom: 18 }}>
              <div style={{ fontSize: 28 }}>{item.icon}</div>
              <div>
                <div className="serif" style={{ fontWeight: 700, fontSize: 15, marginBottom: 4 }}>{item.title}</div>
                <div className="sans" style={{ fontSize: 12, color: TEXT_DIM, lineHeight: 1.5 }}>{item.desc}</div>
              </div>
            </div>
          ))}

          <div style={{ background: DARK3, borderRadius: 10, padding: "18px", border: `1px solid ${WARM}`, marginTop: 8, textAlign: "center" }}>
            <div className="serif" style={{ fontSize: 18, fontWeight: 700, color: GOLD, marginBottom: 8 }}>Contact Finesse</div>
            <div className="sans" style={{ fontSize: 12, color: TEXT_DIM, marginBottom: 14 }}>Harare, Zimbabwe · Mon–Sat 8am–6pm</div>
            <button className="wa-btn" style={{ width: "100%", justifyContent: "center", borderRadius: 8, padding: 14 }}
              onClick={() => window.open("https://wa.me/263771234567?text=Hi Finesse Properties, I'd like more information")}>
              <span>💬</span> WhatsApp Us
            </button>
            <div className="sans" style={{ fontSize: 11, color: TEXT_DIM, marginTop: 10 }}>
              Paynow · EcoCash · Innbucks · ZimSwitch · Visa/MC
            </div>
          </div>
        </div>
      )}

      {/* ── BOOKING SHEET ── */}
      {showBooking && (
        <div className="overlay" onClick={() => setShowBooking(false)}>
          <div className="sheet" onClick={e => e.stopPropagation()}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
              <div className="serif" style={{ fontSize: 20, fontWeight: 700, color: GOLD }}>Book Consultation</div>
              <button onClick={() => setShowBooking(false)} style={{ background: "none", border: "none", color: TEXT_DIM, fontSize: 20, cursor: "pointer" }}>✕</button>
            </div>
            <label>Service Required</label>
            <select><option>Architectural Plans</option><option>Bill of Quantities (BOQ)</option><option>Land Surveying</option><option>Project Management</option></select>
            <label>Plot / Site Size (m²)</label>
            <input placeholder="e.g. 1000" type="number" />
            <label>Estimated Budget (USD)</label>
            <input placeholder="e.g. 50,000" />
            <label>Location of Project</label>
            <input placeholder="Suburb & City" />
            <label>Your Name</label>
            <input placeholder="Full name" />
            <label>WhatsApp Number</label>
            <input placeholder="+263 7X XXX XXXX" />
            <label>Additional Notes</label>
            <textarea rows={3} placeholder="Describe your project briefly..." />
            <div style={{ marginTop: 18 }}>
              <button className="btn-gold" style={{ width: "100%", padding: 14, borderRadius: 8, fontSize: 13 }}>
                ✦ Send Enquiry via WhatsApp
              </button>
              <div className="sans" style={{ fontSize: 11, color: TEXT_DIM, textAlign: "center", marginTop: 8 }}>
                A consultant will contact you within 2 business hours.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* BOTTOM SPACER */}
      <div style={{ height: 32 }} />
    </div>
  );
}
