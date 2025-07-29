import { Container } from "@/components/container/container";
import { Input } from "@/components/input";
import { GameCard } from "@/components/game-card";
import { GameProps } from "@/utils/types/game";

async function getData(search: string) {
  try {
    const decodedSearch = decodeURI(search)
    const response = await fetch(
      `${process.env.NEXT_API_URL}/next-api/?api=game&title=${decodedSearch}`
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
  const games: GameProps[] = await getData(search);

  return (
    <main className="w-full text-black">
      <Container>
        <Input />
        <h1 className="font-bold text-xl mt-8 mb-5">Veja oque encontramos na nossa base</h1>
        {!games && (
          <p>Este jogo não foi encontrado...!</p>
        )}

        <section className="grid gap-7 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {games && games.map((item) => (
            <GameCard key={item.id} data={item} />
          ))}
        </section>
      </Container>
    </main>
  );
}
