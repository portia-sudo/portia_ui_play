import { useState } from 'react'
import { DollarSign, PiggyBank, Home } from 'lucide-react'

function DepositDetailsStep({ formData, updateFormData, onNext, onBack }) {
  const [depositAmount, setDepositAmount] = useState(formData.depositAmount || '')
  const [hasExistingProperty, setHasExistingProperty] = useState(formData.hasExistingProperty || false)
  const [equityAmount, setEquityAmount] = useState(formData.equityAmount || '')

  const handleDepositChange = (value) => {
    setDepositAmount(value)
    updateFormData('depositAmount', value)
  }

  const handleExistingPropertyChange = (hasProperty) => {
    setHasExistingProperty(hasProperty)
    updateFormData('hasExistingProperty', hasProperty)
    if (!hasProperty) {
      setEquityAmount('')
      updateFormData('equityAmount', '')
    }
  }

  const handleEquityChange = (value) => {
    setEquityAmount(value)
    updateFormData('equityAmount', value)
  }


  const canProceed = depositAmount && (!hasExistingProperty || equityAmount)

  return (
    <div className="step deposit-details-step">
      <div className="step-header">
        <h2>Tell us about your deposit</h2>
        <p>This helps us calculate your borrowing power and loan options</p>
      </div>

      <div className="deposit-details-content">
        {/* Deposit Amount */}
        <div className="form-section">
          <div className="section-header">
            <PiggyBank size={20} className="section-icon" />
            <h3>Deposit Amount</h3>
          </div>
          
          <div className="deposit-info-box">
            <div className="info-header">
              <DollarSign size={20} className="info-icon" />
              <h4>Minimum Deposit Requirement</h4>
            </div>
            <p>
              You will need to provide us with a minimum <strong>2% deposit</strong> of the purchase price of the property to secure your loan.
            </p>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label htmlFor="deposit-amount" style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>
              How much do you have for a deposit?
            </label>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '20px', fontWeight: 'bold' }}>$</span>
              <input
                type="text"
                id="deposit-amount"
                value={depositAmount}
                onChange={(e) => {
                  console.log('Deposit input changed:', e.target.value)
                  setDepositAmount(e.target.value)
                  updateFormData('depositAmount', e.target.value)
                }}
                placeholder="0"
                style={{ 
                  border: '2px solid #000', 
                  padding: '16px', 
                  fontSize: '18px',
                  background: '#fff',
                  color: '#000',
                  flex: '1',
                  borderRadius: '0'
                }}
              />
            </div>
            <p className="help-text">
              Enter the amount you have available for a deposit. This can include savings, gifts, or equity from existing property.
            </p>
          </div>
        </div>

        {/* Equity from Existing Property */}
        <div className="form-section">
          <div className="section-header">
            <Home size={20} className="section-icon" />
            <h3>Equity from Existing Property</h3>
          </div>
          
          <div className="equity-question">
            <h4>Do you own any property that could contribute equity to your deposit?</h4>
            <div className="yes-no-options">
              <button 
                className={`yes-no-btn ${hasExistingProperty === true ? 'selected' : ''}`}
                onClick={() => handleExistingPropertyChange(true)}
              >
                Yes
              </button>
              <button 
                className={`yes-no-btn ${hasExistingProperty === false ? 'selected' : ''}`}
                onClick={() => handleExistingPropertyChange(false)}
              >
                No
              </button>
            </div>
          </div>

          {hasExistingProperty && (
            <div className="equity-amount-section">
              <label htmlFor="equity-amount">
                <DollarSign size={16} className="label-icon" />
                How much equity can you access?
              </label>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '20px', fontWeight: 'bold' }}>$</span>
                <input
                  type="text"
                  id="equity-amount"
                  value={equityAmount}
                  onChange={(e) => {
                    console.log('Equity input changed:', e.target.value)
                    setEquityAmount(e.target.value)
                    updateFormData('equityAmount', e.target.value)
                  }}
                  placeholder="0"
                  style={{ 
                    border: '2px solid #000', 
                    padding: '16px', 
                    fontSize: '18px',
                    background: '#fff',
                    color: '#000',
                    flex: '1',
                    borderRadius: '0'
                  }}
                />
              </div>
              <p className="help-text">
                This is the equity you can release from your existing property to use as part of your deposit.
              </p>
            </div>
          )}
        </div>

        {/* Deposit Summary */}
        {(depositAmount || equityAmount) && (
          <div className="deposit-summary">
            <h4>Your Total Deposit Sources:</h4>
            <div className="deposit-breakdown">
              {depositAmount && (
                <div className="deposit-item">
                  <span className="deposit-label">Savings/Cash:</span>
                  <span className="deposit-value">${depositAmount}</span>
                </div>
              )}
              {equityAmount && (
                <div className="deposit-item">
                  <span className="deposit-label">Property Equity:</span>
                  <span className="deposit-value">${equityAmount}</span>
                </div>
              )}
              <div className="deposit-total">
                <span className="deposit-label">Total Available:</span>
                <span className="deposit-value">
                  ${(parseFloat(depositAmount) || 0) + (parseFloat(equityAmount) || 0)}
                </span>
              </div>
            </div>
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

export default DepositDetailsStep
