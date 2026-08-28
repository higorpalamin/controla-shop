import React from "react";
import { LucideIcon } from "lucide-react";

interface MetricCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  badge?: {
    text: string;
    variant: "positive" | "negative" | "warning" | "neutral" | "info";
  };
  icon: LucideIcon;
  variant?: "primary" | "medium" | "green" | "warning" | "danger" | "neutral";
  footer?: React.ReactNode;
}

export default function MetricCard({
  title,
  value,
  subtitle,
  badge,
  icon: Icon,
  variant = "primary",
  footer,
}: MetricCardProps) {
  const getVariantStyles = () => {
    switch (variant) {
      case "primary":
        return {
          iconBg:
            "bg-controla-primary/10 text-controla-primary border-controla-primary/20",
          cardBorder: "hover:border-controla-primary/40",
          highlight: "bg-controla-primary",
        };
      case "medium":
        return {
          iconBg:
            "bg-controla-medium/10 text-controla-medium border-controla-medium/20",
          cardBorder: "hover:border-controla-medium/40",
          highlight: "bg-controla-medium",
        };
      case "green":
        return {
          iconBg:
            "bg-emerald-50 text-emerald-600 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-400 dark:border-emerald-800",
          cardBorder: "hover:border-emerald-300",
          highlight: "bg-emerald-500",
        };
      case "warning":
        return {
          iconBg:
            "bg-amber-50 text-amber-600 border-amber-200 dark:bg-amber-950/40 dark:text-amber-400 dark:border-amber-800",
          cardBorder: "hover:border-amber-300",
          highlight: "bg-amber-500",
        };
      case "danger":
        return {
          iconBg:
            "bg-rose-50 text-rose-600 border-rose-200 dark:bg-rose-950/40 dark:text-rose-400 dark:border-rose-800",
          cardBorder: "hover:border-rose-300",
          highlight: "bg-rose-500",
        };
      default:
        return {
          iconBg: "bg-gray-100 text-gray-700 border-gray-200",
          cardBorder: "hover:border-gray-300",
          highlight: "bg-gray-400",
        };
    }
  };

  const styles = getVariantStyles();

  const getBadgeClass = (v: MetricCardProps["badge"]) => {
    if (!v) return "";
    switch (v.variant) {
      case "positive":
        return "bg-emerald-100 text-emerald-800 border-emerald-200 dark:bg-emerald-950/60 dark:text-emerald-300";
      case "negative":
        return "bg-rose-100 text-rose-800 border-rose-200 dark:bg-rose-950/60 dark:text-rose-300";
      case "warning":
        return "bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-950/60 dark:text-amber-300";
      case "info":
        return "bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-950/60 dark:text-blue-300";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-800 dark:text-gray-200";
    }
  };

  return (
    <div
      className={`group relative overflow-hidden rounded-2xl border border-gray-200/80 bg-white p-5 shadow-xs transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md dark:border-gray-800 dark:bg-gray-900 ${styles.cardBorder}`}
    >
      {/* Barra de destaque superior sutil */}
      <div
        className={`absolute top-0 left-0 right-0 h-1 opacity-80 ${styles.highlight}`}
      />

      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 space-y-1">
          <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
            {title}
          </p>
          <div className="flex items-baseline gap-2">
            <h3 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
              {value}
            </h3>
          </div>
          {subtitle && (
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {subtitle}
            </p>
          )}
        </div>

        <div
          className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-xl border shadow-xs transition-transform duration-200 group-hover:scale-105 ${styles.iconBg}`}
        >
          <Icon className="h-4 w-4" />
        </div>
      </div>

      {footer && (
        <div className="mt-3 border-t border-gray-100 pt-3 dark:border-gray-800/80">
          {footer}
        </div>
      )}
    </div>
  );
}
