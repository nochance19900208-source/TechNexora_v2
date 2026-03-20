/**
 * Company name + short role line for the header (trust + clarity).
 */
export default function LogoLockup({ variant = 'full' }) {
  if (variant === 'compact') {
    return <span className="logo-name">TechNeoxra</span>
  }

  return (
    <span className="logo-lockup">
      <span className="logo-name">TechNeoxra</span>
      <span className="logo-role">Software development</span>
    </span>
  )
}
