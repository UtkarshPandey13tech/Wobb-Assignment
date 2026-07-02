import type { ReactNode } from "react";
import { Link } from "react-router-dom";

interface LayoutProps {
  children: ReactNode;
  title?: string;
}

export function Layout({ children, title }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col font-sans">
      <header className="sticky top-0 z-50 glass">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold tracking-tight text-gradient flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-indigo-500">
              <path fillRule="evenodd" d="M9.315 7.584C12.195 3.883 16.695 1.5 21.5 1.5a.75.75 0 0 1 .75.75c0 5.056-2.122 9.541-5.437 12.593l-2.029-2.029c2.47-2.316 4.153-5.632 4.673-9.336-3.805.474-7.228 2.05-9.67 4.385l-1.92-1.933ZM5.875 14.218a10.02 10.02 0 0 1 1.487-1.49l2.028 2.029a7.514 7.514 0 0 0-1.077 1.077l-2.438-1.616Z" clipRule="evenodd" />
              <path fillRule="evenodd" d="M1.5 21.5a.75.75 0 0 0 .75.75c5.056 0 9.541-2.122 12.593-5.437l-2.029-2.029c-2.316 2.47-5.632 4.153-9.336 4.673.474-3.805 2.05-7.228 4.385-9.67l-1.933-1.92a10.02 10.02 0 0 0-1.49 1.487l2.029 2.028a7.514 7.514 0 0 1 1.077-1.077l-1.616-2.438a12.016 12.016 0 0 0-4.432 12.569Z" clipRule="evenodd" />
            </svg>
            Vibe Coder
          </Link>
          <nav className="flex items-center gap-4">
            <Link to="/" className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
              Search
            </Link>
            {/* Can add 'My List' link here in future if needed */}
          </nav>
        </div>
      </header>

      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {title && (
          <div className="mb-8">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
              {title}
            </h1>
          </div>
        )}
        {children}
      </main>
    </div>
  );
}
