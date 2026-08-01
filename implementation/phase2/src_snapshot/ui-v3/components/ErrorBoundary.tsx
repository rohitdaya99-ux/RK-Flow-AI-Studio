import React from "react";

type Props = {
  children: React.ReactNode;
};

type State = {
  hasError: boolean;
  error?: Error;
};

export default class ErrorBoundary extends React.Component<Props, State> {
  state: State = {
    hasError: false
  };

  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error
    };
  }

  componentDidCatch(error: Error) {
    console.error("RK Flow UI Error:", error);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            height: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "#111",
            color: "#fff",
            fontFamily: "Inter, sans-serif"
          }}
        >
          <div>
            <h2>RK Flow UI Error</h2>
            <pre>{this.state.error?.message}</pre>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
