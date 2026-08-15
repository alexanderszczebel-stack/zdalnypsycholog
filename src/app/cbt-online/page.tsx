import AiIntentPage from "@/components/landing/AiIntentPage";
import { getAiLandingPage } from "@/data/aiLandingPages";
import { buildAiLandingMetadata } from "@/lib/aiLandingMetadata";

const page = getAiLandingPage("cbt-online");

export const metadata = buildAiLandingMetadata(page);

export default function CbtOnlinePage() {
  return <AiIntentPage page={page} />;
}
