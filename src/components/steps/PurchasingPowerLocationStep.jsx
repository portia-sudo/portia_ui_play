import { useState, useEffect } from 'react'
import { MapPin, Search } from 'lucide-react'

function PurchasingPowerLocationStep({ formData, updateFormData, onNext, onBack }) {
  const [suburb, setSuburb] = useState(formData.suburb || '')
  const [state, setState] = useState(formData.state || '')
  const [postcode, setPostcode] = useState(formData.postcode || '')
  const [buyingTimeframe, setBuyingTimeframe] = useState(formData.buyingTimeframe || '')
  const [searchResults, setSearchResults] = useState([])
  const [showResults, setShowResults] = useState(false)
  const [isSearching, setIsSearching] = useState(false)

  // Mock suburb search - replace with real API
  const searchSuburbs = async (query) => {
    if (query.length < 2) {
      setSearchResults([])
      setShowResults(false)
      return
    }

    setIsSearching(true)
    // Mock data - replace with real API call
    setTimeout(() => {
      const mockResults = [
        { suburb: 'Sydney', state: 'NSW', postcode: '2000' },
        { suburb: 'Melbourne', state: 'VIC', postcode: '3000' },
        { suburb: 'Brisbane', state: 'QLD', postcode: '4000' },
        { suburb: 'Perth', state: 'WA', postcode: '6000' },
        { suburb: 'Adelaide', state: 'SA', postcode: '5000' }
      ].filter(item => 
        item.suburb.toLowerCase().includes(query.toLowerCase()) ||
        item.postcode.includes(query)
      )
      
      setSearchResults(mockResults)
      setShowResults(true)
      setIsSearching(false)
    }, 300)
  }

  const handleSuburbChange = (e) => {
    const value = e.target.value
    setSuburb(value)
    searchSuburbs(value)
  }

  const selectSuburb = (result) => {
    setSuburb(result.suburb)
    setState(result.state)
    setPostcode(result.postcode)
    setShowResults(false)
    updateFormData({
      suburb: result.suburb,
      state: result.state,
      postcode: result.postcode
    })
  }

  const handleBuyingTimeframeChange = (timeframe) => {
    setBuyingTimeframe(timeframe)
    updateFormData('buyingTimeframe', timeframe)
  }

  const canProceed = suburb && state && postcode && buyingTimeframe

  return (
    <div className="step location-step">
      <div className="step-header">
        <h2>Where and when are you looking to buy?</h2>
        <p>Tell us about your property search location and timeline</p>
      </div>

      <div className="location-section">
        <div className="search-container">
          <label htmlFor="suburb-search">
            <MapPin size={16} className="label-icon" />
            What suburb are you looking into?
          </label>
          <div className="search-input-wrapper">
            <Search size={20} className="search-icon" />
            <input
              type="text"
              id="suburb-search"
              value={suburb}
              onChange={handleSuburbChange}
              placeholder="Enter suburb or postcode..."
              className="search-input"
            />
            {isSearching && <div className="search-loading">Searching...</div>}
          </div>
          
          {showResults && searchResults.length > 0 && (
            <div className="search-results">
              {searchResults.map((result, index) => (
                <div 
                  key={index}
                  className="search-result"
                  onClick={() => selectSuburb(result)}
                >
                  <div className="result-suburb">{result.suburb}</div>
                  <div className="result-details">{result.state} {result.postcode}</div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="timeframe-section">
          <h3>When are you planning to buy?</h3>
          <div className="timeframe-options">
            <button 
              className={`timeframe-btn ${buyingTimeframe === 'immediately' ? 'selected' : ''}`}
              onClick={() => handleBuyingTimeframeChange('immediately')}
            >
              Immediately
            </button>
            <button 
              className={`timeframe-btn ${buyingTimeframe === 'within-6-months' ? 'selected' : ''}`}
              onClick={() => handleBuyingTimeframeChange('within-6-months')}
            >
              Within 6 months
            </button>
            <button 
              className={`timeframe-btn ${buyingTimeframe === '6-12-months' ? 'selected' : ''}`}
              onClick={() => handleBuyingTimeframeChange('6-12-months')}
            >
              6-12 months
            </button>
            <button 
              className={`timeframe-btn ${buyingTimeframe === '1-2-years' ? 'selected' : ''}`}
              onClick={() => handleBuyingTimeframeChange('1-2-years')}
            >
              1-2 years
            </button>
            <button 
              className={`timeframe-btn ${buyingTimeframe === 'exploring' ? 'selected' : ''}`}
              onClick={() => handleBuyingTimeframeChange('exploring')}
            >
              Just exploring
            </button>
          </div>
        </div>

        {suburb && state && postcode && (
          <div className="confirmation-section">
            <h4>Selected Location:</h4>
            <div className="confirmation-suburb">{suburb}, {state} {postcode}</div>
          </div>
        )}
      </div>

      <div className="step-actions">
        <button 
          className="btn btn-secondary"
          onClick={onBack}
        >
          Back
        </button>
        <button 
          className="btn btn-primary btn-large"
          onClick={onNext}
          disabled={!canProceed}
        >
          Continue
        </button>
      </div>
    </div>
  )
}

export default PurchasingPowerLocationStep

