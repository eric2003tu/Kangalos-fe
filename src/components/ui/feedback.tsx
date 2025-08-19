interface LoadingSpinnerProps {
  message?: string;
  size?: 'small' | 'medium' | 'large';
}

export const LoadingSpinner = ({
  message = "Loading...",
  size = 'medium'
}: LoadingSpinnerProps) => {
  const sizeClasses = {
    small: 'h-6 w-6',
    medium: 'h-12 w-12',
    large: 'h-16 w-16'
  };

  return (
    <div className="flex items-center justify-center p-8">
      <div className="text-center">
        <div className={`animate-spin rounded-full border-b-2 border-blue-600 mx-auto ${sizeClasses[size]}`}></div>
        <p className="mt-2 text-sm text-gray-600">{message}</p>
      </div>
    </div>
  );
};

interface ErrorDisplayProps {
  error: Error;
  onRetry?: () => void;
  title?: string;
}

export const ErrorDisplay = ({
  error,
  onRetry,
  title = "Error loading data"
}: ErrorDisplayProps) => (
  <div className="flex items-center justify-center p-8">
    <div className="text-center">
      <div className="text-red-600 mb-4">
        <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.464 0L4.35 15.5c-.77.833.192 2.5 1.732 2.5z" />
        </svg>
        <p className="font-medium mt-2">{title}</p>
        <p className="text-sm text-gray-500 mt-1">{error.message}</p>
      </div>
      {onRetry && (
        <button
          onClick={onRetry}
          className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
        >
          Try Again
        </button>
      )}
    </div>
  </div>
);

interface EmptyStateProps {
  title?: string;
  description?: string;
  icon?: React.ReactNode;
}

export const EmptyState = ({
  title = "No data found",
  description = "There is no data to display.",
  icon
}: EmptyStateProps) => {
  const defaultIcon = (
    <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
    </svg>
  );

  return (
    <div className="flex items-center justify-center p-8">
      <div className="text-center text-gray-500">
        {icon || defaultIcon}
        <p className="font-medium mt-2">{title}</p>
        <p className="text-sm mt-1">{description}</p>
      </div>
    </div>
  );
};
