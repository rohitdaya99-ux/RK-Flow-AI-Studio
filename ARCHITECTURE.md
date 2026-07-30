# RK Flow AI Studio
## Architecture Freeze v1

> This document is the single source of truth for the project architecture.

---

# Layers

UI
- React Components
- Feature Pages
- Layout
- Hooks

↓

AI Layer
- AIManager
- AIRouter
- Providers
- Session
- Memory
- Prompt Engine
- Context Engine

↓

Command Layer
- Command Parser
- Intent Detection
- JSON Execution Plan

↓

Execution Layer
- Execution Engine
- Transaction Manager
- Premiere Executor

↓

Premiere Layer
- PremiereAPI
- TimelineSDK
- Premiere Bridge

↓

Adobe Premiere Pro UXP

---

# Folder Responsibilities

src/ai
Contains AI related code only.

src/core
Business logic only.

src/features
User-facing feature modules.

src/components
Reusable UI.

src/layout
Application shell.

src/sdk
Adobe SDK wrappers.

src/services
External integrations only.
(No business logic.)

src/types
Global types.

src/utils
Pure helper functions.

---

# Golden Rules

1. AI never talks directly to Premiere.

AI
↓
Execution Engine
↓
Premiere API

2. Premiere APIs stay inside Premiere Layer.

3. No duplicate AI managers.

4. No duplicate Timeline APIs.

5. Every feature must use Execution Engine.

6. Business logic never lives inside React components.

7. Every AI response must become a structured command before execution.

