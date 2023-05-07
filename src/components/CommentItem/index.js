import {formatDistanceToNow} from 'date-fns'

import './index.css'

const CommentItem = props => {
  const {commentDetails, toggleIsLike, onDelete} = props
  const {id, name, time, comment, like, initialClassName} = commentDetails
  const initial = name ? name[0].toUpperCase() : ''
  const isTime = formatDistanceToNow(time)
  const likeTextClassName = like ? 'button active' : 'button'
  const onClickLikeItem = () => {
    toggleIsLike(id)
  }

  const onClickDeleteItem = () => {
    onDelete(id)
  }

  const likeUrl = like
    ? 'https://assets.ccbp.in/frontend/react-js/comments-app/like-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/comments-app/liked-img.png'

  return (
    <li>
      <div className="sub-div">
        <div className={initialClassName}>
          <p className="profile">{initial}</p>
        </div>
        <div className="whole-para-div">
          <div className="para-div">
            <p className="name">{name}</p>
            <p className="time">{isTime}</p>
          </div>
          <p className="comment">{comment}</p>
        </div>
      </div>
      <div className="like-delete-div">
        <div className="like-div">
          <img src={likeUrl} alt="like" className="like-delete-image" />
          <button
            className={likeTextClassName}
            type="button"
            onClick={onClickLikeItem}
          >
            <p className="like">Like</p>
          </button>
        </div>
        <div>
          <button
            data-testid="delete"
            className="button"
            type="button"
            onClick={onClickDeleteItem}
          >
            <img
              src="https://assets.ccbp.in/frontend/react-js/comments-app/delete-img.png"
              alt="delete"
              className="like-delete-image"
            />
          </button>
        </div>
      </div>
      <hr className="hr" />
    </li>
  )
}

export default CommentItem
