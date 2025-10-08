import { useState, useEffect } from 'react'
import { DollarSign, MapPin, Users, Search, CheckCircle, XCircle, Minus, Plus } from 'lucide-react'

function HEMCalculationStep({ formData, updateFormData, onNext, onBack }) {
  const [incomes, setIncomes] = useState(formData.incomes || [''])
  const [incomeFrequencies, setIncomeFrequencies] = useState(formData.incomeFrequencies || ['annual'])
  const [expenses, setExpenses] = useState(formData.expenses || '')
  const [expenseFrequency, setExpenseFrequency] = useState(formData.expenseFrequency || 'weekly')
  const [suburb, setSuburb] = useState(formData.suburb || '')
  const [state, setState] = useState(formData.state || '')
  const [postcode, setPostcode] = useState(formData.postcode || '')
  const [dependants, setDependants] = useState(formData.dependants || 0)
  const [searchResults, setSearchResults] = useState([])
  const [showResults, setShowResults] = useState(false)
  const [isSearching, setIsSearching] = useState(false)
  const [showCongratulations, setShowCongratulations] = useState(false)
  const [showOops, setShowOops] = useState(false)

  // Initialize income fields based on applicant type
  useEffect(() => {
    console.log('HEMCalculationStep - applicantType:', formData.applicantType)
    console.log('HEMCalculationStep - formData:', formData)
    if (formData.applicantType === 'single') {
      setIncomes([''])
      setIncomeFrequencies(['annual'])
    } else if (formData.applicantType === 'joint') {
      setIncomes(['', ''])
      setIncomeFrequencies(['annual', 'annual'])
    }
  }, [formData.applicantType])

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

  const handleIncomeChange = (index, value) => {
    console.log('handleIncomeChange called:', index, value)
    const newIncomes = [...incomes]
    newIncomes[index] = value
    setIncomes(newIncomes)
    updateFormData('incomes', newIncomes)
  }

  const handleIncomeFrequencyChange = (index, frequency) => {
    const newFrequencies = [...incomeFrequencies]
    newFrequencies[index] = frequency
    setIncomeFrequencies(newFrequencies)
    updateFormData('incomeFrequencies', newFrequencies)
  }

  const handleExpensesChange = (value) => {
    console.log('handleExpensesChange called:', value)
    setExpenses(value)
    updateFormData('expenses', value)
  }

  const handleExpenseFrequencyChange = (frequency) => {
    setExpenseFrequency(frequency)
    updateFormData('expenseFrequency', frequency)
  }

  const handleDependantsChange = (newValue) => {
    const value = Math.max(0, Math.min(10, newValue))
    setDependants(value)
    updateFormData('dependants', value)
  }

  const formatCurrency = (value) => {
    if (!value || value === '') return ''
    // If it's already a number, format it
    if (typeof value === 'string' && /^\d+$/.test(value)) {
      const numValue = parseFloat(value)
      if (isNaN(numValue)) return ''
      return numValue.toLocaleString()
    }
    // If it has formatting, clean and format it
    const numValue = parseFloat(value.replace(/[^\d]/g, ''))
    if (isNaN(numValue)) return ''
    return numValue.toLocaleString()
  }

  const canProceed = 
    (formData.applicantType === 'single' ? (incomes[0] && incomes[0] !== '') : 
     (incomes[0] && incomes[0] !== '' && incomes[1] && incomes[1] !== '')) && 
    expenses && suburb && state && postcode

  return (
    <div className="step hem-calculation-step">
      <div className="step-header">
        <h2>Tell us about your financial situation</h2>
        <p>This helps us calculate your borrowing power using HEM (Household Expenditure Measure)</p>
      </div>

      <div className="hem-calculation-content">
        {/* Income Details */}
        <div className="form-section">
          <div className="section-header">
            <DollarSign size={20} className="section-icon" />
            <h3>Income Details</h3>
          </div>
          
          {/* Income Field - Always Show */}
          <div style={{ marginBottom: '20px' }}>
            <label htmlFor="income-0" style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>
              {formData.applicantType === 'joint' ? 'Applicant 1 Income (before tax)' : 'Your Income (before tax)'}
            </label>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '16px', fontWeight: 'bold' }}>$</span>
              <input
                type="text"
                id="income-0"
                value={incomes[0] || ''}
                onChange={(e) => {
                  console.log('Income input changed:', e.target.value)
                  const newIncomes = [...incomes]
                  newIncomes[0] = e.target.value
                  setIncomes(newIncomes)
                  updateFormData('incomes', newIncomes)
                }}
                placeholder="0"
                style={{ 
                  border: '2px solid #000', 
                  padding: '12px', 
                  fontSize: '16px',
                  background: '#fff',
                  color: '#000',
                  flex: '1',
                  borderRadius: '0'
                }}
              />
              <select 
                value={incomeFrequencies[0] || 'annual'}
                onChange={(e) => {
                  const newFrequencies = [...incomeFrequencies]
                  newFrequencies[0] = e.target.value
                  setIncomeFrequencies(newFrequencies)
                  updateFormData('incomeFrequencies', newFrequencies)
                }}
                style={{
                  border: '2px solid #000',
                  padding: '12px',
                  fontSize: '14px',
                  background: '#fff',
                  color: '#000',
                  borderRadius: '0'
                }}
              >
                <option value="annual">per year</option>
                <option value="monthly">per month</option>
                <option value="weekly">per week</option>
              </select>
            </div>
          </div>
          
          {/* Joint Applicant Income - Second Person */}
          {formData.applicantType === 'joint' && (
            <div style={{ marginBottom: '20px' }}>
              <label htmlFor="income-1" style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>
                Applicant 2 Income (before tax)
              </label>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '16px', fontWeight: 'bold' }}>$</span>
                <input
                  type="text"
                  id="income-1"
                  value={incomes[1] || ''}
                  onChange={(e) => {
                    console.log('Income 2 input changed:', e.target.value)
                    const newIncomes = [...incomes]
                    newIncomes[1] = e.target.value
                    setIncomes(newIncomes)
                    updateFormData('incomes', newIncomes)
                  }}
                  placeholder="0"
                  style={{ 
                    border: '2px solid #000', 
                    padding: '12px', 
                    fontSize: '16px',
                    background: '#fff',
                    color: '#000',
                    flex: '1',
                    borderRadius: '0'
                  }}
                />
                <select 
                  value={incomeFrequencies[1] || 'annual'}
                  onChange={(e) => {
                    const newFrequencies = [...incomeFrequencies]
                    newFrequencies[1] = e.target.value
                    setIncomeFrequencies(newFrequencies)
                    updateFormData('incomeFrequencies', newFrequencies)
                  }}
                  style={{
                    border: '2px solid #000',
                    padding: '12px',
                    fontSize: '14px',
                    background: '#fff',
                    color: '#000',
                    borderRadius: '0'
                  }}
                >
                  <option value="annual">per year</option>
                  <option value="monthly">per month</option>
                  <option value="weekly">per week</option>
                </select>
              </div>
            </div>
          )}
        </div>

        {/* Weekly Expenses */}
        <div className="form-section">
          <div className="section-header">
            <DollarSign size={20} className="section-icon" />
            <h3>Weekly Expenses</h3>
          </div>
          <div className="expense-input-group">
            <label htmlFor="expenses">
              What are your weekly expenses?
            </label>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '16px', fontWeight: 'bold' }}>$</span>
              <input
                type="text"
                id="expenses"
                value={expenses}
                onChange={(e) => {
                  console.log('Expenses input changed:', e.target.value)
                  handleExpensesChange(e.target.value)
                }}
                placeholder="0"
                style={{ 
                  border: '2px solid #000', 
                  padding: '12px', 
                  fontSize: '16px',
                  background: '#fff',
                  color: '#000',
                  flex: '1'
                }}
              />
              <select 
                value={expenseFrequency}
                onChange={(e) => handleExpenseFrequencyChange(e.target.value)}
                style={{
                  border: '2px solid #000',
                  padding: '12px',
                  fontSize: '14px',
                  background: '#fff',
                  color: '#000'
                }}
              >
                <option value="weekly">per week</option>
                <option value="monthly">per month</option>
                <option value="annual">per year</option>
              </select>
            </div>
            <p className="help-text">
              Include living expenses, bills, and other regular commitments
            </p>
          </div>
        </div>

        {/* Number of Dependants */}
        <div className="form-section">
          <div className="section-header">
            <Users size={20} className="section-icon" />
            <h3>Number of Dependants</h3>
          </div>
          <div className="dependants-counter">
            <button 
              className="counter-btn" 
              onClick={() => handleDependantsChange(dependants - 1)}
              disabled={dependants <= 0}
            >
              <Minus size={20} />
            </button>
            <span className="counter-value">{dependants}</span>
            <button 
              className="counter-btn" 
              onClick={() => handleDependantsChange(dependants + 1)}
              disabled={dependants >= 10}
            >
              <Plus size={20} />
            </button>
          </div>
          <p className="help-text">
            Include children under 18 who live with you and depend on you financially.
          </p>
        </div>

        {/* Property Location */}
        <div className="form-section">
          <div className="section-header">
            <MapPin size={20} className="section-icon" />
            <h3>Where do you plan to buy?</h3>
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

export default HEMCalculationStep
