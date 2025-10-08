import { useState } from 'react'
import { Edit3, Check, DollarSign, Target, PiggyBank, TrendingUp, Users, MapPin } from 'lucide-react'

function ReviewConfirmStep({ formData, updateFormData, onNext, onBack }) {
  const [editingField, setEditingField] = useState(null)
  const [editValues, setEditValues] = useState({})

  const formatCurrency = (value) => {
    if (!value) return ''
    const numValue = parseFloat(value.replace(/[^\d]/g, ''))
    if (isNaN(numValue)) return ''
    return numValue.toLocaleString()
  }

  const handleEdit = (field, currentValue) => {
    setEditingField(field)
    setEditValues({ ...editValues, [field]: currentValue })
  }

  const handleSave = (field) => {
    updateFormData(field, editValues[field])
    setEditingField(null)
    setEditValues({ ...editValues, [field]: '' })
  }

  const handleCancel = (field) => {
    setEditingField(null)
    setEditValues({ ...editValues, [field]: '' })
  }

  const handleEditValueChange = (field, value) => {
    setEditValues({ ...editValues, [field]: value })
  }

  const EditableCard = ({ icon: Icon, title, subtitle, value, field, type = 'currency' }) => {
    const isEditing = editingField === field
    const displayValue = isEditing ? editValues[field] || '' : value

    return (
      <div className={`review-card ${isEditing ? 'editing' : ''}`}>
        <div className="card-header">
          <div className="card-icon">
            <Icon size={24} />
          </div>
          <div className="card-title">
            <h4>{title}</h4>
            <p>{subtitle}</p>
          </div>
          <div className="card-actions">
            {!isEditing ? (
              <button 
                className="edit-btn"
                onClick={() => handleEdit(field, value)}
              >
                <Edit3 size={16} />
              </button>
            ) : (
              <div className="edit-actions">
                <button 
                  className="save-btn"
                  onClick={() => handleSave(field)}
                >
                  <Check size={16} />
                </button>
                <button 
                  className="cancel-btn"
                  onClick={() => handleCancel(field)}
                >
                  ×
                </button>
              </div>
            )}
          </div>
        </div>
        
        <div className="card-content">
          {isEditing ? (
            <div className="edit-input">
              {type === 'currency' ? (
                <div className="currency-input-edit">
                  <DollarSign size={20} />
                  <input
                    type="text"
                    value={displayValue}
                    onChange={(e) => handleEditValueChange(field, e.target.value)}
                    placeholder="0"
                    autoFocus
                  />
                </div>
              ) : (
                <input
                  type="text"
                  value={displayValue}
                  onChange={(e) => handleEditValueChange(field, e.target.value)}
                  placeholder={subtitle}
                  autoFocus
                />
              )}
            </div>
          ) : (
            <div className="card-value">
              {type === 'currency' ? `$${formatCurrency(value)}` : value}
            </div>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="step review-confirm-step">
      <div className="step-header">
        <h2>Let's make sure everything looks right</h2>
        <p>Review your details and make any final adjustments before we move to verification</p>
        <div className="progress-indicator">
          <span className="step-text">Step 5 of 6</span>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: '83%' }}></div>
          </div>
        </div>
      </div>

      <div className="review-content">
        <div className="review-intro">
          <div className="intro-message">
            <Check size={32} className="check-icon" />
            <div>
              <h3>Looks great — you're on track for pre-approval</h3>
              <p>We've built your tailored solution based on your preferences. Everything looks good, but feel free to make any adjustments below.</p>
            </div>
          </div>
        </div>

        <div className="review-cards">
          <EditableCard
            icon={DollarSign}
            title="Ideal Purchase Price"
            subtitle="Your target property price range"
            value={formData.idealPurchasePrice}
            field="idealPurchasePrice"
            type="currency"
          />

          <EditableCard
            icon={TrendingUp}
            title="Target Monthly Repayment"
            subtitle="Your comfortable monthly payment"
            value={formData.targetMonthlyRepayment}
            field="targetMonthlyRepayment"
            type="currency"
          />

          <EditableCard
            icon={PiggyBank}
            title="Planned Deposit"
            subtitle="Including stamp duty and fees"
            value={formData.plannedDeposit}
            field="plannedDeposit"
            type="currency"
          />

          <EditableCard
            icon={TrendingUp}
            title="Monthly Savings"
            subtitle="Your monthly savings contribution"
            value={formData.monthlySavings}
            field="monthlySavings"
            type="currency"
          />

          <EditableCard
            icon={Users}
            title="Application Type"
            subtitle="Single or joint application"
            value={formData.applicantType === 'single' ? 'Single Applicant' : 'Joint Application'}
            field="applicantType"
            type="text"
          />

          <EditableCard
            icon={MapPin}
            title="Property Location"
            subtitle="Where you're looking to buy"
            value={`${formData.suburb}, ${formData.state} ${formData.postcode}`}
            field="location"
            type="text"
          />
        </div>

        <div className="validation-message">
          <div className="validation-icon">
            <Check size={20} />
          </div>
          <div className="validation-content">
            <h4>Your information is complete and accurate</h4>
            <p>All required details have been captured correctly. You're ready to proceed to the next stage.</p>
          </div>
        </div>

        <div className="next-steps-preview">
          <h4>What happens next:</h4>
          <div className="next-steps-list">
            <div className="next-step-item">
              <div className="step-number">1</div>
              <div className="step-content">
                <h5>Document Verification</h5>
                <p>Upload your ID and income documents</p>
              </div>
            </div>
            <div className="next-step-item">
              <div className="step-number">2</div>
              <div className="step-content">
                <h5>Pre-approval</h5>
                <p>Receive your conditional pre-approval</p>
              </div>
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
          Continue to Verification & Uploads
        </button>
      </div>
    </div>
  )
}

export default ReviewConfirmStep

