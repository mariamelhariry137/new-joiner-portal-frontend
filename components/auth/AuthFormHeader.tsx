type AuthFormHeaderProps = {
  eyebrow?: string;
  title: string;
  description: string;
};

export default function AuthFormHeader({
  eyebrow,
  title,
  description,
}: AuthFormHeaderProps) {
  return (
    <div className="mb-8">
      {eyebrow && (
        <p className="mb-2 text-sm font-bold uppercase tracking-[0.15em] text-[#E60000]">
          {eyebrow}
        </p>
      )}

      <h1 className="text-3xl font-bold tracking-tight text-[#25282B]">
        {title}
      </h1>

      <p className="mt-3 text-sm leading-6 text-[#54575A]">
        {description}
      </p>
    </div>
  );
}