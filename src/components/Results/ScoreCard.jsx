function ScoreCard({ results, certification }) {
  const { score, passed, percentage, correctCount, totalQuestions, passingScore, maxScore } = results
  
  const scorePercentage = (score / maxScore) * 100
  
  const getScoreColor = () => {
    if (passed) return certification.color
    return '#ef4444'
  }

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <div className="bg-white rounded-lg shadow-xl p-8">
      {/* Pass/Fail Banner */}
      <div 
        className={`text-center py-6 rounded-lg mb-6 ${
          passed ? 'bg-green-100' : 'bg-red-100'
        }`}
      >
        <div className="text-6xl mb-2">
          {passed ? '🎉' : '😔'}
        </div>
        <h2 className={`text-3xl font-bold ${
          passed ? 'text-green-800' : 'text-red-800'
        }`}>
          {passed ? '¡APROBADO!' : 'NO APROBADO'}
        </h2>
      </div>

      {/* Score Display */}
      <div className="text-center mb-8">
        <div className="mb-4">
          <div className="text-6xl font-bold mb-2" style={{ color: getScoreColor() }}>
            {score}
          </div>
          <div className="text-gray-600 text-lg">
            de {maxScore} puntos
          </div>
        </div>

        {/* Score Bar */}
        <div className="max-w-md mx-auto">
          <div className="relative w-full bg-gray-200 rounded-full h-6 overflow-hidden">
            <div 
              className="h-6 rounded-full transition-all duration-500"
              style={{ 
                width: `${scorePercentage}%`,
                backgroundColor: getScoreColor()
              }}
            />
            {/* Passing Score Marker */}
            <div 
              className="absolute top-0 h-6 w-1 bg-gray-700"
              style={{ left: `${(passingScore / maxScore) * 100}%` }}
            >
              <div className="absolute -top-8 -left-6 text-xs text-gray-600 whitespace-nowrap">
                Mínimo: {passingScore}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="text-center p-4 bg-gray-50 rounded-lg">
          <div className="text-3xl font-bold text-gray-900">
            {percentage}%
          </div>
          <div className="text-sm text-gray-600 mt-1">
            Porcentaje
          </div>
        </div>

        <div className="text-center p-4 bg-gray-50 rounded-lg">
          <div className="text-3xl font-bold text-green-600">
            {correctCount}
          </div>
          <div className="text-sm text-gray-600 mt-1">
            Correctas
          </div>
        </div>

        <div className="text-center p-4 bg-gray-50 rounded-lg">
          <div className="text-3xl font-bold text-red-600">
            {results.incorrectCount}
          </div>
          <div className="text-sm text-gray-600 mt-1">
            Incorrectas
          </div>
        </div>

        <div className="text-center p-4 bg-gray-50 rounded-lg">
          <div className="text-3xl font-bold text-gray-900">
            {formatTime(results.timeSpent || 0)}
          </div>
          <div className="text-sm text-gray-600 mt-1">
            Tiempo usado
          </div>
        </div>
      </div>

      {/* Certification Info */}
      <div className="mt-6 pt-6 border-t border-gray-200 text-center">
        <div className="text-sm text-gray-600">
          Certificación: <span className="font-semibold">{certification.name}</span>
        </div>
        <div className="text-sm text-gray-600 mt-1">
          {certification.fullName.es}
        </div>
      </div>
    </div>
  )
}

export default ScoreCard
