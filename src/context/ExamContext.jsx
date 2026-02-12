import { createContext, useContext, useReducer, useEffect } from 'react'

const ExamContext = createContext(null)

const examReducer = (state, action) => {
  switch (action.type) {
    case 'START_EXAM':
      return {
        ...state,
        questions: action.payload.questions,
        certification: action.payload.certification,
        config: action.payload.config,
        currentQuestionIndex: 0,
        answers: {},
        visited: { 0: true },
        timeRemaining: action.payload.timeLimit,
        status: 'in-progress',
        startTime: Date.now()
      }
    
    case 'SELECT_ANSWER':
      return {
        ...state,
        answers: {
          ...state.answers,
          [state.currentQuestionIndex]: action.payload.answer
        }
      }
    
    case 'NEXT_QUESTION':
      const nextIndex = Math.min(state.currentQuestionIndex + 1, state.questions.length - 1)
      return {
        ...state,
        currentQuestionIndex: nextIndex,
        visited: { ...state.visited, [nextIndex]: true }
      }
    
    case 'PREV_QUESTION':
      const prevIndex = Math.max(state.currentQuestionIndex - 1, 0)
      return {
        ...state,
        currentQuestionIndex: prevIndex,
        visited: { ...state.visited, [prevIndex]: true }
      }
    
    case 'GO_TO_QUESTION':
      return {
        ...state,
        currentQuestionIndex: action.payload.index,
        visited: { ...state.visited, [action.payload.index]: true }
      }
    
    case 'UPDATE_TIMER':
      return {
        ...state,
        timeRemaining: action.payload.timeRemaining
      }
    
    case 'FINISH_EXAM':
      return {
        ...state,
        status: 'finished',
        endTime: Date.now(),
        timeRemaining: state.timeRemaining
      }
    
    case 'RESET_EXAM':
      return {
        questions: [],
        certification: null,
        config: null,
        currentQuestionIndex: 0,
        answers: {},
        visited: {},
        timeRemaining: null,
        status: 'not-started',
        startTime: null,
        endTime: null
      }
    
    default:
      return state
  }
}

const initialState = {
  questions: [],
  certification: null,
  config: null,
  currentQuestionIndex: 0,
  answers: {},
  visited: {},
  timeRemaining: null,
  status: 'not-started', // 'not-started' | 'in-progress' | 'finished'
  startTime: null,
  endTime: null
}

export function ExamProvider({ children }) {
  const [state, dispatch] = useReducer(examReducer, initialState)

  // Auto-save to localStorage
  useEffect(() => {
    if (state.status === 'in-progress') {
      localStorage.setItem('exam-state', JSON.stringify(state))
    } else if (state.status === 'finished') {
      localStorage.removeItem('exam-state')
    }
  }, [state])

  return (
    <ExamContext.Provider value={{ state, dispatch }}>
      {children}
    </ExamContext.Provider>
  )
}

export function useExamContext() {
  const context = useContext(ExamContext)
  if (!context) {
    throw new Error('useExamContext must be used within ExamProvider')
  }
  return context
}
