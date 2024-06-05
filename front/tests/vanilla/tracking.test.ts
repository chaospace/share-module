const menus = [
  {
    label: '회사소개',
    link: '/about',
    children: [
      {
        label: '인사말',
        link: '/about/greeting'
      },
      {
        label: '연혁',
        link: '/about/history'
      },
      {
        label: '나아갈 길',
        link: '/about/feature',
        children: [
          {
            label: '3뎁스',
            link: '/about/depth/1'
          },
          {
            label: '판타지',
            link: '/about/depth/2'
          }
        ]
      }
    ]
  },
  {
    label: '프로젝트',
    link: '/project'
  },
  {
    label: '포트폴리오',
    link: '/portfolio',
    children: [
      {
        label: '작업1'
      },
      {
        label: '작업2',
        children: [
          {
            label: '환타'
          }
        ]
      }
    ]
  },
  {
    label: 'Contact',
    link: '/contact',
    children: [
      {
        label: '상담',
        link: '/content/consulting',
        children: [
          {
            label: '멘토링',
            link: 'content/mentoring'
          },
          {
            label: '후속상담'
          }
        ]
      },
      {
        label: '예약',
        link: '/content/reservation'
      }
    ]
  }
];

type MenuVO = {
  label: string;
  link?: string;
  children?: MenuVO[];
};
describe.skip('메뉴찾기', () => {
  it('루프를 돌며 원하는 값 찾기', () => {
    const findMenuTree = (tree: MenuVO[], label: string) => {
      const tracking = (o: MenuVO, answer: string[]): string[] | null => {
        if (o.label === label) {
          answer.push(label);
          return answer;
        } else if (o.children) {
          answer.push(o.label);
          for (let k in o.children) {
            const r = tracking(o.children[k], answer);
            if (r) return r;
          }
        }
        return null;
      };

      for (let i = 0; i < tree.length; i++) {
        const result = tracking(tree[i], []);
        if (result) {
          return result;
        }
      }
      return null;
    };

    const r = findMenuTree(menus, '예약');
    expect(r?.length).toEqual(2);
    expect(r).toEqual(['Contact', '예약']);
  });

  it.only('찾기 개선', () => {
    //shift를 사용하기는 애매하니 index를 통한 접근처리.
    const dfs = (tree: MenuVO[], target: string, answer: string[] = []): string[] | null => {
      let i = 0;
      while (i < tree.length) {
        const v = tree[i];
        if (v?.label === target) {
          //일치한 값을 찾으면 탐색종료.
          return [...answer, v.label];
        } else if (v?.children) {
          //서브메뉴가 있다면 탐색을 이어간다.
          const result = dfs(v.children, target, [...answer, v.label]);
          if (result) return result;
        }
        i += 1;
      }
      return null;
    };
    const answer = dfs(menus, '멘토링');
    console.log('answer', answer, menus);
  });
});

it('배열 값중 어디에서 속하지 않은 키 찾기', () => {
  const a = ['a', 'b', 'c', 'd'];
  const b = ['a', 'c', 'e'];
  const diff = a.filter(o => b.every(v => v !== o));
  console.log('diff', diff);
});
