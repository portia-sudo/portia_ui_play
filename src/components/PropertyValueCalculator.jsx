import { Home, DollarSign, TrendingUp } from 'lucide-react'

function PropertyValueCalculator({ propertyValue }) {
  return (
    <div className="property-value-calculator">
      <h3>What Property Can You Afford?</h3>
      <div className="property-card">
        <div className="property-icon">
          <Home size={32} />
        </div>
        <div className="property-details">
          <div className="property-value">
            ${propertyValue.maxPropertyValue.toLocaleString()}
          </div>
          <p className="property-label">Maximum Property Value</p>
          <div className="property-breakdown">
            <div className="breakdown-item">
              <DollarSign size={16} />
              <span>Loan: ${propertyValue.loanAmount.toLocaleString()}</span>
            </div>
            <div className="breakdown-item">
              <TrendingUp size={16} />
              <span>Deposit: ${propertyValue.deposit.toLocaleString()}</span>
            </div>
            <div className="breakdown-item">
              <span>LVR: {Math.round(propertyValue.lvr * 100)}%</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="property-explanation">
        <p>This calculation is based on:</p>
        <ul>
          <li>Your deposit of ${propertyValue.deposit.toLocaleString()}</li>
          <li>SuCasa's {Math.round(propertyValue.lvr * 100)}% LVR lending</li>
          <li>No Lenders Mortgage Insurance required</li>
          <li>Competitive interest rates</li>
        </ul>
      </div>
    </div>
  )
}

export default PropertyValueCalculator
