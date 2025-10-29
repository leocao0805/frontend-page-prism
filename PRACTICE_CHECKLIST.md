# ✅ 75-Minute Practice Checklist

Print this and use it during your timed practice sessions!

---

## 🎯 Before You Start (5 minutes)

- [ ] Set a **75-minute timer**
- [ ] Open `PRACTICE_PLAN.md` and `PRACTICE_TEMPLATES.md`
- [ ] Start dev server: `npm run dev`
- [ ] Start test watcher (separate terminal): `npm test -- --watch`
- [ ] Open browser to `http://localhost:5173`
- [ ] (Optional) Start Ollama for AI bonus: `docker exec -it ollama ollama run tinyllama`

---

## 📋 Phase 1: Read & Plan (5-7 min) - Time: 0:00 → 0:07

- [ ] **Read all 7 user stories** in `PRACTICE_PLAN.md`
- [ ] **State your prioritization out loud:**
  - "I'll build Stories 1, 2, 3, 6 (core CRUD + robust states)"
  - "Then Story 7 (AI) if time allows"
  - "Stories 4 & 5 are lower priority"
- [ ] **Explain your approach:**
  - "I'll create reusable state components first"
  - "Then CRUD for projects, then inspirations"
  - "I'll write tests as I go"

**Time Check:** Should be at **~7 minutes** when you start coding

---

## 🏗️ Phase 2: Build Foundation (10-12 min) - Time: 0:07 → 0:19

### Story 6: State Components (Build these FIRST!)

- [ ] Create `src/components/LoadingSpinner.jsx` + `.module.css`
- [ ] Create `src/components/ErrorState.jsx` + `.module.css`
- [ ] Create `src/components/EmptyState.jsx` + `.module.css`
- [ ] Create `src/components/EmptyState.test.jsx`
- [ ] Run test: `npm test EmptyState` → Should pass ✅

**Time Check:** Should be at **~19 minutes** when foundation is done

---

## 📝 Phase 3: Story 1 - Create Project (10-12 min) - Time: 0:19 → 0:31

- [ ] Create `src/components/ProjectForm.jsx` + `.module.css`
- [ ] Add form validation (name required)
- [ ] Create `src/components/ProjectForm.test.jsx`
  - [ ] Test: validation error when name empty
  - [ ] Test: successful submit with valid data
  - [ ] Test: error clears when typing
- [ ] Verify tests pass ✅

**Time Check:** Should be at **~31 minutes** when Story 1 is done

---

## 📋 Phase 4: Story 2 - List Projects (10-12 min) - Time: 0:31 → 0:43

- [ ] Create `src/components/ProjectCard.jsx` + `.module.css`
- [ ] Update `src/pages/Projects.jsx`:
  - [ ] Add loading state (`isLoading`)
  - [ ] Add error state with retry (`error`, `fetchProjects`)
  - [ ] Add empty state when `projects.length === 0`
  - [ ] Add grid layout for ProjectCard components
  - [ ] Add "Create Project" button that shows form
- [ ] **Manual test in browser:**
  - [ ] Empty state shows on first load
  - [ ] Can create a project
  - [ ] Project appears in list
  - [ ] Can click project to navigate to detail page

**Time Check:** Should be at **~43 minutes** when Story 2 is done

---

## 🖼️ Phase 5: Story 3 - Create Inspiration (12-15 min) - Time: 0:43 → 0:58

- [ ] Create `src/components/InspirationForm.jsx` + `.module.css`
  - [ ] URL field with validation
  - [ ] Notes textarea
  - [ ] "Generate Caption" button (placeholder for now)
- [ ] Create `src/components/InspirationCard.jsx` + `.module.css`
  - [ ] Display URL, notes, date
- [ ] Update `src/pages/ProjectDetail.jsx`:
  - [ ] Import `getInspirationsByProject`, `createInspiration`
  - [ ] Add state for inspirations
  - [ ] Fetch inspirations on mount
  - [ ] Add form to create inspiration
  - [ ] Display inspirations using InspirationCard
  - [ ] Add empty state when no inspirations
- [ ] **Manual test in browser:**
  - [ ] Can add inspiration to a project
  - [ ] Inspiration appears in list
  - [ ] Empty state shows when no inspirations

**Time Check:** Should be at **~58 minutes** when Story 3 is done

---

## 🤖 Phase 6: Story 7 - AI Bonus (12-15 min) - Time: 0:58 → 1:13

- [ ] Create `src/services/aiService.ts`
  - [ ] `generateCaption(url: string)` function
  - [ ] POST to `http://localhost:11434/api/generate`
  - [ ] Return generated text
- [ ] Create `src/services/aiService.test.ts`
  - [ ] Mock fetch
  - [ ] Test successful response
  - [ ] Test error handling
- [ ] Update `src/components/InspirationForm.jsx`:
  - [ ] Import `generateCaption` from aiService
  - [ ] Add `isGenerating` state
  - [ ] Implement `handleGenerateCaption`:
    ```javascript
    const caption = await generateCaption(formData.url)
    setFormData(prev => ({ ...prev, notes: caption }))
    ```
  - [ ] Update button: `{isGenerating ? 'Generating...' : '🤖 Generate'}`
- [ ] **Manual test in browser:**
  - [ ] Enter a URL
  - [ ] Click "Generate Caption"
  - [ ] AI text appears in notes field
  - [ ] Can edit AI text before saving

**Time Check:** Should be at **~1:13** (73 min) when AI is done

---

## 🧪 Phase 7: Final Testing (5 min) - Time: 1:13 → 1:18

- [ ] Run all tests: `npm test`
- [ ] Fix any failing tests
- [ ] Quick smoke test in browser:
  - [ ] Create project → works ✅
  - [ ] List projects → works ✅
  - [ ] Add inspiration → works ✅
  - [ ] Generate AI caption → works ✅
  - [ ] All loading/error/empty states visible → works ✅

**Time Check:** Should be at **~1:18** (78 min)

---

## 🎤 Phase 8: Wrap-up (2 min) - Time: 1:18 → 1:20

**Prepare your summary:**

### ✅ What I Built (30 seconds)
- "I implemented Stories 1, 2, 3, 6, and 7"
- "Created reusable state components (loading, error, empty)"
- "Full CRUD for projects and inspirations"
- "AI caption generation using Ollama"
- "4 test files with X passing tests"

### 🚀 What I'd Improve With More Time (30 seconds)
- "Add edit/delete for inspirations (Story 4)"
- "Add search/filter by date (Story 5)"
- "Improve error handling with toast notifications"
- "Add optimistic UI updates"
- "Accessibility: keyboard navigation, ARIA labels"
- "Screenshot preview in InspirationCard"
- "Debounced search for better UX"

### 🏗️ Architecture Decisions (30 seconds)
- "Used IndexedDB for offline-first experience"
- "CSS Modules for scoped styling"
- "Reusable components for consistency"
- "Service layer for data operations"
- "Mock latency to simulate real API calls"

### 🧪 Testing Strategy (30 seconds)
- "Unit tests for forms (validation, submit)"
- "Component tests for edge cases"
- "Mocked AI service to avoid test flakiness"
- "Would add integration tests for full flows with more time"

---

## 📊 Success Metrics

**You're on track if:**
- ✅ At 20 min: State components done + 1 test passing
- ✅ At 40 min: Stories 1 & 2 working in browser
- ✅ At 60 min: Story 3 working, can add inspirations
- ✅ At 73 min: AI feature working
- ✅ At 75 min: All tests pass, can demo

**Don't worry if:**
- ❌ You didn't finish Stories 4 & 5 (they're lower priority)
- ❌ UI isn't perfectly styled (functionality > beauty)
- ❌ Some edge cases aren't handled (mention in wrap-up)

---

## 🎯 Interviewer Impression Points

During your practice, score yourself on these:

- [ ] **Clear Communication:** Did I explain my plan clearly?
- [ ] **Prioritization:** Did I pick the right stories for 75 min?
- [ ] **Code Quality:** Are components clean and well-named?
- [ ] **Testing:** Did I write meaningful tests (not just coverage)?
- [ ] **Error Handling:** Did I add loading/error states everywhere?
- [ ] **Time Management:** Did I ship working features vs perfect code?
- [ ] **Realistic Scope:** Did I acknowledge what I'd defer?

---

## 🔄 After Practice

- [ ] **Record your time** for each phase
- [ ] **Note what slowed you down** (debugging? styling? tests?)
- [ ] **List what you'd do differently** next time
- [ ] **Repeat** until you can comfortably finish Stories 1-3, 6-7 in 75 min

---

## 🆘 Emergency Quick Wins (if running out of time)

**If you're at 60 minutes and haven't started AI:**
1. Skip AI tests, just implement the function
2. Hard-code a response for demo purposes
3. Explain: "In production, I'd add proper error handling and tests"

**If you're at 70 minutes and tests are failing:**
1. Focus on fixing ONE critical test
2. Comment out flaky tests
3. Explain: "These tests need more time to stabilize"

**If you're at 73 minutes:**
1. STOP coding
2. Run `npm test` one last time
3. Prepare your 2-minute summary

---

## 📞 Quick Reference Commands

```bash
# Start dev server
npm run dev

# Run tests (watch mode)
npm test -- --watch

# Run specific test
npm test ProjectForm

# Check for errors
npm run lint

# Start Ollama (for AI)
docker exec -it ollama ollama run tinyllama

# Test AI API
curl --location 'http://localhost:11434/api/generate' \
  --header 'Content-Type: application/json' \
  --data '{"model": "tinyllama","prompt": "test", "stream": false}'
```

---

**Good luck! Remember: It's okay not to finish everything. Show your process, prioritize well, and communicate clearly.** 🚀
