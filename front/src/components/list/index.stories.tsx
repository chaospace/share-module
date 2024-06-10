import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import InfiniteList, { InfiniteListProp } from './InfiniteList';
import { useInfiniteQuery } from '@tanstack/react-query';
import { getFeedList } from '@/service';
import { PropsWithOptionData } from '../types';
import Typography from '../elements/Typography';
import { labelGetter } from '../util';
import { fn } from '@storybook/test';

const CustomListItem = ({ data }: PropsWithOptionData) => {
  return (
    <div
      style={{
        padding: '30px 20px',
        backgroundColor: 'lightblue'
      }}>
      <Typography fontWeight='bold'>{`커스텀랜더러-${labelGetter(data)}`}</Typography>
    </div>
  );
};

const meta = {
  title: 'components/InfiniteList',
  component: InfiniteList,
  args: {
    ItemRenderer: undefined,
    fetchPreviousPage: fn(),
    fetchNextPage: fn()
  },
  argTypes: {
    ItemRenderer: {
      // @ts-ignore
      type: 'object',
      value: 'default',
      options: ['default', 'custom'],
      control: { type: 'select' },
      mapping: {
        default: () => undefined,
        custom: (props: PropsWithOptionData) => <CustomListItem {...props} />
      }
    }
  }
} satisfies Meta<InfiniteListProp>;

export default meta;

type Story = StoryObj<typeof meta>;

const InfiniteListBasic: Story = {
  render: ({ ItemRenderer }) => {
    const {
      data: feedList,
      fetchNextPage,
      fetchPreviousPage,
      hasNextPage,
      hasPreviousPage,
      isFetching
      // eslint-disable-next-line
    } = useInfiniteQuery({
      queryKey: ['getFeedList'],
      queryFn: getFeedList,
      initialPageParam: 1,
      maxPages: 3, // 기억할 페이지 수
      select: data => {
        return {
          pageParams: data.pageParams,
          pages: data.pages.flatMap(o => o.data)
        };
      },
      getNextPageParam: lastPage => {
        return lastPage.nextCursor > 10 ? undefined : lastPage.nextCursor;
      },
      getPreviousPageParam: (_firstPage, _, firstPageParam) => {
        return firstPageParam <= 1 ? undefined : firstPageParam - 1;
      }
    });

    return (
      <InfiniteList
        ItemRenderer={ItemRenderer}
        options={feedList?.pages}
        hasNextPage={hasNextPage}
        hasPreviousPage={hasPreviousPage}
        isFetching={isFetching}
        fetchNextPage={fetchNextPage}
        fetchPreviousPage={fetchPreviousPage}
      />
    );
  }
};

export { InfiniteListBasic };
