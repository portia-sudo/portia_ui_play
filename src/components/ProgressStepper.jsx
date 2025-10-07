import { CheckCircle } from 'lucide-react'

function ProgressStepper({ steps, currentStep, onStepClick }) {
  return (
    <div className="progress-stepper">
      <div className="stepper-container">
        {steps.map((step, index) => {
          const isCompleted = index < currentStep
          const isCurrent = index === currentStep
          const isClickable = index <= currentStep
          
          return (
            <div 
              key={step.id}
              className={`stepper-step ${isCompleted ? 'completed' : ''} ${isCurrent ? 'current' : ''} ${isClickable ? 'clickable' : ''}`}
              onClick={isClickable ? () => onStepClick(index) : undefined}
            >
              <div className="step-circle">
                {isCompleted ? (
                  <CheckCircle size={20} />
                ) : (
                  <step.icon size={20} />
                )}
              </div>
              <div className="step-content">
                <span className="step-title">{step.title}</span>
                <span className="step-number">{index + 1} of {steps.length}</span>
              </div>
              {index < steps.length - 1 && (
                <div className="step-connector"></div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default ProgressStepper
