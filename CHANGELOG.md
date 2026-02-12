# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- **Results Page (Phase 5)** - Comprehensive exam results with detailed review
  - `ScoreCard` component:
    - Large score display on Microsoft scale (0-1000)
    - Pass/fail banner with visual indicators (🎉 or 😔)
    - Progress bar showing score relative to passing threshold
    - Statistics grid: percentage, correct count, incorrect count, time spent
    - Certification information display
  - `ResultsSummary` component:
    - Performance level classification (Excellent, Very Good, Good, Sufficient, Insufficient)
    - Topic performance breakdown with visual bars
    - Individual topic scores with percentages
    - Weak topics alert (below 70%)
    - Strong topics highlight (above 80%)
  - `QuestionReview` component:
    - Complete question-by-question review
    - Filter options: all questions, correct only, incorrect only
    - Visual indicators for correct/incorrect answers
    - Detailed explanation for each question
    - Reference links to official documentation
    - User answer vs correct answer comparison
    - Topic and difficulty badges
  - `ResultsPage` integration:
    - "Repeat Exam" button (same configuration)
    - "Repeat Incorrect Only" button (practice weak areas)
    - "New Exam" button (return to home)
    - Automatic results loading from localStorage
    - Responsive layout for all screen sizes
- **Exam Engine (Phase 4)** - Core functionality for simulated exams
  - `ExamContext` with React Context + useReducer for global exam state management
  - `useExam` hook for exam logic (start, answer selection, navigation, finish)
  - `useTimer` hook with countdown timer and auto-finish on timeout
  - Exam components:
    - `QuestionCard`: Displays question with type indicator, topic, difficulty, and options
    - `OptionButton`: Interactive answer buttons with selection states
    - `Timer`: Countdown display with visual warnings at 5min and 1min remaining
    - `ProgressBar`: Shows current question, total, and answered count with visual progress
    - `ExamNavigation`: Previous/Next buttons, question grid navigator, finish button with confirmation
  - `ExamPage`: Fully functional exam interface integrating all components
  - `scoring.js`: Score calculation on Microsoft scale (0-1000), topic performance analysis
  - Features:
    - Question navigation (previous, next, jump to any question)
    - Answer selection for single and multiple choice questions
    - Visual feedback for answered/unanswered questions
    - Timer with color-coded warnings
    - Confirmation modal before finishing
    - Auto-save exam state to localStorage
    - Auto-finish when time expires
    - Score calculation and results storage
- **Home page** with certification selection
  - Responsive grid layout (1 col mobile, 2 tablet, 3 desktop)
  - Certification cards grouped by provider (Microsoft and MuleSoft)
  - Each card displays: name, duration, passing score, available questions, topics preview
  - Color-coded cards based on certification theme
  - Direct navigation to exam configuration
- **Exam configuration page** (`ExamConfig.jsx`)
  - Number of questions selector (10, 20, 30, or all available)
  - Time limit options (no limit, 30min, 60min, 90min, or real exam time)
  - Topic selection with multi-select checkboxes
  - Shuffle options for questions and answer choices
  - Configuration persistence in localStorage
  - Validation (at least one topic must be selected)
  - Responsive design with certification color theming
- Question banks with 60+ realistic questions (10 per certification)
  - Azure certifications: AZ-900, AZ-104, AZ-204, AZ-305
  - MuleSoft certifications: MCD-Level-1, MCIA
- Certifications catalog (`src/data/certifications.json`) with metadata for all 6 certifications
- Question format with multi-language support (ES/EN)
- Utility functions for shuffling questions and options (Fisher-Yates algorithm)
- Question parser with loading, filtering, and validation capabilities
- Support for single-choice and multiple-choice question types
- Questions include explanations, references, topics, and difficulty levels

### Changed
- Wrapped App with `ExamProvider` to enable global exam state across all pages

## [0.1.0] - 2026-02-12

### Added
- Initial project scaffolding with Vite + React
- Tailwind CSS integration with `@tailwindcss/vite` plugin
- React Router v7 with route structure for exam flow
- Basic Layout component with Header and Footer
- Language selector in Header (ES/EN)
- Placeholder pages for Home, ExamConfig, ExamPage, and ResultsPage
- Project folder structure (components, pages, data, hooks, i18n, utils, context)
- Dependencies: react-router-dom, react-i18next, i18next, i18next-browser-languagedetector

### Changed
- Updated `vite.config.js` to include Tailwind CSS plugin
- Replaced default Vite styles with clean Tailwind-based `index.css`
- Replaced default App.jsx with Router configuration

## [0.0.0] - 2026-02-12

### Added
- Initial commit with project plan (PLAN.md)
