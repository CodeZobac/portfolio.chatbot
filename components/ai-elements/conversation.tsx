"use client";

import * as React from "react";
import { ArrowDown } from "lucide-react";
import { cn } from "@/lib/utils";

const ConversationContext = React.createContext<{
    scrollRef: React.RefObject<HTMLDivElement | null>;
}>({
    scrollRef: { current: null },
});

const Conversation = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => {
    const scrollRef = React.useRef<HTMLDivElement>(null);

    return (
        <ConversationContext.Provider value={{ scrollRef }}>
            <div
                ref={ref}
                className={cn("relative flex flex-col", className)}
                {...props}
            >
                {children}
            </div>
        </ConversationContext.Provider>
    );
});
Conversation.displayName = "Conversation";

const ConversationContent = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => {
    const { scrollRef } = React.useContext(ConversationContext);

    return (
        <div
            ref={scrollRef}
            className={cn("flex-1 overflow-y-auto p-4", className)}
            {...props}
        >
            <div className="flex flex-col gap-4">{children}</div>
        </div>
    );
});
ConversationContent.displayName = "ConversationContent";

const ConversationScrollButton = React.forwardRef<
    HTMLButtonElement,
    React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, ...props }, ref) => {
    const { scrollRef } = React.useContext(ConversationContext);
    const [show, setShow] = React.useState(false);

    React.useEffect(() => {
        const element = scrollRef.current;
        if (!element) return;

        const handleScroll = () => {
            const { scrollTop, scrollHeight, clientHeight } = element;
            setShow(scrollHeight - scrollTop - clientHeight > 100);
        };

        element.addEventListener("scroll", handleScroll);
        return () => element.removeEventListener("scroll", handleScroll);
    }, [scrollRef]);

    const scrollToBottom = () => {
        const element = scrollRef.current;
        if (element) {
            element.scrollTo({ top: element.scrollHeight, behavior: "smooth" });
        }
    };

    if (!show) return null;

    return (
        <button
            ref={ref}
            onClick={scrollToBottom}
            className={cn(
                "absolute bottom-4 right-4 rounded-full bg-zinc-900 p-2 text-white shadow-lg transition-opacity hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200",
                className
            )}
            {...props}
        >
            <ArrowDown className="h-4 w-4" />
        </button>
    );
});
ConversationScrollButton.displayName = "ConversationScrollButton";

export { Conversation, ConversationContent, ConversationScrollButton };
