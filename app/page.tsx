import { LandingCalendarPreview } from "@/features/landing/components/landing-calendar-preview";
import { DaySubscriptionsModal } from "@/features/subscriptions/components/day-subscriptions-modal";
import { DeleteSubscriptionDialog } from "@/features/subscriptions/components/delete-subscription-dialog";
import { SubscriptionsCalendarView } from "@/features/subscriptions/components/subscriptions-calendar-view";
import { CreateSubscriptionWizard } from "@/features/subscriptions/components/wizard/create-subscription-wizard";
import { subscriptionService } from "@/features/subscriptions/services/subscription.service";
import { getServerSession } from "@/lib/auth-server";

export default async function Home() {
  const session = await getServerSession();

  if (!session) return <LandingCalendarPreview />;

  const [error, subscriptions] = await subscriptionService.getUserSubscriptions(session.user.id);

  if (error) return null;

  return (
    <>
      <SubscriptionsCalendarView subscriptions={subscriptions} isAuthenticated={!!session} />
      <CreateSubscriptionWizard />
      <DaySubscriptionsModal subscriptions={subscriptions} />
      <DeleteSubscriptionDialog />
    </>
  );
}
