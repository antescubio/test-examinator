function Header() {
  return (
    <header className="bg-blue-600 text-white shadow-md">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">
            Test Examinator
          </h1>
          <div className="flex items-center gap-4">
            <select 
              className="bg-blue-700 px-3 py-1 rounded text-sm"
              defaultValue="es"
            >
              <option value="es">🇪🇸 Español</option>
              <option value="en">🇬🇧 English</option>
            </select>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
