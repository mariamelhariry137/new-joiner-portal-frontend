type FeatureItemProps = {
  title: string;
  description: string;
};

function FeatureItem({
  title,
  description,
}: FeatureItemProps) {
  return (
    <div className="flex items-center gap-4 rounded-xl border border-white/10 bg-white/5 p-4">
      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#E60000]/15 text-[#E60000]">
        ✓
      </div>

      <div>
        <p className="text-sm font-semibold text-white">
          {title}
        </p>

        <p className="text-xs text-gray-400">
          {description}
        </p>
      </div>
    </div>
  );
}

export default function AuthBrandPanel() {
  return (
    <section className="relative hidden min-h-[700px] overflow-hidden bg-[#111111] p-12 text-white lg:flex lg:flex-col lg:justify-between">
      {/* Decorative circle */}
      <div className="absolute -right-32 -top-32 h-80 w-80 rounded-full border-[50px] border-[#E60000]/20" />

      {/* Logo */}
      <div className="relative z-10">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#E60000] text-xl font-bold text-white shadow-lg">
            V
          </div>

          <div>
            <p className="text-xl font-bold tracking-wide">
              VOIS
            </p>

            <p className="text-xs text-gray-400">
              New Joiner Portal
            </p>
          </div>
        </div>
      </div>

      {/* Welcome message */}
      <div className="relative z-10">
        <p className="mb-4 text-sm font-semibold uppercase tracking-[0.25em] text-[#E60000]">
          Welcome aboard
        </p>

        <h2 className="max-w-md text-4xl font-bold leading-tight">
          Welcome to VOIS.

          <span className="mt-2 block text-[#E60000]">
            Your journey starts here.
          </span>
        </h2>

        <p className="mt-6 max-w-md text-base leading-7 text-gray-400">
          Your New Joiner Portal gives you everything you need
          to start your journey, learn about your organization,
          complete onboarding tasks, and stay connected with
          your team.
        </p>

        <div className="mt-10 space-y-4">
          <FeatureItem
            title="Complete your onboarding"
            description="Follow your onboarding tasks step by step."
          />

          <FeatureItem
            title="Discover your company"
            description="Access useful information and resources."
          />

          <FeatureItem
            title="Connect with your team"
            description="Find the people who can help you get started."
          />
        </div>
      </div>

      {/* Bottom text */}
      <div className="relative z-10 border-l-2 border-[#E60000] pl-4">
        <p className="text-sm leading-6 text-gray-400">
          Everything you need for your first days at VOIS,
          all in one place.
        </p>
      </div>
    </section>
  );
}