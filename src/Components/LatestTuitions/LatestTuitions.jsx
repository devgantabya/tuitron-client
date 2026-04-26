import { useEffect, useState } from "react";
import { Link } from "react-router";
import { motion } from "framer-motion";
import TuitionCard from "../TuitionCard/TuitionCard";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Card from "../UI/Card";

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

const SkeletonCard = () => (
  <div
    style={{
      background: "var(--sk-bg)",
      borderRadius: "16px",
      border: "1px solid var(--sk-border)",
      padding: "28px",
      display: "flex",
      flexDirection: "column",
      gap: "12px",
    }}
  >
    {[80, 55, 100, 40].map((w, i) => (
      <div
        key={i}
        className="sk-line"
        style={{ width: `${w}%`, height: i === 0 ? "18px" : "13px" }}
      />
    ))}
    <div style={{ marginTop: "8px", display: "flex", gap: "8px" }}>
      <div
        className="sk-line"
        style={{
          width: "36px",
          height: "36px",
          borderRadius: "50%",
          flexShrink: 0,
        }}
      />
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          gap: "6px",
          paddingTop: "4px",
        }}
      >
        <div className="sk-line" style={{ width: "60%", height: "12px" }} />
        <div className="sk-line" style={{ width: "40%", height: "12px" }} />
      </div>
    </div>
    <div
      className="sk-line"
      style={{
        width: "100%",
        height: "36px",
        borderRadius: "8px",
        marginTop: "4px",
      }}
    />
  </div>
);

const LatestTuitions = () => {
  const [tuitions, setTuitions] = useState([]);
  const [loading, setLoading] = useState(true);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    let isMounted = true;
    const fetch = async () => {
      try {
        const { data } = await axiosSecure.get("/latest-tuitions");
        if (isMounted) setTuitions(data || []);
      } catch (e) {
        console.error("Failed to fetch latest tuitions:", e);
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    fetch();
    return () => {
      isMounted = false;
    };
  }, [axiosSecure]);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;1,700&family=DM+Sans:wght@300;400;500&display=swap');

        .lt-root {
          font-family: 'DM Sans', sans-serif;
          position: relative;
          background: #F8F7F4;
          overflow: hidden;
        }

        .dark .lt-root { background: #0D0D0F; }

        .lt-texture {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(0,0,0,0.025) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,0,0,0.025) 1px, transparent 1px);
          background-size: 48px 48px;
          pointer-events: none;
        }

        .dark .lt-texture {
          background-image:
            linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px);
        }

        /* Eyebrow */
        .lt-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: #2563EB;
          margin-bottom: 14px;
        }

        .lt-eyebrow::before {
          content: '';
          width: 24px;
          height: 1.5px;
          background: #2563EB;
          border-radius: 2px;
        }

        .dark .lt-eyebrow { color: #60A5FA; }
        .dark .lt-eyebrow::before { background: #60A5FA; }

        /* Heading */
        .lt-title {
          font-family: 'Playfair Display', Georgia, serif;
          font-size: clamp(2rem, 4vw, 2.8rem);
          font-weight: 700;
          line-height: 1.1;
          letter-spacing: -0.02em;
          color: #0F172A;
        }

        .dark .lt-title { color: #F8FAFC; }

        .lt-title em {
          font-style: italic;
          color: #2563EB;
        }

        .dark .lt-title em { color: #60A5FA; }

        /* See all link */
        .lt-see-all {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          font-size: 13.5px;
          font-weight: 500;
          color: #2563EB;
          padding: 9px 18px;
          border-radius: 8px;
          border: 1.5px solid #BFDBFE;
          background: #EFF6FF;
          transition: all 0.2s ease;
          white-space: nowrap;
        }

        .dark .lt-see-all {
          color: #60A5FA;
          border-color: rgba(96,165,250,0.2);
          background: rgba(96,165,250,0.08);
        }

        .lt-see-all:hover {
          background: #DBEAFE;
          border-color: #93C5FD;
          transform: translateX(2px);
        }

        .dark .lt-see-all:hover {
          background: rgba(96,165,250,0.14);
        }

        .lt-see-all svg {
          transition: transform 0.2s ease;
        }

        .lt-see-all:hover svg {
          transform: translateX(3px);
        }

        /* Skeleton */
        :root {
          --sk-bg: #EEECEA;
          --sk-line: #E0DDD8;
          --sk-border: rgba(0,0,0,0.05);
        }

        .dark {
          --sk-bg: #18181F;
          --sk-line: #242430;
          --sk-border: rgba(255,255,255,0.05);
        }

        .sk-line {
          border-radius: 6px;
          background: var(--sk-line);
          background-image: linear-gradient(
            90deg,
            var(--sk-line) 0%,
            color-mix(in srgb, var(--sk-line), white 15%) 50%,
            var(--sk-line) 100%
          );
          background-size: 200% 100%;
          animation: sk-shimmer 1.6s ease infinite;
        }

        @keyframes sk-shimmer {
          from { background-position: 200% 0; }
          to   { background-position: -200% 0; }
        }

        /* Empty state */
        .lt-empty {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 72px 24px;
          gap: 14px;
          color: #94A3B8;
        }

        .dark .lt-empty { color: #475569; }

        .lt-empty-icon {
          width: 56px;
          height: 56px;
          border-radius: 16px;
          background: #F1F5F9;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #CBD5E1;
        }

        .dark .lt-empty-icon {
          background: #1E293B;
          color: #334155;
        }

        .lt-empty-title {
          font-family: 'Playfair Display', serif;
          font-size: 18px;
          font-weight: 700;
          color: #64748B;
        }

        .dark .lt-empty-title { color: #475569; }

        .lt-empty-desc {
          font-size: 14px;
          color: #94A3B8;
        }

        /* Count badge */
        .lt-count-badge {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          font-size: 11px;
          font-weight: 600;
          padding: 3px 9px;
          border-radius: 100px;
          background: #EFF6FF;
          color: #2563EB;
          border: 1px solid #BFDBFE;
          letter-spacing: 0.02em;
        }

        .dark .lt-count-badge {
          background: rgba(96,165,250,0.08);
          color: #60A5FA;
          border-color: rgba(96,165,250,0.2);
        }
      `}</style>

      <section className="lt-root py-20 md:py-24 px-4">
        <div className="lt-texture" />

        <div className="relative z-10 max-w-7xl mx-auto">
          {/* Header row */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
            <div>
              <div className="lt-eyebrow">Fresh Listings</div>
              <h2 className="lt-title">
                Latest <em>Tuitions</em>
              </h2>
            </div>

            <div className="flex items-center gap-3 flex-shrink-0">
              {!loading && tuitions.length > 0 && (
                <span className="lt-count-badge">{tuitions.length} new</span>
              )}
              <Link to="/tuitions" className="lt-see-all">
                See All
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>

          {/* Content */}
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {Array.from({ length: 4 }).map((_, i) => (
                <SkeletonCard key={i} />
              ))}
            </div>
          ) : tuitions.length === 0 ? (
            <div className="lt-empty">
              <div className="lt-empty-icon">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                  <line x1="16" y1="13" x2="8" y2="13" />
                  <line x1="16" y1="17" x2="8" y2="17" />
                  <polyline points="10 9 9 9 8 9" />
                </svg>
              </div>
              <div className="lt-empty-title">No tuitions yet</div>
              <p className="lt-empty-desc">
                New listings will appear here as they're posted.
              </p>
              <Link
                to="/tuitions"
                className="lt-see-all"
                style={{ marginTop: "4px" }}
              >
                Browse all tuitions
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          ) : (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
            >
              {tuitions.slice(0, 4).map((tuition) => (
                <motion.div key={tuition._id} variants={itemVariants}>
                  <Card padding={false} className="overflow-hidden h-full">
                    <TuitionCard tuition={tuition} />
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </section>
    </>
  );
};

export default LatestTuitions;
