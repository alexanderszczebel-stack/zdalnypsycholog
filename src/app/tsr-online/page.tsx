import AiIntentPage from "@/components/landing/AiIntentPage";
import { getAiLandingPage } from "@/data/aiLandingPages";
import { buildAiLandingMetadata } from "@/lib/aiLandingMetadata";

const page = getAiLandingPage("tsr-online");

export const metadata = buildAiLandingMetadata(page);

export default function TsrOnlinePage() {
  return <AiIntentPage page={page} />;
}
