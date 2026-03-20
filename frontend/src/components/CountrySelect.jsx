import { useState, useRef, useEffect } from 'react'
import { countries, subregions } from '../data/countries'

function filterMatches(list, query) {
  if (!query.trim()) return []
  const q = query.trim().toLowerCase()
  return list.filter((item) => item.toLowerCase().includes(q))
}

export default function CountrySelect({ value, onChange, placeholder = 'Search country or region...' }) {
  const [isOpen, setIsOpen] = useState(false)
  const [inputValue, setInputValue] = useState(value || '')
  const wrapperRef = useRef(null)

  useEffect(() => {
    setInputValue(value || '')
  }, [value])

  useEffect(() => {
    function handleClickOutside(e) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const countryMatches = filterMatches(countries, inputValue)
  const subregionMatches = filterMatches(subregions, inputValue)
  const hasSuggestions = countryMatches.length > 0 || subregionMatches.length > 0

  const handleInputChange = (e) => {
    const v = e.target.value
    setInputValue(v)
    onChange(v)
    setIsOpen(v.length > 0)
  }

  const handleSelect = (item) => {
    setInputValue(item)
    onChange(item)
    setIsOpen(false)
  }

  const handleClear = () => {
    setInputValue('')
    onChange('')
    setIsOpen(false)
  }

  return (
    <div className="country-select" ref={wrapperRef}>
      <div className="country-select-inner">
        <div className="country-select-input-wrap">
          <span className="country-select-icon" aria-hidden="true">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"/>
              <path d="m21 21-4.35-4.35"/>
            </svg>
          </span>
          <input
          type="text"
          className="country-select-input"
          value={inputValue}
          onChange={handleInputChange}
          onFocus={() => inputValue && setIsOpen(true)}
          placeholder={placeholder}
          autoComplete="off"
          aria-autocomplete="list"
          aria-expanded={isOpen}
          aria-controls="country-suggestions"
          id="clientCountry"
        />
        <button
            type="button"
            className={`country-select-clear ${inputValue ? 'visible' : 'invisible'}`}
            onClick={handleClear}
            aria-label="Clear"
            aria-hidden={!inputValue}
            tabIndex={inputValue ? 0 : -1}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 6 6 18"/><path d="m6 6 12 12"/>
            </svg>
          </button>
        </div>
        {isOpen && hasSuggestions && (
        <div id="country-suggestions" className="country-select-dropdown" role="listbox">
          {countryMatches.length > 0 && (
            <div className="country-select-group">
              <div className="country-select-group-label">Countries</div>
              {countryMatches.slice(0, 8).map((c) => (
                <div
                  key={c}
                  className="country-select-option"
                  role="option"
                  onClick={() => handleSelect(c)}
                >
                  {c}
                </div>
              ))}
            </div>
          )}
          {subregionMatches.length > 0 && (
            <div className="country-select-group">
              <div className="country-select-group-label">Subregions</div>
              {subregionMatches.slice(0, 6).map((s) => (
                <div
                  key={s}
                  className="country-select-option"
                  role="option"
                  onClick={() => handleSelect(s)}
                >
                  {s}
                </div>
              ))}
            </div>
          )}
        </div>
        )}
      </div>
    </div>
  )
}
