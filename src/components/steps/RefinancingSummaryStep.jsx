import { useState } from 'react'
import { TrendingUp, DollarSign, Home, Calculator, Edit3, UserPlus } from 'lucide-react'

function RefinancingSummaryStep({ formData, updateFormData, onNext, onBack }) {
  // Mock calculations for refinancing
  const calculateRefinancingSavings = () => {
    const currentBalance = parseFloat(formData.currentLoanBalance?.replace(/[^\d]/g, '') || '0')
    const currentRate = parseFloat(formData.currentInterestRate || '0') / 100
    const sucasaRate = 0.0598 // 5.98%
    const remainingTerm = parseInt(formData.remainingTerm || '30') * 12

    // Calculate current monthly payment
    const currentMonthlyRate = currentRate / 12
    const currentPayment = (currentBalance * currentMonthlyRate * Math.pow(1 + currentMonthlyRate, remainingTerm)) / 
                          (Math.pow(1 + currentMonthlyRate, remainingTerm) - 1)

    // Calculate SuCasa monthly payment
    const sucasaMonthlyRate = sucasaRate / 12
    const sucasaPayment = (currentBalance * sucasaMonthlyRate * Math.pow(1 + sucasaMonthlyRate, remainingTerm)) / 
                         (Math.pow(1 + sucasaMonthlyRate, remainingTerm) - 1)

    const monthlySavings = currentPayment - sucasaPayment
    const totalInterestSaved = (currentPayment * remainingTerm) - (sucasaPayment * remainingTerm)

    return {
      currentBalance,
      currentRate,
      currentPayment,
      sucasaPayment,
      monthlySavings,
      totalInterestSaved,
      remainingTerm
    }
  }

  const calculateEquityAvailable = () => {
    const propertyValue = parseFloat(formData.propertyValue?.replace(/[^\d]/g, '') || '0')
    const currentBalance = parseFloat(formData.currentLoanBalance?.replace(/[^\d]/g, '') || '0')
    const maxLVR = 0.80 // 80% LVR for refinancing
    const maxLoanAmount = propertyValue * maxLVR
    const availableEquity = Math.max(0, maxLoanAmount - currentBalance)
    
    return {
      propertyValue,
      currentBalance,
      availableEquity,
      maxLoanAmount
    }
  }

  const refinancingData = calculateRefinancingSavings()
  const equityData = calculateEquityAvailable()

  const handleCreateAccount = () => {
    onNext()
  }

  const handleEditDetails = () => {
    onBack()
  }

  return (
    <div className="step refinancing-summary-step">
      <div className="step-content">
        <div className="header-section">
          <h1 className="step-title">You could save up to ${Math.abs(refinancingData.monthlySavings).toLocaleString()} per month</h1>
          <p className="step-subtitle">Based on your loan balance of ${refinancingData.currentBalance.toLocaleString()} at {formData.currentInterestRate}% interest.</p>
        </div>

        {/* Main Savings Card */}
        <div className="main-result-card">
          <div className="savings-highlight">
            <div className="savings-number">${Math.abs(refinancingData.monthlySavings).toLocaleString()}</div>
            <div className="savings-subtitle">Monthly savings with SuCasa</div>
          </div>
          
          <div className="divider"></div>
          
          <div className="key-figures">
            <div className="figure-row">
              <span className="figure-label">Current monthly payment:</span>
              <span className="figure-value">${refinancingData.currentPayment.toLocaleString()}</span>
            </div>
            <div className="figure-row">
              <span className="figure-label">SuCasa monthly payment:</span>
              <span className="figure-value">${refinancingData.sucasaPayment.toLocaleString()}</span>
            </div>
            <div className="figure-row">
              <span className="figure-label">Current interest rate:</span>
              <span className="figure-value">{formData.currentInterestRate}% p.a.</span>
            </div>
            <div className="figure-row">
              <span className="figure-label">SuCasa interest rate:</span>
              <span className="figure-value">5.98% p.a.</span>
            </div>
            <div className="figure-row">
              <span className="figure-label">Total interest saved:</span>
              <span className="figure-value">${refinancingData.totalInterestSaved.toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* Equity Access Option */}
        <div className="equity-access-card">
          <h3>Access Available Equity</h3>
          <div className="equity-amount">
            ${equityData.availableEquity.toLocaleString()}
          </div>
          <p>You could access up to this amount in available equity for renovations, debt consolidation, or investment.</p>
          <div className="equity-details">
            <div className="detail-row">
              <span>Property value:</span>
              <span>${equityData.propertyValue.toLocaleString()}</span>
            </div>
            <div className="detail-row">
              <span>Current loan balance:</span>
              <span>${equityData.currentBalance.toLocaleString()}</span>
            </div>
            <div className="detail-row">
              <span>Maximum loan (80% LVR):</span>
              <span>${equityData.maxLoanAmount.toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* Educational Text */}
        <div className="educational-text">
          <p>We'll refine this result once you create your account — it's free and takes 2 minutes.</p>
        </div>

        {/* Call to Action */}
        <div className="cta-section">
          <button className="primary-cta" onClick={handleCreateAccount}>
            <UserPlus size={20} />
            Create your free account
          </button>
          <button className="secondary-cta" onClick={handleEditDetails}>
            <Edit3 size={16} />
            Edit my details
          </button>
          <p className="cta-hint">No credit impact until you apply for pre-approval.</p>
        </div>

        {/* Trust Signals */}
        <div className="trust-signals">
          <div className="trust-item">
            <TrendingUp size={16} />
            <span>ASIC Regulated</span>
          </div>
          <div className="trust-item">
            <Calculator size={16} />
            <span>No Hidden Fees</span>
          </div>
          <div className="trust-item">
            <Home size={16} />
            <span>Fast Approval</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RefinancingSummaryStep
