/* global $ */
/* exported createParentDiv */

let createParentDiv = (
  user_name,
  comment,
  post_id,
  user_id,
  comment_id,
  user_avatar,
  user_avatar_background_color
) => {

  return `
  <div id="post_comments_container_`+comment_id+`" class="post_comments_container">
    <div
      class="commenter_avatar"
      style="background-color:`+user_avatar_background_color+`;"
    >
      <img class="commenter_avatar_image post_user_avatar"
        src=`+user_avatar+` />
    </div>
    <div id="post_comment_`+comment_id+`" class="post_comment">
      <div class="reply_commenter_content commenter_content_`+comment_id+` ">
        <div class="comment_username_container">
          <span class="commenter_name">
            `+user_name+`
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
      <div class="comment_reply_container post_replies_main_container_`+post_id+`">
        <span class="fa fa-angle-up"></span>
        <span class="reply_seperator"></span>
        <span class="fa fa-angle-down"></span>
        <span class="reply_dot_separator"></span>
        <span>
          <button class="reply_button" onclick="writeReply(
              this,
            '`+$(".usernameVal").val()+`',
            `+post_id+`,
            `+user_id+`,
            `+comment_id+`,
            '`+user_name+`',
            '`+$(".userAvatar").val()+`',
            '`+$(".userAvatarBackgroundColor").val()+`'
          )">
            Reply^^
          </button>
        </span>
        <span class="reply_dot_seperator">.</span>
        <span class="share_reply_button empty_link">Share</span>
      </div>
    </div>
  </div>
  `;
};
