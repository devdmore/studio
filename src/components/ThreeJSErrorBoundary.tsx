'use client';
import { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

class ThreeJSErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(_: Error): State {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ThreeJS Error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="w-full h-[50vh] flex items-center justify-center bg-black/10">
          <p className="text-gray-500">3D scene failed to load. Please refresh the page.</p>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ThreeJSErrorBoundary;