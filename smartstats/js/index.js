$(function(){
  
  $('.contentMenu').addClass('animated flipInY');
  $('.contentDescritive ').addClass('animated flipInY');
  $('.contentProbability ').addClass('animated flipInY');
  $('.contentCorrelation ').addClass('animated flipInY');

  $('.backPage').click(function(){
    $('.contentDescritive ').addClass('animated flipOutY');
  $('.contentProbability ').addClass('animated flipOutY');
  $('.contentCorrelation ').addClass('animated flipOutY');
  });
 /*Active Menu Mobile*/
 $('.navbar-toggler').click(function(){
 $('#navbarNavMobile').toggleClass('navbarMobile-Active');
 });
 /*Active Menu Mobile*/

 /*Reload Page*/
 $(".reloadPage").click(function() {
  if(confirm("Deseja Limpar a Tela?")){
      location.reload();
    }
  });
 /*Reload Page*/

 /*Demonstrar Valor Input Separatriz*/
 let InputBreaker = $('#inputBreaker');
 if(InputBreaker){
    $('#etiqueta').html(InputBreaker.val());

    $('#inputBreaker').on('input', function(){
     $('#etiqueta').html(InputBreaker.val());
    })
 }else{ false};

   $('#inputBreaker').click(function(){
     if(!$('#selectBreaker').val()){
       alert('Selecione uma Medida Separatriz')
       $('#inputBreaker').val(1);
       $('#etiqueta').html(1);
     }
   });
   /*Demonstrar Valor Input Separatriz*/

   /*Apresentação de Inputs de Valores Probabilidade*/
   $('#selectEnter').click(function(){
     if($('#selectLenght').val() == ''){
        $('.inputInsert').html("");
     }else if($('#selectLenght').val() == '<'){
        $('.inputInsert').html("");
        $('.selectLenght').css('flexDirection', 'row');
        let inputInsert = /*html*/` <input type="number" name="insertSmall" id="inputInsertSmaller">`
        $('.inputInsert').append(inputInsert);
     }else if ($('#selectLenght').val() == '>'){
        $('.inputInsert').html("");
        $('.selectLenght').css('flexDirection', 'row');
        let inputInsert = /*html*/` <input type="number" name="InsertBig" id="inputInsertBigger">`
        $('.inputInsert').append(inputInsert);
     }else{
        $('.inputInsert').html("");
        $('.selectLenght').css('flexDirection', 'column');
        let inputInsert = /*html*/` <span>De</span><input type="number" name="" class="inputInsertMiddle" id="inputInsertMiddle">
                                    <span class="text-spacing">Até</span><input type="number" name="" class="inputInsertMiddle" id="inputInsertMiddle2">`
          
        $('.inputInsert').css('display','flex');      
          if (screen.width < 640 || screen.height < 480){
              $('.inputInsert').css('flexDirection','column');
            }else{
              $('.inputInsert').css('flexDirection','row');
            }
        $('.inputInsert').append(inputInsert); 
     }
   });
   /*Apresentação de Inputs de Valores Probabilidade*/
   
  
    $(".btnCalculation").click(function(event){        
      event.preventDefault();
      $('html body').animate({scrollTop:$(this.hash).offset().top}, 700);
   });  

   
});