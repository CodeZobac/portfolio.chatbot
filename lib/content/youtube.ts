const VIDEO_ID = /^[A-Za-z0-9_-]{11}$/;

export function parseYouTubeId(value: string): string | undefined {
  const trimmed = value.trim();
  if (!trimmed) return undefined;
  if (VIDEO_ID.test(trimmed)) return trimmed;

  try {
    const url = new URL(trimmed);
    const host = url.hostname.replace(/^www\./, "").toLowerCase();
    let candidate: string | null = null;

    if (host === "youtu.be") candidate = url.pathname.split("/").filter(Boolean)[0] ?? null;
    if (host === "youtube.com" || host === "m.youtube.com" || host === "music.youtube.com") {
      candidate = url.searchParams.get("v");
      if (!candidate) {
        const [kind, id] = url.pathname.split("/").filter(Boolean);
        if (["embed", "shorts", "live"].includes(kind)) candidate = id ?? null;
      }
    }

    return candidate && VIDEO_ID.test(candidate) ? candidate : undefined;
  } catch {
    return undefined;
  }
}

export function youtubeUrl(id?: string): string {
  return id ? `https://www.youtube.com/watch?v=${id}` : "";
}

