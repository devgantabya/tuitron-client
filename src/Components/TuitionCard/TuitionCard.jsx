import { Link } from "react-router";

const IconLocation = () => (
  <svg
    width="13"
    height="13"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

const IconBook = () => (
  <svg
    width="13"
    height="13"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
  </svg>
);

const IconClock = () => (
  <svg
    width="13"
    height="13"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

const IconMoney = () => (
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
    <line x1="12" y1="1" x2="12" y2="23" />
    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
  </svg>
);

export default function TuitionCard({ tuition }) {
  const { _id, subject, course, days, time, salary, contact } = tuition;
  const schedule = [days, time].filter(Boolean).join(" · ");

  return (
    <>
      <style>{`
        .tc-root {
          font-family: 'DM Sans', 'Segoe UI', sans-serif;
          display: flex;
          flex-direction: column;
          height: 100%;
          overflow: hidden;
        }

        /* Top color bar */
        .tc-bar {
          height: 3px;
          width: 100%;
          background: linear-gradient(90deg, #2563EB, #60A5FA);
          border-radius: 16px 16px 0 0;
          flex-shrink: 0;
        }

        /* Body */
        .tc-body {
          flex: 1;
          padding: 20px 20px 16px;
          display: flex;
          flex-direction: column;
          gap: 0;
        }

        /* Subject */
        .tc-subject {
          font-size: 15.5px;
          font-weight: 700;
          color: hsl(var(--foreground));
          line-height: 1.3;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          margin-bottom: 12px;
          letter-spacing: -0.01em;
        }

        /* Meta rows */
        .tc-meta {
          display: flex;
          flex-direction: column;
          gap: 8px;
          flex: 1;
        }

        .tc-row {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 13px;
          color: hsl(var(--muted-foreground));
          font-weight: 400;
        }

        .tc-row-icon {
          width: 26px;
          height: 26px;
          border-radius: 7px;
          background: hsl(var(--muted));
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          color: hsl(var(--primary));
        }

        .tc-row-text {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        /* Schedule chip */
        .tc-schedule {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 5px 10px 5px 6px;
          border-radius: 100px;
          background: hsl(var(--primary) / 0.1);
          color: hsl(var(--primary));
          font-size: 12px;
          font-weight: 500;
          border: 1px solid hsl(var(--primary) / 0.2);
          width: fit-content;
          margin-top: 4px;
        }

        /* Divider */
        .tc-divider {
          height: 1px;
          background: hsl(var(--border));
          margin: 14px 0 0;
          flex-shrink: 0;
        }

        /* Footer */
        .tc-footer {
          padding: 14px 20px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-shrink: 0;
        }

        /* Salary */
        .tc-salary {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 15px;
          font-weight: 700;
          color: hsl(var(--foreground));
          letter-spacing: -0.01em;
        }

        .tc-salary-icon {
          width: 28px;
          height: 28px;
          border-radius: 8px;
          background: hsl(142 76% 96%);
          display: flex;
          align-items: center;
          justify-content: center;
          color: hsl(142 71% 45%);
          flex-shrink: 0;
        }

        .dark .tc-salary-icon {
          background: hsl(142 76% 16%);
          color: hsl(142 76% 66%);
        }

        .tc-salary-label {
          font-size: 10px;
          font-weight: 500;
          color: hsl(var(--muted-foreground));
          letter-spacing: 0.04em;
          text-transform: uppercase;
          display: block;
          line-height: 1;
          margin-bottom: 1px;
        }

        .tc-salary-amount {
          font-size: 14px;
          font-weight: 700;
          color: hsl(var(--foreground));
          line-height: 1;
        }

        /* View link */
        .tc-view {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          font-size: 12.5px;
          font-weight: 600;
          padding: 7px 14px;
          border-radius: 8px;
          background: hsl(var(--primary));
          color: hsl(var(--primary-foreground));
          transition: all 0.2s ease;
          letter-spacing: 0.01em;
          box-shadow: 0 2px 8px -2px hsl(var(--primary) / 0.4);
          white-space: nowrap;
        }

        .tc-view:hover {
          background: hsl(var(--primary) / 0.9);
          transform: translateY(-1px);
          box-shadow: 0 4px 14px -4px hsl(var(--primary) / 0.5);
        }

        .tc-view svg {
          transition: transform 0.2s ease;
        }

        .tc-view:hover svg {
          transform: translateX(2px);
        }
      `}</style>

      <div className="tc-root">
        {/* Top accent bar */}
        <div className="tc-bar" />

        {/* Body */}
        <div className="tc-body">
          <div className="tc-subject">{subject || "Unknown Subject"}</div>

          <div className="tc-meta">
            {/* Course */}
            <div className="tc-row">
              <div className="tc-row-icon">
                <IconBook />
              </div>
              <span className="tc-row-text">{course || "N/A"}</span>
            </div>

            {/* Location */}
            <div className="tc-row">
              <div className="tc-row-icon">
                <IconLocation />
              </div>
              <span className="tc-row-text">
                {contact?.location || "Location not specified"}
              </span>
            </div>

            {/* Schedule chip */}
            {schedule && (
              <div className="tc-schedule">
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    color: "inherit",
                  }}
                >
                  <IconClock />
                </div>
                {schedule}
              </div>
            )}
          </div>
        </div>

        <div className="tc-divider" />

        {/* Footer */}
        <div className="tc-footer">
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <div className="tc-salary-icon">
              <IconMoney />
            </div>
            <div>
              <span className="tc-salary-label">Salary</span>
              <div className="tc-salary-amount">
                {salary ? `${salary} BDT` : "Negotiable"}
              </div>
            </div>
          </div>

          <Link to={`/tuitions/${_id}`} className="tc-view">
            View
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </>
  );
}
