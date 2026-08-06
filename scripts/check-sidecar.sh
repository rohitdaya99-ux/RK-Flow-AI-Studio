#!/usr/bin/env bash

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
SIDECAR_DIR="$DIR/../analysis-sidecar"
PID_FILE="$SIDECAR_DIR/sidecar.pid"
TOKEN_FILE="$SIDECAR_DIR/sidecar-token.txt"
PORT=43191

if [ -f "$PID_FILE" ]; then
    PID=$(cat "$PID_FILE")
    if ! ps -p $PID > /dev/null; then
        echo "Sidecar is NOT running (stale PID file found)"
        exit 1
    fi
else
    echo "Sidecar is NOT running (no PID file)"
    exit 1
fi

if [ ! -f "$TOKEN_FILE" ]; then
    echo "Sidecar token file missing!"
    exit 1
fi

TOKEN=$(cat "$TOKEN_FILE")

echo "Checking health endpoint..."
HTTP_STATUS=$(curl -s -o /dev/null -w "%{http_code}" -H "Authorization: Bearer $TOKEN" http://127.0.0.1:$PORT/health)

if [ "$HTTP_STATUS" != "200" ]; then
    echo "Health check failed (HTTP $HTTP_STATUS)"
    exit 1
fi

echo "Sidecar is healthy and running (PID: $PID)"
exit 0
