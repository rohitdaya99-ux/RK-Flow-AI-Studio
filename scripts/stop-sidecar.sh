#!/usr/bin/env bash

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
SIDECAR_DIR="$DIR/../analysis-sidecar"
PID_FILE="$SIDECAR_DIR/sidecar.pid"

TOKEN_FILE="$SIDECAR_DIR/sidecar-token.txt"

if [ -f "$PID_FILE" ]; then
    PID=$(cat "$PID_FILE")
    if ps -p $PID > /dev/null; then
        echo "Stopping Sidecar (PID: $PID)..."
        kill -15 $PID
        rm -f "$PID_FILE"
        rm -f "$TOKEN_FILE"
        echo "Sidecar stopped."
    else
        echo "Sidecar is not running, removing stale PID file."
        rm -f "$PID_FILE"
        rm -f "$TOKEN_FILE"
    fi
else
    # Fallback to pkill if PID file is missing
    echo "No PID file found, attempting to find python server..."
    if pgrep -f "python3 server.py --host 127.0.0.1 --port 43191" > /dev/null; then
        pkill -f "python3 server.py --host 127.0.0.1 --port 43191"
        rm -f "$TOKEN_FILE"
        echo "Sidecar stopped via pkill."
    else
        echo "Sidecar is not running."
        rm -f "$TOKEN_FILE"
    fi
fi
