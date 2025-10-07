import { Shield, CheckCircle, ExternalLink } from 'lucide-react'

function TrustIndicators() {
  return (
    <div className="trust-indicators">
      <h3>Why Trust SuCasa?</h3>
      <div className="trust-grid">
        <div className="trust-item">
          <Shield size={24} className="trust-icon" />
          <div>
            <h4>ASIC Regulated</h4>
            <p>Fully licensed Australian lender</p>
            <a href="#" className="trust-link">
              View on ASIC register <ExternalLink size={14} />
            </a>
          </div>
        </div>
        
        <div className="trust-item">
          <CheckCircle size={24} className="trust-icon" />
          <div>
            <h4>No LMI Required</h4>
            <p>Save thousands on Lenders Mortgage Insurance</p>
          </div>
        </div>
        
        <div className="trust-item">
          <CheckCircle size={24} className="trust-icon" />
          <div>
            <h4>No Annual Fees</h4>
            <p>Keep more money in your pocket</p>
          </div>
        </div>
        
        <div className="trust-item">
          <CheckCircle size={24} className="trust-icon" />
          <div>
            <h4>Australian Owned</h4>
            <p>Supporting local families and communities</p>
          </div>
        </div>
      </div>
      
      <div className="rate-disclaimer">
        <p><strong>Current Rate:</strong> From 6.45% p.a. (comparison rate 6.67% p.a.)</p>
        <p><em>Rates subject to change. Terms and conditions apply.</em></p>
      </div>
    </div>
  )
}

export default TrustIndicators
