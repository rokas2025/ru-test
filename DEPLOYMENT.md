# 🚀 Deployment Instructions

## ✅ Project is Ready!

Your Wemods Test Agent is built and committed to Git.

---

## 📤 Push to GitHub

### Step 1: Create a New GitHub Repository

1. Go to https://github.com/new
2. Repository name: `wemods-test-agent` (or your choice)
3. Keep it **Public** or **Private**
4. **DO NOT** initialize with README, .gitignore, or license (we already have them)
5. Click "Create repository"

### Step 2: Push Your Code

GitHub will show you commands. Use these:

```powershell
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git branch -M main
git push -u origin main
```

**Example:**
```powershell
git remote add origin https://github.com/yourusername/wemods-test-agent.git
git branch -M main
git push -u origin main
```

---

## 🌐 Deploy to Vercel

### Step 1: Go to Vercel

1. Visit https://vercel.com/new
2. Sign in with GitHub
3. Click "Import Project"
4. Select your `wemods-test-agent` repository

### Step 2: Configure Environment Variable

**IMPORTANT:** Add this environment variable:

- **Name:** `VITE_ELEVENLABS_API_KEY`
- **Value:** Your ElevenLabs EU API key

Get your key from: https://elevenlabs.io/app/settings/api-keys

### Step 3: Deploy

1. Click "Deploy"
2. Wait 1-2 minutes
3. Your agent will be live! 🎉

Vercel will give you a URL like: `https://wemods-test-agent.vercel.app`

---

## 🔑 Where to Add the ElevenLabs API Key

### For Local Development:

Create `.env.local` file:

```env
VITE_ELEVENLABS_API_KEY=your_elevenlabs_eu_api_key_here
```

### For Vercel Production:

1. Go to your project in Vercel dashboard
2. Click "Settings" → "Environment Variables"
3. Add:
   - Name: `VITE_ELEVENLABS_API_KEY`
   - Value: Your EU API key
   - Environment: Production (check all)
4. Click "Save"

---

## ✨ Your Agent Configuration

- **Agent ID:** `agent_5601kbte4hqgfy2vat22eerajvts`
- **Region:** EU (configured with `serverLocation: 'eu-residency'`)
- **Endpoint:** Automatically uses `api.eu.elevenlabs.io`
- **Knowledge Base:** Managed in ElevenLabs UI (no code changes needed)

---

## 🧪 Test Locally First

```powershell
npm run dev
```

Open http://localhost:5173 and test the agent before deploying.

---

## 📱 Features

✅ Clean UI with "Wemods Test Agent" branding  
✅ No ElevenLabs branding visible to clients  
✅ Voice conversation with AI agent  
✅ EU data residency compliance  
✅ Mobile responsive  
✅ Modern animations and visual feedback  

---

## 🆘 Troubleshooting

**Microphone not working?**
- Check browser permissions
- Use HTTPS (Vercel provides this automatically)

**Agent not connecting?**
- Verify API key in environment variables
- Check agent ID is correct
- Ensure you're using EU API key

**Build fails on Vercel?**
- Check environment variable is named `VITE_ELEVENLABS_API_KEY` (not just `ELEVENLABS_API_KEY`)
- Vite requires the `VITE_` prefix for client-side variables

---

## 📞 Need Help?

- ElevenLabs Docs: https://elevenlabs.io/docs/agents-platform/overview
- React SDK: https://elevenlabs.io/docs/agents-platform/libraries/react

