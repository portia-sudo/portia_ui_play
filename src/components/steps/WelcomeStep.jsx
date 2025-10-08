import { useState } from 'react'
import { Home, ArrowRight, Users, Info } from 'lucide-react'

function WelcomeStep({ formData, updateFormData, onNext }) {
  const [creditCheckTiming, setCreditCheckTiming] = useState('at-submission')
  const [hasSeenPurchasingPower, setHasSeenPurchasingPower] = useState(false) // Default to "No, I haven't"

  const handleContinue = () => {
    updateFormData({
      creditCheckTiming,
      hasSeenPurchasingPower
    })
    onNext()
  }

  const canContinue = creditCheckTiming && hasSeenPurchasingPower !== null

  return (
    <div className="step welcome-step">
      <div className="step-content">
        <div className="welcome-header">
          <h1 className="welcome-title">Before we get started</h1>
        </div>

        <div className="main-question-section">
          <h2 className="question-title">When should we run a credit check?</h2>
          
          <div className="credit-check-options">
            <button 
              className={`credit-check-btn ${creditCheckTiming === 'at-submission' ? 'selected' : ''}`}
              onClick={() => setCreditCheckTiming('at-submission')}
            >
              At submission
            </button>
            
            <button 
              className={`credit-check-btn ${creditCheckTiming === 'call-first' ? 'selected' : ''}`}
              onClick={() => setCreditCheckTiming('call-first')}
            >
              Call me first
            </button>
          </div>

          <div className="info-box">
            <Users size={16} />
            <p>It is faster to assess applications with credit checks at submission</p>
          </div>

          <div className="purchasing-power-section">
            <h3 className="secondary-question">Have you already seen your purchasing power with us?</h3>
            
            <div className="purchasing-power-options">
              <button 
                className={`purchasing-power-btn ${hasSeenPurchasingPower === false ? 'selected' : ''}`}
                onClick={() => setHasSeenPurchasingPower(false)}
              >
                No, I haven't
              </button>
              
              <button 
                className={`purchasing-power-btn ${hasSeenPurchasingPower === true ? 'selected' : ''}`}
                onClick={() => setHasSeenPurchasingPower(true)}
              >
                Yes, I have
              </button>
            </div>

            {hasSeenPurchasingPower === true && (
              <button 
                className="skip-link"
                onClick={() => setHasSeenPurchasingPower(false)}
              >
                Skip the first steps
              </button>
            )}
          </div>
        </div>

        <div className="welcome-footer">
          <button 
            className={`continue-btn ${canContinue ? 'enabled' : 'disabled'}`}
            onClick={handleContinue}
            disabled={!canContinue}
          >
            Next
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  )
}

export default WelcomeStep
