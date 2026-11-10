import { startActiveObservation } from "@langfuse/tracing";
import { LAYERS, tracingEnabled } from "./layers";

const summarize = (output: unknown) => {
  const data = (output as { data?: Record<string, unknown> } | undefined)?.data;
  const counts: Record<string, number> = {};
  for (const [key, value] of Object.entries(data ?? {})) {
    if (Array.isArray(value)) counts[key] = value.length;
  }
  return { type: (output as { type?: string } | undefined)?.type, counts };
};

/** Layer 3: wraps a deterministic tool call. Output is summarized, never raw card data. */
export function traceOperation<I, O>(
  name: string,
  run: (input: I) => Promise<O> | O,
): (input: I) => Promise<O> {
  return async (input: I) => {
    if (!tracingEnabled()) return run(input);
    return startActiveObservation(
      LAYERS.operation,
      async (span) => {
        span.update({ input, metadata: { operation: name } });
        try {
          const output = await run(input);
          span.update({ output: summarize(output), metadata: { operation: name, status: "success" } });
          return output;
        } catch (error) {
          span.update({
            level: "ERROR",
            statusMessage: error instanceof Error ? error.message : "unknown error",
            metadata: { operation: name, status: "error" },
          });
          throw error;
        }
      },
      { asType: "tool" },
    );
  };
}
