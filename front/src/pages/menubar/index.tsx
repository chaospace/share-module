import MenuBar from '@/components/menubar';

const menuTree = [
  {
    label: '홈으로',
    link: '/'
  },
  {
    label: '회사소개',
    link: '/about',
    children: [
      {
        label: '오시는 길',
        link: '/about/road'
      },
      {
        label: '약력',
        link: '/about/history'
      }
    ]
  },
  {
    label: '포트폴리오',
    link: '/portpolio'
  },
  {
    label: '계약하기',
    link: '/contact',
    children: [
      {
        label: '체험하기',
        link: '/contact/experience',
        children: [
          {
            label: '판타지',
            link: '/contact/experience/fantasy'
          },
          {
            label: '무협',
            link: '/content/experience/matial'
          },
          {
            label: '스릴러',
            link: '/content/experience/thriller'
          }
        ]
      },
      {
        label: '예매하기',
        link: '/content/reservation'
      }
    ]
  }
];

function MenuBarApp() {
  return (
    <>
      <MenuBar variant='success' provider={menuTree} />
      <MenuBar variant='info' provider={menuTree} />
    </>
  );
}
export { menuTree };
export default MenuBarApp;
