import OptionButton from './OptionButton'
import DragDropQuestion from './DragDropQuestion'
import YesNoQuestion from './YesNoQuestion'
import DropdownQuestion from './DropdownQuestion'
import MatchQuestion from './MatchQuestion'
import HotAreaQuestion from './HotAreaQuestion'

function QuestionCard({ question, questionNumber, totalQuestions, userAnswer, onAnswerSelect, disabled }) {
  if (!question) {
    return <div className="text-center text-gray-500">Cargando pregunta...</div>
  }

  const getTypeLabel = () => {
    switch (question.type) {
      case 'single': return '● Selecciona UNA respuesta'
      case 'multiple': return `✓ Selecciona ${question.correctAnswers?.length || 'varias'} respuestas correctas`
      case 'yesno': return '✔️ Selecciona Sí o No para cada afirmación'
      case 'dragdrop': return '🔄 Arrastra los elementos en el orden correcto'
      case 'dropdown': return '📋 Selecciona la opción correcta de cada lista'
      case 'match': return '🔗 Asocia cada elemento con su correspondiente'
      case 'hotarea': return '🎯 Selecciona la opción correcta para cada área'
      default: return '● Responde la pregunta'
    }
  }

  // Determine user answer format for single/multiple
  const answerArray = Array.isArray(userAnswer) ? userAnswer : []

  const renderQuestionBody = () => {
    switch (question.type) {
      case 'single':
      case 'multiple':
        return (
          <div className="space-y-3">
            {question.options.map(option => (
              <OptionButton
                key={option.id}
                option={option}
                isSelected={answerArray.includes(option.id)}
                isCorrect={false}
                showCorrect={false}
                onClick={() => onAnswerSelect(option.id)}
                isMultiple={question.type === 'multiple'}
                disabled={disabled}
              />
            ))}
          </div>
        )
      
      case 'yesno':
        return (
          <YesNoQuestion
            question={question}
            userAnswer={userAnswer}
            onAnswerSelect={onAnswerSelect}
            disabled={disabled}
          />
        )
      
      case 'dragdrop':
        return (
          <DragDropQuestion
            question={question}
            userAnswer={userAnswer}
            onAnswerSelect={onAnswerSelect}
            disabled={disabled}
          />
        )
      
      case 'dropdown':
        return (
          <DropdownQuestion
            question={question}
            userAnswer={userAnswer}
            onAnswerSelect={onAnswerSelect}
            disabled={disabled}
          />
        )
      
      case 'match':
        return (
          <MatchQuestion
            question={question}
            userAnswer={userAnswer}
            onAnswerSelect={onAnswerSelect}
            disabled={disabled}
          />
        )
      
      case 'hotarea':
        return (
          <HotAreaQuestion
            question={question}
            userAnswer={userAnswer}
            onAnswerSelect={onAnswerSelect}
            disabled={disabled}
          />
        )
      
      default:
        return <div className="text-red-500">Tipo de pregunta no soportado: {question.type}</div>
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      {/* Question Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm font-semibold text-gray-500">
            Pregunta {questionNumber} de {totalQuestions}
          </span>
          <div className="flex items-center gap-3">
            {question.topic && (
              <span className="text-xs px-3 py-1 rounded-full bg-purple-100 text-purple-700 font-medium">
                {question.topic}
              </span>
            )}
            {question.difficulty && (
              <span className={`text-xs px-3 py-1 rounded-full font-medium ${
                question.difficulty === 'easy' ? 'bg-green-100 text-green-700' :
                question.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                'bg-red-100 text-red-700'
              }`}>
                {question.difficulty === 'easy' ? 'Fácil' :
                 question.difficulty === 'medium' ? 'Medio' : 'Difícil'}
              </span>
            )}
          </div>
        </div>

        {/* Question Type Indicator */}
        <div className="mb-4 p-3 bg-blue-50 border-l-4 border-blue-500 rounded">
          <p className="text-sm font-semibold text-blue-900">
            {getTypeLabel()}
          </p>
        </div>

        {/* Question Text */}
        <h2 className="text-xl font-semibold text-gray-900 leading-relaxed">
          {question.question.es}
        </h2>
      </div>

      {/* Question Body - rendered by type */}
      {renderQuestionBody()}

      {/* Question Info */}
      <div className="mt-6 pt-4 border-t border-gray-200">
        <p className="text-xs text-gray-500">
          ID: {question.id}
        </p>
      </div>
    </div>
  )
}

export default QuestionCard
