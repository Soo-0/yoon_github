(function(){
    var ver = new Date().getDate() + (new Date().getHours()>19 ? '3' : '2');
    //캐시되어야 하는 공통 파일들(외부 라이브러리로 변경이 없는 파일들)
    document.write('<li' + 'nk rel="stylesheet" href="' + 'css/common.css" media="all" />');
    document.write('<li' + 'nk rel="stylesheet" href="' + 'css/content.css" media="all" />');
    document.write('<li' + 'nk rel="stylesheet" href="' + 'css/datepicker.css" media="all" />');
})();