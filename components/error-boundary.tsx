"use client";

import React from "react";
import { AlertTriangle, RefreshCw } from "lucide-react";

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ComponentType<ErrorFallbackProps>;
}

interface ErrorFallbackProps {
  error: Error;
  resetError: () => void;
}

export class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  resetError = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      const FallbackComponent = this.props.fallback || DefaultErrorFallback;
      return (
        <FallbackComponent
          error={this.state.error!}
          resetError={this.resetError}
        />
      );
    }

    return this.props.children;
  }
}

function DefaultErrorFallback({ error, resetError }: ErrorFallbackProps) {
  return (
    <div className="error-boundary">
      <div className="error-content">
        <AlertTriangle className="error-icon" />
        <h2 className="error-title">Something went wrong</h2>
        <p className="error-message">
          {error.message || "An unexpected error occurred"}
        </p>
        <button onClick={resetError} className="error-retry-button">
          <RefreshCw className="w-4 h-4" />
          Try again
        </button>
      </div>
      <style jsx>{`
        .error-boundary {
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 400px;
          padding: 2rem;
          background: var(--color-surface);
          border-radius: 8px;
          border: 1px solid var(--color-border);
        }

        .error-content {
          text-align: center;
          max-width: 400px;
        }

        .error-icon {
          width: 48px;
          height: 48px;
          color: var(--color-warning);
          margin: 0 auto 1rem;
        }

        .error-title {
          font-size: 1.5rem;
          font-weight: 600;
          color: var(--color-text-primary);
          margin-bottom: 0.5rem;
        }

        .error-message {
          color: var(--color-text-secondary);
          margin-bottom: 1.5rem;
          line-height: 1.5;
        }

        .error-retry-button {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.75rem 1.5rem;
          background: var(--color-primary);
          color: var(--color-primary-foreground);
          border: none;
          border-radius: 6px;
          font-weight: 500;
          cursor: pointer;
          transition: background-color 0.2s;
        }

        .error-retry-button:hover {
          background: var(--color-primary-hover);
        }
      `}</style>
    </div>
  );
}

export function APIErrorFallback({ error, resetError }: ErrorFallbackProps) {
  return (
    <div className="api-error-boundary">
      <div className="api-error-content">
        <AlertTriangle className="api-error-icon" />
        <h3 className="api-error-title">API Error</h3>
        <p className="api-error-message">
          {error.message.includes("API key")
            ? "API authentication failed. Please check your API key configuration."
            : "Unable to fetch data from the API. Please try again later."}
        </p>
        <button onClick={resetError} className="api-error-retry-button">
          <RefreshCw className="w-4 h-4" />
          Retry
        </button>
      </div>
      <style jsx>{`
        .api-error-boundary {
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 200px;
          padding: 1.5rem;
          background: var(--color-warning-bg);
          border: 1px solid var(--color-warning-border);
          border-radius: 6px;
          margin: 1rem 0;
        }

        .api-error-content {
          text-align: center;
          max-width: 300px;
        }

        .api-error-icon {
          width: 32px;
          height: 32px;
          color: var(--color-warning);
          margin: 0 auto 0.75rem;
        }

        .api-error-title {
          font-size: 1.125rem;
          font-weight: 600;
          color: var(--color-text-primary);
          margin-bottom: 0.5rem;
        }

        .api-error-message {
          color: var(--color-text-secondary);
          margin-bottom: 1rem;
          font-size: 0.9rem;
          line-height: 1.4;
        }

        .api-error-retry-button {
          display: inline-flex;
          align-items: center;
          gap: 0.375rem;
          padding: 0.5rem 1rem;
          background: var(--color-warning);
          color: white;
          border: none;
          border-radius: 4px;
          font-size: 0.875rem;
          font-weight: 500;
          cursor: pointer;
          transition: background-color 0.2s;
        }

        .api-error-retry-button:hover {
          background: var(--color-warning-hover);
        }
      `}</style>
    </div>
  );
}

// Higher-order component for wrapping components with error boundary
export function withErrorBoundary<P extends object>(
  Component: React.ComponentType<P>,
  fallback?: React.ComponentType<ErrorFallbackProps>
) {
  const WrappedComponent = (props: P) => (
    <ErrorBoundary fallback={fallback}>
      <Component {...props} />
    </ErrorBoundary>
  );

  WrappedComponent.displayName = `withErrorBoundary(${
    Component.displayName || Component.name
  })`;

  return WrappedComponent;
}
