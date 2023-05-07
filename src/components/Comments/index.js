import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import CommentItem from '../CommentItem'

import './index.css'

const initialContainerBackgroundClassNames = [
  'amber',
  'blue',
  'orange',
  'emerald',
  'teal',
  'red',
  'light-blue',
]

class Comments extends Component {
  state = {
    commentsList: [],
    nameInput: '',
    commentInput: '',
  }

  onDelete = commentId => {
    const {commentsList} = this.state
    this.setState({
      commentsList: commentsList.filter(
        eachComment => eachComment.id !== commentId,
      ),
    })
  }

  toggleIsLike = id => {
    this.setState(prevState => ({
      commentsList: prevState.commentsList.map(eachComment => {
        if (id === eachComment.id) {
          return {...eachComment, like: !eachComment.like}
        }
        return eachComment
      }),
    }))
  }

  renderCommentsList = () => {
    const {commentsList} = this.state

    return commentsList.map(eachComment => (
      <CommentItem
        key={eachComment.id}
        commentDetails={eachComment}
        toggleIsLike={this.toggleIsLike}
        onDelete={this.onDelete}
      />
    ))
  }

  onAddComment = event => {
    event.preventDefault()
    const {nameInput, commentInput} = this.state
    const initialContainerBackgroundClassName = `initial-container ${
      initialContainerBackgroundClassNames[
        Math.Ceil(
          Math.random() * initialContainerBackgroundClassNames.length - 1,
        )
      ]
    }`
    const newComment = {
      id: uuidv4(),
      name: nameInput,
      comment: commentInput,
      time: new Date(),
      like: false,
      initialClassName: initialContainerBackgroundClassName,
    }

    this.setState(prevState => ({
      commentsList: [...prevState.commentsList, newComment],
      nameInput: '',
      commentInput: '',
    }))
  }

  onChangeTextArea = event => {
    this.setState({
      commentInput: event.target.value,
    })
  }

  onChangeInput = event => {
    this.setState({
      nameInput: event.target.value,
    })
  }

  render() {
    const {nameInput, commentInput, commentsList} = this.state

    return (
      <div className="main-bg">
        <div className="upper-div">
          <div>
            <h1 className="heading">Comments</h1>
            <form className="input-div" onSubmit={this.onAddComment}>
              <p className="para">Say something about 4.0 Technologies</p>
              <input
                className="input"
                type="text"
                value={nameInput}
                placeholder="Your Name"
                onChange={this.onChangeInput}
              />
              <textarea
                rows="6"
                type="text"
                value={commentInput}
                placeholder="Your Comment"
                onChange={this.onChangeTextArea}
              />
              <button className="button1" type="submit">
                Add Comment
              </button>
            </form>
          </div>
          <div className="image-div">
            <img
              src="https://assets.ccbp.in/frontend/react-js/comments-app/comments-img.png"
              alt="comments"
              className="image"
            />
          </div>
        </div>
        <hr className="hr" />
        <p className="para">
          <span className="span-ele">{commentsList.length}</span>Comments
        </p>
        <ul className="list-items">{this.renderCommentsList()}</ul>
      </div>
    )
  }
}

export default Comments
