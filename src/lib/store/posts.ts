import { writable } from "svelte/store";
import { API_URL, handleResponse } from "./constants";
import { authenticate } from "./auth";

export async function getPosts(page = 0, limit = 20) {
  const response = await fetch(`${API_URL}/posts?page=${page}&limit=${limit}`);
  const result = await handleResponse<{ posts: TPost[]; page: number; totalPages: number }>(response);
  if (result && result.posts) posts.set(result.posts);
  return result;
}

export async function createPost(newPost: { title: string; content: string }) {
  const options = authenticate({
    method: "POST",
    body: JSON.stringify(newPost),
  });
  const response = await fetch(API_URL + "/post", options);
  return handleResponse(response, getPosts);
}

export async function addLike(postId: number) {
  const options = authenticate({
    method: "POST",
    body: JSON.stringify({ postId }),
  });
  const response = await fetch(API_URL + "/post/like", options);
  return handleResponse(response, getPosts);
}

export async function addComment(postId: number, content: string ) {
  const options = authenticate({
    method: "POST",
    body: JSON.stringify({ postId, content }),
  });
  const response = await fetch(API_URL + "/post/comment", options);
  return handleResponse(response, getPosts);
}

export const posts = writable([] as TPost[]);

export type TPost = {
  _id: number;
  title: string;
  content: string;
  firstname: string;
  lastname: string;
  userId: string;
  date: string;
  likes: number[];
  comments: TComment[];
}

type TComment = Omit<TPost, "date" | "comments" | "title">;