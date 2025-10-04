/****** Select Box ******/
$(document).on('click', '.dropdown__value', function (e) {
  const t = $(this);
  console.log(t);
  if ($(this).parents('.dropdown').hasClass('on')) {
    dropDownClose(t);
  } else {
    if ($(this).parents('.dropdown').hasClass('disabled')) {
      return false;
    }
    $('.dropdown').removeClass('on');
    selectBoxDown(t);
  }
});

$('.dropdown__list li').click(function (e) {
  selectBoxDownAction(this);
  SelectBoxChange(this);
});

function selectBoxDown(t) {
  const $selectBox = t.parents('.dropdown');
  if (!t.hasClass('disabled')) {
    if ($selectBox.hasClass('on')) {
      $selectBox.removeClass('on')
    } else {
      $selectBox.addClass('on');
      $selectBox.siblings('.dropdown').removeClass('on');
    }
    $('body').on('click', function (e) {
      if ($(e.target).closest('.dropdown').length === 0 && $('.dropdown').hasClass('on')) {
        dropDownClose()
      }
    });
  };
};

function selectBoxDownAction(el) {
  $(el).parents('.dropdown__list').find('li').removeClass('selected');
  if (!$(el).parent('li').hasClass('disabled')) {
    $(el).addClass('selected');
  }
  $(el).parents('.dropdown').removeClass('on')
};

function dropDownClose() {
  $('.dropdown').removeClass('on');
};

//Change Select Box Value
function SelectBoxChange(selectItem) {
  if ($(selectItem).find('ul').length <= 0) {
    var $cloneEle = $(selectItem).parents('.dropdown').find('.dropdown__value').children('span').children();
    var selectText = $(selectItem).html();//250117 수정
    clearInput(selectItem);
    $(selectItem).parents('.dropdown').find('.dropdown__value').children('span').html(selectText);//250117 수정
    $(selectItem).parents('.dropdown').find('.dropdown__value').children('span').append($cloneEle);
    $(selectItem).parents('.dropdown').find('.dropdown__value').children('span').css('color', '#222222');
  }
};

function clearInput(obj) {
  $(obj).parents('.dropdown').find('.dropdown__value').children('span').children().empty();//250117 수정
  $(obj).parents('.dropdown').find('.dropdown__value').children('span').empty();
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


if ($('.prd-wrap.ir').length > 0) {
  $(document).on('click', '.prd-card', function (e) {
    e.preventDefault();
    let imgSrc = $(this).find('img').attr('src');
    let $parent = $(this).parent();
    if ($parent.hasClass('checked')) {
      $parent.removeClass('checked');
      $parent.find('.ani_cart').remove();
    } else {
      $parent.addClass('checked');
      $parent.append(
        '<div class="ani_cart"><div class="ir_cart"><img scr="" alt=""></div></div>'
      );
      $parent.find('.ani_cart img').attr('src', imgSrc);
      $parent.find('.ani_cart').addClass('active');
      setTimeout(function () {
        $parent.find('.ani_cart').removeClass('active');
      }, 1000);
    }
    let count = $('.prd-wrap').find('.prd-card.checked').length;
    $('.prd_cart_btn .count').text(count);
  });
  // putCart();
}