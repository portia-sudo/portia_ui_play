import { useState, useEffect } from 'react'
import { MapPin, Search, AlertCircle } from 'lucide-react'

// Sample Australian suburbs for demo
const AUSTRALIAN_SUBURBS = [
  { suburb: 'Sydney', state: 'NSW', postcode: '2000' },
  { suburb: 'Melbourne', state: 'VIC', postcode: '3000' },
  { suburb: 'Brisbane', state: 'QLD', postcode: '4000' },
  { suburb: 'Perth', state: 'WA', postcode: '6000' },
  { suburb: 'Adelaide', state: 'SA', postcode: '5000' },
  { suburb: 'Hobart', state: 'TAS', postcode: '7000' },
  { suburb: 'Darwin', state: 'NT', postcode: '0800' },
  { suburb: 'Canberra', state: 'ACT', postcode: '2600' },
  { suburb: 'Parramatta', state: 'NSW', postcode: '2150' },
  { suburb: 'Richmond', state: 'VIC', postcode: '3121' },
  { suburb: 'South Brisbane', state: 'QLD', postcode: '4101' },
  { suburb: 'Fremantle', state: 'WA', postcode: '6160' },
  { suburb: 'Glenelg', state: 'SA', postcode: '5045' },
  { suburb: 'New Town', state: 'TAS', postcode: '7008' },
  { suburb: 'Casuarina', state: 'NT', postcode: '0810' },
  { suburb: 'Belconnen', state: 'ACT', postcode: '2617' }
]

function LocationStep({ formData, updateFormData, onNext, onBack }) {
  const [searchTerm, setSearchTerm] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [showDropdown, setShowDropdown] = useState(false)
  const [selectedLocation, setSelectedLocation] = useState({
    suburb: formData.suburb || '',
    state: formData.state || '',
    postcode: formData.postcode || ''
  })
  const [showInvalidModal, setShowInvalidModal] = useState(false)

  const handleSearchChange = (value) => {
    setSearchTerm(value)
    
    if (value.length >= 2) {
      const results = AUSTRALIAN_SUBURBS.filter(location =>
        location.suburb.toLowerCase().includes(value.toLowerCase()) ||
        location.postcode.includes(value)
      )
      setSearchResults(results)
      setShowDropdown(true)
    } else {
      setSearchResults([])
      setShowDropdown(false)
    }
  }

  const handleLocationSelect = (location) => {
    setSelectedLocation(location)
    setSearchTerm(`${location.suburb}, ${location.state} ${location.postcode}`)
    setShowDropdown(false)
    
    updateFormData('suburb', location.suburb)
    updateFormData('state', location.state)
    updateFormData('postcode', location.postcode)
  }

  const handleContinue = () => {
    if (selectedLocation.suburb && selectedLocation.state && selectedLocation.postcode) {
      onNext()
    } else {
      setShowInvalidModal(true)
    }
  }

  const handleInvalidModalClose = () => {
    setShowInvalidModal(false)
  }

  return (
    <div className="step location-step">
      <div className="step-header">
        <h2>Where are you looking to buy?</h2>
        <p>We need to know the location to calculate local market conditions</p>
      </div>

      <div className="location-section">
        <div className="search-container">
          <label htmlFor="location-search">
            <MapPin size={20} className="label-icon" />
            Suburb or postcode
          </label>
          <div className="search-input-wrapper">
            <Search size={20} className="search-icon" />
            <input
              id="location-search"
              type="text"
              value={searchTerm}
              onChange={(e) => handleSearchChange(e.target.value)}
              placeholder="Start typing a suburb or postcode..."
              autoComplete="off"
            />
          </div>
          
          {showDropdown && searchResults.length > 0 && (
            <div className="search-dropdown">
              {searchResults.map((location, index) => (
                <div
                  key={index}
                  className="search-result-item"
                  onClick={() => handleLocationSelect(location)}
                >
                  <div className="result-suburb">{location.suburb}</div>
                  <div className="result-details">{location.state} {location.postcode}</div>
                </div>
              ))}
            </div>
          )}
        </div>

        {selectedLocation.suburb && (
          <div className="selected-location">
            <div className="location-confirmation">
              <MapPin size={20} className="confirmation-icon" />
              <div>
                <div className="confirmation-suburb">{selectedLocation.suburb}</div>
                <div className="confirmation-details">{selectedLocation.state} {selectedLocation.postcode}</div>
              </div>
            </div>
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
          onClick={handleContinue}
        >
          Continue
        </button>
      </div>

      {/* Invalid Location Modal */}
      {showInvalidModal && (
        <div className="modal-overlay" onClick={handleInvalidModalClose}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <AlertCircle size={24} className="modal-icon" />
              <h3>We don't lend in this area yet</h3>
            </div>
            <div className="modal-body">
              <p>The reason this postcode isn't showing is because Sucasa currently doesn't provide loans in this suburb.</p>
              <p>Please try searching for a different suburb or postcode.</p>
            </div>
            <div className="modal-footer">
              <button 
                className="btn btn-primary"
                onClick={handleInvalidModalClose}
              >
                Got it
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default LocationStep

