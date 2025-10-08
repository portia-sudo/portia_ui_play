import { useEffect } from 'react'
import { Calculator, TrendingUp, Home, DollarSign } from 'lucide-react'

function CalculatingPowerStep({ onNext }) {
  useEffect(() => {
    // Automatically proceed to results after 3 seconds
    const timer = setTimeout(() => {
      onNext()
    }, 3000)

    return () => clearTimeout(timer)
  }, [onNext])

  return (
    <div className="step calculating-power-step">
      <div className="step-content">
        <div className="calculating-container">
          <div className="calculating-animation">
            <div className="pulse-circle pulse-1"></div>
            <div className="pulse-circle pulse-2"></div>
            <div className="pulse-circle pulse-3"></div>
            <div className="calculating-icon">
              <Calculator size={48} />
            </div>
          </div>

          <h1 className="calculating-title">Calculating your purchasing power...</h1>
          <p className="calculating-subtitle">We're analyzing your information to provide an accurate estimate</p>

          <div className="calculating-steps">
            <div className="calc-step">
              <div className="calc-step-icon">
                <DollarSign size={20} />
              </div>
              <span>Analyzing your income and expenses</span>
            </div>
            <div className="calc-step">
              <div className="calc-step-icon">
                <Home size={20} />
              </div>
              <span>Calculating maximum property value</span>
            </div>
            <div className="calc-step">
              <div className="calc-step-icon">
                <TrendingUp size={20} />
              </div>
              <span>Determining your purchasing power</span>
            </div>
          </div>

          <div className="loading-bar">
            <div className="loading-progress"></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CalculatingPowerStep
