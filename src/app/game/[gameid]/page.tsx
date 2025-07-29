import { GameProps } from "@/utils/types/game";
import { redirect } from "next/navigation";
import { Container } from '@/components/container/container'
import Image from 'next/image'

async function getData(id: string) {
    try {
        const response = await fetch(`${process.env.NEXT_API_URL}/next-api/?api=game&id=${id}`)
        return response.json();
    } catch (error) {
        console.log(error)
    }
}

export default async function Game({ params }: { params: Promise<{ gameid: string }> }) {
    const { gameid } = await params;
    const game: GameProps = await getData(gameid);

    if (game === null) {
        redirect('/')
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
                    className="object-cover w-full h-80 sm:h-96 opacity-80" />
            </div>
            <Container>
                <h1 className="font-bold text-xl my-4">{game.title}</h1>
                <p>{game.description}</p>
                <h2 className="font-bold text-lg mt-7 mb-2">Categorias</h2>
            </Container>
        </main>
    )
}