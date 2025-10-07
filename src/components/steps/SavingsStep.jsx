import { useState } from 'react'
import { PiggyBank, Gift, Info } from 'lucide-react'

function SavingsStep({ formData, updateFormData, onNext }) {
  const [savings, setSavings] = useState(formData.savings || '')
  const [deposit, setDeposit] = useState(formData.deposit || '')
  const [giftMoney, setGiftMoney] = useState(formData.giftMoney || false)
  const [giftAmount, setGiftAmount] = useState(formData.giftAmount || '')
  const [showHelp, setShowHelp] = useState(false)

  const handleSavingsChange = (value) => {
    setSavings(value)
    updateFormData('savings', value)
  }

  const handleDepositChange = (value) => {
    setDeposit(value)
    updateFormData('deposit', value)
  }

  const handleGiftToggle = (value) => {
    setGiftMoney(value)
    updateFormData('giftMoney', value)
    if (!value) {
      setGiftAmount('')
      updateFormData('giftAmount', 0)
    }
  }

  const handleGiftAmountChange = (value) => {
    setGiftAmount(value)
    updateFormData('giftAmount', value)
  }

  const getSmartDefaults = () => {
    const income = parseInt(formData.income) || 0
    const typicalSavings = Math.round(income * 0.15) // 15% of income
    const typicalDeposit = Math.round(income * 0.2) // 20% of income
    
    return {
      savings: { min: Math.round(typicalSavings * 0.5), max: Math.round(typicalSavings * 2), suggested: typicalSavings },
      deposit: { min: Math.round(typicalDeposit * 0.5), max: Math.round(typicalDeposit * 2), suggested: typicalDeposit }
    }
  }

  const smartDefaults = getSmartDefaults()

  return (
    <div className="step savings-step">
      <div className="step-header">
        <h2>What savings do you have?</h2>
        <p>Include your deposit and any additional savings</p>
      </div>
      
      <div className="input-section">
        <div className="input-group">
          <label htmlFor="savings">Total Savings</label>
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
        
        <div className="smart-defaults">
          <p className="defaults-label">Typical savings range:</p>
          <div className="default-buttons">
            <button 
              className="default-btn"
              onClick={() => handleSavingsChange(smartDefaults.savings.min)}
            >
              ${smartDefaults.savings.min.toLocaleString()}
            </button>
            <button 
              className="default-btn primary"
              onClick={() => handleSavingsChange(smartDefaults.savings.suggested)}
            >
              ${smartDefaults.savings.suggested.toLocaleString()}
            </button>
            <button 
              className="default-btn"
              onClick={() => handleSavingsChange(smartDefaults.savings.max)}
            >
              ${smartDefaults.savings.max.toLocaleString()}
            </button>
          </div>
        </div>
        
        <div className="input-group">
          <label htmlFor="deposit">Deposit Amount</label>
          <div className="currency-input">
            <span className="currency-symbol">$</span>
            <input
              id="deposit"
              type="number"
              value={deposit}
              onChange={(e) => handleDepositChange(e.target.value)}
              placeholder="Enter deposit amount"
              min="0"
              step="1000"
            />
          </div>
        </div>
        
        <div className="gift-section">
          <div className="checkbox-group">
            <input
              type="checkbox"
              id="giftMoney"
              checked={giftMoney}
              onChange={(e) => handleGiftToggle(e.target.checked)}
            />
            <label htmlFor="giftMoney">
              <Gift size={16} />
              Some of this money is a gift from family
            </label>
          </div>
          
          {giftMoney && (
            <div className="input-group">
              <label htmlFor="giftAmount">Gift Amount</label>
              <div className="currency-input">
                <span className="currency-symbol">$</span>
                <input
                  id="giftAmount"
                  type="number"
                  value={giftAmount}
                  onChange={(e) => handleGiftAmountChange(e.target.value)}
                  placeholder="Enter gift amount"
                  min="0"
                  step="1000"
                />
              </div>
            </div>
          )}
        </div>
        
        <div className="help-section">
          <button 
            className="help-toggle"
            onClick={() => setShowHelp(!showHelp)}
          >
            <Info size={16} />
            What counts as savings?
          </button>
          
          {showHelp && (
            <div className="help-content">
              <ul>
                <li>Cash in bank accounts</li>
                <li>Term deposits</li>
                <li>Shares and investments</li>
                <li>Gift money from family</li>
                <li>First Home Super Saver Scheme</li>
                <li>Equity from existing property</li>
              </ul>
            </div>
          )}
        </div>
      </div>
      
      {savings && deposit && (
        <div className="step-footer">
          <button 
            className="btn btn-primary btn-large"
            onClick={onNext}
          >
            Calculate My Borrowing Power
          </button>
        </div>
      )}
    </div>
  )
}

export default SavingsStep
