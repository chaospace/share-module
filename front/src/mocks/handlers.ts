import { HttpResponse, delay, http } from 'msw';

const handlers = [
  // infiniteScroll을 위해 FeedList형식으로 리턴
  http.get('http://api.example.com/infinite/:page', async ({ params }) => {
    await delay(500);
    const p = Number(params.page);
    const size = 10;
    const n = p - 1;
    const res = Array.from({ length: size }).map((_, idx) => n * size + (idx + 1));

    return HttpResponse.json(
      { data: res, previousCursor: p - 1, nextCursor: p + 1 },
      { status: 200 }
    );
  })
];

export default handlers;
