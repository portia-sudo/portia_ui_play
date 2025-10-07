import { useState } from 'react'
import { DollarSign, Users, Home, MapPin, PiggyBank, Info, Search } from 'lucide-react'
import ProgressStepper from '../ProgressStepper'

function IncomeStep({ formData, updateFormData, onNext }) {
  const [income, setIncome] = useState(formData.income || '')
  const [income2, setIncome2] = useState(formData.income2 || '')
  const [incomeFrequency, setIncomeFrequency] = useState(formData.incomeFrequency || 'annual')
  const [familyStatus, setFamilyStatus] = useState(formData.familyStatus || '')
  const [dependents, setDependents] = useState(formData.dependents || 0)
  const [savings, setSavings] = useState(formData.savings || '')
  const [suburb, setSuburb] = useState(formData.suburb || '')
  const [suburbSearch, setSuburbSearch] = useState('')
  const [showSuburbDropdown, setShowSuburbDropdown] = useState(false)
  const [showHelp, setShowHelp] = useState(false)

  const familyOptions = [
    { id: 'single', label: 'Single', description: 'No dependents' },
    { id: 'couple', label: 'Couple', description: 'No dependents' },
    { id: 'family', label: 'Family', description: 'With dependents' }
  ]

  const australianSuburbs = [
    'Sydney, NSW', 'Melbourne, VIC', 'Brisbane, QLD', 'Perth, WA',
    'Adelaide, SA', 'Hobart, TAS', 'Darwin, NT', 'Canberra, ACT',
    'Gold Coast, QLD', 'Newcastle, NSW', 'Wollongong, NSW', 'Geelong, VIC',
    'Townsville, QLD', 'Cairns, QLD', 'Toowoomba, QLD', 'Ballarat, VIC',
    'Bendigo, VIC', 'Albury, NSW', 'Launceston, TAS', 'Mackay, QLD'
  ]

  const STEPS = [
    { id: 'loan-purpose', title: 'Loan Purpose', icon: Home },
    { id: 'applicant-type', title: 'Applicants', icon: Users },
    { id: 'income', title: 'Financial Details', icon: DollarSign },
    { id: 'first-home-buyer', title: 'First Home Buyer', icon: Home },
    { id: 'results', title: 'Results', icon: PiggyBank }
  ]

  const handleIncomeChange = (value) => {
    setIncome(value)
    updateFormData('income', value)
  }

  const handleIncome2Change = (value) => {
    setIncome2(value)
    updateFormData('income2', value)
  }

  const handleIncomeFrequencyChange = (frequency) => {
    setIncomeFrequency(frequency)
    updateFormData('incomeFrequency', frequency)
  }

  const handleFamilyStatusChange = (status) => {
    setFamilyStatus(status)
    updateFormData('familyStatus', status)
    if (status !== 'family') {
      setDependents(0)
      updateFormData('dependents', 0)
    }
  }

  const handleDependentsChange = (value) => {
    setDependents(value)
    updateFormData('dependents', value)
  }

  const handleSavingsChange = (value) => {
    setSavings(value)
    updateFormData('savings', value)
  }

  const handleSuburbSearch = (value) => {
    setSuburbSearch(value)
    setShowSuburbDropdown(value.length > 0)
  }

  const handleSuburbSelect = (selectedSuburb) => {
    setSuburb(selectedSuburb)
    setSuburbSearch(selectedSuburb)
    setShowSuburbDropdown(false)
    updateFormData('suburb', selectedSuburb)
  }

  const filteredSuburbs = australianSuburbs.filter(suburbName =>
    suburbName.toLowerCase().includes(suburbSearch.toLowerCase())
  )

  const calculateHEM = () => {
    if (!familyStatus || !suburb) return 0
    
    // Basic HEM calculation based on family status and dependents
    const baseHEM = {
      single: 2500,
      couple: 3500,
      family: 4500
    }
    
    const dependentCost = dependents * 800 // Additional cost per dependent
    const suburbMultiplier = suburb.includes('Sydney') || suburb.includes('Melbourne') ? 1.3 : 1.0
    
    return Math.round((baseHEM[familyStatus] + dependentCost) * suburbMultiplier)
  }

  const hemExpenses = calculateHEM()

  const canProceed = income && familyStatus && savings && suburb && (formData.applicantType === 'single' || income2)

  return (
    <div className="step income-step">
      <div className="top-stepper-panel">
        <ProgressStepper
          steps={STEPS}
          currentStep={2}
          onStepClick={() => {}} // Disabled for this step
        />
      </div>

      <div className="step-header">
        <h2>Tell us about your financial situation</h2>
        <p>This helps us calculate your realistic borrowing power</p>
      </div>
      
      <div className="income-form">
        {/* Annual Income Section */}
        <div className="form-section">
          <div className="section-header">
            <DollarSign size={20} />
            <h3>Annual Income</h3>
          </div>
          
          {/* Frequency Selection */}
          <div className="frequency-selection">
            <label>Income frequency:</label>
            <div className="frequency-buttons">
              <button 
                className={`frequency-btn ${incomeFrequency === 'annual' ? 'selected' : ''}`}
                onClick={() => handleIncomeFrequencyChange('annual')}
              >
                Annual
              </button>
              <button 
                className={`frequency-btn ${incomeFrequency === 'monthly' ? 'selected' : ''}`}
                onClick={() => handleIncomeFrequencyChange('monthly')}
              >
                Monthly
              </button>
            </div>
          </div>
          
          {/* Income Input(s) */}
          <div className="income-inputs">
            <div className="input-group">
              <label htmlFor="income">
                {formData.applicantType === 'joint' ? 'First applicant income:' : 'Your income:'}
              </label>
              <div className="currency-input">
                <span className="currency-symbol">$</span>
                <input
                  id="income"
                  type="number"
                  value={income}
                  onChange={(e) => handleIncomeChange(e.target.value)}
                  placeholder={`Enter ${incomeFrequency} amount`}
                  min="0"
                  step="1000"
                />
              </div>
            </div>
            
            {formData.applicantType === 'joint' && (
              <div className="input-group">
                <label htmlFor="income2">Second applicant income:</label>
                <div className="currency-input">
                  <span className="currency-symbol">$</span>
                  <input
                    id="income2"
                    type="number"
                    value={income2}
                    onChange={(e) => handleIncome2Change(e.target.value)}
                    placeholder={`Enter ${incomeFrequency} amount`}
                    min="0"
                    step="1000"
                  />
                </div>
              </div>
            )}
          </div>
          
          {/* Help Section */}
          <div className="help-section">
            <button 
              className="help-toggle"
              onClick={() => setShowHelp(!showHelp)}
            >
              <Info size={16} />
              What counts as income?
            </button>
            
            {showHelp && (
              <div className="help-content">
                <ul>
                  <li>Salary and wages (before tax)</li>
                  <li>Regular overtime and bonuses</li>
                  <li>Rental income (if applicable)</li>
                  <li>Investment income</li>
                  <li>Government benefits</li>
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Family Status Section */}
        <div className="form-section">
          <div className="section-header">
            <Users size={20} />
            <h3>Family Status</h3>
          </div>
          
          <div className="options-grid">
            {familyOptions.map((option) => (
              <div 
                key={option.id}
                className={`option-card ${familyStatus === option.id ? 'selected' : ''}`}
                onClick={() => handleFamilyStatusChange(option.id)}
              >
                <h4>{option.label}</h4>
                <p>{option.description}</p>
              </div>
            ))}
          </div>
          
          {familyStatus === 'family' && (
            <div className="dependents-input">
              <label htmlFor="dependents">Number of dependents</label>
              <div className="number-input">
                <button 
                  className="number-btn"
                  onClick={() => handleDependentsChange(Math.max(0, dependents - 1))}
                >
                  -
                </button>
                <input
                  id="dependents"
                  type="number"
                  value={dependents}
                  onChange={(e) => handleDependentsChange(parseInt(e.target.value) || 0)}
                  min="0"
                  max="10"
                />
                <button 
                  className="number-btn"
                  onClick={() => handleDependentsChange(Math.min(10, dependents + 1))}
                >
                  +
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Savings Section */}
        <div className="form-section">
          <div className="section-header">
            <PiggyBank size={20} />
            <h3>Savings & Deposit</h3>
          </div>
          
          <div className="input-group">
            <label htmlFor="savings">How much do you have saved for a deposit?</label>
            <div className="currency-input">
              <span className="currency-symbol">$</span>
              <input
                id="savings"
                type="number"
                value={savings}
                onChange={(e) => handleSavingsChange(e.target.value)}
                placeholder="Enter amount"
                min="0"
                step="1000"
              />
            </div>
          </div>
        </div>

        {/* Suburb Selection */}
        <div className="form-section">
          <div className="section-header">
            <MapPin size={20} />
            <h3>Where do you want to buy?</h3>
          </div>
          
          <div className="input-group">
            <label htmlFor="suburb">Search for your preferred suburb/city</label>
            <div className="searchable-dropdown">
              <div className="search-input-container">
                <Search size={16} className="search-icon" />
                <input
                  id="suburb"
                  type="text"
                  value={suburbSearch}
                  onChange={(e) => handleSuburbSearch(e.target.value)}
                  onFocus={() => setShowSuburbDropdown(true)}
                  placeholder="Type to search suburbs/cities..."
                />
              </div>
              
              {showSuburbDropdown && filteredSuburbs.length > 0 && (
                <div className="dropdown-options">
                  {filteredSuburbs.map((suburbName) => (
                    <div 
                      key={suburbName}
                      className="dropdown-option"
                      onClick={() => handleSuburbSelect(suburbName)}
                    >
                      {suburbName}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* HEM Expenses Display */}
        {hemExpenses > 0 && (
          <div className="hem-display">
            <div className="hem-card">
              <h4>Estimated Monthly Living Expenses (HEM)</h4>
              <div className="hem-amount">${hemExpenses.toLocaleString()}</div>
              <p className="hem-description">
                Based on {familyStatus} {familyStatus === 'family' && dependents > 0 && `with ${dependents} dependent${dependents > 1 ? 's' : ''}`} in {suburb}
              </p>
            </div>
          </div>
        )}

      </div>
      
      {canProceed && (
        <div className="step-footer">
          <button 
            className="btn btn-primary btn-large"
            onClick={onNext}
          >
            Continue
          </button>
        </div>
      )}
    </div>
  )
}

export default IncomeStep
