# 配置项设置
关注 projectConfig.ts 文件的配置，区分开发环境和正式环境

# 登录接口 (需要后端转发)
/api/login/

# 退出接口  (需要后端转发)
/api/logout/
在header 组件中： 调用 casLogout

# 关于token 的配置
config.token = localStorage.getItem("token")