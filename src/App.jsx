import { useState, useEffect } from "react";

const workouts = [
  {
    id: 1,
    category: "HIIT",
    title: "Full Body Burn",
    duration: 20,
    level: "Intermediate",
    calories: 280,
    equipment: "None",
    description: "High-intensity intervals targeting every major muscle group. Maximum output, minimum time.",
    exercises: ["Burpees × 10", "Jump Squats × 15", "Mountain Climbers × 20", "Push-Ups × 12"],
    color: "#C8F135",
  },
  {
    id: 2,
    category: "Strength",
    title: "Power Core",
    duration: 30,
    level: "Advanced",
    calories: 320,
    equipment: "Dumbbells",
    description: "Compound lifts and core stabilization to build functional strength in under 30 minutes.",
    exercises: ["Deadlift × 8", "Plank Row × 10", "Goblet Squat × 12", "Hollow Hold 30s"],
    color: "#A78BFA",
  },
  {
    id: 3,
    category: "Mobility",
    title: "Morning Reset",
    duration: 15,
    level: "Beginner",
    calories: 90,
    equipment: "Mat",
    description: "Wake up your joints and loosen tension. The 15-minute ritual that changes your whole day.",
    exercises: ["Cat-Cow × 10", "Hip 90/90 60s", "Thread the Needle × 8", "World's Greatest Stretch"],
    color: "#34D399",
  },
  {
    id: 4,
    category: "HIIT",
    title: "Cardio Spike",
    duration: 25,
    level: "Intermediate",
    calories: 340,
    equipment: "None",
    description: "Tabata-style intervals that spike your heart rate and keep your metabolism elevated for hours.",
    exercises: ["High Knees 40s", "Rest 20s", "Skaters × 12", "Sprint in Place 40s"],
    color: "#C8F135",
  },
  {
    id: 5,
    category: "Strength",
    title: "Upper Cut",
    duration: 35,
    level: "Intermediate",
    calories: 260,
    equipment: "Resistance Bands",
    description: "Sculpt your chest, back, and shoulders with resistance band supersets. No gym required.",
    exercises: ["Band Pull-Apart × 15", "Push-Up Ladder", "Overhead Press × 12", "Face Pull × 15"],
    color: "#A78BFA",
  },
  {
    id: 6,
    category: "Mobility",
    title: "Desk Decompressor",
    duration: 10,
    level: "Beginner",
    calories: 50,
    equipment: "Chair",
    description: "Undo hours of sitting in 10 focused minutes. For your spine, hips, and sanity.",
    exercises: ["Seated Twist × 8", "Neck Rolls 30s", "Hip Flexor Stretch 45s", "Shoulder Cross"],
    color: "#34D399",
  },
];

const tips = [
  { icon: "⚡", title: "Compound First", body: "Lead with multi-joint movements when energy is highest. Save isolation work for the end." },
  { icon: "⏱", title: "Rest Strategically", body: "30–60s rest for hypertrophy, 2–3min for max strength. Respect the science." },
  { icon: "📈", title: "Progressive Overload", body: "Add 2–5% resistance or one rep per week. Consistency over intensity wins long-term." },
  { icon: "🔄", title: "Superset to Save Time", body: "Pair opposing muscle groups — chest/back, biceps/triceps — to cut workout time by 30%." },
];

const categories = ["All", "HIIT", "Strength", "Mobility"];
const levelColors = { Beginner: "#34D399", Intermediate: "#FBBF24", Advanced: "#F87171" };

const themes = {
  dark: {
    "--bg":          "#0F1117",
    "--bg-card":     "#16181F",
    "--bg-nav":      "rgba(15,17,23,0.85)",
    "--border":      "#2A2D38",
    "--border-hover":"#3A3D48",
    "--border-div":  "#1E2028",
    "--text":        "#F0EDE8",
    "--text-muted":  "#9CA3AF",
    "--text-dim":    "#6B7280",
    "--text-meta":   "#D1D5DB",
    "--filter-text": "#9CA3AF",
    "--footer-copy": "#4B5563",
  },
  light: {
    "--bg":          "#F5F5F0",
    "--bg-card":     "#FFFFFF",
    "--bg-nav":      "rgba(245,245,240,0.90)",
    "--border":      "#E0DED8",
    "--border-hover":"#C8C6C0",
    "--border-div":  "#E8E6E0",
    "--text":        "#0F1117",
    "--text-muted":  "#5A5A6A",
    "--text-dim":    "#7A7A8A",
    "--text-meta":   "#2A2A3A",
    "--filter-text": "#5A5A6A",
    "--footer-copy": "#9CA3AF",
  },
};

export default function App() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [expandedId, setExpandedId]     = useState(null);
  const [isDark, setIsDark]             = useState(true);

  const theme = isDark ? themes.dark : themes.light;
  const filtered = activeFilter === "All" ? workouts : workouts.filter((w) => w.category === activeFilter);

  // Apply CSS vars to :root so every element can use them
  useEffect(() => {
    const root = document.documentElement;
    Object.entries(theme).forEach(([k, v]) => root.style.setProperty(k, v));
    document.body.style.background = theme["--bg"];
    document.body.style.transition = "background 0.3s";
  }, [isDark]);

  return (
    <div style={{ background: "var(--bg)", minHeight: "100vh", fontFamily: "'Inter', sans-serif", color: "var(--text)", transition: "background 0.3s, color 0.3s" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700;800&family=Inter:wght@300;400;500&display=swap');

        * { box-sizing: border-box; margin: 0; padding: 0; }

        .hero-headline {
          font-family: 'Space Grotesk', sans-serif;
          font-size: clamp(3rem, 9vw, 7.5rem);
          font-weight: 800;
          line-height: 0.92;
          letter-spacing: -0.03em;
          text-transform: uppercase;
        }

        .lime { color: #C8F135; }

        .filter-btn {
          background: transparent;
          border: 1px solid var(--border);
          color: var(--filter-text);
          font-family: 'Space Grotesk', sans-serif;
          font-size: 0.8rem;
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          padding: 0.5rem 1.25rem;
          border-radius: 999px;
          cursor: pointer;
          transition: all 0.2s;
        }
        .filter-btn:hover { border-color: #C8F135; color: #C8F135; }
        .filter-btn.active { background: #C8F135; border-color: #C8F135; color: #0F1117; }

        .card {
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: 16px;
          padding: 1.75rem;
          cursor: pointer;
          transition: border-color 0.2s, transform 0.2s, background 0.3s;
          position: relative;
          overflow: hidden;
        }
        .card:hover { border-color: var(--border-hover); transform: translateY(-2px); }
        .card.open { border-color: var(--accent); }

        .duration-badge {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 3.5rem;
          font-weight: 800;
          line-height: 1;
          letter-spacing: -0.04em;
          color: var(--accent);
          opacity: 0.12;
          position: absolute;
          top: 1.25rem;
          right: 1.5rem;
          pointer-events: none;
          user-select: none;
        }

        .category-tag {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 0.7rem;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          padding: 0.25rem 0.7rem;
          border-radius: 999px;
          background: var(--accent);
          color: #0F1117;
          display: inline-block;
          margin-bottom: 0.75rem;
        }

        .card-title {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 1.4rem;
          font-weight: 700;
          letter-spacing: -0.02em;
          margin-bottom: 0.5rem;
          color: var(--text);
        }

        .card-desc {
          font-size: 0.875rem;
          color: var(--text-muted);
          line-height: 1.6;
          margin-bottom: 1rem;
        }

        .meta-row {
          display: flex;
          gap: 1.25rem;
          align-items: center;
        }

        .meta-item {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 0.75rem;
          font-weight: 500;
          color: var(--text-dim);
          display: flex;
          align-items: center;
          gap: 0.3rem;
        }

        .meta-item span { color: var(--text-meta); }

        .exercise-list {
          margin-top: 1.25rem;
          padding-top: 1.25rem;
          border-top: 1px solid var(--border);
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          animation: fadeIn 0.2s ease;
        }

        .exercise-item {
          font-size: 0.82rem;
          color: var(--text-meta);
          display: flex;
          align-items: center;
          gap: 0.6rem;
        }

        .exercise-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--accent);
          flex-shrink: 0;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(4px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .tip-card {
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: 12px;
          padding: 1.5rem;
          transition: background 0.3s, border-color 0.3s;
        }

        .tip-icon { font-size: 1.5rem; margin-bottom: 0.75rem; }

        .tip-title {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 1rem;
          font-weight: 700;
          margin-bottom: 0.4rem;
          color: var(--text);
        }

        .tip-body {
          font-size: 0.82rem;
          color: var(--text-muted);
          line-height: 1.65;
        }

        .nav {
          position: sticky;
          top: 0;
          z-index: 100;
          background: var(--bg-nav);
          backdrop-filter: blur(12px);
          border-bottom: 1px solid var(--border-div);
          padding: 0 2rem;
          height: 60px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          transition: background 0.3s, border-color 0.3s;
        }

        .nav-logo {
          font-family: 'Space Grotesk', sans-serif;
          font-weight: 800;
          font-size: 1.1rem;
          letter-spacing: -0.02em;
          color: var(--text);
        }

        .nav-right {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        /* Theme toggle pill */
        .theme-toggle {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: 999px;
          padding: 0.3rem 0.75rem;
          cursor: pointer;
          transition: all 0.2s;
        }
        .theme-toggle:hover { border-color: #C8F135; }

        .toggle-track {
          width: 32px;
          height: 18px;
          border-radius: 999px;
          background: var(--border);
          position: relative;
          transition: background 0.25s;
          flex-shrink: 0;
        }
        .toggle-track.on { background: #C8F135; }

        .toggle-thumb {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: #0F1117;
          position: absolute;
          top: 3px;
          left: 3px;
          transition: transform 0.25s;
        }
        .toggle-track.on .toggle-thumb { transform: translateX(14px); }

        .toggle-label {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 0.72rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--text-muted);
          user-select: none;
        }

        .nav-cta {
          background: #C8F135;
          color: #0F1117;
          border: none;
          font-family: 'Space Grotesk', sans-serif;
          font-size: 0.8rem;
          font-weight: 700;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          padding: 0.5rem 1.25rem;
          border-radius: 999px;
          cursor: pointer;
          transition: opacity 0.15s;
        }
        .nav-cta:hover { opacity: 0.85; }

        .section-label {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 0.72rem;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: #C8F135;
          margin-bottom: 0.75rem;
        }

        .section-heading {
          font-family: 'Space Grotesk', sans-serif;
          font-size: clamp(1.75rem, 4vw, 2.5rem);
          font-weight: 800;
          letter-spacing: -0.03em;
          line-height: 1.1;
          color: var(--text);
        }

        .grid-3 {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 1rem;
        }

        .grid-4 {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
          gap: 1rem;
        }

        .level-dot {
          display: inline-block;
          width: 7px;
          height: 7px;
          border-radius: 50%;
          margin-right: 4px;
        }

        .cta-strip {
          background: #C8F135;
          border-radius: 20px;
          padding: 3.5rem 2.5rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 2rem;
          flex-wrap: wrap;
        }

        .cta-heading {
          font-family: 'Space Grotesk', sans-serif;
          font-size: clamp(1.5rem, 3.5vw, 2.2rem);
          font-weight: 800;
          color: #0F1117;
          letter-spacing: -0.03em;
          line-height: 1.1;
          max-width: 420px;
        }

        .cta-btn-dark {
          background: #0F1117;
          color: #C8F135;
          border: none;
          font-family: 'Space Grotesk', sans-serif;
          font-size: 0.88rem;
          font-weight: 700;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          padding: 0.85rem 2rem;
          border-radius: 999px;
          cursor: pointer;
          white-space: nowrap;
          transition: opacity 0.15s;
          flex-shrink: 0;
        }
        .cta-btn-dark:hover { opacity: 0.85; }

        footer {
          border-top: 1px solid var(--border-div);
          padding: 2rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
          flex-wrap: wrap;
          transition: border-color 0.3s;
        }

        .footer-copy {
          font-size: 0.78rem;
          color: var(--footer-copy);
        }

        .stat-block { text-align: center; }

        .stat-num {
          font-family: 'Space Grotesk', sans-serif;
          font-size: clamp(2.5rem, 6vw, 4rem);
          font-weight: 800;
          color: #C8F135;
          letter-spacing: -0.04em;
          line-height: 1;
        }

        .stat-label {
          font-size: 0.8rem;
          color: var(--text-dim);
          margin-top: 0.25rem;
          font-family: 'Space Grotesk', sans-serif;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.08em;
        }

        @media (max-width: 600px) {
          .hero-inner  { padding: 3.5rem 1.25rem 2.5rem; }
          .section-inner { padding: 2.5rem 1.25rem; }
          .nav { padding: 0 1.25rem; }
          .toggle-label { display: none; }
        }
      `}</style>

      {/* NAV */}
      <nav className="nav">
        <div className="nav-logo">FORM<span className="lime">.</span></div>
        <div className="nav-right">
          {/* Dark / Light toggle */}
          <button className="theme-toggle" onClick={() => setIsDark(!isDark)} aria-label="Toggle theme">
            <span style={{ fontSize: "0.9rem" }}>{isDark ? "🌙" : "☀️"}</span>
            <div className={`toggle-track${isDark ? "" : " on"}`}>
              <div className="toggle-thumb" />
            </div>
            <span className="toggle-label">{isDark ? "Dark" : "Light"}</span>
          </button>
          <button className="nav-cta">Start Training</button>
        </div>
      </nav>

      {/* HERO */}
      <section>
        <div className="hero-inner" style={{ maxWidth: 1100, margin: "0 auto", padding: "5rem 2rem 3.5rem" }}>
          <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "0.78rem", fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: "#C8F135", marginBottom: "1.25rem" }}>
            Efficient by Design
          </p>
          <h1 className="hero-headline">
            Less time.<br />
            <span className="lime">More</span> output.
          </h1>
          <p style={{ maxWidth: 500, marginTop: "2rem", fontSize: "1rem", color: "var(--text-muted)", lineHeight: 1.7 }}>
            Science-backed routines built for people who treat their schedule like a resource.
            Every minute earns its place.
          </p>
          <div style={{ display: "flex", gap: "3rem", marginTop: "3rem", flexWrap: "wrap" }}>
            {[["6", "Routines"], ["35", "Min Max"], ["0", "Excuses"]].map(([n, l]) => (
              <div className="stat-block" key={l}>
                <div className="stat-num">{n}</div>
                <div className="stat-label">{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DIVIDER */}
      <div style={{ height: "1px", background: "var(--border-div)", maxWidth: 1100, margin: "0 auto" }} />

      {/* WORKOUTS */}
      <section>
        <div className="section-inner" style={{ maxWidth: 1100, margin: "0 auto", padding: "4rem 2rem" }}>
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: "2.5rem", gap: "1.5rem", flexWrap: "wrap" }}>
            <div>
              <p className="section-label">Routines</p>
              <h2 className="section-heading">Pick your weapon.</h2>
            </div>
            <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
              {categories.map((c) => (
                <button
                  key={c}
                  className={`filter-btn${activeFilter === c ? " active" : ""}`}
                  onClick={() => setActiveFilter(c)}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          <div className="grid-3">
            {filtered.map((w) => (
              <div
                key={w.id}
                className={`card${expandedId === w.id ? " open" : ""}`}
                style={{ "--accent": w.color }}
                onClick={() => setExpandedId(expandedId === w.id ? null : w.id)}
              >
                <div className="duration-badge">{w.duration}</div>
                <div className="category-tag">{w.category}</div>
                <h3 className="card-title">{w.title}</h3>
                <p className="card-desc">{w.description}</p>
                <div className="meta-row">
                  <div className="meta-item">⏱ <span>{w.duration} min</span></div>
                  <div className="meta-item">🔥 <span>{w.calories} kcal</span></div>
                  <div className="meta-item">
                    <span className="level-dot" style={{ background: levelColors[w.level] }} />
                    <span>{w.level}</span>
                  </div>
                </div>
                {expandedId === w.id && (
                  <div className="exercise-list">
                    <p style={{ fontSize: "0.72rem", fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: w.color, marginBottom: "0.25rem" }}>
                      Exercises
                    </p>
                    {w.exercises.map((e) => (
                      <div key={e} className="exercise-item">
                        <div className="exercise-dot" />
                        {e}
                      </div>
                    ))}
                    <p style={{ fontSize: "0.75rem", color: "var(--text-dim)", marginTop: "0.5rem" }}>
                      Equipment: {w.equipment}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DIVIDER */}
      <div style={{ height: "1px", background: "var(--border-div)", maxWidth: 1100, margin: "0 auto" }} />

      {/* TIPS */}
      <section>
        <div className="section-inner" style={{ maxWidth: 1100, margin: "0 auto", padding: "4rem 2rem" }}>
          <p className="section-label">Principles</p>
          <h2 className="section-heading" style={{ marginBottom: "2rem" }}>Train smarter.</h2>
          <div className="grid-4">
            {tips.map((t) => (
              <div key={t.title} className="tip-card">
                <div className="tip-icon">{t.icon}</div>
                <div className="tip-title">{t.title}</div>
                <div className="tip-body">{t.body}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA STRIP */}
      <section style={{ maxWidth: 1100, margin: "0 auto", padding: "0 2rem 5rem" }}>
        <div className="cta-strip">
          <p className="cta-heading">Ready to stop wasting reps?</p>
          <button className="cta-btn-dark">Build My Plan →</button>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div className="nav-logo">FORM<span className="lime">.</span></div>
        <p className="footer-copy">© 2026 Form. Built for efficiency.</p>
      </footer>
    </div>
  );
}
