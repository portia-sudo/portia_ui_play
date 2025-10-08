import { useState } from 'react'
import { DollarSign, Info } from 'lucide-react'

function PurchasingPowerDepositStep({ formData, updateFormData, onNext, onBack }) {
  const [depositAmount, setDepositAmount] = useState(formData.depositAmount || '')
  const [showInfo, setShowInfo] = useState(false)

  const handleDepositChange = (value) => {
    setDepositAmount(value)
    updateFormData('depositAmount', value)
  }

  const formatCurrency = (value) => {
    if (!value) return ''
    const numValue = parseFloat(value.replace(/[^\d]/g, ''))
    if (isNaN(numValue)) return ''
    return numValue.toLocaleString()
  }

  const canProceed = depositAmount && parseFloat(depositAmount.replace(/[^\d]/g, '')) > 0

  return (
    <div className="step deposit-step">
      <div className="step-header">
        <h2>How much would you like to deposit?</h2>
        <p>This helps us calculate your borrowing power and loan options</p>
      </div>

      <div className="deposit-section">
        <div className="deposit-info-box">
          <div className="info-header">
            <Info size={20} className="info-icon" />
            <h3>Minimum Deposit Requirement</h3>
          </div>
          <p>
            You will need to provide us with an offer of at least <strong>2% of the purchase price</strong> of the property. 
            This is our minimum deposit requirement to secure your loan.
          </p>
        </div>

        <div className="deposit-input-group">
          <label htmlFor="deposit-amount">
            <DollarSign size={16} className="label-icon" />
            Deposit Amount
          </label>
          <div className="currency-input-large">
            <DollarSign size={24} className="currency-icon" />
            <input
              type="text"
              id="deposit-amount"
              value={formatCurrency(depositAmount)}
              onChange={(e) => handleDepositChange(e.target.value)}
              placeholder="0"
              className="large-input"
            />
          </div>
          <p className="help-text">
            Enter the amount you have available for a deposit. Round numbers are fine — you can refine this later.
          </p>
        </div>

        <div className="deposit-benefits">
          <h4>Benefits of a larger deposit:</h4>
          <ul>
            <li>Lower monthly repayments</li>
            <li>Better interest rates</li>
            <li>Reduced loan insurance costs</li>
            <li>More borrowing power</li>
          </ul>
        </div>

        {depositAmount && (
          <div className="deposit-preview">
            <h4>Your Deposit:</h4>
            <div className="deposit-amount-display">
              ${formatCurrency(depositAmount)}
            </div>
            <p className="deposit-note">
              This represents {depositAmount ? (parseFloat(depositAmount.replace(/[^\d]/g, '')) / 1000000 * 100).toFixed(1) : '0'}% of a $1M property purchase
            </p>
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
          onClick={onNext}
          disabled={!canProceed}
        >
          Continue
        </button>
      </div>
    </div>
  )
}

export default PurchasingPowerDepositStep

