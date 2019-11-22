$(function(){
    //Function Chart
    var chartColors = [
        'rgb(0,128,0)',
        'rgb(0,0,205)',
        'rgb(210,105,30)',
        'rgb(128,0,128)',
        'rgb(180,0,0)',
        'rgb(0,191,255)',
        'rgb(0,250,154)',
        'rgb(255,0,255)',
        'rgb(218,165,32)',
        'rgb(128,0,0)',
    ]
    var ctx = $('#myChart');

    function scatterChart(dados,names){
        let borderColor = ['rgb(0,0,0)'];
        let color =[ 'rgb(0,0,205)']
        var scatterChart = new Chart(ctx, {
        type: 'scatter',
        data: {
            datasets: [{
                label:names,
                data: dados,
                backgroundColor:color,
                borderColor:borderColor
            }]
        },
        options: {
        scales: {
            xAxes: [{
                type: 'linear',
                position: 'bottom'
            }]
            }
        }
        });
    }
    //______________________________________
    var regA,regB;

    //_________Função_______
    function correlacao(vetX, vetY,indValX,depY) {

        // Declaração de Variáveis
        let eXI = 0;
        let eYI = 0;
        let eXIYI = 0;
        let eXI2 = 0;
        let eYI2 = 0;
        let vetXIYI = [];
        let vetXI2 = [];
        let vetYI2 = [];
        let cor = 0;

        // Criando vetores para calculo da correlação
        for (let i = 0; i < vetX.length; i++) {
            vetXIYI.push(vetX[i] * vetY[i]);
            vetXI2.push(vetX[i] ** 2);
            vetYI2.push(vetY[i] ** 2);
            eXI += vetX[i];
            eYI += vetY[i];
            eXIYI += vetXIYI[i];
            eXI2 += vetXI2[i];
            eYI2 += vetYI2[i];
        }

        // Calculando Correlação
        cor = ((((vetX.length * eXIYI) - (eXI * eYI)) / Math.sqrt((vetX.length * eXI2 - (eXI) ** 2) * ((vetY.length * eYI2) - (eYI) ** 2))) * 100).toFixed(2);
        if (cor < 0) {
            cor = cor * -1;
        }

        // Calculando A e B para equação de regressão
        regA = (((vetXIYI.length * eXIYI) - (eXI * eYI)) / ((vetX.length * eXI2) - (eXI) ** 2)).toFixed(2);
        regB = ((eYI / vetY.length) - (regA * (eXI / vetX.length))).toFixed(2);

        apresent(cor);

        let dados =[]
        for(let i = 0; i < vetX.length; i++){
            dados.push({x : vetX[i], y : vetY[i]});
        }
        scatterChart(dados,indValX);
         console.log(dados);
        
    }

    function apresent(cor){
        let text = /*html*/`<p class="textCorrelation">Correlação ${cor}</p>`;
        $('#apresent').append(text);
    }

    //____________________Projeção
    function projecao(vlProj, ind) {

        let proj = 0;

        if (ind == "x") {                  
            proj = parseFloat((regA * vlProj + regB)).toFixed(2);
            
        }
        if (ind == "y") {
            proj = parseFloat(((vlProj - regB) / regA)).toFixed(2);
        }

        if (proj < 0) {
            proj = proj * -1
        }

        if (ind == "x") {
            let apresentX= /*html*/`<p>Projeção para ${ind} = ${vlProj} : Y é igual a ${proj}</p>`;
            $('#apresent2').append(apresentX);
        }
        if (ind == "y") {
            let apresentY= /*html*/`<p>Projeção para ${ind} = ${vlProj} : X é igual a ${proj}</p>`;
            $('#apresent2').append(apresentY);
        }  
    }

    //______________________________________________________
    var modalPresentVal = $('#contentValueInd');
    var modalPresentTextVal = $('#Indtext');
    var indValX;

    $('#independentValue').keyup(function (e) {
        if (e.keyCode == 13) {
            if (!$(this).val()) {
                alert("Campo Vazio");
            }
            else {
                indValX = $(this).val();
                modalPresentVal.removeClass('IndepValue').addClass('IndepValue-Active');
                let depTest = '<p data-posicao="' + ($(this).val()) + '" class="deletOrdination">' + $(this).val() + '</p>'
                modalPresentTextVal.append(depTest);
                $(this).val("");
            }
        }
    });
       $(document).on('click', '.deletOrdination', function () {
           $(this).remove();
           indValX.splice(indValX.indexOf($(this).attr('data-posicao')), 1);
       }); 
    var modalPresentVal2 = $('#contentValueDep');
    var modalPresentTextVal2 = $('#Deptext');
    var depY =[];

    $('#dependentValue').keyup(function (e) {
    if (e.keyCode == 13) {
        if (!$(this).val()) {
            alert("Campo Vazio");
        }
        else {
            depY = $(this).val();
            modalPresentVal2.removeClass('depValue').addClass('depValue-Active');
            let depTest = '<p data-posicao="' + ($(this).val()) + '" class="deletOrdination">' + $(this).val() + '</p>'
            modalPresentTextVal2.append(depTest);
            $(this).val("");
        }
    }
    });
    $(document).on('click', '.deletOrdination', function () {
        $(this).remove();
        depY.splice(depY.indexOf($(this).attr('data-posicao')), 1);
    }); 

 var modalPresent = $('#resultIndepApresent');
 var modalPresentText = $('#presentIndText');
 var valuesIndepInput = [];

 $('#inputIndepent').keyup(function (e) {
     if (e.keyCode == 13) {
         if (!$(this).val()) {
             alert("Campo de Valores Vazio");
         }
         else {
             valuesIndepInput.push(parseFloat($(this).val()));
             modalPresent.removeClass('IndepApresent').addClass('IndepApresent-Active');
             let indepText = '<p data-posicao="' + ($(this).val()) + '" class="deletOrdination">' + $(this).val() + '<label >x</label> </p>'
             modalPresentText.append(indepText);
             $(this).val("");
         }
     }
 });

    $(document).on('click', '.deletOrdination', function () {
        $(this).remove();
        valuesIndepInput.splice(valuesIndepInput.indexOf($(this).attr('data-posicao')), 1);
    });

 var modalPresent2 = $('#resultDepApresent');
 var modalPresentText2 = $('#presentDepText');
 var valuesDepInput = [];

 $('#inputDependent').keyup(function (e) {
     if (e.keyCode == 13) {
         if (!$(this).val()) {
             alert("Campo de Valores Vazio");
         }
         else {
             valuesDepInput.push(parseFloat($(this).val()));
             modalPresent2.removeClass('DepApresent').addClass('DepApresent-Active');
             let depTest = '<p data-posicao="' + ($(this).val()) + '" class="deletOrdination">' + $(this).val() + '<label >x</label> </p>'
             modalPresentText2.append(depTest);
             $(this).val("");
         }
     }
 });
    $(document).on('click', '.deletOrdination', function () {
        $(this).remove();
        valuesDepInput.splice(valuesDepInput.indexOf($(this).attr('data-posicao')), 1);
    }); 
   
   
    $('#btn-Calc').click(function(){
         console.log(indValX);
         console.log(depY);
         console.log(valuesIndepInput);
         console.log(valuesDepInput);
        if(valuesIndepInput == "" || valuesDepInput == ""){
            alert('Campos de Valores Vazios');
        }else{
         let corX = valuesIndepInput;
        let corY = valuesDepInput;
        correlacao(corX,corY,indValX,depY);
        $('#apresentChat').removeClass('apresentChat').addClass('apresentChat-Active')

        
        
        var apresentProj = /*html*/`<div class="contentTitle">
                            <h4 class="title">Projeção</h4>
                            </div>
                            <div class="contentSelectProj">
                            <span>Para</span>
                            <select class="textVariable" name="variable" id="selectProjectionLenght">
                            <option class="textVariable" value=""> </option>
                            <option class="textVariable" value="x"> ${indValX} </option>
                            <option class="textVariable" value="y"> ${depY} </option>
                            </select>
                            <input type="number" id="valueprojectInput">
                            </div>
                            <div class="contentBtn">
                            <button id="Calc">Calcular</button>
                            </div>`
            $('#projection').html('');
            $('#projection').append(apresentProj);
        }
    });

    //Projeção
    
    

    $('#Calc').click(function(){
        let selectProj = $('#selectProjectionLenght').val()
         let valueProj = parseFloat($('#valueprojectInput').val());
        projecao(valueProj,selectProj);
    });
});
