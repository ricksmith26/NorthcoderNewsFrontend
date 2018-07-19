import React, { Component } from 'react';
import * as api from '../../api';
import moment from 'moment';
import CommentInput from './CommentInput';
import DeleteCommentFunc from './deleteComment';

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

  // async componentDidUpdate(_, prevState) {
  //   if (prevState.comments !== this.state.comments) {
  //     const comments = await api.getCommentsForArticle(
  //       this.props.match.params.article_id
  //     );

  //     this.setState({ comments });
  //   }
  // }

  render() {
    return (
      <div key={this.state.article_id}>
        <h1>{this.state.article.title}</h1>
        <h3>{this.state.article.body}</h3>
        <p>Author: {this.state.article.username}</p>
        <p>Votes: {this.state.article.votes}</p>
        {[...this.state.comments]
          .sort(function(a, b) {
            return (
              moment(a.created_at).format('X') -
              moment(b.created_at).format('X')
            );
          })
          .map(comment => {
            return (
              <div key={comment._id}>
                <p>
                  <b>{comment.username}:</b> {comment.body}
                </p>
                Posted {moment(comment.created_at).fromNow('LLL')}
                <p>Votes: {comment.votes}</p>
                {/* {DeleteCommentFunc(
                  '5b4f4b8c224754466af76ab7',
                  comment.created_by,
                  comment._id
                )} */}
                <DeleteCommentFunc
                  currentUser={this.props.loggedIn}
                  authorUser={comment.created_by}
                  id={comment._id}
                  deleteCom={this.deleteCom}
                />
                <br /> <br />
              </div>
            );
          })}

        <CommentInput
          id="messageInput"
          article_id={this.state.article._id}
          addComment={this.addComment}
        />
        <br />
        <br />
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
}

export default CommentsPage;
