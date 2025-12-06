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
    const hideBranding = () => {
      const widget = document.querySelector('elevenlabs-convai')
      if (widget && widget.shadowRoot) {
        const style = document.createElement('style')
        style.textContent = `
          [class*="powered" i],
          [class*="branding" i],
          [class*="attribution" i],
          div:has(> a[href*="elevenlabs"]) {
            display: none !important;
            visibility: hidden !important;
            height: 0 !important;
            opacity: 0 !important;
          }
        `
        widget.shadowRoot.appendChild(style)
      }
    }

    // Try multiple times as widget might load asynchronously
    script.onload = () => {
      setTimeout(hideBranding, 100)
      setTimeout(hideBranding, 500)
      setTimeout(hideBranding, 1000)
      setTimeout(hideBranding, 2000)
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
