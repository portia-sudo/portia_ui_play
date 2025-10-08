import { useState } from 'react'
import { Users, Heart, Minus, Plus, DollarSign } from 'lucide-react'

function PersonalDetailsStep({ formData, updateFormData, onNext, onBack }) {
  const [relationshipStatus, setRelationshipStatus] = useState(formData.relationshipStatus || '')
  const [dependants, setDependants] = useState(formData.dependants || 0)
  const [incomes, setIncomes] = useState(formData.incomes || [''])
  const [incomeFrequencies, setIncomeFrequencies] = useState(formData.incomeFrequencies || ['annual'])
  const [expenses, setExpenses] = useState(formData.expenses || '')
  const [expenseFrequency, setExpenseFrequency] = useState(formData.expenseFrequency || 'weekly')

  const handleRelationshipChange = (status) => {
    setRelationshipStatus(status)
    updateFormData('relationshipStatus', status)
  }

  const handleDependantsChange = (newValue) => {
    const value = Math.max(0, Math.min(10, newValue))
    setDependants(value)
    updateFormData('dependants', value)
  }

  const handleIncomeChange = (index, value) => {
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
    setExpenses(value)
    updateFormData('expenses', value)
  }

  const handleExpenseFrequencyChange = (frequency) => {
    setExpenseFrequency(frequency)
    updateFormData('expenseFrequency', frequency)
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

  const canProceed = relationshipStatus && 
    (formData.applicantType === 'single' ? (incomes[0] && incomes[0] !== '') : 
     (incomes[0] && incomes[0] !== '' && incomes[1] && incomes[1] !== '')) && 
    expenses

  return (
    <div className="step personal-details-step">
      <div className="step-header">
        <h2>Tell us about your personal situation</h2>
        <p>This helps us calculate your borrowing power accurately</p>
      </div>

      <div className="personal-details-content">
        {/* Relationship Status */}
        <div className="form-section">
          <div className="section-header">
            <Heart size={20} className="section-icon" />
            <h3>Relationship Status</h3>
          </div>
          <div className="options-grid-small">
            <button 
              className={`option-btn ${relationshipStatus === 'single' ? 'selected' : ''}`}
              onClick={() => handleRelationshipChange('single')}
            >
              Single
            </button>
            <button 
              className={`option-btn ${relationshipStatus === 'married' ? 'selected' : ''}`}
              onClick={() => handleRelationshipChange('married')}
            >
              Married
            </button>
            <button 
              className={`option-btn ${relationshipStatus === 'defacto' ? 'selected' : ''}`}
              onClick={() => handleRelationshipChange('defacto')}
            >
              De Facto
            </button>
            <button 
              className={`option-btn ${relationshipStatus === 'divorced' ? 'selected' : ''}`}
              onClick={() => handleRelationshipChange('divorced')}
            >
              Divorced
            </button>
            <button 
              className={`option-btn ${relationshipStatus === 'separated' ? 'selected' : ''}`}
              onClick={() => handleRelationshipChange('separated')}
            >
              Separated
            </button>
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

        {/* Income Details */}
        <div className="form-section">
          <div className="section-header">
            <DollarSign size={20} className="section-icon" />
            <h3>Income Details</h3>
          </div>
          
          {/* Single Applicant Income */}
          {formData.applicantType === 'single' && (
            <div className="income-input-group">
              <label htmlFor="income-0">
                Your Income (before tax)
              </label>
              <div className="currency-input">
                <DollarSign size={20} className="currency-icon" />
                <input
                  type="text"
                  id="income-0"
                  value={incomes[0] || ''}
                  onChange={(e) => handleIncomeChange(0, e.target.value)}
                  placeholder="0"
                />
                <select 
                  value={incomeFrequencies[0] || 'annual'}
                  onChange={(e) => handleIncomeFrequencyChange(0, e.target.value)}
                  className="frequency-selector"
                >
                  <option value="annual">per year</option>
                  <option value="monthly">per month</option>
                  <option value="weekly">per week</option>
                </select>
              </div>
            </div>
          )}
          
          {/* Joint Applicant Incomes */}
          {formData.applicantType === 'joint' && (
            <>
              <div className="income-input-group">
                <label htmlFor="income-0">
                  Applicant 1 Income (before tax)
                </label>
                <div className="currency-input">
                  <DollarSign size={20} className="currency-icon" />
                  <input
                    type="text"
                    id="income-0"
                    value={incomes[0] || ''}
                    onChange={(e) => handleIncomeChange(0, e.target.value)}
                    placeholder="0"
                  />
                  <select 
                    value={incomeFrequencies[0] || 'annual'}
                    onChange={(e) => handleIncomeFrequencyChange(0, e.target.value)}
                    className="frequency-selector"
                  >
                    <option value="annual">per year</option>
                    <option value="monthly">per month</option>
                    <option value="weekly">per week</option>
                  </select>
                </div>
              </div>
              
              <div className="income-input-group">
                <label htmlFor="income-1">
                  Applicant 2 Income (before tax)
                </label>
                <div className="currency-input">
                  <DollarSign size={20} className="currency-icon" />
                  <input
                    type="text"
                    id="income-1"
                    value={incomes[1] || ''}
                    onChange={(e) => handleIncomeChange(1, e.target.value)}
                    placeholder="0"
                  />
                  <select 
                    value={incomeFrequencies[1] || 'annual'}
                    onChange={(e) => handleIncomeFrequencyChange(1, e.target.value)}
                    className="frequency-selector"
                  >
                    <option value="annual">per year</option>
                    <option value="monthly">per month</option>
                    <option value="weekly">per week</option>
                  </select>
                </div>
              </div>
            </>
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
            <div className="currency-input">
              <DollarSign size={20} className="currency-icon" />
              <input
                type="text"
                id="expenses"
                value={expenses}
                onChange={(e) => handleExpensesChange(e.target.value)}
                placeholder="0"
              />
              <select 
                value={expenseFrequency}
                onChange={(e) => handleExpenseFrequencyChange(e.target.value)}
                className="frequency-selector"
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

export default PersonalDetailsStep
