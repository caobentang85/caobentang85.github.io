var winWidth=jQuery(window).width();accordion();function footerAcc(){jQuery(".popular-links .title").click(function(){jQuery(this).next(".links-wrap").stop(true,true).slideToggle();jQuery(this).toggleClass("active")})}
function mobMenu(){jQuery(".cp-header .menu-btn").on("click",function(){jQuery(this).toggleClass("open");jQuery(".cp-header nav").toggleClass("open")})}
jQuery(function(){if(winWidth<767){footerAcc();mobMenu()}
if(jQuery(".scroll-to-tab").length){var topPos=jQuery(".scroll-to-tab").offset().top;scrollToSection();}
var windowScrollPos;jQuery(window).on("scroll",function(e){windowScrollPos=jQuery(window).scrollTop();if(jQuery(this).scrollTop()>=70){jQuery(".cp-header").addClass("sticky")}else{jQuery(".cp-header").removeClass("sticky")}
if(winWidth>767){if(windowScrollPos>topPos){jQuery(".scroll-to-tab").addClass("sticky-me");}else{jQuery(".scroll-to-tab").removeClass("sticky-me");}}})});function accordion(){jQuery('.acc-head').click(function(e){var jQuerythis=jQuery(this);var parentElm=jQuerythis.closest(".acc-item");if(jQuerythis.hasClass("active")){parentElm.find(".acc-cont").removeClass("active");jQuerythis.removeClass("active");parentElm.find(".acc-cont").slideUp()}else{jQuery(".cp-accordion").find(".acc-cont").removeClass("active");jQuery(".cp-accordion").find(".acc-head").removeClass("active");jQuery(".cp-accordion").find(".acc-cont").slideUp();parentElm.find(".acc-cont, .acc-head").addClass("active");parentElm.find(".acc-cont").slideDown()}})}
var barChartData={labels:[""],datasets:[{backgroundColor:"#C6C2F9",stack:'Stack 1',data:[3]},{backgroundColor:"#C6C2F9",stack:'Stack 0',data:['',4]},{backgroundColor:"#5F40AF",stack:'Stack 0',data:['',10]},]};let investment=25000;let year=10;let rate=12;let anualIncRate=10;let isOneTime=false;var ctx=document.getElementById('myChart').getContext('2d');let myChart=new Chart(ctx,{type:'bar',data:barChartData,options:{responsive:true,scaleShowLabels:false,plugins:{legend:{display:false},title:{display:false,text:''},tooltip:{enabled:false},},scales:{xAxes:[{gridLines:{show:false,stacked:true,lineWidth:0}}],yAxes:{display:false,stacked:true,}}}});calculateMutalFund(investment,year,rate,anualIncRate);var amountSlider=document.getElementById('amount-rangslider');var returnSlider=document.getElementById('return-rangslider');var durationSlider=document.getElementById('duration-rangslider');var increaseAnnuallySlider=document.getElementById('return-increace');noUiSlider.create(amountSlider,{start:25000,connect:'lower',range:{'min':0,'max':200000},format:{to:(v)=>parseFloat(v).toFixed(0),from:(v)=>parseFloat(v).toFixed(0)}});noUiSlider.create(returnSlider,{start:12,connect:'lower',range:{'min':5,'max':30},format:{to:(v)=>parseFloat(v).toFixed(0),from:(v)=>parseFloat(v).toFixed(0)}});noUiSlider.create(durationSlider,{start:10,connect:'lower',range:{'min':1,'max':30},format:{to:(v)=>parseFloat(v).toFixed(0),from:(v)=>parseFloat(v).toFixed(0)}});noUiSlider.create(increaseAnnuallySlider,{start:10,connect:'lower',range:{'min':5,'max':30},format:{to:(v)=>parseFloat(v).toFixed(0),from:(v)=>parseFloat(v).toFixed(0)}});amountSlider.noUiSlider.on('update',function(values,handle){investment=Number(values[handle]);document.getElementById("amt-val").value=values[handle];hitCalFunction();});returnSlider.noUiSlider.on('update',function(values,handle){rate=Number(values[handle]);document.getElementById("ret-val").value=values[handle];hitCalFunction();});durationSlider.noUiSlider.on('update',function(values,handle){year=Number(values[handle]);document.getElementById("duration-val").value=values[handle];hitCalFunction();});increaseAnnuallySlider.noUiSlider.on('update',function(values,handle){anualIncRate=Number(values[handle]);document.getElementById("ret-val-inc").value=values[handle];hitCalFunction();});function hitCalFunction(){calculateMutalFund(investment,year,rate,anualIncRate);}
jQuery('.cp-sip-calc .bs-radio-group input[type=radio]').click(function(){if(jQuery("#monthly").is(":checked")){jQuery(".change_text").text("Amount per month");isOneTime=false;}else if(jQuery("#one-time").is(":checked")){jQuery(".change_text").text("One Time Amount");isOneTime=true}
hitCalFunction();})
function inputChange(value){year=Number(document.getElementById("duration-val").value);rate=Number(document.getElementById("ret-val").value);investment=Number(document.getElementById("amt-val").value);anualIncRate=Number(document.getElementById("ret-val-inc").value)
switch(value){case 1:if(investment!=0&&investment!=''){setTimeout(()=>{amountSlider.noUiSlider.set(investment);},1500);}
break;case 2:if(rate!=0&&rate!=''){setTimeout(()=>{returnSlider.noUiSlider.set(rate);},1500);}
break;case 3:if(year!=0&&year!=''){setTimeout(()=>{durationSlider.noUiSlider.set(year);},1500);}
break;case 4:if(anualIncRate!=0&&anualIncRate!=''){setTimeout(()=>{increaseAnnuallySlider.noUiSlider.set(anualIncRate);},2000);}
break;}}
function simpleIntrest(p,r,t){const ratevalue=(r/100)*(1/12)
const SI=p*(1+ratevalue);return SI.toFixed(2);}
function percentage(percent,total){return((percent/100)*total).toFixed(2)}
function calculateMutalFund(investment,year,rate,anualIncRate){let intialBlnc=0;let totalInvestAmount=0;let sipIntervals=12;let principal=investment;let returnAmount=0;let iWantToInvestFor=Number(year)*12;let topUp=Number(percentage(anualIncRate,investment));for(let i=1;i<=Number(iWantToInvestFor);i++){let p=principal+intialBlnc;totalInvestAmount=totalInvestAmount+principal;intialBlnc=Number(simpleIntrest(p,rate,i));if((i%Number(sipIntervals))===0){principal=Number(principal)+Number(topUp);}}
totalInvestAmount=Math.round(totalInvestAmount);returnAmount=Math.round(intialBlnc);const approxMaturity=returnAmount;const gainAmount=approxMaturity-totalInvestAmount;const retrnPrc=Math.round((gainAmount/totalInvestAmount)*100);if(investment===0){jQuery("#returnPrnc").text('0')}else{jQuery("#returnPrnc").text(retrnPrc)}
jQuery('#invest_amount').text(numberWithCommas(totalInvestAmount));jQuery('#return_amount').text(numberWithCommas(approxMaturity-totalInvestAmount));jQuery('#total_amount').text(numberWithCommas(approxMaturity));jQuery('#total_amount_pill').text(numberWithCommas(approxMaturity));myChart.data.datasets=[{borderRadius:{topLeft:10,topRight:10,},data:[totalInvestAmount],backgroundColor:'#C6C2F9',stack:"stack 1",},{data:[totalInvestAmount],backgroundColor:'#C6C2F9',stack:"stack 0",},{borderRadius:{topLeft:10,topRight:10,},data:[gainAmount],stack:"stack 0",backgroundColor:'#5F40AF',}];myChart.update();}
function numberWithCommas(x){return x.toString().split('.')[0].length>3?x.toString().substring(0,x.toString().split('.')[0].length-3).replace(/\B(?=(\d{2})+(?!\d))/g,",")+","+x.toString().substring(x.toString().split('.')[0].length-3):x.toString();}
jQuery("#calc_dropdown").click(function(){jQuery(".dropdown-menu").toggleClass("show");});jQuery(function(){jQuery('.lyt-calculator .question-list a[href*=\\#]').click(function(){if(location.pathname.replace(/^\//,'')==this.pathname.replace(/^\//,'')&&location.hostname==this.hostname){var target=jQuery(this.hash);target=target.length?target:jQuery('[name='+this.hash.slice(1)+']');if(target.length){jQuery('html,body').animate({scrollTop:target.offset().top-100},1000);return false;}}});});