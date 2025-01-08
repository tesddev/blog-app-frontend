export const endpoints = {
    auth: {
        register: "register",
        login: "login"
    },

    dashboard: {
        blogs: "posts"
    },

    post: {
        postBlog: "createPost",
        getPostDetails: "posts",
        deletePost: "posts",
        editPost: "posts"
    },

    comments: {
        postComment: "postComment",
        deleteComment: "deleteComment"
    },

    bearerToken: `Bearer ${sessionStorage.getItem("***")}`
}