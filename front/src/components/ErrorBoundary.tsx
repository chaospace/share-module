import React, { ErrorInfo } from 'react';

interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ReactNode | ((props: ErrorBoundaryState) => React.ReactNode);
}

interface ErrorBoundaryState {
  error?: Error;
  errorInfo?: ErrorInfo;
}

// interface FallbackVO extends ErrorBoundaryState {
//   reset: () => void;
// }
class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { error: undefined, errorInfo: undefined };
  }

  reset() {
    this.setState({ error: undefined, errorInfo: undefined });
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    this.setState({ error, errorInfo });
  }

  render(): React.ReactNode {
    if (this.state.error) {
      // const resetHandler = this.reset.bind(this);
      // fallback이 있는 경우 fallback실행
      if (this.props.fallback !== undefined) {
        return typeof this.props.fallback === 'function'
          ? (this.props.fallback as Function).call(null, {
              ...this.state,
              reset: () => this.reset()
            })
          : this.props.fallback;
      }
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
