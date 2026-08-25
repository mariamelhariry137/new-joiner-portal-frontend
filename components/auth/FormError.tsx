type FormErrorProps = {
  message?: string;
};

export default function FormError({
  message,
}: FormErrorProps) {
  if (!message) {
    return null;
  }

  return (
    <div
      role="alert"
      className="flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3"
    >
      <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#E60000] text-xs font-bold text-white">
        !
      </div>

      <p className="text-sm text-red-700">
        {message}
      </p>
    </div>
  );
}