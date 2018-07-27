import axios from 'axios';

const URL = 'https://northcodernewsapp.herokuapp.com/api';

export const fetchArticles = async () => {
  const res = await axios.get(`${URL}/articles`);
  return res.data.articles;
};

export const fetchTopics = async () => {
  const res = await axios.get(`${URL}/topics`);
  return res.data.topics;
};

export const fetchArticlesByTopic = async topic_name => {
  const res = await axios.get(`${URL}/topics/${topic_name}/articles`);
  return res.data.articles;
};

export const fetchUsers = async username => {
  const res = await axios.get(`${URL}/users/${username}`);
  return res;
};

export const getArticleById = async article_id => {
  const res = await axios.get(`${URL}/articles/${article_id}`);
  return res.data;
};

export const getCommentsForArticle = async article_id => {
  const res = await axios.get(`${URL}/articles/${article_id}/comments`);
  return res.data.comments;
};

export const postComment = async (article_id, comment) => {
  const res = await axios.post(
    `${URL}/articles/${article_id}/comments`,
    comment
  );
  return res.data.comment;
};

export const deleteComment = async comment_id => {
  const res = await axios.delete(`${URL}/comments/${comment_id}`);
  return res;
};

export const voteArticle = async (article_id, vote) => {
  const res = await axios.put(`${URL}/articles/${article_id}`, vote);
  return res.data;
};

export const voteComment = async (comment_id, vote) => {
  const res = await axios.put(`${URL}/comments/${comment_id}`, vote);
  return res.data;
};

export const getUsers = async () => {
  const res = await axios.get(`${URL}/users`);
  return res.data;
};

export const addUser = async userInfo => {
  const res = await axios.post(`${URL}/users`, userInfo);
  console.log(res);
  return res;
};
