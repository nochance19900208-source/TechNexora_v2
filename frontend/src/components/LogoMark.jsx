/**
 * Composite mark: outer hex + inner hex + triangular mesh + nodes + hub + apex cap.
 */
export default function LogoMark({ className = '' }) {
  return (
    <svg
      className={`logo-mark ${className}`.trim()}
      viewBox="0 0 28 28"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
      focusable="false"
      shapeRendering="geometricPrecision"
    >
      <polygon
        className="logo-mark-hex-outer"
        fill="none"
        points="14,3.75 22.88,8.88 22.88,19.12 14,24.25 5.12,19.12 5.12,8.88"
      />
      <polygon
        className="logo-mark-hex-inner"
        fill="none"
        points="14,8.75 19.05,11.6 19.05,16.4 14,19.25 8.95,16.4 8.95,11.6"
      />
      <path
        className="logo-mark-tri"
        d="M14 8.15 L9.1 17.05 L18.9 17.05 Z"
        fill="none"
      />
      <line className="logo-mark-spoke" x1="14" y1="14.05" x2="14" y2="8.15" />
      <line className="logo-mark-spoke" x1="14" y1="14.05" x2="9.1" y2="17.05" />
      <line className="logo-mark-spoke" x1="14" y1="14.05" x2="18.9" y2="17.05" />
      <circle className="logo-mark-vertex" cx="14" cy="8.15" r="1.42" />
      <circle className="logo-mark-vertex" cx="9.1" cy="17.05" r="1.42" />
      <circle className="logo-mark-vertex" cx="18.9" cy="17.05" r="1.42" />
      <circle className="logo-mark-hub" cx="14" cy="14.05" r="2.38" />
      <circle className="logo-mark-cap" cx="14" cy="2.9" r="1.05" />
    </svg>
  )
}
