import { draftMode } from "next/headers";

interface FetchOptions extends RequestInit {
  preview?: boolean;
}

export async function strapiFetch(
  path: string,
  options: FetchOptions = {}
) {
  // 1️⃣ Визначаємо preview автоматично
  const { isEnabled } = draftMode();
  const preview = options.preview ?? isEnabled;

  // 2️⃣ Визначаємо publicationState
  const publicationState = preview ? "preview" : "live";

  // 3️⃣ Встановлюємо URL
  const url = `${process.env.NEXT_PUBLIC_STRAPI_URL}${path}${
    path.includes("?") ? "&" : "?"
  }publicationState=${publicationState}`;

  const res = await fetch(url, {
    cache: preview ? "no-store" : "force-cache",
    next: { revalidate: preview ? 0 : 60 },
    ...options,
  });

  if (!res.ok) {
    throw new Error(`Strapi fetch error: ${res.status}`);
  }

  return res.json();
}
