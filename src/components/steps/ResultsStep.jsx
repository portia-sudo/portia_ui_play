import { useState, useEffect, useRef } from 'react'
import { 
  ChevronLeft, 
  Calculator, 
  Home, 
  DollarSign, 
  TrendingUp, 
  Shield, 
  Clock, 
  CheckCircle,
  ExternalLink,
  Copy,
  Settings,
  ChevronDown,
  ChevronUp,
  Info
} from 'lucide-react'
import FirstHomeBuyerLanding from '../FirstHomeBuyerLanding'
import ProgressStepper from '../ProgressStepper'

function ResultsStep({ formData, onBack }) {
  const [borrowingPower, setBorrowingPower] = useState(null)
  const [propertyBudget, setPropertyBudget] = useState(null)
  const [bankComparison, setBankComparison] = useState(null)
  const [isCalculating, setIsCalculating] = useState(true)
  const [showFHBComparison, setShowFHBComparison] = useState(false)
  const [showAdjustPanel, setShowAdjustPanel] = useState(false)
  const [showAssumptions, setShowAssumptions] = useState(false)
  const [adjustedData, setAdjustedData] = useState(formData)
  const [shareUrl, setShareUrl] = useState('')
  const [copied, setCopied] = useState(false)
  const calculationStartTime = useRef(Date.now())

  const STEPS = [
    { id: 'loan-purpose', title: 'Loan Purpose', icon: Home },
    { id: 'applicant-type', title: 'Applicants', icon: Home },
    { id: 'income', title: 'Financial Details', icon: Home },
    { id: 'first-home-buyer', title: 'First Home Buyer', icon: Home },
    { id: 'results', title: 'Results', icon: Calculator }
  ]

  // Calculate borrowing power and related metrics
  const calculateBorrowingPower = () => {
    setIsCalculating(true)
    
    // Simulate calculation delay for UX
    setTimeout(() => {
      const data = adjustedData
      const annualIncome = Array.isArray(data.incomes) ? 
        data.incomes.reduce((sum, income, index) => {
          const freq = data.incomeFrequencies?.[index] || 'annual'
          const value = parseFloat(income.replace(/[,$]/g, '')) || 0
          return sum + (freq === 'monthly' ? value * 12 : value)
        }, 0) : 
        parseFloat((data.income || '').replace(/[,$]/g, '')) || 0

      const deposit = parseFloat((data.savings || '').replace(/[,$]/g, '')) || 0
      const dependants = data.dependants || 0
      
      // Simplified HEM calculation (in real app, this would be state-specific)
      const hemMultiplier = 1 + (dependants * 0.15) // Basic HEM adjustment
      const monthlyIncome = annualIncome / 12
      const monthlyHEM = monthlyIncome * 0.3 * hemMultiplier // 30% of income + dependants
      
      // Basic borrowing power calculation (6x income rule, adjusted for HEM)
      const baseBorrowingPower = annualIncome * 6
      const hemAdjustedPower = Math.min(baseBorrowingPower, (monthlyIncome - monthlyHEM) * 12 * 6)
      
      // Sucasa can lend up to 98% LVR with no LMI
      const lvr = 0.98
      const minDeposit = hemAdjustedPower * (1 - lvr)
      
      const borrowingPowerResult = {
        min: Math.round(hemAdjustedPower * 0.95),
        max: Math.round(hemAdjustedPower * 1.05),
        midpoint: Math.round(hemAdjustedPower),
        monthlyRepayment: Math.round(hemAdjustedPower * 0.006), // ~6% annual rate
        lvr: lvr,
        rate: 6.2
      }

      const propertyBudgetResult = {
        total: Math.round(hemAdjustedPower + deposit),
        loan: borrowingPowerResult.midpoint,
        deposit: deposit,
        costs: Math.round((hemAdjustedPower + deposit) * 0.04), // ~4% stamp duty + fees
        lvr: lvr,
        depositPercent: Math.round((deposit / (hemAdjustedPower + deposit)) * 100),
        term: 30
      }

      // Bank comparison (typical bank vs Sucasa)
      const typicalBankLvr = 0.80 // 80% LVR typical
      const typicalBankPower = Math.round((annualIncome * 5) * 0.95) // More conservative
      
      const comparison = {
        sucasa: borrowingPowerResult.midpoint,
        typical: typicalBankPower,
        difference: borrowingPowerResult.midpoint - typicalBankPower,
        percentage: Math.round(((borrowingPowerResult.midpoint - typicalBankPower) / typicalBankPower) * 100)
      }

      setBorrowingPower(borrowingPowerResult)
      setPropertyBudget(propertyBudgetResult)
      setBankComparison(comparison)
      setIsCalculating(false)
      
      // Generate share URL
      const params = new URLSearchParams({
        income: annualIncome.toString(),
        deposit: deposit.toString(),
        dependants: dependants.toString(),
        location: data.location || '',
        purpose: data.loanPurpose || '',
        fhb: data.firstHomeBuyer ? 'true' : 'false'
      })
      setShareUrl(`${window.location.origin}?${params.toString()}`)
      
    }, 1500)
  }

  useEffect(() => {
    calculateBorrowingPower()

    // Show FHB comparison if user is a first home buyer
    if (formData.firstHomeBuyer === true) {
      setShowFHBComparison(true)
    }
  }, [])

  // Recalculate when adjusted data changes
  useEffect(() => {
    if (adjustedData !== formData) {
      calculateBorrowingPower()
    }
  }, [adjustedData])

  // Handle data adjustments
  const handleDataAdjustment = (field, value) => {
    setAdjustedData(prev => ({ ...prev, [field]: value }))
  }

  // Copy share URL
  const copyShareUrl = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy URL:', err)
    }
  }

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-AU', {
      style: 'currency',
      currency: 'AUD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount)
  }

  // Show FHB comparison if user is a first home buyer
  if (showFHBComparison) {
    return <FirstHomeBuyerLanding onContinue={() => setShowFHBComparison(false)} />
  }

  if (isCalculating) {
    return (
      <div className="results-step">
        <div className="loading-state">
          <div className="loading-spinner"></div>
          <h2>Calculating your borrowing power...</h2>
          <p>This will take just a moment</p>
        </div>
      </div>
    )
  }

  return (
    <div className="results-step">
      {/* Sticky Result Bar */}
      <div className="sticky-result-bar" aria-live="polite">
        <div className="result-bar-content">
          <div className="result-main">
            <div className="result-details">
              Maximum purchase price: {formatCurrency(propertyBudget.total)}
            </div>
            <div className="result-interest-rate">
              Interest rate: {borrowingPower.rate}% p.a.
            </div>
          </div>
        </div>
      </div>

      {/* Hero Purchase Price Section */}
      <div className="hero-purchase-section">
        <div className="hero-purchase-content">
          <h1 className="hero-purchase-title">Maximum property purchase price</h1>
          <div className="hero-purchase-amount">{formatCurrency(propertyBudget.total)}</div>
          <div className="hero-interest-section">
            <div className="hero-interest-rate">
              Interest rate: {borrowingPower.rate}% p.a.
            </div>
            <div className="hero-monthly-repayment">
              Monthly repayment: {formatCurrency(borrowingPower.monthlyRepayment)}
            </div>
          </div>
        </div>
      </div>

      <div className="results-content">
        {/* Property Budget Card */}
        <div className="property-budget-card">
          <h2>Breakdown</h2>
          
          <div className="breakdown-purchase-price">
            <div className="breakdown-purchase-amount">{formatCurrency(propertyBudget.total)}</div>
          </div>
          
          <div className="budget-breakdown-section">
            <div className="breakdown-items">
              <div className="breakdown-item">
                <span className="breakdown-label">Your deposit:</span>
                <span className="breakdown-value">{formatCurrency(propertyBudget.deposit)}</span>
              </div>
              <div className="breakdown-item">
                <span className="breakdown-label">Purchase costs:</span>
                <span className="breakdown-value">{formatCurrency(propertyBudget.costs)}</span>
                <span className="breakdown-note">(stamp duty, fees)</span>
              </div>
            </div>
          </div>

          
          <div className="assumptions-ribbon">
            This estimate uses HEM for {adjustedData.location || 'your location'}/{adjustedData.adults || 1} adult{(adjustedData.adults || 0) > 1 ? 's' : ''}/{adjustedData.dependants || 0} dependant{(adjustedData.dependants || 0) !== 1 ? 's' : ''} and a rate range of {borrowingPower.rate - 0.25}–{borrowingPower.rate + 0.25}%.
          </div>
        </div>

        {/* Adjust Scenario Panel */}
        <div className="adjust-scenario-section">
          <button 
            className="adjust-toggle"
            onClick={() => setShowAdjustPanel(!showAdjustPanel)}
          >
            <Calculator size={20} />
            Adjust scenario
            {showAdjustPanel ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </button>
          
          {showAdjustPanel && (
            <div className="adjust-panel">
              <div className="adjust-content">
                <div className="adjust-hint">
                  Change these to see your numbers move in real time.
                </div>
                
                <div className="adjust-controls">
                  <div className="control-group">
                    <label>Deposit/Savings</label>
                    <input
                      type="text"
                      value={adjustedData.savings || ''}
                      onChange={(e) => handleDataAdjustment('savings', e.target.value)}
                      placeholder="Enter amount"
                    />
                  </div>
                  
                  <div className="control-group">
                    <label>Annual Income</label>
                    <input
                      type="text"
                      value={adjustedData.incomes?.[0] || ''}
                      onChange={(e) => handleDataAdjustment('incomes', [e.target.value])}
                      placeholder="Enter income"
                    />
                  </div>
                </div>
                
                <div className="adjust-actions">
                  <button 
                    className="btn btn-secondary"
                    onClick={copyShareUrl}
                  >
                    <Copy size={16} />
                    {copied ? 'Copied!' : 'Save & share'}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Dynamic FHB Slice - Only if FHB = Yes */}
        {adjustedData.firstHomeBuyer && (
          <div className="fhb-slice">
            <h2>Your two paths to your first home</h2>
            <div className="fhb-cards">
              <div className="fhb-card">
                <h3>FHB Scheme</h3>
                <div className="fhb-details">
                  <div className="fhb-deposit">Deposit: 5% minimum</div>
                  <div className="fhb-budget">Budget: {formatCurrency(propertyBudget.total * 0.85)}</div>
                  <div className="fhb-note">Price caps apply</div>
                </div>
              </div>
              
              <div className="fhb-card sucasa">
                <h3>Sucasa up to 98% LVR</h3>
                <div className="fhb-details">
                  <div className="fhb-deposit">Deposit: {Math.round((1 - borrowingPower.lvr) * 100)}% minimum</div>
                  <div className="fhb-budget">Budget: {formatCurrency(propertyBudget.total)}</div>
                  <div className="fhb-note">No LMI required</div>
                </div>
              </div>
            </div>
            <div className="fhb-conclusion">
              Why Sucasa may be better: {propertyBudget.total > propertyBudget.total * 0.85 ? 'higher budget' : 'smaller deposit'}.
            </div>
          </div>
        )}

        {/* Why Sucasa is Better */}
        <div className="value-props-section">
          <h2>Why Sucasa is Better</h2>
          <div className="value-props">
            <div className="value-prop">
              <TrendingUp size={24} className="value-icon" />
              <div className="value-text">
                <strong>Higher LVR</strong> — Borrow up to 98% with the same deposit.
              </div>
            </div>
            <div className="value-prop">
              <Shield size={24} className="value-icon" />
              <div className="value-text">
                <strong>No LMI</strong> — Save thousands in mortgage insurance.
              </div>
            </div>
            <div className="value-prop">
              <DollarSign size={24} className="value-icon" />
              <div className="value-text">
                <strong>Competitive rates</strong> — Low variable rates, no ongoing fees.
              </div>
            </div>
            <div className="value-prop">
              <Clock size={24} className="value-icon" />
              <div className="value-text">
                <strong>Fast approvals</strong> — Days, not weeks.
              </div>
            </div>
          </div>
        </div>

        {/* Why Trust Sucasa */}
        <div className="trust-section">
          <h2>Why Trust Sucasa</h2>
          <div className="trust-chips">
            <span className="trust-chip">ASIC-regulated</span>
            <span className="trust-chip">No LMI</span>
            <span className="trust-chip">No annual fees</span>
            <span className="trust-chip">Australian-owned</span>
          </div>
          <div className="trust-links">
            <a href="#" className="trust-link">
              View on ASIC <ExternalLink size={14} />
            </a>
          </div>
          <div className="trust-info">
            <div className="rate-info">
              Current rate range: {borrowingPower.rate - 0.25}–{borrowingPower.rate + 0.25}% p.a.
              <span className="rate-updated">Last updated: {new Date().toLocaleDateString()}</span>
            </div>
            <div className="calculation-info">
              How we calculate: HEM + LVR assessment based on your financial situation.
            </div>
          </div>
        </div>

        {/* Primary CTA Block */}
        <div className="cta-section">
          <h2>Ready to get started?</h2>
          <button className="btn btn-primary btn-large btn-full-width">
            Get pre-approved
          </button>
          <p className="cta-subtext">Takes ~2 minutes. No credit check yet.</p>
          <button className="btn btn-secondary">
            Speak to an expert
          </button>
          <button className="btn btn-link">
            Save my estimate
          </button>
        </div>

        {/* Disclosure Footer */}
        <div className="disclosure-footer">
          <p>
            <strong>This is an indicative estimate, not approval.</strong> Final assessment depends on full details and credit checks. Rates & terms may change.
          </p>
          <p className="legal-disclaimer">
            Sucasa is an Australian Credit Licence holder. All lending subject to approval and conditions.
          </p>
        </div>
      </div>

      {/* Side Assumptions Panel */}
      <div className={`side-assumptions-panel ${showAssumptions ? 'open' : ''}`}>
        <button 
          className="side-assumptions-trigger"
          onClick={() => setShowAssumptions(!showAssumptions)}
          aria-label="View assumptions"
        >
          <Settings size={20} />
        </button>
        
        <div className="side-assumptions-content">
          <div className="side-assumptions-header">
            <h3>Assumptions</h3>
            <button 
              className="side-assumptions-close"
              onClick={() => setShowAssumptions(false)}
              aria-label="Close assumptions"
            >
              ×
            </button>
          </div>
          
          <div className="side-assumptions-body">
            <div className="assumption-item">
              <strong>Rate:</strong> {borrowingPower.rate}% p.a. (variable)
            </div>
            <div className="assumption-item">
              <strong>Term:</strong> 30 years P&I
            </div>
            <div className="assumption-item">
              <strong>LVR:</strong> Up to {Math.round(borrowingPower.lvr * 100)}% (no LMI required)
            </div>
            <div className="assumption-item">
              <strong>Monthly repayment:</strong> {formatCurrency(borrowingPower.monthlyRepayment)}
            </div>
            <div className="assumption-item">
              <strong>HEM:</strong> Based on {adjustedData.location || 'your location'} / {adjustedData.adults || 1} adult{adjustedData.adults > 1 ? 's' : ''} / {adjustedData.dependants || 0} dependant{(adjustedData.dependants || 0) !== 1 ? 's' : ''}
            </div>
            <div className="assumption-item">
              <strong>Deposit source:</strong> Personal savings
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ResultsStep