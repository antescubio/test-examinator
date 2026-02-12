# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
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
- None

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
