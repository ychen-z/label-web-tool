import React, { ComponentType } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import E403 from '@/view/exception/E403';
import E405 from '@/view/exception/E405';
import E404 from '@/view/exception/not-found';
import { routes } from './router';

const CRouter = (props: any) => {
    /**
     * @author zhangz
     * @param menus 所有权限（路由及按钮）
     * @param path url 路径
     * @returns 返回当前路由菜单属性 1个或者 0 个
     */
    const getAuthMenu = (menus: any, path: string) => {
        let authMenu = [];
        authMenu = menus.filter((item: { link: string }) => item.link === path);
        return authMenu;
    };
    /**
     * @author zhangz
     * @param menus 所有权限（路由及按钮）
     * @param id 当前路由的id
     * @returns 返回当前路径下的按钮
     */
    const getAuthBtns = (menus: any, id: string) => {
        let btns = [];
        btns = menus.filter((item: { parentId: string; code: string }) => item.parentId === id || item.code.includes('common')); // 约定
        btns = btns.map((item: { code: string }) => item.code);
        return btns;
    };

    /**
     * @author zhangz
     * @param Com 组件名
     * @param path url 路径
     * @param needAuth 是否需要鉴权
     * @return 开发者，在页面上 通过props.btns 可取到所有的操作按钮的权限code array,形如['create','edit','del','common-btn']。
     */
    const requireAuth = (Com: ComponentType<any>, path: string, needAuth: boolean, breadcrumbName) => {
        const { auth } = props;
        const { menus, user } = auth;
        if (!needAuth) {
            return <Com {...props} breadcrumbName={breadcrumbName} />;
        }
        let authMenu = getAuthMenu(menus, path || location.pathname); // 如果没有权限跳转到 403 页面
        if (authMenu.length === 0) {
            return <Redirect to="/403" />;
        }
        let btns = getAuthBtns(menus, authMenu[0]?.id || '');

        return <Com {...props} breadcrumbName={breadcrumbName} auth={{ ...user, btns: btns }} />;
    };

    const child = (r: any, path) => {
        if (r.children) {
            return (
                <Switch>
                    {r.children.map((c, i) => {
                        const routePath = `${path}${c.link || c.key}`;
                        return <Route key={routePath} path={routePath} render={() => child(c, routePath)} />;
                    })}
                    <Route key={path} path={path} render={() => requireAuth(r.component, r.link, r.needAuth, r.name)} />
                    <Redirect to={path} />
                </Switch>
            );
        } else {
            return requireAuth(r.component, r.link, r.needAuth, r.name);
        }
    };

    return (
        <Switch>
            <Route path="/" exact render={() => <Redirect to="/app/dic" />} />
            {routes.map((r: any) => {
                return (
                    <Route
                        key={r.link || r.key}
                        path={r.link || r.key}
                        render={() => {
                            return child(r, r.link || r.key);
                        }}
                    />
                );
            })}
            <Route path="/403" component={E403} />
            <Route path="/405" component={E405} />
            <Route component={E404} />
        </Switch>
    );
};
export default CRouter;
