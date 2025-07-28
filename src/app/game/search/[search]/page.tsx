async function getData(search: string) {
  console.log(search);
  try {
    const response = await fetch(
      `${process.env.NEXT_API_URL}/next-api/?api=game&title=${search}`
    );
    return response.json();
  } catch (error) {
    console.error("Erro ao buscar dados:", error);
    return null;
  }
}

export default async function Search({
  params,
}: {
  params: Promise<{ search: string }>;
}) {
  const { search } = await params;
  const games = await getData(search);

  return (
    <div>
      <h1>Search Page</h1>
      <pre>{JSON.stringify(games, null, 2)}</pre>
    </div>
  );
}
