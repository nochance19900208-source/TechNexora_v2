import { useState, useRef, useEffect } from 'react'
import { skillCategories } from '../data/skills'

export default function SkillSelect({ value, onChange }) {
  const [isOpen, setIsOpen] = useState(false)
  const wrapperRef = useRef(null)
  const selected = value ? value.split(',').map((s) => s.trim()).filter(Boolean) : []

  useEffect(() => {
    function handleClickOutside(e) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const toggle = (skill) => {
    if (selected.includes(skill)) {
      onChange(selected.filter((s) => s !== skill).join(', '))
    } else if (selected.length < 5) {
      onChange([...selected, skill].join(', '))
    }
  }

  const atLimit = selected.length >= 5

  return (
    <div className="skill-select" ref={wrapperRef}>
      <button
        type="button"
        className="skill-select-trigger"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        <span className={selected.length ? 'skill-select-value' : 'skill-select-placeholder'}>
          {selected.length ? selected.join(', ') : 'Select skills (max 5)...'}
        </span>
        <span className="skill-select-arrow">{isOpen ? '▲' : '▼'}</span>
      </button>
      {isOpen && (
        <div className="skill-select-dropdown" role="listbox">
          {skillCategories.map((cat) => (
            <div key={cat.name} className="skill-select-group">
              <div className="skill-select-group-label">{cat.name}</div>
              {cat.skills.map((skill) => (
                <label key={skill} className={`skill-select-option ${atLimit && !selected.includes(skill) ? 'disabled' : ''}`}>
                  <input
                    type="checkbox"
                    checked={selected.includes(skill)}
                    disabled={atLimit && !selected.includes(skill)}
                    onChange={() => toggle(skill)}
                  />
                  <span>{skill}</span>
                </label>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
