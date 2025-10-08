import { useState } from 'react'
import { Mail, Lock, Eye, EyeOff, Shield } from 'lucide-react'

function CreateAccountStep({ formData, updateFormData, onNext, onBack }) {
  const [email, setEmail] = useState(formData.email || '')
  const [password, setPassword] = useState(formData.password || '')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const handleCreateAccount = () => {
    updateFormData({
      email,
      password
    })
    onNext()
  }

  const canContinue = email && password && password === confirmPassword && password.length >= 8

  return (
    <div className="step create-account-step">
      <div className="step-content">
        <div className="header-section">
          <h1 className="step-title">Create Your Free Account</h1>
          <p className="step-subtitle">Secure your purchasing power estimate and continue your application</p>
        </div>

        <div className="form-blocks">
          <div className="form-block">
            <h3 className="block-title">
              <Mail size={20} />
              Email Address
            </h3>
            <input
              type="email"
              placeholder="your.email@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="text-input"
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '2px solid #e5e7eb',
                borderRadius: '8px',
                fontSize: '1rem'
              }}
            />
            <p className="hint-text">We'll use this to send you updates on your application</p>
          </div>

          <div className="form-block">
            <h3 className="block-title">
              <Lock size={20} />
              Create Password
            </h3>
            <div className="password-input-group">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="At least 8 characters"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="text-input"
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  paddingRight: '3rem',
                  border: '2px solid #e5e7eb',
                  borderRadius: '8px',
                  fontSize: '1rem'
                }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="password-toggle"
                style={{
                  position: 'absolute',
                  right: '0.75rem',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: '#6b7280'
                }}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            <p className="hint-text">Must be at least 8 characters long</p>
          </div>

          <div className="form-block">
            <h3 className="block-title">Confirm Password</h3>
            <div className="password-input-group">
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder="Re-enter your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="text-input"
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  paddingRight: '3rem',
                  border: '2px solid #e5e7eb',
                  borderRadius: '8px',
                  fontSize: '1rem'
                }}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="password-toggle"
                style={{
                  position: 'absolute',
                  right: '0.75rem',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: '#6b7280'
                }}
              >
                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {password && confirmPassword && password !== confirmPassword && (
              <p className="error-text" style={{ color: '#dc2626', fontSize: '0.875rem', marginTop: '0.5rem' }}>
                Passwords do not match
              </p>
            )}
          </div>
        </div>

        <div className="trust-box">
          <Shield size={20} />
          <div>
            <p style={{ margin: 0, fontWeight: 600 }}>Your information is secure</p>
            <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.875rem', color: '#6b7280' }}>
              We use bank-level encryption to protect your data. No credit check required.
            </p>
          </div>
        </div>

        <div className="footer-section">
          <div className="button-group">
            <button className="back-btn" onClick={onBack}>
              Go back
            </button>
            <button 
              className={`continue-btn ${canContinue ? 'enabled' : 'disabled'}`}
              onClick={handleCreateAccount}
              disabled={!canContinue}
            >
              Create Account & Continue
            </button>
          </div>
          <p className="privacy-text">
            By creating an account, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>
      </div>
    </div>
  )
}

export default CreateAccountStep
