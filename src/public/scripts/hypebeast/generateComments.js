/* global $, createParentDiv,
createReplyDiv,  */
/* exported generateComments */
const generateComments = (username, allParentCommentsString, allRepliesString, allCommentsString) => {

  let allParentComments = JSON.parse(allParentCommentsString);
  let allReplies = JSON.parse(allRepliesString);
  let allComments = JSON.parse(allCommentsString);


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

  for(let x = 0; x < allReplies.length; x++){
    $("#post_comment_"+allReplies[x].parent_comment_id)
      .append(
        createReplyDiv(
          allReplies[x].user_name,
          "getName",
          allReplies[x].comment_text,
          allReplies[x].post_id,
          allReplies[x].user_id,
          allReplies[x].id,
          allReplies[x].user_avatar,
          allReplies[x].user_avatar_background_color
        )
      )
  }


};
