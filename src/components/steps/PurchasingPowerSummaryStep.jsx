import { useState } from 'react'
import { Calculator, UserPlus, TrendingUp, Shield, Clock } from 'lucide-react'

function PurchasingPowerSummaryStep({ formData, updateFormData, onNext, onBack }) {
  const [showFHBComparison, setShowFHBComparison] = useState(false)

  // Mock calculations - replace with real calculations
  const calculatePurchasingPower = () => {
    const totalIncome = formData.incomes.reduce((sum, income) => {
      const numIncome = parseFloat(income.replace(/[^\d]/g, '')) || 0
      return sum + numIncome
    }, 0)

    // Simple calculation - in reality this would be much more complex
    const purchasingPower = totalIncome * 6 // 6x income multiplier
    return purchasingPower
  }

  const purchasingPower = calculatePurchasingPower()
  const depositAmount = parseFloat(formData.depositAmount.replace(/[^\d]/g, '')) || 0
  const maxLoanAmount = purchasingPower - depositAmount


  const handleStartAccount = () => {
    // Start account creation process
    console.log('Starting account creation process')
    // In a real app, this would navigate to account creation
  }

  return (
    <div className="step summary-step">
      <div className="step-header">
        <h2>Your Purchasing Power</h2>
        <p>Based on your information, here's what you can afford</p>
      </div>

      <div className="summary-content">
        {/* Main Purchasing Power Display */}
        <div className="purchasing-power-card">
          <div className="power-header">
            <Calculator size={32} className="power-icon" />
            <h3>Maximum Purchase Price</h3>
          </div>
          <div className="power-amount">
            ${purchasingPower.toLocaleString()}
          </div>
          <div className="power-breakdown">
            <div className="breakdown-item">
              <span className="label">Your Deposit:</span>
              <span className="value">${depositAmount.toLocaleString()}</span>
            </div>
            <div className="breakdown-item">
              <span className="label">Maximum Loan:</span>
              <span className="value">${maxLoanAmount.toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* First Home Buyer Comparison - Only show if first home buyer */}
        {formData.loanPurpose === 'first-home' && (
          <div className="fhb-comparison-card">
            <div className="comparison-header">
              <TrendingUp size={24} className="comparison-icon" />
              <h3>How Sucasa Compares to the First Home Buyer Scheme</h3>
            </div>
            <div className="comparison-content">
              <div className="comparison-points">
                <div className="comparison-point">
                  <div className="point-header">
                    <h4>Higher Purchase Limits</h4>
                    <span className="point-badge">Sucasa Advantage</span>
                  </div>
                  <p>While the FHB scheme has purchase price limits, Sucasa can offer loans for properties up to <strong>$3+ million</strong></p>
                </div>
                
                <div className="comparison-point">
                  <div className="point-header">
                    <h4>98% LVR Available</h4>
                    <span className="point-badge">Sucasa Advantage</span>
                  </div>
                  <p>Get into your home with just a 2% deposit - similar to the FHB scheme but with fewer restrictions</p>
                </div>
                
                <div className="comparison-point">
                  <div className="point-header">
                    <h4>Competitive Interest Rates</h4>
                    <span className="point-badge">Sucasa Advantage</span>
                  </div>
                  <p>Our rates are competitive and transparent - no hidden fees or surprises</p>
                </div>
              </div>
              
              <div className="comparison-note">
                <p><strong>Note:</strong> Interest rates vary based on your individual circumstances and current market conditions.</p>
              </div>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="summary-actions">
          <div className="action-group">
            <button 
              className="action-btn primary"
              onClick={handleStartAccount}
            >
              <UserPlus size={20} />
              Start Application
            </button>
          </div>
        </div>


        {/* Trust Signals */}
        <div className="trust-signals">
          <div className="trust-item">
            <Shield size={20} className="trust-icon" />
            <span>ASIC Regulated</span>
          </div>
          <div className="trust-item">
            <Clock size={20} className="trust-icon" />
            <span>Fast Approval</span>
          </div>
          <div className="trust-item">
            <FileText size={20} className="trust-icon" />
            <span>No Hidden Fees</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PurchasingPowerSummaryStep
