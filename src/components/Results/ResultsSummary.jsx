import { getPerformanceLevel, getWeakTopics, getStrongTopics } from '../../utils/scoring'

function ResultsSummary({ results, certification }) {
  const { topicPerformance, percentage } = results
  const performanceLevel = getPerformanceLevel(percentage)
  const weakTopics = getWeakTopics(topicPerformance, 70)
  const strongTopics = getStrongTopics(topicPerformance, 80)

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        📊 Resumen por Temas
      </h2>

      {/* Performance Level */}
      <div className="mb-6 p-4 rounded-lg" style={{ backgroundColor: `${performanceLevel.color}15` }}>
        <div className="flex items-center gap-3">
          <div 
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: performanceLevel.color }}
          ></div>
          <div>
            <span className="text-sm text-gray-600">Nivel de desempeño: </span>
            <span className="font-bold" style={{ color: performanceLevel.color }}>
              {performanceLevel.level}
            </span>
          </div>
        </div>
      </div>

      {/* Topic Performance Table */}
      <div className="space-y-4 mb-6">
        {topicPerformance.map((topic, index) => (
          <div key={index} className="border-l-4 pl-4 py-2" style={{ borderColor: certification.color }}>
            <div className="flex items-center justify-between mb-2">
              <span className="font-semibold text-gray-900">{topic.topic}</span>
              <span className="text-sm text-gray-600">
                {topic.correct} de {topic.total} correctas
              </span>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex-1 bg-gray-200 rounded-full h-2 overflow-hidden">
                <div 
                  className="h-2 rounded-full transition-all duration-500"
                  style={{ 
                    width: `${topic.percentage}%`,
                    backgroundColor: topic.percentage >= 70 ? '#10b981' : '#ef4444'
                  }}
                />
              </div>
              <span className={`text-sm font-bold min-w-[3rem] text-right ${
                topic.percentage >= 70 ? 'text-green-600' : 'text-red-600'
              }`}>
                {topic.percentage}%
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Weak Topics Alert */}
      {weakTopics.length > 0 && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded mb-4">
          <h3 className="text-sm font-bold text-red-800 mb-2">
            ⚠️ Temas a reforzar (menos del 70%)
          </h3>
          <ul className="list-disc list-inside text-sm text-red-700">
            {weakTopics.map((topic, index) => (
              <li key={index}>
                {topic.topic} - {topic.percentage}%
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Strong Topics */}
      {strongTopics.length > 0 && (
        <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded">
          <h3 className="text-sm font-bold text-green-800 mb-2">
            ✓ Temas dominados (más del 80%)
          </h3>
          <ul className="list-disc list-inside text-sm text-green-700">
            {strongTopics.map((topic, index) => (
              <li key={index}>
                {topic.topic} - {topic.percentage}%
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default ResultsSummary
