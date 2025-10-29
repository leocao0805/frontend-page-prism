# 🎯 Visual Practice Flow

## 📊 75-Minute Timeline Visualization

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                     INTUIT FRONTEND CRAFT DEMO TIMELINE                      │
│                              (75 Minutes Total)                              │
└─────────────────────────────────────────────────────────────────────────────┘

┌───────────┐
│  0-5 min  │  📋 PLANNING & COMMUNICATION
└───────────┘  
    ↓
    • Read all 7 user stories
    • State your prioritization plan OUT LOUD:
      "I'll build Stories 1, 2, 3, 6 first (core CRUD + robust UX)"
      "Then Story 7 (AI) if time permits"
      "Stories 4 & 5 are lower priority"
    • Outline your approach
    
    ✅ Checkpoint: You should sound confident and organized

┌───────────┐
│  5-15 min │  🏗️ FOUNDATION - Story 6 (Build Reusable Components FIRST!)
└───────────┘
    ↓
    • Create LoadingSpinner.jsx + .module.css
    • Create ErrorState.jsx + .module.css
    • Create EmptyState.jsx + .module.css
    • Write EmptyState.test.jsx
    • Run: npm test EmptyState
    
    ✅ Checkpoint: 3 components + 1 test passing (~10 min)

┌───────────┐
│ 15-25 min │  📝 STORY 1 - Create Project
└───────────┘
    ↓
    • Create ProjectForm.jsx + .module.css
    • Add form validation (name required)
    • Create ProjectForm.test.jsx (3 tests minimum):
      1. Show validation error when name empty
      2. Submit with valid data
      3. Clear error when typing
    • Run: npm test ProjectForm
    
    ✅ Checkpoint: Working form with tests (~10 min)

┌───────────┐
│ 25-35 min │  📋 STORY 2 - List Projects with All States
└───────────┘
    ↓
    • Create ProjectCard.jsx + .module.css
    • Update Projects.jsx:
      - Add isLoading state → show LoadingSpinner
      - Add error state → show ErrorState with retry
      - Add empty state → show EmptyState with CTA
      - Map projects to ProjectCard components
    • Manual test in browser
    
    ✅ Checkpoint: Can create & list projects (~10 min)

┌───────────┐
│ 35-50 min │  🖼️ STORY 3 - Add Inspiration to Project
└───────────┘
    ↓
    • Create InspirationForm.jsx + .module.css
      - URL field with validation
      - Notes textarea
      - Placeholder "Generate Caption" button
    • Create InspirationCard.jsx + .module.css
    • Update ProjectDetail.jsx:
      - Fetch inspirations on mount
      - Add form to create inspiration
      - Display inspirations with InspirationCard
      - Add empty state when no inspirations
    • Manual test in browser
    
    ✅ Checkpoint: Can add inspirations to a project (~15 min)

┌───────────┐
│ 50-65 min │  🤖 STORY 7 - AI Bonus Feature
└───────────┘
    ↓
    • Create aiService.ts:
      - generateCaption(url) function
      - POST to http://localhost:11434/api/generate
      - Handle errors
    • Create aiService.test.ts (mock fetch):
      - Test successful response
      - Test API error (500)
      - Test network error
    • Update InspirationForm.jsx:
      - Import generateCaption
      - Add isGenerating state
      - Implement handleGenerateCaption
      - Update button state
    • Manual test: click "Generate Caption"
    
    ✅ Checkpoint: AI caption populates notes field (~15 min)

┌───────────┐
│ 65-72 min │  🧪 FINAL TESTING & SMOKE TEST
└───────────┘
    ↓
    • Run: npm test (all tests should pass)
    • Fix any failing tests
    • Quick smoke test in browser:
      ✓ Create project works
      ✓ List projects works (with states)
      ✓ Add inspiration works
      ✓ Generate AI caption works
      ✓ All loading/error/empty states visible
    
    ✅ Checkpoint: Everything works end-to-end (~7 min)

┌───────────┐
│ 72-75 min │  🎤 WRAP-UP & SUMMARY
└───────────┘
    ↓
    • Prepare 2-minute summary:
      1. What I Built (30 sec):
         "Stories 1, 2, 3, 6, 7 complete"
         "Reusable state components"
         "AI caption generation"
         "X passing tests"
      
      2. What I'd Improve (30 sec):
         "Add edit/delete (Story 4)"
         "Add search/filter (Story 5)"
         "Better accessibility"
         "More comprehensive tests"
      
      3. Architecture Decisions (30 sec):
         "Separation of concerns"
         "Reusable components"
         "Service layer for data"
      
      4. Demo (30 sec):
         Show working app in browser
    
    ✅ Checkpoint: Clear, confident summary

```

---

## 🎯 Priority Matrix

```
┌─────────────────────────────────────────────────────────────┐
│                  STORY PRIORITIZATION                        │
└─────────────────────────────────────────────────────────────┘

HIGH PRIORITY (Must Build)          MEDIUM PRIORITY (If Time)
┌─────────────────────────────┐    ┌─────────────────────────┐
│ ✅ Story 6: State Components │    │ ⚠️  Story 4: Edit/Delete│
│    - LoadingSpinner          │    │    - Edit inspiration   │
│    - ErrorState              │    │    - Delete inspiration │
│    - EmptyState              │    │    - Confirmation modal │
│                              │    │                         │
│ ✅ Story 1: Create Project   │    │ ⚠️  Story 5: Search     │
│    - Form with validation    │    │    - Filter by keyword  │
│    - Error handling          │    │    - Sort by date       │
│                              │    │    - Debounced input    │
│ ✅ Story 2: List Projects    │    └─────────────────────────┘
│    - Grid layout             │
│    - All states              │    BONUS (If 15+ min left)
│                              │    ┌─────────────────────────┐
│ ✅ Story 3: Add Inspiration  │    │ 🤖 Story 7: AI Feature  │
│    - Form with URL validation│    │    - Call Ollama API    │
│    - Display in project      │    │    - Generate caption   │
│    - Empty state             │    │    - Handle errors      │
└─────────────────────────────┘    └─────────────────────────┘

              ⬇️                              ⬇️
    Build these in 50 min          Build these if 25+ min left
```

---

## 🧩 Component Dependency Tree

```
┌─────────────────────────────────────────────────────────────┐
│                  COMPONENT ARCHITECTURE                      │
└─────────────────────────────────────────────────────────────┘

App
 │
 ├─ AppLayout
 │   └─ Navbar (already exists)
 │
 └─ Routes
     │
     ├─ Projects Page
     │   │
     │   ├─ LoadingSpinner ✨ (Story 6)
     │   ├─ ErrorState ✨ (Story 6)
     │   ├─ EmptyState ✨ (Story 6)
     │   │
     │   ├─ ProjectForm ✨ (Story 1)
     │   │   └─ Button (already exists)
     │   │
     │   └─ ProjectCard ✨ (Story 2)
     │       └─ Link (react-router-dom)
     │
     └─ ProjectDetail Page
         │
         ├─ LoadingSpinner ✨ (Story 6)
         ├─ ErrorState ✨ (Story 6)
         ├─ EmptyState ✨ (Story 6)
         │
         ├─ InspirationForm ✨ (Story 3 + 7)
         │   ├─ Button (already exists)
         │   └─ aiService.ts 🤖 (Story 7)
         │       └─ Ollama API
         │
         └─ InspirationCard ✨ (Story 3)
             └─ [Edit/Delete buttons] ⚠️ (Story 4, if time)

✨ = You will create
🤖 = AI feature
⚠️  = Lower priority
```

---

## 📊 Test Coverage Strategy

```
┌─────────────────────────────────────────────────────────────┐
│                    TESTING PRIORITIES                        │
└─────────────────────────────────────────────────────────────┘

MUST WRITE (15-20 min total)
┌─────────────────────────────────────────────────────────────┐
│ 1. EmptyState.test.jsx (3-4 tests, ~3 min)                  │
│    ✓ Renders with default props                             │
│    ✓ Renders with custom title/message                      │
│    ✓ Calls onAction when button clicked                     │
│    ✓ Doesn't render button when action missing              │
│                                                              │
│ 2. ProjectForm.test.jsx (3-4 tests, ~5 min)                 │
│    ✓ Shows validation error when name empty                 │
│    ✓ Submits form with valid data                           │
│    ✓ Clears error when user types                           │
│    ✓ Calls onCancel when cancel clicked                     │
│                                                              │
│ 3. InspirationForm.test.jsx (2-3 tests, ~4 min)             │
│    ✓ Shows validation error for invalid URL                 │
│    ✓ Submits form with valid data                           │
│    ✓ Generate button disabled when no URL                   │
│                                                              │
│ 4. aiService.test.ts (3 tests, ~4 min)                      │
│    ✓ Returns AI response on success                         │
│    ✓ Throws error when API fails (500)                      │
│    ✓ Throws error on network failure                        │
└─────────────────────────────────────────────────────────────┘

NICE TO HAVE (If time allows)
┌─────────────────────────────────────────────────────────────┐
│ • LoadingSpinner.test.jsx                                    │
│ • ErrorState.test.jsx                                        │
│ • ProjectCard.test.jsx                                       │
│ • Integration tests (full flows)                             │
└─────────────────────────────────────────────────────────────┘
```

---

## 🎤 Communication Checkpoints

```
┌─────────────────────────────────────────────────────────────┐
│              WHAT TO SAY AND WHEN                            │
└─────────────────────────────────────────────────────────────┘

At 0 min (Before coding):
💬 "Here's my plan: I'll build Stories 1, 2, 3, 6 first for core 
    CRUD and robust UX. Then Story 7 (AI) if time allows. I'm 
    starting with reusable state components because they'll be 
    used everywhere."

At 15 min (Finishing state components):
💬 "I've created LoadingSpinner, ErrorState, and EmptyState with 
    tests. These are reusable across the app. Now moving to the 
    ProjectForm with validation."

At 35 min (Finishing Story 2):
💬 "Projects page is done with all states. Users can create 
    projects and see them in a grid. Empty, loading, and error 
    states are all handled. Now adding inspirations."

At 50 min (Finishing Story 3):
💬 "Users can now add inspirations to projects. The form validates 
    URLs and saves to IndexedDB. Moving to the AI bonus feature."

At 65 min (Finishing AI):
💬 "AI integration is working. When users click 'Generate Caption', 
    it calls the Ollama API and populates the notes field. They 
    can still edit before saving."

At 73 min (Final testing done):
💬 "All tests pass. Let me do a quick demo... [Shows working app]. 
    With more time I'd add edit/delete and search/filter. Happy 
    to answer questions!"
```

---

## 🆘 Emergency Scope Adjustments

```
┌─────────────────────────────────────────────────────────────┐
│           IF YOU'RE RUNNING BEHIND SCHEDULE                  │
└─────────────────────────────────────────────────────────────┘

AT 40 MIN - Still on Story 2?
❌ Skip: Fancy styling on ProjectCard
✅ Focus: Get working list with all states
💬 Say: "I'm prioritizing functionality over pixel-perfect design"

AT 50 MIN - Haven't started Story 3?
❌ Skip: InspirationCard styling
✅ Focus: Basic form that saves to DB
💬 Say: "I'm doing a minimal implementation to stay on track"

AT 60 MIN - Haven't started AI?
❌ Skip: AI tests (just implement function)
✅ Focus: Get AI call working with basic error handling
💬 Say: "I'm skipping tests for AI to deliver the feature"

AT 70 MIN - Tests failing?
❌ Skip: Fixing flaky tests
✅ Focus: Fix 1 critical test, comment out others
💬 Say: "These tests need more debugging time; I'd prioritize 
        this in a real sprint"

AT 73 MIN - Still coding?
❌ STOP CODING IMMEDIATELY
✅ Focus: Prepare your 2-minute summary
💬 Say: "Let me show you what I built and explain my approach"
```

---

## ✅ Success Indicators

```
You're on track if you can check these boxes:

□ At 20 min: State components built + 1 test passing
□ At 40 min: Can create and list projects in browser
□ At 60 min: Can add inspirations to a project
□ At 73 min: AI feature works (or explained why deferred)
□ At 75 min: Can demo working features
□ Throughout: Explained decisions out loud
□ Throughout: All committed code has no syntax errors
□ Throughout: Tests run without crashing
```

---

## 🎯 Final Reminders

```
┌─────────────────────────────────────────────────────────────┐
│                    GOLDEN RULES                              │
└─────────────────────────────────────────────────────────────┘

1. 🗣️  COMMUNICATE - Talk through your decisions
2. ⏱️  MANAGE TIME - Check the clock every 15 min
3. 🎯 PRIORITIZE - Core features > polish
4. 🧪 TEST EARLY - Don't save tests for the end
5. 🚫 DON'T PANIC - Adjust scope if needed
6. 💬 EXPLAIN GAPS - "With more time, I would..."
7. ✅ DEMO PROUDLY - Show what works, not what doesn't

Remember: Nobody finishes all 7 stories. The goal is to show
your process, prioritization, and communication skills.
```

---

**Print this page and keep it next to you during practice!** 📄
