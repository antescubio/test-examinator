import { useState, useEffect } from 'react'

function YesNoQuestion({ question, userAnswer, onAnswerSelect, disabled }) {
  const [answers, setAnswers] = useState({})

  useEffect(() => {
    if (userAnswer && typeof userAnswer === 'object' && !Array.isArray(userAnswer)) {
      setAnswers(userAnswer)
    }
  }, [userAnswer])

  const handleSelect = (statementId, value) => {
    if (disabled) return
    const newAnswers = { ...answers, [statementId]: value }
    setAnswers(newAnswers)
    onAnswerSelect(newAnswers)
  }

  return (
    <div className="space-y-4">
      {/* Instructions */}
      <div className="p-3 bg-blue-50 border-l-4 border-blue-500 rounded">
        <p className="text-sm font-semibold text-blue-900">
          ✔️ Para cada una de las siguientes afirmaciones, selecciona Sí o No
        </p>
      </div>

      {/* Statements Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="text-left p-4 border-b-2 border-gray-300 text-sm font-semibold text-gray-700 w-3/4">
                Afirmación
              </th>
              <th className="text-center p-4 border-b-2 border-gray-300 text-sm font-semibold text-gray-700 w-1/8">
                Sí
              </th>
              <th className="text-center p-4 border-b-2 border-gray-300 text-sm font-semibold text-gray-700 w-1/8">
                No
              </th>
            </tr>
          </thead>
          <tbody>
            {question.statements.map((statement, index) => (
              <tr 
                key={statement.id} 
                className={`border-b border-gray-200 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}
              >
                <td className="p-4 text-gray-900">
                  {statement.text.es}
                </td>
                <td className="p-4 text-center">
                  <button
                    onClick={() => handleSelect(statement.id, 'yes')}
                    disabled={disabled}
                    className={`w-10 h-10 rounded-full border-2 font-bold text-sm transition-all ${
                      answers[statement.id] === 'yes'
                        ? 'border-green-500 bg-green-500 text-white'
                        : 'border-gray-300 bg-white text-gray-600 hover:border-green-400'
                    } disabled:cursor-not-allowed`}
                  >
                    Sí
                  </button>
                </td>
                <td className="p-4 text-center">
                  <button
                    onClick={() => handleSelect(statement.id, 'no')}
                    disabled={disabled}
                    className={`w-10 h-10 rounded-full border-2 font-bold text-sm transition-all ${
                      answers[statement.id] === 'no'
                        ? 'border-red-500 bg-red-500 text-white'
                        : 'border-gray-300 bg-white text-gray-600 hover:border-red-400'
                    } disabled:cursor-not-allowed`}
                  >
                    No
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default YesNoQuestion
