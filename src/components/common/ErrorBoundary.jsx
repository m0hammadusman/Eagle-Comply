import React from 'react';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('App Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center p-6 bg-[#030303] text-white">
          <div className="max-w-lg p-8 rounded-3xl bg-[#E31F1F] border border-[#FF3333]/30 shadow-2xl text-center space-y-4">
            <h2 className="text-2xl font-bold text-[#38BDF8]">Eagle Compliance System Recovery</h2>
            <p className="text-xs text-slate-300">
              An unexpected render error occurred. Click below to reload the platform cleanly.
            </p>
            <div className="p-3 rounded-xl bg-black/40 text-left font-mono text-[11px] text-red-400 overflow-x-auto">
              {this.state.error?.toString()}
            </div>
            <button
              onClick={() => { this.setState({ hasError: false }); window.location.reload(); }}
              className="px-6 py-2.5 rounded-xl bg-[#E31F1F] text-white font-bold text-xs shadow-md hover:bg-[#38BDF8] hover:text-[#030303] transition-all"
            >
              Reload Platform
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
