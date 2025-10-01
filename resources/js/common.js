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