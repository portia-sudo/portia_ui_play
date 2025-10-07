import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import CalculatorFlow from './components/CalculatorFlow'
import './App.css'

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<CalculatorFlow />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App