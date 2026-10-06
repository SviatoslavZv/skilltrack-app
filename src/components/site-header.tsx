import Link from "next/link";
import { getDirections } from "@/lib/storyblok-queries";
import { siteConfig } from "@/lib/site-config";
import { SiteNav } from "@/components/site-nav";
import type { NavLink } from "@/components/site-nav";

export async function SiteHeader() {
    const directions = await getDirections();

    const links: NavLink[] = [
        ...directions.map((direction) => ({
            label: direction.content.title,
            href: `/directions/${direction.slug}`,
        })),
        { label: "GitHub", href: siteConfig.githubUrl, external: true },
    ];

    return (
        <header className="relative border-b border-accent/15 px-6 py-3">
            <div className="mx-auto flex max-w-4xl items-center justify-between">
                <Link href="/" className="font-serif text-xl text-primary">
                    SkillTrack
                </Link>
                <SiteNav links={links} />
            </div>
        </header>
    );
}