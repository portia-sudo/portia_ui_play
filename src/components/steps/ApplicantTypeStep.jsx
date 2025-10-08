import { useState } from 'react'
import { Users } from 'lucide-react'

function ApplicantTypeStep({ formData, updateFormData, onNext }) {
  const [applicantType, setApplicantType] = useState(formData.applicantType || '')

  const handleSelect = (type) => {
    setApplicantType(type)
    updateFormData('applicantType', type)
    
    // Auto-advance to next step
    setTimeout(() => {
      onNext()
    }, 300)
  }

  return (
    <div className="step applicant-type-step">
      <div className="step-header">
        <h2>Who's buying?</h2>
        <p>This helps us customize the application for your situation</p>
      </div>

      <div className="applicant-type-content">
        <div className="applicant-type-options">
          <button 
            className={`applicant-type-btn ${applicantType === 'single' ? 'selected' : ''}`}
            onClick={() => handleSelect('single')}
          >
            <Users size={24} className="btn-icon" />
            <h4>Single Applicant</h4>
            <p>Just me</p>
          </button>
          <button 
            className={`applicant-type-btn ${applicantType === 'joint' ? 'selected' : ''}`}
            onClick={() => handleSelect('joint')}
          >
            <Users size={24} className="btn-icon" />
            <h4>Joint Application</h4>
            <p>Two of us</p>
          </button>
        </div>
      </div>
    </div>
  )
}

export default ApplicantTypeStep