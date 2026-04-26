import React, { useState, useEffect, useCallback, useRef } from "react";
import { Link } from "react-router";
import findTutorSlide1 from "../../assets/find the perfect tutor for your learning journey.jpg";
import findTutorSlide2 from "../../assets/learn smarter with trusted and skilled tutors.jpg";
import findTutorSlide3 from "../../assets/teach earn and grow your career.jpg";

const slides = [
  {
    title: "Find the Tutor",
    subtitle: "for Your Learning Journey",
    desc: "Connect with verified tutors and manage your tuition experience seamlessly.",
    image: findTutorSlide1,
    primary: { to: "/tuitions", label: "Browse Tuitions" },
    secondary: { to: "/tutors", label: "View Tutors" },
    accent: "#2563EB",
    accentLight: "#DBEAFE",
    number: "01",
  },
  {
    title: "Learn Smarter with",
    subtitle: "Trusted & Skilled Tutors",
    desc: "Personalized learning plans tailored to your goals and schedule.",
    image: findTutorSlide2,
    primary: { to: "/tutors", label: "Find a Tutor" },
    secondary: { to: "/be-a-tutor", label: "Become a Tutor" },
    accent: "#0891B2",
    accentLight: "#CFFAFE",
    number: "02",
  },
  {
    title: "Teach, Earn &",
    subtitle: "Grow Your Career with us",
    desc: "Join as a tutor and start earning by helping students succeed.",
    image: findTutorSlide3,
    primary: { to: "/be-a-tutor", label: "Get Started" },
    secondary: { to: "/dashboard", label: "Dashboard" },
    accent: "#7C3AED",
    accentLight: "#EDE9FE",
    number: "03",
  },
];

const Banner = () => {
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [direction, setDirection] = useState("next");
  const [progress, setProgress] = useState(0);

  const DELAY = 5500;
  const TRANSITION = 600;

  const goTo = useCallback(
    (index, dir = "next") => {
      if (animating) return;
      setAnimating(true);
      setDirection(dir);
      setProgress(0);
      setTimeout(() => {
        setCurrent(index);
        setAnimating(false);
      }, TRANSITION);
    },
    [animating]
  );

  const next = useCallback(() => {
    goTo((current + 1) % slides.length, "next");
  }, [current, goTo]);

  const prev = useCallback(() => {
    goTo((current - 1 + slides.length) % slides.length, "prev");
  }, [current, goTo]);

  // Progress bar — use a ref for start time so we never call setState synchronously in the effect body
  const progressStartRef = useRef(0);
  useEffect(() => {
    progressStartRef.current = Date.now();
    const start = progressStartRef.current;
    const interval = setInterval(() => {
      const elapsed = Date.now() - start;
      setProgress(Math.min((elapsed / DELAY) * 100, 100));
    }, 30);
    return () => clearInterval(interval);
  }, [current]);

  // Auto-advance
  useEffect(() => {
    const timer = setTimeout(next, DELAY);
    return () => clearTimeout(timer);
  }, [current, next]);

  const slide = slides[current];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700&family=DM+Sans:wght@300;400;500&display=swap');

        .banner-root {
          font-family: 'DM Sans', sans-serif;
          position: relative;
          height: 75vh;
          min-height: 520px;
          max-height: 75vh;
          overflow: hidden;
          background: #F8F7F4;
        }

        .dark .banner-root {
          background: #0D0D0F;
        }

        /* Decorative background grid */
        .banner-grid {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(0,0,0,0.035) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,0,0,0.035) 1px, transparent 1px);
          background-size: 40px 40px;
          pointer-events: none;
          z-index: 0;
        }

        .dark .banner-grid {
          background-image:
            linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px);
        }

        /* Accent blob */
        .banner-blob {
          position: absolute;
          width: 480px;
          height: 480px;
          border-radius: 50%;
          filter: blur(90px);
          opacity: 0.18;
          pointer-events: none;
          transition: background 0.8s ease, transform 1.2s cubic-bezier(.22,1,.36,1);
          z-index: 0;
        }

        .banner-blob-1 { bottom: -80px; right: 15%; }
        .banner-blob-2 { top: -100px; left: 5%; opacity: 0.1; }

        .dark .banner-blob { opacity: 0.25; }

        /* Slide counter */
        .slide-counter {
          font-family: 'DM Sans', sans-serif;
          font-size: 10px;
          font-weight: 500;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #9CA3AF;
        }

        /* Tag pill */
        .slide-tag {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          padding: 6px 14px;
          border-radius: 100px;
          border: 1px solid;
          transition: all 0.5s ease;
        }

        .slide-tag::before {
          content: '';
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: currentColor;
          animation: pulse 2s infinite;
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(0.7); }
        }

        /* Main heading */
        .slide-title {
          font-family: 'Playfair Display', Georgia, serif;
          font-weight: 900;
          line-height: 1.07;
          letter-spacing: -0.02em;
        }

        /* Content transitions */
        .content-enter {
          animation: contentIn 0.65s cubic-bezier(.22,1,.36,1) both;
        }

        .content-enter-delay-1 { animation-delay: 0.08s; }
        .content-enter-delay-2 { animation-delay: 0.16s; }
        .content-enter-delay-3 { animation-delay: 0.22s; }
        .content-enter-delay-4 { animation-delay: 0.30s; }

        @keyframes contentIn {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .content-exit {
          animation: contentOut 0.3s ease both;
        }

        @keyframes contentOut {
          from { opacity: 1; transform: translateY(0); }
          to   { opacity: 0; transform: translateY(-20px); }
        }

        /* Image panel */
        .image-panel {
          position: relative;
          overflow: hidden;
          border-radius: 24px;
          box-shadow:
            0 4px 6px -1px rgba(0,0,0,0.1),
            0 20px 60px -10px rgba(0,0,0,0.2);
          transition: transform 0.8s cubic-bezier(.22,1,.36,1);
        }

        .image-panel img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 6s ease;
        }

        .image-panel:hover img {
          transform: scale(1.04);
        }

        /* Image overlay gradient */
        .image-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, transparent 60%, rgba(0,0,0,0.3));
          pointer-events: none;
        }

        /* Floating stat card */
        .stat-card {
          position: absolute;
          background: rgba(255,255,255,0.92);
          backdrop-filter: blur(16px);
          border-radius: 16px;
          padding: 14px 18px;
          box-shadow: 0 8px 32px rgba(0,0,0,0.12);
          border: 1px solid rgba(255,255,255,0.6);
          transition: transform 0.5s cubic-bezier(.22,1,.36,1);
        }

        .dark .stat-card {
          background: rgba(20,20,25,0.85);
          border-color: rgba(255,255,255,0.08);
        }

        .stat-card:hover { transform: translateY(-4px) scale(1.02); }

        .stat-card-number {
          font-family: 'Playfair Display', serif;
          font-size: 24px;
          font-weight: 900;
          line-height: 1;
        }

        .stat-card-label {
          font-size: 11px;
          font-weight: 500;
          color: #6B7280;
          margin-top: 2px;
          letter-spacing: 0.05em;
        }

        /* CTA Buttons */
        .btn-primary {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 14px 28px;
          border-radius: 12px;
          font-weight: 500;
          font-size: 15px;
          color: #fff;
          transition: all 0.25s ease;
          letter-spacing: 0.01em;
          box-shadow: 0 4px 20px -4px currentColor;
        }

        .btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 28px -4px currentColor;
        }

        .btn-primary svg {
          transition: transform 0.25s ease;
        }

        .btn-primary:hover svg {
          transform: translateX(4px);
        }

        .btn-secondary {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 14px 24px;
          border-radius: 12px;
          font-weight: 500;
          font-size: 15px;
          background: transparent;
          border: 1.5px solid #E5E7EB;
          color: #374151;
          transition: all 0.25s ease;
        }

        .dark .btn-secondary {
          border-color: rgba(255,255,255,0.12);
          color: #D1D5DB;
        }

        .btn-secondary:hover {
          background: rgba(0,0,0,0.04);
          transform: translateY(-2px);
        }

        .dark .btn-secondary:hover {
          background: rgba(255,255,255,0.06);
        }

        /* Progress bar */
        .progress-bar {
          height: 2px;
          border-radius: 2px;
          background: #E5E7EB;
          overflow: hidden;
          position: relative;
        }

        .dark .progress-bar { background: rgba(255,255,255,0.1); }

        .progress-fill {
          height: 100%;
          border-radius: 2px;
          transition: width 0.03s linear;
        }

        /* Nav dots */
        .dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #D1D5DB;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .dark .dot { background: rgba(255,255,255,0.2); }

        .dot.active {
          width: 28px;
          border-radius: 4px;
        }

        /* Arrow buttons */
        .arrow-btn {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(255,255,255,0.9);
          border: 1px solid #E5E7EB;
          cursor: pointer;
          transition: all 0.2s ease;
          backdrop-filter: blur(8px);
        }

        .dark .arrow-btn {
          background: rgba(30,30,35,0.9);
          border-color: rgba(255,255,255,0.1);
        }

        .arrow-btn:hover {
          transform: scale(1.08);
          box-shadow: 0 4px 16px rgba(0,0,0,0.12);
        }

        /* Scroll indicator */
        .scroll-indicator {
          position: absolute;
          bottom: 28px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 6px;
          z-index: 10;
          animation: fadeInUp 1s 1.5s both;
        }

        @keyframes fadeInUp {
          from { opacity: 0; transform: translateX(-50%) translateY(16px); }
          to   { opacity: 1; transform: translateX(-50%) translateY(0); }
        }

        .scroll-line {
          width: 1px;
          height: 36px;
          background: linear-gradient(to bottom, transparent, #9CA3AF);
          animation: scrollLine 1.8s ease infinite;
        }

        @keyframes scrollLine {
          0%   { transform: scaleY(0); transform-origin: top; opacity: 1; }
          50%  { transform: scaleY(1); transform-origin: top; opacity: 1; }
          100% { transform: scaleY(1); transform-origin: bottom; opacity: 0; }
        }

        /* Large decorative number */
        .slide-number-bg {
          font-family: 'Playfair Display', serif;
          font-size: clamp(80px, 14vw, 160px);
          font-weight: 900;
          line-height: 1;
          position: absolute;
          right: -12px;
          bottom: -20px;
          opacity: 0.04;
          pointer-events: none;
          user-select: none;
          color: #000;
          transition: color 0.8s ease;
        }

        .dark .slide-number-bg { opacity: 0.06; color: #fff; }

        /* Divider line */
        .divider {
          width: 48px;
          height: 3px;
          border-radius: 3px;
          transition: background 0.5s ease;
        }

        @media (max-width: 768px) {
          .banner-root { height: 75vh; max-height: 75vh; min-height: 480px; padding-bottom: 60px; }
          .image-panel { height: 200px; }
        }
      `}</style>

      <section className="banner-root">
        {/* Grid texture */}
        <div className="banner-grid" />

        {/* Accent blobs */}
        <div
          className="banner-blob banner-blob-1"
          style={{ background: slide.accent }}
        />
        <div
          className="banner-blob banner-blob-2"
          style={{ background: slide.accent }}
        />

        {/* Decorative large number */}
        <div className="slide-number-bg">{slide.number}</div>

        {/* Main content */}
        <div className="relative z-10 h-full flex flex-col justify-center max-w-7xl mx-auto px-6 md:px-4 pt-8 pb-24">
          <div className="grid md:grid-cols-2 gap-10 lg:gap-16 items-center h-full">

            {/* LEFT: Text */}
            <div key={`text-${current}`} className="flex flex-col justify-center">

              {/* Heading */}
              <h1
                className="slide-title content-enter content-enter-delay-1 text-gray-900 dark:text-white"
                style={{ fontSize: "clamp(2.2rem, 4.5vw, 3.8rem)" }}
              >
                {slide.title}
                <br />
                <span
                  className="italic"
                  style={{ WebkitTextStrokeWidth: "1px", WebkitTextStrokeColor: slide.accent, color: "transparent" }}
                >
                  {slide.subtitle}
                </span>
              </h1>

              {/* Description */}
              <p className="content-enter content-enter-delay-2 mt-5 text-base md:text-lg text-gray-500 dark:text-gray-400 max-w-md leading-relaxed">
                {slide.desc}
              </p>

              {/* CTAs */}
              <div className="content-enter content-enter-delay-3 mt-8 flex flex-wrap gap-3">
                <Link
                  to={slide.primary.to}
                  className="btn-primary"
                  style={{ background: slide.accent }}
                >
                  {slide.primary.label}
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </Link>

                <Link to={slide.secondary.to} className="btn-secondary">
                  {slide.secondary.label}
                </Link>
              </div>

              {/* Bottom controls */}
              <div className="content-enter content-enter-delay-4 mt-10 flex items-center gap-6">
                {/* Arrows */}
                <div className="flex gap-2">
                  <button onClick={prev} className="arrow-btn" aria-label="Previous">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M19 12H5M12 19l-7-7 7-7"/>
                    </svg>
                  </button>
                  <button onClick={next} className="arrow-btn" aria-label="Next">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                  </button>
                </div>

                {/* Progress dots */}
                <div className="flex items-center gap-2">
                  {slides.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => goTo(i, i > current ? "next" : "prev")}
                      className={`dot ${i === current ? "active" : ""}`}
                      style={i === current ? { background: slide.accent } : {}}
                      aria-label={`Go to slide ${i + 1}`}
                    />
                  ))}
                </div>

                {/* Slide counter */}
                <div className="slide-counter ml-auto hidden sm:block">
                  {String(current + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
                </div>
              </div>

              {/* Progress bar */}
              <div className="progress-bar mt-3 w-full max-w-xs">
                <div
                  className="progress-fill"
                  style={{ width: `${progress}%`, background: slide.accent }}
                />
              </div>
            </div>

            {/* RIGHT: Image */}
            <div
              key={`img-${current}`}
              className="hidden md:block"
              style={{ animation: "contentIn 0.7s 0.1s cubic-bezier(.22,1,.36,1) both" }}
            >
              <div className="relative">
                {/* Main image */}
                <div className="image-panel" style={{ height: "clamp(260px, 42vh, 380px)" }}>
                  <img src={slide.image} alt={slide.title} loading="lazy" />
                  <div className="image-overlay" />
                </div>

                {/* Floating stat cards */}
                <div className="stat-card" style={{ top: "20px", left: "-28px" }}>
                  <div className="stat-card-number" style={{ color: slide.accent }}>12K+</div>
                  <div className="stat-card-label">Verified Tutors</div>
                </div>

                <div className="stat-card" style={{ bottom: "24px", right: "-20px" }}>
                  <div className="stat-card-number" style={{ color: slide.accent }}>98%</div>
                  <div className="stat-card-label">Satisfaction Rate</div>
                </div>

                {/* Decorative ring */}
                <div
                  style={{
                    position: "absolute",
                    bottom: "-20px",
                    left: "-20px",
                    width: "100px",
                    height: "100px",
                    borderRadius: "50%",
                    border: `2px solid ${slide.accentLight}`,
                    opacity: 0.6,
                    pointerEvents: "none",
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    bottom: "-8px",
                    left: "-8px",
                    width: "76px",
                    height: "76px",
                    borderRadius: "50%",
                    border: `2px solid ${slide.accent}`,
                    opacity: 0.25,
                    pointerEvents: "none",
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="scroll-indicator">
          <span
            className="slide-counter"
            style={{ color: "#9CA3AF", fontSize: "9px" }}
          >
            SCROLL
          </span>
          <div className="scroll-line" />
        </div>
      </section>
    </>
  );
};

export default Banner;