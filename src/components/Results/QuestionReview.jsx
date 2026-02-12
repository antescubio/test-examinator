import { useState } from 'react'
import OptionButton from '../Exam/OptionButton'

function QuestionReview({ results }) {
  const [filter, setFilter] = useState('all') // 'all', 'correct', 'incorrect'
  
  const { questionResults } = results

  const filteredQuestions = questionResults.filter(result => {
    if (filter === 'correct') return result.isCorrect
    if (filter === 'incorrect') return !result.isCorrect
    return true
  })

  const correctCount = questionResults.filter(r => r.isCorrect).length
  const incorrectCount = questionResults.filter(r => !r.isCorrect).length

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        📝 Revisión de Preguntas
      </h2>

      {/* Filter Buttons */}
      <div className="flex flex-wrap gap-3 mb-6">
        <button
          onClick={() => setFilter('all')}
          className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
            filter === 'all'
              ? 'bg-blue-500 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          Todas ({questionResults.length})
        </button>
        <button
          onClick={() => setFilter('correct')}
          className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
            filter === 'correct'
              ? 'bg-green-500 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          ✓ Correctas ({correctCount})
        </button>
        <button
          onClick={() => setFilter('incorrect')}
          className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
            filter === 'incorrect'
              ? 'bg-red-500 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          ✗ Incorrectas ({incorrectCount})
        </button>
      </div>

      {/* Questions List */}
      <div className="space-y-6">
        {filteredQuestions.map((result, index) => {
          const { question, userAnswer, correctAnswers, isCorrect, questionIndex } = result
          
          return (
            <div 
              key={questionIndex}
              className={`border-2 rounded-lg p-5 ${
                isCorrect 
                  ? 'border-green-200 bg-green-50' 
                  : 'border-red-200 bg-red-50'
              }`}
            >
              {/* Question Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-sm font-bold text-gray-500">
                      Pregunta {questionIndex + 1}
                    </span>
                    {question.topic && (
                      <span className="text-xs px-2 py-1 rounded-full bg-purple-100 text-purple-700">
                        {question.topic}
                      </span>
                    )}
                    {question.difficulty && (
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        question.difficulty === 'easy' ? 'bg-green-100 text-green-700' :
                        question.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-red-100 text-red-700'
                      }`}>
                        {question.difficulty === 'easy' ? 'Fácil' :
                         question.difficulty === 'medium' ? 'Medio' : 'Difícil'}
                      </span>
                    )}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {question.question.es}
                  </h3>
                </div>
                <div className={`text-3xl ml-4 ${
                  isCorrect ? 'text-green-500' : 'text-red-500'
                }`}>
                  {isCorrect ? '✓' : '✗'}
                </div>
              </div>

              {/* Question Type */}
              <div className="mb-4 text-sm text-gray-600">
                {question.type === 'multiple' 
                  ? `Respuesta múltiple (${correctAnswers.length} correctas)` 
                  : 'Respuesta única'}
              </div>

              {/* Options */}
              <div className="space-y-2 mb-4">
                {question.options.map(option => {
                  const isUserAnswer = userAnswer.includes(option.id)
                  const isCorrectAnswer = correctAnswers.includes(option.id)
                  
                  return (
                    <OptionButton
                      key={option.id}
                      option={option}
                      isSelected={isUserAnswer}
                      isCorrect={isCorrectAnswer}
                      showCorrect={true}
                      onClick={() => {}}
                      isMultiple={question.type === 'multiple'}
                      disabled={true}
                    />
                  )
                })}
              </div>

              {/* User Answer Summary */}
              <div className="mb-4 p-3 bg-white rounded border border-gray-200">
                <div className="text-sm">
                  <span className="font-semibold text-gray-700">Tu respuesta: </span>
                  <span className={isCorrect ? 'text-green-700' : 'text-red-700'}>
                    {userAnswer.length > 0 ? userAnswer.join(', ') : 'Sin responder'}
                  </span>
                </div>
                <div className="text-sm mt-1">
                  <span className="font-semibold text-gray-700">Respuesta correcta: </span>
                  <span className="text-green-700">
                    {correctAnswers.join(', ')}
                  </span>
                </div>
              </div>

              {/* Explanation */}
              <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
                <h4 className="font-bold text-blue-900 mb-2">💡 Explicación:</h4>
                <p className="text-blue-900 text-sm leading-relaxed">
                  {question.explanation.es}
                </p>
              </div>

              {/* References */}
              {question.references && question.references.length > 0 && (
                <div className="mt-4">
                  <h4 className="font-semibold text-gray-700 text-sm mb-2">
                    📚 Referencias:
                  </h4>
                  <ul className="space-y-1">
                    {question.references.map((ref, idx) => (
                      <li key={idx}>
                        <a 
                          href={ref}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-blue-600 hover:text-blue-800 hover:underline"
                        >
                          {ref}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )
        })}
      </div>

      {filteredQuestions.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No hay preguntas para mostrar con este filtro
        </div>
      )}
    </div>
  )
}

export default QuestionReview
