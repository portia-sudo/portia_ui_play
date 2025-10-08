import { useState } from 'react'
import { FileText, Shield, Camera, Upload, CheckCircle, Clock, Users } from 'lucide-react'

function VerificationPreviewStep({ formData, updateFormData, onNext, onBack }) {
  const [documentsReady, setDocumentsReady] = useState(false)

  const requiredDocuments = [
    {
      id: 'id',
      title: 'Government-issued ID',
      description: 'Driver\'s license, passport, or Medicare card',
      icon: Shield,
      examples: ['Driver\'s License', 'Passport', 'Medicare Card']
    },
    {
      id: 'income',
      title: 'Income Verification',
      description: 'Recent payslips, tax returns, or bank statements',
      icon: FileText,
      examples: ['Latest 2 payslips', 'Tax return (if self-employed)', 'Bank statements']
    },
    {
      id: 'biometric',
      title: 'Identity Verification',
      description: 'Quick photo verification for security',
      icon: Camera,
      examples: ['Selfie photo', 'ID verification']
    }
  ]

  const verificationSteps = [
    {
      step: 1,
      title: 'Upload Documents',
      description: 'Upload your ID and income documents securely',
      icon: Upload,
      estimated: '2-3 minutes'
    },
    {
      step: 2,
      title: 'Identity Verification',
      description: 'Quick photo verification process',
      icon: Camera,
      estimated: '1 minute'
    },
    {
      step: 3,
      title: 'Review & Submit',
      description: 'We\'ll review your application',
      icon: CheckCircle,
      estimated: '24-48 hours'
    }
  ]

  return (
    <div className="step verification-preview-step">
      <div className="step-header">
        <h2>Ready for Verification</h2>
        <p>You're almost there! Here's what we need to complete your application</p>
        <div className="progress-indicator">
          <span className="step-text">Step 6 of 6</span>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: '100%' }}></div>
          </div>
        </div>
      </div>

      <div className="verification-content">
        <div className="verification-intro">
          <div className="intro-card">
            <CheckCircle size={32} className="success-icon" />
            <div className="intro-text">
              <h3>Excellent! You're ready for the final step</h3>
              <p>We have everything we need to process your application. The verification process is quick and secure.</p>
            </div>
          </div>
        </div>

        <div className="documents-section">
          <h3>Documents you'll need to upload:</h3>
          <div className="documents-grid">
            {requiredDocuments.map((doc) => (
              <div key={doc.id} className="document-card">
                <div className="document-header">
                  <div className="document-icon">
                    <doc.icon size={24} />
                  </div>
                  <div className="document-title">
                    <h4>{doc.title}</h4>
                    <p>{doc.description}</p>
                  </div>
                </div>
                <div className="document-examples">
                  <h5>Examples:</h5>
                  <ul>
                    {doc.examples.map((example, index) => (
                      <li key={index}>{example}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="process-section">
          <h3>What happens next:</h3>
          <div className="process-steps">
            {verificationSteps.map((step) => (
              <div key={step.step} className="process-step">
                <div className="step-number">
                  <span>{step.step}</span>
                </div>
                <div className="step-icon">
                  <step.icon size={24} />
                </div>
                <div className="step-content">
                  <h4>{step.title}</h4>
                  <p>{step.description}</p>
                  <span className="estimated-time">{step.estimated}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="security-notice">
          <div className="security-header">
            <Shield size={20} className="security-icon" />
            <h4>Your information is secure</h4>
          </div>
          <div className="security-features">
            <div className="security-item">
              <CheckCircle size={16} />
              <span>Bank-level encryption</span>
            </div>
            <div className="security-item">
              <CheckCircle size={16} />
              <span>ASIC regulated</span>
            </div>
            <div className="security-item">
              <CheckCircle size={16} />
              <span>Privacy protected</span>
            </div>
          </div>
        </div>

        <div className="timeline-preview">
          <div className="timeline-header">
            <Clock size={20} className="timeline-icon" />
            <h4>Expected Timeline</h4>
          </div>
          <div className="timeline-content">
            <div className="timeline-item">
              <span className="timeline-period">Today</span>
              <span className="timeline-action">Upload documents & verify identity</span>
            </div>
            <div className="timeline-item">
              <span className="timeline-period">24-48 hours</span>
              <span className="timeline-action">Receive pre-approval decision</span>
            </div>
            <div className="timeline-item">
              <span className="timeline-period">Within 1 week</span>
              <span className="timeline-action">Start property searching with confidence</span>
            </div>
          </div>
        </div>
      </div>

      <div className="step-actions">
        <button 
          className="btn btn-secondary"
          onClick={onBack}
        >
          Back
        </button>
        <button 
          className="btn btn-primary btn-large"
          onClick={onNext}
        >
          Start Document Upload
        </button>
      </div>
    </div>
  )
}

export default VerificationPreviewStep

