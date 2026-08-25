type SubmitButtonProps = {
  loading: boolean;
  text: string;
  loadingText: string;
};

export default function SubmitButton({
  loading,
  text,
  loadingText,
}: SubmitButtonProps) {
  return (
    <button
      type="submit"
      disabled={loading}
      className="w-full rounded-xl bg-[#E60000] px-5 py-3.5 font-bold text-white shadow-sm transition duration-200 hover:bg-[#C80000] hover:shadow-md focus:outline-none focus:ring-4 focus:ring-[#E60000]/20 disabled:cursor-not-allowed disabled:opacity-60"
    >
      {loading ? loadingText : text}
    </button>
  );
}