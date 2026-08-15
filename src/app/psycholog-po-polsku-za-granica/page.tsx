import AiIntentPage from "@/components/landing/AiIntentPage";
import { getAiLandingPage } from "@/data/aiLandingPages";
import { buildAiLandingMetadata } from "@/lib/aiLandingMetadata";

const page = getAiLandingPage("psycholog-po-polsku-za-granica");

export const metadata = buildAiLandingMetadata(page);

export default function PsychologPoPolskuZaGranicaPage() {
  return <AiIntentPage page={page} />;
}
