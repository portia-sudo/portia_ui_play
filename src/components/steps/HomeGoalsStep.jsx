import { useState } from 'react'
import { Users, Home, TrendingUp, MapPin, Clock, Gift } from 'lucide-react'

function HomeGoalsStep({ formData, updateFormData, onNext }) {
  const [loanPurpose, setLoanPurpose] = useState(formData.loanPurpose || '')
  const [buyingReason, setBuyingReason] = useState(formData.buyingReason || '')
  const [buyingTimeframe, setBuyingTimeframe] = useState(formData.buyingTimeframe || [])
  const [location, setLocation] = useState(formData.location || '')
  const [isFirstHomeBuyer, setIsFirstHomeBuyer] = useState(formData.isFirstHomeBuyer || false)

  const handleTimeframeToggle = (timeframe) => {
    if (buyingTimeframe.includes(timeframe)) {
      setBuyingTimeframe(buyingTimeframe.filter(t => t !== timeframe))
    } else {
      setBuyingTimeframe([...buyingTimeframe, timeframe])
    }
  }

  const handleContinue = () => {
    // Reset First Home Buyer status if refinancing or investing
    const shouldIncludeFHB = loanPurpose === 'buying' && buyingReason === 'to-live'
    
    updateFormData({
      loanPurpose,
      buyingReason,
      buyingTimeframe,
      location,
      isFirstHomeBuyer: shouldIncludeFHB ? isFirstHomeBuyer : false
    })
    onNext()
  }

  const canContinue = loanPurpose && buyingReason && buyingTimeframe.length > 0 && location

  return (
    <div className="step home-goals-step">
      <div className="step-content">
        <div className="header-section">
          <h1 className="step-title">Tell us about your home-buying goals</h1>
          <p className="step-subtitle">We'll use this to guide your personalised borrowing estimate.</p>
        </div>

        <div className="form-blocks">
          {/* 1️⃣ What are you doing? */}
          <div className="form-block">
            <h3 className="block-title">
              <Home size={20} />
              What are you doing?
            </h3>
            <div className="card-options">
              <button 
                className={`card-option ${loanPurpose === 'buying' ? 'selected' : ''}`}
                onClick={() => setLoanPurpose('buying')}
              >
                <Home size={24} />
                <span>Buying a home</span>
              </button>
              <button 
                className={`card-option ${loanPurpose === 'refinancing' ? 'selected' : ''}`}
                onClick={() => setLoanPurpose('refinancing')}
              >
                <TrendingUp size={24} />
                <span>Refinancing</span>
                <p className="microcopy">Refinancing? We can help you see how much you could save.</p>
              </button>
            </div>
          </div>

          {/* 3️⃣ Why are you buying? */}
          <div className="form-block">
            <h3 className="block-title">
              Why are you buying?
            </h3>
            <div className="option-group">
              <button 
                className={`option-btn ${buyingReason === 'to-live' ? 'selected' : ''}`}
                onClick={() => setBuyingReason('to-live')}
              >
                To live in
              </button>
              <button 
                className={`option-btn ${buyingReason === 'to-invest' ? 'selected' : ''}`}
                onClick={() => setBuyingReason('to-invest')}
              >
                To invest
              </button>
            </div>
            <p className="help-text">Lenders assess investment vs. owner-occupied loans differently.</p>
          </div>

          {/* 4️⃣ When are you buying? */}
          <div className="form-block">
            <h3 className="block-title">
              <Clock size={20} />
              When are you buying?
            </h3>
            <div className="chip-group">
              {['ASAP', 'Within 3 months', '3–6 months', '6–12 months', 'Just exploring'].map((timeframe) => (
                <button
                  key={timeframe}
                  className={`chip ${buyingTimeframe.includes(timeframe) ? 'selected' : ''}`}
                  onClick={() => handleTimeframeToggle(timeframe)}
                >
                  {timeframe}
                </button>
              ))}
            </div>
          </div>

          {/* 5️⃣ Where are you buying? */}
          <div className="form-block">
            <h3 className="block-title">
              <MapPin size={20} />
              Where are you buying?
            </h3>
            <div className="search-container">
              <select
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="location-search"
              >
                <option value="">Select a suburb...</option>
                <option value="Bondi, NSW 2026">Bondi, NSW 2026</option>
                <option value="Surry Hills, NSW 2010">Surry Hills, NSW 2010</option>
                <option value="Newtown, NSW 2042">Newtown, NSW 2042</option>
                <option value="Manly, NSW 2095">Manly, NSW 2095</option>
                <option value="Paddington, NSW 2021">Paddington, NSW 2021</option>
                <option value="Fitzroy, VIC 3065">Fitzroy, VIC 3065</option>
                <option value="South Yarra, VIC 3141">South Yarra, VIC 3141</option>
                <option value="St Kilda, VIC 3182">St Kilda, VIC 3182</option>
                <option value="Fortitude Valley, QLD 4006">Fortitude Valley, QLD 4006</option>
                <option value="New Farm, QLD 4005">New Farm, QLD 4005</option>
                <option value="West End, QLD 4101">West End, QLD 4101</option>
                <option value="Fremantle, WA 6160">Fremantle, WA 6160</option>
                <option value="Subiaco, WA 6008">Subiaco, WA 6008</option>
                <option value="Cottesloe, WA 6011">Cottesloe, WA 6011</option>
              </select>
              {!location && (
                <p className="help-text">Select a suburb to see if we can lend in your area.</p>
              )}
            </div>
          </div>

          {/* 6️⃣ Are you a First Home Buyer? - Only show for home buyers, not refinancers or investors */}
          {loanPurpose === 'buying' && buyingReason === 'to-live' && (
            <div className="form-block">
              <h3 className="block-title">
                Are you a First Home Buyer?
              </h3>
              <div className="toggle-group">
                <button 
                  className={`toggle-btn ${isFirstHomeBuyer ? 'active' : ''}`}
                  onClick={() => setIsFirstHomeBuyer(true)}
                >
                  Yes
                </button>
                <button 
                  className={`toggle-btn ${!isFirstHomeBuyer ? 'active' : ''}`}
                  onClick={() => setIsFirstHomeBuyer(false)}
                >
                  No
                </button>
              </div>
              
              {isFirstHomeBuyer && (
                <div className="info-box">
                  <Gift size={16} />
                  <p>You may be eligible for the First Home Buyer scheme. Here's how SuCasa differs: we can help you buy with just a 2% deposit, with a great maximum purchasing price.</p>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="footer-section">
          <button 
            className={`continue-btn ${canContinue ? 'enabled' : 'disabled'}`}
            onClick={handleContinue}
            disabled={!canContinue}
          >
            Continue
          </button>
          <p className="privacy-text">We only use your answers to calculate an estimate — no credit check.</p>
        </div>
      </div>
    </div>
  )
}

export default HomeGoalsStep
