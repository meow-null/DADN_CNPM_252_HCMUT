import React from 'react';

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ errorInfo });
    console.error('ErrorBoundary caught:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-8 bg-rose-50/80 text-rose-700 m-4 rounded-2xl border border-rose-200 backdrop-blur-sm max-w-xl mx-auto shadow-sm">
          <h4 className="font-extrabold text-base mb-2 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping"></span>
            Lỗi giao diện React (UI Crash)
          </h4>
          <p className="text-xs font-semibold text-rose-600 mb-2"><b>Chi tiết lỗi:</b> {this.state.error?.toString()}</p>
          <pre className="text-[10px] font-mono p-3 bg-white/60 border rounded-xl overflow-x-auto max-h-40 whitespace-pre-wrap">
            {this.state.errorInfo?.componentStack}
          </pre>
        </div>
      );
    }
    return this.props.children;
  }
}
