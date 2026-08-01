# RK Flow Context Engine

## Purpose
The Context Engine gathers every piece of information required before AI editing starts.

## Responsibilities

- Read Premiere timeline
- Read selected clips
- Read active sequence
- Read music analysis
- Read user prompt
- Read editing profile
- Read wedding event
- Build unified ProjectContext
- Validate context
- Normalize data
- Cache context
- Serialize context
- Produce AI-ready prompt context

## Flow

Premiere
   ↓
Timeline Extractor
   ↓
Context Providers
   ↓
Project Context
   ↓
Analyzer
   ↓
Normalizer
   ↓
Wedding Preset
   ↓
Recommendation Engine
   ↓
Formatter
   ↓
AI Engine

