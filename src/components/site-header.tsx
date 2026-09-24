import Link from "next/link";

export function SiteHeader() {
    return (
        <header className="border-b border-accent/15 px-6 py-3">
            <div className="mx-auto flex max-w-4xl items-center justify-between">
                <Link href="/" className="font-serif text-xl text-primary">
                    SkillTrack
                </Link>
                <Link href="/" className="text-sm text-accent hover:text-primary">
                    All tracks
                </Link>
            </div>
        </header>
    );
}