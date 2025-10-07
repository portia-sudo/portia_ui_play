import { useState } from 'react'
import { Home } from 'lucide-react'
import FirstHomeBuyerLanding from '../FirstHomeBuyerLanding'

function FirstHomeBuyerStep({ formData, updateFormData, onNext }) {
  const [isFirstHomeBuyer, setIsFirstHomeBuyer] = useState(formData.firstHomeBuyer)

  const handleSelect = (value) => {
    setIsFirstHomeBuyer(value)
    updateFormData('firstHomeBuyer', value)
    
    // Auto-advance to next step for both options
    setTimeout(() => {
      onNext()
    }, 500)
  }

  return (
    <div className="step first-home-buyer-step">
      <div className="step-header">
        <div className="step-icon">
          <Home size={48} />
        </div>
        <h2>Are you a first-home buyer?</h2>
        <p>This helps us show you relevant schemes and benefits</p>
      </div>
      
      <div className="options-grid">
        <div 
          className={`option-card ${isFirstHomeBuyer === true ? 'selected' : ''}`}
          onClick={() => handleSelect(true)}
        >
          <h3>Yes, this is my first home</h3>
          <p>I haven't owned property before and I'm eligible for first-home buyer benefits</p>
          <div className="option-badge">
            Up to 98% LVR available
          </div>
        </div>
        
        <div 
          className={`option-card ${isFirstHomeBuyer === false ? 'selected' : ''}`}
          onClick={() => handleSelect(false)}
        >
          <h3>No, I've owned before</h3>
          <p>I've previously owned property or I'm not eligible for first-home buyer schemes</p>
          <div className="option-badge secondary">
            Still great options available
          </div>
        </div>
      </div>
      
      <div className="info-box">
        <div className="info-icon">i</div>
        <p>Don't worry — if you're not eligible for the scheme, we'll still show you what's possible with SuCasa.</p>
      </div>
    </div>
  )
}

export default FirstHomeBuyerStep
