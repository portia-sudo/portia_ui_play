import { useState } from 'react'
import { CheckCircle, Shield, Clock, DollarSign, Home, Users, ArrowRight, ChevronDown, ChevronUp, Info } from 'lucide-react'

function FirstHomeBuyerLanding({ onContinue }) {
  const [showExplainer, setShowExplainer] = useState(false)

  const comparisonData = [
    {
      feature: "Deposit Required",
      fhbScheme: "5% minimum (strict eligibility)",
      sucasa: "From 2%–5%, no LMI"
    },
    {
      feature: "Who Qualifies",
      fhbScheme: "Income + property caps",
      sucasa: "Available to most borrowers"
    },
    {
      feature: "Speed",
      fhbScheme: "Approval adds 4–6 weeks",
      sucasa: "Pre-approval in days"
    },
    {
      feature: "Flexibility",
      fhbScheme: "Limited lenders & conditions",
      sucasa: "Nationwide options"
    },
    {
      feature: "Costs",
      fhbScheme: "Still pay LMI later",
      sucasa: "No LMI, no annual fees"
    },
    {
      feature: "Freedom",
      fhbScheme: "Must meet scheme rules",
      sucasa: "You choose your home, your pace"
    }
  ]

  const trustIndicators = [
    { icon: Shield, text: "ASIC Regulated" },
    { icon: DollarSign, text: "No LMI" },
    { icon: Clock, text: "No Annual Fees" },
    { icon: Home, text: "Australian-Owned" }
  ]

  return (
    <div className="fhb-landing-page">
      {/* Side Popup Trigger */}
      <div className="side-popup-trigger">
        <button 
          className="popup-trigger-btn"
          onClick={() => setShowExplainer(true)}
        >
          <Info size={16} />
          How this works
        </button>
      </div>

      {/* Side Popup Panel */}
      {showExplainer && (
        <div className="side-popup-overlay" onClick={() => setShowExplainer(false)}>
          <div className="side-popup-panel" onClick={(e) => e.stopPropagation()}>
            <div className="popup-header">
              <h3>How this works</h3>
              <button 
                className="popup-close-btn"
                onClick={() => setShowExplainer(false)}
              >
                ×
              </button>
            </div>
            <div className="popup-content">
              <h4>LVR & Regulation Explained</h4>
              <p>
                <strong>LVR (Loan-to-Value Ratio)</strong> is the percentage of your property's value that you're borrowing. 
                A 98% LVR means you only need a 2% deposit.
              </p>
              <p>
                <strong>ASIC Regulation</strong> means we're monitored by Australia's financial watchdog, 
                ensuring responsible lending practices and your protection.
              </p>
              <p>
                <strong>No LMI</strong> means no Lender's Mortgage Insurance - saving you thousands in upfront costs.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1>You don't need a scheme to get started.</h1>
          <p className="hero-subhead">
            The First Home Buyer Scheme helps some people — but it's not the only way. 
            With SuCasa, you could buy sooner, with less waiting and more freedom.
          </p>
          <div className="hero-cta">
            <button className="btn btn-primary btn-large" onClick={onContinue}>
              See what's possible with SuCasa
            </button>
            <p className="microcopy">No credit check. Takes 60 seconds.</p>
          </div>
        </div>
      </section>

      {/* Comparison Section */}
      <section className="comparison-section">
        <div className="container">
          <h2>What's the Difference?</h2>
          
          <div className="comparison-table">
            <div className="comparison-header">
              <div className="header-cell">Feature</div>
              <div className="header-cell fhb">FHB Government Scheme</div>
              <div className="header-cell sucasa">SuCasa 98% LVR Home Loan</div>
            </div>
            
            {comparisonData.map((row, index) => (
              <div key={index} className="comparison-row">
                <div className="feature-cell">{row.feature}</div>
                <div className="fhb-cell">{row.fhbScheme}</div>
                <div className="sucasa-cell">
                  <span className="sucasa-text">{row.sucasa}</span>
                  <CheckCircle className="check-icon" size={16} />
                </div>
              </div>
            ))}
          </div>
          
          <p className="comparison-tagline">
            SuCasa gives you similar support, with fewer limits.
          </p>
        </div>
      </section>

      {/* Explainer Section */}
      <section className="explainer-section">
        <div className="container">
          <h2>Why SuCasa Can Offer This</h2>
          <p className="explainer-text">
            SuCasa is a regulated Australian lender offering loans up to 98% LVR with no LMI.
            That means you can borrow more responsibly, with the same deposit.
          </p>
          
          <div className="trust-indicators">
            {trustIndicators.map((indicator, index) => (
              <div key={index} className="trust-item">
                <indicator.icon className="trust-icon" size={20} />
                <span>{indicator.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Human Story Block */}
      <section className="story-section">
        <div className="container">
          <h2>We help everyday Australians buy their first home — without the red tape.</h2>
          
          <div className="story-card">
            <div className="story-content">
              <div className="story-icon">
                <Users size={24} />
              </div>
              <div className="story-text">
                <h3>Meet Olivia and Ryan</h3>
                <p>
                  They thought they needed the FHB Scheme, but with SuCasa, their 3% deposit was enough. 
                  They saved months of waiting — and thousands in LMI.
                </p>
                <div className="story-stats">
                  <div className="stat">
                    <span className="stat-number">3%</span>
                    <span className="stat-label">Deposit</span>
                  </div>
                  <div className="stat">
                    <span className="stat-number">$0</span>
                    <span className="stat-label">LMI Paid</span>
                  </div>
                  <div className="stat">
                    <span className="stat-number">7 days</span>
                    <span className="stat-label">To Approval</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call-to-Action Section */}
      <section className="cta-section">
        <div className="container">
          <h2>Ready to see what you could borrow?</h2>
          <p className="cta-subcopy">
            Get your borrowing power estimate — no commitment, no credit check.
          </p>
          
          <div className="cta-buttons">
            <button className="btn btn-primary btn-large" onClick={onContinue}>
              Estimate My Borrowing Power
            </button>
            <button className="btn btn-secondary btn-large">
              Compare My Options
            </button>
          </div>
          
          <p className="disclaimer">
            Based on typical lending criteria. Your actual borrowing power may vary.
          </p>
        </div>
      </section>
    </div>
  )
}

export default FirstHomeBuyerLanding
