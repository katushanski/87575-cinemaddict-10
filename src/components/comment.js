export const createCommentTemplate = (comment) =>
  `<li class="film-details__comment">
    <span class="film-details__comment-emoji">
      <img src="./images/emoji/${comment.emoji}" width="55" height="55" alt="emoji">
    </span>
    <div>
      <p class="film-details__comment-text">${comment.text}</p>
      <p class="film-details__comment-info">
        <span class="film-details__comment-author">${comment.author}</span>
        <span class="film-details__comment-day">${comment.day}</span>
        <button class="film-details__comment-delete">Delete</button>
      </p>
    </div>
  </li>`;
