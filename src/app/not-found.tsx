import Link from "next/link";

export default function NotFound() {
    return (
        <main className="mx-auto flex min-h-[60vh] max-w-2xl flex-col items-center justify-center px-6 text-center">
            <h1 className="font-serif text-4xl">Page not found</h1>
            <p className="mt-4 text-accent">
                The track you&rsquo;re looking for doesn&rsquo;t exist or may have moved.
            </p>
            <Link
                href="/"
                className="mt-6 underline decoration-primary/30 underline-offset-4 hover:decoration-primary"
            >
                Back to all tracks
            </Link>
        </main>
    );
}