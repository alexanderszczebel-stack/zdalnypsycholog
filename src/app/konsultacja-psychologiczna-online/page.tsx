import AiIntentPage from "@/components/landing/AiIntentPage";
import { getAiLandingPage } from "@/data/aiLandingPages";
import { buildAiLandingMetadata } from "@/lib/aiLandingMetadata";

const page = getAiLandingPage("konsultacja-psychologiczna-online");

export const metadata = buildAiLandingMetadata(page);

export default function KonsultacjaPsychologicznaOnlinePage() {
  return <AiIntentPage page={page} />;
}
