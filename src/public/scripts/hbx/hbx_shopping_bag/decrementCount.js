/* global $ */
/* exported decrementCount */

const decrementCount = (element, num_floor) => {
  let container = element.parentNode;
  let number = Number(container.children[1].innerHTML);
  let decrement_element = container.children[0].className;

  let increment_element = container.children[2].className;

  $("."+increment_element).hover(function(){
    $(this).css("cursor","pointer");
  });

  if(number === num_floor){
    $("."+decrement_element).hover(function(){
      $(this).css("cursor","not-allowed","important");
      return;
    });
  }

  if(number > num_floor && number <= 5){
    number -= 1;
    container.children[1].innerHTML = number;
  }

  return number;
};
