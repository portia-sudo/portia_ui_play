import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Cell } from 'recharts'

function ComparisonChart({ comparison }) {
  const data = [
    { name: 'Typical Bank', amount: comparison.bank, color: '#e2e8f0' },
    { name: 'SuCasa', amount: comparison.sucasa, color: '#3b82f6' }
  ]

  return (
    <div className="comparison-chart">
      <h3>SuCasa vs Typical Bank</h3>
      <div className="chart-container">
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <XAxis dataKey="name" />
            <YAxis tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`} />
            <Bar dataKey="amount" radius={[4, 4, 0, 0]}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
      
      <div className="comparison-summary">
        <div className="comparison-item">
          <span className="label">Typical Bank:</span>
          <span className="amount">${comparison.bank.toLocaleString()}</span>
        </div>
        <div className="comparison-item sucasa">
          <span className="label">SuCasa:</span>
          <span className="amount">${comparison.sucasa.toLocaleString()}</span>
        </div>
        <div className="comparison-difference">
          <span className="difference-amount">+${comparison.difference.toLocaleString()}</span>
          <span className="difference-text">more with SuCasa</span>
        </div>
      </div>
    </div>
  )
}

export default ComparisonChart
