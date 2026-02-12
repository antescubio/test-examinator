import { useParams, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { useExam } from '../hooks/useExam'
import { useTimer } from '../hooks/useTimer'
import certifications from '../data/certifications.json'
import QuestionCard from '../components/Exam/QuestionCard'
import Timer from '../components/Exam/Timer'
import ProgressBar from '../components/Exam/ProgressBar'
import ExamNavigation from '../components/Exam/ExamNavigation'
import { calculateScore } from '../utils/scoring'

function ExamPage() {
  const { certId } = useParams()
  const navigate = useNavigate()
  const {
    state,
    startExam,
    selectAnswer,
    nextQuestion,
    prevQuestion,
    goToQuestion,
    finishExam,
    getCurrentQuestion,
    getCurrentAnswer,
    isQuestionAnswered,
    getProgress
  } = useExam()

  const certification = certifications.find(cert => cert.id === certId)

  // Load config from localStorage
  useEffect(() => {
    if (state.status === 'not-started') {
      const configStr = localStorage.getItem(`exam-config-${certId}`)
      
      if (!configStr || !certification) {
        navigate(`/exam/${certId}/config`)
        return
      }

      const config = JSON.parse(configStr)
      startExam(certification, config)
    }
  }, [certId, certification, state.status])

  // Timer hook
  const { formattedTime, timeRemaining } = useTimer(
    state.timeRemaining,
    () => {
      // Auto-finish when time runs out
      handleFinishExam()
    }
  )

  const handleFinishExam = () => {
    finishExam()
    
    // Calculate results
    const results = calculateScore(state.questions, state.answers, certification)
    
    // Save results to localStorage
    localStorage.setItem(`exam-results-${certId}`, JSON.stringify({
      ...results,
      certification,
      timeSpent: state.startTime ? Math.floor((Date.now() - state.startTime) / 1000) : 0,
      timestamp: Date.now()
    }))
    
    // Navigate to results
    navigate(`/exam/${certId}/results`)
  }

  if (!certification) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          Certificación no encontrada
        </div>
      </div>
    )
  }

  if (state.status !== 'in-progress') {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 rounded">
          Cargando examen...
        </div>
      </div>
    )
  }

  const currentQuestion = getCurrentQuestion()
  const currentAnswer = getCurrentAnswer()
  const progress = getProgress()

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-6 max-w-5xl">
        {/* Header with Certification Info and Timer */}
        <div className="mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              {certification.name}
            </h1>
            <p className="text-gray-600">{certification.fullName.es}</p>
          </div>
          <Timer 
            timeRemaining={timeRemaining} 
            formattedTime={formattedTime}
          />
        </div>

        {/* Progress Bar */}
        <div className="mb-6">
          <ProgressBar
            current={state.currentQuestionIndex}
            total={state.questions.length}
            answered={progress.answered}
          />
        </div>

        {/* Question Card */}
        <div className="mb-6">
          <QuestionCard
            question={currentQuestion}
            questionNumber={state.currentQuestionIndex + 1}
            totalQuestions={state.questions.length}
            userAnswer={currentAnswer}
            onAnswerSelect={selectAnswer}
            disabled={false}
          />
        </div>

        {/* Navigation */}
        <ExamNavigation
          currentIndex={state.currentQuestionIndex}
          totalQuestions={state.questions.length}
          onPrev={prevQuestion}
          onNext={nextQuestion}
          onGoTo={goToQuestion}
          onFinish={handleFinishExam}
          isQuestionAnswered={isQuestionAnswered}
        />
      </div>
    </div>
  )
}

export default ExamPage
