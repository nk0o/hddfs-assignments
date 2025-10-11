/****** Select Box ******/
$(document).on('click', '.dropdown__value', function (e) {
  e.preventDefault();
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

$(document).on('click', '.dropdown__list li', function (e) {
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
    var selectText = $(selectItem).html();
    clearInput(selectItem);
    $(selectItem).parents('.dropdown').find('.dropdown__value').children('span').html(selectText);
    $(selectItem).parents('.dropdown').find('.dropdown__value').children('span').append($cloneEle);
    $(selectItem).parents('.dropdown').find('.dropdown__value').children('span').css('color', '#222222');
  }
};

function clearInput(obj) {
  $(obj).parents('.dropdown').find('.dropdown__value').children('span').children().empty();
  $(obj).parents('.dropdown').find('.dropdown__value').children('span').empty();
};


/**** Tab UI ****/

$(document).on('click', '.tab-menu .tab-menu__list', function () { tabMenu(this) });

function LineTabMenuInit() {
  var tabM = $('.tab-menu');
  var lineTab = $('.tab-menu--line');
  if (tabM.hasClass("tab-menu--line")) {
    tabM.each(function () {
      if ($(this).find('.tab-menu__bar').length < 1) {
        $(this).append("<div class='tab-menu__bar'></div>");
      };
    });
  }
  lineTab.each(function () {
    $(this).find('.tab-menu__bar').css({
      "width": $(this).find(".current").outerWidth(),
      "left": $(this).find(".current").position().left + parseInt($(this).find(".current").css("margin-left"))
    });
  })
};

function tabMenu(el) {
  var tab = $(el).parents('.tab-menu');
  var activeTab = $(el).attr('data-tab');

  $(el).siblings('li').removeClass('current').attr('aria-selected', 'false');
  $(el).addClass('current').attr('aria-selected', 'true');
  $('#' + activeTab).siblings('.tab_cont_item').removeClass("current");
  $('#' + activeTab).addClass("current");

  if (tab.hasClass("tab-menu--line")) {
    var tab = $(el).parents('.tab-menu');
    if (tab.hasClass("tab-menu--line")) {
      var liWidth = tab.find(".current").outerWidth();
      var marginLeft = parseInt(tab.find(".current").css("margin-left"));
      var left = tab.find(".current").position().left + marginLeft;
      var leftss = $(tab).scrollLeft();
    }
  }
  
  if (tab.hasClass('tab-menu--center')) {
    moveCenterTab(el);
  }
}
//Tab 가운데
function moveCenterTab(el){
  let liWid = 0,
    boxWid = $('.tab-menu--center').outerWidth(true),
    boxHalf = $('.tab-menu--center').outerWidth(true) / 2,
    leftPos = 0,
    // pd = $(el).parent('ul').css('padding-left') * 2,
    selectPos,
    pos;
  $(el).parents('.tab-menu--center').find('.tabmenu__list').each(function() {
    liWid += $(this).outerWidth(true);
  });
  for (let i=0; i< $(el).index(); i++) {
    leftPos += $(el).parents('.tab-menu--center').find('.tabmenu__list').eq(i).outerWidth(true);
  }
  selectPos = leftPos + $(el).outerWidth(true)/2;
  if (selectPos < boxHalf) {
  pos = 0;
  } else if (liWid - selectPos < boxHalf) {
  pos = liWid - boxWid;
  }  
  else {
  pos = selectPos - boxHalf ;
  }

  $(el).parents('.tab-menu--center').find('>ul').animate({scrollLeft:pos});
}

$(window).on('load resize', function () {
  LineTabMenuInit()
});

//탭클릭 앵커이동
let clickTab = $('.clickTab');
let headerH = $('header').outerHeight();
let tabListH = clickTab.outerHeight();
let userAreaH = 0;
$('.tab-menu').on('click', '.tab-menu__list', function(){
  let idx = $(this).index();
  let toEl = $(this).parents('.clickTab').length > 0 && $('.toCont').eq(idx);
  $("html, body").animate({
    scrollTop : toEl.offset().top - 24 - headerH 
  },700)
});

/**** Modal UI ****/
$(document).on('click', '.btn--modal-open', function (e) {
  e.preventDefault();
  let $target = $(e.target).hasClass('btn--modal-open') ? e.target : $(e.target).closest('.btn--modal-open');
  openModal($target);
});
$(document).on('click', '.modal__btn-close, .modal__overlay', function (e) {
  e.preventDefault();
  closeModal(e.target);
});
let timer = null;
$(window).on('resize', function () {//resize modal
  clearTimeout(timer);
  timer = setTimeout(modalPosition, 50);
})
function openModal(el) {
  const modalName = $(el).attr('data-modal');
  let thisModal = $(".modal__container[id='" + modalName + "']")
  let documentH = $(document).height();
  thisModal.removeAttr("aria-hidden").addClass('open');
  $("body").addClass("no_scroll");
  modalPosition(thisModal)
  $(el).find('.modal__overlay').css('height', documentH)
}
function closeModal(el) {
  $(el).parents(".modal__container").attr("aria-hidden", "true").removeClass('open');
  $("body").removeClass("no_scroll");
}
function modalPosition(el) {
  let windowH = $(window).height();
  let modal;
  el == true ? modal = $(el) : modal = $(".modal__container.open");
  const modalH = modal.find('.modal__content').height();
  const overlay = modal.find('.modal__overlay');
  const content = modal.find('.modal__content');

  if (modalH >= windowH - 100) {
    overlay.css('height', modalH + 100);
    content.css({ 'position': 'fixed', 'top': '50px' });
    modal.scrollTop(0);
  } else if (modalH < windowH) {
    modal.find('.modal__overlay').css('height', windowH);
    content.css({ 'position': 'relative', 'top': 'auto' });
  }
}

/**** 상품 장바구니 담기 ****/
$('.cart-action').on('click', '.prd-card__cart', function (e) {
  e.preventDefault();
  let $prdCard = $(this).parents('.prd-card');
  let $imgSrc = $prdCard.find('img').attr('src');
  console.log($imgSrc)
  $('.wrap').append(
    `<div class="ani__cart">
      <div class="ir_cart"><img scr="" alt></div>
      <div class="cart-msg__text"><p>장바구니에 담겼습니다:)</p></div>
    </div>`
  );
  $('.wrap').find('.ani__cart img').attr('src', $imgSrc);
  $('.wrap').find('.ani__cart').addClass('active');
  setTimeout(function () {
    $('.wrap').find('.ani__cart').removeClass('active').remove();
  }, 3000);
});


//카트 담기
$(document).on('click', '.btn_cart', function(){
  if(!$('.cart-msg').length){
    putInCartAction();
  }
})
function putInCartAction(){
  $('.wrap').append(`
    <div class="cart-msg">
      <div class="cart-msg__ani">
        <div class="cart-msg__icon"><span></span>
      </div>
    </div>
    <div class="cart-msg__text"><p>장바구니에 담겼습니다:)</p></div>
    `)
  $('.cart-msg').addClass('active');
  setTimeout(function() {
    $('.cart-msg').removeClass('active').remove();
  },2200)
}

// 바텀시트
 //바텀시트 열기
  $(document).on('click', '[data-btmsheet]', function(e){
    e.preventDefault();
    $("#"+ $(this).data('btmsheet')).addClass('show');
    $("body").addClass("no_scroll");
  });
  
  //바텀시트 닫기
  $(document).on('click', '.btmsheet__close, .btmsheet__back', function(e){
    e.preventDefault();
    closeBtmSheet(e.target)
  });

  function closeBtmSheet(el){
    $(el).parents('.btmsheet').removeClass('show')
    $("body").removeClass("no_scroll");
  }

  const $sheet = $('.btmsheet__inner');
  const $handle = $sheet.find('.btmsheet__handle');
  let startY = 0;
  let currentY = 0;
  let isDragging = false;
  const threshold = 300; 

  $handle.on('mousedown touchstart', function (e) {
    startY = e.pageY || e.originalEvent.touches[0].clientY;
    isDragging = true;
    $sheet.css('transition', 'none');
  });

  $(document).on('mousemove touchmove', function (e) {
    if (!isDragging) return;

    const touchY = e.pageY || e.originalEvent.touches[0].clientY;
    currentY = touchY - startY;

    // 아래로 내릴 때만 작동
    if (currentY > 0) {
      $sheet.css('transform', `translate(-50%, ${currentY}px)`);
    }
  });

  $(document).on('mouseup touchend', function () {
    if (!isDragging) return;
    isDragging = false;

    $sheet.css('transition', 'transform 0.3s ease');

    if (currentY > threshold) {
      $sheet.css('transform', 'translate(-50%, 100%)');
      closeBtmSheet($sheet)
      $sheet.css('transform', 'translate(-50%, 0%)');
    } else {
      $sheet.css('transform', 'translate(-50%, 0)');
    }

    currentY = 0;
  });