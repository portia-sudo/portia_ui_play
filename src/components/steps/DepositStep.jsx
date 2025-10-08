import { useState } from 'react'
import { PiggyBank, DollarSign, Info } from 'lucide-react'

function DepositStep({ formData, updateFormData, onNext, onBack }) {
  const [depositAmount, setDepositAmount] = useState(formData.depositAmount || '')

  const formatCurrency = (value) => {
    if (!value) return ''
    return value.replace(/[^\d]/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  }

  const parseCurrency = (value) => {
    return value.replace(/[^\d]/g, '')
  }

  const handleDepositChange = (value) => {
    const parsed = parseCurrency(value)
    setDepositAmount(parsed)
    updateFormData('depositAmount', parsed)
  }

  const handleContinue = () => {
    if (depositAmount && parseCurrency(depositAmount) > 0) {
      onNext()
    }
  }

  const canProceed = () => {
    return depositAmount && parseCurrency(depositAmount) > 0
  }

  return (
    <div className="step deposit-step">
      <div className="step-header">
        <h2>How much deposit do you have?</h2>
        <p>We can help you buy with as little as 2% deposit</p>
      </div>

      <div className="deposit-section">
        <div className="deposit-input-group">
          <label htmlFor="deposit">
            <PiggyBank size={20} className="label-icon" />
            Deposit amount
          </label>
          <div className="currency-input-large">
            <DollarSign size={24} className="currency-icon" />
            <input
              id="deposit"
              type="text"
              value={formatCurrency(depositAmount)}
              onChange={(e) => handleDepositChange(e.target.value)}
              placeholder="Enter your deposit amount"
              className="large-input"
            />
          </div>
        </div>

        <div className="deposit-info">
          <div className="info-card">
            <Info size={20} className="info-icon" />
            <div className="info-content">
              <h4>Low deposit options available</h4>
              <p>Sucasa can help you buy with as little as 2% deposit. This means you can get into your home sooner without needing to save for years.</p>
            </div>
          </div>
        </div>

        <div className="deposit-benefits">
          <h4>Benefits of our low deposit options:</h4>
          <ul>
            <li>Buy with just 2% deposit (minimum)</li>
            <li>No LMI (Lenders Mortgage Insurance) required</li>
            <li>Get into your home faster</li>
            <li>Competitive interest rates</li>
          </ul>
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

export default DepositStep

