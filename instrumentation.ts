export async function register() {
  if (process.env.NEXT_RUNTIME !== "nodejs") return;
  if (!process.env.LANGFUSE_PUBLIC_KEY || !process.env.LANGFUSE_SECRET_KEY) return;

  const { LangfuseSpanProcessor } = await import("@langfuse/otel");
  const { NodeTracerProvider } = await import("@opentelemetry/sdk-trace-node");
  const { setSpanProcessor } = await import("./lib/observability/layers");

  const processor = new LangfuseSpanProcessor();
  new NodeTracerProvider({ spanProcessors: [processor] }).register();
  setSpanProcessor(processor);
}
