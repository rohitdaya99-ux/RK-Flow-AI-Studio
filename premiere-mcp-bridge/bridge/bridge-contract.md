# Premiere Bridge Contract

## Purpose
Structured commands from MCP are transferred to Premiere Pro and executed there.

## Transport
- Shared temp directory
- File-based IPC
- Request file, response file, health file

## Rules
- Every command needs a unique id.
- Write actions must support dry-run or confirmation.
- Diagnostics should run after startup and after failures.
- Temp directory must match MCP client config exactly.

## Execution layers
- CEP + ExtendScript
- UXP DOM
- QE DOM when necessary
