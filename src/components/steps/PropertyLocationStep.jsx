import { useState, useEffect } from 'react'
import { MapPin, Search, Home, CheckCircle, XCircle } from 'lucide-react'

function PropertyLocationStep({ formData, updateFormData, onNext, onBack }) {
  const [suburb, setSuburb] = useState(formData.suburb || '')
  const [state, setState] = useState(formData.state || '')
  const [postcode, setPostcode] = useState(formData.postcode || '')
  const [propertyType, setPropertyType] = useState(formData.propertyType || '')
  const [searchResults, setSearchResults] = useState([])
  const [showResults, setShowResults] = useState(false)
  const [isSearching, setIsSearching] = useState(false)
  const [showCongratulations, setShowCongratulations] = useState(false)
  const [showOops, setShowOops] = useState(false)

  // Mock suburb search with lending eligibility
  const searchSuburbs = async (query) => {
    if (query.length < 2) {
      setSearchResults([])
      setShowResults(false)
      return
    }

    setIsSearching(true)
    // Mock data with lending eligibility
    setTimeout(() => {
      const mockResults = [
        { suburb: 'Sydney', state: 'NSW', postcode: '2000', eligible: true },
        { suburb: 'Melbourne', state: 'VIC', postcode: '3000', eligible: true },
        { suburb: 'Brisbane', state: 'QLD', postcode: '4000', eligible: true },
        { suburb: 'Perth', state: 'WA', postcode: '6000', eligible: true },
        { suburb: 'Adelaide', state: 'SA', postcode: '5000', eligible: true },
        { suburb: 'Test Suburb', state: 'NSW', postcode: '9999', eligible: false }, // Example of non-eligible area
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

    // Show appropriate popup based on eligibility
    if (result.eligible) {
      setShowCongratulations(true)
      setTimeout(() => setShowCongratulations(false), 3000)
    } else {
      setShowOops(true)
      setTimeout(() => setShowOops(false), 3000)
    }
  }

  const handlePropertyTypeChange = (type) => {
    setPropertyType(type)
    updateFormData('propertyType', type)
  }

  const canProceed = suburb && state && postcode && propertyType

  return (
    <div className="step property-location-step">
      <div className="step-header">
        <h2>Where are you planning to buy?</h2>
        <p>Tell us about your target property location and type</p>
      </div>

      <div className="property-location-content">
        {/* Property Suburb */}
        <div className="form-section">
          <div className="section-header">
            <MapPin size={20} className="section-icon" />
            <h3>Property Suburb</h3>
          </div>
          <div className="search-container">
            <div className="search-input-wrapper">
              <Search size={20} className="search-icon" />
              <input
                type="text"
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

          {suburb && state && postcode && (
            <div className="confirmation-section">
              <div className="confirmation-suburb">{suburb}, {state} {postcode}</div>
            </div>
          )}
        </div>

        {/* Property Type */}
        <div className="form-section">
          <div className="section-header">
            <Home size={20} className="section-icon" />
            <h3>Type of Property</h3>
          </div>
          <div className="options-grid-small">
            <button 
              className={`option-btn ${propertyType === 'house' ? 'selected' : ''}`}
              onClick={() => handlePropertyTypeChange('house')}
            >
              House
            </button>
            <button 
              className={`option-btn ${propertyType === 'apartment' ? 'selected' : ''}`}
              onClick={() => handlePropertyTypeChange('apartment')}
            >
              Apartment
            </button>
            <button 
              className={`option-btn ${propertyType === 'townhouse' ? 'selected' : ''}`}
              onClick={() => handlePropertyTypeChange('townhouse')}
            >
              Townhouse
            </button>
            <button 
              className={`option-btn ${propertyType === 'unit' ? 'selected' : ''}`}
              onClick={() => handlePropertyTypeChange('unit')}
            >
              Unit
            </button>
            <button 
              className={`option-btn ${propertyType === 'land' ? 'selected' : ''}`}
              onClick={() => handlePropertyTypeChange('land')}
            >
              Land
            </button>
          </div>
        </div>
      </div>

      {/* Congratulations Popup */}
      {showCongratulations && (
        <div className="popup-overlay">
          <div className="popup-card congratulations">
            <CheckCircle size={48} className="popup-icon success" />
            <h3>Congratulations!</h3>
            <p>We lend in {suburb}! You're in a great location to get started with your property purchase.</p>
          </div>
        </div>
      )}

      {/* Oops Popup */}
      {showOops && (
        <div className="popup-overlay">
          <div className="popup-card oops">
            <XCircle size={48} className="popup-icon error" />
            <h3>Oops, we don't lend here yet</h3>
            <p>We don't currently provide loans in {suburb}. Try exploring nearby suburbs or contact us to see if we can help.</p>
            <button 
              className="btn btn-secondary"
              onClick={() => setShowOops(false)}
            >
              Explore Other Areas
            </button>
          </div>
        </div>
      )}

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

export default PropertyLocationStep

