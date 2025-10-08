import { useState } from 'react'
import { DollarSign, CreditCard, PiggyBank, Gift, Users, Target, Home, TrendingUp } from 'lucide-react'

function HomeFinancesStep({ formData, updateFormData, onNext, onBack }) {
  const [applicantType, setApplicantType] = useState(formData.applicantType || 'single')
  const [dependants, setDependants] = useState(formData.dependants || 0)
  const [incomes, setIncomes] = useState(formData.incomes || ['', ''])
  const [expenseLevel, setExpenseLevel] = useState(formData.expenseLevel || 'medium')
  const [customExpense, setCustomExpense] = useState(formData.customExpense || '')
  const [savings, setSavings] = useState(formData.savings || '')
  const [includeGifts, setIncludeGifts] = useState(formData.includeGifts || false)
  const [loanPreference, setLoanPreference] = useState(formData.loanPreference || '')
  
  // Refinancing specific fields
  const [currentLoanBalance, setCurrentLoanBalance] = useState(formData.currentLoanBalance || '')
  const [currentInterestRate, setCurrentInterestRate] = useState(formData.currentInterestRate || '')
  const [remainingTerm, setRemainingTerm] = useState(formData.remainingTerm || '')
  const [propertyValue, setPropertyValue] = useState(formData.propertyValue || '')
  
  // Investment specific fields
  const [expectedRent, setExpectedRent] = useState(formData.expectedRent || '')
  const [propertyType, setPropertyType] = useState(formData.propertyType || '')

  const handleIncomeChange = (index, value) => {
    const newIncomes = [...incomes]
    newIncomes[index] = value
    setIncomes(newIncomes)
  }

  const handleShowPurchasingPower = () => {
    updateFormData({
      applicantType,
      dependants,
      incomes,
      expenseLevel,
      customExpense,
      savings,
      includeGifts,
      loanPreference,
      // Refinancing fields
      currentLoanBalance,
      currentInterestRate,
      remainingTerm,
      propertyValue,
      // Investment fields
      expectedRent,
      propertyType
    })
    onNext()
  }

  const canContinue = () => {
    const hasIncome = incomes.some(income => income && parseFloat(income) > 0)
    const hasSavings = savings && parseFloat(savings.replace(/[^\d]/g, '')) > 0
    const hasLoanPreference = loanPreference
    
    // For refinancing, also require current loan details
    if (formData.loanPurpose === 'refinancing') {
      const hasCurrentBalance = currentLoanBalance && parseFloat(currentLoanBalance.replace(/[^\d]/g, '')) > 0
      const hasCurrentRate = currentInterestRate && parseFloat(currentInterestRate) > 0
      const hasRemainingTerm = remainingTerm
      const hasPropertyValue = propertyValue && parseFloat(propertyValue.replace(/[^\d]/g, '')) > 0
      
      return hasIncome && hasSavings && hasLoanPreference && hasCurrentBalance && hasCurrentRate && hasRemainingTerm && hasPropertyValue
    }
    
    // For investment, also require expected rent
    if (formData.buyingReason === 'to-invest') {
      const hasExpectedRent = expectedRent && parseFloat(expectedRent) > 0
      
      return hasIncome && hasSavings && hasLoanPreference && hasExpectedRent
    }
    
    // For regular home buyers
    return hasIncome && hasSavings && hasLoanPreference
  }

  const expenseLevels = {
    low: { label: 'Low', range: '$800 - $1,200', description: 'Minimal expenses, shared living' },
    medium: { label: 'Medium', range: '$1,200 - $2,000', description: 'Average lifestyle costs' },
    high: { label: 'High', range: '$2,000+', description: 'Premium lifestyle, family expenses' },
    other: { label: 'Other', range: 'Enter your own', description: 'Specify exact monthly expenses' }
  }

  return (
    <div className="step home-finances-step">
      <div className="step-content">
        <div className="header-section">
          <h1 className="step-title">Let's get a picture of your finances</h1>
          <p className="step-subtitle">This helps us estimate your purchasing power — no credit impact.</p>
        </div>

        <div className="form-blocks">
          {/* 1️⃣ Who's applying? */}
          <div className="form-block">
            <h3 className="block-title">
              <Users size={20} />
              Who's applying?
            </h3>
            <div className="toggle-group">
              <button 
                className={`toggle-btn ${applicantType === 'single' ? 'active' : ''}`}
                onClick={() => setApplicantType('single')}
              >
                Single
              </button>
              <button 
                className={`toggle-btn ${applicantType === 'joint' ? 'active' : ''}`}
                onClick={() => setApplicantType('joint')}
              >
                Joint
              </button>
            </div>
            
            <div className="dependent-counter">
              <label>How many dependents?</label>
              <div className="counter-group">
                <button 
                  className="counter-btn"
                  onClick={() => setDependants(Math.max(0, dependants - 1))}
                  disabled={dependants === 0}
                >
                  −
                </button>
                <span className="counter-value">{dependants}</span>
                <button 
                  className="counter-btn"
                  onClick={() => setDependants(Math.min(6, dependants + 1))}
                  disabled={dependants === 6}
                >
                  +
                </button>
              </div>
              <p className="help-text">Dependents help us estimate your living costs.</p>
            </div>
          </div>

          {/* 2️⃣ Income */}
          <div className="form-block">
            <h3 className="block-title">
              <DollarSign size={20} />
              Income
            </h3>
            
            {applicantType === 'joint' ? (
              <div className="income-group">
                <div className="income-field">
                  <label>Applicant 1 Income</label>
                  <div className="income-input">
                    <span className="dollar-sign">$</span>
                    <input
                      type="text"
                      placeholder="0"
                      value={incomes[0] || ''}
                      onChange={(e) => handleIncomeChange(0, e.target.value)}
                    />
                    <select defaultValue="annual" className="frequency-select">
                      <option value="annual">per year</option>
                      <option value="monthly">per month</option>
                    </select>
                  </div>
                  <p className="hint-text">Enter annual income before tax.</p>
                </div>
                
                <div className="income-field">
                  <label>Applicant 2 Income</label>
                  <div className="income-input">
                    <span className="dollar-sign">$</span>
                    <input
                      type="text"
                      placeholder="0"
                      value={incomes[1] || ''}
                      onChange={(e) => handleIncomeChange(1, e.target.value)}
                    />
                    <select defaultValue="annual" className="frequency-select">
                      <option value="annual">per year</option>
                      <option value="monthly">per month</option>
                    </select>
                  </div>
                </div>
              </div>
            ) : (
              <div className="income-field">
                <label>Your Income</label>
                <div className="income-input">
                  <span className="dollar-sign">$</span>
                  <input
                    type="text"
                    placeholder="0"
                    value={incomes[0] || ''}
                    onChange={(e) => handleIncomeChange(0, e.target.value)}
                  />
                  <select defaultValue="annual" className="frequency-select">
                    <option value="annual">per year</option>
                    <option value="monthly">per month</option>
                  </select>
                </div>
                <p className="hint-text">Enter annual income before tax.</p>
              </div>
            )}
            
            <p className="help-text">Your income helps us calculate how much you can comfortably repay.</p>
          </div>

          {/* 2️⃣ Living Expenses */}
          <div className="form-block">
            <h3 className="block-title">
              <CreditCard size={20} />
              Living Expenses
            </h3>
            
            <p className="help-text" style={{ marginBottom: '1rem' }}>
              These estimates are based on the income you provided. Select the option that best matches your situation, or choose "Other" to enter a specific amount.
            </p>
            
            <div className="expense-slider">
              <div className="expense-options">
                {Object.entries(expenseLevels).map(([key, level]) => (
                  <button
                    key={key}
                    className={`expense-option ${expenseLevel === key ? 'selected' : ''}`}
                    onClick={() => setExpenseLevel(key)}
                  >
                    <div className="expense-label">{level.label}</div>
                    <div className="expense-range">{level.range}</div>
                    <div className="expense-description">{level.description}</div>
                  </button>
                ))}
              </div>
              
              {expenseLevel === 'other' && (
                <div className="custom-expense-input" style={{ marginTop: '1rem' }}>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
                    Your monthly expenses
                  </label>
                  <div className="expense-input-field" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span className="dollar-sign">$</span>
                    <input
                      type="text"
                      placeholder="0"
                      value={customExpense}
                      onChange={(e) => setCustomExpense(e.target.value)}
                      style={{
                        flex: 1,
                        padding: '0.75rem',
                        border: '2px solid #e5e7eb',
                        borderRadius: 0,
                        fontSize: '1rem'
                      }}
                    />
                    <span style={{ fontSize: '0.875rem', color: '#6b7280' }}>per month</span>
                  </div>
                </div>
              )}
              
              <p className="hint-text" style={{ marginTop: '1rem' }}>Estimate your total monthly costs for bills, groceries, etc.</p>
            </div>
          </div>

          {/* 3️⃣ Loan Preference */}
          <div className="form-block">
            <h3 className="block-title">
              <Target size={20} />
              Loan Preference
            </h3>
            
            <p className="help-text" style={{ marginBottom: '1rem' }}>
              Which is most important for you and your financial situation?
            </p>
            
            <div className="preference-dropdown">
              <select
                value={loanPreference}
                onChange={(e) => setLoanPreference(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '2px solid #e5e7eb',
                  borderRadius: '8px',
                  fontSize: '1rem',
                  background: '#fff',
                  color: '#374151'
                }}
              >
                <option value="">Select an option</option>
                <option value="lowest-repayment">Lowest monthly repayment</option>
                <option value="fastest-payoff">Fastest loan payoff</option>
                <option value="flexibility">Payment flexibility</option>
                <option value="lowest-rate">Lowest interest rate</option>
                <option value="no-preference">No strong preference</option>
              </select>
            </div>
          </div>

          {/* Refinancing Questions - Only show if refinancing */}
          {formData.loanPurpose === 'refinancing' && (
            <>
              {/* Current Loan Details */}
              <div className="form-block">
                <h3 className="block-title">
                  <Home size={20} />
                  Current Loan Details
                </h3>
                
                <div className="refinancing-grid">
                  <div className="field-group">
                    <label>Current loan balance</label>
                    <div className="currency-input">
                      <span className="dollar-sign">$</span>
                      <input
                        type="text"
                        placeholder="0"
                        value={currentLoanBalance}
                        onChange={(e) => setCurrentLoanBalance(e.target.value)}
                      />
                    </div>
                  </div>
                  
                  <div className="field-group">
                    <label>Current interest rate</label>
                    <div className="rate-input">
                      <input
                        type="text"
                        placeholder="6.5"
                        value={currentInterestRate}
                        onChange={(e) => setCurrentInterestRate(e.target.value)}
                      />
                      <span className="rate-suffix">% p.a.</span>
                    </div>
                  </div>
                  
                  <div className="field-group">
                    <label>Remaining term</label>
                    <select
                      value={remainingTerm}
                      onChange={(e) => setRemainingTerm(e.target.value)}
                    >
                      <option value="">Select term</option>
                      <option value="30">30 years</option>
                      <option value="25">25 years</option>
                      <option value="20">20 years</option>
                      <option value="15">15 years</option>
                      <option value="10">10 years</option>
                    </select>
                  </div>
                  
                  <div className="field-group">
                    <label>Property value</label>
                    <div className="currency-input">
                      <span className="dollar-sign">$</span>
                      <input
                        type="text"
                        placeholder="0"
                        value={propertyValue}
                        onChange={(e) => setPropertyValue(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* Investment Questions - Only show if investment */}
          {formData.buyingReason === 'to-invest' && (
            <>
              <div className="form-block">
                <h3 className="block-title">
                  <TrendingUp size={20} />
                  Investment Details
                </h3>
                
                <div className="investment-grid">
                  <div className="field-group">
                    <label>Expected rent per week</label>
                    <div className="currency-input">
                      <span className="dollar-sign">$</span>
                      <input
                        type="text"
                        placeholder="500"
                        value={expectedRent}
                        onChange={(e) => setExpectedRent(e.target.value)}
                      />
                    </div>
                  </div>
                  
                  <div className="field-group">
                    <label>Property type</label>
                    <select
                      value={propertyType}
                      onChange={(e) => setPropertyType(e.target.value)}
                    >
                      <option value="">Select type</option>
                      <option value="house">House</option>
                      <option value="unit">Unit/Apartment</option>
                      <option value="townhouse">Townhouse</option>
                    </select>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* 4️⃣ Savings / Deposit */}
          <div className="form-block">
            <h3 className="block-title">
              <PiggyBank size={20} />
              Savings / Deposit
            </h3>
            
            <div className="savings-input">
              <label>How much have you saved?</label>
              <div className="savings-field">
                <span className="dollar-sign">$</span>
                <input
                  type="text"
                  placeholder="0"
                  value={savings}
                  onChange={(e) => setSavings(e.target.value)}
                />
              </div>
              <p className="hint-text">Enter how much you've saved or received for a deposit.</p>
              
              <div className="gift-toggle">
                <button 
                  className={`toggle-switch ${includeGifts ? 'active' : ''}`}
                  onClick={() => setIncludeGifts(!includeGifts)}
                >
                  <div className="toggle-slider"></div>
                </button>
                <span>Include gifts?</span>
              </div>
            </div>
            
            <p className="help-text">This helps us see your upfront contribution and estimate a suitable deposit range.</p>
          </div>
        </div>

        {/* Guidance Box */}
        <div className="guidance-box">
          <Gift size={20} />
          <p>You don't need a big deposit. SuCasa offers loans from just a 2% deposit — and we'll show what that means for you next.</p>
        </div>

        <div className="footer-section">
          <div className="button-group">
            <button className="back-btn" onClick={onBack}>
              Go back
            </button>
            <button 
              className={`continue-btn ${canContinue() ? 'enabled' : 'disabled'}`}
              onClick={handleShowPurchasingPower}
              disabled={!canContinue()}
            >
              Show my estimated purchasing power →
            </button>
          </div>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: '70%' }}></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomeFinancesStep
