const submitReply = (element) => {

  let parent = element.parentNode.parentNode.parentNode.parentNode;
  let post_comment = $(element).closest('.post_comment')

  let username = element.parentNode.parentNode.parentNode.children[0].children[0].innerHTML;

  post_comment.append(`
    <div class="reply_comment">
      <div class="commenter_avatar">
        <img class="commenter_avatar_image" src="/images/hypebeast_images/avatars/png/fox.png" />
      </div>
      <div class="post_comment">
        <div class="reply_commenter_content">
          <div class="comment_username_container">
            <span class="commenter_name">username</span>
            <span>
              <img class="directed_at" src="/images/hypebeast_images/general/directed_at.png" />
            </span>
            <span class="directed_at_username">
              `+username+`
            </span>
            <span class="reply_dot_seperator">.</span>
            <span class="comment_time">an hour ago</span>
          </div>
          <div class="commenter_input_container">
            <p class="comment_text"> this is a comment! </p>
          </div>
          <div class="comment_reply_container">
            <span class="fa fa-angle-up"></span>
            <span class="reply_seperator"></span>
            <span class="fa fa-angle-down"></span>
            <span class="reply_dot_separator"></span>
            <span>
              <button class="reply_button" onclick="submitReply(this)">
                Reply
              </button>
            </span>
            <span class="reply_dot_seperator">.</span>
            <span class="share_reply_button empty_link">Share</span>
          </div>
        </div>
        <div class="post_replies_main_container_1">
        </div>
      </div>
    </div>`)
}
