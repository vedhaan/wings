import { waLink, type Audience } from "@/lib/site";

type Props = {
  audience?: Audience;
  label?: string;
  extra?: string;
  className?: string;
  compact?: boolean;
  pulse?: boolean;
};

export default function WhatsAppButton({
  audience = "general",
  label = "Chat on WhatsApp",
  extra,
  className = "",
  compact = false,
  pulse = false,
}: Props) {
  const button = (
    <a
      href={waLink(audience, extra)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className={`relative inline-flex shrink-0 items-center justify-center gap-2 rounded-full border-2 border-wing-navy bg-wing-sun font-display text-sm font-bold text-white shadow-pop-sm transition-all hover:-translate-y-0.5 hover:shadow-pop active:translate-y-0 active:shadow-none ${
        compact
          ? "h-11 w-11 sm:h-auto sm:w-auto sm:px-5 sm:py-2.5"
          : "px-5 py-2.5"
      } ${className}`}
    >
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        className="h-5 w-5 fill-current"
      >
        <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38a9.9 9.9 0 0 0 4.74 1.21h.01c5.46 0 9.91-4.45 9.91-9.91A9.85 9.85 0 0 0 12.04 2Zm0 18.15h-.01a8.2 8.2 0 0 1-4.18-1.14l-.3-.18-3.12.82.83-3.04-.2-.31a8.2 8.2 0 0 1-1.26-4.39c0-4.54 3.7-8.24 8.25-8.24a8.2 8.2 0 0 1 8.23 8.25c0 4.54-3.7 8.23-8.24 8.23Zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.12-.16.25-.64.81-.78.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-2-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.02-.38.11-.5.11-.11.25-.29.37-.43.12-.15.16-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.4-.42-.56-.42h-.48c-.17 0-.43.06-.66.31-.22.25-.86.85-.86 2.07 0 1.22.89 2.4 1.01 2.56.12.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.14-1.18-.06-.1-.22-.16-.47-.28Z" />
      </svg>
      <span className={compact ? "hidden sm:inline" : ""}>{label}</span>
    </a>
  );

  if (!pulse) return button;

  return (
    <span className="relative inline-flex">
      <span
        aria-hidden="true"
        className="absolute inset-0 animate-ping-soft rounded-full bg-wing-sun/60"
      />
      {button}
    </span>
  );
}