# SuCasa - Multi-Purpose Flow Documentation

## Overview

The SuCasa application features three distinct user flows tailored to different customer needs:
1. **Home Buyers** (Owner-Occupier)
2. **Refinancers**
3. **Investors**

Each flow is designed to provide the most relevant information and calculations for that specific use case.

---

## 🏠 Flow 1: Home Buyers (Owner-Occupier)

### **User Intent**
- Purchasing a home to live in (first home or upgrading)
- Want to know: "How much can I afford to buy?"

### **Unique Questions Asked**
- **Income & Expenses:** Standard household financial questions
- **Savings/Deposit:** How much they have saved
- **Location:** Suburb/postcode they're looking to buy in
- **Dependents:** Number of people financially dependent on them
- **First Home Buyer Status:** Eligibility for FHB scheme

### **Calculations Used**
- **Borrowing Multiplier:** 4.5-5.5x annual income (based on expenses)
- **Interest Rate:** 5.98% p.a. (owner-occupier rate)
- **Loan Term:** Adjustable based on loan preference (15-30 years)
- **LVR:** Can go up to 98% (with 2% minimum deposit)
- **Expense Assessment:** HEM-based calculation adjusted by dependents

### **Result Page: "Purchasing Power Preview"**

**Primary Metric:**
```
"You could borrow up to $820,000"
```

**Key Information Displayed:**
- Maximum borrowing amount (large, bold number)
- Deposit required (2% minimum)
- Estimated interest rate (5.98% p.a.)
- Estimated monthly repayments
- Loan term (based on preference)

**Unique Features:**
- **FHB Scheme Comparison:** If they're a first home buyer, shows how SuCasa differs:
  - FHB Scheme: 5% deposit, Gov't backed, Limited eligibility
  - SuCasa: 2% deposit, Same rate, Broader criteria, Up to $3M+ property value
- **Educational Context:** Explains 2% deposit advantage
- **Purchasing Power Focus:** Emphasizes "how much can you buy"

**Call to Action:**
- "Create your free account" (primary)
- "Edit my details" (secondary)

---

## 💰 Flow 2: Refinancers

### **User Intent**
- Already have a home loan with another lender
- Want to know: "How much could I save?" and "Can I access equity?"

### **Unique Questions Asked**
- **Current Loan Balance:** How much they still owe
- **Current Interest Rate:** What rate they're currently paying
- **Remaining Loan Term:** How many years left on their loan
- **Property Value:** Current estimated value of their property
- **Income & Expenses:** Standard financial questions (for equity assessment)

### **Calculations Used**
- **Current Monthly Payment:** Calculated from balance, rate, and term
- **SuCasa Monthly Payment:** Calculated at 5.98% p.a. rate
- **Monthly Savings:** Difference between current and SuCasa payments
- **Total Interest Saved:** Lifetime savings over remaining term
- **Available Equity:** 80% LVR - current balance
- **Equity Formula:** `(Property Value × 0.80) - Current Loan Balance`

### **Result Page: "Refinancing Summary"**

**Primary Metric:**
```
"You could save up to $450 per month"
```

**Key Information Displayed:**
- Monthly savings amount (large, green number)
- Current monthly payment vs SuCasa payment
- Current interest rate vs SuCasa rate (5.98% p.a.)
- Total interest saved over loan term
- Projected repayment timeline

**Unique Features:**
- **Equity Access Card:** Separate section showing:
  ```
  "You could access up to $150,000 in available equity"
  ```
  - Property value
  - Current loan balance
  - Maximum loan at 80% LVR
  - Available equity for cash-out
- **Savings Focus:** Emphasizes "how much you'll save" not "how much you can borrow"
- **Use Cases:** Mentions equity can be used for:
  - Renovations
  - Debt consolidation
  - Investment purposes

**Call to Action:**
- "Create your free account" (primary)
- "Edit my details" (secondary)
- No FHB scheme comparison (not relevant)

---

## 📈 Flow 3: Investors

### **User Intent**
- Buying property as an investment (rental income)
- Want to know: "Will the rent cover my repayments?" and "What's my return?"

### **Unique Questions Asked**
- **Expected Rent per Week:** Projected rental income
- **Property Type:** House, Unit/Apartment, or Townhouse
- **Income & Expenses:** For borrowing capacity
- **Savings/Deposit:** Investment deposit amount
- **Investment Purpose:** Confirmed via "Why are you buying?" → "To invest"

### **Calculations Used**
- **Borrowing Multiplier:** 3.5-5.5x annual income (more conservative for investment)
- **Interest Rate:** 6.48% p.a. (investment property rate - higher than owner-occupier)
- **Loan Term:** 30 years (standard investment loan)
- **LVR:** Typically lower than owner-occupier (stricter lending)
- **Rental Income:** Weekly rent × 52 ÷ 12 = monthly rent
- **Net Cash Flow:** Monthly rent - monthly repayment
- **Gross Yield:** `(Annual Rent / Property Value) × 100`

### **Result Page: "Investment Snapshot"**

**Primary Metric:**
```
"Here's your estimated investment potential 💰"
```

**Key Information Displayed (Grid Format):**
- Borrowing amount
- Estimated interest rate (6.48% p.a. for investment)
- Monthly repayment
- Expected rent ($X/week)

**Unique Features:**
- **Cash Flow Highlight:** Large number showing net monthly cash flow
  - **Positive (+$X):** Green color = property is cash-flow positive
  - **Negative (-$X):** Red color = property requires top-up
  ```
  "+$250 per month" (net cash flow)
  ```
- **Gross Yield Metric:** Shows return on investment
  ```
  "Gross yield: 4.8%"
  ```
- **Investment Context Box:** Blue info panel explaining:
  - This is a feasibility summary
  - Shows borrowing range and cash flow
  - Can be refined with specific property details in account

**Investment Feasibility Focus:**
- Not about "purchasing power" but "investment viability"
- Emphasizes returns, leverage, and long-term benefit
- Helps investors understand if the numbers make sense

**Call to Action:**
- "Create your free account to see full investment scenario" (primary)
- "Edit my details" (secondary)
- No FHB scheme comparison (not relevant)

---

## Flow Comparison Table

| Feature | Home Buyers | Refinancers | Investors |
|---------|-------------|-------------|-----------|
| **Primary Question** | "How much can I buy?" | "How much can I save?" | "Will this investment work?" |
| **Interest Rate** | 5.98% p.a. | 5.98% p.a. | 6.48% p.a. |
| **Loan Term** | 15-30 years (preference) | Remaining term | 30 years |
| **Max LVR** | 98% (2% deposit) | 80% (refinancing) | Lower (conservative) |
| **Result Focus** | Borrowing amount | Monthly savings + equity | Cash flow + yield |
| **Unique Data** | FHB comparison | Current loan details | Expected rent |
| **Primary CTA** | "Create account" | "Create account" | "See full scenario" |
| **Color Theme** | Blue/Purple (aspiration) | Green (savings) | Blue (investment) |
| **Main Metric Color** | Dark/Bold | Green (positive) | Green/Red (cash flow) |

---

## Technical Flow Branching

### **Decision Points**

1. **Page: "Your Home - Loan"**
   - User selects: "What are you doing?"
     - 🏠 **Buying** → Continue to home buyer questions
     - 💸 **Refinancing** → Branch to refinancing flow

2. **Page: "Your Home - Loan"**
   - User selects: "Why are you buying?"
     - 🏠 **To live in** → Home buyer flow
     - 📈 **To invest** → Investor flow

3. **Page: "Your Home - Finances"**
   - **IF Refinancing:** Show additional fields
     - Current loan balance
     - Current interest rate
     - Remaining term
     - Property value
   - **IF Investment:** Show additional fields
     - Expected rent per week
     - Property type

4. **Page: "Result" (Step 5)**
   - **IF** `formData.loanPurpose === 'refinancing'`
     → Render `RefinancingSummaryStep`
   - **ELSE IF** `formData.buyingReason === 'to-invest'`
     → Render `InvestmentSnapshotStep`
   - **ELSE**
     → Render `PurchasingPowerPreviewStep`

### **Validation Requirements**

**Home Buyers:**
- ✅ Income > 0
- ✅ Savings amount
- ✅ Loan preference

**Refinancers (additional):**
- ✅ Current loan balance > 0
- ✅ Current interest rate > 0
- ✅ Remaining term selected
- ✅ Property value > 0

**Investors (additional):**
- ✅ Expected rent > 0
- ✅ Property type selected (optional but recommended)

---

## User Experience Goals by Flow

### **Home Buyers**
- **Emotion:** Hope, excitement, empowerment
- **Key Message:** "You can afford more than you think with just a 2% deposit"
- **Tone:** Supportive, encouraging, aspirational
- **Success Metric:** User feels confident they can buy a home

### **Refinancers**
- **Emotion:** Validation, relief, opportunity
- **Key Message:** "You're leaving money on the table - we can help you save"
- **Tone:** Practical, reassuring, clear ROI
- **Success Metric:** User sees immediate financial benefit

### **Investors**
- **Emotion:** Confidence, analytical, strategic
- **Key Message:** "Here are the numbers - make an informed investment decision"
- **Tone:** Professional, data-driven, ROI-focused
- **Success Metric:** User understands investment viability

---

## Future Enhancements

### **Potential Additions:**

**For All Flows:**
- Interactive sliders to adjust assumptions in real-time
- Comparison of multiple scenarios side-by-side
- Save and share results via email/PDF

**For Home Buyers:**
- Property affordability range based on borrowing power
- Stamp duty calculator integration
- Buying timeline planner

**For Refinancers:**
- Break-even analysis (when do savings offset costs?)
- Visual timeline of savings accumulation
- Current lender identification (auto-populate rates)

**For Investors:**
- Multi-property portfolio modeling
- Tax benefits calculator (negative gearing, depreciation)
- Capital growth projections
- Rental yield by suburb database

---

## Summary

Each flow is purpose-built to address the specific needs and concerns of different customer segments:

- **Home Buyers** need to know what they can afford and feel empowered to purchase
- **Refinancers** need to see concrete savings and understand equity opportunities
- **Investors** need analytical data on cash flow, yield, and investment viability

By tailoring the questions, calculations, and results to each segment, SuCasa provides a personalized, value-driven experience that converts curiosity into account creation.

