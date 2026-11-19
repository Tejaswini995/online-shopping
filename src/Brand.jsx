export default function Brand() {
  return (
    <>
      <span className="brand-mark" aria-hidden="true">
        <svg viewBox="0 0 40 40" focusable="false">
          <path d="M20 3C23.5 13 27 16.5 37 20C27 23.5 23.5 27 20 37C16.5 27 13 23.5 3 20C13 16.5 16.5 13 20 3Z" />
          <circle cx="20" cy="20" r="2" />
        </svg>
      </span>
      <span className="brand-wordmark">
        Gray<span className="brand-wordmark-accent">Matter</span>
      </span>
    </>
  );
}
