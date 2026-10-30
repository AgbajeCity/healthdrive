import NotAvailableNotice from "@/components/NotAvailableNotice";

const OnboardingComplete = () => (
  <NotAvailableNotice
    title="Account setup"
    notice="Account creation is not open yet."
    path="/onboarding/complete"
  />
);

export default OnboardingComplete;
