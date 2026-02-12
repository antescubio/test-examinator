import { useState } from 'react'

function ExamNavigation({ 
  currentIndex, 
  totalQuestions, 
  onPrev, 
  onNext, 
  onGoTo, 
  onFinish,
  isQuestionAnswered 
}) {
  const [showConfirmFinish, setShowConfirmFinish] = useState(false)
  const [showQuestionGrid, setShowQuestionGrid] = useState(false)

  const isFirst = currentIndex === 0
  const isLast = currentIndex === totalQuestions - 1

  const handleFinish = () => {
    setShowConfirmFinish(true)
  }

  const confirmFinish = () => {
    setShowConfirmFinish(false)
    onFinish()
  }

  const getQuestionStatus = (index) => {
    if (index === currentIndex) {
      return 'border-blue-500 bg-blue-500 text-white ring-2 ring-blue-300'
    }
    if (isQuestionAnswered(index)) {
      return 'border-green-500 bg-green-50 text-green-700 hover:bg-green-100'
    }
    return 'border-gray-300 bg-white text-gray-600 hover:bg-gray-50'
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      {/* Main Navigation Buttons */}
      <div className="flex items-center justify-between gap-4 mb-4">
        <button
          onClick={onPrev}
          disabled={isFirst}
          className="px-6 py-3 rounded-lg border-2 border-gray-300 bg-white text-gray-700 font-semibold hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          ← Anterior
        </button>

        <button
          onClick={() => setShowQuestionGrid(!showQuestionGrid)}
          className="px-4 py-3 rounded-lg border-2 border-gray-300 bg-white text-gray-700 font-semibold hover:bg-gray-50 transition-colors"
        >
          {showQuestionGrid ? 'Ocultar mapa' : 'Ver todas'} 📋
        </button>

        {isLast ? (
          <button
            onClick={handleFinish}
            className="px-6 py-3 rounded-lg bg-green-600 text-white font-semibold hover:bg-green-700 transition-colors"
          >
            Finalizar Examen ✓
          </button>
        ) : (
          <button
            onClick={onNext}
            className="px-6 py-3 rounded-lg border-2 border-gray-300 bg-white text-gray-700 font-semibold hover:bg-gray-50 transition-colors"
          >
            Siguiente →
          </button>
        )}
      </div>

      {/* Question Grid */}
      {showQuestionGrid && (
        <div className="pt-4 border-t border-gray-200">
          <p className="text-sm font-semibold text-gray-700 mb-3">
            Ir a pregunta:
          </p>
          <div className="grid grid-cols-5 sm:grid-cols-10 gap-2">
            {Array.from({ length: totalQuestions }, (_, i) => (
              <button
                key={i}
                onClick={() => {
                  onGoTo(i)
                  setShowQuestionGrid(false)
                }}
                className={`h-10 rounded-lg border-2 font-semibold text-sm transition-all ${getQuestionStatus(i)}`}
              >
                {i + 1}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-4 mt-4 text-xs text-gray-600">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded border-2 border-green-500 bg-green-50"></div>
              <span>Respondida</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded border-2 border-gray-300 bg-white"></div>
              <span>Sin responder</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded border-2 border-blue-500 bg-blue-500"></div>
              <span>Actual</span>
            </div>
          </div>
        </div>
      )}

      {/* Confirm Finish Modal */}
      {showConfirmFinish && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full shadow-xl">
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              ¿Finalizar examen?
            </h3>
            <p className="text-gray-700 mb-6">
              Estás a punto de finalizar el examen. Podrás ver tus resultados y las explicaciones de cada pregunta.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowConfirmFinish(false)}
                className="flex-1 px-4 py-3 rounded-lg border-2 border-gray-300 bg-white text-gray-700 font-semibold hover:bg-gray-50"
              >
                Cancelar
              </button>
              <button
                onClick={confirmFinish}
                className="flex-1 px-4 py-3 rounded-lg bg-green-600 text-white font-semibold hover:bg-green-700"
              >
                Sí, finalizar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ExamNavigation
