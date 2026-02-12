import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout/Layout'
import Home from './pages/Home'
import ExamConfig from './pages/ExamConfig'
import ExamPage from './pages/ExamPage'
import ResultsPage from './pages/ResultsPage'

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/exam/:certId/config" element={<ExamConfig />} />
          <Route path="/exam/:certId/start" element={<ExamPage />} />
          <Route path="/exam/:certId/results" element={<ResultsPage />} />
        </Routes>
      </Layout>
    </Router>
  )
}

export default App
