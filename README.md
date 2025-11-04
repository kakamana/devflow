<div align="center">

  <a href="https://www.jsmastery.pro/ultimate-next-course" target="_blank">
    <img src="https://github.com/user-attachments/assets/769882e6-bae6-4932-a117-829cf34f809f" alt="Project Banner">
  </a>

<br /><br />

  <div>
    <img src="https://img.shields.io/badge/-TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" />
    <img src="https://img.shields.io/badge/-Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white" />
    <img src="https://img.shields.io/badge/-TailwindCSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" />
    <img src="https://img.shields.io/badge/-PostgreSQL-336791?style=for-the-badge&logo=postgresql&logoColor=white" />
    <img src="https://img.shields.io/badge/-Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white" />
    <img src="https://img.shields.io/badge/-ShadCN_UI-000000?style=for-the-badge&logo=shadcnui&logoColor=white" />
    <img src="https://img.shields.io/badge/-Arabic_i18n-008000?style=for-the-badge" />
    <img src="https://img.shields.io/badge/-OpenAI-412991?style=for-the-badge&logo=openai&logoColor=white" />
    <img src="https://img.shields.io/badge/-Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white" alt="prisma" />
<img src="https://img.shields.io/badge/i18n-ArabicRTL-008000?style=for-the-badge" alt="arabic-i18n" />
<img src="https://img.shields.io/badge/PostgreSQL-16+-336791?style=for-the-badge&logo=postgresql&logoColor=white" alt="postgresql" />

  </div>

  <h2 align="center">🚀 Devoverflow — My Customized Implementation</h2>
  <p align="center">Inspired by the Ultimate Next.js Course at JSMasteryPro — Expanded with Real-World Enhancements.</p>

</div>

---

### 🌍 What Makes **My** Version Different?

The original project uses **MongoDB**, **EN-only content**, and **starter-level features**.  
This implementation pushes the boundaries:

✅ PostgreSQL + Prisma (enterprise-friendly)  (in progress)
✅ Full Arabic RTL support (i18n, typography, UI direction)  (in progress)
✅ Custom authentication & DB schemas  
✅ Upgraded architecture for production scalability  
✅ Smarter AI responses tuned for multilingual support

> Started as a learning journey → evolving into a real product.

---

## 📋 Table of Contents

1. 🤖 [Introduction](#introduction)
2. ⚙️ [Tech Stack](#tech-stack)
3. 🔋 [Features](#features)
4. 🚀 [What I Changed](#what-i-changed)
5. ⚡️ [Future Enhancements](#future-enhancements)
6. 🤸 [Setup & Quick Start](#quick-start)

---

## 🤖 Introduction

This is a **full-stack** Next.js app inspired by StackOverflow — enhanced with **AI-powered answers**, **gamified ranking**, and **community interactions**.

Where others stop at "course-work", this repo evolves:  
I’m transforming it into a **bilingual production-grade platform** for developers in both **Arabic** and **English** regions.

---

## ⚙️ Tech Stack

| Category     | Tools                                   |
| ------------ | --------------------------------------- |
| Framework    | Next.js 15 (App Router, Server Actions) |
| DB Layer     | PostgreSQL + Prisma (replaces MongoDB)  |
| AI           | OpenAI API                              |
| Auth         | Auth.js (Credentials + OAuth)           |
| UI           | ShadCN UI, TailwindCSS                  |
| Forms        | React Hook Form + Zod                   |
| Localization | next-i18next + RTL support              |

---

## 🔋 Core Features (plus expansion)

- Secure authentication (Email & OAuth)
- Ask/answer questions with rich MDX + code blocks
- AI-generated assistance per question
- Voting, bookmarks, profile & reputation system
- Global search across users/questions/tags
- Job recommendations
- Fully responsive & optimized UI

---

## 🧩 What _I_ Changed

| Original         | My Variation                       |
| ---------------- | ---------------------------------- |
| MongoDB          | ✅ PostgreSQL + Prisma             |
| English-only UI  | ✅ Full Arabic i18n & RTL          |
| Basic schemas    | ✅ Normalized DB design            |
| Course structure | ✅ Modular domain-driven layout    |
| Dev-only setup   | ✅ Production-ready configs        |
| Generic UI       | ✅ Extended with custom components |

---

## 🧱 Architecture Overview

````mermaid
flowchart TD
    UI[Next.js + ShadCN UI + RTL Support] --> API[Server Actions + REST + ISR]
    API --> Auth[Auth.js - OAuth & Credentials]
    API --> PrismaORM[Prisma Client]
    PrismaORM --> DB[(PostgreSQL)]
    API --> AI[OpenAI API - Multilingual]

    subgraph Localization
    i18n[next-i18next]
    end
    UI --> i18n

    AI --> Responses[AI Assisted Answers + Ranking]


---

## 🔮 Future Enhancements (Planned)

I’m not pretending it’s done — here’s where I’m pushing:

- ✅ **Arabic content moderation** (AI + regex + admin rules)
- ✅ **AI-ranked answers & summaries**
- ✅ **AI-powered job-skills extraction**
- 🔜 **Gamification tuned for MENA tech ecosystem**
- 🔜 **Multi-tenant capability**
- 🔜 **Activity logging + analytics**
- 🔜 **CI/CD with Vercel + Supabase Edge Functions**
- 🔜 **Public API for community tooling**

### High-Impact

✅ Replace OpenAI dependency with local models (Ollama / DeepSeek)
✅ PostgreSQL advanced indexing → **fast global search**
✅ Role-based authorization w/ moderator dashboards
✅ Full testing coverage (Playwright + Vitest)
✅ Deployment on **UAE-compliant** infrastructure

### Growth-Focused

✅ Content recommendation engine
✅ Telegram/Discord integration for question notifications
✅ Talent-scoring & job matching (your OSINT + ML skills come in clutch)

### Differentiators

✅ Offline Arabic NLP support (embedding + vector search)

If you’re watching this repo — expect **frequent breaking improvements** 😈

---

## 🛣️ Future Plans

- **Activity logs + analytics** — Real product behavior insights _(Medium)_
- **Rate limiting + abuse detection** — Acts like a real community app _(Medium)_
- **RTL-aware UX motion rules** — Arabic UI that feels native _(High)_
- **Contribution guidelines** — Makes repo collaboration-friendly _(Low)_
- **Security hardening** — OWASP Top-10 alignment + secrets rotation
- **Redis cache** — Query caching, sessions, and rate limit buckets
- **Preview deployments** — Per-PR Vercel previews for design & QA
- **DevOps pipeline** — GitHub Actions → Vercel (Dev → QA → UAT → Prod)

---

## 🔐 Security

- **OWASP Top-10**: SQLi (parameterized Prisma), XSS (MDX sanitize + CSP), Auth (secure cookies, short JWT TTL), Access Control (RBAC + route guards), SSRF (no blind fetch, allowlist), Sensitive Data Exposure (HTTPS only, secure headers), Rate Limit (Redis), Deserialization (no unsafe eval), Known Vulns (Dependabot + `npm audit`), Logging/Monitoring (audit trails + anomaly alerts).
- **Headers**: strict CSP, HSTS, X-Frame-Options=DENY, Referrer-Policy, X-Content-Type-Options, Permissions-Policy.
- **Secrets**: rotate quarterly (GitHub Encrypted Secrets + Vercel Env), **never** commit `.env`. Use short-lived tokens where possible.
- **Data**: PII minimized; encryption in transit (TLS) + at rest (DB-level). Backups tested monthly.

---

## ⚡ Redis Cache

- **What**: Redis (Upstash or self-hosted) for:
  - API response caching (hot feeds, tag lists)
  - Rate limiting (IP + user)
  - Session store (Auth.js adapter optional)
- **Env**:
  - `REDIS_URL=...`
  - `REDIS_TOKEN=...` (if Upstash)
- **Client**:
  ```ts
  import { Redis } from '@upstash/redis';
  export const redis = new Redis({ url: process.env.REDIS_URL!, token: process.env.REDIS_TOKEN! });

---
## 🧱 CI/CD Flow

```mermaid
flowchart LR
  A[Local Dev] -->|push dev| B[CI: Lint/Type/Unit/Integration/Perf]
  B -->|manual or pass| C[Merge -> qa]
  C --> D[Deploy QA (Vercel)]
  D --> E[QA: Playwright + Vitest + TDD reports]
  E -->|approve| F[Merge -> uat]
  F --> G[Deploy UAT (Vercel)]
  G --> H[Business UAT sign-off]
  H -->|approve + Pen/Sec test| I[Tag vX.Y.Z -> Prod]
  I --> J[Deploy Prod (Vercel)]
  E -->|fail| B
  H -->|reject| D

---

## 🔗 Deployments

- **Preview (per PR)**: auto-generated Vercel URLs (e.g., `https://<pr-hash>-<project>.vercel.app`)
- **QA**: `qa.<your-domain>.vercel.app` (branch: `qa`)
- **UAT**: `uat.<your-domain>.vercel.app` (branch: `uat`)
- **Prod**: https://devflow-three-nu.vercel.app/

> All builds are immutable; rollbacks via Vercel “Promote from deployment” or git revert.
---

## 🤸 Quick Start

```bash
git clone https://github.com/<your-username>/<your-repo>.git
cd <your-repo>

npm install
npm run dev
````
