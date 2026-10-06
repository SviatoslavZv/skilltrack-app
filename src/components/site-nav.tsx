"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export interface NavLink {
    label: string;
    href: string;
    external?: boolean;
}

interface NavItemProps {
    link: NavLink;
    onClick?: () => void;
}

function NavItem({ link, onClick }: NavItemProps) {
    const className =
        "text-accent underline-offset-4 hover:text-primary hover:underline";

    if (link.external) {
        return (
            <a
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className={className}
                onClick={onClick}
            >
                {link.label} <span aria-hidden="true">↗</span>
            </a>
        );
    }

    return (
        <Link href={link.href} className={className} onClick={onClick}>
            {link.label}
        </Link>
    );
}

interface SiteNavProps {
    links: NavLink[];
}

export function SiteNav({ links }: SiteNavProps) {
    const [open, setOpen] = useState(false);

    useEffect(() => {
        if (!open) return;

        function handleKeyDown(event: KeyboardEvent) {
            if (event.key === "Escape") {
                setOpen(false);
            }
        }

        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, [open]);

    return (
        <>
            <nav aria-label="Main" className="hidden items-center gap-6 text-sm sm:flex">
                {links.map((link) => (
                    <NavItem key={link.href} link={link} />
                ))}
            </nav>

            <button
                type="button"
                aria-expanded={open}
                aria-controls="mobile-menu"
                aria-label={open ? "Close menu" : "Open menu"}
                onClick={() => setOpen(!open)}
                className="-mr-2 rounded-md p-2 text-primary hover:bg-primary/5 sm:hidden"
            >
                <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.75"
                    strokeLinecap="round"
                    aria-hidden="true"
                >
                    {open ? (
                        <path d="M6 6l12 12M18 6L6 18" />
                    ) : (
                        <path d="M4 7h16M4 12h16M4 17h16" />
                    )}
                </svg>
            </button>

            {open && (
                <nav
                    id="mobile-menu"
                    aria-label="Mobile"
                    className="absolute inset-x-0 top-full z-10 border-b border-accent/15 bg-background px-6 py-4 sm:hidden"
                >
                    <ul className="mx-auto flex max-w-4xl flex-col gap-4 text-base">
                        {links.map((link) => (
                            <li key={link.href}>
                                <NavItem link={link} onClick={() => setOpen(false)} />
                            </li>
                        ))}
                    </ul>
                </nav>
            )}
        </>
    );
}