interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  text?: string;
}

export function Spinner({ size = 'md', text }: SpinnerProps) {
  return (
    <div className="spinner-container">
      <div className={`spinner spinner-${size}`} />
      {text && <p className="spinner-text">{text}</p>}
    </div>
  );
}
