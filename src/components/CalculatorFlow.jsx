import { useState, useEffect } from 'react'
import { ChevronDown, Users, DollarSign, Calculator, Home, UserPlus, User } from 'lucide-react'
import WelcomeStep from './steps/WelcomeStep'
import HomeGoalsStep from './steps/HomeGoalsStep'
import HomeFinancesStep from './steps/HomeFinancesStep'
import CalculatingPowerStep from './steps/CalculatingPowerStep'
import PurchasingPowerPreviewStep from './steps/PurchasingPowerPreviewStep'
import RefinancingSummaryStep from './steps/RefinancingSummaryStep'
import InvestmentSnapshotStep from './steps/InvestmentSnapshotStep'
import CreateAccountStep from './steps/CreateAccountStep'
import PersonalInfoStep from './steps/PersonalInfoStep'

// Steps for users who haven't seen purchasing power
const FULL_STEPS = [
  { id: 'welcome', title: 'Welcome', icon: Home },
  { id: 'home-goals', title: 'Your Goals', icon: Users },
  { id: 'home-finances', title: 'Your Finances', icon: DollarSign },
  { id: 'calculating', title: 'Calculating', icon: Calculator },
  { id: 'purchasing-power', title: 'Your Result', icon: Calculator },
  { id: 'create-account', title: 'Create Account', icon: UserPlus },
  { id: 'personal-info', title: 'Personal Info', icon: User }
]

// Steps for users who have already seen purchasing power
const SKIP_STEPS = [
  { id: 'welcome', title: 'Welcome', icon: Home },
  { id: 'create-account', title: 'Create Account', icon: UserPlus },
  { id: 'personal-info', title: 'Personal Info', icon: User }
]

function CalculatorFlow() {
  const [hasStarted, setHasStarted] = useState(true)
  const [currentStep, setCurrentStep] = useState(0)
  const [showStepper, setShowStepper] = useState(false)
  const [skipPurchasingPower, setSkipPurchasingPower] = useState(false)
  const [formData, setFormData] = useState({
    // Welcome Step
    creditCheckTiming: 'at-submission',
    hasSeenPurchasingPower: false,
    
    // Home Goals
    loanPurpose: '',
    buyingReason: '',
    buyingTimeframe: [],
    location: '',
    isFirstHomeBuyer: false,
    
    // Home Finances
    applicantType: 'single',
    dependants: 0,
    incomes: ['', ''],
    expenseLevel: 'medium',
    customExpense: '',
    savings: '',
    includeGifts: false,
    loanPreference: '',
    
    // Account Creation
    email: '',
    password: '',
    
    // Personal Info
    applicant1FirstName: '',
    applicant1LastName: '',
    applicant1Birthday: '',
    applicant2FirstName: '',
    applicant2LastName: '',
    applicant2Birthday: ''
  })

  const updateFormData = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const updateFormDataObject = (updates) => {
    setFormData(prev => ({ ...prev, ...updates }))
    
    // Check if user wants to skip purchasing power flow
    if (updates.hasSeenPurchasingPower !== undefined) {
      setSkipPurchasingPower(updates.hasSeenPurchasingPower === true)
    }
  }

  const steps = skipPurchasingPower ? SKIP_STEPS : FULL_STEPS

  // Set document title based on current step
  useEffect(() => {
    const titles = skipPurchasingPower ? [
      'SuCasa - Welcome',
      'SuCasa - Create Account',
      'SuCasa - Personal Information'
    ] : [
      'SuCasa - Welcome',
      'SuCasa - Your Home Goals',
      'SuCasa - Your Finances',
      'SuCasa - Calculating...',
      'SuCasa - Your Purchasing Power',
      'SuCasa - Create Account',
      'SuCasa - Personal Information'
    ]
    document.title = titles[currentStep] || 'SuCasa Home Loan Calculator'
  }, [currentStep, skipPurchasingPower])

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const getCurrentStepName = () => {
    return steps[currentStep]?.title || 'Step'
  }

  const canProceed = () => {
    const stepId = steps[currentStep]?.id
    
    switch (stepId) {
      case 'welcome':
        return formData.creditCheckTiming && formData.hasSeenPurchasingPower !== null
      case 'home-goals':
        return formData.loanPurpose && formData.buyingReason && formData.buyingTimeframe.length > 0 && formData.location
      case 'home-finances':
        return formData.incomes.some(income => income && parseFloat(income) > 0) && formData.savings && formData.loanPreference
      case 'calculating':
      case 'purchasing-power':
        return true
      case 'create-account':
        return formData.email && formData.password && formData.password.length >= 8
      case 'personal-info':
        return formData.applicant1FirstName && formData.applicant1LastName && formData.applicant1Birthday
      default:
        return false
    }
  }

  const renderStep = () => {
    const stepId = steps[currentStep]?.id

    // Show stepper for all steps except welcome and calculating
    const showStepperPanel = stepId !== 'welcome' && stepId !== 'calculating'

    switch (stepId) {
      case 'welcome':
        return <WelcomeStep formData={formData} updateFormData={updateFormDataObject} onNext={nextStep} />
      
      case 'home-goals':
        return (
          <>
            {showStepperPanel && renderStepperPanel()}
            <HomeGoalsStep formData={formData} updateFormData={updateFormDataObject} onNext={nextStep} />
          </>
        )
      
      case 'home-finances':
        return (
          <>
            {showStepperPanel && renderStepperPanel()}
            <HomeFinancesStep formData={formData} updateFormData={updateFormDataObject} onNext={nextStep} onBack={prevStep} />
          </>
        )
      
      case 'calculating':
        return <CalculatingPowerStep onNext={nextStep} />
      
      case 'purchasing-power':
        // Branch based on loan purpose
        let resultComponent
        if (formData.loanPurpose === 'refinancing') {
          resultComponent = <RefinancingSummaryStep formData={formData} updateFormData={updateFormDataObject} onNext={nextStep} onBack={prevStep} />
        } else if (formData.buyingReason === 'to-invest') {
          resultComponent = <InvestmentSnapshotStep formData={formData} updateFormData={updateFormDataObject} onNext={nextStep} onBack={prevStep} />
        } else {
          // Default to purchasing power for home buyers
          resultComponent = <PurchasingPowerPreviewStep formData={formData} updateFormData={updateFormDataObject} onNext={nextStep} onBack={prevStep} />
        }
        
        return (
          <>
            {showStepperPanel && renderStepperPanel()}
            {resultComponent}
          </>
        )
      
      case 'create-account':
        return (
          <>
            {showStepperPanel && renderStepperPanel()}
            <CreateAccountStep formData={formData} updateFormData={updateFormDataObject} onNext={nextStep} onBack={prevStep} />
          </>
        )
      
      case 'personal-info':
        return (
          <>
            {showStepperPanel && renderStepperPanel()}
            <PersonalInfoStep formData={formData} updateFormData={updateFormDataObject} onNext={nextStep} onBack={prevStep} />
          </>
        )
      
      default:
        return null
    }
  }

  const renderStepperPanel = () => {
    // Don't show stepper on welcome or calculating steps
    if (steps[currentStep]?.id === 'welcome' || steps[currentStep]?.id === 'calculating') {
      return null
    }

    return (
      <div className="top-stepper-panel">
        <div className="stepper-trigger" onClick={() => setShowStepper(!showStepper)}>
          <div className="current-step-indicator">
            <div className="step-circle">
              <span className="step-number">{currentStep + 1}</span>
            </div>
            <span className="step-text">{getCurrentStepName()}</span>
          </div>
          <ChevronDown className={`chevron ${showStepper ? 'open' : ''}`} size={16} />
        </div>

        {showStepper && (
          <div className="stepper-dropdown">
            {steps.map((step, index) => {
              // Skip welcome and calculating in the dropdown
              if (step.id === 'welcome' || step.id === 'calculating') return null
              
              return (
                <div
                  key={step.id}
                  className={`stepper-item ${index < currentStep ? 'completed' : ''} ${index === currentStep ? 'current' : ''}`}
                  onClick={() => index <= currentStep && setCurrentStep(index)}
                >
                  <div className="step-circle">
                    {index < currentStep ? <span className="check">✓</span> : <span className="step-number">{index + 1}</span>}
                  </div>
                  <div className="step-content">
                    <div className="step-title">{step.title}</div>
                    <div className="step-subtitle">Step {index + 1}</div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    )
  }

  // Calculate progress percentage
  const getProgressPercentage = () => {
    return ((currentStep + 1) / steps.length) * 100
  }

  return (
    <div className="calculator-flow">
      {/* Top Bar - hide on welcome and calculating steps */}
      {steps[currentStep]?.id !== 'welcome' && steps[currentStep]?.id !== 'calculating' && (
        <div className="top-bar">
          <div className="logo">
            <h1>SuCasa</h1>
          </div>
          <div className="progress-bar">
            <div className="progress-text">Step {currentStep + 1} of {steps.length} — {getCurrentStepName()}</div>
            <div className="progress-track">
              <div 
                className="progress-fill" 
                style={{ width: `${getProgressPercentage()}%` }}
              ></div>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="main-content">
        {renderStep()}
      </div>
    </div>
  )
}

export default CalculatorFlow