export const LoadingError = ({
  onRetry: handleRetry,
}: {
  onRetry?: () => void;
}) => {
  return (
    <div>
      <p>Something went wrong. You can try again in a few moments.</p>
      {handleRetry && (
        <div>
          <button onClick={handleRetry}>Retry?</button>
        </div>
      )}
    </div>
  );
};
