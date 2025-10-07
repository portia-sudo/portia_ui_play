import { useState } from 'react'
import { DollarSign, Info } from 'lucide-react'

function IncomeStep({ formData, updateFormData, onNext }) {
  const [income, setIncome] = useState(formData.income || '')
  const [showHelp, setShowHelp] = useState(false)

  const handleIncomeChange = (value) => {
    setIncome(value)
    updateFormData('income', value)
  }

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-AU', {
      style: 'currency',
      currency: 'AUD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value)
  }

  const getSmartDefaults = () => {
    const defaults = {
      single: { min: 50000, max: 150000, suggested: 75000 },
      joint: { min: 80000, max: 250000, suggested: 120000 }
    }
    return defaults[formData.applicantType] || defaults.single
  }

  const smartDefaults = getSmartDefaults()

  return (
    <div className="step income-step">
      <div className="step-header">
        <h2>What's your {formData.applicantType === 'joint' ? 'combined' : 'annual'} income?</h2>
        <p>Include salary, wages, and regular income sources</p>
      </div>
      
      <div className="input-section">
        <div className="input-group">
          <label htmlFor="income">Annual Income</label>
          <div className="currency-input">
            <span className="currency-symbol">$</span>
            <input
              id="income"
              type="number"
              value={income}
              onChange={(e) => handleIncomeChange(e.target.value)}
              placeholder="Enter amount"
              min="0"
              step="1000"
            />
          </div>
        </div>
        
        <div className="smart-defaults">
          <p className="defaults-label">Typical range for {formData.applicantType === 'joint' ? 'joint applicants' : 'single applicants'}:</p>
          <div className="default-buttons">
            <button 
              className="default-btn"
              onClick={() => handleIncomeChange(smartDefaults.min)}
            >
              ${smartDefaults.min.toLocaleString()}
            </button>
            <button 
              className="default-btn primary"
              onClick={() => handleIncomeChange(smartDefaults.suggested)}
            >
              ${smartDefaults.suggested.toLocaleString()}
            </button>
            <button 
              className="default-btn"
              onClick={() => handleIncomeChange(smartDefaults.max)}
            >
              ${smartDefaults.max.toLocaleString()}
            </button>
          </div>
        </div>
        
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
      
      {income && (
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
