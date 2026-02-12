import { useParams, useNavigate, Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useExam } from '../hooks/useExam'
import certifications from '../data/certifications.json'
import ScoreCard from '../components/Results/ScoreCard'
import ResultsSummary from '../components/Results/ResultsSummary'
import QuestionReview from '../components/Results/QuestionReview'
import { getExamQuestions } from '../utils/questionParser'
import { shuffleQuestions } from '../utils/shuffle'

function ResultsPage() {
  const { certId } = useParams()
  const navigate = useNavigate()
  const { resetExam, startExam } = useExam()
  const [results, setResults] = useState(null)
  const certification = certifications.find(cert => cert.id === certId)

  useEffect(() => {
    // Load results from localStorage
    const resultsStr = localStorage.getItem(`exam-results-${certId}`)
    
    if (!resultsStr) {
      // No results found, redirect to home
      navigate('/')
      return
    }

    setResults(JSON.parse(resultsStr))
  }, [certId, navigate])

  const handleRepeatExam = () => {
    // Use same configuration
    const configStr = localStorage.getItem(`exam-config-${certId}`)
    if (configStr && certification) {
      resetExam()
      const config = JSON.parse(configStr)
      navigate(`/exam/${certId}/start`)
    } else {
      navigate(`/exam/${certId}/config`)
    }
  }

  const handleNewExam = () => {
    resetExam()
    localStorage.removeItem(`exam-results-${certId}`)
    navigate('/')
  }

  const handleRepeatIncorrect = () => {
    if (!results || !certification) return

    // Get only incorrect questions
    const incorrectQuestions = results.questionResults
      .filter(r => !r.isCorrect)
      .map(r => r.question)

    if (incorrectQuestions.length === 0) {
      alert('¡No hay preguntas incorrectas! Has respondido todo correctamente.')
      return
    }

    // Create config for incorrect questions only
    const config = {
      numQuestions: incorrectQuestions.length,
      timeLimit: 'noLimit',
      selectedTopics: certification.topics,
      shuffleQuestions: true,
      shuffleOptions: true
    }

    // Save modified config
    localStorage.setItem(`exam-config-${certId}`, JSON.stringify(config))
    
    resetExam()
    navigate(`/exam/${certId}/start`)
  }

  if (!results || !certification) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 rounded">
          Cargando resultados...
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Resultados del Examen
          </h1>
          <p className="text-gray-600">
            {certification.name} - {certification.fullName.es}
          </p>
        </div>

        {/* Score Card */}
        <div className="mb-8">
          <ScoreCard results={results} certification={certification} />
        </div>

        {/* Action Buttons */}
        <div className="mb-8 flex flex-wrap gap-4 justify-center">
          <button
            onClick={handleRepeatExam}
            className="px-6 py-3 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors"
          >
            🔄 Repetir Examen
          </button>
          
          {results.incorrectCount > 0 && (
            <button
              onClick={handleRepeatIncorrect}
              className="px-6 py-3 rounded-lg bg-orange-600 text-white font-semibold hover:bg-orange-700 transition-colors"
            >
              📝 Repetir solo incorrectas ({results.incorrectCount})
            </button>
          )}
          
          <button
            onClick={handleNewExam}
            className="px-6 py-3 rounded-lg border-2 border-gray-300 bg-white text-gray-700 font-semibold hover:bg-gray-50 transition-colors"
          >
            🏠 Nuevo Examen
          </button>
        </div>

        {/* Results Summary */}
        <div className="mb-8">
          <ResultsSummary results={results} certification={certification} />
        </div>

        {/* Question Review */}
        <div className="mb-8">
          <QuestionReview results={results} />
        </div>

        {/* Footer Actions */}
        <div className="text-center py-8">
          <Link 
            to="/"
            className="text-blue-600 hover:text-blue-800 font-semibold"
          >
            ← Volver al inicio
          </Link>
        </div>
      </div>
    </div>
  )
}

export default ResultsPage
