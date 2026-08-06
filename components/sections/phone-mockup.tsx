import { Check, Leaf, ScanLine, Users } from "lucide-react";

import { cn } from "@/lib/utils";

export function PhoneMockup({ className, variant = "care" }: { className?: string; variant?: "care" | "scan" | "community" }) {
  const isScan = variant === "scan";
  const isCommunity = variant === "community";

  return (
    <div className={cn("mx-auto w-full max-w-[280px]", className)}>
      <div className="rounded-4xl border border-white/15 bg-zinc-950 p-2 shadow-2xl shadow-black">
        <div className="relative overflow-hidden rounded-[1.55rem] border border-white/10 bg-[#071007]">
          <div className="absolute left-1/2 top-2 z-10 h-5 w-24 -translate-x-1/2 rounded-full bg-black" />
          <div className="min-h-[520px] bg-[radial-gradient(circle_at_50%_10%,rgba(34,197,94,.38),transparent_28%),linear-gradient(180deg,#071007,#0b0b0b)] p-5 pt-12">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-white/48">PlantPal</p>
                <h3 className="font-display text-xl font-semibold text-white">
                  {isScan ? "AI Scan" : isCommunity ? "Greenhouse" : "Monstera"}
                </h3>
              </div>
              <div className="flex size-10 items-center justify-center rounded-md bg-emerald-400/15 text-emerald-200">
                {isScan ? <ScanLine className="size-5" /> : isCommunity ? <Users className="size-5" /> : <Leaf className="size-5" />}
              </div>
            </div>
            <div className="mt-8 rounded-lg border border-emerald-300/20 bg-emerald-300/10 p-4">
              <div className="aspect-square rounded-md bg-[radial-gradient(circle_at_45%_25%,#8ef5aa,transparent_14%),radial-gradient(circle_at_52%_56%,#22c55e,transparent_36%),linear-gradient(135deg,#14331b,#071007)]" />
              <div className="mt-4 flex items-center justify-between text-xs text-white/62">
                <span>{isScan ? "Recognition confidence" : "Care score"}</span>
                <span className="font-semibold text-emerald-200">{isScan ? "98.4%" : "92%"}</span>
              </div>
            </div>
            <div className="mt-5 grid gap-3">
              {["Water in 2 days", "Bright indirect light", "Leaf health stable"].map((item) => (
                <div key={item} className="flex items-center gap-3 rounded-md border border-white/10 bg-white/5 p-3">
                  <span className="flex size-6 items-center justify-center rounded-full bg-emerald-400/15 text-emerald-200">
                    <Check className="size-3.5" />
                  </span>
                  <span className="text-xs text-white/72">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
