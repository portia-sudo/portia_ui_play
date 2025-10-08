import { useState } from 'react'

const LOAN_PURPOSES = [
  { 
    id: 'first-home', 
    title: 'First Home Buyer'
  },
  { 
    id: 'refinance', 
    title: 'Refinancing'
  },
  { 
    id: 'investment', 
    title: 'Investment Property'
  },
  { 
    id: 'second-home', 
    title: 'Second Home'
  }
]

function PurchasingPowerLoanPurposeStep({ formData, updateFormData, onNext }) {
  const [selectedPurpose, setSelectedPurpose] = useState(formData.loanPurpose)

  const handleSelect = (purpose) => {
    setSelectedPurpose(purpose)
    updateFormData('loanPurpose', purpose)
    
    // Auto-advance to next step after selection
    setTimeout(() => {
      onNext()
    }, 500)
  }

  return (
    <div className="step loan-purpose-step">
      <div className="step-header">
        <h2>What type of property purchase are you considering?</h2>
        <p>This helps us provide you with the most relevant options and benefits</p>
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

export default PurchasingPowerLoanPurposeStep
