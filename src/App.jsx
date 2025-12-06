import { useState } from 'react'
import { useConversation } from '@elevenlabs/react'
import './App.css'

function App() {
  const [status, setStatus] = useState('')
  const [error, setError] = useState('')

  const conversation = useConversation({
    config: {
      baseUrl: 'https://api.eu.residency.elevenlabs.io',
    },
    onConnect: () => {
      setStatus('🎉 Connected to agent!')
      setError('')
    },
    onDisconnect: () => {
      setStatus('Disconnected')
    },
    onError: (err) => {
      setError(err.message || 'An error occurred')
      setStatus('')
    },
    onMessage: (message) => {
      console.log('Message:', message)
    },
  })

  const startConversation = async () => {
    try {
      setError('')
      setStatus('🎤 Requesting microphone access...')

      // Request microphone permission
      await navigator.mediaDevices.getUserMedia({ audio: true })

      setStatus('🚀 Getting signed URL from EU server...')

      // Get signed URL from EU endpoint
      const apiKey = import.meta.env.VITE_ELEVENLABS_API_KEY
      if (!apiKey) {
        throw new Error('API key not found. Please set VITE_ELEVENLABS_API_KEY in Vercel environment variables.')
      }

      const response = await fetch('https://api.eu.residency.elevenlabs.io/v1/convai/conversation/get_signed_url', {
        method: 'POST',
        headers: {
          'xi-api-key': apiKey,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          agent_id: 'agent_5601kbte4hqgfy2vat22eerajvts',
        }),
      })

      if (!response.ok) {
        throw new Error(`Failed to get signed URL: ${response.statusText}`)
      }

      const { signed_url } = await response.json()
      console.log('Got signed URL for EU agent:', signed_url)

      setStatus('🚀 Connecting to agent...')

      // Start session with signed URL
      await conversation.startSession({
        signedUrl: signed_url,
      })

      setStatus('✅ Connected! You can speak now...')
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to start conversation'
      setError('❌ ' + errorMessage)
      setStatus('')
      console.error('Error starting conversation:', err)
    }
  }

  const stopConversation = async () => {
    try {
      await conversation.endSession()
      setStatus('👋 Conversation ended')
    } catch (err) {
      console.error('Error ending conversation:', err)
    }
  }

  const isActive = conversation.status === 'connected'
  const isConnecting = conversation.status === 'connecting'

  return (
    <div className="container">
      <div className="card">
        {/* Header */}
        <div className="header">
          <h1 className="title">Wemods Test Agent</h1>
          <p className="subtitle">AI-powered voice assistant</p>
        </div>

        {/* Status Display */}
        {(status || error) && (
          <div className={`status ${error ? 'error' : 'info'}`}>
            {error || status}
          </div>
        )}

        {/* Active Indicator */}
        {isActive && (
          <div className="active-indicator">
            <div className="pulse"></div>
            <span className="active-text">🎙️ Listening...</span>
          </div>
        )}

        {/* Action Buttons */}
        <div className="button-container">
          {!isActive ? (
            <button
              onClick={startConversation}
              disabled={isConnecting}
              className={`btn ${isConnecting ? 'btn-disabled' : 'btn-primary'}`}
            >
              {isConnecting ? (
                <>
                  <span className="spinner"></span>
                  Connecting...
                </>
              ) : (
                '🎤 Start Talking with Agent'
              )}
            </button>
          ) : (
            <button onClick={stopConversation} className="btn btn-danger">
              ⏹️ End Conversation
            </button>
          )}
        </div>

        {/* Info Footer */}
        <div className="footer">
          <p>Click the button to start a voice conversation</p>
          <p>Microphone access is required</p>
        </div>
      </div>
    </div>
  )
}

export default App
