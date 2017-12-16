/* global $ */
/* exported incrementCount */

const incrementCount = (element) => {
  let container = element.parentNode;
  let number = Number(container.children[1].innerHTML);
  let decrement_element = container.children[0].className;
  let increment_element = container.children[2].className;

  $("."+decrement_element).hover(function(){
    $(this).css("cursor","pointer","important");
  });


  if(number === 5){
    $("."+increment_element).hover(function(){
      $(this).css("cursor","not-allowed","important");
    });
  } else if(number < 5){
    $("."+increment_element).hover(function(){
      $(this).css("cursor","pointer","important");
    });
  }

  if(number <= 4){
    number += 1;
    container.children[1].innerHTML = number;
  }

};
