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

  const getTypeLabel = (type) => {
    switch (type) {
      case 'single': return 'Respuesta única'
      case 'multiple': return 'Respuesta múltiple'
      case 'yesno': return 'Sí / No'
      case 'dragdrop': return 'Arrastrar y soltar (orden)'
      case 'dropdown': return 'Lista desplegable'
      case 'match': return 'Asociar / Emparejar'
      case 'hotarea': return 'Área activa'
      default: return type
    }
  }

  const renderAnswerReview = (result) => {
    const { question, userAnswer, correctAnswers, isCorrect } = result

    switch (question.type) {
      case 'single':
      case 'multiple': {
        const ua = Array.isArray(userAnswer) ? userAnswer : []
        const ca = Array.isArray(correctAnswers) ? correctAnswers : []
        return (
          <>
            <div className="space-y-2 mb-4">
              {question.options.map(option => (
                <OptionButton
                  key={option.id}
                  option={option}
                  isSelected={ua.includes(option.id)}
                  isCorrect={ca.includes(option.id)}
                  showCorrect={true}
                  onClick={() => {}}
                  isMultiple={question.type === 'multiple'}
                  disabled={true}
                />
              ))}
            </div>
            <div className="mb-4 p-3 bg-white rounded border border-gray-200">
              <div className="text-sm">
                <span className="font-semibold text-gray-700">Tu respuesta: </span>
                <span className={isCorrect ? 'text-green-700' : 'text-red-700'}>
                  {ua.length > 0 ? ua.join(', ') : 'Sin responder'}
                </span>
              </div>
              <div className="text-sm mt-1">
                <span className="font-semibold text-gray-700">Respuesta correcta: </span>
                <span className="text-green-700">{ca.join(', ')}</span>
              </div>
            </div>
          </>
        )
      }

      case 'yesno': {
        const ua = typeof userAnswer === 'object' && !Array.isArray(userAnswer) ? userAnswer : {}
        const ca = typeof correctAnswers === 'object' && !Array.isArray(correctAnswers) ? correctAnswers : {}
        return (
          <div className="mb-4 overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-gray-100">
                  <th className="text-left p-3 border-b">Afirmación</th>
                  <th className="text-center p-3 border-b w-24">Tu resp.</th>
                  <th className="text-center p-3 border-b w-24">Correcta</th>
                  <th className="text-center p-3 border-b w-16">✓/✗</th>
                </tr>
              </thead>
              <tbody>
                {question.statements.map(s => {
                  const userVal = ua[s.id] || '—'
                  const correctVal = ca[s.id]
                  const match = userVal === correctVal
                  return (
                    <tr key={s.id} className="border-b">
                      <td className="p-3">{s.text.es}</td>
                      <td className={`p-3 text-center font-semibold ${match ? 'text-green-700' : 'text-red-700'}`}>
                        {userVal === 'yes' ? 'Sí' : userVal === 'no' ? 'No' : '—'}
                      </td>
                      <td className="p-3 text-center font-semibold text-green-700">
                        {correctVal === 'yes' ? 'Sí' : 'No'}
                      </td>
                      <td className={`p-3 text-center text-lg ${match ? 'text-green-500' : 'text-red-500'}`}>
                        {match ? '✓' : '✗'}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )
      }

      case 'dragdrop': {
        const ua = Array.isArray(userAnswer) ? userAnswer : []
        const ca = Array.isArray(correctAnswers) ? correctAnswers : []
        return (
          <div className="mb-4 space-y-2">
            {ca.map((correctId, index) => {
              const userId = ua[index]
              const match = userId === correctId
              const userOpt = question.options.find(o => o.id === userId)
              const correctOpt = question.options.find(o => o.id === correctId)
              return (
                <div key={index} className={`flex items-center gap-3 p-3 rounded-lg border-2 ${match ? 'border-green-300 bg-green-50' : 'border-red-300 bg-red-50'}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-white text-sm ${match ? 'bg-green-500' : 'bg-red-500'}`}>
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <div className="text-sm">
                      <span className="font-semibold">Tu respuesta: </span>
                      <span className={match ? 'text-green-700' : 'text-red-700'}>
                        {userOpt ? userOpt.text.es : '(sin respuesta)'}
                      </span>
                    </div>
                    {!match && (
                      <div className="text-sm mt-1">
                        <span className="font-semibold">Correcta: </span>
                        <span className="text-green-700">{correctOpt?.text.es}</span>
                      </div>
                    )}
                  </div>
                  <span className={`text-lg ${match ? 'text-green-500' : 'text-red-500'}`}>
                    {match ? '✓' : '✗'}
                  </span>
                </div>
              )
            })}
          </div>
        )
      }

      case 'dropdown': {
        const ua = typeof userAnswer === 'object' && !Array.isArray(userAnswer) ? userAnswer : {}
        const ca = typeof correctAnswers === 'object' && !Array.isArray(correctAnswers) ? correctAnswers : {}
        return (
          <div className="mb-4 space-y-3">
            {question.dropdowns.map(dd => {
              const userVal = ua[dd.id]
              const correctVal = ca[dd.id]
              const match = userVal === correctVal
              const userOpt = dd.options.find(o => o.id === userVal)
              const correctOpt = dd.options.find(o => o.id === correctVal)
              return (
                <div key={dd.id} className={`p-3 rounded-lg border-2 ${match ? 'border-green-300 bg-green-50' : 'border-red-300 bg-red-50'}`}>
                  <div className="font-medium text-gray-900 mb-2">{dd.label.es}</div>
                  <div className="text-sm">
                    <span className="font-semibold">Tu respuesta: </span>
                    <span className={match ? 'text-green-700' : 'text-red-700'}>
                      {userOpt ? userOpt.text.es : '(sin respuesta)'}
                    </span>
                  </div>
                  {!match && (
                    <div className="text-sm mt-1">
                      <span className="font-semibold">Correcta: </span>
                      <span className="text-green-700">{correctOpt?.text.es}</span>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        )
      }

      case 'match': {
        const ua = typeof userAnswer === 'object' && !Array.isArray(userAnswer) ? userAnswer : {}
        const ca = typeof correctAnswers === 'object' && !Array.isArray(correctAnswers) ? correctAnswers : {}
        return (
          <div className="mb-4 space-y-2">
            {question.leftItems.map(left => {
              const userVal = ua[left.id]
              const correctVal = ca[left.id]
              const match = userVal === correctVal
              const userRight = question.rightItems.find(r => r.id === userVal)
              const correctRight = question.rightItems.find(r => r.id === correctVal)
              return (
                <div key={left.id} className={`p-3 rounded-lg border-2 ${match ? 'border-green-300 bg-green-50' : 'border-red-300 bg-red-50'}`}>
                  <div className="font-medium text-gray-900 mb-2">{left.text.es}</div>
                  <div className="text-sm">
                    <span className="font-semibold">Tu respuesta: </span>
                    <span className={match ? 'text-green-700' : 'text-red-700'}>
                      {userRight ? userRight.text.es : '(sin respuesta)'}
                    </span>
                  </div>
                  {!match && (
                    <div className="text-sm mt-1">
                      <span className="font-semibold">Correcta: </span>
                      <span className="text-green-700">{correctRight?.text.es}</span>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        )
      }

      case 'hotarea': {
        const ua = typeof userAnswer === 'object' && !Array.isArray(userAnswer) ? userAnswer : {}
        const ca = typeof correctAnswers === 'object' && !Array.isArray(correctAnswers) ? correctAnswers : {}
        return (
          <div className="mb-4 space-y-3">
            {question.areas.map(area => {
              const userVal = ua[area.id]
              const correctVal = ca[area.id]
              const match = userVal === correctVal
              const userOpt = area.options.find(o => o.id === userVal)
              const correctOpt = area.options.find(o => o.id === correctVal)
              return (
                <div key={area.id} className={`p-3 rounded-lg border-2 ${match ? 'border-green-300 bg-green-50' : 'border-red-300 bg-red-50'}`}>
                  <div className="font-medium text-gray-900 mb-2">{area.label.es}</div>
                  <div className="text-sm">
                    <span className="font-semibold">Tu respuesta: </span>
                    <span className={match ? 'text-green-700' : 'text-red-700'}>
                      {userOpt ? userOpt.text.es : '(sin respuesta)'}
                    </span>
                  </div>
                  {!match && (
                    <div className="text-sm mt-1">
                      <span className="font-semibold">Correcta: </span>
                      <span className="text-green-700">{correctOpt?.text.es}</span>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        )
      }

      default:
        return <div className="text-gray-500 mb-4">Tipo de pregunta no soportado para revisión</div>
    }
  }

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
        {filteredQuestions.map((result) => {
          const { question, isCorrect, questionIndex } = result
          
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
                    <span className="text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-700">
                      {getTypeLabel(question.type)}
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

              {/* Type-specific answer review */}
              {renderAnswerReview(result)}

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
