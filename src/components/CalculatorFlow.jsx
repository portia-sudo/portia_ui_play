import { useState } from 'react'
import { ChevronLeft, ChevronRight, Home, Users, DollarSign, PiggyBank, Calculator, TrendingUp } from 'lucide-react'
import LoanPurposeStep from './steps/LoanPurposeStep'
import ApplicantTypeStep from './steps/ApplicantTypeStep'
import FirstHomeBuyerStep from './steps/FirstHomeBuyerStep'
import IncomeStep from './steps/IncomeStep'
import SavingsStep from './steps/SavingsStep'
import ResultsStep from './steps/ResultsStep'
import ProgressStepper from './ProgressStepper'

const STEPS = [
  { id: 'loan-purpose', title: 'Loan Purpose', icon: Home },
  { id: 'applicant-type', title: 'Applicants', icon: Users },
  { id: 'income', title: 'Financial Details', icon: DollarSign },
  { id: 'first-home-buyer', title: 'First Home Buyer', icon: Home },
  { id: 'results', title: 'Results', icon: Calculator }
]

function CalculatorFlow() {
  const [currentStep, setCurrentStep] = useState(0)
  const [showSidePopup, setShowSidePopup] = useState(false)
  const [expandedAccordion, setExpandedAccordion] = useState(null)
  const [formData, setFormData] = useState({
    loanPurpose: '',
    applicantType: '',
    income: '',
    savings: '',
    deposit: '',
    propertyType: '',
    suburb: '',
    firstHomeBuyer: false,
    dependants: 0,
    relationshipStatus: '',
    giftMoney: false,
    giftAmount: 0
  })

  const updateFormData = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const nextStep = () => {
    if (currentStep < STEPS.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return <LoanPurposeStep formData={formData} updateFormData={updateFormData} onNext={nextStep} />
      case 1:
        return <ApplicantTypeStep formData={formData} updateFormData={updateFormData} onNext={nextStep} />
      case 2:
        return <IncomeStep formData={formData} updateFormData={updateFormData} onNext={nextStep} />
      case 3:
        return <FirstHomeBuyerStep formData={formData} updateFormData={updateFormData} onNext={nextStep} />
      case 4:
        return <ResultsStep formData={formData} />
      default:
        return null
    }
  }

  if (currentStep === 0) {
    return (
      <div className="landing-page">
        <div className="landing-header">
          <div className="logo">
            <div className="logo-icon">S</div>
            <span className="logo-text">sucasa</span>
          </div>
          <a href="#" className="sign-in-link">Sign In</a>
        </div>
        
        <div className="landing-content">
          <div className="main-section">
            <div className="trust-banner">
              <div className="trustpilot-rating">
                <div className="stars">★★★★★</div>
                <span className="rating-text">1,900+ reviews</span>
                <span className="trustpilot-text">Trustpilot</span>
              </div>
            </div>
            
            <div className="main-headline">
              <h1>Let's help you get into your home</h1>
              <h2>What brings you to SuCasa today?</h2>
            </div>
            
            <div className="purpose-options">
              {renderStep()}
            </div>
          </div>
        </div>
        
        {/* Side Popup Trigger */}
        <div className="side-popup-trigger">
          <button 
            className="popup-trigger-btn"
            onClick={() => setShowSidePopup(!showSidePopup)}
          >
            <span>Why our customers love us</span>
            <span className="trigger-icon">{showSidePopup ? '✕' : '→'}</span>
          </button>
        </div>
        
        {/* Side Popup Panel */}
        {showSidePopup && (
          <div className="side-popup-overlay" onClick={() => setShowSidePopup(false)}>
            <div className="side-popup-panel" onClick={(e) => e.stopPropagation()}>
              <div className="popup-header">
                <h3>Why our customers love us</h3>
                <button 
                  className="popup-close-btn"
                  onClick={() => setShowSidePopup(false)}
                >
                  ✕
                </button>
              </div>
              
              <div className="customer-love-accordion">
                <div className={`accordion-item ${expandedAccordion === 'low-deposit' ? 'active' : ''}`}>
                  <div 
                    className="accordion-header"
                    onClick={() => setExpandedAccordion(expandedAccordion === 'low-deposit' ? null : 'low-deposit')}
                  >
                    <h4>Low Deposit</h4>
                    <span className="accordion-icon">▼</span>
                  </div>
                  <div className="accordion-content">
                    <p>Borrow up to 98% LVR. Means your savings go further.</p>
                    <a href="#" className="accordion-link">See loan eligibility ></a>
                  </div>
                </div>
                
                <div className={`accordion-item ${expandedAccordion === 'low-rates' ? 'active' : ''}`}>
                  <div 
                    className="accordion-header"
                    onClick={() => setExpandedAccordion(expandedAccordion === 'low-rates' ? null : 'low-rates')}
                  >
                    <h4>Low Rates</h4>
                    <span className="accordion-icon">▼</span>
                  </div>
                  <div className="accordion-content">
                    <p>Competitive rates. Means lower repayments.</p>
                    <a href="#" className="accordion-link">See our rates ></a>
                  </div>
                </div>
                
                <div className={`accordion-item ${expandedAccordion === 'lower-costs' ? 'active' : ''}`}>
                  <div 
                    className="accordion-header"
                    onClick={() => setExpandedAccordion(expandedAccordion === 'lower-costs' ? null : 'lower-costs')}
                  >
                    <h4>Lower Upfront Costs (No LMI)</h4>
                    <span className="accordion-icon">▼</span>
                  </div>
                  <div className="accordion-content">
                    <p>Find a lower fee or LMI offer and we'll beat it. Means you know you're getting a great deal.</p>
                    <a href="#" className="accordion-link">Learn more ></a>
                  </div>
                </div>
                
                <div className={`accordion-item ${expandedAccordion === 'no-equity' ? 'active' : ''}`}>
                  <div 
                    className="accordion-header"
                    onClick={() => setExpandedAccordion(expandedAccordion === 'no-equity' ? null : 'no-equity')}
                  >
                    <h4>No Equity Sharing or Guarantors</h4>
                    <span className="accordion-icon">▼</span>
                  </div>
                  <div className="accordion-content">
                    <p>Rely on your income and your house. Means you can realise your ambitions without giving away part of your property or risking your parents place.</p>
                    <a href="#" className="accordion-link">See how it works ></a>
                  </div>
                </div>
                
                <div className={`accordion-item ${expandedAccordion === 'unlimited-payments' ? 'active' : ''}`}>
                  <div 
                    className="accordion-header"
                    onClick={() => setExpandedAccordion(expandedAccordion === 'unlimited-payments' ? null : 'unlimited-payments')}
                  >
                    <h4>Unlimited Free Pre-Payments</h4>
                    <span className="accordion-icon">▼</span>
                  </div>
                  <div className="accordion-content">
                    <p>No lock-in. Means you have the flexibility to shrink your loan as fast as you can. Refinance anytime.</p>
                    <a href="#" className="accordion-link">See all features ></a>
                  </div>
                </div>
                
                <div className={`accordion-item ${expandedAccordion === 'fast-approvals' ? 'active' : ''}`}>
                  <div 
                    className="accordion-header"
                    onClick={() => setExpandedAccordion(expandedAccordion === 'fast-approvals' ? null : 'fast-approvals')}
                  >
                    <h4>Fast Approvals</h4>
                    <span className="accordion-icon">▼</span>
                  </div>
                  <div className="accordion-content">
                    <p>Most of our customers are approved within 24 hours of completing their application. Means bidding with confidence, sooner.</p>
                    <a href="#" className="accordion-link">Apply Today ></a>
                  </div>
                </div>
              </div>
              
              {/* Images in Side Panel */}
              <div className="popup-images">
                <div className="popup-image-section">
                  <div className="popup-image-container">
                    <img 
                      src="/images/679b36e6c6e3cd33b6b8f177_a72a1b8d5b2c89bc3ba5cc08d7ac5a4f_A0121019_Original.webp" 
                      alt="SuCasa family celebrating - representing home and family values"
                      className="popup-image"
                    />
                    <div className="popup-image-overlay">
                      <p className="popup-image-caption">Building homes, building families</p>
                    </div>
                  </div>
                </div>
                
                <div className="popup-image-section">
                  <div className="popup-image-container">
                    <img 
                      src="/images/679b3728c44a76dd6ff7558b_iStock-1156323957.webp" 
                      alt="SuCasa - helping families achieve their dreams"
                      className="popup-image"
                    />
                    <div className="popup-image-overlay">
                      <p className="popup-image-caption">Making dreams come true, one home at a time</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="calculator-flow">
      <div className="container">
        <div className="top-stepper-panel">
          <ProgressStepper 
            steps={STEPS} 
            currentStep={currentStep} 
            onStepClick={setCurrentStep}
          />
        </div>
        
        <div className="main-content">
          <div className="header">
            <h1>SuCasa Borrowing Power Calculator</h1>
            <p>Get your borrowing power estimate in under 60 seconds</p>
          </div>
          
          <div className="step-content">
            {renderStep()}
          </div>
          
          {currentStep < STEPS.length - 1 && (
            <div className="navigation">
              <button 
                className="btn btn-secondary" 
                onClick={prevStep}
                disabled={currentStep === 0}
              >
                <ChevronLeft size={20} />
                Back
              </button>
              <button 
                className="btn btn-primary" 
                onClick={nextStep}
                disabled={!canProceed()}
              >
                Next
                <ChevronRight size={20} />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )

  function canProceed() {
    switch (currentStep) {
      case 0:
        return formData.loanPurpose !== ''
      case 1:
        return formData.applicantType !== ''
      case 2:
        return formData.income !== '' && formData.familyStatus !== '' && formData.savings !== '' && formData.suburb !== ''
      case 3:
        return formData.firstHomeBuyer !== ''
      default:
        return true
    }
  }
}

export default CalculatorFlow
