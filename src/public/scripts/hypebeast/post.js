/* global $, fetch, Headers, console, window */
/* exported submitCommentToDB, submitReply, writeReply, closeReply */
const submitCommentToDB = (
  element,
  post_id,
  user_id,
  user_name,
  user_avatar,
  user_avatar_background_color
) => {

  let user_comment = element.parentNode.parentNode.children[1].value;
  let route = window.location.href + "/add-comment-to-db";
  post_id = JSON.parse(post_id);
  user_id = JSON.parse(user_id);
  $('.post_textarea').val("");

  fetch(route, {
    method: "POST",
    headers: new Headers({
      "Accept": "application/json",
      "Content-Type": "application/json"
    }),
    body: JSON.stringify({
      user_comment: user_comment,
      post_id: post_id,
      user_id: user_id,
      user_name: user_name,
      user_avatar: user_avatar,
      user_avatar_background_color: user_avatar_background_color
    }),
    credentials: "same-origin"
  })
    .then( comments =>  comments.json() )
    .then( commentJSON => {

      let append_to_container = $(".posts_comments_main_container");

      insertNewParentComment(
        append_to_container,
        user_name,
        user_comment,
        post_id,
        user_id,
        commentJSON[0].id,
        user_avatar,
        user_avatar_background_color
      );
    })
    .catch(err => console.log(err));
};


const submitReply = (
  element,
  post_id,
  user_id,
  user_name,
  comment_id,
  replyTo,
  user_avatar,
  user_avatar_background_color
) => {

  console.log('reply submitted?')

  let user_comment = element.parentNode.parentNode.children[1].value;
  if(!user_comment){ return; }
  let whereToAppend = $(element).closest(".post_comment");

  $(".reply_comment_container").remove();

  let route = window.location.href + "/add-reply-to-db/" + comment_id;

  fetch(route, {
    method: "POST",
    headers: new Headers({
      "Accept": "application/json",
      "Content-Type": "application/json"
    }),
    body: JSON.stringify({
      new_comment: user_comment,
      user_id: user_id,
      post_id: post_id,
      user_name: user_name,
      user_avatar: user_avatar,
      user_avatar_background_color: user_avatar_background_color
    }),
    credentials: "same-origin"
  })
    .then( comments =>  comments.json() )
    .then( updatedComment => {

      whereToAppend.append(`
        <div class="new_comment_container">
          <div
            class="commenter_avatar"
            style="background-color:`+user_avatar_background_color+`;"
          >
            <img class="commenter_avatar_image post_user_avatar"
              src=`+user_avatar+` />
          </div>
          <div class="post_comment">
            <div class="reply_commenter_content commenter_content_`+comment_id+` ">
              <div class="comment_username_container">
                <span class="commenter_name">
                  `+user_name+` :P
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
            <div class="req.params.comment_id">
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
                  `+updatedComment[0].id+`,
                  '`+user_name+`',
                  '`+user_avatar+`',
                  '`+user_avatar_background_color+`'
                )">
                  Replyyy
                </button>
              </span>
              <span class="reply_dot_seperator">.</span>
              <span class="share_reply_button empty_link">Share</span>
            </div>
          </div>
        </div>
    `);

    })
    .catch(err => console.log(err));
};

const insertNewParentComment = (
  element,
  user_name,
  comment,
  post_id,
  user_id,
  comment_id,
  user_avatar,
  user_avatar_background_color
) => {


  element.prepend(`
    <div class="new_comment_container reply_comment_container">
      <div
        class="commenter_avatar"
        style="background-color:`+user_avatar_background_color+`;"
      >
        <img class="commenter_avatar_image post_user_avatar"
          src=`+user_avatar+` />
      </div>
      <div class="post_comment">
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
        <p class="post_replies_main_container_1">
        </p>
        <div class="comment_reply_container">
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
              Reply*
            </button>
          </span>
          <span class="reply_dot_seperator">.</span>
          <span class="share_reply_button empty_link">Share</span>
        </div>
      </div>
    </div>

    `);
};


const writeReply = (
  element,
  user_name,
  post_id,
  user_id,
  comment_id,
  replyTo,
  user_avatar,
  user_avatar_background_color
) => {

  console.log('>>> called!');
  console.log('element: ',element);

  $(".write_reply_comment").css("display","none");
  let whereToAppend = $(element).closest(".post_comment");

  whereToAppend.append(`
      <div class="write_reply_comment reply_comment_container">
        <div
          class="commenter_avatar"
          style="background-color:`+user_avatar_background_color+`;"
        >
          <img class="commenter_avatar_image post_user_avatar"
            src=`+user_avatar+` />
        </div>
        <div class="reply_comment">
          <div class="reply_commenter_content commenter_content_`+comment_id+` ">
            <div class="comment_username_container">
              <span class="commenter_name">
                `+$(".usernameVal").val()+`
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
          <div class="post_textarea_content">
            <textarea class="post_textarea" onfocus="this.placeholder = ''" onblur="this.placeholder = 'join the discussion...'" placeholder="join the discussion..."></textarea>
            <div class="post_actions">
              <button class="post_as_user" onclick="submitReply(
                  this,
                  `+post_id+`,
                  `+user_id+`,
                  '`+user_name+`',
                  `+comment_id+`,
                  '`+replyTo+`',
                  '`+user_avatar+`',
                  '`+user_avatar_background_color+`'
                )" >post as `+user_name+`!!!</button>
            </div>
          </div>
        <div>
          <span class="close_reply_button" onclick="closeReply(this)">Close</span>
        </div>
        <p class="post_replies_main_container_1">
        </p>
    </div>
    `);

};

const closeReply = (element) => {
  $(element).closest(".reply_comment_container").remove();
};
