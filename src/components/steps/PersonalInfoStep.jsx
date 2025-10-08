import { useState } from 'react'
import { User, Calendar, Users } from 'lucide-react'

function PersonalInfoStep({ formData, updateFormData, onNext, onBack }) {
  const [applicant1FirstName, setApplicant1FirstName] = useState(formData.applicant1FirstName || '')
  const [applicant1LastName, setApplicant1LastName] = useState(formData.applicant1LastName || '')
  const [applicant1Birthday, setApplicant1Birthday] = useState(formData.applicant1Birthday || '')
  const [applicant2FirstName, setApplicant2FirstName] = useState(formData.applicant2FirstName || '')
  const [applicant2LastName, setApplicant2LastName] = useState(formData.applicant2LastName || '')
  const [applicant2Birthday, setApplicant2Birthday] = useState(formData.applicant2Birthday || '')

  const handleContinue = () => {
    updateFormData({
      applicant1FirstName,
      applicant1LastName,
      applicant1Birthday,
      applicant2FirstName,
      applicant2LastName,
      applicant2Birthday
    })
    onNext()
  }

  const isJoint = formData.applicantType === 'joint'
  const canContinue = applicant1FirstName && applicant1LastName && applicant1Birthday && 
                      (!isJoint || (applicant2FirstName && applicant2LastName && applicant2Birthday))

  return (
    <div className="step personal-info-step">
      <div className="step-content">
        <div className="header-section">
          <h1 className="step-title">Tell us about yourself</h1>
          <p className="step-subtitle">We need some basic information to process your application</p>
        </div>

        <div className="form-blocks">
          {/* Applicant 1 */}
          <div className="form-block">
            <h3 className="block-title">
              <User size={20} />
              {isJoint ? 'First Applicant' : 'Your Information'}
            </h3>
            
            <div className="name-fields">
              <div className="field-group">
                <label>First Name</label>
                <input
                  type="text"
                  placeholder="First name"
                  value={applicant1FirstName}
                  onChange={(e) => setApplicant1FirstName(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '2px solid #e5e7eb',
                    borderRadius: '8px',
                    fontSize: '1rem'
                  }}
                />
              </div>
              
              <div className="field-group">
                <label>Last Name</label>
                <input
                  type="text"
                  placeholder="Last name"
                  value={applicant1LastName}
                  onChange={(e) => setApplicant1LastName(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '2px solid #e5e7eb',
                    borderRadius: '8px',
                    fontSize: '1rem'
                  }}
                />
              </div>
            </div>

            <div className="field-group" style={{ marginTop: '1rem' }}>
              <label>
                <Calendar size={16} style={{ display: 'inline', marginRight: '0.25rem' }} />
                Date of Birth
              </label>
              <input
                type="date"
                value={applicant1Birthday}
                onChange={(e) => setApplicant1Birthday(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '2px solid #e5e7eb',
                  borderRadius: '8px',
                  fontSize: '1rem'
                }}
              />
              <p className="hint-text">You must be 18 or older to apply</p>
            </div>
          </div>

          {/* Applicant 2 (if joint) */}
          {isJoint && (
            <div className="form-block">
              <h3 className="block-title">
                <Users size={20} />
                Second Applicant
              </h3>
              
              <div className="name-fields">
                <div className="field-group">
                  <label>First Name</label>
                  <input
                    type="text"
                    placeholder="First name"
                    value={applicant2FirstName}
                    onChange={(e) => setApplicant2FirstName(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      border: '2px solid #e5e7eb',
                      borderRadius: '8px',
                      fontSize: '1rem'
                    }}
                  />
                </div>
                
                <div className="field-group">
                  <label>Last Name</label>
                  <input
                    type="text"
                    placeholder="Last name"
                    value={applicant2LastName}
                    onChange={(e) => setApplicant2LastName(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      border: '2px solid #e5e7eb',
                      borderRadius: '8px',
                      fontSize: '1rem'
                    }}
                  />
                </div>
              </div>

              <div className="field-group" style={{ marginTop: '1rem' }}>
                <label>
                  <Calendar size={16} style={{ display: 'inline', marginRight: '0.25rem' }} />
                  Date of Birth
                </label>
                <input
                  type="date"
                  value={applicant2Birthday}
                  onChange={(e) => setApplicant2Birthday(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '2px solid #e5e7eb',
                    borderRadius: '8px',
                    fontSize: '1rem'
                  }}
                />
                <p className="hint-text">Both applicants must be 18 or older</p>
              </div>
            </div>
          )}
        </div>

        <div className="footer-section">
          <div className="button-group">
            <button className="back-btn" onClick={onBack}>
              Go back
            </button>
            <button 
              className={`continue-btn ${canContinue ? 'enabled' : 'disabled'}`}
              onClick={handleContinue}
              disabled={!canContinue}
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PersonalInfoStep
