# 🎤 Sample Talking Points for Interview

Practice saying these out loud during your timed runs. Communication is 50% of the evaluation!

---

## 🚀 Opening (Minute 0-5: After reading stories)

### "Here's my plan..."

> "Thanks for sharing these stories. I've read through all 7, and here's how I'd approach this 75-minute timebox:
>
> **My priority:** I'll focus on Stories 1, 2, 3, and 6 first. These give us the core CRUD functionality and, critically, the loading, error, and empty states that make the UI feel production-ready. Story 6 is often overlooked but it's essential for a robust user experience.
>
> **Next priority:** Story 7, the AI bonus feature. If I have time after the core CRUD, I'll integrate the Ollama API to generate captions. This demonstrates working with external APIs and handling async operations.
>
> **Lower priority:** Stories 4 and 5 — edit/delete and search/filter. These are valuable but in a 75-minute window, I want to deliver working features over comprehensive ones. I can discuss how I'd implement these in the wrap-up.
>
> **My approach:** I'll start by building reusable state components — `LoadingSpinner`, `ErrorState`, `EmptyState` — because they'll be used across multiple features. Then I'll build the forms with validation, hook them up to IndexedDB, and write tests as I go.
>
> **Does that sound reasonable? Any questions before I start coding?**"

---

## 🏗️ During Coding (Narrate what you're doing)

### When creating LoadingSpinner (Minute 5-10)

> "I'm starting with the state components because they're going to be reused everywhere. This `LoadingSpinner` is a simple component that takes a message prop. I'm adding ARIA attributes for accessibility — `role='status'` and `aria-live='polite'` so screen readers announce loading states properly."

### When building ProjectForm (Minute 15-25)

> "Now I'm building the `ProjectForm`. I'm doing client-side validation first — checking that the name field isn't empty. I'm using controlled components so React manages the form state. Notice I'm clearing errors when the user starts typing again — better UX than persistent error messages.
>
> I'm also adding a `disabled` state while submitting to prevent double-clicks. In production, I might add debouncing for the validation, but for now, this covers the core use case."

### When updating Projects.jsx (Minute 25-35)

> "I'm updating the `Projects` page to use all three state components. When `isLoading` is true, we show the spinner. If there's an error, we show `ErrorState` with a retry button. If the array is empty, we show `EmptyState` with a call-to-action to create the first project.
>
> This pattern is important because users should never see a blank screen and wonder if something's broken. Every state should be explicit."

### When implementing AI feature (Minute 58-70)

> "Now I'm adding the AI integration. I'm creating a separate service module — `aiService.ts` — to keep the API logic separate from the component. This makes it easier to test and swap out if we change LLM providers later.
>
> I'm using `fetch` to POST to the Ollama API at localhost:11434. The prompt is asking the AI to generate a short caption based on the URL. I'm setting `stream: false` so we get the full response at once rather than streaming tokens.
>
> In the form, I'm adding an `isGenerating` state to show a loading indicator on the button. The user can still edit the AI-generated text before saving — we're using AI to augment, not replace, the user's input."

---

## 🧪 Testing Decisions

### When writing tests (Throughout)

> "I'm writing tests as I build each component. For `ProjectForm`, I'm testing three key scenarios:
> 1. Validation error when the name is empty
> 2. Successful submit with valid data  
> 3. Error clearing when the user starts typing
>
> These tests cover the core behavior without being brittle. I'm using React Testing Library's `screen` queries — preferring `getByLabelText` and `getByRole` because those queries reflect how users actually interact with the form, not implementation details."

### When mocking API calls

> "For the AI service tests, I'm mocking `fetch` because we don't want tests calling the real Ollama API — that'd be slow and flaky. I'm testing three scenarios: successful response, API error (500), and network error. This covers the happy path and the main failure modes."

---

## 🚧 Handling Roadblocks

### If something breaks (Example: test fails)

> "Hmm, this test is failing. Let me check the error message... Ah, I see — I forgot to wrap the component in a Router context since it uses `Link`. Let me add a test utility to wrap components in Router. [Fixes it] There we go. This is why I run tests frequently — catch issues early."

### If running low on time (Example: At 60 min, haven't started AI)

> "I'm at the 60-minute mark and I haven't started the AI feature yet. Let me adjust: I'll implement the core AI function and integrate it into the form, but I might skip the tests for that piece and explain my testing approach instead. The priority is to have a working demo."

### If you realize you made a mistake

> "Actually, I just realized I should be using the `createInspiration` service function instead of directly calling the DB. Let me refactor this quickly... [Fixes it] Good. This is more maintainable because all DB operations go through the service layer."

---

## 🎬 Wrap-up (Last 2 minutes)

### "Here's what I built..."

> "Alright, let me walk you through what I delivered:
>
> **Core Features:**
> - ✅ Story 1: Create projects with validation and error handling
> - ✅ Story 2: List all projects with proper loading, error, and empty states
> - ✅ Story 3: Add inspirations to projects with URL validation
> - ✅ Story 6: Reusable state components used across the app
> - ✅ Story 7: AI caption generation using Ollama's tinyllama model
>
> **Tests:** I wrote 4 test files covering form validation, component behavior, and mocked API calls. All tests are passing.
>
> **Demo:** Let me show you quickly — [Opens browser] — Here's the empty state, I'll create a project, now I can add an inspiration, click 'Generate Caption', and the AI populates the notes field. The user can still edit it before saving."

### "What I'd improve with more time..."

> "If I had another hour, here's what I'd prioritize:
>
> 1. **Story 4 (Edit/Delete):** Add edit and delete buttons to InspirationCard, implement a confirmation modal for deletions, and update the UI optimistically while the DB operation happens.
>
> 2. **Story 5 (Search/Filter):** Add a search bar with debounced input (to avoid excessive re-renders), filter by keyword in notes/URL, and a sort dropdown for date ordering.
>
> 3. **Better error handling:** Right now errors are inline, but I'd add a toast notification system for non-blocking errors (like 'Project saved successfully').
>
> 4. **Accessibility:** I added some ARIA labels, but I'd do a full keyboard navigation pass — ensure all interactions work without a mouse, add focus management to modals, and run an automated accessibility audit.
>
> 5. **Tests:** I'd add integration tests that test full user flows end-to-end using React Testing Library with mocked IndexedDB.
>
> 6. **Performance:** For Story 5, I'd add memoization with `useMemo` and `useCallback` to avoid re-rendering the list on every keystroke. I'd also lazy-load the AI service with React Suspense.
>
> 7. **Screenshot preview:** Right now we just store the URL, but I'd integrate an API (like screenshot.one) to actually capture and display thumbnails of the designs."

### "Architecture decisions I made..."

> "A few key decisions:
>
> **Separation of concerns:** I kept components, services, and utils separate. The service layer talks to IndexedDB, components handle UI, and utils have pure helper functions. This makes testing and refactoring easier.
>
> **Reusable components:** `LoadingSpinner`, `ErrorState`, `EmptyState` are generic and can be dropped into any page. Same with `Button` — it's already a shared component in the codebase, so I used that for consistency.
>
> **Controlled components:** All forms use controlled inputs (state-driven) rather than refs. This makes validation easier and keeps the UI in sync with state.
>
> **Error boundaries:** In production, I'd wrap the app in an error boundary to catch React errors gracefully. Right now, if a component throws, the whole UI breaks. An error boundary would show a fallback UI instead.
>
> **IndexedDB strategy:** The codebase already uses the `idb` library, which is a nice promisified wrapper around IndexedDB. I stuck with that pattern for consistency. In a real app with lots of data, I'd add pagination or virtual scrolling to the project list."

---

## 💡 Answering Potential Follow-up Questions

### "Why did you prioritize Story 6 so early?"

> "Loading, error, and empty states are often an afterthought, but they're what users see when things go wrong — which is frequently in real apps. Building them early as reusable components means I can drop them into every feature without extra effort. It also signals to the interviewer that I'm thinking about production readiness, not just the happy path."

### "How would you handle offline mode?"

> "IndexedDB already works offline, so we have local persistence. I'd add a service worker to cache the app shell (HTML, CSS, JS) so the app loads instantly even with no network. For sync, I'd use the Background Sync API to queue changes when offline and push them to a server when connectivity is restored. I'd also add a banner that says 'You're offline — changes will sync when you reconnect.'"

### "What if the AI API is slow?"

> "Great question. Right now, I show a loading spinner on the button (`'Generating...'`). For a better UX, I'd:
> 1. Show a skeleton loader in the notes field while generating
> 2. Add a timeout (e.g., 10 seconds) and fail gracefully with a message: 'AI is taking too long. Try again or write your own notes.'
> 3. If latency is consistently bad, I'd move AI generation to a background job and notify the user when it's done (via a toast or badge)."

### "How would you scale this if the user had 10,000 projects?"

> "I'd add pagination or infinite scroll to the projects list — load 20 at a time and fetch more as the user scrolls. I'd also add an index in IndexedDB on the `createdAt` field for faster sorting. For search (Story 5), I'd use a full-text search library like Lunr.js or Fuse.js to index project names/descriptions. If this was backed by a real API, I'd let the server handle search and pagination."

### "What testing strategy would you use in production?"

> "I'd use a testing pyramid:
> - **Unit tests** (Jest) for utils and services (like `aiService`)
> - **Component tests** (React Testing Library) for forms, buttons, state components
> - **Integration tests** (React Testing Library + MSW) for full user flows: create project → add inspiration → verify it's saved
> - **E2E tests** (Playwright or Cypress) for critical paths on a staging environment
> - **Accessibility tests** (Jest + jest-axe) to catch WCAG violations automatically
>
> I'd aim for ~80% coverage but focus on high-value tests, not 100% coverage for the sake of it."

---

## 🎯 Confidence Boosters (Say these to yourself)

- "I've practiced this flow multiple times."
- "I know the codebase structure — React, TypeScript, IndexedDB, CSS Modules."
- "I've built forms with validation before — this is familiar territory."
- "If I get stuck, I can ask clarifying questions or adjust scope."
- "The goal isn't perfection — it's to show I can ship working features under time pressure."
- "I'm explaining my thought process, which is just as important as the code."

---

## 🚫 Avoid These Phrases

**Don't say:**
- ❌ "I don't know how to do this."
- ❌ "I've never used IndexedDB before."
- ❌ "This is taking too long."
- ❌ "I should have done this differently."
- ❌ "I'm stuck."

**Instead say:**
- ✅ "I'll need to look up the IndexedDB API syntax, but the concept is clear."
- ✅ "I'm going to try X approach first, and if that doesn't work, I'll pivot to Y."
- ✅ "In the interest of time, I'll implement the core logic and explain the edge cases."
- ✅ "Let me adjust my approach here based on what I've learned."
- ✅ "I'm going to take a different angle on this."

---

## 🎬 Final Minute: The Closing

> "Thanks for the opportunity to work through this! I enjoyed building out the CRUD functionality and integrating the AI feature. I think what I've delivered here is a solid foundation — it's functional, tested, and handles edge cases well. With more time, I'd love to polish the UX (edit/delete, search) and add more comprehensive tests. Happy to answer any questions or dive deeper into any of the decisions I made!"

---

**Practice these talking points out loud. Record yourself if possible. The more natural you sound, the better!** 🎤
