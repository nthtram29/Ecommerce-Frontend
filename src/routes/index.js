

import AdminPage from "../page/AdminPage/AdminPage";
import ContactPage from "../page/ContactPage/ContactPage";
import DetailsOrderPage from "../page/DetailsOrderPage/DetailsOrderPage";
import HomePage from "../page/HomePage/HomePage";
import MyOrderPage from "../page/MyOrderPage/MyOrderPage";
import NotFoundPage from "../page/NotFoundPage/NotFoundPage";
import OrderPage from "../page/OrderPage/OrderPage";
import OrderSuccess from "../page/OrderSuccess/OrderSuccess";
import PaymentPage from "../page/PaymentPage/PaymentPage";
import PostsDetailPage from "../page/PostsDetailPage/PostsDetailPage";
import PostPage from "../page/PostsPage/PostPage";
import ProductDetailPage from "../page/ProductDetailPage/ProductDetailPage";
import ProfilePage from "../page/ProfilePage/ProfilePage";
import SignInPage from "../page/SignInPage/SignInPage";
import SignUpPage from "../page/SignUpPage/SignUpPage";
import TypeProductPage from "../page/TypeProductPage/TypeProductPage";

export const routes = [
    {
        path: '/',
        page: HomePage,
        isShowHeader: true,
        isShowFooter: true
    },
    {
        path: '/order',
        page: OrderPage,
        isShowHeader: true,
        isShowFooter: true
    },
    {
        path: '/details-order/:id',
        page: DetailsOrderPage,
        isShowHeader: true,
        isShowFooter: true
    },
    {
        path: '/payment',
        page: PaymentPage,
        isShowHeader: true,
        isShowFooter: true
    },
    {
        path: '/my-order',
        page: MyOrderPage,
        isShowHeader: true,
        isShowFooter: true
    },
    {
        path: '/orderSuccess',
        page: OrderSuccess,
        isShowHeader: true,
        isShowFooter: true
    },
    {
        path: '/product/:type',
        page: TypeProductPage,
        isShowHeader: true,
        isShowFooter: true
    },
    {
        path: '/sign-in',
        page: SignInPage,
        isShowHeader: false,
        isShowFooter: false
    },
    {
        path: '/sign-up',
        page: SignUpPage,
        isShowHeader: false,
        isShowFooter: false
    },
    {
        path: '/product-detail/:id',
        page: ProductDetailPage,
        isShowHeader: true,
        isShowFooter: true
    },
    {
        path: '/profile-user',
        page: ProfilePage,
        isShowHeader: true,
        isShowFooter: true
    },
    {
        path: '/contact',
        page: ContactPage,
        isShowHeader: true,
        isShowFooter: true
    },
    {
        path: '/posts',
        page: PostPage,
        isShowHeader: true,
        isShowFooter: true
    },
    {
        path: '/posts-detail/:id',
        page: PostsDetailPage,
        isShowHeader: true,
        isShowFooter: true
    },
    {
        path: 'system/admin',
        page: AdminPage,
        isShowHeader: false,
        isPrivate: true,
        isShowFooter: true
    },
    {
        path: '*',
        page: NotFoundPage
    }
]