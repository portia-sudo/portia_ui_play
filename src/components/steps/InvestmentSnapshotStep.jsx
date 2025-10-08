import { useState } from 'react'
import { TrendingUp, DollarSign, Home, Calculator, Edit3, UserPlus } from 'lucide-react'

function InvestmentSnapshotStep({ formData, updateFormData, onNext, onBack }) {
  // Mock calculations for investment
  const calculateInvestmentMetrics = () => {
    const totalIncome = formData.incomes.reduce((sum, income) => {
      const numIncome = parseFloat(income.replace(/[^\d]/g, '')) || 0
      return sum + numIncome
    }, 0)

    // Investment loans typically have higher rates and lower LVR
    const expenseMultiplier = formData.expenseLevel === 'high' ? 3.5 : formData.expenseLevel === 'medium' ? 4.5 : 5.5
    const borrowingAmount = totalIncome * expenseMultiplier
    
    const depositAmount = parseFloat(formData.savings.replace(/[^\d]/g, '')) || 0
    const maxPropertyValue = borrowingAmount + depositAmount
    const loanAmount = maxPropertyValue - depositAmount
    
    // Investment loan rate is typically higher
    const investmentRate = 0.0648 // 6.48% for investment
    const monthlyRate = investmentRate / 12
    const months = 30 * 12 // 30 years
    const monthlyRepayment = (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1)
    
    // Rental income estimate
    const expectedRent = parseFloat(formData.expectedRent || '0')
    const weeklyRent = expectedRent
    const monthlyRent = weeklyRent * 52 / 12
    
    // Cash flow calculation
    const netCashFlow = monthlyRent - monthlyRepayment
    const grossYield = (monthlyRent * 12 / maxPropertyValue) * 100

    return {
      borrowingAmount,
      depositAmount,
      maxPropertyValue,
      loanAmount,
      monthlyRepayment,
      weeklyRent,
      monthlyRent,
      netCashFlow,
      grossYield,
      investmentRate
    }
  }

  const investmentData = calculateInvestmentMetrics()

  const handleCreateAccount = () => {
    onNext()
  }

  const handleEditDetails = () => {
    onBack()
  }

  return (
    <div className="step investment-snapshot-step">
      <div className="step-content">
        <div className="header-section">
          <h1 className="step-title">Here's your estimated investment potential 💰</h1>
          <p className="step-subtitle">Based on your financial situation and investment goals.</p>
        </div>

        {/* Main Investment Card */}
        <div className="main-result-card">
          <div className="investment-summary">
            <div className="summary-grid">
              <div className="summary-item">
                <div className="summary-label">Borrowing amount</div>
                <div className="summary-value">${investmentData.borrowingAmount.toLocaleString()}</div>
              </div>
              <div className="summary-item">
                <div className="summary-label">Estimated interest rate</div>
                <div className="summary-value">{investmentData.investmentRate * 100}% p.a.</div>
              </div>
              <div className="summary-item">
                <div className="summary-label">Monthly repayment</div>
                <div className="summary-value">${investmentData.monthlyRepayment.toLocaleString()}</div>
              </div>
              <div className="summary-item">
                <div className="summary-label">Expected rent</div>
                <div className="summary-value">${investmentData.weeklyRent}/week</div>
              </div>
            </div>
          </div>
          
          <div className="divider"></div>
          
          <div className="cash-flow-section">
            <div className="cash-flow-highlight">
              <div className={`cash-flow-amount ${investmentData.netCashFlow >= 0 ? 'positive' : 'negative'}`}>
                {investmentData.netCashFlow >= 0 ? '+' : ''}${investmentData.netCashFlow.toLocaleString()}
              </div>
              <div className="cash-flow-label">Net cash flow per month</div>
            </div>
            <div className="yield-metric">
              <span className="yield-label">Gross yield:</span>
              <span className="yield-value">{investmentData.grossYield.toFixed(1)}%</span>
            </div>
          </div>
        </div>

        {/* Investment Context Box */}
        <div className="investment-context-box">
          <TrendingUp size={20} />
          <div>
            <p style={{ margin: 0, fontWeight: 600 }}>Investment feasibility summary</p>
            <p style={{ margin: '0.5rem 0 0 0', fontSize: '0.875rem', color: '#6b7280' }}>
              This estimate shows your likely borrowing range and cash flow. You can refine this once you create your account and input specific property details.
            </p>
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
            Create your free account to see full investment scenario
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
            <span>Investment Specialists</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default InvestmentSnapshotStep
