$(function () {
  $(".item .itemName").mouseover(function () {
    $(".item .itemContents").stop().slideUp();
    $(this).next(".itemContents").stop().slideDown();
  });
  $(".item").mouseleave(function () {
    $(".item .itemContents").stop().slideUp();
  });
});
