# Agent Configuration Notes

## Current Agent Setup

**Agent ID:** `agent_5601kbte4hqgfy2vat22eerajvts`  
**Region:** EU (Europe)  
**Implementation:** ElevenLabs Conversational AI Widget

---

## Making Changes to the Agent

All agent behavior, personality, knowledge, and instructions are managed in the **ElevenLabs Dashboard**.

### Where to Edit:
🔗 https://elevenlabs.io/app

### What You Can Change (No Code Changes Needed):
- ✏️ **Instructions/Prompts** - Agent personality and behavior
- 📚 **Knowledge Base** - Documents, FAQs, custom data
- 🎤 **Voice Settings** - Voice selection and parameters
- ⚙️ **Model Settings** - LLM model and parameters
- 🔧 **Tools & Functions** - Custom integrations

### How Changes Take Effect:
- ✅ Changes are **instant** - no deployment required
- ✅ Widget automatically uses latest configuration
- ✅ No need to rebuild or redeploy the website

---

## Change Log

### Latest Changes
- Updated agent configuration via ElevenLabs dashboard
- (Add your specific changes here as you make them)

### Previous Updates
- Initial agent setup with EU residency
- Widget integration completed
- Deployed to Vercel

---

## Testing Your Changes

After updating agent settings in ElevenLabs:
1. Visit your website: https://ru-test.vercel.app
2. Click the widget button (bottom-right corner)
3. Start a conversation to test new behavior
4. No cache clearing needed - changes are immediate

---

## Technical Details

**Widget Script:** `@elevenlabs/convai-widget-embed`  
**Server Location:** `eu-residency` (ensures EU data compliance)  
**WebSocket Endpoint:** `wss://api.eu.elevenlabs.io`  

---

## Support

- 📖 ElevenLabs Docs: https://elevenlabs.io/docs/agents-platform/overview
- 🔧 Widget Docs: https://elevenlabs.io/docs/agents-platform/libraries/web-widget
- 🎤 Agent Dashboard: https://elevenlabs.io/app

