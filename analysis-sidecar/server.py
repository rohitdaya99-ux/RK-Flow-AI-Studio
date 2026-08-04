from __future__ import annotations

import argparse

import uvicorn

from app.server import create_app
from app.service import ExtractionService


def main() -> None:
    parser = argparse.ArgumentParser(description="RK Flow local analysis sidecar")
    parser.add_argument("--host", default="127.0.0.1")
    parser.add_argument("--port", default=43191, type=int)
    parser.add_argument("--token", required=True)
    args = parser.parse_args()

    base_url = f"http://{args.host}:{args.port}"
    service = ExtractionService(bind=args.host, base_url=base_url, version="phase-4-sidecar-v1")
    app = create_app(service, args.token)
    uvicorn.run(app, host=args.host, port=args.port, log_level="warning")


if __name__ == "__main__":
    main()
