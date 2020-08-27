export default [
  {
    path: '/',
    exact: true,
    redirect: '/tool/en',
  },
  {
    path: '/tool',
    component: '@/layouts/index',
    routes: [
      { path: '/tool', redirect: '/tool/en' },
      {
        path: '/tool/home',
        exact: true,
        title: '首页',
        component: '@/pages/home',
      },
      {
        path: '/tool/en',
        exact: true,
        title: '英汉翻译',
        component: '@/pages/en',
      },
      {
        path: '/tool/draft',
        exact: true,
        title: '草稿纸',
        component: '@/pages/draft',
      },
      {
        path: '/tool/todo',
        exact: true,
        title: '待办',
        component: '@/pages/todo',
      },
      { component: '@/pages/404' },
    ],
  },
  { component: '@/pages/404' },
];
