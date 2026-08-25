import Link from "next/link";

type AuthSwitchLinkProps = {
  text: string;
  linkText: string;
  href: string;
};

export default function AuthSwitchLink({
  text,
  linkText,
  href,
}: AuthSwitchLinkProps) {
  return (
    <p className="text-center text-sm text-gray-500">
      {text}{" "}

      <Link
        href={href}
        className="font-semibold text-[#E60000] transition hover:text-[#B80000]"
      >
        {linkText}
      </Link>
    </p>
  );
}