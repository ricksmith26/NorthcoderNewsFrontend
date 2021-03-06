import React, { Component } from 'react';
import * as api from '../../api';
import moment from 'moment';
import CommentInput from './CommentInput';
import DeleteCommentFunc from './deleteComment';
import CommentVote from './CommentVote';
import PropTypes from 'prop-types';

class CommentsPage extends Component {
  state = {
    comments: [],
    article: []
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
                  <DeleteCommentFunc
                    currentUser={this.props.id}
                    authorUser={comment.created_by}
                    id={comment._id}
                    deleteCom={this.deleteCom}
                  />
                  <CommentVote
                    voteUp={this.state.voteUp}
                    voteDown={this.state.voteDown}
                    votes={comment.votes}
                    id={comment._id}
                    comments={this.state.comments}
                    voteState={this.voteState}
                  />
                </div>
              );
            })}
        </main>
        <footer className="commentFooter">
          <CommentInput
            article_id={this.state.article._id}
            addComment={this.addComment}
            username={this.props.username}
            loggedIn={this.props.loggedIn}
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
  voteState = (commentId, vote) => {
    const newCommentArray = this.state.comments.map(comment => {
      if (comment._id === commentId) {
        return { ...comment, votes: comment.votes + vote };
      } else {
        return comment;
      }
    });
    if (vote === -1) {
      api.voteComment(commentId, { vote: 'down' });
    }
    if (vote === 1) {
      api.voteComment(commentId, { vote: 'up' });
    }

    this.setState({
      comments: newCommentArray
    });
  };
}

CommentsPage.propTypes = {
  username: PropTypes.string.isRequired,
  loggedIn: PropTypes.bool.isRequired,
  currentUser: PropTypes.string.isRequired
};
export default CommentsPage;
