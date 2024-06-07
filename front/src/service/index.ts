// api 요청 모음

interface FeedList {
  data: number[];
  previousCursor: number;
  nextCursor: number;
}

const getFeedList = async ({ pageParam }: any): Promise<FeedList> => {
  const response = await fetch(`http://api.example.com/infinite/${pageParam}`);
  return response.json();
};

export type { FeedList };
export { getFeedList };
