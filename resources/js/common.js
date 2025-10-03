/****** Select Box ******/
$(document).on('click', '.select__box_value', function (e) {
  const t = $(this);
  console.log(t);
  if ($(this).parents('.select__box').hasClass('on')) {
    dropDownClose(t);
  } else {
    if ($(this).parents('.select__box').hasClass('disabled')) {
      return false;
    }
    $('.select__box').removeClass('on');
    selectBoxDown(t);
  }

  if (t.parents().hasClass('select__box_defalut')) {
    t.change(function () {
      t.css('color', '#222222')
    });
  }
});

$('.select__box_list li').click(function (e) {
  selectBoxDownAction(this);
  SelectBoxChange(this);
});

function selectBoxDown(t) {
  const $selectBox = t.parents('.select__box');
  if (!t.hasClass('disabled')) {
    if ($selectBox.hasClass('on')) {
      $selectBox.removeClass('on')
    } else {
      $selectBox.addClass('on');
      $selectBox.siblings('.select__box').removeClass('on');
    }
    $('body').on('click', function (e) {
      if ($(e.target).closest('.select__box').length === 0 && $('.select__box').hasClass('on')) {
        dropDownClose()
      }
    });
  };
};

function selectBoxDownAction(el) {
  $(el).parents('.select__box_list').find('li').removeClass('selected');
  if (!$(el).parent('li').hasClass('disabled')) {
    $(el).addClass('selected');
  }
  $(el).parents('.select__box').removeClass('on')
};

function dropDownClose() {
  $('.select__box').removeClass('on');
};

//Change Select Box Value
function SelectBoxChange(selectItem) {
  if ($(selectItem).find('ul').length <= 0) {
    var $cloneEle = $(selectItem).parents('.select__box').find('.select__box_value').children('span').children();
    var selectText = $(selectItem).html();//250117 수정
    clearInput(selectItem);
    $(selectItem).parents('.select__box').find('.select__box_value').children('span').html(selectText);//250117 수정
    $(selectItem).parents('.select__box').find('.select__box_value').children('span').append($cloneEle);
    $(selectItem).parents('.select__box').find('.select__box_value').children('span').css('color', '#222222');
  }
};

function clearInput(obj) {
  $(obj).parents('.select__box').find('.select__box_value').children('span').children().empty();//250117 수정
  $(obj).parents('.select__box').find('.select__box_value').children('span').empty();
};










function LineTabMenuInit() {
  var tabM = $('.tab_menu');
  var lineTab = $('.line_tab');
  if (tabM.hasClass("line_tab")) {
    tabM.each(function () {
      if ($(this).find('.tab_bar').length < 1) {
        $(this).append("<div class='tab_bar'></div>");
      };
    });
  }
  lineTab.each(function () {
    $(this).find('.tab_bar').css({
      "width": $(this).find(".current").outerWidth(),
      "left": $(this).find(".current").position().left + parseInt($(this).find(".current").css("margin-left"))
    });
  })
};



$(document).on('click', '.tab_menu .tab_list', function () { tabMenu(this) });

function tabMenu(el) {
  var tab = $(el).parents('.tab_menu');
  var activeTab = $(el).attr('data-tab');
  
  $(el).siblings('li').removeClass('current').attr('aria-selected', 'false');
  $(el).addClass('current').attr('aria-selected', 'true');
  $('#' + activeTab).siblings('.tab_cont_item').removeClass("current");
  $('#' + activeTab).addClass("current");

  if (tab.hasClass("line_tab")) {
    var tab = $(el).parents('.tab_menu');
    var tabBar = $(el).parents('.tab_menu').find('.tab_bar');
    if (tab.hasClass("line_tab")) {
      var liWidth = tab.find(".current").outerWidth();
      var marginLeft = parseInt(tab.find(".current").css("margin-left"));
      var left = tab.find(".current").position().left + marginLeft;
      var leftss = $(tab).scrollLeft();
      tabBar.css({
        "width": liWidth,
        "left": left + leftss
      });
    }
  }
}
$(window).on('load resize', function () {
  LineTabMenuInit()
});