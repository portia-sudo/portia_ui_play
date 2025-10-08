import { useState } from 'react'
import { Mail, Phone, Shield, CheckCircle } from 'lucide-react'

function AccountStep({ formData, updateFormData, onNext }) {
  const [email, setEmail] = useState(formData.email || '')
  const [mobile, setMobile] = useState(formData.mobile || '')
  const [consentGiven, setConsentGiven] = useState(formData.consentGiven || false)
  const [contactMethod, setContactMethod] = useState('email') // 'email' or 'mobile'

  const handleEmailChange = (value) => {
    setEmail(value)
    updateFormData('email', value)
  }

  const handleMobileChange = (value) => {
    setMobile(value)
    updateFormData('mobile', value)
  }

  const handleConsentChange = (checked) => {
    setConsentGiven(checked)
    updateFormData('consentGiven', checked)
  }

  const handleContactMethodChange = (method) => {
    setContactMethod(method)
  }

  const handleCreateAccount = () => {
    if ((email || mobile) && consentGiven) {
      updateFormData('accountCreated', true)
      onNext()
    }
  }

  const canProceed = () => {
    return (email !== '' || mobile !== '') && consentGiven
  }

  return (
    <div className="step account-step">
      <div className="step-header">
        <h2>Create your account</h2>
        <p>Save your progress and get personalized updates</p>
      </div>

      {/* Contact method selection */}
      <div className="contact-method-selection">
        <h3>How would you like to create your account?</h3>
        <div className="contact-options">
          <div 
            className={`contact-option ${contactMethod === 'email' ? 'selected' : ''}`}
            onClick={() => handleContactMethodChange('email')}
          >
            <Mail size={24} className="contact-icon" />
            <div className="contact-details">
              <h4>Email</h4>
              <p>We'll send you updates and save your progress</p>
            </div>
          </div>
          <div 
            className={`contact-option ${contactMethod === 'mobile' ? 'selected' : ''}`}
            onClick={() => handleContactMethodChange('mobile')}
          >
            <Phone size={24} className="contact-icon" />
            <div className="contact-details">
              <h4>Mobile</h4>
              <p>We'll send you SMS updates and save your progress</p>
            </div>
          </div>
        </div>
      </div>

      {/* Contact input */}
      <div className="contact-input-section">
        {contactMethod === 'email' ? (
          <div className="input-group">
            <label htmlFor="email">Email address</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => handleEmailChange(e.target.value)}
              placeholder="Enter your email address"
              required
            />
          </div>
        ) : (
          <div className="input-group">
            <label htmlFor="mobile">Mobile number</label>
            <input
              id="mobile"
              type="tel"
              value={mobile}
              onChange={(e) => handleMobileChange(e.target.value)}
              placeholder="Enter your mobile number"
              required
            />
          </div>
        )}
      </div>

      {/* Trust signals */}
      <div className="trust-signals">
        <div className="trust-item">
          <Shield size={20} className="trust-icon" />
          <span>Your information is secure</span>
        </div>
        <div className="trust-item">
          <CheckCircle size={20} className="trust-icon" />
          <span>Save & resume anytime</span>
        </div>
      </div>

      {/* Consent */}
      <div className="consent-section">
        <label className="consent-checkbox">
          <input
            type="checkbox"
            checked={consentGiven}
            onChange={(e) => handleConsentChange(e.target.checked)}
          />
          <span className="checkmark"></span>
          <span className="consent-text">
            I consent to Sucasa using my information to provide personalized borrowing power estimates and updates
          </span>
        </label>
      </div>

      {/* Create account button */}
      <div className="step-actions">
        <button 
          className={`btn btn-primary btn-large ${!canProceed() ? 'disabled' : ''}`}
          onClick={handleCreateAccount}
          disabled={!canProceed()}
        >
          Create Account
        </button>
      </div>

      <div className="step-footer">
        <p className="footer-text">
          By creating an account, you agree to our Terms of Service and Privacy Policy. 
          You can unsubscribe from updates at any time.
        </p>
      </div>
    </div>
  )
}

export default AccountStep

