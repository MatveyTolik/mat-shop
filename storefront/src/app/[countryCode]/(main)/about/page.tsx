async function getAboutPage() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/about-us?populate=*`,
      {
        next: { revalidate: 60 }, // кеш 60 секунд (ISR)
      }
    );

    if (res.status === 404) {
      return null;
    }

    if (!res.ok) {
      throw new Error('Strapi error');
    }

    return await res.json();
  } catch (error) {
    console.error('Homepage fetch error:', error);
    return null;
  }
}

export default async function AboutPage() {
  const data = await getAboutPage();

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
      <p>{data?.data?.body ?? ''}</p>
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
