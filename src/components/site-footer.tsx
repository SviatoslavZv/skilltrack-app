import { siteConfig } from "@/lib/site-config";

export function SiteFooter() {
    return (
        <footer className="bg-dark px-6 py-6 text-on-dark-muted">
            <div className="mx-auto flex max-w-4xl flex-col gap-6 text-sm sm:flex-row sm:justify-between">
                <div>
                    <p>SkillTrack is a free, ad-free collection of curated learning tracks.</p>
                    <p className="mt-2">
                        All linked resources belong to their original creators.
                    </p>
                </div>
                <div className="flex flex-col items-end gap-4 sm:gap-2">
                    <a
                        href="https://ko-fi.com/sviatoslavzv"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline decoration-on-dark-muted/40 underline-offset-2 hover:text-on-dark hover:decoration-on-dark"
                    >
                        Support this project
                    </a>
                    <a
                        href={siteConfig.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline decoration-on-dark-muted/40 underline-offset-2 hover:text-on-dark hover:decoration-on-dark"
                    >
                        View source on GitHub
                    </a>
                </div>
            </div>
        </footer>
    );
}