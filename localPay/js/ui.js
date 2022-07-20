$(function(){
    UIinit();
})

var UIinit = function(){
    popUI();//팝업
    accordion(); // 아코디언
    // agreeCheck(); // 약관체크
    quickTop();//상단이동
    tabs() // 탭
    // etcEvent(); // 공통아닌 기타 개별 이벤트 모음
    // uiToastMsg();//토스트 팝업
    datepicker.init();//달력
    selectUI.init()//셀렉트
    // dragPop();//하단 팝업
    inputChange();
}

/* 지역화폐 팝업 스타일
var popupUI = function(){
    $(document).off('click.popupOpen').on('click.popupOpen', ' .pop_open', function(e){
        e.preventDefault();
        var $pop = $(this).attr('href');
        popOpen($pop);
        $('body').addClass('scroll_hidden');
    })

    $(document).off('click.popupClose').on('click.popupClose', ' .pop_close', function(e){
        var $pop = $(this).closest('.pop_wrap');
        popClose($pop);
        $('body').removeClass('scroll_hidden');

        // 오늘 하루 그만보기
        if($(this).hasClass('btn_todaypop_close') && $(this).siblings('.check_wrap').find('input[type=checkbox]').is(':checked')){
            setCookieAt('popEventMain', 'Y', 1);
        }
    })


    // 페이지 진입 시 오늘 하루 보기 팝업 띄우기
    if($('#popEventMain').length > 0){
        if(getCookieAt('popEventMain')!='Y'){
            popOpen(popEventMain);
        }
    }
}

var popOpen = function(tar){
    var $tar = $(tar);
    $('body').addClass('scroll_hidden');
    $tar.addClass('is_act');
    setTimeout(function(){$tar.addClass('is_act')}, 100);
}

var popClose = function(tar){
    var $tar = $(tar);
    $('body').removeClass('scroll_hidden');
    $tar.removeClass('is_act');
    $tar.find('.popup, .pop_cont').scrollTop(0);
}
*/

// 오늘하루 열지않기 - 쿠기 get
var getCookie = function(name){
    var nameOfCookie = name + "=";
    var x = 0;
    while(x <= document.cookie.length){
        var y = (x+nameOfCookie.length);
        if(document.cookie.substring(x, y) == nameOfCookie){
            if((endOfCookie = document.cookie.indexOf(';' ,y)) == -1)
            endOfCookie = document.cookie.length;
            return unescape(document.cookie.substring(y, endOfCookie));
        }
        x = document.cookie.indexOf("", x) + 1;
        if(x == 0) break;
    }
    return "";
}

// 오늘 하루 열지않기 - 쿠키 set
// var setCookieAt = function(name, value, expiredays){
//     var todayDate = new Date();
//     todayDate.setDate(todayDate.getDate() + expiredays);
//     document.cookie = name + "=" + escape(value) + "; path=/; expires=" + todayDate.toGMTString() + ";";
// }


// 지역화폐 
//var tabs = function(){
//     var $tabWrap = $('.tab_wrap');

//     $tabWrap.each(function(i){
//         var $this = $(this);
//         tabAction($this, i);
//     });
// }

// var tabAction = function(obj, idx){
//     var $tabConts = obj.find('.tab_cont_wrap');
//     var chkConts = $tabConts.length;

//     $('.tab_wrap').eq(idx).off('click.tabBtn').on('click.tabBtn', '.tab_list li a', function(e){
//         e.preventDefault();
//         var idx = $(this).parent('li').index();
        
//         // $(this).parent('li').addClass('is_focused');
//         // $(this).parent('li').siblings('li').removeClass('is_focused');
//         if(chkConts){
//             $tabConts.find('.tab_cont').eq(idx).addClass('is_act');
//             $tabConts.find('.tab_cont').eq(idx).siblings('.tab_cont').removeClass('is_act');
//         }
//     })
// }

var tabs = function(){
    var $tab = $('.j_tabmenu');

    if($tab.length > 0){
        var $tabLi = $tab.find('li');
        if($tabLi.hasClass('on')){
            $tab.find('li.on').find('>a').attr({'title':'선택됨', 'aria-selected':'true'});
            $tab.find('li.on').siblings('li').find('>a').attr('aria-selected','false')
        }else{
            $tab.find('>a').removeAttr('title').attr('aria-selected','false')
        }
    }

    $(document).on('click','.j_tabmenu a', function(e){
        e.preventDefault();
        var $this = $(this),
            $thPrnt = $this.closest('li');
        
        if(!$thPrnt.hasClass('on')){
            var $href = $this.attr('href');

            $this.attr({'aria-selected':'true', 'title':'선택됨'});
            $($href).addClass('on').siblings('.tab_cont').removeClass('on');
            $thPrnt.addClass('on').siblings('li').removeClass('on').children('a').attr('aria-selected','false').removeAttr('title');
        }
    })
}

// 상단이동
var quickTop = function(){
    $(window).scrollTop(function(){
        if($(this).scrollTop() > 1){
            $('.btn_top').fadeIn();
        }else{
            $('.btn_top').fadeOut();
        }
    });
    $('.btn_top').click(function(){
        $('html, body').animate({
            scrollTop:0
        }, 500);
        return false;
    })
}

// 아코디언
var accordion = function(){
    $(document).off('click.acco_btn').on('click.acco_btn', '.acco_list .acco_btn', function(e){
        e.preventDefault();
        var acco_idx = $(this).closest('.acco_list').siblings('.acco_list').length;
        accordionsAction($(this), acco_idx);
    })
}

var accordionsAction = function($this, idx){
    var $wrap = $this.closest('.acco_list');
    var $tit = $this.closest('.acco_tit');
    var $wrapCont = $wrap.siblings('.acco_list');

    if(!$tit.hasClass('on')){
        $tit.addClass('on');
        $this.attr('aria-expanded', 'true').children('span').text('상세내용 닫기');
        if(idx > 0){
            $wrapCont.find('.acco_btn').closest('.acco_tit').removeClass('on');
            $wrapCont.find('.acco_btn').attr('aria-expanded','false').children('span').text('상세내용 열기');
        }
    }else{
        $tit.removeClass('on');
        $this.attr('aria-expanded','false').children('span').text('상세내용 열기');
    }
}

//모바일 에이전트 구분 (사용시 isMobile.any() 작성)
var isMobile = {
    Android : function(){
        return navigator.userAgent.match(/Android/i) == null ? false : true;
    },
    BlackBerry : function(){
        return navigator.userAgent.match(/BlackBerry/i) == null ? false : true;
    },
    IOS : function(){
        return navigator.userAgent.match(/iPhone|iPad|iPod/i) == null ? false : true;
    },
    Opera : function(){
        return navigator.userAgent.match(/Opera Mini/i) == null ? false : true;
    },
    Windows : function(){
        return navigator.userAgent.match(/IEMobile/i) == null ? false : true;
    },
    any : function(){
        return (isMobile.Android() || isMobile.BlackBerry() || isMobile.IOS() || isMobile.Opera || isMobile.Windows());
    }
}


// popup2 리뉴얼 서울페이 
var $popSpeed = 300,
    $popOpenBtn = '';

var popUI = function(){
    if($('pop_wrap').hasClass('is_act')){
        $('body').addClass('pop_open');
        $('.pop_wrap.is_act .popup').attr('tabindex', '0').focus();
        $('#wrap, #skipNavi').attr('aria-hidden','true')
    }

    $(document).on('click', '.ui-pop-open',function(e){
        e.preventDefault();
        var $this = $(this),
            $pop = $this.attr('href');
        popOpen($pop, this);
        $('#wrap, #skipNavi').attr('aria-hidden','true');
    });

    $(document).on('click', '.ui-pop-close',function(e){
        e.preventDefault();
        var $close = $(this).closest('.pop_wrap'),
            $id = $close.attr('id');

        popClose($close, $popOpenBtn);
        $('#wrap, #skipNavi').removeAttr('aria-hidden');
        $("a[href='#" + $id + "']").focus();
    });
}

var popOpen = function(tar){
    var $tar = $(tar);

    $('body').addClass('pop_open');
    $tar.addClass('is_visible').removeAttr('aria-hidden');
    setTimeout(function(){$tar.addClass('is_act').removeAttr('aria-hidden');}, 100);
    $tar.find('.popup').attr({'tabindex':0}).focus();
    $tar.siblings('.pop_wrap').attr('aria-hidden','true').find('.popup').removeAttr('tabindex','-1');
    if($tar.hasClass('pop_select')){
        $tar.find('.pop_cont').css({'overflow-y':'open', 'flex' : '0 0 auto'})
    }
}

var popClose = function(tar){
    var $tar = $(tar);

    $('body').removeClass('pop_open');
    $tar.removeClass('is_act is_visible').siblings('.pop_wrap').removeAttr('aria-hidden');
    $tar.find('.popup, .pop_cont').scrollTop(0);
    $tar.find('.popup').removeAttr('tabindex');
}

// 토스트팝업 
/*
사용법 : uiToastMsg({text:'토스트메세지', button:'선택자', speed:'넘버'})
        text: 필수 입력
        button : 필수입력(클릭한 요소 선택자 입력 - 접근성)
        speed : 머무르는 시간(접근성 텍스트 읽는 시간) | default : 1000 (1초)
        idx : Number(중복방지)  | default : 0
*/

var uiToastMsg = function(opt){
    if(opt.button.hasClass('disabled')){
        return false;
    }

    var $btn = opt.button,
        speed = opt.speed === undefined ? 1000 : opt.speed,
        idx = opt.idx === undefined ? 0 : opt.idx,
        toastMsg = '<div class="toast_msg" data-idx="'+idx+'"><span class="txt"></span></div>',
        timer;

    $('.toast_msg').not('[data-idx="'+idx+'"]').remove();
    $('body').append(toastMsg);
    $('.toast_msg[data-idx="'+idx+'"]').find('.txt').text(opt.text).attr('tabindex',1);

    $('.toast_msg[data-idx="'+idx+'"]').addClass('bottom').css({
        bottom:'0px'
    }).stop().animate({
        bottom:'15px',
        opacity:1
    }, 150);

    $('.toast_msg.num'+idx+ ' .txt').focus();
    
    timer = setTimeout(function(){
        $('.toast_msg[data-idx="'+idx+'"]').stop().animate({
            opacity:0
        }, function(){
            $('.toast_msg[data-idx="'+idx+'"]').remove();
            $($btn).focus();
        })
        clearTimeout(timer)
    }, speed);

}

var datepicker = {
    init : function(){
        if(isMobile.any() && isMobile.IOS() == false){
            $('.datepicker').each(function(){
                var strDate = $(this).val().split('.').join('-');
                var title = $(this).attr('title');
                $(this).attr({'aria-hidden':'true', 'tabindex':'-1','autocomplete':'off'})
                $(this).parent().append('<input class="input inp_datepicker" type="date" title="' + title + '" value="' + strDate + '" >' )
                $('.inp_datepicker').on('change', function(){
                    var $val = $(this).val(),
                        $newVal = $val.split('-').join('.');
                    $(this).siblings('.datepicker').val($newVal).trigger('change');
                });
            });
        }else if($('.datepicker').length > 0){
            var maxNum = 9999;
            var dateFormat = "yy.mm.dd";
            $('.datepicker').each(function(){
                $(this).attr({'autocomplete':'off'});
                if($(this).attr('data-max-date') == 0){
                    maxNum = 0;
                }
                var options = {
                    closeText:'닫기',
                    prevText:'이전달',
                    nextText:'다음달',
                    currentText:'오늘',
                    monthNames: ['01','02','03','04','05','06','07','08','09','10','11','12'],
                    dayNamesMin:['일', '월','화','수','목','금','토'],
                    dateFormat:'yy.mm.dd',
                    yearSuffix:'.',
                    showMonthAfterYear: true,
                    showButtonPanel: true,
                    showOn:'both',
                    maxDate : maxNum,
                    minDate : getDates(this),
                    buttonText:'기간조회',
                }

                $(this).datepicker(options);
                $('.ui-datepicker-trigger').attr('title','달력 열림').html('<span class="blind">기간조회</span>');
            })

            $(window).off('resize.datepicker').on('resize.datepicker', function(){
                $('.ui-datepicker-close').trigger('click')
            })

            function getDates(element){//이전 날짜 비활성화
                var date;
                if(element.value){
                    date = $.datepicker.parseDate(dateFormat,element.value);
                }else{
                    date = 0;
                }
                return date;
            }
        }
        datepicker.datepickerReset();
    },
    datepickerReset: function(){
        $('.datepicker').each(function(){
            var $this = $(this);
            if(isMobile.any()){
                //disabled처리
                if($this.is(':disabled') == true || $this.prop('disabled') == true){
                    $this.next('.inp_datepicker').attr('disabled','disabled').prop('disabled',true)
                }else{
                    $this.next('.inp_datepicker').removeAttr('disabled').prop('disabled',false)
                }

                // 오늘날짜설정
                if($this.attr('data-max-date') == '0'){
                    $this.next('.inp_datepicker').attr('max', getToday());
                }
            }else{
                //disabled처리
                if($this.is(':disabled') == true || $this.prop('disabled') == true){
                    $this.next('.ui-datepicker-trigger').attr('disabled','disabled').prop('disabled',true)
                }else{
                    $this.next('.ui-datepicker-trigger').removeAttr('disabled').prop('disabled',false)
                }

                // 오늘날짜설정
                if($this.attr('data-max-date') == '0'){
                    $this.datepicker('option', 'maxDate', getToday());
                }
            }

            //제목설정
            var strTitle = $this.attr('title');
            strTitle =  strTitle.replace('ex)YYYYMMDD 형식으로 입력', '바뀔 text');
            $this.attr({'title':strTitle, 'maxLength':'10'})
        })
    }

}

var selectUI = {
    init: function(){
        selectUI.selDefault();
        selectUI.selOpen();
    },
    selDefault : function(){
        var $setPop = $('pop_wrap.pop_select'),
            $selPop_chk = $setPop.length,
            rdo_txt = '';
        if($selPop_chk){
            $setPop.each(function(){
                var $this = $(this);
                $('.pop-sel-list > li.on > a').attr('title','선택됨');

                $this.find('.pop-slt-list a').click(function(e){
                    e.preventDefault();
                    rdo_txt = $this.text();
                    var $this = $(this),
                        $pop = $this.closest('.pop_wrap'),
                        $popId = $pop.attr('id');

                    $this.attr('title','선택됨').parent('li').addClass('on').siblings().removeClass('on').find('>a').removeAttr('title');
                    $('.btn_sel[href="#'+$popId+'"]').focus().html(rdo_txt).addClass('active');
                    popClose($pop);

                    var $pcSelect = $('.btn_sel[href="#'+$popId+'"]').next('.sel_list'),    
                        $pcSelectLi = $pcSelect.find('li');

                    if(pcSelect.length > 0){
                        $pcSelectLi.each(function(){
                            var $this = $(this),
                                $thLink = $this.find('a'),
                                $thTxt = $thLink.text();

                            if($thLink == rdo_txt){
                                $thLink.attr('title','선택됨').parents('li').addClass('on').siblings().removeClass('on').find('a').removeAttr('title');
                            }
                        })
                    }
                })

                $this.find('.pop-chk-list a').click(function(e){
                    e.preventDefault();
                    var $this = $(this);

                    $this.attr('title','선택됨').parent('li').toggleClass('on');
                    if(!$thPrnts.hasClass('on')) $this.removeAttr('title')
                })
            })
        }
    },
    selOpen : function(){
        $('.sel_wrap').find('.btn_sel').attr('aria-expanded','false');
        
        if($(window).width() < 1025){
            var $selWrap = $('.sel_wrap').find('.btn_sel');
            if($selWrap.find('.btn_sel').hasClass('bgw')){
                $selWrap.find('.btn_sel').removeAttr('aria-expanded');
            }
        }

        $(document).on('click', '.btn_sel', function(e){
            e.preventDefault();
            var $this = $(this);
                $thPrnts = $this.parent('.sel_wrap');

            if($this.hasClass('ui-sel-open')){
                if($(window).width() < 1025){
                    var $pop = $(this).attr('href');
                    popOpen($pop,this);
                    $('#wrap, #skipNavi').attr('aria-hidden',true);
                }else{
                    selectBox();
                }
            }else{
                selectBox();
            }

            function selectBox(){
                var pos_y = $(window).scrollTop() + ($(window).height()/2),
                    ele_y = $this.offset().top + ($this.outerHeight()/2);
                if(pos_y < ele_y){$thPrnts.addClass('bottom')}else{$thPrnts.removeClass('bottom')}

                $(window).scroll(function(){
                    if($this.siblings('.sel_list').is(':visible')){
                        if(pos_y < ele_y){$thPrnts.addClass('bottom')}else{$thPrnts.removeClass('bottom')}
                    }
                })

                if($this.hasClass('on')){
                    $thPrnts.focusout(function(){
                        let $this = $(this);
                        console.log($this)
                    })
                    $this.removeClass('on').attr('aria-expanded','false').next('.sel_list').hide();
                    $this.parents('.sel_wrap').removeClass('bottom');
                }else{

                    if($thPrnts.hasClass('small')){
                        var $boxHgt = $this.next('.sel_list').outerHeight(true),
                            max_h = 0;
                        $this.next('.sel_list').find('li').each(function(){
                            var h = parseInt($(this).css('width'));
                            if(max_h < h) max_h = h;
                        })
                        $this.addClass('on').attr('aria-expanded','true').next('.sel_list').css({'bottom': - $boxHgt + 10})
                    }else{
                        $this.addClass('on').attr('aria-expanded','true').next('.sel_list').show()
                    }

                    var $uiBox = $('.btn_sel.on').next();

                    $('.sel_list li.on a').attr('title','선택됨');
                    $uiBox.find('li > a').on('click', function(e){
                        e.preventDefault();
                        var $this = $(this),
                            $aTxt = $this.text(),
                            $btnSelect = $this.parents('.sel_list').prev('.btn_sel'),
                            $selectHref = $btnSelect.attr('href');

                        $this.attr('title','선택됨').parent('li').addClass('on').siblings().removeClass('on').find('>a').removeAttr('title');
                        $this.parents('.sel_list').hide().prev('.btn_sel').removeClass('on').attr('aria-expanded','false').focus().html($aTxt);

                        // selectpopup 있다면, 동일값 체크
                        if($($selectHref).length > 0){
                            var $popSelectLink = $($selectHref).find('.pop-slt-liat a');
                            $popSelectLink.each(function(){
                                var $this = $(this);
                                if($this.text() == $aTxt){
                                    $this.attr('title','선택됨').parents('li').addClass('on').siblings().removeClass('on').find('a').removeAttr('title');

                                }
                            })
                        }

                        // white
                        if($this.parents('.sel_wrap').hasClass('bgw')){
                            $btnSelect.addClass('active')
                        }
                    })
                }
            }
        })

        $(document).on('click', '.ui-sel-close', function(e){
            var $pop = $(this).closest('.pop_wrap'),
                $id = $pop.attr('id');
            popClose($pop,$popOpenBtn);
            $('#wrap, #skipNavi').removeAttr('aria-hidden');
            $('a[href="' + $id + '"]').focus()
        })
    }
}

var dragPop = function(){
    $(function(){
        $('.btm_drag_pop').css('bottom','-300px');

        dragPopEvt();
        $('.btm_drag_pop .btn_drag').on('click',function(){
            dragPopEvt();
        })
    })

    function dragPopEvt(){
        var $startBtm;
        var $dragArea = $('.btm_drag_pop'),
            $dragAreaHeight = $dragArea.outerHeight(true),
            $dragbtn = $dragArea.find('.btn_drag'),
            $scrollBox = $dragArea.find('.scroll'),
            $startBtm = -1 * ($dragAreaHeight - 240),
            $startBtm2 = -1 * ($dragAreaHeight - 173),
            $startBtmWin = $(window).height() - 207,
            $mbWidth = 320,
            $winSize = $(window).width();
        
        if($dragArea.hasClass('on') === true){
            $dragArea.stop().animate({bottom:$startBtm}, 500).removeClass('on');
            $scrollBox.css({height:135});
            $('html, body').css('overflow-y','auto');
            
            if($winSize <= $mbWidth){
                $scrollBox.css({height:85});
                $dragArea.stop().animate({bottom:$startBtm2}, 500).removeClass('on');
            }
        }else{
            $dragArea.stop().animate({bottom:0}, 500).addClass('on');
            $scrollBox.css({height:$startBtmWin});
            $('html, body').css('overflow-y','hidden');
        }

        $scrollBox.each(function(idx, ele){
            var $this = $(ele);
            $this.on('click', 'li input', function(){
                var $th = $(this);
                if($th.prop('checked')){
                    if($dragArea.hasClass('on') === true){
                        $dragbtn.trigger('click');
                        timer = setTimeout(function(){
                            $this.scrollTop(($th.closest('li').get(0).offsetTop - $this.get(0).offsetTop) + 64)
                            clearTimeout(timer);
                        }, 100)
                    }
                }
            })
        })

    }
}

var inputChange = function(){
    //이메일 직접입력
    $('.sel_wrap.email').on('click','.sel_list li a', function() {
        let $this = $(this);
        if($this.attr('data-title') == '직접입력') {
            $this.closest('.sel_wrap.email').attr('aria-hidden','true');
            setTimeout(function(){
                $this.closest('.sel_wrap.email').siblings('.input').addClass('show').focus();
            }, 100);
        }
    });

    $('.sel_wrap.email').siblings('.input').on('blur', function(){
        const $a_txt = $(this).siblings('.sel_wrap.email').children('.sel_list').find('li:first-child a').text();
        // const $cont = $(this).siblings('.sel_wrap.email').children('.sel_list');
        // $cont.scrollTop = $cont.scrollHeight;
		if($(this).val() == ''){
			$(this).siblings('.sel_wrap.email').removeAttr('aria-hidden');
            $(this).siblings('.sel_wrap.email').children('.sel_list').find('li:first-child').addClass('on').siblings('li').removeClass('on');
            $(this).siblings('.sel_wrap.email').children('.btn_sel').text($a_txt);
			$(this).removeClass('show');
		} 
	});
}

