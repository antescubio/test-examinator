import { useParams } from 'react-router-dom'

function ResultsPage() {
  const { certId } = useParams()

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">
        Resultados: {certId}
      </h1>
      <p className="text-gray-600">
        Puntuación y revisión de respuestas
      </p>
    </div>
  )
}

export default ResultsPage
