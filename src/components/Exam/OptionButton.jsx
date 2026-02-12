function OptionButton({ option, isSelected, isCorrect, showCorrect, onClick, isMultiple, disabled }) {
  const getButtonStyle = () => {
    if (showCorrect) {
      // Results mode: show correct/incorrect
      if (isCorrect) {
        return 'border-green-500 bg-green-50 text-green-900'
      }
      if (isSelected && !isCorrect) {
        return 'border-red-500 bg-red-50 text-red-900'
      }
      return 'border-gray-300 bg-white text-gray-700'
    }
    
    // Exam mode: show selection state only
    if (isSelected) {
      return 'border-blue-500 bg-blue-50 text-blue-900 ring-2 ring-blue-500'
    }
    
    return 'border-gray-300 bg-white text-gray-700 hover:border-blue-400 hover:bg-blue-50'
  }

  const getIconStyle = () => {
    if (showCorrect) {
      if (isCorrect) return 'bg-green-500 text-white'
      if (isSelected && !isCorrect) return 'bg-red-500 text-white'
      return 'bg-gray-200 text-gray-600'
    }
    
    if (isSelected) {
      return 'bg-blue-500 text-white'
    }
    
    return 'bg-gray-200 text-gray-600'
  }

  const getIcon = () => {
    if (showCorrect) {
      if (isCorrect) return '✓'
      if (isSelected && !isCorrect) return '✗'
    }
    
    if (isMultiple) {
      return isSelected ? '✓' : ''
    }
    
    return isSelected ? '●' : '○'
  }

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`w-full p-4 rounded-lg border-2 transition-all duration-200 text-left flex items-start gap-4 ${getButtonStyle()} disabled:cursor-not-allowed disabled:opacity-60`}
    >
      <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${getIconStyle()}`}>
        {showCorrect ? getIcon() : option.id}
      </div>
      <div className="flex-1 pt-1">
        <span className="text-base">{option.text.es}</span>
      </div>
    </button>
  )
}

export default OptionButton
