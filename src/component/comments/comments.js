import React, { Component } from 'react';
import * as api from '../../api';
import moment from 'moment';
import CommentInput from './CommentInput';
import DeleteCommentFunc from './deleteComment';
import NumberContext from '../../context';
import CommentVote from './CommentVote';

class CommentsPage extends Component {
  state = {
    comments: [],
    article: [],
    voteUp: false,
    voteDown: false
  };

  async componentDidMount() {
    const comments = await api.getCommentsForArticle(
      this.props.match.params.article_id
    );
    const article = await api.getArticleById(
      this.props.match.params.article_id
    );
    this.setState({ comments, article });
  }

  render() {
    console.log('comment render');
    return (
      <div key={this.state.article_id} className="container">
        <header className="commentHeader">
          <h1>{this.state.article.title}</h1>
          <h3>{this.state.article.body}</h3>
          <p>Author: {this.state.article.username}</p>
          <p>Votes: {this.state.article.votes}</p>
        </header>
        <main className="commentMain">
          {[...this.state.comments]
            .sort(function(a, b) {
              return (
                moment(a.created_at).format('X') -
                moment(b.created_at).format('X')
              );
            })
            .map(comment => {
              return (
                <div key={comment._id} className="commentBox">
                  <p>
                    <b>{comment.username}:</b> {comment.body}
                  </p>
                  Posted {moment(comment.created_at).fromNow('LLL')}
                  <p>Votes: {comment.votes}</p>
                  <NumberContext.Consumer>
                    {val => (
                      <DeleteCommentFunc
                        currentUser={val}
                        authorUser={comment.created_by}
                        id={comment._id}
                        deleteCom={this.deleteCom}
                      />
                    )}
                  </NumberContext.Consumer>
                  <CommentVote
                    voteUp={this.state.voteUp}
                    voteDown={this.state.voteDown}
                    handleVoteUp={this.handleVoteUp}
                    handleVoteDown={this.handleVoteDown}
                    votes={comment.votes}
                    id={comment._id}
                  />
                </div>
              );
            })}
        </main>
        <footer className="commentFooter">
          <CommentInput
            id="messageInput"
            article_id={this.state.article._id}
            addComment={this.addComment}
          />
          <br />
          <br />
        </footer>
      </div>
    );
  }
  addComment = newComment => {
    this.setState({
      comments: [...this.state.comments, newComment]
    });
  };
  deleteCom = id => {
    const newComArr = [...this.state.comments].filter(
      comment => comment._id !== id
    );
    api.deleteComment(id);
    this.setState({ comments: newComArr });
  };

  handleVoteUp = async id => {
    const comment = await api.voteComment(id, {
      vote: 'up'
    });

    this.setState({
      comments: [...this.state.comments, ...comment],
      voteUp: true
    });
  };

  handleVoteDown = async id => {
    const comment = await api.voteComment(id, {
      vote: 'down'
    });

    this.setState({
      comments: [...this.state.comments, ...comment],
      voteDown: true
    });
  };
}

export default CommentsPage;
