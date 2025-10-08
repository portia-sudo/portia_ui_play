import { useState } from 'react'
import { DollarSign, Target, PiggyBank, TrendingUp } from 'lucide-react'

function TailorSolutionStep({ formData, updateFormData, onNext }) {
  const [idealPurchasePrice, setIdealPurchasePrice] = useState(formData.idealPurchasePrice || '')
  const [targetMonthlyRepayment, setTargetMonthlyRepayment] = useState(formData.targetMonthlyRepayment || '')
  const [plannedDeposit, setPlannedDeposit] = useState(formData.plannedDeposit || '')
  const [monthlySavings, setMonthlySavings] = useState(formData.monthlySavings || '')

  const handlePurchasePriceChange = (value) => {
    setIdealPurchasePrice(value)
    updateFormData('idealPurchasePrice', value)
  }

  const handleMonthlyRepaymentChange = (value) => {
    setTargetMonthlyRepayment(value)
    updateFormData('targetMonthlyRepayment', value)
  }

  const handleDepositChange = (value) => {
    setPlannedDeposit(value)
    updateFormData('plannedDeposit', value)
  }

  const handleSavingsChange = (value) => {
    setMonthlySavings(value)
    updateFormData('monthlySavings', value)
  }

  const formatCurrency = (value) => {
    if (!value) return ''
    const numValue = parseFloat(value.replace(/[^\d]/g, ''))
    if (isNaN(numValue)) return ''
    return numValue.toLocaleString()
  }

  const canProceed = idealPurchasePrice && targetMonthlyRepayment && plannedDeposit && monthlySavings

  return (
    <div className="step tailor-solution-step">
      <div className="step-header">
        <h2>Help us tailor your solution</h2>
        <p>Tell us about your ideal property and financial goals so we can create the perfect loan for you</p>
      </div>

      <div className="tailor-content">
        <div className="tailor-intro">
          <div className="intro-icon">
            <Target size={32} />
          </div>
          <h3>Your Property Goals</h3>
          <p>We'll use this information to customize your loan options and ensure you get the best possible outcome.</p>
        </div>

        <div className="tailor-fields">
          <div className="tailor-field-group">
            <div className="field-header">
              <DollarSign size={20} className="field-icon" />
              <label htmlFor="purchase-price">
                <h4>Ideal Purchase Price Range</h4>
                <p>What's your target property price?</p>
              </label>
            </div>
            <div className="currency-input-large">
              <DollarSign size={24} className="currency-icon" />
              <input
                type="text"
                id="purchase-price"
                value={formatCurrency(idealPurchasePrice)}
                onChange={(e) => handlePurchasePriceChange(e.target.value)}
                placeholder="0"
                className="large-input"
              />
            </div>
          </div>

          <div className="tailor-field-group">
            <div className="field-header">
              <TrendingUp size={20} className="field-icon" />
              <label htmlFor="monthly-repayment">
                <h4>Target Monthly Repayment</h4>
                <p>What monthly repayment are you comfortable with?</p>
              </label>
            </div>
            <div className="currency-input-large">
              <DollarSign size={24} className="currency-icon" />
              <input
                type="text"
                id="monthly-repayment"
                value={formatCurrency(targetMonthlyRepayment)}
                onChange={(e) => handleMonthlyRepaymentChange(e.target.value)}
                placeholder="0"
                className="large-input"
              />
            </div>
          </div>

          <div className="tailor-field-group">
            <div className="field-header">
              <PiggyBank size={20} className="field-icon" />
              <label htmlFor="planned-deposit">
                <h4>Planned Deposit (including stamp duty & fees)</h4>
                <p>Total amount you have available for deposit and costs</p>
              </label>
            </div>
            <div className="currency-input-large">
              <DollarSign size={24} className="currency-icon" />
              <input
                type="text"
                id="planned-deposit"
                value={formatCurrency(plannedDeposit)}
                onChange={(e) => handleDepositChange(e.target.value)}
                placeholder="0"
                className="large-input"
              />
            </div>
          </div>

          <div className="tailor-field-group">
            <div className="field-header">
              <TrendingUp size={20} className="field-icon" />
              <label htmlFor="monthly-savings">
                <h4>Monthly Savings Contribution</h4>
                <p>How much can you save each month towards your deposit?</p>
              </label>
            </div>
            <div className="currency-input-large">
              <DollarSign size={24} className="currency-icon" />
              <input
                type="text"
                id="monthly-savings"
                value={formatCurrency(monthlySavings)}
                onChange={(e) => handleSavingsChange(e.target.value)}
                placeholder="0"
                className="large-input"
              />
            </div>
          </div>
        </div>

        <div className="tailor-benefits">
          <h4>What we'll do with this information:</h4>
          <ul>
            <li>Calculate your maximum borrowing power</li>
            <li>Find loan products that match your budget</li>
            <li>Optimize your deposit strategy</li>
            <li>Create a personalized timeline to your goals</li>
          </ul>
        </div>
      </div>

      <div className="step-actions">
        <button 
          className="btn btn-primary btn-large"
          onClick={onNext}
          disabled={!canProceed}
        >
          Create My Tailored Solution
        </button>
      </div>
    </div>
  )
}

export default TailorSolutionStep

