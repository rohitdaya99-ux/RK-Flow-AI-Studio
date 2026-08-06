#!/usr/bin/env bash
set -e

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
SIDECAR_DIR="$DIR/../analysis-sidecar"
PID_FILE="$SIDECAR_DIR/sidecar.pid"

TOKEN_FILE="$SIDECAR_DIR/sidecar-token.txt"

if [ -f "$PID_FILE" ]; then
    PID=$(cat "$PID_FILE")
    if ps -p $PID > /dev/null; then
        echo "Sidecar is already running (PID: $PID)"
        exit 0
    else
        echo "Cleaning up stale PID file..."
        rm -f "$PID_FILE" "$TOKEN_FILE"
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

# Generate a secure 32-character token
TOKEN=$(openssl rand -hex 16)
echo "$TOKEN" > "$TOKEN_FILE"
chmod 600 "$TOKEN_FILE"

# Start sidecar via python directly to pass the token
nohup python3 server.py --host 127.0.0.1 --port 43191 --token "$TOKEN" > sidecar.log 2>&1 &
PID=$!
echo $PID > "$PID_FILE"

# Wait for health endpoint to be up
echo "Waiting for Sidecar /health endpoint..."
for i in {1..60}; do
    if ! ps -p $PID > /dev/null; then
        echo "Sidecar failed to start (process died). Check analysis-sidecar/sidecar.log"
        cat sidecar.log
        rm -f "$PID_FILE" "$TOKEN_FILE"
        exit 1
    fi
    if curl -s -H "Authorization: Bearer $TOKEN" http://127.0.0.1:43191/health | grep -q '"status":"ok"'; then
        echo "Sidecar started with PID $PID on port 43191"
        exit 0
    fi
    sleep 1
done

echo "Sidecar failed to start (timed out). Check analysis-sidecar/sidecar.log"
cat sidecar.log
kill -9 $PID 2>/dev/null || true
rm -f "$PID_FILE" "$TOKEN_FILE"
exit 1
