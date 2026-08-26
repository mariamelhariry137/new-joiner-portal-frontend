import Image from 'next/image';
export default function AuthMobileBrand() {
  return (
    <div className="mb-8 flex items-center gap-3 lg:hidden">
      <Image
        src="/logo.png"
        alt="VOIS"
        width={48}
        height={48}
        className="rounded-full"
      />

      <div>
        <p className="font-bold text-gray-950">
          VOIS
        </p>

        <p className="text-xs text-gray-500">
          New Joiner Portal
        </p>
      </div>
    </div>
  );
}