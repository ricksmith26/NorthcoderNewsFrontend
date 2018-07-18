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
