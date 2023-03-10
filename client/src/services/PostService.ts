import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { IPost } from "../models/IPost";

export const postAPI = createApi({
  reducerPath: "postAPI",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5001" }),
  // baseQuery: fetchBaseQuery({
  //   baseUrl: "https://jsonplaceholder.typicode.com",
  // }),
  tagTypes: ["Post"],
  endpoints: (build) => ({
    fetchAllPosts: build.query({
      query: () => ({
        url: `/posts`,
      }),
      providesTags: (result) => ["Post"],
    }),
    createPost: build.mutation<IPost, IPost>({
      query: (post) => ({
        url: `/posts`,
        method: "POST",
        body: post,
      }),
      invalidatesTags: ["Post"],
    }),
    updatePost: build.mutation<IPost, IPost>({
      query: (post) => ({
        url: `/posts/${post.id}`,
        method: "PUT",
        body: post,
      }),
      invalidatesTags: ["Post"],
    }),
    deletePost: build.mutation<IPost, IPost>({
      query: (post) => ({
        url: `/posts/${post.id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Post"],
    }),
  }),
});
