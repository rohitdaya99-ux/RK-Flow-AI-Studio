import { Component, ErrorInfo, ReactNode } from "react";
import { Button, Card } from "../theme/primitives";
import { colors, spacing } from "../theme";

interface ErrorBoundaryProps {
  children: ReactNode;
  resetKey?: string;
}

interface ErrorBoundaryState {
  error: Error | null;
}

export default class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  state: ErrorBoundaryState = {
    error: null
  };

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("[RK Flow] Screen crashed.", {
      message: error.message,
      stack: error.stack,
      componentStack: info.componentStack
    });
  }

  componentDidUpdate(prevProps: ErrorBoundaryProps) {
    if (
      this.state.error &&
      this.props.resetKey &&
      this.props.resetKey !== prevProps.resetKey
    ) {
      this.setState({ error: null });
    }
  }

  render() {
    if (!this.state.error) {
      return this.props.children;
    }

    return (
      <Card
        title="This screen hit an error"
        subtitle={this.state.error.message}
      >
        <div style={{ color: colors.inkMuted, lineHeight: 1.6 }}>
          The rest of the panel is still available. Switch modules or retry this screen
          after fixing the underlying data or code path.
        </div>
        <div style={{ marginTop: spacing.md }}>
          <Button onClick={() => this.setState({ error: null })}>Retry Screen</Button>
        </div>
      </Card>
    );
  }
}
