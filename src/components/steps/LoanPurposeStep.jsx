import { useState } from 'react'
import { Home, Building, RefreshCw, TrendingUp } from 'lucide-react'

const LOAN_PURPOSES = [
  { 
    id: 'purchase', 
    title: 'Buy my first home', 
    description: "I'm ready to find and purchase my first property",
    icon: Home,
    gradient: 'linear-gradient(135deg, #15F57C 0%, #3062E2 100%)',
    cta: 'Get started →'
  },
  { 
    id: 'refinance', 
    title: 'Refinance my home', 
    description: 'I want to review my current loan and find a better deal',
    icon: RefreshCw,
    gradient: 'linear-gradient(135deg, #FF7D9E 0%, #3062E2 100%)',
    cta: 'Get started →'
  },
  { 
    id: 'investment', 
    title: 'Invest in property', 
    description: "I'm looking to expand my property portfolio",
    icon: TrendingUp,
    gradient: 'linear-gradient(135deg, #FF7D9E 0%, #FF4B00 100%)',
    cta: 'Get started →'
  }
]

function LoanPurposeStep({ formData, updateFormData, onNext }) {
  const [selectedPurpose, setSelectedPurpose] = useState(formData.loanPurpose)

  const handleSelect = (purpose) => {
    setSelectedPurpose(purpose)
    updateFormData('loanPurpose', purpose)
    
    // Auto-advance for refinance (skip borrowing power calculation)
    if (purpose === 'refinance') {
      setTimeout(() => {
        onNext()
      }, 500)
    }
  }

  return (
    <div className="step loan-purpose-step">
      <div className="step-header">
        <h2>What brings you to SuCasa today?</h2>
        <p>Choose your goal so we can give you the most relevant guidance</p>
      </div>
      
      <div className="options-grid">
        {LOAN_PURPOSES.map((purpose) => (
          <div 
            key={purpose.id}
            className={`option-card ${selectedPurpose === purpose.id ? 'selected' : ''}`}
            onClick={() => handleSelect(purpose.id)}
          >
            <div className="option-icon" style={{ background: purpose.gradient }}>
              <purpose.icon size={24} />
            </div>
            <h3>{purpose.title}</h3>
            <p>{purpose.description}</p>
            <div className="option-cta">{purpose.cta}</div>
          </div>
        ))}
      </div>
      
      {selectedPurpose && selectedPurpose !== 'refinance' && (
        <div className="step-footer">
          <button 
            className="btn btn-primary btn-large"
            onClick={onNext}
          >
            Continue
          </button>
        </div>
      )}
      
      {selectedPurpose === 'refinance' && (
        <div className="refinance-notice">
          <p>For refinancing, we'll connect you with our team to discuss your specific needs.</p>
        </div>
      )}
    </div>
  )
}

export default LoanPurposeStep
