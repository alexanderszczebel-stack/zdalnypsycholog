"use client";
import { PopupButton } from "react-calendly";
import { useEffect, useState } from "react";

export default function CalendlyButton({ text, className }: { text: string; className?: string }) {
  const [ready, setReady] = useState(false);
  useEffect(() => { setReady(true); }, []);
  if (!ready) return null;
  return (
    <PopupButton
      url="https://calendly.com/szczebelm/konsultacja-psychologiczna"
      rootElement={document.getElementById("root") ?? document.body}
      text={text}
      className={className}
    />
  );
}
