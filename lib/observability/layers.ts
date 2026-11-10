/** Stable observation names for the 4-layer trace model. Treat them like an API. */
export const LAYERS = {
  session: "interaction.session",
  orchestration: "orchestration.flow",
  operation: "operation.unit",
  inference: "model.inference",
} as const;

export const tracingEnabled = () =>
  Boolean(process.env.LANGFUSE_PUBLIC_KEY && process.env.LANGFUSE_SECRET_KEY);

// Next bundles instrumentation.ts separately from routes, so share the processor via globalThis.
type Flushable = { forceFlush: () => Promise<void> };
const globalRef = globalThis as typeof globalThis & { __langfuseSpanProcessor?: Flushable };
export const setSpanProcessor = (processor: Flushable) => { globalRef.__langfuseSpanProcessor = processor; };
export const getSpanProcessor = () => globalRef.__langfuseSpanProcessor;
