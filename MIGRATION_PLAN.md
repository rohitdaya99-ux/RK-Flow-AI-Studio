# RK Flow Migration Plan v1

## KEEP

- src/ai/AIManager.ts
- src/ai/providers/*
- src/sdk/TimelineSDK.ts
- src/services/PremiereAPI.ts
- src/core/execution/*
- src/core/workflow/*

---

## MERGE

SystemPrompt

Keep:
src/ai/prompts/SystemPrompt.ts

Replace:
src/ai/system/SystemPrompt.ts

---

Gemini Provider

Keep:
src/ai/providers/GeminiProvider.ts

Archive:
src/ai/GeminiProvider.ts

---

Timeline

Keep:
TimelineSDK

TimelineReader

PremiereAPI

Merge later:
timelineService

---

## REMOVE AFTER VERIFICATION

src/services/ai/AIManager.ts

PremiereBridge
(if still unused)

