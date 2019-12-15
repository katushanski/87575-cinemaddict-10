export const createCommentTemplate = (comment) =>
  `<li class="film-details__comment">
    <span class="film-details__comment-emoji">
      <img src="./images/emoji/${comment.emoji}" width="55" height="55" alt="emoji">
    </span>
    <div>
      <p class="film-details__comment-text">${comment.message}</p>
      <p class="film-details__comment-info">
        <span class="film-details__comment-author">John Doe</span>
        <span class="film-details__comment-day">2 days ago</span>
        <button class="film-details__comment-delete">Delete</button>
      </p>
    </div>
  </li>`;
// comment.emoji и comment.message находятся в моках
