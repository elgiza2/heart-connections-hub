/** @doc Mobile /pricing — Manus-style minimal upgrade sheet.
 *  Single plan (Megsy Pro): sparkle mark · serif title · white feature card
 *  with icon rows · two billing option cards · fine print · CTA · legal links.
 */
import { useEffect, useMemo, useState } from "react";
import {
  Sparkles,
  MonitorSmartphone,
  Timer,
  Bot,
  Search,
  Infinity as InfinityIcon,
} from "lucide-react";
import { Link } from "react-router-dom";

import { MobileSidebarButton } from "@/components/shared/MobileSidebarButton";
import { useUserLang } from "@/lib/authI18n";
import { getDisplayPrice, getPlan, type PlanTier } from "@/data/pricingData";
function useIsLightTheme() {
  const [light, setLight] = useState(
    typeof document !== "undefined" &&
      document.documentElement.getAttribute("data-theme") === "light",
  );
  useEffect(() => {
    const el = document.documentElement;
    const update = () => setLight(el.getAttribute("data-theme") === "light");
    const obs = new MutationObserver(update);
    obs.observe(el, { attributes: true, attributeFilter: ["data-theme"] });
    update();
    return () => obs.disconnect();
  }, []);
  return light;
}

interface Props {
  isYearly: boolean;
  onToggleYearly: (yearly: boolean) => void;
  onSubscribe: (tier: PlanTier) => void;
  loadingTier?: PlanTier | null;
  onMenuClick?: () => void;
}

export default function MobilePricingScreen({
  isYearly,
  onToggleYearly,
  onSubscribe,
  loadingTier,
  onMenuClick,
}: Props) {
  const lang = useUserLang();
  const isAr = lang === "ar";
  const isLight = useIsLightTheme();
  const isLoading = loadingTier === "pro";

  const features = useMemo(
    () =>
      isAr
        ? [
            { icon: Sparkles, text: "240 رصيد Megsy (MC) شهرياً" },
            { icon: MonitorSmartphone, text: "كمبيوتر سحابي — متصفح وسطح مكتب حقيقي يعمل لأجلك" },
            { icon: Timer, text: "مهام طويلة حتى 4 ساعات، تكمل حتى وأنت offline" },
            { icon: Bot, text: "3 وكلاء يعملون في الخلفية بالتوازي" },
            { icon: Search, text: "بحث عميق بتقارير موثّقة بالمصادر" },
            { icon: InfinityIcon, text: "دردشة وتوليد صور بلا حدود" },
          ]
        : [
            { icon: Sparkles, text: "240 Megsy Credits (MC) every month" },
            { icon: MonitorSmartphone, text: "Cloud Computer — a real browser & desktop working for you" },
            { icon: Timer, text: "Long-running tasks up to 4 hours, even while offline" },
            { icon: Bot, text: "3 background agents working in parallel" },
            { icon: Search, text: "Deep Research with citation-backed reports" },
            { icon: InfinityIcon, text: "Unlimited chat & image generation" },
          ],
    [isAr],
  );

  const t = isAr
    ? {
        title: "قم بالترقية إلى Megsy Pro",
        monthly: "شهرياً",
        yearly: "سنوياً",
        introBadge: "خصم 65% على الشهر الأول",
        yearlyBadge: "4 أشهر مجاناً",
        perMonth: "/شهر",
        perYear: "/سنة",
        fine: "$7.00 للشهر الأول، ثم $20.00/شهر. يمكنك الإلغاء في أي وقت.",
        cta: "قم بالترقية الآن",
        terms: "الشروط",
        privacy: "الخصوصية",
        restore: "استعادة",
      }
    : {
        title: "Upgrade to Megsy Pro",
        monthly: "Monthly",
        yearly: "Yearly",
        introBadge: "65% off the first month",
        yearlyBadge: "4 months free",
        perMonth: "/mo",
        perYear: "/yr",
        fine: "$7.00 for the first month, then $20.00/month. Cancel anytime.",
        cta: "Upgrade now",
        terms: "Terms",
        privacy: "Privacy",
        restore: "Restore",
      };

  const pro = getPlan("pro")!;
  const monthly = getDisplayPrice(pro, false);
  const yearly = getDisplayPrice(pro, true);

  const c = isLight
    ? {
        text: "#0a0a0a",
        muted: "#6b7280",
        faint: "#9ca3af",
        card: "#ffffff",
        cardBorder: "rgba(0,0,0,0.08)",
        cardShadow: "0 1px 2px rgba(0,0,0,0.04), 0 8px 24px -12px rgba(0,0,0,0.08)",
        selBorder: "#0a0a0a",
        selBg: "rgba(0,0,0,0.025)",
        unselBorder: "rgba(0,0,0,0.10)",
        badgeBg: "#e8f1ff",
        badgeText: "#1d4ed8",
        icon: "#3f3f46",
      }
    : {
        text: "#f5f5f5",
        muted: "#a3a3a3",
        faint: "#737373",
        card: "rgba(255,255,255,0.05)",
        cardBorder: "rgba(255,255,255,0.10)",
        cardShadow: "0 1px 2px rgba(0,0,0,0.25), 0 8px 24px -12px rgba(0,0,0,0.4)",
        selBorder: "#f5f5f5",
        selBg: "rgba(255,255,255,0.06)",
        unselBorder: "rgba(255,255,255,0.14)",
        badgeBg: "rgba(96,165,250,0.16)",
        badgeText: "#93c5fd",
        icon: "#d4d4d8",
      };

  const options = [
    {
      yearly: false,
      label: t.monthly,
      badge: t.introBadge,
      price: monthly.price,
      strike: monthly.strike,
      unit: t.perMonth,
    },
    {
      yearly: true,
      label: t.yearly,
      badge: t.yearlyBadge,
      price: yearly.price,
      strike: yearly.strike,
      unit: t.perYear,
    },
  ] as const;

  return (
    <div
      dir={isAr ? "rtl" : "ltr"}
      className="relative flex h-[100dvh] w-full flex-col overflow-y-auto bg-background"
      style={{
        color: c.text,
        fontFamily: 'Inter, -apple-system, "SF Pro Text", system-ui, sans-serif',
      }}
    >
      <style>{`
        @keyframes mps-rise { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: none; } }
        .mps-rise { animation: mps-rise .5s cubic-bezier(.22,.61,.36,1) both; }
        @media (prefers-reduced-motion: reduce) { .mps-rise { animation: none; } }
      `}</style>

      {/* Header */}
      <header
        className="relative shrink-0 px-4"
        style={{ paddingTop: "calc(env(safe-area-inset-top, 0px) + 2px)" }}
      >
        <MobileSidebarButton
          onClick={() => onMenuClick?.()}
          ariaLabel="Menu"
          className="text-foreground"
        />
      </header>

      <div className="mx-auto flex w-full max-w-[400px] flex-1 flex-col px-5">
        {/* Sparkle mark */}
        <div className="mps-rise mt-3 flex justify-center" style={{ animationDelay: "10ms" }}>
          <Sparkles className="h-6 w-6" strokeWidth={1.5} style={{ color: c.text }} fill="currentColor" />
        </div>

        {/* Title */}
        <h1
          className="mps-rise mt-3 text-center text-[23px] font-normal leading-[1.15] tracking-[-0.01em]"
          style={{ animationDelay: "60ms", fontFamily: '"Instrument Serif", Georgia, serif' }}
        >
          {t.title}
        </h1>

        {/* Feature card */}
        <div
          className="mps-rise mt-4 rounded-2xl px-4 py-3.5"
          style={{
            animationDelay: "120ms",
            background: c.card,
            border: `1px solid ${c.cardBorder}`,
            boxShadow: c.cardShadow,
          }}
        >
          <ul className="flex flex-col gap-2.5">
            {features.map(({ icon: Icon, text }, i) => (
              <li key={text} className="flex items-center gap-3">
                <Icon className="h-[17px] w-[17px] shrink-0" strokeWidth={1.6} style={{ color: c.icon }} />
                <span className="text-[13px] leading-snug" style={{ color: c.text }}>
                  {text}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Billing options */}
        <div className="mps-rise mt-4 flex flex-col gap-2.5" style={{ animationDelay: "200ms" }}>
          {options.map((opt) => {
            const selected = isYearly === opt.yearly;
            return (
              <button
                key={opt.label}
                type="button"
                onClick={() => onToggleYearly(opt.yearly)}
                className="flex w-full items-center gap-3 rounded-xl px-3.5 py-2.5 text-start transition-all duration-200"
                style={{
                  background: selected ? c.selBg : c.card,
                  border: `${selected ? "1.5px" : "1px"} solid ${selected ? c.selBorder : c.unselBorder}`,
                  boxShadow: selected ? c.cardShadow : "none",
                }}
              >
                <span
                  className="flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full transition-colors"
                  style={{ border: `1.5px solid ${selected ? c.text : c.faint}` }}
                >
                  {selected && <span className="h-[9px] w-[9px] rounded-full" style={{ background: c.text }} />}
                </span>
                <span className="flex flex-1 flex-col gap-0.5">
                  <span className="flex items-center gap-2">
                    <span className="text-[13px] font-medium" style={{ color: c.text }}>
                      {opt.label}
                    </span>
                    <span
                      className="rounded-full px-1.5 py-[2px] text-[10px] font-medium leading-none"
                      style={{ background: c.badgeBg, color: c.badgeText }}
                    >
                      {opt.badge}
                    </span>
                  </span>
                  <span className="flex items-baseline gap-1.5 tabular-nums" dir="ltr">
                    <span className="text-[15px] font-semibold" style={{ color: c.text }}>
                      ${opt.price}
                    </span>
                    <span className="text-[11.5px]" style={{ color: c.muted }}>
                      {opt.unit}
                    </span>
                    <span className="text-[12px] line-through" style={{ color: c.faint }}>
                      ${opt.strike}
                    </span>
                  </span>
                </span>
              </button>
            );
          })}
        </div>

        {/* Fine print */}
        <p
          className="mps-rise mt-3 text-center text-[11px] leading-relaxed"
          style={{ animationDelay: "260ms", color: c.faint }}
        >
          {t.fine}
        </p>

        {/* CTA */}
        <div
          className="mps-rise mt-auto pt-3"
          style={{
            animationDelay: "320ms",
            paddingBottom: "calc(env(safe-area-inset-bottom, 0px) + 10px)",
          }}
        >
          <button
            type="button"
            data-sunset="true"
            onClick={() => onSubscribe("pro")}
            disabled={isLoading}
            className="btn-sunset flex h-[46px] w-full items-center justify-center rounded-xl px-6 text-[14.5px] font-semibold leading-none transition active:scale-[0.99] disabled:opacity-60"
          >
            {isLoading ? (
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-current/30 border-t-current" />
            ) : (
              t.cta
            )}
          </button>
          <nav
            className="mt-2.5 flex items-center justify-center text-[11.5px] leading-none"
            style={{ color: c.faint }}
            aria-label="Legal"
          >
            {([
              { to: "/terms", label: t.terms },
              { to: "/privacy", label: t.privacy },
              { to: "/restore", label: t.restore },
            ] as const).map((item, i) => (
              <span key={item.to} className="flex items-center">
                {i > 0 && <span aria-hidden className="mx-3 h-[10px] w-px" style={{ background: c.unselBorder }} />}
                <Link to={item.to} className="px-1 py-1 transition-opacity hover:opacity-100" style={{ color: c.faint }}>
                  {item.label}
                </Link>
              </span>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
}
