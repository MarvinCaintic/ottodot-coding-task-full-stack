# Math Problem Generator - Developer Assessment Starter Kit

## Overview

This is a starter kit for building an AI-powered math problem generator application. The goal is to create a standalone prototype that uses AI to generate math word problems suitable for Primary 5 students, saves the problems and user submissions to a database, and provides personalized feedback.

## Tech Stack

- **Frontend Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: Supabase
- **AI Integration**: Google Generative AI (Gemini)

## Setup Instructions

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd math-problem-generator
```

### 2. Create a Supabase Project

1. Go to [https://supabase.com](https://supabase.com) and create a free account
2. Create a new project
3. Go to Settings → API to find your:
   - Project URL (starts with `https://`)
   - Anon/Public Key

### 3. Set Up Database Tables

1. In your Supabase dashboard, go to SQL Editor
2. Copy and paste the contents of `database.sql`
3. Click "Run" to create the tables and policies

### 4. Get Google API Key

1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Create a new API key for Gemini

### 5. Configure Environment Variables

1. Copy `.env.local.example` to `.env.local`:
   ```bash
   cp .env.local.example .env.local
   ```
2. Edit `.env.local` and add your actual keys:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your_actual_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_actual_supabase_anon_key
   GOOGLE_API_KEY=your_actual_google_api_key
   ```

### 6. Install Dependencies

```bash
npm install
```

### 7. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Your Task

### 1. Implement Frontend Logic (`app/page.tsx`)

Completed: the main page and hook are wired to the backend API routes.

- `generateProblem` calls `POST /api/math-problem` (see `app/hooks/useProblemGenerator.ts`).
- `submitAnswer` posts to `POST /api/math-problem/submit` (see `app/hooks/useProblemGenerator.ts`).

### 2. Backend API Routes

Implemented endpoints (see `app/api/math-problem`):

- `POST /api/math-problem` — generates a problem via Gemini and saves a session in `math_problem_sessions`. Implemented in `app/api/math-problem/route.ts`.
- `POST /api/math-problem/submit` — accepts `{ sessionId, userAnswer }`, checks correctness, generates feedback via Gemini, saves to `math_problem_submissions`, and returns `{ isCorrect, feedback }`. Implemented in `app/api/math-problem/submit/route.ts`.

Both routes use the Supabase client (`lib/supabaseClient.ts`) and the Gemini helper (`app/services/geminiService.ts`).

### 3. Requirements Checklist (current status)

- [x] AI generates appropriate Primary 5 level math problems (via `app/services/geminiService.ts`).
- [x] Problems and answers are saved to Supabase (`math_problem_sessions`) — implemented in `app/api/math-problem/route.ts`.
- [x] User submissions are saved with feedback (`math_problem_submissions`) — implemented in `app/api/math-problem/submit/route.ts`.
- [x] AI generates helpful, personalized feedback (via `app/services/geminiService.ts`).
- [x] UI is clean and mobile-responsive (Tailwind CSS; components in `app/components`).
- [x] Error handling for API failures (basic try/catch and JSON error responses in API routes).
- [x] Loading states during API calls (`isLoading`, `LoadingIndicator`, hook wiring).

Notes / Remaining improvements:

- Add stronger validation on API inputs (e.g. use `zod`) and more explicit error codes.
- Add unit/integration tests for API routes.
- Add rate-limiting / basic auth for production deployments.
- Improve AI prompt tuning to guarantee strict JSON output; add retry/validation on parse failures.

## Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Go to [Vercel](https://vercel.com) and import your repository
3. Add your environment variables in Vercel's project settings
4. Deploy!

## Assessment Submission

When submitting your assessment, provide:

1. **GitHub Repository URL**: Make sure it's public
2. **Live Demo URL**: Your Vercel deployment
3. **Supabase Credentials**: Add these to your README for testing:
   ```
   SUPABASE_URL: https://fvvxjukihkbdcanvlgiy.supabase.co
   SUPABASE_ANON_KEY: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ2dnhqdWtpaGtiZGNhbnZsZ2l5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTkzNjM2ODcsImV4cCI6MjA3NDkzOTY4N30.5rdV5HP0OI5Vus3nNjZKc_vgEXld6vXdyK_jfmFGG-E
   ```

## Implementation Notes

*Please fill in this section with any important notes about your implementation, design decisions, challenges faced, or features you're particularly proud of.*

### My Implementation:

- 
- 
- 

## Additional Features (Optional)

If you have time, consider adding:

- [ ] Difficulty levels (Easy/Medium/Hard)
- [ ] Problem history view
- [ ] Score tracking
- [ ] Different problem types (addition, subtraction, multiplication, division)
- [ ] Hints system
- [ ] Step-by-step solution explanations

---

Good luck with your assessment! 🎯