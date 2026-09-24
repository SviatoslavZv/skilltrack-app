export function SiteFooter() {
    return (
        <footer className="bg-dark px-6 py-6 text-on-dark-muted">
            <div className="mx-auto flex max-w-4xl justify-between text-sm">
                <div>
                    <p>SkillTrack is a free, ad-free collection of curated learning tracks.</p>
                    <p className="mt-2">
                        All linked resources belong to their original creators.
                    </p>
                </div>
                <div className="text-right">

                    <a
                        href="https://ko-fi.com/YOUR_USERNAME"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline decoration-on-dark-muted/40 underline-offset-2 hover:text-on-dark hover:decoration-on-dark"
                    >
                        Support this project
                    </a>
                    <p className="mt-2">

                        <a
                            href="https://github.com/SviatoslavZv/skilltrack-app"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="underline decoration-on-dark-muted/40 underline-offset-2 hover:text-on-dark hover:decoration-on-dark"
                        >
                            View source on GitHub
                        </a>
                    </p>
                </div>
            </div>
        </footer>
    );
}