let createReplyDiv = (user_name, replyTo, user_comment, post_id, user_id, comment_id) => {
  return `
  <div class="new_comment_container">
    <div class="commenter_avatar">
      <img class="commenter_avatar_image"
        src="/images/hypebeast_images/avatars/png/fox.png" />
    </div>
    <div id="post_comment_`+comment_id+`" class="post_comment">
      <div class="reply_commenter_content commenter_content_`+comment_id+` ">
        <div class="comment_username_container">
          <span class="commenter_name">
            `+user_name+`
          </span>
          <span>
            <img class="directed_at" src="/images/hypebeast_images/general/directed_at.png" />
          </span>
          <span class="directed_at_username">
            `+replyTo+`
          </span>
          <span class="reply_dot_seperator">.</span>
          <span class="comment_time">an hour ago</span>
        </div>
      </div>
      <p class="post_replies_main_container_1">
        `+user_comment+`
      </p>
      <div class="comment_reply_container">
        <span class="fa fa-angle-up"></span>
        <span class="reply_seperator"></span>
        <span class="fa fa-angle-down"></span>
        <span class="reply_dot_separator"></span>
        <span>
          <button class="reply_button" onclick="writeReply(this,
            '`+$('.usernameVal').val()+`',
            `+post_id+`,
            `+user_id+`,
            `+comment_id+`,
            '`+user_name+`'
          )">
            Replyyy
          </button>
        </span>
        <span class="reply_dot_seperator">.</span>
        <span class="share_reply_button empty_link">Share</span>
      </div>
    </div>
  </div>
  `
};
