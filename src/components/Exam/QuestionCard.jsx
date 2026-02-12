import OptionButton from './OptionButton'

function QuestionCard({ question, questionNumber, totalQuestions, userAnswer, onAnswerSelect, disabled }) {
  if (!question) {
    return <div className="text-center text-gray-500">Cargando pregunta...</div>
  }

  const isMultiple = question.type === 'multiple'
  const requiredAnswers = isMultiple ? question.correctAnswers.length : 1

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
            {isMultiple 
              ? `✓ Selecciona ${requiredAnswers} respuestas correctas` 
              : '● Selecciona UNA respuesta'}
          </p>
        </div>

        {/* Question Text */}
        <h2 className="text-xl font-semibold text-gray-900 leading-relaxed">
          {question.question.es}
        </h2>
      </div>

      {/* Answer Options */}
      <div className="space-y-3">
        {question.options.map(option => (
          <OptionButton
            key={option.id}
            option={option}
            isSelected={userAnswer.includes(option.id)}
            isCorrect={false}
            showCorrect={false}
            onClick={() => onAnswerSelect(option.id)}
            isMultiple={isMultiple}
            disabled={disabled}
          />
        ))}
      </div>

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
