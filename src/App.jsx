import { useEffect } from 'react'
import './App.css'

function App() {
  useEffect(() => {
    // Load the ElevenLabs widget script
    const script = document.createElement('script')
    script.src = 'https://unpkg.com/@elevenlabs/convai-widget-embed'
    script.async = true
    script.type = 'text/javascript'
    document.body.appendChild(script)

    return () => {
      // Cleanup script on unmount
      if (document.body.contains(script)) {
        document.body.removeChild(script)
      }
    }
  }, [])

  return (
    <div className="container">
      <div className="card">
        <div className="header">
          <h1 className="title">Wemods Test Agent</h1>
          <p className="subtitle">AI-powered voice assistant</p>
        </div>

        <div className="widget-info">
          <p className="info-text">👇 Click the widget button below to start talking</p>
          <p className="info-subtext">The conversational AI widget will appear in the bottom-right corner</p>
        </div>

        {/* ElevenLabs Conversational AI Widget with EU residency */}
        <elevenlabs-convai 
          agent-id="agent_5601kbte4hqgfy2vat22eerajvts" 
          server-location="eu-residency"
        ></elevenlabs-convai>

        <div className="footer">
          <p>Click the circular button in the bottom-right</p>
          <p>Microphone access will be requested when you start</p>
        </div>
      </div>
    </div>
  )
}

export default App
