const submitCommentToDB = (element, post_id, user_id, user_name, typeOfComment) => {

  let user_comment = element.parentNode.parentNode.children[1].value;
  // console.log('user_comment: ',user_comment);
  let route = window.location.href + '/add-comment-to-db';
  post_id = JSON.parse(post_id);
  user_id = JSON.parse(user_id);

  fetch(route, {
    method: 'POST',
    headers: new Headers({
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }),
    body: JSON.stringify({
      user_comment: user_comment,
      post_id: post_id,
      user_id: user_id,
      user_name: user_name
    }),
    credentials: "same-origin"
  })
  .then( obj => {
    let append_to_container;

    if(typeOfComment === 'new comment'){
      append_to_container = $('.posts_comments_main_container');
    } else if(typeOfComment === 'reply comment'){
      append_to_container = $(element).closest('.post_replies_main_container_1');
    }
    // $('.write_reply_comment').remove()
    // console.log('removed?');
    insertNewComment(append_to_container, user_name, user_comment, post_id, user_id);
    $('.write_reply_comment').remove()
  })
  .catch(err => console.log(err))
}









const submitReply = (element, post_id, user_id, user_name) => {
  let user_comment = element.parentNode.parentNode.children[1].value;
  let whereToAppend = $(element).closest('.post_comment');

  // whereToAppend.append('<div>'+user_comment+'</div>')
  whereToAppend.append(`

      <div class="new_comment">
        <div class="commenter_avatar">
          <img class="commenter_avatar_image"
            src="/images/hypebeast_images/avatars/png/fox.png" />
        </div>
        <div class="post_comment">
          <div class="reply_commenter_content">
            <div class="comment_username_container">
              <span class="commenter_name">
                `+user_name+`
              </span>
              <span class="reply_dot_seperator">.</span>
              <span class="comment_time">an hour ago</span>
            </div>
            </div>
            <div class="post_replies_main_container_1">
              `+user_comment+`
            </div>
            <div class="comment_reply_container">
              <span class="fa fa-angle-up"></span>
              <span class="reply_seperator"></span>
              <span class="fa fa-angle-down"></span>
              <span class="reply_dot_separator"></span>
              <span>
              </span>
              <span class="reply_dot_seperator">.</span>
              <span class="share_reply_button empty_link">Share</span>
            </div>
          </div>
        </div>
      </div>
  `)

  $('.reply_comment_container').remove();
}










const insertNewComment = (container, username, comment, post_id, user_id) => {

  container.prepend(`
    <div class="new_comment reply_comment">
      <div class="commenter_avatar">
        <img class="commenter_avatar_image"
          src="/images/hypebeast_images/avatars/png/fox.png" />
      </div>
      <div class="post_comment">
        <div class="reply_commenter_content">
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
            `+user_id+`
          )">
            Reply
          </button>
        </span>
        <span class="reply_dot_seperator">.</span>
        <span class="share_reply_button empty_link">Share</span>
      </div>
    </div>`)
}


const writeReply = (element, username, post_id, user_id) => {

  let parent = element.parentNode.parentNode.parentNode.parentNode;
  let whereToAppend = $(element).closest('.post_comment');
  let replyTo = element.parentNode.parentNode.parentNode.children[0].children[0].innerHTML;
  let comment = 'this is a comment';
  console.log('parent: ',parent);
  console.log('whereToAppend: ',whereToAppend);
  console.log('element: ',element);
  whereToAppend.append(`
    <div class="write_reply_comment reply_comment_container">
      <div class="commenter_avatar">
        <img class="commenter_avatar_image" src="/images/hypebeast_images/avatars/png/fox.png" />
      </div>
      <div class="reply_comment">
        <div class="reply_commenter_content">
          <div class="comment_username_container">
            <span class="commenter_name">
              `+username+`
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
          <div class="post_textarea_content">
            <textarea class="post_textarea" onfocus="this.placeholder = ''" onblur="this.placeholder = 'join the discussion...'" placeholder="join the discussion..."></textarea>
            <div class="post_actions">
              <button class="post_as_user" onclick="submitReply(this,`+post_id+`,`+user_id+`,'`+username+`','reply comment')" >post as `+username+`!!!</button>
            </div>
          </div>
          <span class="share_reply_button empty_link" onclick="closeReply(this)">Close</span>
        </div>
        <div class="post_replies_main_container_1">
        </div>
      </div>
    </div>`)
}

const appendReplyComment = (
  whereToAppend,
  username,
  comment,
  userRespondingTo,
  post_id,
  user_id) => {
whereToAppend.append(`
    <div class="appended_reply reply_comment">
      <div class="commenter_avatar">
        <img class="commenter_avatar_image" src="/images/hypebeast_images/avatars/png/fox.png" />
      </div>
      <div class="post_comment">
        <div class="reply_commenter_content">
          <div class="comment_username_container">
            <span class="commenter_name">
              `+username+`
            </span>
            <span>
              <img class="directed_at" src="/images/hypebeast_images/general/directed_at.png" />
            </span>
            <span class="directed_at_username">
              `+userRespondingTo+`
            </span>
            <span class="reply_dot_seperator">.</span>
            <span class="comment_time">an hour ago</span>
          </div>
          <div class="commenter_input_container">
            <p class="comment_text">
              `+comment+`
            </p>
          </div>
          <div class="comment_reply_container">
            <span class="fa fa-angle-up"></span>
            <span class="reply_seperator"></span>
            <span class="fa fa-angle-down"></span>
            <span class="reply_dot_separator"></span>
            <span>
              <button class="reply_button" onclick="writeReply(this,`+whereToAppend+`,
                `+username+`,
                `+post_id+`,
                `+user_id+`
              )">
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

const closeReply = (element) => {
  $(element).closest('.reply_comment_container').remove();
}
