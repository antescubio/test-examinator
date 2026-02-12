import { useParams } from 'react-router-dom'

function ExamPage() {
  const { certId } = useParams()

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">
        Examen en curso: {certId}
      </h1>
      <p className="text-gray-600">
        Motor del examen simulado
      </p>
    </div>
  )
}

export default ExamPage
