"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface BranchProps extends React.HTMLAttributes<HTMLDivElement> {
    defaultBranch?: number;
}

const BranchContext = React.createContext<{
    branch: number;
    setBranch: (branch: number) => void;
    count: number;
    setCount: (count: number) => void;
}>({
    branch: 0,
    setBranch: () => { },
    count: 0,
    setCount: () => { },
});

const Branch = React.forwardRef<HTMLDivElement, BranchProps>(
    ({ className, defaultBranch = 0, children, ...props }, ref) => {
        const [branch, setBranch] = React.useState(defaultBranch);
        const [count, setCount] = React.useState(0);

        return (
            <BranchContext.Provider value={{ branch, setBranch, count, setCount }}>
                <div ref={ref} className={cn("relative group", className)} {...props}>
                    {children}
                </div>
            </BranchContext.Provider>
        );
    }
);
Branch.displayName = "Branch";

const BranchMessages = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => {
    const { branch, setCount } = React.useContext(BranchContext);
    const childrenArray = React.Children.toArray(children);

    React.useEffect(() => {
        setCount(childrenArray.length);
    }, [childrenArray.length, setCount]);

    return (
        <div ref={ref} className={className} {...props}>
            {childrenArray[branch]}
        </div>
    );
});
BranchMessages.displayName = "BranchMessages";

interface BranchSelectorProps extends React.HTMLAttributes<HTMLDivElement> {
    from?: "user" | "assistant";
}

const BranchSelector = React.forwardRef<HTMLDivElement, BranchSelectorProps>(
    ({ className, from, children, ...props }, ref) => {
        const { count } = React.useContext(BranchContext);

        if (count <= 1) return null;

        return (
            <div
                ref={ref}
                className={cn(
                    "absolute top-full mt-1 flex items-center gap-1 text-xs text-zinc-500 opacity-0 transition-opacity group-hover:opacity-100",
                    from === "user" ? "right-0" : "left-0",
                    className
                )}
                {...props}
            >
                {children}
            </div>
        );
    }
);
BranchSelector.displayName = "BranchSelector";

const BranchPrevious = React.forwardRef<
    HTMLButtonElement,
    React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, ...props }, ref) => {
    const { branch, setBranch } = React.useContext(BranchContext);

    return (
        <button
            ref={ref}
            onClick={() => setBranch(Math.max(0, branch - 1))}
            disabled={branch === 0}
            className={cn(
                "p-1 hover:text-zinc-900 disabled:opacity-50 dark:hover:text-zinc-100",
                className
            )}
            {...props}
        >
            <ChevronLeft className="h-3 w-3" />
        </button>
    );
});
BranchPrevious.displayName = "BranchPrevious";

const BranchNext = React.forwardRef<
    HTMLButtonElement,
    React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, ...props }, ref) => {
    const { branch, setBranch, count } = React.useContext(BranchContext);

    return (
        <button
            ref={ref}
            onClick={() => setBranch(Math.min(count - 1, branch + 1))}
            disabled={branch === count - 1}
            className={cn(
                "p-1 hover:text-zinc-900 disabled:opacity-50 dark:hover:text-zinc-100",
                className
            )}
            {...props}
        >
            <ChevronRight className="h-3 w-3" />
        </button>
    );
});
BranchNext.displayName = "BranchNext";

const BranchPage = React.forwardRef<
    HTMLSpanElement,
    React.HTMLAttributes<HTMLSpanElement>
>(({ className, ...props }, ref) => {
    const { branch, count } = React.useContext(BranchContext);

    return (
        <span ref={ref} className={cn("font-medium", className)} {...props}>
            {branch + 1} / {count}
        </span>
    );
});
BranchPage.displayName = "BranchPage";

export {
    Branch,
    BranchMessages,
    BranchSelector,
    BranchPrevious,
    BranchNext,
    BranchPage,
};
