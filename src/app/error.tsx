"use client";

type ErrorProps = {
  error: Error;
  reset: () => void;
};

export default function Error({ error, reset }: ErrorProps) {
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="flex flex-col justify-center items-center border-2 border-[var(--border)] rounded-xl p-4">
        <h2>Internal Server Error</h2>
      </div>
    </div>
  );
}
