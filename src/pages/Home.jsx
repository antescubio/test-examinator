import { Link } from 'react-router-dom'
import certifications from '../data/certifications.json'

function Home() {
  // Group certifications by provider
  const microsoftCerts = certifications.filter(cert => cert.provider === 'Microsoft')
  const mulesoftCerts = certifications.filter(cert => cert.provider === 'MuleSoft')

  const CertificationCard = ({ cert }) => (
    <Link 
      to={`/exam/${cert.id}/config`}
      className="block bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden"
    >
      <div 
        className="h-2"
        style={{ backgroundColor: cert.color }}
      ></div>
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-2xl font-bold text-gray-900">{cert.name}</h3>
            <p className="text-gray-600 mt-1">{cert.fullName.es}</p>
          </div>
          <div className="text-4xl opacity-20">
            {cert.provider === 'Microsoft' ? '🪟' : '🔷'}
          </div>
        </div>
        
        <div className="space-y-2 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <span className="font-semibold">📝 Preguntas:</span>
            <span>{cert.totalQuestionsInBank} disponibles</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-semibold">⏱️ Duración:</span>
            <span>{cert.examDuration} minutos</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-semibold">🎯 Puntuación mínima:</span>
            <span>{cert.passingScore}/{cert.maxScore}</span>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="flex flex-wrap gap-2">
            {cert.topics.slice(0, 3).map(topic => (
              <span 
                key={topic}
                className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-700"
              >
                {topic}
              </span>
            ))}
            {cert.topics.length > 3 && (
              <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-700">
                +{cert.topics.length - 3} más
              </span>
            )}
          </div>
        </div>

        <button 
          className="w-full mt-6 py-2 px-4 rounded-lg font-semibold text-white transition-colors duration-200"
          style={{ backgroundColor: cert.color }}
        >
          Empezar práctica →
        </button>
      </div>
    </Link>
  )

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-3">
          🎓 Prepara tu certificación
        </h1>
        <p className="text-lg text-gray-600">
          Practica con exámenes simulados para Microsoft y MuleSoft
        </p>
      </div>

      {/* Microsoft Certifications */}
      <section className="mb-12">
        <div className="flex items-center gap-3 mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Certificaciones Microsoft</h2>
          <span className="text-3xl">🪟</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {microsoftCerts.map(cert => (
            <CertificationCard key={cert.id} cert={cert} />
          ))}
        </div>
      </section>

      {/* MuleSoft Certifications */}
      <section>
        <div className="flex items-center gap-3 mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Certificaciones MuleSoft</h2>
          <span className="text-3xl">🔷</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mulesoftCerts.map(cert => (
            <CertificationCard key={cert.id} cert={cert} />
          ))}
        </div>
      </section>
    </div>
  )
}

export default Home
