import { useExamContext } from '../context/ExamContext'
import { getExamQuestions } from '../utils/questionParser'
import { shuffleQuestions } from '../utils/shuffle'

export function useExam() {
  const { state, dispatch } = useExamContext()

  const startExam = (certification, config) => {
    // Load questions based on config
    let questions = getExamQuestions(
      certification.id,
      config.numQuestions,
      config.selectedTopics
    )

    // Shuffle if configured
    if (config.shuffleQuestions) {
      questions = shuffleQuestions(questions, config.shuffleOptions)
    }

    // Calculate time limit in seconds
    let timeLimit = null
    if (config.timeLimit !== 'noLimit') {
      const minutes = config.timeLimit === 'real' 
        ? certification.examDuration 
        : parseInt(config.timeLimit)
      timeLimit = minutes * 60
    }

    dispatch({
      type: 'START_EXAM',
      payload: {
        questions,
        certification,
        config,
        timeLimit
      }
    })
  }

  const selectAnswer = (answer) => {
    const currentQuestion = state.questions[state.currentQuestionIndex]
    
    // Object-based answers (yesno, dropdown, match, hotarea)
    if (typeof answer === 'object' && !Array.isArray(answer)) {
      dispatch({
        type: 'SELECT_ANSWER',
        payload: { answer }
      })
      return
    }
    
    // Array-based answers (dragdrop passes array directly)
    if (Array.isArray(answer)) {
      dispatch({
        type: 'SELECT_ANSWER',
        payload: { answer }
      })
      return
    }
    
    if (currentQuestion.type === 'single') {
      // Single choice: replace answer
      dispatch({
        type: 'SELECT_ANSWER',
        payload: { answer: [answer] }
      })
    } else {
      // Multiple choice: toggle answer
      const currentAnswers = state.answers[state.currentQuestionIndex] || []
      const newAnswers = currentAnswers.includes(answer)
        ? currentAnswers.filter(a => a !== answer)
        : [...currentAnswers, answer]
      
      dispatch({
        type: 'SELECT_ANSWER',
        payload: { answer: newAnswers }
      })
    }
  }

  const nextQuestion = () => {
    dispatch({ type: 'NEXT_QUESTION' })
  }

  const prevQuestion = () => {
    dispatch({ type: 'PREV_QUESTION' })
  }

  const goToQuestion = (index) => {
    dispatch({ type: 'GO_TO_QUESTION', payload: { index } })
  }

  const finishExam = () => {
    dispatch({ type: 'FINISH_EXAM' })
  }

  const resetExam = () => {
    dispatch({ type: 'RESET_EXAM' })
  }

  const updateTimer = (timeRemaining) => {
    dispatch({ type: 'UPDATE_TIMER', payload: { timeRemaining } })
  }

  const getCurrentQuestion = () => {
    return state.questions[state.currentQuestionIndex] || null
  }

  const getCurrentAnswer = () => {
    const answer = state.answers[state.currentQuestionIndex]
    if (answer === undefined || answer === null) {
      // Return appropriate default based on question type
      const q = state.questions[state.currentQuestionIndex]
      if (q && ['yesno', 'dropdown', 'match', 'hotarea'].includes(q.type)) {
        return {}
      }
      return []
    }
    return answer
  }

  const isQuestionAnswered = (index) => {
    const answer = state.answers[index]
    if (!answer) return false
    if (Array.isArray(answer)) return answer.length > 0
    if (typeof answer === 'object') return Object.keys(answer).length > 0
    return false
  }

  const getProgress = () => {
    const total = state.questions.length
    const answered = Object.keys(state.answers).filter(key => 
      isQuestionAnswered(parseInt(key))
    ).length
    return { answered, total }
  }

  return {
    state,
    startExam,
    selectAnswer,
    nextQuestion,
    prevQuestion,
    goToQuestion,
    finishExam,
    resetExam,
    updateTimer,
    getCurrentQuestion,
    getCurrentAnswer,
    isQuestionAnswered,
    getProgress
  }
}
