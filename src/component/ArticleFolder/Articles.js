import React, { Component } from 'react';
import ArticlesList from './ArticlesList';
import * as api from '../../api';
import LoadingIcon from '../../Loading';

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
      try {
        const articles = await api.fetchArticlesByTopic(this.state.topic_name);

        this.setState({ articles: articles });
      } catch (err) {
        if (err.response.status === 404 || err.response.status === 400)
          this.props.history.push('404');
        else this.props.history.push('500');
      }
    }
  }

  render() {
    console.log('artcileRender');
    if (!this.state.articles.length || !this.state.topics.length)
      return <LoadingIcon />;
    return (
      <div className="dropDiv">
        <select
          id="topicList"
          onChange={this.handleTopicChange}
          className="dropdown"
        >
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
