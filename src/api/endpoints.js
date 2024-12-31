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

    post: {
        postBlog: "createPost",
        getPostDetails: "posts",
    },

    bearerToken: `Bearer ${sessionStorage.getItem("***")}`
}