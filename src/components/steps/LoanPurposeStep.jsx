import { useState } from 'react'

const LOAN_PURPOSES = [
  { 
    id: 'purchase', 
    title: 'Buy my first home'
  },
  { 
    id: 'refinance', 
    title: 'Refinance my home'
  },
  { 
    id: 'investment', 
    title: 'Invest in property'
  }
]

function LoanPurposeStep({ formData, updateFormData, onNext }) {
  const [selectedPurpose, setSelectedPurpose] = useState(formData.loanPurpose)

  const handleSelect = (purpose) => {
    setSelectedPurpose(purpose)
    updateFormData('loanPurpose', purpose)
    
    // Auto-advance to next step for all purposes
    setTimeout(() => {
      onNext()
    }, 500)
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
            <h3>{purpose.title}</h3>
          </div>
        ))}
      </div>
    </div>
  )
}

export default LoanPurposeStep
