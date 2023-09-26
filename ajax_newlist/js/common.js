$(function(){
  /*script 영역 ajax사용 예*/
  $.ajax({
    url:'data.xml',
    dataType: 'xml',
    success: function(data){
      // 실행문
      //특정데이터를 가져오는 방법 1번
      // console.log($(data).find("item"));

      //특정데이터를 가져오는 방법 2번
      // console.log($("item",data));

      $("item",data).each(function(){
        // console.log($(this).find("link").text())
        // console.log($("link",this).text())

        // link text 가져오기
        let linkText = $("link",this).text();

        //description text 가져오기
        let desText = $("description",this).text();

        $("dl").append("<dt><a href='"+linkText+"'>"+linkText+"</a></dt><dd>"+desText+"</dd>")
      })
    }
  });

  // button에 on class를 추가하여 dl노출을 toggle형태로 구현하시오.
  $("button").click(function(){
    //실행구문
    // class 추가 방법 1번
    // $(this).toggleClass("on");

    // class 추가 방법 2번
    // let thisClass = $(this).attr("class");
    // if( thisClass == "" || thisClass == undefined ){
    //   $(this).addClass("on");
    // }else{
    //   $(this).removeClass("on");
    // }
    // console.log(thisClass)
    
    // class 추가 방법 3번
    console.log($(this).hasClass("on"))
    if( $(this).hasClass("on") ){
      $(this).removeClass("on");
    }else{
      $(this).addClass("on");
    }
  });

});//document ready
