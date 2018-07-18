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
