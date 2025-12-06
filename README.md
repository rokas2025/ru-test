# Wemods Test Agent

AI-powered conversational agent using ElevenLabs Agents Platform (EU Region).

## 🚀 Quick Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure API Key (IMPORTANT!)

Create a `.env.local` file in the root:

```env
VITE_ELEVENLABS_API_KEY=your_elevenlabs_eu_api_key_here
```

**Get your ElevenLabs API key:**
- Go to: https://elevenlabs.io/app/settings/api-keys
- Copy your EU API key
- Paste it in `.env.local`

### 3. Run Development Server

```bash
npm run dev
```

Open http://localhost:5173 in your browser.

## 📦 Build for Production

```bash
npm run build
```

The `dist/` folder will contain your production build.

## 🚢 Deploy to Vercel

### Via GitHub (Recommended)

1. Push code to GitHub
2. Go to https://vercel.com/new
3. Import your repository
4. Add environment variable:
   - Name: `VITE_ELEVENLABS_API_KEY`
   - Value: Your ElevenLabs EU API key
5. Click "Deploy"

### Via Vercel CLI

```bash
npm i -g vercel
vercel
```

Then add your API key in Vercel dashboard → Project Settings → Environment Variables.

## 🤖 Agent Configuration

- **Agent ID:** `agent_5601kbte4hqgfy2vat22eerajvts`
- **Server Location:** EU Residency (`eu-residency`)
- **Knowledge Base & Instructions:** Managed in ElevenLabs UI

## 🛠️ Tech Stack

- **Vite** - Fast build tool
- **React** - UI library
- **ElevenLabs React SDK** - Conversational AI
- **CSS3** - Modern styling with animations

## 📝 Notes

- Microphone access is required
- Uses EU endpoint for data residency compliance
- Agent configuration is managed entirely in ElevenLabs dashboard
- No backend needed - fully static deployment

## 🔗 Resources

- [ElevenLabs Agents Docs](https://elevenlabs.io/docs/agents-platform/overview)
- [React SDK Docs](https://elevenlabs.io/docs/agents-platform/libraries/react)
