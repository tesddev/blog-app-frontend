export const endpoints = {
    auth: {
        register: "register",
        login: "login"
    },

    dashboard: {
        userCount: "user/get-all-users-count",
        productCount: "product/get-all-products-count",
        blogs: "posts"
    },

    users: {
        getAllUsers: "admin/get-all-users",
    },

    bearerToken: `Bearer ${sessionStorage.getItem("***")}`
}