import { useState, useEffect } from 'react'

function DragDropQuestion({ question, userAnswer, onAnswerSelect, disabled }) {
  const [draggedItem, setDraggedItem] = useState(null)
  const [currentAnswer, setCurrentAnswer] = useState(userAnswer || [])

  useEffect(() => {
    setCurrentAnswer(userAnswer || [])
  }, [userAnswer])

  const handleDragStart = (e, item) => {
    setDraggedItem(item)
    e.dataTransfer.effectAllowed = 'move'
  }

  const handleDragOver = (e) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
  }

  const handleDrop = (e, targetIndex) => {
    e.preventDefault()
    
    if (!draggedItem || disabled) return

    const newAnswer = [...currentAnswer]
    const sourceIndex = newAnswer.findIndex(item => item?.id === draggedItem.id)
    
    if (sourceIndex !== -1) {
      // Remove from source
      newAnswer.splice(sourceIndex, 1)
    }
    
    // Insert at target
    newAnswer.splice(targetIndex, 0, draggedItem)
    
    setCurrentAnswer(newAnswer)
    onAnswerSelect(newAnswer.map(item => item?.id).filter(Boolean))
    setDraggedItem(null)
  }

  const handleRemove = (index) => {
    if (disabled) return
    const newAnswer = [...currentAnswer]
    newAnswer.splice(index, 1)
    setCurrentAnswer(newAnswer)
    onAnswerSelect(newAnswer.map(item => item?.id).filter(Boolean))
  }

  const availableItems = question.options.filter(
    opt => !currentAnswer.find(ans => ans?.id === opt.id)
  )

  return (
    <div className="space-y-6">
      {/* Instructions */}
      <div className="p-3 bg-blue-50 border-l-4 border-blue-500 rounded">
        <p className="text-sm font-semibold text-blue-900">
          🔄 Arrastra los elementos en el orden correcto
        </p>
      </div>

      {/* Drop Zone - Answer Area */}
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 min-h-[200px] bg-gray-50">
        <h4 className="text-sm font-semibold text-gray-700 mb-3">
          Área de respuesta (ordena aquí):
        </h4>
        <div className="space-y-2">
          {currentAnswer.length === 0 ? (
            <div className="text-center py-8 text-gray-400">
              Arrastra elementos aquí
            </div>
          ) : (
            currentAnswer.map((item, index) => (
              <div
                key={`answer-${index}`}
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, index)}
                className="relative"
              >
                <div
                  draggable={!disabled}
                  onDragStart={(e) => handleDragStart(e, item)}
                  className={`flex items-center gap-3 p-3 bg-white border-2 border-blue-500 rounded-lg ${
                    disabled ? 'cursor-not-allowed' : 'cursor-move'
                  } hover:shadow-md transition-shadow`}
                >
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold">
                    {index + 1}
                  </div>
                  <span className="flex-1">{item.text.es}</span>
                  {!disabled && (
                    <button
                      onClick={() => handleRemove(index)}
                      className="flex-shrink-0 w-6 h-6 rounded-full bg-red-500 text-white text-xs hover:bg-red-600"
                    >
                      ✕
                    </button>
                  )}
                </div>
              </div>
            ))
          )}
          {/* Drop zone at the end */}
          {currentAnswer.length > 0 && (
            <div
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, currentAnswer.length)}
              className="h-12 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center text-gray-400 text-sm"
            >
              Soltar aquí
            </div>
          )}
        </div>
      </div>

      {/* Available Items */}
      {availableItems.length > 0 && (
        <div className="border-2 border-gray-300 rounded-lg p-4 bg-white">
          <h4 className="text-sm font-semibold text-gray-700 mb-3">
            Elementos disponibles:
          </h4>
          <div className="space-y-2">
            {availableItems.map((item) => (
              <div
                key={item.id}
                draggable={!disabled}
                onDragStart={(e) => handleDragStart(e, item)}
                className={`flex items-center gap-3 p-3 bg-gray-50 border-2 border-gray-300 rounded-lg ${
                  disabled ? 'cursor-not-allowed' : 'cursor-move'
                } hover:border-blue-400 hover:bg-blue-50 transition-colors`}
              >
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-400 text-white flex items-center justify-center font-bold">
                  {item.id}
                </div>
                <span className="flex-1">{item.text.es}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default DragDropQuestion
