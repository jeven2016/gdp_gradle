/**
 * Created by zjtech on 16-8-3.
 */
const Resource = {
    common: {
        navBar: {
            title: '后台管理系统'
        },
        button: {
            submit: '提交'
        }
    },
    login: {
        userName: '用户名',
        password: '密码',
        forgotPassword: '忘记密码?'
    },

    cache: {
        memcached: {
            cluster: {
                title: 'Memcached集群配置'
            },
            server: {
                title: 'Memcached服务器管理'
            }
        }
    },

    errorCode: {
        '1000': '用户名不能为空',
        '1001': '密码不能为空',
        '1003': '用户名或密码不正确'
    }
};
export default Resource;