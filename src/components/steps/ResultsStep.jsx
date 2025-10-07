import { useState, useEffect } from 'react'
import { Calculator, TrendingUp, Shield, CheckCircle, ArrowRight, Home, DollarSign } from 'lucide-react'
import ComparisonChart from '../ComparisonChart'
import PropertyValueCalculator from '../PropertyValueCalculator'
import TrustIndicators from '../TrustIndicators'
import FirstHomeBuyerLanding from '../FirstHomeBuyerLanding'

function ResultsStep({ formData }) {
  const [borrowingPower, setBorrowingPower] = useState(null)
  const [bankComparison, setBankComparison] = useState(null)
  const [propertyValue, setPropertyValue] = useState(null)
  const [isCalculating, setIsCalculating] = useState(true)
  const [showFHBComparison, setShowFHBComparison] = useState(false)

  useEffect(() => {
    calculateBorrowingPower()
    
    // Show FHB comparison if user is a first home buyer
    if (formData.firstHomeBuyer === true) {
      setShowFHBComparison(true)
    }
  }, [])

  const calculateBorrowingPower = () => {
    setIsCalculating(true)
    
    // Simulate calculation delay
    setTimeout(() => {
      const income = parseInt(formData.income) || 0
      const savings = parseInt(formData.savings) || 0
      const deposit = parseInt(formData.deposit) || 0
      
      // Basic borrowing power calculation
      // SuCasa can lend up to 98% LVR with no LMI
      const maxLVR = 0.98
      const interestRate = 0.065 // 6.5% example rate
      const serviceabilityRatio = 0.3 // 30% of income for repayments
      
      // Calculate maximum loan amount based on deposit
      const maxLoanFromDeposit = deposit / (1 - maxLVR)
      
      // Calculate maximum loan based on serviceability
      const monthlyIncome = income / 12
      const maxMonthlyRepayment = monthlyIncome * serviceabilityRatio
      const maxLoanFromServiceability = (maxMonthlyRepayment * 12) / interestRate
      
      // Take the lower of the two
      const maxLoan = Math.min(maxLoanFromDeposit, maxLoanFromServiceability)
      
      // Typical bank comparison (95% LVR with LMI)
      const bankMaxLVR = 0.95
      const bankMaxLoanFromDeposit = deposit / (1 - bankMaxLVR)
      const bankMaxLoan = Math.min(bankMaxLoanFromDeposit, maxLoanFromServiceability)
      
      setBorrowingPower({
        sucasa: Math.round(maxLoan),
        bank: Math.round(bankMaxLoan),
        difference: Math.round(maxLoan - bankMaxLoan),
        lvr: maxLVR,
        interestRate: interestRate,
        monthlyRepayment: Math.round((maxLoan * interestRate) / 12)
      })
      
      setBankComparison({
        sucasa: Math.round(maxLoan),
        bank: Math.round(bankMaxLoan),
        difference: Math.round(maxLoan - bankMaxLoan),
        percentageIncrease: Math.round(((maxLoan - bankMaxLoan) / bankMaxLoan) * 100)
      })
      
      setPropertyValue({
        maxPropertyValue: Math.round(maxLoan + deposit),
        loanAmount: Math.round(maxLoan),
        deposit: deposit,
        lvr: maxLVR
      })
      
      setIsCalculating(false)
    }, 2000)
  }

  // Show FHB comparison if user is a first home buyer
  if (showFHBComparison) {
    return <FirstHomeBuyerLanding onContinue={() => setShowFHBComparison(false)} />
  }

  if (isCalculating) {
    return (
      <div className="step results-step calculating">
        <div className="calculating-content">
          <div className="calculating-spinner">
            <Calculator size={48} className="spinning" />
          </div>
          <h2>Calculating your borrowing power...</h2>
          <p>This usually takes just a few seconds</p>
        </div>
      </div>
    )
  }

  return (
    <div className="step results-step">
      <div className="results-header">
        <h2>Your Borrowing Power Results</h2>
        <p>Based on your information, here's what you could borrow</p>
      </div>
      
      <div className="main-result">
        <div className="result-card primary">
          <div className="result-header">
            <h3>With SuCasa</h3>
            <div className="badge">Best Option</div>
          </div>
          <div className="result-amount">
            ${borrowingPower.sucasa.toLocaleString()}
          </div>
          <div className="result-details">
            <p>Up to {Math.round(borrowingPower.lvr * 100)}% LVR • No LMI</p>
            <p>~${borrowingPower.monthlyRepayment.toLocaleString()}/month</p>
          </div>
        </div>
      </div>
      
      <ComparisonChart comparison={bankComparison} />
      
      <PropertyValueCalculator propertyValue={propertyValue} />
      
      <div className="key-benefits">
        <h3>Why SuCasa is Better</h3>
        <div className="benefits-grid">
          <div className="benefit-item">
            <CheckCircle size={20} className="benefit-icon" />
            <div>
              <h4>Higher LVR</h4>
              <p>Borrow up to 98% vs 95% with banks</p>
            </div>
          </div>
          <div className="benefit-item">
            <CheckCircle size={20} className="benefit-icon" />
            <div>
              <h4>No LMI</h4>
              <p>Save thousands in Lenders Mortgage Insurance</p>
            </div>
          </div>
          <div className="benefit-item">
            <CheckCircle size={20} className="benefit-icon" />
            <div>
              <h4>Competitive Rates</h4>
              <p>Lower rates than traditional banks</p>
            </div>
          </div>
          <div className="benefit-item">
            <CheckCircle size={20} className="benefit-icon" />
            <div>
              <h4>Fast Approval</h4>
              <p>Get pre-approved in days, not weeks</p>
            </div>
          </div>
        </div>
      </div>
      
      <TrustIndicators />
      
      <div className="next-steps">
        <h3>Ready to Get Started?</h3>
        <p>Get pre-approved and start house hunting with confidence</p>
        <div className="action-buttons">
          <button className="btn btn-primary btn-large">
            Get Pre-Approved
            <ArrowRight size={20} />
          </button>
          <button className="btn btn-secondary">
            Speak to an Expert
          </button>
        </div>
      </div>
      
      <div className="disclaimer">
        <p><strong>Important:</strong> This is an estimate only. Final approval depends on your complete application and credit assessment. Rates and terms subject to change.</p>
      </div>
    </div>
  )
}

export default ResultsStep
