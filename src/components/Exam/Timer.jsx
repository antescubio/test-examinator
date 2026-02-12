function Timer({ timeRemaining, formattedTime }) {
  if (timeRemaining === null || timeRemaining === undefined) {
    return null
  }

  const isLowTime = timeRemaining > 0 && timeRemaining < 300 // Less than 5 minutes
  const isVeryLowTime = timeRemaining > 0 && timeRemaining < 60 // Less than 1 minute

  return (
    <div className={`flex items-center gap-3 px-6 py-4 rounded-lg font-mono text-2xl font-bold ${
      isVeryLowTime ? 'bg-red-100 text-red-700 animate-pulse' :
      isLowTime ? 'bg-orange-100 text-orange-700' :
      'bg-gray-100 text-gray-700'
    }`}>
      <span className="text-3xl">⏱️</span>
      <div>
        <div className="text-xs font-sans font-normal text-gray-600 mb-1">
          Tiempo restante
        </div>
        <div className={isVeryLowTime ? 'animate-pulse' : ''}>
          {formattedTime}
        </div>
      </div>
      {isLowTime && (
        <span className="ml-auto text-sm font-sans font-semibold">
          {isVeryLowTime ? '¡URGENTE!' : '¡Poco tiempo!'}
        </span>
      )}
    </div>
  )
}

export default Timer
