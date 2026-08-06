#!/usr/bin/env bash
set -e

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
SIDECAR_DIR="$DIR/../analysis-sidecar"
PID_FILE="$SIDECAR_DIR/sidecar.pid"

if [ -f "$PID_FILE" ]; then
    PID=$(cat "$PID_FILE")
    if ps -p $PID > /dev/null; then
        echo "Sidecar is already running (PID: $PID)"
        exit 0
    fi
fi

echo "Starting Sidecar..."
cd "$SIDECAR_DIR"

if [ ! -d ".venv" ]; then
    echo "Creating virtual environment..."
    python3 -m venv .venv
fi

source .venv/bin/activate
pip install -r requirements.txt

# Start uvicorn on port 43191
nohup uvicorn server:app --host 127.0.0.1 --port 43191 > sidecar.log 2>&1 &
PID=$!
echo $PID > "$PID_FILE"

echo "Sidecar started with PID $PID on port 43191"
