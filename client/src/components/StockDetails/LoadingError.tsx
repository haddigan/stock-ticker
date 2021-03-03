export const LoadingError = ({
  onRetry: handleRetry,
}: {
  onRetry?: () => void;
}) => {
  return (
    <div>
      <p>Something went wrong.</p>
      {handleRetry && (
        <div>
          <button onClick={handleRetry}>Retry?</button>
        </div>
      )}
    </div>
  );
};
