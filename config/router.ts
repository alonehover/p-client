export default [
    {
        path: '/',
        exact: true,
        redirect: '/tool/home'
    },
    { 
        path: '/tool',
        component: '@/layouts/index',
        routes: [
            { path: '/tool', redirect: '/tool/home' },
            { path: '/tool/home', exact: true, title: '首页', component: '@/pages/home' },
            { path: '/tool/en', exact: true, title: '英汉翻译', component: '@/pages/en' },
            { path: '/tool/draft', exact: true, title: '草稿纸', component: '@/pages/draft' },
        ]
    },
    { component: '@/pages/404' }
]