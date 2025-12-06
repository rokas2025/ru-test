import { useState, useRef } from 'react'
import './App.css'

function App() {
  const [status, setStatus] = useState('')
  const [error, setError] = useState('')
  const [isActive, setIsActive] = useState(false)
  const [isConnecting, setIsConnecting] = useState(false)
  
  const wsRef = useRef(null)
  const audioContextRef = useRef(null)
  const mediaStreamRef = useRef(null)

  const startConversation = async () => {
    try {
      setError('')
      setIsConnecting(true)
      setStatus('🎤 Requesting microphone access...')

      // Get API key
      const apiKey = import.meta.env.VITE_ELEVENLABS_API_KEY
      if (!apiKey) {
        throw new Error('API key not found. Please set VITE_ELEVENLABS_API_KEY')
      }

      // Request microphone permission
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      mediaStreamRef.current = stream

      setStatus('🚀 Connecting to EU agent...')

      // Connect to EU WebSocket endpoint directly
      const wsUrl = `wss://api.eu.residency.elevenlabs.io/v1/convai/conversation?agent_id=agent_5601kbte4hqgfy2vat22eerajvts`
      console.log('Connecting to EU WebSocket:', wsUrl)
      
      const ws = new WebSocket(wsUrl)
      wsRef.current = ws

      ws.onopen = () => {
        console.log('WebSocket connected to EU endpoint!')
        
        // No need to send auth - agent_id is in URL and auth happens automatically
        // Just wait for conversation_initiation_metadata
        
        setStatus('✅ Connected! You can speak now...')
        setIsActive(true)
        setIsConnecting(false)

        // Set up audio processing
        setupAudioProcessing(ws, stream)
      }

      ws.onmessage = (event) => {
        console.log('Message from agent:', event.data)
        try {
          const data = JSON.parse(event.data)
          
          // Respond to ping events to keep connection alive
          if (data.type === 'ping') {
            ws.send(JSON.stringify({
              type: 'pong',
              event_id: data.ping_event?.event_id
            }))
          }
          
          handleAgentMessage(data, ws)
        } catch (err) {
          console.error('Error parsing message:', err)
        }
      }

      ws.onerror = (error) => {
        console.error('WebSocket error:', error)
        setError('❌ Connection error')
        setIsConnecting(false)
      }

      ws.onclose = (event) => {
        console.log('WebSocket closed:', event.code, event.reason)
        if (event.code === 3000) {
          setError(`❌ ${event.reason || 'Connection closed'}`)
        }
        setIsActive(false)
        setIsConnecting(false)
        cleanup()
      }

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to start conversation'
      setError('❌ ' + errorMessage)
      setStatus('')
      setIsConnecting(false)
      console.error('Error starting conversation:', err)
    }
  }

  const setupAudioProcessing = (ws, stream) => {
    try {
      audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)()
      const audioContext = audioContextRef.current
      const source = audioContext.createMediaStreamSource(stream)
      const processor = audioContext.createScriptProcessor(4096, 1, 1)

      source.connect(processor)
      processor.connect(audioContext.destination)

      processor.onaudioprocess = (e) => {
        if (ws.readyState === WebSocket.OPEN) {
          const audioData = e.inputBuffer.getChannelData(0)
          // Convert to 16-bit PCM
          const pcmData = new Int16Array(audioData.length)
          for (let i = 0; i < audioData.length; i++) {
            pcmData[i] = Math.max(-32768, Math.min(32767, audioData[i] * 32768))
          }
          
          // Convert PCM to base64
          const base64Audio = btoa(String.fromCharCode(...new Uint8Array(pcmData.buffer)))
          
          // Send as JSON message per ElevenLabs WebSocket API spec
          ws.send(JSON.stringify({
            type: 'user_audio_chunk',
            audio: base64Audio
          }))
        }
      }
    } catch (err) {
      console.error('Error setting up audio:', err)
    }
  }

  const handleAgentMessage = (data, ws) => {
    // Handle different message types from agent per ElevenLabs WebSocket API
    console.log('Agent message type:', data.type)
    
    if (data.type === 'audio' && data.audio_event) {
      // Play audio response from audio_event
      playAudioResponse(data.audio_event.audio_base_64)
    } else if (data.type === 'agent_response') {
      console.log('Agent said:', data.agent_response_event?.agent_response)
    } else if (data.type === 'agent_chat_response_part') {
      const text = data.text_response_part?.text
      if (text) console.log('Agent text:', text)
    } else if (data.type === 'conversation_initiation_metadata') {
      console.log('Conversation started:', data.conversation_initiation_metadata_event)
    }
  }

  const playAudioResponse = (base64Audio) => {
    // Decode base64 audio and play it
    try {
      const binaryString = atob(base64Audio)
      const bytes = new Uint8Array(binaryString.length)
      for (let i = 0; i < binaryString.length; i++) {
        bytes[i] = binaryString.charCodeAt(i)
      }
      
      console.log('Playing audio chunk:', bytes.length, 'bytes')
      
      // Play PCM audio (16-bit, 16kHz mono)
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)()
      }
      
      const audioContext = audioContextRef.current
      const int16Array = new Int16Array(bytes.buffer)
      const float32Array = new Float32Array(int16Array.length)
      
      // Convert 16-bit PCM to float32
      for (let i = 0; i < int16Array.length; i++) {
        float32Array[i] = int16Array[i] / 32768.0
      }
      
      // Create audio buffer and play
      const audioBuffer = audioContext.createBuffer(1, float32Array.length, 16000)
      audioBuffer.getChannelData(0).set(float32Array)
      
      const source = audioContext.createBufferSource()
      source.buffer = audioBuffer
      source.connect(audioContext.destination)
      source.start()
      
    } catch (err) {
      console.error('Error playing audio:', err)
    }
  }

  const stopConversation = () => {
    if (wsRef.current) {
      wsRef.current.close()
    }
    cleanup()
    setStatus('👋 Conversation ended')
    setIsActive(false)
  }

  const cleanup = () => {
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach(track => track.stop())
      mediaStreamRef.current = null
    }
    if (audioContextRef.current) {
      audioContextRef.current.close()
      audioContextRef.current = null
    }
    wsRef.current = null
  }

  return (
    <div className="container">
      <div className="card">
        {/* Header */}
        <div className="header">
          <h1 className="title">Wemods Test Agent</h1>
          <p className="subtitle">AI-powered voice assistant (EU Region)</p>
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
          <p>Direct WebSocket connection to EU servers</p>
          <p>Microphone access is required</p>
        </div>
      </div>
    </div>
  )
}

export default App
