import { useState } from 'react'
import { useConversation } from '@elevenlabs/react'
import './App.css'

function App() {
  const [status, setStatus] = useState('')
  const [error, setError] = useState('')

  const conversation = useConversation({
    config: {
      serverUrl: 'wss://api.eu.elevenlabs.io',
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
  })

  const startConversation = async () => {
    try {
      setError('')
      setStatus('🎤 Requesting microphone access...')

      // Request microphone permission
      await navigator.mediaDevices.getUserMedia({ audio: true })

      setStatus('🚀 Starting conversation with EU server...')

      // Start session with EU residency and your agent ID
      await conversation.startSession({
        agentId: 'agent_5601kbte4hqgfy2vat22eerajvts',
        config: {
          serverUrl: 'wss://api.eu.elevenlabs.io',
        },
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

