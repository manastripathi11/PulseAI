# PulseAI — AI-Powered Employee Assistant Dashboard

A modern, production-grade enterprise workspace dashboard built with React, Vite, Tailwind CSS, Recharts, Framer Motion, and Google Gemini LLM API.

---

## 🌟 Overview

**PulseAI** is an intelligent internal workspace portal that empowers enterprise employees to seamlessly discover team members, analyze organization metrics, explore department statistics, and converse with an AI copilot trained on company employee directory context.

Designed with a premium SaaS aesthetic (reminiscent of Linear, Raycast, and modern AI platforms), PulseAI balances visual elegance with high-performance React architecture, robust state management, and real-time data calculations.

---

## ✨ Features

- **🤖 AI Chat Assistant**: Interactive AI copilot powered by Google Gemini API with system prompt context containing real-time employee directory details.
- **👥 Employee Directory**: Polished, responsive grid showcasing realistic employee cards with department badges, position details, locations, and interactive modals.
- **🔍 Instant Real-time Search**: Live search across employee names, emails, roles, locations, and departments.
- **🏷️ Department Filtering**: Interactive filter tabs with live headcount counters across Engineering, Design, Product, Marketing, Sales, HR, and Finance.
- **📊 Workforce Analytics**: Interactive Recharts visualizations including department distribution bar charts, workforce status donut charts, and hiring velocity area graphs.
- **👤 Profile & Settings**: User profile editing, dark mode toggles, and notification preference controls persisted locally.
- **🌙 Dark Mode**: Global high-contrast dark theme support with persistent local preferences.
- **💬 Local Chat History**: Persisted chat conversations in LocalStorage with options to create new chats, switch between past threads, delete specific chats, or clear history.
- **🎙️ Voice Input**: Browser-native Speech Recognition API integration with recording status indicators and graceful fallback for unsupported browsers.
- **⚡ Micro-animations**: Subtle page transitions, button micro-feedbacks, typing indicators, skeleton loaders, and toast notifications.

---

## 🛠️ Tech Stack

- **Framework**: React 18 + Vite 6
- **Styling**: Tailwind CSS v3 + CSS Custom Variables + Backdrop Blur Glassmorphism
- **Routing**: React Router v6
- **Icons**: Lucide React
- **Charts**: Recharts v2
- **Animations**: Framer Motion v12
- **AI Integration**: `@google/generative-ai` (Gemini API)
- **State & Storage**: React Context API + LocalStorage Hooks

---

## 📁 Project Architecture

```
src/
├── assets/                  # Static media and graphics
├── components/              # Modular UI components
│   ├── analytics/           # StatCard, DepartmentChart, ActivityChart, AnalyticsOverview
│   ├── chat/                # ChatWindow, ChatMessage, ChatInput, TypingIndicator, SuggestedPrompts, ChatHistory
│   ├── employees/           # EmployeeCard, EmployeeGrid, EmployeeFilters, EmployeeSearch, EmployeeModal
│   ├── landing/             # Hero, FeatureSection, CTASection, Footer
│   ├── layout/              # AppLayout, Sidebar, Header, MobileNav
│   ├── settings/            # ProfileForm, ThemeSettings, NotificationSettings
│   ├── ui/                  # Button, Card, Badge, Input, Avatar, Modal, Dropdown, Skeleton, EmptyState
│   └── ErrorBoundary.jsx    # React Error Boundary fallback wrapper
├── context/                 # ThemeContext, ToastContext, AppContext
├── data/                    # Seeded deterministic mock employee dataset
├── hooks/                   # useLocalStorage, useChat, useSpeechRecognition
├── pages/                   # LandingPage, Dashboard, ChatPage, EmployeesPage, AnalyticsPage, SettingsPage, NotFoundPage
├── services/                # geminiService.js (Gemini SDK integration & local fallback)
├── utils/                   # constants.js, helpers.js
├── App.jsx                  # Main Router & Provider tree
├── main.jsx                 # Vite application entrypoint
└── index.css                # Tailwind directives & CSS custom variables
```

---

## 🚀 Getting Started

### 1. Clone & Install Dependencies

```bash
git clone <repository-url>
cd Assignment
npm install
```

### 2. Configure Environment Variables

Create a `.env` file in the root directory (refer to `.env.example`):

```env
VITE_GEMINI_API_KEY=YOUR_GEMINI_API_KEY_HERE
VITE_GEMINI_MODEL=gemini-2.5-flash
```

*Note: If no API key is provided in `.env`, the application automatically operates in **Local Demo Mode** using intelligent contextual responses so you can test the UI without disruption.*

### 3. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Build for Production

```bash
npm run build
```

---

## 🔐 Security Note & Architecture Recommendation

In client-side applications built with Vite, environment variables starting with `VITE_` are bundled into frontend JavaScript files and can technically be inspected in the user's browser.

**Production Recommendation**:
For a live production deployment, the Google Gemini API key should **never** be invoked directly from the frontend. Instead, route requests through a secure serverless proxy or backend service (e.g., Next.js API Routes, Express, AWS Lambda, or Cloudflare Workers) where authentication, rate limiting, and secret key validation are securely enforced.

---

## 🎨 Design Decisions

1. **Restraint & Hierarchy**: Clean slate/dark neutral palette paired with an indigo/brand accent color. Avoided garish gradients or excessive glassmorphism to prioritize readability and SaaS polish.
2. **Context-Aware AI**: The system prompt injected into Gemini SDK calls automatically serializes current employee roster state into structured text, preventing hallucinated employee names.
3. **Accessibility & Micro-interactions**: Added keyboard listeners (`Escape` for modals, `Enter` for chat), focus rings, ARIA labels, interactive empty states, and toast notifications.

---

## 🔮 Future Improvements

- **Backend Auth**: OAuth2 / SAML Single Sign-On (SSO) integration.
- **Database Persistence**: PostgreSQL / Supabase backend for enterprise employee CRUD operations.
- **Role-Based Access Control (RBAC)**: Manager vs Employee permissions.
- **Vector Search / RAG**: Embeddings database for enterprise document search beyond employee data.
