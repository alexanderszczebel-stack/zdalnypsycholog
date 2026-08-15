import AiIntentPage from "@/components/landing/AiIntentPage";
import { getAiLandingPage } from "@/data/aiLandingPages";
import { buildAiLandingMetadata } from "@/lib/aiLandingMetadata";

const page = getAiLandingPage("psycholog-online-samoocena");

export const metadata = buildAiLandingMetadata(page);

export default function PsychologOnlineSamoocenaPage() {
  return <AiIntentPage page={page} />;
}
