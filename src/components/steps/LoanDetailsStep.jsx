import { useState } from 'react'
import { Clock, Users, TrendingUp, Calendar, DollarSign } from 'lucide-react'

function LoanDetailsStep({ formData, updateFormData, onNext }) {
  const [buyingTimeframe, setBuyingTimeframe] = useState(formData.buyingTimeframe || '')
  const [interestRateType, setInterestRateType] = useState(formData.interestRateType || '')
  const [repaymentType, setRepaymentType] = useState(formData.repaymentType || '')
  const [loanTerm, setLoanTerm] = useState(formData.loanTerm || '')
  const [repaymentFrequency, setRepaymentFrequency] = useState(formData.repaymentFrequency || '')

  const handleBuyingTimeframeChange = (timeframe) => {
    setBuyingTimeframe(timeframe)
    updateFormData('buyingTimeframe', timeframe)
  }


  const handleInterestRateTypeChange = (type) => {
    setInterestRateType(type)
    updateFormData('interestRateType', type)
  }

  const handleRepaymentTypeChange = (type) => {
    setRepaymentType(type)
    updateFormData('repaymentType', type)
  }

  const handleLoanTermChange = (term) => {
    setLoanTerm(term)
    updateFormData('loanTerm', term)
  }

  const handleRepaymentFrequencyChange = (frequency) => {
    setRepaymentFrequency(frequency)
    updateFormData('repaymentFrequency', frequency)
  }

  const canProceed = buyingTimeframe && interestRateType && repaymentType && loanTerm && repaymentFrequency

  return (
    <div className="step loan-details-step">
      <div className="step-header">
        <h2>Tell us about your loan preferences</h2>
        <p>This helps us provide you with the most suitable borrowing options</p>
      </div>

      <div className="loan-details-content">
        {/* When you plan to buy */}
        <div className="form-section">
          <div className="section-header">
            <Clock size={20} className="section-icon" />
            <h3>When do you plan to buy?</h3>
          </div>
          <div className="options-grid-small">
            <button 
              className={`option-btn ${buyingTimeframe === 'immediately' ? 'selected' : ''}`}
              onClick={() => handleBuyingTimeframeChange('immediately')}
            >
              Immediately
            </button>
            <button 
              className={`option-btn ${buyingTimeframe === 'within-6-months' ? 'selected' : ''}`}
              onClick={() => handleBuyingTimeframeChange('within-6-months')}
            >
              Within 6 months
            </button>
            <button 
              className={`option-btn ${buyingTimeframe === '6-12-months' ? 'selected' : ''}`}
              onClick={() => handleBuyingTimeframeChange('6-12-months')}
            >
              6-12 months
            </button>
            <button 
              className={`option-btn ${buyingTimeframe === '1-2-years' ? 'selected' : ''}`}
              onClick={() => handleBuyingTimeframeChange('1-2-years')}
            >
              1-2 years
            </button>
            <button 
              className={`option-btn ${buyingTimeframe === 'exploring' ? 'selected' : ''}`}
              onClick={() => handleBuyingTimeframeChange('exploring')}
            >
              Just exploring
            </button>
          </div>
        </div>


        {/* Interest Rate Type */}
        <div className="form-section">
          <div className="section-header">
            <TrendingUp size={20} className="section-icon" />
            <h3>Interest Rate Type</h3>
          </div>
          <div className="options-grid-small">
            <button 
              className={`option-btn ${interestRateType === 'fixed' ? 'selected' : ''}`}
              onClick={() => handleInterestRateTypeChange('fixed')}
            >
              Fixed Rate
            </button>
            <button 
              className={`option-btn ${interestRateType === 'variable' ? 'selected' : ''}`}
              onClick={() => handleInterestRateTypeChange('variable')}
            >
              Variable Rate
            </button>
            <button 
              className={`option-btn ${interestRateType === 'split' ? 'selected' : ''}`}
              onClick={() => handleInterestRateTypeChange('split')}
            >
              Split Rate
            </button>
            <button 
              className={`option-btn ${interestRateType === 'not-sure' ? 'selected' : ''}`}
              onClick={() => handleInterestRateTypeChange('not-sure')}
            >
              Not sure
            </button>
          </div>
        </div>

        {/* Repayment Type */}
        <div className="form-section">
          <div className="section-header">
            <DollarSign size={20} className="section-icon" />
            <h3>Repayment Type</h3>
          </div>
          <div className="options-grid-small">
            <button 
              className={`option-btn ${repaymentType === 'principal-interest' ? 'selected' : ''}`}
              onClick={() => handleRepaymentTypeChange('principal-interest')}
            >
              Principal & Interest
            </button>
            <button 
              className={`option-btn ${repaymentType === 'interest-only' ? 'selected' : ''}`}
              onClick={() => handleRepaymentTypeChange('interest-only')}
            >
              Interest Only
            </button>
          </div>
        </div>

        {/* Loan Term */}
        <div className="form-section">
          <div className="section-header">
            <Calendar size={20} className="section-icon" />
            <h3>Preferred Loan Term</h3>
          </div>
          <div className="options-grid-small">
            <button 
              className={`option-btn ${loanTerm === '25-years' ? 'selected' : ''}`}
              onClick={() => handleLoanTermChange('25-years')}
            >
              25 years
            </button>
            <button 
              className={`option-btn ${loanTerm === '30-years' ? 'selected' : ''}`}
              onClick={() => handleLoanTermChange('30-years')}
            >
              30 years
            </button>
            <button 
              className={`option-btn ${loanTerm === 'flexible' ? 'selected' : ''}`}
              onClick={() => handleLoanTermChange('flexible')}
            >
              Flexible
            </button>
          </div>
        </div>

        {/* Repayment Frequency */}
        <div className="form-section">
          <div className="section-header">
            <Calendar size={20} className="section-icon" />
            <h3>Repayment Frequency</h3>
          </div>
          <div className="options-grid-small">
            <button 
              className={`option-btn ${repaymentFrequency === 'weekly' ? 'selected' : ''}`}
              onClick={() => handleRepaymentFrequencyChange('weekly')}
            >
              Weekly
            </button>
            <button 
              className={`option-btn ${repaymentFrequency === 'fortnightly' ? 'selected' : ''}`}
              onClick={() => handleRepaymentFrequencyChange('fortnightly')}
            >
              Fortnightly
            </button>
            <button 
              className={`option-btn ${repaymentFrequency === 'monthly' ? 'selected' : ''}`}
              onClick={() => handleRepaymentFrequencyChange('monthly')}
            >
              Monthly
            </button>
          </div>
        </div>
      </div>

      <div className="step-actions">
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

export default LoanDetailsStep
