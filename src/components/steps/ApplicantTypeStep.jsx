import { useState } from 'react'
import { User, Users } from 'lucide-react'

function ApplicantTypeStep({ formData, updateFormData, onNext }) {
  const [selectedType, setSelectedType] = useState(formData.applicantType)

  const handleSelect = (type) => {
    setSelectedType(type)
    updateFormData('applicantType', type)
  }

  return (
    <div className="step applicant-type-step">
      <div className="step-header">
        <h2>Are you applying alone or with someone?</h2>
        <p>This helps us calculate your combined borrowing power</p>
      </div>
      
      <div className="options-grid">
        <div 
          className={`option-card ${selectedType === 'single' ? 'selected' : ''}`}
          onClick={() => handleSelect('single')}
        >
          <div className="option-icon">
            <User size={32} />
          </div>
          <h3>Just Me</h3>
          <p>Single applicant</p>
        </div>
        
        <div 
          className={`option-card ${selectedType === 'joint' ? 'selected' : ''}`}
          onClick={() => handleSelect('joint')}
        >
          <div className="option-icon">
            <Users size={32} />
          </div>
          <h3>Joint Application</h3>
          <p>Applying with a partner or co-borrower</p>
        </div>
      </div>
      
      {selectedType && (
        <div className="step-footer">
          <button 
            className="btn btn-primary btn-large"
            onClick={onNext}
          >
            Continue
          </button>
        </div>
      )}
    </div>
  )
}

export default ApplicantTypeStep
