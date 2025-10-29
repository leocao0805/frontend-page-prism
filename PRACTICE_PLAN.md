# 🎯 Intuit Frontend Craft Demo - Practice Plan

## ⏱️ Time: 75 minutes total

Based on real candidate experiences, you'll be given **6 user stories + 1 AI bonus** to implement. You won't complete all of them—the goal is to show **prioritization, code quality, testing, and communication**.

---

## 📋 The 6 User Stories + 1 AI Bonus

### **Story 1: Create a New Project** ✅ (Priority: HIGH)
**As a user, I want to create a new "Project" with a name and description so that I can group my design inspirations.**

**Acceptance Criteria:**
- [ ] Form with name and description fields
- [ ] Validation: name is required, description optional
- [ ] On submit, save to IndexedDB and update UI
- [ ] Show success feedback
- [ ] Handle errors gracefully

**Files to modify/create:**
- `src/pages/Projects.jsx` (add form)
- `src/components/ProjectForm.jsx` (new component)
- `src/components/ProjectForm.test.jsx` (tests)

---

### **Story 2: List All Projects** ✅ (Priority: HIGH)
**As a user, I want to see a list of all my projects (with name, description, and date) so that I can pick one to view.**

**Acceptance Criteria:**
- [ ] Display projects in a grid/list with name, description, createdAt
- [ ] Show empty state when no projects exist
- [ ] Show loading state while fetching
- [ ] Each project is clickable and navigates to detail page

**Files to modify:**
- `src/pages/Projects.jsx` (add empty & loading states)
- `src/components/ProjectCard.jsx` (new component)
- `src/components/EmptyState.jsx` (new reusable component)

---

### **Story 3: Create and Attach an Inspiration** ✅ (Priority: HIGH)
**As a user, I want to create and attach an "Inspiration" (screenshot URL + notes) to a project so that I capture a design I like.**

**Acceptance Criteria:**
- [ ] Form to add inspiration with URL and notes fields
- [ ] Save to IndexedDB with projectId reference
- [ ] Display inspiration in project detail page
- [ ] Show screenshot thumbnail if URL is valid
- [ ] Handle errors (invalid URL, network issues)

**Files to modify/create:**
- `src/pages/ProjectDetail.jsx` (add form & list)
- `src/components/InspirationForm.jsx` (new component)
- `src/components/InspirationCard.jsx` (new component)
- Tests for both components

---

### **Story 4: Edit and Delete Inspiration** ⚠️ (Priority: MEDIUM)
**As a user, I want to edit and delete an existing Inspiration so that I can keep my list current.**

**Acceptance Criteria:**
- [ ] Edit button opens form pre-filled with current data
- [ ] Delete button with confirmation modal
- [ ] Update IndexedDB and UI on success
- [ ] Handle errors gracefully

**Files to modify/create:**
- `src/components/InspirationCard.jsx` (add edit/delete buttons)
- `src/components/ConfirmDialog.jsx` (new reusable modal)
- `src/hooks/useInspirations.jsx` (custom hook for CRUD)

---

### **Story 5: Search/Filter Inspirations** ⚠️ (Priority: MEDIUM)
**As a user, I want to search or filter inspirations within a project (by keyword or date) so that I can quickly find what I'm looking for.**

**Acceptance Criteria:**
- [ ] Search input that filters by notes or URL
- [ ] Date filter (newest/oldest first)
- [ ] Filter updates list in real-time
- [ ] Show "no results" state when search returns nothing

**Files to modify/create:**
- `src/pages/ProjectDetail.jsx` (add search/filter UI)
- `src/components/SearchBar.jsx` (new component)
- `src/utils/filterUtils.js` (helper functions)
- `src/utils/filterUtils.test.js` (tests)

---

### **Story 6: Loading, Error, and Empty States** ✅ (Priority: HIGH)
**As a user, I want to see proper loading, error, and empty states so that the UI feels robust and ready for production.**

**Acceptance Criteria:**
- [ ] Loading spinner/skeleton while data is fetching
- [ ] Error message with retry button when fetch fails
- [ ] Empty state with helpful message and CTA
- [ ] These states should be reusable across the app

**Files to create:**
- `src/components/LoadingSpinner.jsx`
- `src/components/ErrorState.jsx`
- `src/components/EmptyState.jsx`
- Apply to `Projects.jsx` and `ProjectDetail.jsx`

---

### **Story 7 (AI BONUS): Auto-Generate Caption with AI** 🤖 (Priority: BONUS)
**As a user, I want the app to automatically generate a caption or tags for a screenshot using AI so that I can save time.**

**Acceptance Criteria:**
- [ ] "Generate Caption" button in InspirationForm
- [ ] Calls local LLM API (tinyllama on localhost:11434)
- [ ] Displays loading state while AI processes
- [ ] Populates notes field with AI-generated text
- [ ] User can edit the generated text before saving
- [ ] Gracefully handles AI API errors

**Files to modify/create:**
- `src/services/aiService.ts` (new - calls Ollama API)
- `src/components/InspirationForm.jsx` (add AI button)
- Mock the API call in tests

**API Example:**
```javascript
// POST to http://localhost:11434/api/generate
{
  "model": "tinyllama",
  "prompt": "Generate a short caption for this design inspiration from: <URL>",
  "stream": false
}
```

---

## 🎯 Recommended 75-Minute Strategy

### **Phase 1: Planning & Communication (5-7 min)**
1. **Read all stories** and ask clarifying questions
2. **State your prioritization** out loud:
   - "I'll prioritize Stories 1, 2, 3, and 6 first (CRUD + robust UX)"
   - "Then Story 7 (AI bonus) if time permits"
   - "Stories 4 and 5 are lower priority for this timebox"
3. **Outline your approach:**
   - "I'll build reusable components (forms, states) first"
   - "I'll write tests alongside features"
   - "I'll ensure loading/error/empty states are handled"

### **Phase 2: Core CRUD Implementation (40-45 min)**
**Focus on Stories 1, 2, 3, 6**

**Time breakdown:**
- ✅ **Story 6 components first** (10 min): Create `LoadingSpinner`, `ErrorState`, `EmptyState`
- ✅ **Story 1** (10 min): Project creation form with validation
- ✅ **Story 2** (10 min): Project list with states
- ✅ **Story 3** (15 min): Inspiration form and display

**Key deliverables:**
- Working create project flow
- Project list with empty/loading/error states
- Add inspiration to project
- At least 2-3 component tests

### **Phase 3: AI Bonus Feature (15-20 min)**
**Focus on Story 7**

1. Create `aiService.ts` with Ollama API integration (5 min)
2. Add "Generate Caption" button to `InspirationForm` (5 min)
3. Handle loading/error states for AI call (5 min)
4. Quick manual test (5 min)

### **Phase 4: Testing & Wrap-up (8-10 min)**
1. Run `npm test` and fix any broken tests
2. Quick smoke test in browser
3. **Summarize what you built** and what you'd do with more time

---

## 🧪 Testing Strategy

**Minimum tests to write:**
- ✅ `ProjectForm.test.jsx` - form validation, submit handler
- ✅ `EmptyState.test.jsx` - renders correct message
- ✅ `InspirationForm.test.jsx` - form validation
- ✅ `aiService.test.ts` - mock API calls

**Testing patterns:**
```javascript
import { render, screen, fireEvent } from '@testing-library/react'
import ProjectForm from './ProjectForm'

test('shows validation error when name is empty', () => {
  render(<ProjectForm onSubmit={jest.fn()} />)
  fireEvent.click(screen.getByText('Create Project'))
  expect(screen.getByText(/name is required/i)).toBeInTheDocument()
})
```

---

## 💡 Talking Points for Interviewers

**When starting:**
> "I'll focus on Stories 1, 2, 3, and 6 first since they provide the core user value. Story 6 (loading/error states) is critical for production-readiness. If time allows, I'll implement the AI bonus feature since it demonstrates integration with external APIs."

**During coding:**
> "I'm creating reusable components like `EmptyState` so they can be used across multiple pages."

> "I'm adding PropTypes/TypeScript validation to catch errors early."

**If running out of time:**
> "I'm prioritizing the happy path first, then I'll add error handling."

**When wrapping up:**
> "With more time, I'd add:
> - More comprehensive tests (integration tests for full flows)
> - Accessibility features (ARIA labels, keyboard navigation)
> - Optimistic UI updates for better UX
> - Debounced search for Story 5
> - Skeleton loaders instead of spinners"

---

## 📁 File Structure You'll Create

```
src/
├── components/
│   ├── ProjectForm.jsx          ✅ NEW (Story 1)
│   ├── ProjectForm.test.jsx     ✅ NEW
│   ├── ProjectCard.jsx          ✅ NEW (Story 2)
│   ├── InspirationForm.jsx      ✅ NEW (Story 3)
│   ├── InspirationForm.test.jsx ✅ NEW
│   ├── InspirationCard.jsx      ✅ NEW (Story 3)
│   ├── LoadingSpinner.jsx       ✅ NEW (Story 6)
│   ├── ErrorState.jsx           ✅ NEW (Story 6)
│   ├── EmptyState.jsx           ✅ NEW (Story 6)
│   ├── EmptyState.test.jsx      ✅ NEW
│   ├── ConfirmDialog.jsx        ⚠️  NEW (Story 4, if time)
│   └── SearchBar.jsx            ⚠️  NEW (Story 5, if time)
├── services/
│   ├── aiService.ts             🤖 NEW (Story 7)
│   └── aiService.test.ts        🤖 NEW
├── hooks/
│   └── useInspirations.jsx      ⚠️  NEW (Story 4, if time)
├── utils/
│   ├── filterUtils.js           ⚠️  NEW (Story 5, if time)
│   └── filterUtils.test.js      ⚠️  NEW
└── pages/
    ├── Projects.jsx             🔧 MODIFY (Stories 1, 2, 6)
    └── ProjectDetail.jsx        🔧 MODIFY (Stories 3, 6)
```

---

## 🚀 Quick Start Commands

```bash
# Start dev server
npm run dev

# Run tests in watch mode (in another terminal)
npm test -- --watch

# Start Ollama for AI feature
docker run -it -v ~/ollama:/root/.ollama -p 11434:11434 --name ollama ollama/ollama
docker exec -it ollama ollama run tinyllama

# Test AI API
curl --location 'http://localhost:11434/api/generate' \
  --header 'Content-Type: application/json' \
  --data '{"model": "tinyllama","prompt": "Generate a caption", "stream": false}'
```

---

## ✅ Success Criteria

**What interviewers are looking for:**

1. **Prioritization** - Did you pick the right stories for 75 min?
2. **Code Quality** - Clean, readable, well-structured components
3. **Tests** - At least 3-4 meaningful tests
4. **Error Handling** - Loading/error/empty states everywhere
5. **Communication** - Explaining your approach and tradeoffs
6. **AI Integration** - Bonus points if you nail the AI feature
7. **Time Management** - Shipped working features vs perfect code

**You DON'T need:**
- Perfect UI design (functional is fine)
- 100% test coverage
- All 7 stories completed
- Advanced animations or optimizations

**You DO need:**
- Working features that you can demo
- Evidence of testing mindset
- Robust error handling
- Clear explanations of your choices

---

## 🎬 Next Steps

1. **Read this plan thoroughly**
2. **Set a 75-minute timer**
3. **Simulate the interview:**
   - Read all stories (5 min)
   - State your plan out loud (as if to interviewer)
   - Code Stories 1, 2, 3, 6 first (40 min)
   - Add AI bonus (15 min)
   - Test and summarize (10 min)
4. **Record gaps** - What did you struggle with?
5. **Repeat** 2-3 times to build muscle memory

---

Good luck! 🍀 Remember: **Communication and prioritization are as important as code.** Talk through your approach, explain tradeoffs, and show you can ship features under time pressure.
