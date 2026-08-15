import AiIntentPage from "@/components/landing/AiIntentPage";
import { getAiLandingPage } from "@/data/aiLandingPages";
import { buildAiLandingMetadata } from "@/lib/aiLandingMetadata";

const page = getAiLandingPage("psycholog-online-adhd-koncentracja");

export const metadata = buildAiLandingMetadata(page);

export default function PsychologOnlineAdhdKoncentracjaPage() {
  return <AiIntentPage page={page} />;
}
