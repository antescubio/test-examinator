import { useState, useEffect } from 'react'

function MatchQuestion({ question, userAnswer, onAnswerSelect, disabled }) {
  const [matches, setMatches] = useState({})

  useEffect(() => {
    if (userAnswer && typeof userAnswer === 'object' && !Array.isArray(userAnswer)) {
      setMatches(userAnswer)
    }
  }, [userAnswer])

  const handleSelect = (leftId, rightId) => {
    if (disabled) return
    const newMatches = { ...matches, [leftId]: rightId }
    setMatches(newMatches)
    onAnswerSelect(newMatches)
  }

  // Get available right-side options (not yet matched to another left)
  const getAvailableOptions = (currentLeftId) => {
    const usedRights = Object.entries(matches)
      .filter(([leftId]) => leftId !== currentLeftId)
      .map(([, rightId]) => rightId)
    
    return question.rightItems.filter(item => !usedRights.includes(item.id))
  }

  return (
    <div className="space-y-6">
      {/* Instructions */}
      <div className="p-3 bg-blue-50 border-l-4 border-blue-500 rounded">
        <p className="text-sm font-semibold text-blue-900">
          🔗 Asocia cada elemento de la izquierda con su correspondiente de la derecha
        </p>
      </div>

      {/* Match Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="text-left p-4 border-b-2 border-gray-300 text-sm font-semibold text-gray-700 w-1/2">
                {question.leftLabel?.es || 'Elemento'}
              </th>
              <th className="text-left p-4 border-b-2 border-gray-300 text-sm font-semibold text-gray-700 w-1/2">
                {question.rightLabel?.es || 'Coincidencia'}
              </th>
            </tr>
          </thead>
          <tbody>
            {question.leftItems.map((leftItem, index) => (
              <tr 
                key={leftItem.id} 
                className={`border-b border-gray-200 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}
              >
                <td className="p-4 text-gray-900 font-medium align-top">
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-purple-500 text-white flex items-center justify-center font-bold text-sm">
                      {index + 1}
                    </div>
                    <span className="pt-1">{leftItem.text.es}</span>
                  </div>
                </td>
                <td className="p-4">
                  <select
                    value={matches[leftItem.id] || ''}
                    onChange={(e) => handleSelect(leftItem.id, e.target.value)}
                    disabled={disabled}
                    className={`w-full p-3 border-2 rounded-lg text-gray-900 bg-white cursor-pointer transition-colors ${
                      matches[leftItem.id]
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-300'
                    } disabled:cursor-not-allowed disabled:opacity-60`}
                  >
                    <option value="">-- Selecciona --</option>
                    {getAvailableOptions(leftItem.id).map((rightItem) => (
                      <option key={rightItem.id} value={rightItem.id}>
                        {rightItem.text.es}
                      </option>
                    ))}
                    {/* Also show currently selected even if "used" */}
                    {matches[leftItem.id] && !getAvailableOptions(leftItem.id).find(r => r.id === matches[leftItem.id]) && (
                      <option value={matches[leftItem.id]}>
                        {question.rightItems.find(r => r.id === matches[leftItem.id])?.text.es}
                      </option>
                    )}
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default MatchQuestion
