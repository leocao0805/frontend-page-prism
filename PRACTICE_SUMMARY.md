# 🎯 Practice Resources - Quick Summary

## 📦 What I've Created For You

I've set up a complete practice environment for the **Intuit Frontend L5 Craft Demo** based on real candidate experiences. Here's what you have:

---

## 📚 The 4 Key Documents

### 1. **PRACTICE_README.md** ⭐ START HERE
Your complete guide with:
- Overview of the 6 stories + AI bonus
- Quick start commands
- 75-minute timeline
- Setup instructions
- Troubleshooting guide

### 2. **PRACTICE_PLAN.md** 📋 THE BLUEPRINT
Detailed breakdown of:
- All 7 user stories with acceptance criteria
- Which stories to prioritize (1, 2, 3, 6, 7)
- Phase-by-phase strategy (5→10→10→15→15→10)
- Files you'll create
- Success criteria

### 3. **PRACTICE_TEMPLATES.md** 💻 CODE HELPERS
Ready-to-use code for:
- `LoadingSpinner`, `ErrorState`, `EmptyState` components
- `ProjectForm` with validation and tests
- `InspirationForm` with AI integration
- `aiService.ts` for Ollama API calls
- All CSS modules and test files

### 4. **PRACTICE_CHECKLIST.md** ✅ TIMELINE TRACKER
Minute-by-minute checklist:
- Phase 1 (0-7 min): Read & plan
- Phase 2 (7-19 min): Build state components
- Phase 3 (19-31 min): Story 1 - Create Project
- Phase 4 (31-43 min): Story 2 - List Projects
- Phase 5 (43-58 min): Story 3 - Create Inspiration
- Phase 6 (58-73 min): Story 7 - AI Feature
- Phase 7 (73-75 min): Demo & wrap-up

### 5. **TALKING_POINTS.md** 🎤 COMMUNICATION GUIDE
What to say:
- Opening plan (minute 0-5)
- While coding (narrating decisions)
- Wrap-up summary
- Answers to follow-up questions
- Confidence boosters

---

## 🚀 Quick Start (3 Steps)

```bash
# Step 1: Setup environment
./practice-setup.sh

# Step 2: Start development
# Terminal 1:
npm run dev

# Terminal 2:
npm test -- --watch

# Step 3: Practice!
# - Set 75-minute timer
# - Open PRACTICE_CHECKLIST.md
# - Open http://localhost:5173
# - Start coding!
```

---

## 🎯 The 6 Stories + 1 AI Bonus

Based on real candidate experiences, these are the typical stories:

### ✅ **High Priority** (Build in 50 minutes)
1. **Create Project** - Form with name/description, validation
2. **List Projects** - Grid view with loading/error/empty states
3. **Add Inspiration** - Form with URL + notes, attach to project
6. **Loading/Error/Empty States** - Reusable components

### 🤖 **AI Bonus** (Build in 15 minutes)
7. **Auto-Generate Caption** - Integrate Ollama LLM API

### ⚠️ **Lower Priority** (Explain, don't build)
4. Edit/Delete Inspirations
5. Search/Filter Inspirations

---

## ⏱️ Time Breakdown

| Minutes | Phase | Deliverable |
|---------|-------|-------------|
| 0-5 | Planning | State your prioritization out loud |
| 5-15 | Foundation | LoadingSpinner, ErrorState, EmptyState + tests |
| 15-25 | Story 1 | ProjectForm with validation + tests |
| 25-35 | Story 2 | Projects page with all states |
| 35-50 | Story 3 | InspirationForm + display |
| 50-65 | Story 7 | AI service + integration |
| 65-72 | Testing | All tests pass, smoke test |
| 72-75 | Wrap-up | Demo + explain improvements |

---

## 🧪 Minimum Tests Required

You should write at least **3-4 test files**:

1. ✅ `EmptyState.test.jsx` - Props, actions, rendering
2. ✅ `ProjectForm.test.jsx` - Validation, submit, error clearing
3. ✅ `InspirationForm.test.jsx` - URL validation, form submission
4. ✅ `aiService.test.ts` - Mock API, success/error cases

---

## 🤖 AI Feature Setup (Optional but Recommended)

The AI bonus uses **Ollama with TinyLlama**:

```bash
# Pull and run Ollama
docker pull ollama/ollama
docker run -d -v ~/ollama:/root/.ollama -p 11434:11434 --name ollama ollama/ollama

# Install TinyLlama model
docker exec -it ollama ollama run tinyllama

# Test it
curl --location 'http://localhost:11434/api/generate' \
  --header 'Content-Type: application/json' \
  --data '{"model": "tinyllama","prompt": "test", "stream": false}'
```

**Note:** Ollama is currently **not running** on your system. Start it before practicing Story 7!

---

## 💡 Success Tips

### ✅ DO:
- **Follow the checklist** - it keeps you on track
- **Use the templates** - they save 10-15 minutes
- **Talk out loud** - narrate your decisions
- **Write tests as you go** - don't save for end
- **Build reusable components** - LoadingSpinner, ErrorState, etc.
- **Handle edge cases** - empty lists, errors, loading

### ❌ DON'T:
- Don't try to finish all 7 stories - nobody does
- Don't spend time on perfect styling
- Don't skip tests to "save time"
- Don't code in silence
- Don't get stuck - adjust scope and explain

---

## 📊 What Interviewers Are Looking For

1. **Prioritization** - Did you pick the right stories?
2. **Code Quality** - Clean, maintainable, DRY
3. **Testing** - Meaningful tests, not just coverage
4. **Error Handling** - Loading/error/empty states everywhere
5. **Communication** - Explaining decisions and tradeoffs
6. **Time Management** - Shipping features vs perfect code

---

## 🎬 Practice Routine

### Before Each Run:
1. Run `./practice-setup.sh`
2. Clear IndexedDB (DevTools → Application → Delete database)
3. Set **75-minute timer**
4. Open `PRACTICE_CHECKLIST.md`

### During Run:
- Follow checklist minute-by-minute
- Talk out loud as you code
- Check time at each phase marker
- Run tests frequently

### After Run:
- Record what you completed
- Note what slowed you down
- Review talking points
- Repeat 2-3 times total

---

## 🆘 If Things Go Wrong

### Running out of time?
- **At 60 min:** Skip AI tests, just implement function
- **At 70 min:** Stop coding, run final tests
- **At 73 min:** Prepare 2-minute wrap-up

### Tests failing?
```bash
npm test -- --clearCache
npm test -- --verbose
npm test ProjectForm  # Run specific test
```

### Ollama not working?
- Skip Story 7 and explain the approach verbally
- Or hard-code a mock response: `return "AI-generated caption"`

---

## 📁 Files You'll Create

During 75 minutes, you'll create approximately **10-12 new files**:

```
✅ Components (8 files):
   - LoadingSpinner.jsx + .module.css
   - ErrorState.jsx + .module.css
   - EmptyState.jsx + .module.css
   - ProjectForm.jsx + .module.css
   - ProjectCard.jsx + .module.css
   - InspirationForm.jsx + .module.css
   - InspirationCard.jsx + .module.css

✅ Tests (4 files):
   - EmptyState.test.jsx
   - ProjectForm.test.jsx
   - InspirationForm.test.jsx
   - aiService.test.ts

✅ Services (1 file):
   - aiService.ts

🔧 Modified (2 files):
   - pages/Projects.jsx
   - pages/ProjectDetail.jsx
```

---

## 🎉 You're All Set!

Everything you need is ready:

1. ✅ **Practice plan** with all 6 stories + AI bonus
2. ✅ **Code templates** to speed up your practice
3. ✅ **Checklist** with minute-by-minute timeline
4. ✅ **Talking points** for communication
5. ✅ **Setup script** for quick environment prep

---

## 🚀 Start Your First Practice Now

```bash
# Setup (2 minutes)
./practice-setup.sh
npm run dev
npm test -- --watch  # In another terminal

# Practice (75 minutes)
# Open: PRACTICE_CHECKLIST.md
# Set: 75-minute timer
# Go! 🏃‍♂️
```

---

## 📞 Quick Reference

| Command | Purpose |
|---------|---------|
| `npm run dev` | Start dev server (localhost:5173) |
| `npm test` | Run all tests once |
| `npm test -- --watch` | Run tests in watch mode |
| `./practice-setup.sh` | Check environment setup |

---

## 🎯 Final Reminders

- **Communication is 50% of the score** - talk through your decisions
- **Nobody finishes all 7 stories** - focus on quality over quantity
- **Tests matter** - they show your engineering mindset
- **Edge cases matter** - loading/error/empty states everywhere
- **Practice 2-3 times** to build muscle memory

---

**Good luck! 🍀 You've got this!**

Questions? Check:
- `PRACTICE_README.md` - Full overview
- `TALKING_POINTS.md` - Interview questions & answers
- `PRACTICE_TEMPLATES.md` - Code examples
