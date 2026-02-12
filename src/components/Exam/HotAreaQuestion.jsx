import { useState, useEffect } from 'react'

function HotAreaQuestion({ question, userAnswer, onAnswerSelect, disabled }) {
  const [selectedAreas, setSelectedAreas] = useState({})

  useEffect(() => {
    if (userAnswer && typeof userAnswer === 'object' && !Array.isArray(userAnswer)) {
      setSelectedAreas(userAnswer)
    }
  }, [userAnswer])

  const handleSelect = (areaId, optionId) => {
    if (disabled) return
    const newSelected = { ...selectedAreas, [areaId]: optionId }
    setSelectedAreas(newSelected)
    onAnswerSelect(newSelected)
  }

  return (
    <div className="space-y-6">
      {/* Instructions */}
      <div className="p-3 bg-blue-50 border-l-4 border-blue-500 rounded">
        <p className="text-sm font-semibold text-blue-900">
          🎯 Selecciona la opción correcta para cada área señalada
        </p>
      </div>

      {/* Context / Scenario */}
      {question.context && (
        <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
          <pre className="text-sm text-gray-800 whitespace-pre-wrap font-mono leading-relaxed">
            {question.context.es}
          </pre>
        </div>
      )}

      {/* Selectable Areas */}
      <div className="space-y-4">
        {question.areas.map((area, index) => (
          <div key={area.id} className="bg-white border-2 border-gray-200 rounded-lg p-4">
            <div className="flex items-start gap-3 mb-3">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-orange-500 text-white flex items-center justify-center font-bold text-sm">
                {index + 1}
              </div>
              <span className="text-gray-900 font-medium pt-1">{area.label.es}</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pl-11">
              {area.options.map((option) => (
                <button
                  key={option.id}
                  onClick={() => handleSelect(area.id, option.id)}
                  disabled={disabled}
                  className={`p-3 rounded-lg border-2 text-left font-medium text-sm transition-all ${
                    selectedAreas[area.id] === option.id
                      ? 'border-blue-500 bg-blue-50 text-blue-900 ring-2 ring-blue-300'
                      : 'border-gray-300 bg-white text-gray-700 hover:border-blue-400 hover:bg-blue-50'
                  } disabled:cursor-not-allowed disabled:opacity-60`}
                >
                  {option.text.es}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default HotAreaQuestion
