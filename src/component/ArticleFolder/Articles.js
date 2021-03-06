import React, { Component } from 'react';
import ArticlesList from './ArticlesList';
import * as api from '../../api';
import LoadingIcon from '../../Loading';

class Articles extends Component {
  state = {
    articles: [],
    topics: [],
    topic_name: ''
  };

  componentDidMount = async () => {
    Promise.all([api.fetchArticles(), api.fetchTopics()]).then(
      ([articles, topics]) => {
        this.setState({ articles, topics });
      }
    );
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
    return !this.state.articles.length || !this.state.topics.length ? (
      <LoadingIcon />
    ) : (
      <div className="dropDiv">
        <select
          id="topicList"
          onChange={this.handleTopicChange}
          className="dropdownTopic"
        >
          <option
            className="dropdown"
            disabled
            selected
            key="topicSearch"
            value="null"
          >
            Search by Topic
          </option>
          {Object.values(this.state.topics).map(topic => {
            return (
              <option className="dropdown" key={topic._id} value={topic.slug}>
                {topic.title}
              </option>
            );
          })}
        </select>
        <select
          id="Search by popularity"
          onChange={this.handlePopSearch}
          className="dropdown1"
        >
          <option
            className="dropdown1"
            disabled
            selected
            key="null"
            value="null"
          >
            Search by poplularity
          </option>
          <option className="dropdown1" key="HiLo" value="HiLo">
            hi-low
          </option>
          <option className="dropdown1" key="LoHi" value="LoHi">
            low-hi
          </option>
        </select>
        <ArticlesList articles={this.state.articles} />
      </div>
    );
  }
  handleTopicChange = event => {
    console.log(this.state);
    if (event.target.value !== null)
      this.setState({ topic_name: event.target.value });
  };
  handlePopSearch = (event, value) => {
    const sortPopHiLo = [...this.state.articles].sort(function(a, b) {
      return b.votes - a.votes;
    });
    const sortPopLoHi = [...this.state.articles].sort(function(a, b) {
      return a.votes - b.votes;
    });

    if (event.target.value === 'HiLo') {
      console.log('hitHiLo');
      this.setState({ articles: sortPopHiLo });
    }
    if (event.target.value === 'LoHi') {
      console.log('hitLoHi');
      this.setState({ articles: sortPopLoHi });
    }
    console.log(this.state.articles);
  };
}

export default Articles;
