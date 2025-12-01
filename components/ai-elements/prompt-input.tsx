"use client";

import * as React from "react";
import * as SelectPrimitive from "@radix-ui/react-select";
import { Check, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export interface PromptInputMessage {
    text?: string;
    files?: File[];
}

interface PromptInputProps extends Omit<React.HTMLAttributes<HTMLFormElement>, "onSubmit"> {
    onSubmit: (message: PromptInputMessage) => void;
}

const PromptInput = React.forwardRef<HTMLFormElement, PromptInputProps>(
    ({ className, onSubmit, children, ...props }, ref) => {
        const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            const formData = new FormData(e.currentTarget);
            const text = formData.get("text") as string;
            onSubmit({ text });
        };

        return (
            <form
                ref={ref}
                onSubmit={handleSubmit}
                className={cn(
                    "relative flex flex-col gap-2 rounded-lg border border-zinc-800 bg-zinc-900 p-4 shadow-sm",
                    className
                )}
                {...props}
            >
                {children}
            </form>
        );
    }
);
PromptInput.displayName = "PromptInput";

const PromptInputTextarea = React.forwardRef<
    HTMLTextAreaElement,
    React.TextareaHTMLAttributes<HTMLTextAreaElement>
>(({ className, ...props }, ref) => {
    return (
        <textarea
            ref={ref}
            name="text"
            rows={1}
            className={cn(
                "w-full resize-none bg-transparent text-sm outline-none placeholder:text-zinc-400",
                className
            )}
            {...props}
        />
    );
});
PromptInputTextarea.displayName = "PromptInputTextarea";

const PromptInputFooter = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
    return (
        <div
            ref={ref}
            className={cn("flex items-center justify-between pt-2", className)}
            {...props}
        />
    );
});
PromptInputFooter.displayName = "PromptInputFooter";

const PromptInputTools = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
    return (
        <div
            ref={ref}
            className={cn("flex items-center gap-1", className)}
            {...props}
        />
    );
});
PromptInputTools.displayName = "PromptInputTools";

interface PromptInputButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "outline" | "default";
}

const PromptInputButton = React.forwardRef<
    HTMLButtonElement,
    PromptInputButtonProps
>(({ className, variant = "default", ...props }, ref) => {
    return (
        <button
            ref={ref}
            type="button"
            className={cn(
                "inline-flex h-8 w-8 items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 disabled:pointer-events-none disabled:opacity-50",
                variant === "outline"
                    ? "border border-zinc-800 bg-transparent hover:bg-zinc-800"
                    : "bg-zinc-100 text-zinc-900 hover:bg-zinc-200",
                className
            )}
            {...props}
        />
    );
});
PromptInputButton.displayName = "PromptInputButton";

interface PromptInputSubmitProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    status?: "submitted" | "streaming" | "ready" | "error";
}

const PromptInputSubmit = React.forwardRef<
    HTMLButtonElement,
    PromptInputSubmitProps
>(({ className, status = "ready", ...props }, ref) => {
    return (
        <button
            ref={ref}
            type="submit"
            className={cn(
                "inline-flex h-8 w-8 items-center justify-center rounded-md bg-zinc-100 text-sm font-medium text-zinc-900 transition-colors hover:bg-zinc-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 disabled:pointer-events-none disabled:opacity-50",
                className
            )}
            {...props}
        />
    );
});
PromptInputSubmit.displayName = "PromptInputSubmit";

// Select Components
const PromptInputSelect = SelectPrimitive.Root;

const PromptInputSelectTrigger = React.forwardRef<
    React.ElementRef<typeof SelectPrimitive.Trigger>,
    React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
    <SelectPrimitive.Trigger
        ref={ref}
        className={cn(
            "flex h-8 items-center justify-between gap-2 rounded-md border border-zinc-800 bg-transparent px-3 py-2 text-sm placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-400 disabled:cursor-not-allowed disabled:opacity-50",
            className
        )}
        {...props}
    >
        {children}
        <SelectPrimitive.Icon asChild>
            <ChevronDown className="h-4 w-4 opacity-50" />
        </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
));
PromptInputSelectTrigger.displayName = SelectPrimitive.Trigger.displayName;

const PromptInputSelectContent = React.forwardRef<
    React.ElementRef<typeof SelectPrimitive.Content>,
    React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>
>(({ className, children, position = "popper", ...props }, ref) => (
    <SelectPrimitive.Portal>
        <SelectPrimitive.Content
            ref={ref}
            className={cn(
                "relative z-50 min-w-[8rem] overflow-hidden rounded-md border border-zinc-800 bg-zinc-900 text-zinc-50 shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
                position === "popper" &&
                "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
                className
            )}
            position={position}
            {...props}
        >
            <SelectPrimitive.Viewport
                className={cn(
                    "p-1",
                    position === "popper" &&
                    "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]"
                )}
            >
                {children}
            </SelectPrimitive.Viewport>
        </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
));
PromptInputSelectContent.displayName = SelectPrimitive.Content.displayName;

const PromptInputSelectItem = React.forwardRef<
    React.ElementRef<typeof SelectPrimitive.Item>,
    React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
>(({ className, children, ...props }, ref) => (
    <SelectPrimitive.Item
        ref={ref}
        className={cn(
            "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-zinc-800 focus:text-zinc-50 data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
            className
        )}
        {...props}
    >
        <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
            <SelectPrimitive.ItemIndicator>
                <Check className="h-4 w-4" />
            </SelectPrimitive.ItemIndicator>
        </span>
        <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
    </SelectPrimitive.Item>
));
PromptInputSelectItem.displayName = SelectPrimitive.Item.displayName;

const PromptInputSelectValue = SelectPrimitive.Value;

export {
    PromptInput,
    PromptInputTextarea,
    PromptInputFooter,
    PromptInputTools,
    PromptInputButton,
    PromptInputSubmit,
    PromptInputSelect,
    PromptInputSelectTrigger,
    PromptInputSelectContent,
    PromptInputSelectItem,
    PromptInputSelectValue,
};
