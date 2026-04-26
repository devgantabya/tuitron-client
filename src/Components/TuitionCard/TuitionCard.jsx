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
          color: #0F172A;
          line-height: 1.3;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          margin-bottom: 12px;
          letter-spacing: -0.01em;
        }

        .dark .tc-subject { color: #F1F5F9; }

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
          color: #64748B;
          font-weight: 400;
        }

        .dark .tc-row { color: #94A3B8; }

        .tc-row-icon {
          width: 26px;
          height: 26px;
          border-radius: 7px;
          background: #F1F5F9;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          color: #2563EB;
        }

        .dark .tc-row-icon {
          background: #1E293B;
          color: #60A5FA;
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
          background: #EFF6FF;
          color: #2563EB;
          font-size: 12px;
          font-weight: 500;
          border: 1px solid #BFDBFE;
          width: fit-content;
          margin-top: 4px;
        }

        .dark .tc-schedule {
          background: rgba(96,165,250,0.08);
          color: #60A5FA;
          border-color: rgba(96,165,250,0.2);
        }

        /* Divider */
        .tc-divider {
          height: 1px;
          background: rgba(0,0,0,0.05);
          margin: 14px 0 0;
          flex-shrink: 0;
        }

        .dark .tc-divider { background: rgba(255,255,255,0.05); }

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
          color: #0F172A;
          letter-spacing: -0.01em;
        }

        .dark .tc-salary { color: #F1F5F9; }

        .tc-salary-icon {
          width: 28px;
          height: 28px;
          border-radius: 8px;
          background: #F0FDF4;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #16A34A;
          flex-shrink: 0;
        }

        .dark .tc-salary-icon {
          background: rgba(22,163,74,0.1);
          color: #4ADE80;
        }

        .tc-salary-label {
          font-size: 10px;
          font-weight: 500;
          color: #94A3B8;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          display: block;
          line-height: 1;
          margin-bottom: 1px;
        }

        .tc-salary-amount {
          font-size: 14px;
          font-weight: 700;
          color: #0F172A;
          line-height: 1;
        }

        .dark .tc-salary-amount { color: #F1F5F9; }

        /* View link */
        .tc-view {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          font-size: 12.5px;
          font-weight: 600;
          padding: 7px 14px;
          border-radius: 8px;
          background: #2563EB;
          color: #fff;
          transition: all 0.2s ease;
          letter-spacing: 0.01em;
          box-shadow: 0 2px 8px -2px rgba(37,99,235,0.4);
          white-space: nowrap;
        }

        .tc-view:hover {
          background: #1D4ED8;
          transform: translateY(-1px);
          box-shadow: 0 4px 14px -4px rgba(37,99,235,0.5);
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
