import { useParams, useNavigate, Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import certifications from '../data/certifications.json'

function ExamConfig() {
  const { certId } = useParams()
  const navigate = useNavigate()
  
  const certification = certifications.find(cert => cert.id === certId)
  
  // Configuration state
  const [numQuestions, setNumQuestions] = useState(10)
  const [timeLimit, setTimeLimit] = useState('noLimit')
  const [selectedTopics, setSelectedTopics] = useState([])
  const [shuffleQuestions, setShuffleQuestions] = useState(true)
  const [shuffleOptions, setShuffleOptions] = useState(true)

  useEffect(() => {
    // Initialize with all topics selected
    if (certification) {
      setSelectedTopics(certification.topics)
    }
  }, [certification])

  if (!certification) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <p className="font-bold">Certificación no encontrada</p>
          <p>La certificación "{certId}" no existe.</p>
          <Link to="/" className="underline mt-2 inline-block">
            Volver al inicio
          </Link>
        </div>
      </div>
    )
  }

  const toggleTopic = (topic) => {
    setSelectedTopics(prev => 
      prev.includes(topic) 
        ? prev.filter(t => t !== topic)
        : [...prev, topic]
    )
  }

  const handleStartExam = () => {
    // Save configuration to localStorage or pass via navigation state
    const config = {
      numQuestions,
      timeLimit,
      selectedTopics,
      shuffleQuestions,
      shuffleOptions
    }
    
    localStorage.setItem(`exam-config-${certId}`, JSON.stringify(config))
    navigate(`/exam/${certId}/start`)
  }

  const timeLimitOptions = [
    { value: 'noLimit', label: 'Sin límite de tiempo', minutes: null },
    { value: '30', label: '30 minutos', minutes: 30 },
    { value: '60', label: '60 minutos', minutes: 60 },
    { value: '90', label: '90 minutos', minutes: 90 },
    { value: 'real', label: `Tiempo real (${certification.examDuration} min)`, minutes: certification.examDuration }
  ]

  const questionOptions = [10, 20, 30, certification.totalQuestionsInBank]
    .filter(n => n <= certification.totalQuestionsInBank)
    .filter((v, i, arr) => arr.indexOf(v) === i) // Remove duplicates

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      {/* Header */}
      <div className="mb-8">
        <Link 
          to="/" 
          className="text-gray-600 hover:text-gray-900 mb-4 inline-flex items-center gap-2"
        >
          ← Volver al inicio
        </Link>
        <div className="flex items-center gap-4 mt-4">
          <div 
            className="w-1 h-16 rounded"
            style={{ backgroundColor: certification.color }}
          ></div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              {certification.name}
            </h1>
            <p className="text-gray-600 text-lg">
              {certification.fullName.es}
            </p>
          </div>
        </div>
      </div>

      {/* Configuration Form */}
      <div className="bg-white rounded-lg shadow-lg p-6 space-y-6">
        
        {/* Number of Questions */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            📝 Número de preguntas
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {questionOptions.map(num => (
              <button
                key={num}
                onClick={() => setNumQuestions(num)}
                className={`py-2 px-4 rounded-lg border-2 font-semibold transition-colors ${
                  numQuestions === num
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                    : 'border-gray-300 bg-white text-gray-700 hover:border-gray-400'
                }`}
              >
                {num === certification.totalQuestionsInBank ? 'Todas' : num}
              </button>
            ))}
          </div>
          <p className="text-sm text-gray-500 mt-2">
            Disponibles: {certification.totalQuestionsInBank} preguntas
          </p>
        </div>

        {/* Time Limit */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            ⏱️ Límite de tiempo
          </label>
          <div className="space-y-2">
            {timeLimitOptions.map(option => (
              <label 
                key={option.value}
                className="flex items-center gap-3 p-3 rounded-lg border-2 cursor-pointer transition-colors hover:bg-gray-50"
                style={{
                  borderColor: timeLimit === option.value ? certification.color : '#e5e7eb',
                  backgroundColor: timeLimit === option.value ? `${certification.color}10` : 'white'
                }}
              >
                <input
                  type="radio"
                  name="timeLimit"
                  value={option.value}
                  checked={timeLimit === option.value}
                  onChange={(e) => setTimeLimit(e.target.value)}
                  className="w-4 h-4"
                  style={{ accentColor: certification.color }}
                />
                <span className="font-medium text-gray-700">{option.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Topics */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            📚 Temas a incluir
          </label>
          <div className="space-y-2">
            {certification.topics.map(topic => (
              <label 
                key={topic}
                className="flex items-center gap-3 p-3 rounded-lg border-2 cursor-pointer transition-colors hover:bg-gray-50"
                style={{
                  borderColor: selectedTopics.includes(topic) ? certification.color : '#e5e7eb',
                  backgroundColor: selectedTopics.includes(topic) ? `${certification.color}10` : 'white'
                }}
              >
                <input
                  type="checkbox"
                  checked={selectedTopics.includes(topic)}
                  onChange={() => toggleTopic(topic)}
                  className="w-4 h-4"
                  style={{ accentColor: certification.color }}
                />
                <span className="font-medium text-gray-700">{topic}</span>
              </label>
            ))}
          </div>
          {selectedTopics.length === 0 && (
            <p className="text-sm text-red-600 mt-2">
              ⚠️ Debes seleccionar al menos un tema
            </p>
          )}
        </div>

        {/* Options */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            🔀 Opciones adicionales
          </label>
          <div className="space-y-3">
            <label className="flex items-center gap-3 p-3 rounded-lg border-2 cursor-pointer transition-colors hover:bg-gray-50">
              <input
                type="checkbox"
                checked={shuffleQuestions}
                onChange={(e) => setShuffleQuestions(e.target.checked)}
                className="w-4 h-4"
                style={{ accentColor: certification.color }}
              />
              <div>
                <span className="font-medium text-gray-700 block">Barajar orden de preguntas</span>
                <span className="text-sm text-gray-500">Las preguntas aparecerán en orden aleatorio</span>
              </div>
            </label>
            
            <label className="flex items-center gap-3 p-3 rounded-lg border-2 cursor-pointer transition-colors hover:bg-gray-50">
              <input
                type="checkbox"
                checked={shuffleOptions}
                onChange={(e) => setShuffleOptions(e.target.checked)}
                className="w-4 h-4"
                style={{ accentColor: certification.color }}
              />
              <div>
                <span className="font-medium text-gray-700 block">Barajar orden de opciones</span>
                <span className="text-sm text-gray-500">Las opciones de respuesta se mostrarán en orden aleatorio</span>
              </div>
            </label>
          </div>
        </div>

        {/* Start Button */}
        <div className="pt-4">
          <button
            onClick={handleStartExam}
            disabled={selectedTopics.length === 0}
            className="w-full py-4 px-6 rounded-lg text-white font-bold text-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ 
              backgroundColor: selectedTopics.length > 0 ? certification.color : '#9ca3af'
            }}
          >
            🚀 Comenzar Examen
          </button>
        </div>
      </div>
    </div>
  )
}

export default ExamConfig
