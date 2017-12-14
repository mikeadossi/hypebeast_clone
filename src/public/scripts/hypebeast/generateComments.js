/* global $, createParentDiv, createReplyDiv,  */
/* exported generateComments */
const generateComments = (allParentCommentsString, allRepliesString) => {

  let allParentComments = JSON.parse(allParentCommentsString);
  let allReplies = JSON.parse(allRepliesString);

  for(let i = 0; i < allParentComments.length; i++){
    $(".generated_comment_container")
      .prepend(
        createParentDiv(
          allParentComments[i].user_name,
          allParentComments[i].comment_text,
          allParentComments[i].post_id,
          allParentComments[i].user_id,
          allParentComments[i].id,
          allParentComments[i].user_avatar,
          allParentComments[i].user_avatar_background_color
        )
      );
  }

  let parentCommentsObj = new Object();

  for(let i = 0; i < allParentComments.length; i++){
    parentCommentsObj[allParentComments[i].id] = allParentComments[i];
  }

  let repliesObj = new Object();

  for(let i = 0; i < allReplies.length; i++){
    repliesObj[allReplies[i].id] = allReplies[i];
  }

  let replyTo;

  for(let x = 0; x < allReplies.length; x++){
    if(parentCommentsObj[allReplies[x].parent_comment_id] === undefined){
      replyTo = repliesObj[allReplies[x].parent_comment_id].user_name
    } else {
      replyTo = parentCommentsObj[allReplies[x].parent_comment_id].user_name;
    }

    $("#post_comment_"+allReplies[x].parent_comment_id)
      .append(
        createReplyDiv(
          allReplies[x].user_name,
          replyTo,
          allReplies[x].comment_text,
          allReplies[x].post_id,
          allReplies[x].user_id,
          allReplies[x].id,
          allReplies[x].user_avatar,
          allReplies[x].user_avatar_background_color
        )
      );
  }


};
