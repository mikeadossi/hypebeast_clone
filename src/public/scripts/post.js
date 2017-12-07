const submitCommentToDB = (element, post_id, user_id, user_name) => {
  console.log('submitCommentToDB called!');
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
  .then( comments =>  comments.json() )
  .then( commentJSON => {
    let append_to_container = $('.posts_comments_main_container');

    insertNewComment(
      append_to_container,
      user_name,
      user_comment,
      post_id,
      user_id,
      commentJSON[0].id
    );
  })
  .catch(err => console.log(err))
}


const submitReply = (element, post_id, user_id, user_name, comment_id, replyTo) => {

  let user_comment = element.parentNode.parentNode.children[1].value;
  if(!user_comment){ return };
  let whereToAppend = $(element).closest('.post_comment');
  /* TODO- get user possibly using comment_id, or passing in username from pug view, when reply function is originally called! */

  $('.reply_comment_container').remove();

  let route = window.location.href + '/add-reply-to-db/' + comment_id;

  fetch(route, {
    method: 'POST',
    headers: new Headers({
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }),
    body: JSON.stringify({
      new_comment: user_comment,
      user_id: user_id,
      post_id: post_id,
      user_name: user_name
    }),
    credentials: "same-origin"
  })
  .then( comments =>  comments.json() )
  .then( updatedComment => {

    whereToAppend.append(`
        <div class="new_comment_container">
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
            <div class="post_replies_main_container_1">
              `+user_comment+`
            </div>
            <div class="req.params.comment_id">
              <span class="fa fa-angle-up"></span>
              <span class="reply_seperator"></span>
              <span class="fa fa-angle-down"></span>
              <span class="reply_dot_separator"></span>
              <span>
                <button class="reply_button" onclick="writeReply(this,
                  '`+user_name+`',
                  `+post_id+`,
                  `+user_id+`,
                  `+updatedComment[0].id+`,
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
    `)

  })
  .catch(err => console.log(err))
}

const insertNewComment = (container, username, comment, post_id, user_id, comment_id) => {

  container.prepend(`
    <div class="new_comment_container reply_comment_container">
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
              Reply*
            </button>
          </span>
          <span class="reply_dot_seperator">.</span>
          <span class="share_reply_button empty_link">Share</span>
        </div>
      </div>
    </div>

    `)
}


const writeReply = (element, username, post_id, user_id, comment_id, replyTo) => {
  console.log('write reply...');
  let parent = element.parentNode.parentNode.parentNode.parentNode;
  let whereToAppend = $(element).closest('.post_comment');
  // let replyTo = element.parentNode.parentNode.parentNode.children[0].children[0].innerHTML;
  console.log('whereToAppend ===> ',whereToAppend);

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
        </div>
          <div class="post_textarea_content">
            <textarea class="post_textarea" onfocus="this.placeholder = ''" onblur="this.placeholder = 'join the discussion...'" placeholder="join the discussion..."></textarea>
            <div class="post_actions">
              <button class="post_as_user" onclick="submitReply(this,
                  `+post_id+`,
                  `+user_id+`,
                  '`+username+`',
                  `+comment_id+`,
                  '`+replyTo+`'
                )" >post as `+username+`!!!</button>
            </div>
          </div>
        <div>
          <span class="close_reply_button" onclick="closeReply(this)">Close</span>
        </div>
        <div class="post_replies_main_container_1">
        </div>
    </div>
    `)

}

// const appendReplyComment = (
//   whereToAppend,
//   username,
//   comment,
//   userRespondingTo,
//   post_id,
//   user_id) => {
//   whereToAppend.append(`
//       <div class="appended_reply reply_comment">
//         <div class="commenter_avatar">
//           <img class="commenter_avatar_image" src="/images/hypebeast_images/avatars/png/fox.png" />
//         </div>
//         <div class="post_comment">
//           <div class="reply_commenter_content">
//             <div class="comment_username_container">
//               <span class="commenter_name">
//                 `+username+`
//               </span>
//               <span>
//                 <img class="directed_at" src="/images/hypebeast_images/general/directed_at.png" />
//               </span>
//               <span class="directed_at_username">
//                 `+userRespondingTo+`
//               </span>
//               <span class="reply_dot_seperator">.</span>
//               <span class="comment_time">an hour ago</span>
//             </div>
//             <div class="commenter_input_container">
//               <p class="comment_text">
//                 `+comment+`
//               </p>
//             </div>
//           <div class="post_replies_main_container_1">
//           </div>
//           <div class="comment_reply_container">
//             <span class="fa fa-angle-up"></span>
//             <span class="reply_seperator"></span>
//             <span class="fa fa-angle-down"></span>
//             <span class="reply_dot_separator"></span>
//             <span>
//               <button class="reply_button" onclick="writeReply(this,`+whereToAppend+`,
//                 `+username+`,
//                 `+post_id+`,
//                 `+user_id+`
//               )">
//                 Reply#
//               </button>
//             </span>
//             <span class="reply_dot_seperator">.</span>
//             <span class="share_reply_button empty_link">Share</span>
//           </div>
//         </div>
//         </div>
//       </div>
//       `)
// }

const closeReply = (element) => {
  $(element).closest('.reply_comment_container').remove();
}
