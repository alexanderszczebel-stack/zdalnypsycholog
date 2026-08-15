import AiIntentPage from "@/components/landing/AiIntentPage";
import { getAiLandingPage } from "@/data/aiLandingPages";
import { buildAiLandingMetadata } from "@/lib/aiLandingMetadata";

const page = getAiLandingPage("psycholog-online-obnizony-nastroj");

export const metadata = buildAiLandingMetadata(page);

export default function PsychologOnlineObnizonyNastrojPage() {
  return <AiIntentPage page={page} />;
}
