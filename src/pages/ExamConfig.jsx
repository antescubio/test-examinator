import { useParams } from 'react-router-dom'

function ExamConfig() {
  const { certId } = useParams()

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">
        Configurar Examen: {certId}
      </h1>
      <p className="text-gray-600">
        Aquí podrás configurar el número de preguntas, tiempo, y otros parámetros
      </p>
    </div>
  )
}

export default ExamConfig
