$(function () {
  var main = $('main');
  var list = $('button[name="list"]');
  var grid = $('button[name="grid"]')

  grid.click(function (){
    grid.addClass('selected');
    list.removeClass('selected');
    main.removeClass('list');
  });

  list.click(function (){
    list.addClass('selected');
    grid.removeClass('selected');
    main.addClass('list');
  });
});
