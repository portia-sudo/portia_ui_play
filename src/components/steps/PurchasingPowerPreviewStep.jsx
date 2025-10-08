import { useState } from 'react'
import { Calculator, TrendingUp, Shield, Edit3, UserPlus } from 'lucide-react'

function PurchasingPowerPreviewStep({ formData, updateFormData, onNext, onBack }) {
  // Mock calculations - replace with real calculations
  const calculatePurchasingPower = () => {
    const totalIncome = formData.incomes.reduce((sum, income) => {
      const numIncome = parseFloat(income.replace(/[^\d]/g, '')) || 0
      return sum + numIncome
    }, 0)

    // Simple calculation - 6x income multiplier with expense adjustment
    const expenseMultiplier = formData.expenseLevel === 'high' ? 4.5 : formData.expenseLevel === 'medium' ? 5.5 : 6
    const purchasingPower = totalIncome * expenseMultiplier
    return purchasingPower
  }

  const calculateDeposit = () => {
    const savings = parseFloat(formData.savings.replace(/[^\d]/g, '')) || 0
    const purchasingPower = calculatePurchasingPower()
    const maxPropertyValue = purchasingPower + savings
    const depositAmount = Math.max(maxPropertyValue * 0.02, savings) // 2% minimum
    return { depositAmount, maxPropertyValue }
  }

  const calculateMonthlyRepayment = () => {
    const { maxPropertyValue, depositAmount } = calculateDeposit()
    const loanAmount = maxPropertyValue - depositAmount
    const monthlyRate = 0.0598 / 12 // 5.98% annual rate
    
    // Adjust loan term based on preference
    let months
    switch (formData.loanPreference) {
      case 'lowest-repayment':
        months = 30 * 12 // 30 years - longest term for lowest payment
        break
      case 'fastest-payoff':
        months = 15 * 12 // 15 years - shorter term for faster payoff
        break
      case 'flexibility':
        months = 25 * 12 // 25 years - balanced term
        break
      case 'lowest-rate':
        months = 30 * 12 // 30 years - typically gets best rates
        break
      case 'no-preference':
      default:
        months = 30 * 12 // 30 years - standard term
        break
    }
    
    const monthlyRepayment = (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1)
    return { monthlyRepayment, months }
  }

  const purchasingPower = calculatePurchasingPower()
  const { depositAmount, maxPropertyValue } = calculateDeposit()
  const { monthlyRepayment, months } = calculateMonthlyRepayment()
  
  // Get loan term description
  const getLoanTermDescription = () => {
    const years = months / 12
    switch (formData.loanPreference) {
      case 'lowest-repayment':
        return `30-year term for lowest monthly payment`
      case 'fastest-payoff':
        return `15-year term for faster payoff`
      case 'flexibility':
        return `25-year term for balanced flexibility`
      case 'lowest-rate':
        return `30-year term for competitive rate`
      default:
        return `30-year standard term`
    }
  }

  const handleCreateAccount = () => {
    // Navigate to account creation step
    onNext()
  }

  const handleEditDetails = () => {
    // Go back to edit details
    onBack()
  }

  return (
    <div className="step purchasing-power-preview-step">
      <div className="step-content">
        <div className="header-section">
          <h1 className="step-title">Here's your estimated purchasing power 💪</h1>
          <p className="step-subtitle">Based on what you've told us, here's what you could afford.</p>
        </div>

        {/* Main Card */}
        <div className="main-result-card">
          <div className="purchasing-power">
            <div className="power-number">${purchasingPower.toLocaleString()}</div>
            <div className="power-subtitle">With a 2% deposit and a competitive variable rate.</div>
          </div>
          
          <div className="divider"></div>
          
          <div className="key-figures">
            <div className="figure-row">
              <span className="figure-label">Deposit:</span>
              <span className="figure-value">${depositAmount.toLocaleString()} (2%)</span>
            </div>
            <div className="figure-row">
              <span className="figure-label">Estimated interest rate:</span>
              <span className="figure-value">5.98% p.a.</span>
            </div>
            <div className="figure-row">
              <span className="figure-label">Estimated monthly repayments:</span>
              <span className="figure-value">${monthlyRepayment.toLocaleString()}</span>
            </div>
            <div className="figure-row">
              <span className="figure-label">Loan term:</span>
              <span className="figure-value">{getLoanTermDescription()}</span>
            </div>
          </div>
        </div>

        {/* Comparison Panel */}
        {formData.isFirstHomeBuyer && (
          <div className="comparison-panel">
            <h3>How this compares to the FHB Scheme</h3>
            <div className="comparison-grid">
              <div className="comparison-item">
                <h4>FHB Scheme</h4>
                <ul>
                  <li>5% deposit</li>
                  <li>Gov't backed</li>
                  <li>Limited eligibility</li>
                </ul>
              </div>
              <div className="comparison-item">
                <h4>SuCasa</h4>
                <ul>
                  <li>2% deposit</li>
                  <li>Same rate</li>
                  <li>Broader criteria</li>
                </ul>
              </div>
            </div>
            <div className="comparison-benefit">
              <TrendingUp size={20} />
              <span>That means you could buy sooner — and with more flexibility.</span>
            </div>
          </div>
        )}

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
            <Shield size={16} />
            <span>ASIC Regulated</span>
          </div>
          <div className="trust-item">
            <Calculator size={16} />
            <span>No Hidden Fees</span>
          </div>
          <div className="trust-item">
            <TrendingUp size={16} />
            <span>Fast Approval</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PurchasingPowerPreviewStep
