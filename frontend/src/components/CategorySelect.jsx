import { useState, useRef, useEffect } from 'react'
import { projectCategories } from '../data/categories'

export default function CategorySelect({ value, onChange, error }) {
  const [isOpen, setIsOpen] = useState(false)
  const wrapperRef = useRef(null)
  const selected = value ? value.trim() : ''

  useEffect(() => {
    function handleClickOutside(e) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const select = (category) => {
    onChange(category)
    setIsOpen(false)
  }

  return (
    <div className="skill-select category-select" ref={wrapperRef}>
      <button
        type="button"
        className={`skill-select-trigger ${error ? 'input-error' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        <span className={selected ? 'skill-select-value' : 'skill-select-placeholder'}>
          {selected || 'Select category...'}
        </span>
        <span className="skill-select-arrow">{isOpen ? '▲' : '▼'}</span>
      </button>
      {isOpen && (
        <div className="skill-select-dropdown" role="listbox">
          <div className="skill-select-group">
            {projectCategories.map((category) => (
              <label key={category} className="skill-select-option">
                <input
                  type="radio"
                  name="projectCategory"
                  checked={selected === category}
                  onChange={() => select(category)}
                />
                <span>{category}</span>
              </label>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
