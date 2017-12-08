const generateComments = (username, allParentCommentsString, allRepliesString, allCommentsString) => {

  allParentComments = JSON.parse(allParentCommentsString);
  allReplies = JSON.parse(allRepliesString);
  allComments = JSON.parse(allCommentsString);

  let commentsLength = allParentComments.length + allReplies.length;

  const createRepliesObjectClosure = () => {
    let repliesObj = new Object();
    let emptyArray = [];

    for(let i = 0; i < allComments.length; i++){
      repliesObj[ allComments[i].id ] = '';
    }
    return repliesObj;
  }

  let repliesObject = createRepliesObjectClosure();
  let repliesArr

  for(let x = 0; x < allReplies.length; x++){
    let index = allReplies[x].parent_comment_id;
    let reply = JSON.stringify(allReplies[x]).replace(/[\[\]']+/g,'');
    let repliesAtIndexArray = repliesObject[index];
    repliesAtIndexArray = reply;
    repliesObject[index] = '['+repliesAtIndexArray+']';
  }

  for(let i = 0; i < allParentComments.length; i++){
    $('.generated_comment_container')
      .prepend( createParentDiv(
          allParentComments[i].user_name,
          allParentComments[i].comment_text,
          allParentComments[i].post_id,
          allParentComments[i].user_id,
          allParentComments[i].id
        )
      )
  }

  for(let x = 1; x < Object.keys(repliesObject).length+1; x++){
    if(repliesObject[x]){
      let reply = JSON.parse(repliesObject[x]);

      $('#post_comment_'+reply[0].parent_comment_id)
        .append( createReplyDiv(
            reply[0].user_name,
            'getName',
            reply[0].comment_text,
            reply[0].post_id,
            reply[0].user_id,
            reply[0].id
          )
        )
    }
  }


};
