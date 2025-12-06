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

    // Try to hide branding after widget loads
    script.onload = () => {
      setTimeout(() => {
        try {
          // Try to inject CSS into shadow DOM
          const widget = document.querySelector('elevenlabs-convai')
          if (widget && widget.shadowRoot) {
            const style = document.createElement('style')
            style.textContent = `
              /* Hide all powered by / branding elements */
              [class*="powered" i],
              [class*="branding" i],
              [id*="powered" i],
              a[href*="elevenlabs"],
              div:has(> a[href*="elevenlabs"]) {
                display: none !important;
                visibility: hidden !important;
                opacity: 0 !important;
                height: 0 !important;
                overflow: hidden !important;
              }
            `
            widget.shadowRoot.appendChild(style)
            console.log('✅ Attempted to hide branding in shadow DOM')
          }
        } catch (err) {
          console.log('⚠️ Could not access shadow DOM:', err.message)
        }
      }, 1000)
    }

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
          <p className="info-text">👇 Click the widget button to start talking</p>
          <p className="info-subtext">The AI assistant will appear in the bottom-right corner</p>
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
