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
    return state.answers[state.currentQuestionIndex] || []
  }

  const isQuestionAnswered = (index) => {
    return state.answers[index] && state.answers[index].length > 0
  }

  const getProgress = () => {
    const total = state.questions.length
    const answered = Object.keys(state.answers).filter(key => 
      state.answers[key] && state.answers[key].length > 0
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
