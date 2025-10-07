import { useState } from 'react'
import { User, Users } from 'lucide-react'

function ApplicantTypeStep({ formData, updateFormData, onNext }) {
  const [selectedType, setSelectedType] = useState(formData.applicantType)

  const handleSelect = (type) => {
    setSelectedType(type)
    updateFormData('applicantType', type)
    
    // Auto-advance to next step
    setTimeout(() => {
      onNext()
    }, 500)
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
        </div>
        
        <div 
          className={`option-card ${selectedType === 'joint' ? 'selected' : ''}`}
          onClick={() => handleSelect('joint')}
        >
          <div className="option-icon">
            <Users size={32} />
          </div>
          <h3>Two of Us</h3>
        </div>
      </div>
    </div>
  )
}

export default ApplicantTypeStep

