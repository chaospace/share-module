import { HttpResponse, http } from "msw";
import { pokemons } from "@/mocks/response/pokemons";

const handlers = [
    http.get("http://api.example.com/pokemons", async () => {
        return HttpResponse.json(pokemons);
    }),

    http.post("http://api.example.com/pokemons", async ({ request }) => {
        const newPokemons = await request.json();

        //201상태를 응답해 자원생성을 알림.
        return HttpResponse.json(newPokemons, { status: 201 });
    })
];


export default handlers;