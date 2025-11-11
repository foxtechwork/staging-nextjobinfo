import { Component, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
}

/**
 * Error Boundary for Ad Components
 * 
 * Wraps advertisement components to prevent ad-loading errors
 * from breaking the entire application.
 * 
 * Usage:
 * <AdWrapper fallback={<div>Ad unavailable</div>}>
 *   <AdSenseAd ... />
 * </AdWrapper>
 */
export class AdWrapper extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: any) {
    // Log error for debugging
    console.error('Advertisement loading error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || null;
    }

    return this.props.children;
  }
}
