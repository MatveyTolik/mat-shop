import { strapiFetch } from "@lib/strapiClient";

export default async function HomePage() {
  const data = await strapiFetch("/api/homepage?populate=*");

  // Якщо контенту немає
  if (!data?.data) {
    return (
      <div>
        <h1>Сайт тимчасово недоступний</h1>
        <p>Спробуйте пізніше</p>
      </div>
    );
  }

  const imageUrl = data.data.Image?.formats?.thumbnail?.url
    ? `${process.env.NEXT_PUBLIC_STRAPI_URL}${data.data.Image.formats.thumbnail.url}`
    : null;
  console.log(data)
  console.log(imageUrl)

  return (
    <div>
      <h1>{data?.data?.title ?? 'Без назви'}</h1>
      <p>{data?.data?.description ?? ''}</p>
      {imageUrl && (
        <img
          src={imageUrl}
          alt="buu"
          className="rounded-lg shadow-md"
        />
      )}
    </div>
  );
}
