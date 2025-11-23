"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import ReactMarkdown from "react-markdown";

interface MessageProps extends React.HTMLAttributes<HTMLDivElement> {
    from?: "user" | "assistant";
    role?: string;
    avatarUrl?: string | null | undefined;
}

const Message = React.forwardRef<HTMLDivElement, MessageProps>(
    ({ className, from, role, avatarUrl, children, ...props }, ref) => {
        const isUser = from === "user" || role === "user";
        return (
            <div
                ref={ref}
                className={cn(
                    "group flex w-full",
                    isUser ? "is-user justify-end" : "is-assistant justify-start",
                    className
                )}
                {...props}
            >
                {children}
            </div>
        );
    }
);
Message.displayName = "Message";

const MessageContent = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
    return (
        <div
            ref={ref}
            className={cn("relative max-w-[80%] rounded-3xl px-5 py-2.5", className)}
            {...props}
        />
    );
});
MessageContent.displayName = "MessageContent";

const MessageResponse = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => {
    return (
        <div
            ref={ref}
            className={cn("prose dark:prose-invert max-w-none", className)}
            {...props}
        >
            {typeof children === "string" ? (
                <ReactMarkdown>{children}</ReactMarkdown>
            ) : (
                children
            )}
        </div>
    );
});
MessageResponse.displayName = "MessageResponse";

export { Message, MessageContent, MessageResponse };
