const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL

export async function getPage(slug: string) {
  const res = await fetch(
    `${STRAPI_URL}/api/pages?filters[slug][$eq]=${slug}&populate=*`,
    {
      next: { revalidate: 60 }, // ISR
    }
  )

  if (!res.ok) throw new Error("Failed to fetch page")

  const json = await res.json()
  return json.data[0]
}
