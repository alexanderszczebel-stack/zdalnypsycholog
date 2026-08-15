import AiIntentPage from "@/components/landing/AiIntentPage";
import { getAiLandingPage } from "@/data/aiLandingPages";
import { buildAiLandingMetadata } from "@/lib/aiLandingMetadata";

const page = getAiLandingPage("psycholog-online-relacje");

export const metadata = buildAiLandingMetadata(page);

export default function PsychologOnlineRelacjePage() {
  return <AiIntentPage page={page} />;
}
