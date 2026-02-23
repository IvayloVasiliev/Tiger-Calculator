import { useState, useCallback } from 'react'
import { Calculator } from './components/Calculator'

function App() {
  const [isGoldenMode, setIsGoldenMode] = useState(false)

  const handleGoldenMode = useCallback((isActive: boolean) => {
    setIsGoldenMode(isActive)
  }, [])

  return (
    <div className={`app ${isGoldenMode ? 'golden-mode' : ''}`}>
      <div className="container">
        <header className="header">
          <h1>🐯 TIGER CALC 🐯</h1>
          <p>The Ultimate Jungle Math Adventure!</p>
        </header>

        <main className="main-content">
          <Calculator onGoldenMode={handleGoldenMode} />
        </main>

        <footer className="footer">
          <p>Tip: Try entering 333 for a special golden tiger surprise! 🌟</p>
        </footer>
      </div>
    </div>
  )
}

export default App
