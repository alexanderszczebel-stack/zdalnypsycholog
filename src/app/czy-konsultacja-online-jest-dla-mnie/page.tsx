import AiIntentPage from "@/components/landing/AiIntentPage";
import { getAiLandingPage } from "@/data/aiLandingPages";
import { buildAiLandingMetadata } from "@/lib/aiLandingMetadata";

const page = getAiLandingPage("czy-konsultacja-online-jest-dla-mnie");

export const metadata = buildAiLandingMetadata(page);

export default function CzyKonsultacjaOnlineJestDlaMniePage() {
  return <AiIntentPage page={page} />;
}
