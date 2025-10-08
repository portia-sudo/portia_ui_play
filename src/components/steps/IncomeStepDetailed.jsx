import { useState } from 'react'
import { DollarSign, Calendar } from 'lucide-react'

function IncomeStepDetailed({ formData, updateFormData, onNext, onBack }) {
  const [incomes, setIncomes] = useState(formData.incomes || [''])
  const [incomeFrequencies, setIncomeFrequencies] = useState(formData.incomeFrequencies || ['annual'])
  const [expenses, setExpenses] = useState(formData.expenses || '')
  const [expenseFrequency, setExpenseFrequency] = useState(formData.expenseFrequency || 'weekly')

  const adults = formData.adults || 1
  const secondApplicantOnLoan = formData.secondApplicantOnLoan || false
  const numApplicants = secondApplicantOnLoan ? 2 : 1

  // Update incomes array when adults change
  useState(() => {
    if (incomes.length !== numApplicants) {
      const newIncomes = []
      const newFrequencies = []
      
      for (let i = 0; i < numApplicants; i++) {
        newIncomes.push(incomes[i] || '')
        newFrequencies.push(incomeFrequencies[i] || 'annual')
      }
      
      setIncomes(newIncomes)
      setIncomeFrequencies(newFrequencies)
      updateFormData('incomes', newIncomes)
      updateFormData('incomeFrequencies', newFrequencies)
    }
  }, [adults, secondApplicantOnLoan])

  const handleIncomeChange = (index, value) => {
    const newIncomes = [...incomes]
    newIncomes[index] = value
    setIncomes(newIncomes)
    updateFormData('incomes', newIncomes)
  }

  const handleFrequencyChange = (index, frequency) => {
    const newFrequencies = [...incomeFrequencies]
    newFrequencies[index] = frequency
    setIncomeFrequencies(newFrequencies)
    updateFormData('incomeFrequencies', newFrequencies)
  }

  const handleExpenseChange = (value) => {
    setExpenses(value)
    updateFormData('expenses', value)
  }

  const handleExpenseFrequencyChange = (frequency) => {
    setExpenseFrequency(frequency)
    updateFormData('expenseFrequency', frequency)
  }

  const formatCurrency = (value) => {
    if (!value) return ''
    return value.replace(/[^\d]/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  }

  const parseCurrency = (value) => {
    return value.replace(/[^\d]/g, '')
  }

  const handleContinue = () => {
    // Validate that all applicant incomes are filled
    const allIncomesFilled = incomes.slice(0, numApplicants).every(income => income && parseCurrency(income) > 0)
    
    if (allIncomesFilled) {
      onNext()
    }
  }

  const canProceed = () => {
    return incomes.slice(0, numApplicants).every(income => income && parseCurrency(income) > 0)
  }

  return (
    <div className="step income-step-detailed">
      <div className="step-header">
        <h2>Tell us about your income and expenses</h2>
        <p>This helps us calculate how much you can afford to borrow</p>
      </div>

      {/* Income Section */}
      <div className="income-section">
        <h3>Income</h3>
        {incomes.slice(0, numApplicants).map((income, index) => (
          <div key={index} className="income-input-group">
            <label htmlFor={`income-${index}`}>
              {index === 0 ? 'Your income' : `Second applicant's income`}
            </label>
            <div className="income-input-row">
              <div className="currency-input">
                <DollarSign size={20} className="currency-icon" />
                <input
                  id={`income-${index}`}
                  type="text"
                  value={formatCurrency(income)}
                  onChange={(e) => handleIncomeChange(index, parseCurrency(e.target.value))}
                  placeholder="Enter amount"
                />
              </div>
              <div className="frequency-selector">
                <Calendar size={16} className="frequency-icon" />
                <select
                  value={incomeFrequencies[index]}
                  onChange={(e) => handleFrequencyChange(index, e.target.value)}
                >
                  <option value="weekly">Weekly</option>
                  <option value="fortnightly">Fortnightly</option>
                  <option value="monthly">Monthly</option>
                  <option value="annual">Annual</option>
                </select>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Expenses Section */}
      <div className="expenses-section">
        <h3>Weekly expenses</h3>
        <div className="expenses-input-group">
          <label htmlFor="expenses">How much do you typically spend per week?</label>
          <div className="expenses-input-row">
            <div className="currency-input">
              <DollarSign size={20} className="currency-icon" />
              <input
                id="expenses"
                type="text"
                value={formatCurrency(expenses)}
                onChange={(e) => handleExpenseChange(parseCurrency(e.target.value))}
                placeholder="Enter weekly expenses"
              />
            </div>
            <div className="frequency-selector">
              <Calendar size={16} className="frequency-icon" />
              <select
                value={expenseFrequency}
                onChange={(e) => handleExpenseFrequencyChange(e.target.value)}
              >
                <option value="weekly">Weekly</option>
                <option value="fortnightly">Fortnightly</option>
                <option value="monthly">Monthly</option>
                <option value="annual">Annual</option>
              </select>
            </div>
          </div>
          <p className="help-text">
            Include groceries, utilities, transport, entertainment, and other regular expenses.
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
          className={`btn btn-primary btn-large ${!canProceed() ? 'disabled' : ''}`}
          onClick={handleContinue}
          disabled={!canProceed()}
        >
          Continue
        </button>
      </div>
    </div>
  )
}

export default IncomeStepDetailed

