#!/usr/bin/env bash

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
SIDECAR_DIR="$DIR/../analysis-sidecar"
PID_FILE="$SIDECAR_DIR/sidecar.pid"

if [ -f "$PID_FILE" ]; then
    PID=$(cat "$PID_FILE")
    if ps -p $PID > /dev/null; then
        echo "Sidecar is running (PID: $PID)"
        exit 0
    else
        echo "Sidecar is NOT running (stale PID file found)"
        exit 1
    fi
else
    if pgrep -f "uvicorn server:app --host 127.0.0.1 --port 43191" > /dev/null; then
        PID=$(pgrep -f "uvicorn server:app --host 127.0.0.1 --port 43191")
        echo "Sidecar is running (PID: $PID)"
        exit 0
    else
        echo "Sidecar is NOT running"
        exit 1
    fi
fi
