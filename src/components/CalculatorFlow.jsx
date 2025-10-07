import { useState } from 'react'
import { ChevronLeft, ChevronRight, Home, Users, DollarSign, PiggyBank, Calculator, TrendingUp } from 'lucide-react'
import LoanPurposeStep from './steps/LoanPurposeStep'
import ApplicantTypeStep from './steps/ApplicantTypeStep'
import IncomeStep from './steps/IncomeStep'
import SavingsStep from './steps/SavingsStep'
import ResultsStep from './steps/ResultsStep'
import ProgressStepper from './ProgressStepper'

const STEPS = [
  { id: 'loan-purpose', title: 'Loan Purpose', icon: Home },
  { id: 'applicant-type', title: 'Applicants', icon: Users },
  { id: 'income', title: 'Income', icon: DollarSign },
  { id: 'savings', title: 'Savings', icon: PiggyBank },
  { id: 'results', title: 'Results', icon: Calculator }
]

function CalculatorFlow() {
  const [currentStep, setCurrentStep] = useState(0)
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
        return <SavingsStep formData={formData} updateFormData={updateFormData} onNext={nextStep} />
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
          <div className="hero-image">
            <div className="building-image">
              {/* Modern building image placeholder */}
            </div>
          </div>
          
          <div className="loan-purpose-section">
            <div className="purpose-header">
              <h1>Apply in 15 minutes</h1>
              <div className="trustpilot-rating">
                <span className="rating-text">Excellent</span>
                <div className="stars">★★★★★</div>
                <span className="trustpilot-text">Trustpilot</span>
              </div>
            </div>
            
            <div className="purpose-description">
              <p>Before you apply, please ensure you have estimated your borrowing capacity using our web calculators.</p>
              <p>Once you have done this, click apply and we'll grab your details so we can find loan options that match your needs.</p>
              <p>Don't worry, we won't run a credit check yet. We'll ask you prior to running any credit checks.</p>
            </div>
            
            <div className="purpose-options">
              {renderStep()}
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="calculator-flow">
      <div className="container">
        <div className="header">
          <h1>SuCasa Borrowing Power Calculator</h1>
          <p>Get your borrowing power estimate in under 60 seconds</p>
        </div>
        
        <ProgressStepper 
          steps={STEPS} 
          currentStep={currentStep} 
          onStepClick={setCurrentStep}
        />
        
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
  )

  function canProceed() {
    switch (currentStep) {
      case 0:
        return formData.loanPurpose !== ''
      case 1:
        return formData.applicantType !== ''
      case 2:
        return formData.income !== ''
      case 3:
        return formData.savings !== ''
      default:
        return true
    }
  }
}

export default CalculatorFlow
