import { useState, useEffect, useRef } from 'react'
import { Home, ChevronLeft, Check, Info } from 'lucide-react'
import ProgressStepper from '../ProgressStepper'

function FirstHomeBuyerStep({ formData, updateFormData, onNext, onBack }) {
  const [selectedChoice, setSelectedChoice] = useState(formData.firstHomeBuyer)
  const [focusedIndex, setFocusedIndex] = useState(-1)
  const cardRefs = useRef([])
  const startTime = useRef(Date.now())

  const STEPS = [
    { id: 'loan-purpose', title: 'Loan Purpose', icon: Home },
    { id: 'applicant-type', title: 'Applicants', icon: Home },
    { id: 'income', title: 'Financial Details', icon: Home },
    { id: 'first-home-buyer', title: 'First Home Buyer', icon: Home },
    { id: 'results', title: 'Results', icon: Home }
  ]

  const choices = [
    {
      id: 'yes',
      title: 'Yes, this is my first home',
      bullets: [
        'I haven\'t owned property before',
        'Show me first-home buyer benefits'
      ],
      badge: 'Up to 98% LVR available',
      badgeType: 'success'
    },
    {
      id: 'no',
      title: 'No, I\'ve owned before',
      bullets: [
        'I\'ve owned property or I\'m not eligible for first-home schemes'
      ],
      badge: 'Great options still available',
      badgeType: 'neutral'
    }
  ]

  // Handle selection
  const handleSelect = (choiceId) => {
    setSelectedChoice(choiceId)
    updateFormData('firstHomeBuyer', choiceId)
    
    // Track selection time
    const timeToSelect = Date.now() - startTime.current
    
    // Auto-advance to next step after selection
    setTimeout(() => {
      onNext()
    }, 500)
  }

  // Handle keyboard navigation
  const handleKeyDown = (event) => {
    switch (event.key) {
      case 'ArrowUp':
      case 'ArrowLeft':
        event.preventDefault()
        setFocusedIndex(prev => prev <= 0 ? 1 : prev - 1)
        break
      case 'ArrowDown':
      case 'ArrowRight':
        event.preventDefault()
        setFocusedIndex(prev => prev >= 1 ? 0 : prev + 1)
        break
      case 'Enter':
      case ' ':
        event.preventDefault()
        if (focusedIndex >= 0) {
          handleSelect(choices[focusedIndex].id)
        }
        break
    }
  }

  // Focus management
  useEffect(() => {
    if (focusedIndex >= 0 && cardRefs.current[focusedIndex]) {
      cardRefs.current[focusedIndex].focus()
    }
  }, [focusedIndex])

  // Set initial focus
  useEffect(() => {
    const handleInitialFocus = () => {
      setFocusedIndex(0)
    }
    
    // Small delay to ensure component is mounted
    const timer = setTimeout(handleInitialFocus, 100)
    return () => clearTimeout(timer)
  }, [])

  // Check if form can proceed
  const canProceed = selectedChoice !== undefined && selectedChoice !== null

  return (
    <div className="fhb-step">
      <div className="top-stepper-panel">
        <ProgressStepper
          steps={STEPS}
          currentStep={3}
          onStepClick={() => {}}
        />
      </div>

      <div className="step-header">
        <h1>Are you a first-home buyer?</h1>
        <p>This helps us show you the right options and benefits.</p>
        <div className="progress-indicator">
          Step 4 of 5
        </div>
      </div>
      
      <div className="fhb-container">
        <div 
          className="choice-cards"
          role="radiogroup"
          aria-labelledby="fhb-question"
          onKeyDown={handleKeyDown}
          tabIndex="-1"
        >
          {choices.map((choice, index) => (
            <div
              key={choice.id}
              ref={el => cardRefs.current[index] = el}
              className={`choice-card ${selectedChoice === choice.id ? 'selected' : ''} ${
                focusedIndex === index ? 'focused' : ''
              }`}
              onClick={() => handleSelect(choice.id)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  handleSelect(choice.id)
                }
              }}
              role="radio"
              aria-checked={selectedChoice === choice.id}
              tabIndex="0"
              aria-describedby={`choice-${choice.id}-description`}
            >
              <div className="card-content">
                <div className="card-header">
                  <h3>{choice.title}</h3>
                  {selectedChoice === choice.id && (
                    <div className="checkmark" aria-hidden="true">
                      <Check size={20} />
                    </div>
                  )}
                </div>
                
                <div className="card-bullets">
                  {choice.bullets.map((bullet, bulletIndex) => (
                    <p key={bulletIndex} className="bullet-point">
                      {bullet}
                    </p>
                  ))}
                </div>
                
                <div className={`card-badge ${choice.badgeType}`}>
                  {choice.badge}
                </div>
              </div>
              
              <div id={`choice-${choice.id}-description`} className="sr-only">
                {choice.title}. {choice.bullets.join('. ')}. {choice.badge}.
              </div>
            </div>
          ))}
        </div>

        {/* Anxiety-reduction notice */}
        <div className="anxiety-reduction-notice" aria-live="polite">
          <Info size={16} className="info-icon" />
          <p>
            <strong>Good news:</strong> If you're not eligible for the scheme, 
            we'll still show what's possible with Sucasa — often sooner and with no LMI.
          </p>
        </div>
      </div>
      
      {/* Navigation buttons */}
      <div className="step-navigation">
        <button 
          className="btn btn-secondary"
          onClick={onBack}
        >
          <ChevronLeft size={20} />
          Back
        </button>
        <button 
          className="btn btn-primary btn-full-width"
          onClick={onNext}
          disabled={!canProceed}
        >
          Next
        </button>
      </div>
    </div>
  )
}

export default FirstHomeBuyerStep