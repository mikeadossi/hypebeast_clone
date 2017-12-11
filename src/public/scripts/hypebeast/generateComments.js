/* global $, createParentDiv,
createReplyDiv,  */
/* exported generateComments */
const generateComments = (username, allParentCommentsString, allRepliesString, allCommentsString) => {

  let allParentComments = JSON.parse(allParentCommentsString);
  let allReplies = JSON.parse(allRepliesString);
  let allComments = JSON.parse(allCommentsString);

  const createRepliesObjectClosure = () => {
    let repliesObj = new Object();

    for(let i = 0; i < allComments.length; i++){
      repliesObj[ allComments[i].id ] = "";
    }
    return repliesObj;
  };

  let repliesObject = createRepliesObjectClosure();

  for(let x = 0; x < allReplies.length; x++){
    let index = allReplies[x].parent_comment_id;
    let reply = JSON.stringify(allReplies[x]).replace(/[\[\]']+/g,"");
    let repliesAtIndexArray = repliesObject[index];
    repliesAtIndexArray = reply;
    repliesObject[index] = "["+repliesAtIndexArray+"]";
  }

  for(let i = 0; i < allParentComments.length; i++){
    $(".generated_comment_container")
      .prepend( createParentDiv(
        allParentComments[i].user_name,
        allParentComments[i].comment_text,
        allParentComments[i].post_id,
        allParentComments[i].user_id,
        allParentComments[i].id
      )
      );
  }

  for(let x = 1; x < Object.keys(repliesObject).length+1; x++){
    if(repliesObject[x]){
      let reply = JSON.parse(repliesObject[x]);

      $("#post_comment_"+reply[0].parent_comment_id)
        .append( createReplyDiv(
          reply[0].user_name,
          "getName",
          reply[0].comment_text,
          reply[0].post_id,
          reply[0].user_id,
          reply[0].id
        )
        );
    }
  }


};
