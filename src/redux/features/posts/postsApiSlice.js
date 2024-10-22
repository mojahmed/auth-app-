import { apiSlice } from '../../app/api/apiSlice';

export const postsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createPost: builder.mutation({
      query: (postData) => ({
        url: '/posts',
        method: 'POST',
        body: { ...postData },
      }),
    }),
    getPosts: builder.query({
      query: () => '/posts',
    }),
    getPostById: builder.query({
      query: (postId) => `/posts/${postId}`,
    }),
    updatePost: builder.mutation({
      query: ({ postId, ...postData }) => ({
        url: `/posts/${postId}`,
        method: 'PUT',
        body: { ...postData },
      }),
    }),
    deletePost: builder.mutation({
      query: (postId) => ({
        url: `/posts/${postId}`,
        method: 'DELETE',
      }),
    }),
  }),
});


export const {
  useCreatePostMutation,
  useGetPostsQuery,
  useGetPostByIdQuery,
  useUpdatePostMutation,
  useDeletePostMutation,
} = postsApiSlice;
