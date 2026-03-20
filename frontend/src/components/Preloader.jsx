import { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import LogoMark from './LogoMark.jsx'

/** First visit: after `window` `load`, at least this long from mount. */
const MIN_INITIAL_MS = 2000
/** Client-side route change: preloader visible this long before fade-out. */
const MIN_ROUTE_MS = 600

export default function Preloader() {
  const location = useLocation()
  const [show, setShow] = useState(true)
  const [exiting, setExiting] = useState(false)

  const initialDoneRef = useRef(false)
  const prevPathRef = useRef(location.pathname)

  useEffect(() => {
    let cancelled = false
    let t1
    let t2
    const t0 = performance.now()
    const pathAtMount = window.location.pathname

    const scheduleHide = () => {
      if (cancelled) return
      const wait = Math.max(0, MIN_INITIAL_MS - (performance.now() - t0))
      t1 = window.setTimeout(() => {
        if (cancelled) return
        initialDoneRef.current = true
        prevPathRef.current = pathAtMount
        setExiting(true)
        t2 = window.setTimeout(() => {
          if (!cancelled) setShow(false)
        }, 320)
      }, wait)
    }

    if (document.readyState === 'complete') {
      scheduleHide()
    } else {
      window.addEventListener('load', scheduleHide, { once: true })
    }

    return () => {
      cancelled = true
      window.clearTimeout(t1)
      window.clearTimeout(t2)
    }
  }, [])

  useEffect(() => {
    if (!initialDoneRef.current) return
    if (prevPathRef.current === location.pathname) return

    let t1
    let t2
    let cancelled = false

    setExiting(false)
    setShow(true)

    t1 = window.setTimeout(() => {
      if (cancelled) return
      setExiting(true)
      t2 = window.setTimeout(() => {
        if (!cancelled) {
          prevPathRef.current = location.pathname
          setShow(false)
        }
      }, 320)
    }, MIN_ROUTE_MS)

    return () => {
      cancelled = true
      window.clearTimeout(t1)
      window.clearTimeout(t2)
    }
  }, [location.pathname])

  if (!show) return null

  return (
    <div
      className={`preloader${exiting ? ' preloader--exiting' : ''}`}
      aria-busy="true"
      aria-live="polite"
      aria-label="Loading TechNexora"
    >
      <div className="preloader-inner">
        <div className="preloader-spin">
          <svg className="preloader-arc" viewBox="0 0 56 56" aria-hidden>
            <circle
              className="preloader-arc-path"
              cx="28"
              cy="28"
              r="24"
              fill="none"
              strokeWidth="2.25"
              strokeLinecap="round"
            />
          </svg>
          <div className="preloader-mark-wrap">
            <LogoMark className="preloader-logo-mark" />
          </div>
        </div>
      </div>
    </div>
  )
}
