import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
    title: "How we pick resources",
    description:
        "Every resource on SkillTrack is chosen by hand against four criteria: current, reputable, free and practical.",
    path: "/how-we-pick",
});

const criteria = [
    {
        title: "Current",
        text: "Up to date with how the web works today. A great video from years ago can still be wrong now, so we check the date and the tools it uses.",
    },
    {
        title: "Reputable",
        text: "Made by recognized authors, teams and the official documentation, not by whoever ranks first in search results.",
    },
    {
        title: "Free & open",
        text: "Free to read or watch, with no paywall and no sign-up. If it needs your email to open, it does not make it into a track.",
    },
    {
        title: "Practical",
        text: "Focused on building real things. Theory is included where it is needed to understand the practice, not for its own sake.",
    },
];

const leftOut = [
    "Paid courses and anything behind a paywall or sign-up wall",
    "Outdated material that teaches tools or habits the industry has moved on from",
    "Resources added just to make a track look longer",
];

export default function HowWePickPage() {
    return (
        <main>
            <header className="bg-dark px-6 py-6 text-on-dark">
                <div className="mx-auto max-w-4xl">
                    <h1 className="font-serif text-3xl">How we pick resources</h1>
                    <p className="mt-2 max-w-lg text-base text-on-dark-muted">
                        Nothing is added just to fill a track. If there is no good resource
                        for a topic, there is no track for it yet.
                    </p>
                </div>
            </header>

            <div className="mx-auto max-w-4xl px-6 py-8">
                <section aria-labelledby="criteria-heading">
                    <h2 id="criteria-heading" className="font-serif text-2xl">
                        Four criteria
                    </h2>
                    <p className="mt-2 max-w-2xl text-accent">
                        Every lesson in every track is checked by hand against these four
                        points before it is added.
                    </p>

                    <ul className="mt-6 grid gap-6 sm:grid-cols-2">
                        {criteria.map((item) => (
                            <li key={item.title}>
                                <h3 className="font-serif text-lg">{item.title}</h3>
                                <p className="mt-1 text-sm text-accent">{item.text}</p>
                            </li>
                        ))}
                    </ul>
                </section>

                <section aria-labelledby="left-out-heading" className="mt-10">
                    <h2 id="left-out-heading" className="font-serif text-2xl">
                        What we leave out
                    </h2>
                    <ul className="mt-4 max-w-2xl list-disc space-y-2 pl-5 text-accent">
                        {leftOut.map((item) => (
                            <li key={item}>{item}</li>
                        ))}
                    </ul>
                </section>

                <section aria-labelledby="left-out-heading" className="mt-10">
                    <h2 id="left-out-heading" className="font-serif text-2xl">
                        What we leave out
                    </h2>
                    <ul className="mt-4 max-w-2xl list-disc space-y-2 pl-5 text-accent">
                        {leftOut.map((item) => (
                            <li key={item}>{item}</li>
                        ))}
                    </ul>
                </section>
            </div>
        </main>
    );
}