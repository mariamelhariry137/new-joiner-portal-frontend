interface WelcomeHeaderProps {
  firstName: string;
}

export function WelcomeHeader({ firstName }: WelcomeHeaderProps) {
  return (
    <div>
      <h1 className="text-3xl font-semibold tracking-tight">
        Welcome back, {firstName}
      </h1>
      <p className="text-muted-foreground mt-1.5">
        Here&apos;s where you stand in your onboarding journey.
      </p>
    </div>
  );
}