import { GameProps } from "@/utils/types/game";
import { redirect } from "next/navigation";
import { Container } from "@/components/container/container";
import Image from "next/image";
import { Label } from "./components/label";
import { GameCard } from "@/components/game-card";
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ gameid: string }>;
}): Promise<Metadata> {
  const { gameid } = await params;
  try {
    const res = await fetch(
      `${process.env.NEXT_API_URL}/next-api/?api=game&id=${gameid}`,
      { next: { revalidate: 60 } }
    );

    if (!res.ok) {
      throw new Error("Failed to fetch game data");
    }

    const data: GameProps = await res.json();

    return {
      title: data.title,
      description: `${data.description.slice(0, 100)}`,
      openGraph: {
        title: data.title,
        images: [data.image_url],
      },
      robots: {
        index: true,
        follow: true,
        nocache: true,
        googleBot: {
          index: true,
          follow: true,
          noimageindex: true,
        },
      },
    };
  } catch (error) {
    console.error("Erro ao gerar metadata:", error);
    return {
      title: "Daly games, tudo sobre jogos",
    };
  }
}
async function getData(id: string) {
  try {
    const response = await fetch(
      `${process.env.NEXT_API_URL}/next-api/?api=game&id=${id}`,
      { next: { revalidate: 60 } }
    );
    return response.json();
  } catch (error) {
    console.log(error);
  }
}

async function getGameSorted() {
  try {
    const response = await fetch(
      `${process.env.NEXT_API_URL}/next-api/?api=game_day`,
      { cache: "no-store" }
    );
    return response.json();
  } catch (error) {
    console.log(error);
  }
}

export default async function Game({
  params,
}: {
  params: Promise<{ gameid: string }>;
}) {
  const { gameid } = await params;
  const game: GameProps = await getData(gameid);
  const gameSorted: GameProps = await getGameSorted();

  if (game === null) {
    redirect("/");
  }
  return (
    <main className="w-full text-black">
      <div className="bg-black h-80 sm:h-96 w-full relative">
        <Image
          src={game.image_url}
          alt={game.title}
          fill={true}
          priority={true}
          quality={100}
          sizes="(max-width:768px) 100vw, (max-width: 1200px) 33vw"
          className="object-cover w-full h-80 sm:h-96 opacity-80"
        />
      </div>
      <Container>
        <h1 className="font-bold text-xl my-4">{game.title}</h1>
        <p>{game.description}</p>

        <h2 className="font-bold text-lg mt-7 mb-2">Plataformas</h2>
        <div className="flex gap-2 flex-wrap">
          {game.platforms.map((item) => (
            <Label name={item} key={item} />
          ))}
        </div>

        <h2 className="font-bold text-lg mt-7 mb-2">Categorias</h2>
        <div className="flex gap-2 flex-wrap">
          {game.categories.map((item) => (
            <Label name={item} key={item} />
          ))}
        </div>

        <p className="mt-7 mb-2">
          <strong>Data lançamento: </strong>
          {game.release}
        </p>

        <h2 className="font-bold text-lg mt-7 mb-2">Jogo recomendado</h2>
        <div className="flex">
          <div className="flex-grow">
            <GameCard data={gameSorted} />
          </div>
        </div>
      </Container>
    </main>
  );
}
