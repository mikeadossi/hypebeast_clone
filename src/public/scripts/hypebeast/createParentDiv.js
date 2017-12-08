let createParentDiv = (username, comment, post_id, user_id, comment_id) => {
  return `
  <div id="post_comments_container_`+comment_id+`" class="post_comments_container">
    <div class="commenter_avatar">
      <img class="commenter_avatar_image"
        src="/images/hypebeast_images/avatars/png/fox.png" />
    </div>
    <div id="post_comment_`+comment_id+`" class="post_comment">
      <div class="reply_commenter_content commenter_content_`+comment_id+` ">
        <div class="comment_username_container">
          <span class="commenter_name">
            `+username+`
          </span>
          <span class="reply_dot_seperator">.</span>
          <span class="comment_time">an hour ago</span>
        </div>
        <div class="commenter_input_container">
          <p class="comment_text">
            `+comment+`
          </p>
        </div>
      </div>
      <div class="post_replies_main_container_1">
      </div>
      <div class="comment_reply_container">
        <span class="fa fa-angle-up"></span>
        <span class="reply_seperator"></span>
        <span class="fa fa-angle-down"></span>
        <span class="reply_dot_separator"></span>
        <span>
          <button class="reply_button" onclick="writeReply(this,
            '`+username+`',
            `+post_id+`,
            `+user_id+`,
            `+comment_id+`,
            'dunno'
          )">
            Reply^^
          </button>
        </span>
        <span class="reply_dot_seperator">.</span>
        <span class="share_reply_button empty_link">Share</span>
      </div>
    </div>
  </div>
  `
};
