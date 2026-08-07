import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="p-8 text-center bg-red-50 text-red-800 rounded-lg border border-red-200 m-8">
          <h1 className="text-xl font-bold mb-4">Maaf, Terjadi Kesalahan (Runtime Error)</h1>
          <pre className="text-left text-sm overflow-auto p-4 bg-white rounded shadow">{this.state.error?.message}</pre>
          <button 
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded font-semibold"
            onClick={() => {
                localStorage.removeItem('socioedu_user');
                window.location.reload();
            }}
          >
            Bersihkan Cache & Muat Ulang Halaman
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
