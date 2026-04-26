import React from "react";

const steps = [
  {
    number: "01",
    title: "Search",
    desc: "Easily find the right tutor or tuition post using our powerful filters and smart matching.",
    accent: "#2563EB",
    accentLight: "#EFF6FF",
    icon: (
      <svg
        width="26"
        height="26"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="11" cy="11" r="8" />
        <path d="m21 21-4.35-4.35" />
      </svg>
    ),
  },
  {
    number: "02",
    title: "Select",
    desc: "Compare tutors or tuitions and pick the one that perfectly fits your learning style and goals.",
    accent: "#0891B2",
    accentLight: "#ECFEFF",
    icon: (
      <svg
        width="26"
        height="26"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
        <path d="m16 11 2 2 4-4" />
      </svg>
    ),
  },
  {
    number: "03",
    title: "Connect",
    desc: "Contact the tutor, schedule a session, and start learning instantly with zero friction.",
    accent: "#7C3AED",
    accentLight: "#F5F3FF",
    icon: (
      <svg
        width="26"
        height="26"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M11 17.5A5.5 5.5 0 0 1 5.5 12H2l3.75-3.75L9.5 12H7a4.5 4.5 0 0 0 4.5 4.5c.69 0 1.34-.16 1.93-.43" />
        <path d="M13 6.5A5.5 5.5 0 0 1 18.5 12H22l-3.75 3.75L14.5 12H17A4.5 4.5 0 0 0 12.5 7.5c-.69 0-1.34.16-1.93.43" />
      </svg>
    ),
  },
];

const HowItWorks = () => {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;1,700&family=DM+Sans:wght@300;400;500&display=swap');

        .hiw-root {
          font-family: 'DM Sans', sans-serif;
          position: relative;
          padding: 100px 24px 112px;
          background: #F8F7F4;
          overflow: hidden;
        }

        .dark .hiw-root { background: #0D0D0F; }

        /* Background texture */
        .hiw-texture {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(0,0,0,0.025) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,0,0,0.025) 1px, transparent 1px);
          background-size: 48px 48px;
          pointer-events: none;
        }

        .dark .hiw-texture {
          background-image:
            linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px);
        }

        /* Section label */
        .hiw-label {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: #2563EB;
          margin-bottom: 20px;
        }

        .hiw-label::before {
          content: '';
          width: 24px;
          height: 1.5px;
          background: #2563EB;
          border-radius: 2px;
        }

        .dark .hiw-label { color: #60A5FA; }
        .dark .hiw-label::before { background: #60A5FA; }

        /* Heading */
        .hiw-title {
          font-family: 'Playfair Display', Georgia, serif;
          font-weight: 700;
          font-size: clamp(2.4rem, 5vw, 3.6rem);
          line-height: 1.1;
          letter-spacing: -0.02em;
          color: #0F172A;
        }

        .dark .hiw-title { color: #F8FAFC; }

        .hiw-title em {
          font-style: italic;
          color: #2563EB;
        }

        .dark .hiw-title em { color: #60A5FA; }

        /* Subtitle */
        .hiw-sub {
          font-size: 16px;
          font-weight: 400;
          color: #64748B;
          line-height: 1.7;
          max-width: 480px;
          margin: 16px auto 0;
        }

        .dark .hiw-sub { color: #94A3B8; }

        /* Connector line (desktop) */
        .hiw-connector {
          position: absolute;
          top: 52px;
          left: calc(50% + 16px);
          right: -50%;
          height: 1px;
          background: repeating-linear-gradient(
            90deg,
            #CBD5E1 0px,
            #CBD5E1 6px,
            transparent 6px,
            transparent 14px
          );
          pointer-events: none;
          z-index: 0;
        }

        .dark .hiw-connector {
          background: repeating-linear-gradient(
            90deg,
            #334155 0px,
            #334155 6px,
            transparent 6px,
            transparent 14px
          );
        }

        /* Step card */
        .hiw-card {
          position: relative;
          background: #FFFFFF;
          border: 1px solid rgba(0,0,0,0.06);
          border-radius: 20px;
          padding: 36px 32px 32px;
          text-align: left;
          transition: transform 0.3s cubic-bezier(.22,1,.36,1), box-shadow 0.3s ease, border-color 0.3s ease;
          cursor: default;
        }

        .dark .hiw-card {
          background: #111117;
          border-color: rgba(255,255,255,0.06);
        }

        .hiw-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 20px 60px -16px rgba(0,0,0,0.15);
        }

        .dark .hiw-card:hover {
          box-shadow: 0 20px 60px -16px rgba(0,0,0,0.6);
        }

        /* Step number watermark */
        .hiw-num-bg {
          font-family: 'Playfair Display', serif;
          font-size: 96px;
          font-weight: 700;
          line-height: 1;
          position: absolute;
          top: -8px;
          right: 20px;
          opacity: 0.04;
          pointer-events: none;
          user-select: none;
          color: #000;
          transition: opacity 0.3s ease;
        }

        .dark .hiw-num-bg { color: #fff; opacity: 0.06; }
        .hiw-card:hover .hiw-num-bg { opacity: 0.07; }

        /* Icon container */
        .hiw-icon-wrap {
          width: 52px;
          height: 52px;
          border-radius: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 24px;
          transition: transform 0.3s ease;
        }

        .hiw-card:hover .hiw-icon-wrap {
          transform: scale(1.08) rotate(-3deg);
        }

        /* Step label pill */
        .hiw-step-pill {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          font-size: 10.5px;
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          padding: 4px 10px;
          border-radius: 100px;
          margin-bottom: 12px;
        }

        /* Card title */
        .hiw-card-title {
          font-family: 'Playfair Display', serif;
          font-size: 22px;
          font-weight: 700;
          color: #0F172A;
          margin-bottom: 10px;
          line-height: 1.2;
        }

        .dark .hiw-card-title { color: #F1F5F9; }

        /* Card desc */
        .hiw-card-desc {
          font-size: 14.5px;
          line-height: 1.7;
          color: #64748B;
          font-weight: 400;
        }

        .dark .hiw-card-desc { color: #94A3B8; }

        /* Arrow at bottom of card */
        .hiw-card-arrow {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 13px;
          font-weight: 500;
          margin-top: 20px;
          opacity: 0;
          transform: translateX(-6px);
          transition: opacity 0.25s ease, transform 0.25s ease;
        }

        .hiw-card:hover .hiw-card-arrow {
          opacity: 1;
          transform: translateX(0);
        }

        /* Bottom CTA strip */
        .hiw-cta-strip {
          margin-top: 64px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          flex-wrap: wrap;
        }

        .hiw-cta-primary {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 13px 28px;
          border-radius: 10px;
          background: #2563EB;
          color: #fff;
          font-size: 14px;
          font-weight: 500;
          letter-spacing: 0.01em;
          transition: all 0.2s ease;
          box-shadow: 0 4px 20px -6px rgba(37,99,235,0.5);
        }

        .hiw-cta-primary:hover {
          background: #1D4ED8;
          transform: translateY(-2px);
          box-shadow: 0 8px 28px -6px rgba(37,99,235,0.55);
        }

        .hiw-cta-secondary {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 13px 24px;
          border-radius: 10px;
          border: 1.5px solid #E2E8F0;
          color: #475569;
          font-size: 14px;
          font-weight: 500;
          transition: all 0.2s ease;
        }

        .dark .hiw-cta-secondary {
          border-color: rgba(255,255,255,0.1);
          color: #94A3B8;
        }

        .hiw-cta-secondary:hover {
          border-color: #CBD5E1;
          background: rgba(0,0,0,0.02);
          transform: translateY(-2px);
        }

        .dark .hiw-cta-secondary:hover {
          background: rgba(255,255,255,0.04);
        }
      `}</style>

      <section className="hiw-root">
        <div className="hiw-texture" />

        <div className="relative z-10 max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="hiw-label">Simple Process</div>
            <h2 className="hiw-title">
              How It <em>Works</em>
            </h2>
            <p className="hiw-sub">
              A simple 3-step process to find the perfect tutor or tuition and
              start learning today.
            </p>
          </div>

          {/* Steps grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {steps.map((step, idx) => (
              <div key={idx} className="hiw-card">
                {/* Big watermark number */}
                <div className="hiw-num-bg">{step.number}</div>

                {/* Icon */}
                <div
                  className="hiw-icon-wrap"
                  style={{ background: step.accentLight, color: step.accent }}
                >
                  {step.icon}
                </div>

                {/* Step pill */}
                <div
                  className="hiw-step-pill"
                  style={{ background: step.accentLight, color: step.accent }}
                >
                  Step {step.number}
                </div>

                {/* Title */}
                <div className="hiw-card-title">{step.title}</div>

                {/* Desc */}
                <p className="hiw-card-desc">{step.desc}</p>

                {/* Hover arrow */}
                <div className="hiw-card-arrow" style={{ color: step.accent }}>
                  Learn more
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </div>

                {/* Bottom accent line */}
                <div
                  style={{
                    position: "absolute",
                    bottom: 0,
                    left: "32px",
                    right: "32px",
                    height: "2px",
                    borderRadius: "2px 2px 0 0",
                    background: step.accent,
                    opacity: 0,
                    transition: "opacity 0.3s ease",
                  }}
                  className="hiw-card-line"
                />
              </div>
            ))}
          </div>

          {/* CTA strip */}
          <div className="hiw-cta-strip">
            <a href="/tutors" className="hiw-cta-primary">
              Find a Tutor
              <svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
            <a href="/be-a-tutor" className="hiw-cta-secondary">
              Become a Tutor
            </a>
          </div>
        </div>
      </section>
    </>
  );
};

export default HowItWorks;
