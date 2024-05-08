import { HttpResponse, http } from "msw";
import { pokemons } from "./response/pokemons";

const handlers = [
    http.get("http://api.example.com/pokemons", async () => {
        return HttpResponse.json(pokemons);
    })
];


export default handlers;