import React from 'react'
import ReactDOM from 'react-dom/client'
import { ElevenLabsConversation } from '@elevenlabs/react'
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ElevenLabsConversation
      config={{
        baseUrl: 'https://api.eu.residency.elevenlabs.io',
      }}
    >
      <App />
    </ElevenLabsConversation>
  </React.StrictMode>,
)
