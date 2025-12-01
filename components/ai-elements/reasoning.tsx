"use client";

import * as React from "react";
import { ChevronDown, ChevronRight, Brain } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface ReasoningProps extends React.HTMLAttributes<HTMLDivElement> {
    duration?: number;
    isStreaming?: boolean;
}

const ReasoningContext = React.createContext<{
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
}>({
    isOpen: false,
    setIsOpen: () => { },
});

const Reasoning = React.forwardRef<HTMLDivElement, ReasoningProps>(
    ({ className, duration, isStreaming, children, ...props }, ref) => {
        const [isOpen, setIsOpen] = React.useState(false);

        return (
            <ReasoningContext.Provider value={{ isOpen, setIsOpen }}>
                <div
                    ref={ref}
                    className={cn("my-2 mb-4 border-l-2 border-zinc-800 pl-4", className)}
                    {...props}
                >
                    {children}
                </div>
            </ReasoningContext.Provider>
        );
    }
);
Reasoning.displayName = "Reasoning";

const ReasoningTrigger = React.forwardRef<
    HTMLButtonElement,
    React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, ...props }, ref) => {
    const { isOpen, setIsOpen } = React.useContext(ReasoningContext);

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
                <Brain className="h-3.5 w-3.5" />
            </div>
            <span className="font-medium">Reasoning process</span>
            {isOpen ? (
                <ChevronDown className="h-3 w-3" />
            ) : (
                <ChevronRight className="h-3 w-3" />
            )}
        </button>
    );
});
ReasoningTrigger.displayName = "ReasoningTrigger";

const ReasoningContent = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => {
    const { isOpen } = React.useContext(ReasoningContext);

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
                        className={cn(
                            "mt-2 rounded-md border border-zinc-800/50 bg-zinc-900/50 p-3 font-mono text-sm leading-relaxed text-zinc-400",
                            className
                        )}
                        {...props}
                    >
                        {children}
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
});
ReasoningContent.displayName = "ReasoningContent";

export { Reasoning, ReasoningTrigger, ReasoningContent };
