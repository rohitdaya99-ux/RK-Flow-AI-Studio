#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
TEMP_DIR="${PREMIERE_TEMP_DIR:-/tmp/premiere-mcp-bridge}"

mkdir -p "$TEMP_DIR"
cd "$ROOT_DIR"
npm install
npm run build
echo "Installed to $ROOT_DIR"
