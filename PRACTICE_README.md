# 🎯 Intuit Frontend Craft Demo - Practice Resources

## 📚 What's Here

I've created a complete practice environment for the **Intuit Frontend L5 Craft Demo** based on real candidate experiences. This includes the **6 user stories + 1 AI bonus** that candidates typically see during the 75-minute coding session.

---

## 🚀 Quick Start

```bash
# 1. Run the setup script
./practice-setup.sh

# 2. In Terminal 1: Start dev server
npm run dev

# 3. In Terminal 2: Start tests in watch mode
npm test -- --watch

# 4. Open browser to http://localhost:5173

# 5. Set a 75-minute timer and start coding!
```

---

## 📖 Practice Documents

### **1. PRACTICE_PLAN.md** - Your Main Guide
- Complete description of all 6 stories + AI bonus
- 75-minute strategy breakdown
- File structure you'll create
- Success criteria and what interviewers look for

**Start here!** This is your blueprint.

---

### **2. PRACTICE_TEMPLATES.md** - Code Starters
- Ready-to-use component templates
- CSS module styles
- Test file examples
- Copy/paste to save time during practice

**Use this during coding** to speed up your practice sessions.

---

### **3. PRACTICE_CHECKLIST.md** - Timeline & Tasks
- Minute-by-minute checklist for 75 minutes
- Phase breakdowns (planning → coding → testing → wrap-up)
- Time check markers
- Emergency quick wins if running out of time

**Print this out** and check off items as you go!

---

### **4. TALKING_POINTS.md** - Communication Script
- What to say when planning
- How to narrate your coding decisions
- Answers to common follow-up questions
- Wrap-up summary examples

**Practice these out loud!** Communication is 50% of the evaluation.

---

## 🎯 The 6 User Stories + 1 AI Bonus

### ✅ High Priority (Build First - 50 min)

1. **Story 1:** Create a new Project with name and description
2. **Story 2:** List all Projects with loading/error/empty states
3. **Story 3:** Add an Inspiration (URL + notes) to a Project
4. **Story 6:** Proper loading, error, and empty states everywhere

### 🤖 Bonus (15 min)

7. **Story 7 (AI):** Auto-generate caption using Ollama LLM

### ⚠️ Lower Priority (If Time Allows)

4. **Story 4:** Edit and delete Inspirations
5. **Story 5:** Search/filter Inspirations by keyword or date

---

## ⏱️ Recommended 75-Minute Timeline

| Time | Phase | What You're Doing |
|------|-------|-------------------|
| **0-5 min** | Planning | Read stories, state your prioritization plan out loud |
| **5-15 min** | Foundation | Create LoadingSpinner, ErrorState, EmptyState + tests |
| **15-25 min** | Story 1 | Build ProjectForm with validation + tests |
| **25-35 min** | Story 2 | Update Projects page with all states |
| **35-50 min** | Story 3 | Build InspirationForm and display |
| **50-65 min** | Story 7 | Implement AI service + integrate with form |
| **65-72 min** | Testing | Run all tests, fix bugs, smoke test in browser |
| **72-75 min** | Wrap-up | Demo and explain what you built + improvements |

---

## 🧪 Testing Strategy

**Minimum tests to write:**
- `ProjectForm.test.jsx` - validation, submit, error clearing
- `EmptyState.test.jsx` - renders with props, calls actions
- `InspirationForm.test.jsx` - URL validation, form submission
- `aiService.test.ts` - mocked API calls, error handling

**Focus on:**
- User interactions (clicking, typing, submitting)
- Edge cases (empty inputs, API errors)
- Accessibility (ARIA labels, keyboard navigation)

---

## 🤖 AI Feature Setup (Story 7)

The AI bonus uses **Ollama with TinyLlama** running locally.

### Start Ollama:

```bash
# Pull and run Ollama
docker pull ollama/ollama
docker run -d -v ~/ollama:/root/.ollama -p 11434:11434 --name ollama ollama/ollama

# Install and run TinyLlama model
docker exec -it ollama ollama run tinyllama
```

### Test AI API:

```bash
curl --location 'http://localhost:11434/api/generate' \
  --header 'Content-Type: application/json' \
  --data '{
    "model": "tinyllama",
    "prompt": "Generate a short caption for this design inspiration",
    "stream": false
  }'
```

**Expected response:**
```json
{
  "response": "A beautiful minimal design with clean typography and blue accents..."
}
```

---

## 📁 Files You'll Create During Practice

```
src/
├── components/
│   ├── ProjectForm.jsx          ✅ Story 1
│   ├── ProjectForm.test.jsx     
│   ├── ProjectCard.jsx          ✅ Story 2
│   ├── InspirationForm.jsx      ✅ Story 3
│   ├── InspirationCard.jsx      
│   ├── LoadingSpinner.jsx       ✅ Story 6
│   ├── ErrorState.jsx           
│   ├── EmptyState.jsx           
│   └── EmptyState.test.jsx      
├── services/
│   ├── aiService.ts             🤖 Story 7
│   └── aiService.test.ts        
└── pages/
    ├── Projects.jsx             🔧 Modified
    └── ProjectDetail.jsx        🔧 Modified
```

---

## 💡 Success Tips

### ✅ DO:

- **Start with state components** (loading, error, empty) - they're reusable
- **Write tests as you go** - don't save them for the end
- **Explain your decisions out loud** - communication is key
- **Prioritize working features** over perfect code
- **Handle edge cases** - empty lists, errors, loading states
- **Use the templates** - they'll save you 10-15 minutes

### ❌ DON'T:

- Don't aim for 100% completion - nobody finishes all 7 stories
- Don't spend time on pixel-perfect styling
- Don't get stuck on one story - move on and explain tradeoffs
- Don't skip tests - they show your quality mindset
- Don't code in silence - narrate your thought process

---

## 🎬 Practice Routine

### Before Each Practice:

1. ✅ Run `./practice-setup.sh`
2. ✅ Set a **75-minute timer**
3. ✅ Open `PRACTICE_CHECKLIST.md`
4. ✅ Clear IndexedDB (open DevTools → Application → IndexedDB → Delete)
5. ✅ Close unnecessary browser tabs
6. ✅ Have `PRACTICE_TEMPLATES.md` open for reference

### During Practice:

- ✅ Follow the checklist minute-by-minute
- ✅ **Talk out loud** as if explaining to an interviewer
- ✅ Check your time at each phase marker
- ✅ Run tests frequently (`npm test`)
- ✅ Commit after each story (optional: `git commit -m "Story 1 complete"`)

### After Practice:

- ✅ Record what you completed in 75 minutes
- ✅ Note what slowed you down (debugging? styling? API integration?)
- ✅ Review `TALKING_POINTS.md` - what would you say differently?
- ✅ **Rest, then repeat!** Aim for 2-3 full practice runs

---

## 🎯 What Interviewers Are Looking For

### 1. **Prioritization** (Can you pick the right stories?)
- Did you build high-value features first?
- Did you explain why you deferred certain stories?

### 2. **Code Quality** (Is it clean and maintainable?)
- Are components well-named and single-purpose?
- Is the code DRY (reusable components)?
- Are there comments where needed?

### 3. **Testing** (Do you have a quality mindset?)
- Did you write meaningful tests (not just coverage)?
- Do tests cover edge cases?
- Are tests readable and maintainable?

### 4. **Error Handling** (Is the UI robust?)
- Loading states while fetching data?
- Error states with retry buttons?
- Empty states with helpful CTAs?

### 5. **Communication** (Can you explain your choices?)
- Did you narrate your approach?
- Did you explain tradeoffs?
- Did you ask clarifying questions?

### 6. **Time Management** (Can you ship under pressure?)
- Did you deliver working features?
- Did you adjust scope when needed?
- Did you finish with a demo?

---

## 🆘 Troubleshooting

### "Tests are failing!"
```bash
# Clear Jest cache
npm test -- --clearCache

# Run tests with verbose output
npm test -- --verbose

# Run a specific test file
npm test ProjectForm.test
```

### "Ollama isn't working!"
```bash
# Check if Ollama is running
curl http://localhost:11434/api/version

# Restart Ollama
docker restart ollama
docker exec -it ollama ollama run tinyllama

# Alternative: Skip AI feature and explain it verbally
```

### "IndexedDB has old data!"
```bash
# Open Chrome DevTools → Application → IndexedDB → Right-click → Delete database
# Or programmatically:
window.indexedDB.deleteDatabase('page-prism')
```

### "I'm running out of time!"
- **At 60 min:** Skip AI tests, just implement the function
- **At 70 min:** Stop coding, run tests, prepare demo
- **At 73 min:** Start your wrap-up summary

---

## 📞 Quick Reference

### Essential Commands:
```bash
npm run dev          # Start dev server (localhost:5173)
npm test             # Run all tests
npm test -- --watch  # Run tests in watch mode
npm run lint         # Check for linting errors
npm run build        # Build for production
```

### API Services Already Available:
```javascript
// Projects
import { createProject, getAllProjects, getProject, updateProject, deleteProject } from '../services/project'

// Inspirations
import { createInspiration, getInspirationsByProject, updateInspiration, deleteInspiration } from '../services/inspiration'
```

---

## 🎉 You're Ready!

You now have everything you need to practice for the Intuit Frontend Craft Demo:

1. ✅ **PRACTICE_PLAN.md** - The stories and strategy
2. ✅ **PRACTICE_TEMPLATES.md** - Code to copy/paste
3. ✅ **PRACTICE_CHECKLIST.md** - Timeline and tasks
4. ✅ **TALKING_POINTS.md** - What to say
5. ✅ **practice-setup.sh** - Quick environment setup

---

## 🚀 Start Your First Practice Run

```bash
./practice-setup.sh
npm run dev
# Set a 75-minute timer
# Open PRACTICE_CHECKLIST.md
# GO! 🏃‍♂️
```

---

**Good luck! Remember: It's not about finishing everything—it's about showing your process, prioritizing well, and communicating clearly.** 🍀

**Questions?** Review the TALKING_POINTS.md for answers to common interview questions!
