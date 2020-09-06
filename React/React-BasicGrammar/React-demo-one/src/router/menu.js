import {
    EditOutlined,
    FormOutlined,
    CopyOutlined
} from '@ant-design/icons';
const meuns = [{
    title: '首页',
    path: '/home',
    icon: EditOutlined,
    permission: 1
}, {
    title: '用户管理',
    path: '/user-manage',
    icon: FormOutlined,
    permission: 3,
    children: [{
        title: '用户列表',
        path: '/user-manage/users',
        icon: CopyOutlined,
        permission: 3,
    }],
}, {
    title: '文章管理',
    path: '/artic-manege',
    icon: FormOutlined,
    permission: 1,
    children: [{
        title: '文章列表',
        path: '/artic-manege/list',
        icon: CopyOutlined,
        permission: 1,
    }, {
        title: '文章分类',
        path: '/artic-manege/rights',
        icon: CopyOutlined,
        permission: 2,
    }],
}, {
    title: '权限管理',
    path: '/right-manage',
    icon: FormOutlined,
    permission: 3,
    children: [{
        title: '角色列表',
        path: '/right-manage/roles',
        icon: CopyOutlined,
        permission: 3,
    }, {
        title: '权限列表',
        path: '/right-manage/rights',
        icon: CopyOutlined,
        permission: 3,
    }],
}]
// const meuns = ['1111','22222']
export default meuns;