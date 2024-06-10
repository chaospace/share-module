import { HttpResponse, delay, http } from 'msw';
import { pokemons } from '@/mocks/response/pokemons';

const handlers = [
  http.get('http://api.example.com/pokemons', async () => {
    return HttpResponse.json(pokemons);
  }),

  http.post('http://api.example.com/pokemons', async ({ request }) => {
    const newPokemons = await request.json();

    //201상태를 응답해 자원생성을 알림.
    return HttpResponse.json(newPokemons, { status: 201 });
  }),

  http.get('http://api.example.com/infinite/:page', async ({ params }) => {
    await delay(1500);
    const p = Number(params.page);
    const size = 10;
    const res = Array.from({ length: size }).map((_, idx) => (p - 1) * size + idx + 1);
    return HttpResponse.json(res, { status: 200 });
  })
];

export default handlers;
