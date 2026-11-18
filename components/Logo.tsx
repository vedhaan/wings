import Image from "next/image";
import Link from "next/link";

type Props = {
    variant?: "plain" | "badge";
    className?: string;
};

export default function Logo({ variant = "plain", className = "" }: Props) {
    const img = (
        <Image
            src="/images/wings-logo.png"
            alt="WINGS"
            width={190}
            height={69}
            priority
            className="h-8 w-auto max-w-none shrink-0 object-contain sm:h-11"
        />
    );

    return (
        <Link
            href="/"
            aria-label="WINGS home"
            className={`inline-flex shrink-0 ${className}`}
        >
            {variant === "badge" ? (
                <span className="inline-flex rounded-full border-2 border-wing-navy bg-wing-cream px-4 py-1.5 shadow-pop-sm">
                    {img}
                </span>
            ) : (
                img
            )}
        </Link>
    );
}