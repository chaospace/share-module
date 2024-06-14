// api 요청 모음

interface FeedList {
  data: number[];
  previousCursor: number;
  nextCursor: number;
}

interface Movie {
  id: number;
  title: string;
  year: string;
}

const getFeedList = async ({ pageParam }: any): Promise<FeedList> => {
  const response = await fetch(`http://api.example.com/infinite/${pageParam}`);
  return response.json();
};

const getMovieList = async (): Promise<Movie[]> => {
  const response = await fetch('http://api.example.com/movies');
  return response.json();
};

export type { FeedList, Movie };
export { getFeedList, getMovieList };
