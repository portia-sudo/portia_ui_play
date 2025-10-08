import { useState, useEffect } from 'react'
import { DollarSign, Users, Minus, Plus } from 'lucide-react'

function PurchasingPowerIncomeStep({ formData, updateFormData, onNext, onBack }) {
  const [applicantType, setApplicantType] = useState(formData.applicantType || '')
  const [incomes, setIncomes] = useState(formData.incomes || [''])
  const [incomeFrequencies, setIncomeFrequencies] = useState(formData.incomeFrequencies || ['annual'])
  const [expenses, setExpenses] = useState(formData.expenses || '')
  const [expenseFrequency, setExpenseFrequency] = useState(formData.expenseFrequency || 'weekly')
  const [dependants, setDependants] = useState(formData.dependants || 0)

  const handleApplicantTypeChange = (type) => {
    setApplicantType(type)
    updateFormData('applicantType', type)
    
    // Adjust income fields based on applicant type
    if (type === 'single') {
      setIncomes([''])
      setIncomeFrequencies(['annual'])
    } else if (type === 'joint') {
      setIncomes(['', ''])
      setIncomeFrequencies(['annual', 'annual'])
    }
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

  const handleDependantsChange = (newValue) => {
    const value = Math.max(0, Math.min(10, newValue))
    setDependants(value)
    updateFormData('dependants', value)
  }

  const formatCurrency = (value) => {
    if (!value) return ''
    const numValue = parseFloat(value.replace(/[^\d]/g, ''))
    if (isNaN(numValue)) return ''
    return numValue.toLocaleString()
  }

  const canProceed = applicantType && incomes.every(income => income && income !== '') && expenses

  return (
    <div className="step income-step">
      <div className="step-header">
        <h2>Tell us about your income and expenses</h2>
        <p>This helps us calculate your borrowing power accurately</p>
      </div>

      <div className="income-section">
        <div className="applicant-type-section">
          <h3>Are you applying alone or with someone?</h3>
          <div className="applicant-type-options">
            <button 
              className={`applicant-type-btn ${applicantType === 'single' ? 'selected' : ''}`}
              onClick={() => handleApplicantTypeChange('single')}
            >
              <h4>Single Applicant</h4>
              <p>Just me</p>
            </button>
            <button 
              className={`applicant-type-btn ${applicantType === 'joint' ? 'selected' : ''}`}
              onClick={() => handleApplicantTypeChange('joint')}
            >
              <h4>Joint Application</h4>
              <p>Two of us</p>
            </button>
          </div>
        </div>

        {applicantType && (
          <div className="income-details-section">
            <h3>Income Details</h3>
            {incomes.map((income, index) => (
              <div key={index} className="income-input-group">
                <label htmlFor={`income-${index}`}>
                  {applicantType === 'joint' ? `Applicant ${index + 1} Income` : 'Your Income'} (before tax)
                </label>
                <div className="currency-input">
                  <DollarSign size={20} className="currency-icon" />
                  <input
                    type="text"
                    id={`income-${index}`}
                    value={formatCurrency(income)}
                    onChange={(e) => handleIncomeChange(index, e.target.value)}
                    placeholder="0"
                  />
                  <select 
                    value={incomeFrequencies[index]}
                    onChange={(e) => handleIncomeFrequencyChange(index, e.target.value)}
                    className="frequency-selector"
                  >
                    <option value="annual">per year</option>
                    <option value="monthly">per month</option>
                    <option value="weekly">per week</option>
                  </select>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="expenses-section">
          <h3>Weekly Expenses</h3>
          <div className="expense-input-group">
            <label htmlFor="expenses">
              What are your weekly expenses?
            </label>
            <div className="currency-input">
              <DollarSign size={20} className="currency-icon" />
              <input
                type="text"
                id="expenses"
                value={formatCurrency(expenses)}
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

        <div className="dependants-section">
          <h3>Dependants</h3>
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
            Include children under 18 who live with you and depend on you financially
          </p>
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

export default PurchasingPowerIncomeStep

