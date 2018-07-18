import React, { Component } from 'react';
import ArticlesList from './ArticlesList';
import * as api from '../../api';

class Articles extends Component {
  state = {
    articles: [],
    topics: [],
    topic_name: []
  };

  componentDidMount = async () => {
    const articles = await api.fetchArticles();
    const topics = await api.fetchTopics();

    this.setState({ articles, topics });
  };
  async componentDidUpdate(_, prevState) {
    if (prevState.topic_name !== this.state.topic_name) {
      const articles = await api.fetchArticlesByTopic(this.state.topic_name);

      this.setState({ articles: articles });
    }
  }

  render() {
    if (!this.state.articles.length || !this.state.topics.length)
      return <h1>Loading...</h1>;
    return (
      <div>
        <select id="topicList" onChange={this.handleTopicChange}>
          {Object.values(this.state.topics).map(topic => {
            return (
              <option key={topic._id} value={topic.slug}>
                {topic.title}
              </option>
            );
          })}
        </select>
        <ArticlesList articles={this.state.articles} />
      </div>
    );
  }
  handleTopicChange = event => {
    this.setState({ topic_name: event.target.value });
  };
}

export default Articles;
