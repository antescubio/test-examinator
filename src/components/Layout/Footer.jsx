function Footer() {
  return (
    <footer className="bg-gray-800 text-gray-300 mt-auto">
      <div className="container mx-auto px-4 py-6">
        <div className="text-center text-sm">
          <p>Test Examinator &copy; {new Date().getFullYear()}</p>
          <p className="mt-2 text-gray-400">
            Plataforma de preparación para certificaciones oficiales
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
