"use client";

import * as React from "react";
import { ExternalLink, ChevronDown, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const SourcesContext = React.createContext<{
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
}>({
    isOpen: false,
    setIsOpen: () => { },
});

const Sources = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => {
    const [isOpen, setIsOpen] = React.useState(false);

    return (
        <SourcesContext.Provider value={{ isOpen, setIsOpen }}>
            <div
                ref={ref}
                className={cn("my-2 mb-4 border-l-2 border-zinc-800 pl-4", className)}
                {...props}
            >
                {children}
            </div>
        </SourcesContext.Provider>
    );
});
Sources.displayName = "Sources";

interface SourcesTriggerProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    count: number;
}

const SourcesTrigger = React.forwardRef<HTMLButtonElement, SourcesTriggerProps>(
    ({ className, count, ...props }, ref) => {
        const { isOpen, setIsOpen } = React.useContext(SourcesContext);

        return (
            <button
                ref={ref}
                onClick={() => setIsOpen(!isOpen)}
                className={cn(
                    "group flex items-center gap-2 text-sm text-zinc-400 transition-colors hover:text-zinc-200",
                    className
                )}
                {...props}
            >
                <div className="rounded-md bg-zinc-800 p-1 transition-colors group-hover:bg-zinc-700">
                    <ExternalLink className="h-3.5 w-3.5" />
                </div>
                <span className="font-medium">{count} source{count !== 1 ? 's' : ''}</span>
                {isOpen ? (
                    <ChevronDown className="h-3 w-3" />
                ) : (
                    <ChevronRight className="h-3 w-3" />
                )}
            </button>
        );
    }
);
SourcesTrigger.displayName = "SourcesTrigger";

const SourcesContent = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => {
    const { isOpen } = React.useContext(SourcesContext);

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                >
                    <div
                        ref={ref}
                        className={cn("mt-2 flex flex-col gap-2", className)}
                        {...props}
                    >
                        {children}
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
});
SourcesContent.displayName = "SourcesContent";

interface SourceProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
    title: string;
}

const Source = React.forwardRef<HTMLAnchorElement, SourceProps>(
    ({ className, title, href, ...props }, ref) => {
        return (
            <a
                ref={ref}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                    "group flex items-center gap-2 rounded-md border border-zinc-800 bg-zinc-900/50 p-3 text-sm transition-colors hover:bg-zinc-800",
                    className
                )}
                {...props}
            >
                <ExternalLink className="h-4 w-4 flex-shrink-0 text-zinc-400" />
                <span className="flex-1 truncate font-medium text-zinc-100">
                    {title}
                </span>
            </a>
        );
    }
);
Source.displayName = "Source";

export { Sources, SourcesTrigger, SourcesContent, Source };
