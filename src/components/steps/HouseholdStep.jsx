import { useState } from 'react'

function HouseholdStep({ formData, updateFormData, onNext }) {
  const [applicantType, setApplicantType] = useState(formData.applicantType || '')
  const [relationshipStatus, setRelationshipStatus] = useState(formData.relationshipStatus || '')
  const [children, setChildren] = useState(formData.children || 0)

  const handleApplicantTypeChange = (type) => {
    setApplicantType(type)
    updateFormData({ 
      applicantType: type,
      adults: type === 'joint' ? 2 : 1,
      secondApplicantOnLoan: type === 'joint'
    })
    
    // Reset relationship status when changing applicant type
    if (type !== 'joint') {
      setRelationshipStatus('')
      updateFormData({ relationshipStatus: '' })
    }
  }

  const handleRelationshipChange = (status) => {
    setRelationshipStatus(status)
    updateFormData({ relationshipStatus: status })
  }

  const handleChildrenChange = (value) => {
    setChildren(value)
    updateFormData({ children: value })
  }

  const canProceed = applicantType !== '' && relationshipStatus !== ''

  return (
    <div className="step household-step">
      <div className="step-header">
        <h2>Tell us about your household</h2>
        <p>This helps us calculate your borrowing power accurately</p>
      </div>

      <div className="household-section">
        <h3>Are you applying alone or with someone?</h3>
        <div className="applicant-type-options">
          <button 
            className={`applicant-type-btn ${applicantType === 'single' ? 'selected' : ''}`}
            onClick={() => handleApplicantTypeChange('single')}
          >
            <h4>Single Applicant</h4>
            <p>Just me</p>
          </button>
          <button 
            className={`applicant-type-btn ${applicantType === 'joint' ? 'selected' : ''}`}
            onClick={() => handleApplicantTypeChange('joint')}
          >
            <h4>Joint Application</h4>
            <p>Two of us</p>
          </button>
        </div>

        {applicantType === 'joint' && (
          <div className="relationship-section">
            <h4>What is your relationship status?</h4>
            <div className="relationship-options">
              <button 
                className={`relationship-btn ${relationshipStatus === 'married' ? 'selected' : ''}`}
                onClick={() => handleRelationshipChange('married')}
              >
                Married
              </button>
              <button 
                className={`relationship-btn ${relationshipStatus === 'defacto' ? 'selected' : ''}`}
                onClick={() => handleRelationshipChange('defacto')}
              >
                De Facto
              </button>
              <button 
                className={`relationship-btn ${relationshipStatus === 'other' ? 'selected' : ''}`}
                onClick={() => handleRelationshipChange('other')}
              >
                Other
              </button>
            </div>
          </div>
        )}

        {applicantType === 'single' && (
          <div className="relationship-section">
            <h4>What is your relationship status?</h4>
            <div className="relationship-dropdown">
              <select 
                value={relationshipStatus}
                onChange={(e) => handleRelationshipChange(e.target.value)}
                className="relationship-select"
              >
                <option value="">Select your status</option>
                <option value="single">Single</option>
                <option value="divorced">Divorced</option>
                <option value="widowed">Widowed</option>
                <option value="separated">Separated</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>
        )}

        <h3>How many dependants do you support?</h3>
        <div className="children-counter">
          <button 
            className="counter-btn" 
            onClick={() => handleChildrenChange(Math.max(0, children - 1))}
            disabled={children <= 0}
          >
            -
          </button>
          <span className="counter-value">{children}</span>
          <button 
            className="counter-btn" 
            onClick={() => handleChildrenChange(Math.min(5, children + 1))}
            disabled={children >= 5}
          >
            +
          </button>
        </div>
        <p className="help-text">Dependants are people you financially support (e.g. children)</p>
      </div>

      <div className="step-actions">
        <button 
          className="btn btn-primary btn-large"
          onClick={onNext}
          disabled={!canProceed}
        >
          Continue
        </button>
      </div>
    </div>
  )
}

export default HouseholdStep