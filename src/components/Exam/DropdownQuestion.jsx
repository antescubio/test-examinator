import { useState, useEffect } from 'react'

function DropdownQuestion({ question, userAnswer, onAnswerSelect, disabled }) {
  const [selections, setSelections] = useState({})

  useEffect(() => {
    if (userAnswer && typeof userAnswer === 'object' && !Array.isArray(userAnswer)) {
      setSelections(userAnswer)
    }
  }, [userAnswer])

  const handleSelect = (dropdownId, value) => {
    if (disabled) return
    const newSelections = { ...selections, [dropdownId]: value }
    setSelections(newSelections)
    onAnswerSelect(newSelections)
  }

  return (
    <div className="space-y-6">
      {/* Instructions */}
      <div className="p-3 bg-blue-50 border-l-4 border-blue-500 rounded">
        <p className="text-sm font-semibold text-blue-900">
          📋 Selecciona la opción correcta de cada lista desplegable
        </p>
      </div>

      {/* Context text if available */}
      {question.context && (
        <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg text-gray-800 leading-relaxed">
          {question.context.es}
        </div>
      )}

      {/* Dropdown Fields */}
      <div className="space-y-4">
        {question.dropdowns.map((dropdown) => (
          <div key={dropdown.id} className="bg-white border-2 border-gray-200 rounded-lg p-4">
            <label className="block text-gray-900 font-medium mb-3">
              {dropdown.label.es}
            </label>
            <select
              value={selections[dropdown.id] || ''}
              onChange={(e) => handleSelect(dropdown.id, e.target.value)}
              disabled={disabled}
              className={`w-full p-3 border-2 rounded-lg text-gray-900 bg-white appearance-none cursor-pointer transition-colors ${
                selections[dropdown.id] 
                  ? 'border-blue-500 bg-blue-50' 
                  : 'border-gray-300'
              } disabled:cursor-not-allowed disabled:opacity-60`}
            >
              <option value="">-- Selecciona una opción --</option>
              {dropdown.options.map((opt) => (
                <option key={opt.id} value={opt.id}>
                  {opt.text.es}
                </option>
              ))}
            </select>
          </div>
        ))}
      </div>
    </div>
  )
}

export default DropdownQuestion
