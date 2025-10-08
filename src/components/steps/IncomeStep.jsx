import { useState, useEffect, useCallback } from 'react'
import { DollarSign, Users, Home, MapPin, PiggyBank, ChevronLeft, HelpCircle } from 'lucide-react'
import ProgressStepper from '../ProgressStepper'

function IncomeStep({ formData, updateFormData, onNext, onBack }) {
  const [adults, setAdults] = useState(formData.adults || 1)
  const [dependants, setDependants] = useState(formData.dependants || 0)
  const [incomes, setIncomes] = useState(formData.incomes || [''])
  const [incomeFrequencies, setIncomeFrequencies] = useState(formData.incomeFrequencies || ['annual'])
  const [deposit, setDeposit] = useState(formData.deposit || '')
  const [suburb, setSuburb] = useState(formData.suburb || '')
  const [suburbSearch, setSuburbSearch] = useState('')
  const [showSuburbDropdown, setShowSuburbDropdown] = useState(false)
  const [suburbMatches, setSuburbMatches] = useState([])
  const [validationErrors, setValidationErrors] = useState({})
  const [showInvalidSuburbModal, setShowInvalidSuburbModal] = useState(false)

  const STEPS = [
    { id: 'loan-purpose', title: 'Loan Purpose', icon: Home },
    { id: 'applicant-type', title: 'Applicants', icon: Users },
    { id: 'income', title: 'Financial Details', icon: DollarSign },
    { id: 'first-home-buyer', title: 'First Home Buyer', icon: Home },
    { id: 'results', title: 'Results', icon: PiggyBank }
  ]

  // Australian suburbs with postcodes for search
  const AUSTRALIAN_SUBURBS = [
    'Sydney, NSW 2000', 'Melbourne, VIC 3000', 'Brisbane, QLD 4000', 'Perth, WA 6000',
    'Adelaide, SA 5000', 'Hobart, TAS 7000', 'Darwin, NT 0800', 'Canberra, ACT 2600',
    'Gold Coast, QLD 4217', 'Newcastle, NSW 2300', 'Wollongong, NSW 2500', 'Geelong, VIC 3220',
    'Townsville, QLD 4810', 'Cairns, QLD 4870', 'Toowoomba, QLD 4350', 'Ballarat, VIC 3350',
    'Bendigo, VIC 3550', 'Albury, NSW 2640', 'Launceston, TAS 7250', 'Mackay, QLD 4740',
    'Rockhampton, QLD 4700', 'Bunbury, WA 6230', 'Coffs Harbour, NSW 2450', 'Wagga Wagga, NSW 2650',
    'Hervey Bay, QLD 4655', 'Mildura, VIC 3500', 'Shepparton, VIC 3630', 'Port Macquarie, NSW 2444',
    'Gladstone, QLD 4680', 'Tamworth, NSW 2340', 'Traralgon, VIC 3844', 'Orange, NSW 2800'
  ]

  // Debounced suburb search
  const debouncedSuburbSearch = useCallback(
    debounce((searchTerm) => {
      if (searchTerm.length < 2) {
        setSuburbMatches([])
        return
      }
      
      const matches = AUSTRALIAN_SUBURBS
        .filter(suburbName => 
          suburbName.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .slice(0, 6)
      
      setSuburbMatches(matches)
      
      // Show invalid suburb modal if no matches and substantial input
      if (searchTerm.length > 3 && matches.length === 0) {
        setTimeout(() => {
          setShowInvalidSuburbModal(true)
        }, 300)
      }
    }, 250),
    []
  )

  // Currency formatting helper
  const formatCurrency = (value) => {
    if (!value) return ''
    const numValue = parseFloat(value.replace(/[^\d]/g, ''))
    if (isNaN(numValue)) return ''
    return new Intl.NumberFormat('en-AU').format(numValue)
  }

  // Parse currency value
  const parseCurrency = (formattedValue) => {
    return formattedValue.replace(/[^\d]/g, '')
  }

  // Handle adults change
  const handleAdultsChange = (value) => {
    const newValue = Math.max(1, Math.min(4, value))
    setAdults(newValue)
    updateFormData('adults', newValue)
    
    // Automatically adjust incomes array to match adults count
    const newIncomes = []
    const newFrequencies = []
    
    for (let i = 0; i < newValue; i++) {
      // Keep existing values if they exist, otherwise use defaults
      newIncomes.push(incomes[i] || '')
      newFrequencies.push(incomeFrequencies[i] || 'annual')
    }
    
    setIncomes(newIncomes)
    setIncomeFrequencies(newFrequencies)
    updateFormData('incomes', newIncomes)
    updateFormData('incomeFrequencies', newFrequencies)
  }

  // Handle dependants change
  const handleDependantsChange = (value) => {
    const newValue = Math.max(0, Math.min(10, value))
    setDependants(newValue)
    updateFormData('dependants', newValue)
  }

  // Handle income change
  const handleIncomeChange = (index, value) => {
    const rawValue = parseCurrency(value)
    const newIncomes = [...incomes]
    newIncomes[index] = formatCurrency(rawValue)
    setIncomes(newIncomes)
    updateFormData('incomes', newIncomes.map(inc => parseCurrency(inc)))
    clearValidationError(`income-${index}`)
  }

  // Handle frequency change
  const handleFrequencyChange = (index, frequency) => {
    const newFrequencies = [...incomeFrequencies]
    newFrequencies[index] = frequency
    setIncomeFrequencies(newFrequencies)
    updateFormData('incomeFrequencies', newFrequencies)
  }

  // Handle deposit change
  const handleDepositChange = (value) => {
    const rawValue = parseCurrency(value)
    setDeposit(formatCurrency(rawValue))
    updateFormData('deposit', rawValue)
    clearValidationError('deposit')
  }

  // Handle suburb search
  const handleSuburbSearch = (value) => {
    setSuburbSearch(value)
    setShowSuburbDropdown(true)
    debouncedSuburbSearch(value)
    clearValidationError('suburb')
  }

  // Handle suburb selection
  const handleSuburbSelect = (selectedSuburb) => {
    setSuburb(selectedSuburb)
    setSuburbSearch(selectedSuburb)
    setShowSuburbDropdown(false)
    updateFormData('suburb', selectedSuburb)
    clearValidationError('suburb')
  }

  // Clear validation error
  const clearValidationError = (field) => {
    setValidationErrors(prev => {
      const newErrors = { ...prev }
      delete newErrors[field]
      return newErrors
    })
  }

  // Validation function
  const validateForm = () => {
    const errors = {}

    // Validate incomes
    incomes.forEach((income, index) => {
      if (!income || parseCurrency(income) === '0') {
        errors[`income-${index}`] = 'Enter income amount'
      }
    })

    // Validate deposit
    if (!deposit) {
      errors.deposit = 'Enter deposit amount'
    }

    // Validate suburb
    if (!suburb) {
      errors.suburb = 'Please select a valid suburb from the list'
    }

    setValidationErrors(errors)
    return Object.keys(errors).length === 0
  }

  // Handle next button click
  const handleNext = () => {
    if (validateForm()) {
      // Calculate total annual income
      const totalAnnualIncome = incomes.reduce((total, income, index) => {
        const amount = parseFloat(parseCurrency(income))
        const frequency = incomeFrequencies[index]
        return total + (frequency === 'monthly' ? amount * 12 : amount)
      }, 0)
      
      updateFormData('totalAnnualIncome', totalAnnualIncome)
      onNext()
    } else {
      // Focus first error field
      const firstErrorField = Object.keys(validationErrors)[0]
      if (firstErrorField) {
        const element = document.getElementById(firstErrorField)
        if (element) {
          element.focus()
        }
      }
    }
  }

  // Check if form can proceed
  const canProceed = incomes.every(income => income && parseCurrency(income) !== '0') && 
                    deposit && suburb

  // Load saved values on mount
  useEffect(() => {
    const savedData = localStorage.getItem('sucasa-financial-data')
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData)
        if (parsed.adults) setAdults(parsed.adults)
        if (parsed.dependants) setDependants(parsed.dependants)
        if (parsed.incomes) {
          const formattedIncomes = parsed.incomes.map(income => formatCurrency(income))
          setIncomes(formattedIncomes)
        }
        if (parsed.incomeFrequencies) setIncomeFrequencies(parsed.incomeFrequencies)
        if (parsed.deposit) setDeposit(formatCurrency(parsed.deposit))
        if (parsed.suburb) {
          setSuburb(parsed.suburb)
          setSuburbSearch(parsed.suburb)
        }
      } catch (error) {
        console.error('Error loading saved data:', error)
      }
    }
  }, [])

  // Save data to localStorage
  useEffect(() => {
    const dataToSave = {
      adults,
      dependants,
      incomes: incomes.map(inc => parseCurrency(inc)),
      incomeFrequencies,
      deposit: parseCurrency(deposit),
      suburb
    }
    localStorage.setItem('sucasa-financial-data', JSON.stringify(dataToSave))
  }, [adults, dependants, incomes, incomeFrequencies, deposit, suburb])

  // Debounce helper function
  function debounce(func, wait) {
    let timeout
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout)
        func(...args)
      }
      clearTimeout(timeout)
      timeout = setTimeout(later, wait)
    }
  }

  return (
    <div className="financial-step">
      <div className="top-stepper-panel">
        <ProgressStepper
          steps={STEPS}
          currentStep={2}
          onStepClick={() => {}}
        />
      </div>

      <div className="step-header">
        <h2>Tell us about your financial situation</h2>
        <p>This helps us calculate your realistic borrowing power.</p>
      </div>
      
      <div className="financial-form">
        {/* Household Type Section */}
        <div className="form-section">
          <h3 className="section-title">Household Type</h3>
          
          <div className="household-counters">
            <div className="counter-group">
              <label className="counter-label">How many adults are applying?</label>
              <div className="stepper-controls">
                <button 
                  className="stepper-btn"
                  onClick={() => handleAdultsChange(adults - 1)}
                  disabled={adults === 1}
                  aria-label="Decrease adults"
                >
                  −
                </button>
                <span className="stepper-value">{adults}</span>
                <button 
                  className="stepper-btn"
                  onClick={() => handleAdultsChange(adults + 1)}
                  aria-label="Increase adults"
                >
                  +
                </button>
              </div>
            </div>
            
            <div className="counter-group">
              <label className="counter-label">
                How many dependants do you support?
                <div className="tooltip">
                  <HelpCircle size={14} />
                  <div className="tooltip-content">
                    <p>Dependants are people you financially support (e.g. children).</p>
                  </div>
                </div>
              </label>
              <div className="stepper-controls">
                <button 
                  className="stepper-btn"
                  onClick={() => handleDependantsChange(dependants - 1)}
                  disabled={dependants === 0}
                  aria-label="Decrease dependants"
                >
                  −
                </button>
                <span className="stepper-value">{dependants}</span>
                <button 
                  className="stepper-btn"
                  onClick={() => handleDependantsChange(dependants + 1)}
                  aria-label="Increase dependants"
                >
                  +
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Income Section */}
        <div className="form-section">
          <h3 className="section-title">Income</h3>
          
          {incomes.map((income, index) => (
            <div key={index} className="income-input-group">
              <label className="income-label">
                {index === 0 ? 'Your income (before tax)' : `Adult ${index + 1} income (before tax)`}
                <div className="tooltip">
                  <HelpCircle size={14} />
                  <div className="tooltip-content">
                    <p>Include salary, bonuses, and regular income.</p>
                  </div>
                </div>
              </label>
              <div className="income-input-row">
                <div className="currency-input">
                  <span className="currency-symbol">$</span>
                  <input
                    id={`income-${index}`}
                    type="text"
                    value={income}
                    onChange={(e) => handleIncomeChange(index, e.target.value)}
                    placeholder="Enter income amount"
                    inputMode="numeric"
                    pattern="[0-9]*"
                  />
                </div>
                <div className="frequency-selector">
                  <select
                    value={incomeFrequencies[index]}
                    onChange={(e) => handleFrequencyChange(index, e.target.value)}
                  >
                    <option value="annual">Annual</option>
                    <option value="monthly">Monthly</option>
                  </select>
                </div>
              </div>
              {validationErrors[`income-${index}`] && (
                <div className="validation-error" role="alert" aria-live="polite">
                  {validationErrors[`income-${index}`]}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Deposit / Savings Section */}
        <div className="form-section">
          <h3 className="section-title">Deposit / Savings</h3>
          
          <div className="input-group">
            <label className="small-label">How much have you saved for a deposit?</label>
            <div className="currency-input large">
              <span className="currency-symbol">$</span>
              <input
                id="deposit"
                type="text"
                value={deposit}
                onChange={(e) => handleDepositChange(e.target.value)}
                placeholder="Enter deposit amount"
                inputMode="numeric"
                pattern="[0-9]*"
              />
            </div>
            <div className="help-text">
              Round numbers are fine — you can refine this later.
            </div>
            {validationErrors.deposit && (
              <div className="validation-error" role="alert" aria-live="polite">
                {validationErrors.deposit}
              </div>
            )}
          </div>
        </div>

        {/* Location Section */}
        <div className="form-section">
          <h3 className="section-title">Location</h3>
          
          <div className="input-group">
            <label className="small-label">Where do you want to buy?</label>
            <div className="location-search-container">
              <div className="search-input-container">
                <input
                  id="suburb"
                  type="text"
                  value={suburbSearch}
                  onChange={(e) => handleSuburbSearch(e.target.value)}
                  onFocus={() => setShowSuburbDropdown(true)}
                  onBlur={() => setTimeout(() => setShowSuburbDropdown(false), 200)}
                  placeholder="Start typing a suburb or postcode"
                />
              </div>
              
              {showSuburbDropdown && suburbMatches.length > 0 && (
                <div className="location-dropdown">
                  {suburbMatches.map((match, index) => (
                    <div 
                      key={index}
                      className="location-option"
                      onClick={() => handleSuburbSelect(match)}
                    >
                      {match}
                    </div>
                  ))}
                </div>
              )}
            </div>
            {validationErrors.suburb && (
              <div className="validation-error" role="alert" aria-live="polite">
                {validationErrors.suburb}
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Sticky Footer */}
      <div className="sticky-footer">
        <div className="progress-hint">
          Step 3 of 5 — your estimate is next.
        </div>
        <div className="form-actions">
          <button 
            className="btn btn-secondary"
            onClick={onBack}
          >
            <ChevronLeft size={20} />
            Back
          </button>
          <button 
            className="btn btn-primary btn-full-width"
            onClick={handleNext}
            disabled={!canProceed}
          >
            Next
          </button>
        </div>
      </div>
      
      {/* Invalid Suburb Modal */}
      {showInvalidSuburbModal && (
        <div className="modal-overlay" onClick={() => setShowInvalidSuburbModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h4>We don't lend in this area yet</h4>
              <button 
                className="modal-close-btn"
                onClick={() => setShowInvalidSuburbModal(false)}
              >
                ×
              </button>
            </div>
            <div className="modal-body">
              <p>The reason this postcode isn't showing is because Sucasa currently doesn't provide loans in this suburb.</p>
            </div>
            <div className="modal-footer">
              <button 
                className="btn btn-primary"
                onClick={() => setShowInvalidSuburbModal(false)}
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

export default IncomeStep