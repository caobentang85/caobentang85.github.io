var winWidth=jQuery(window).width();var loadedInitially=false
var myChart;var investment,duration,rate;var amountSlider=document.getElementById('amount-rangslider');var returnSlider=document.getElementById('return-rangslider');var durationSlider=document.getElementById('duration-rangslider');accordion();function footerAcc(){jQuery(".popular-links .title").click(function(){jQuery(this).next(".links-wrap").stop(true,true).slideToggle();jQuery(this).toggleClass("active")})}
function mobMenu(){jQuery(".cp-header .menu-btn").on("click",function(){jQuery(this).toggleClass("open");jQuery(".cp-header nav").toggleClass("open")})}
jQuery(function(){if(winWidth<767){footerAcc();mobMenu()}
if(jQuery(".scroll-to-tab").length){var topPos=jQuery(".scroll-to-tab").offset().top;scrollToSection();}
var windowScrollPos;jQuery(window).on("scroll",function(e){windowScrollPos=jQuery(window).scrollTop();if(jQuery(this).scrollTop()>=70){jQuery(".cp-header").addClass("sticky")}else{jQuery(".cp-header").removeClass("sticky")}
if(winWidth>767){if(windowScrollPos>topPos){jQuery(".scroll-to-tab").addClass("sticky-me");}else{jQuery(".scroll-to-tab").removeClass("sticky-me");}}})});function accordion(){jQuery('.acc-head').click(function(e){var jQuerythis=jQuery(this);var parentElm=jQuerythis.closest(".acc-item");if(jQuerythis.hasClass("active")){parentElm.find(".acc-cont").removeClass("active");jQuerythis.removeClass("active");parentElm.find(".acc-cont").slideUp()}else{jQuery(".cp-accordion").find(".acc-cont").removeClass("active");jQuery(".cp-accordion").find(".acc-head").removeClass("active");jQuery(".cp-accordion").find(".acc-cont").slideUp();parentElm.find(".acc-cont, .acc-head").addClass("active");parentElm.find(".acc-cont").slideDown()}})}
function slidersInit(){if(loadedInitially){amountSlider.noUiSlider.reset();returnSlider.noUiSlider.reset();durationSlider.noUiSlider.reset();}
noUiSlider.create(amountSlider,{start:10000,connect:'lower',range:{'min':500,'max':100000},step:500,format:{to:(v)=>parseFloat(v).toFixed(0),from:(v)=>parseFloat(v).toFixed(0)}});noUiSlider.create(returnSlider,{start:5,connect:'lower',range:{'min':4,'max':8},format:{to:(v)=>parseFloat(v).toFixed(1),from:(v)=>parseFloat(v).toFixed(1)}});noUiSlider.create(durationSlider,{start:12,connect:'lower',range:{'min':1,'max':120},format:{to:(v)=>parseFloat(v).toFixed(0),from:(v)=>parseFloat(v).toFixed(0)}});amountSlider.noUiSlider.on('update',function(values,handle){investment=Number(values[handle]);document.getElementById("amt-val").value=values[handle];calculateRd(investment,duration,rate)});returnSlider.noUiSlider.on('update',function(values,handle){rate=Number(values[handle]);document.getElementById("ret-val").value=values[handle];calculateRd(investment,duration,rate)});durationSlider.noUiSlider.on('update',function(values,handle){duration=Number(values[handle]);document.getElementById("duration-val").value=values[handle];calculateRd(investment,duration,rate)});calculateRd(investment,duration,rate)}
function inputChange(value){duration=Number(document.getElementById("duration-val").value);investment=Number(document.getElementById("amt-val").value);rate=Number(document.getElementById("ret-val").value);switch(value){case 1:if(investment!=0&&investment!=''){setTimeout(()=>{amountSlider.noUiSlider.set(investment);},3000);}
break;case 2:if(rate!=0&&rate!=''){setTimeout(()=>{returnSlider.noUiSlider.set(rate);},2000);}
break;case 3:if(duration!=0&&duration!=''){setTimeout(()=>{durationSlider.noUiSlider.set(duration);},2000);}
break;}}
var barChartData={labels:[""],datasets:[{backgroundColor:"#C6C2F9",stack:'Stack 1',data:[3]},{backgroundColor:"#C6C2F9",stack:'Stack 0',data:['',4]},{backgroundColor:"#5F40AF",stack:'Stack 0',data:['',10]},]};var ctx=document.getElementById('myChart').getContext('2d');myChart=new Chart(ctx,{type:'bar',data:barChartData,options:{responsive:true,scaleShowLabels:false,plugins:{legend:{display:false},title:{display:false,text:''},tooltip:{enabled:false},},scales:{xAxes:[{gridLines:{show:false,stacked:true,lineWidth:0}}],yAxes:{display:false,stacked:true,}}}});function calculateRd(amount,tenure,roi){console.log({'amount':amount,'tenure':tenure,'roi':roi})
let interestForMonth=0;let totalInvested=amount*duration;let totalInterest=0;let gains=0;for(let i=1;i<=tenure;i++){interestForMonth=amount*Math.pow(1+roi/1200,i);totalInterest+=interestForMonth;}
gains=totalInterest-totalInvested;document.getElementById('invest_amount').innerText=numberWithCommas(totalInvested);document.getElementById('total_amount_pill').innerText=numberWithCommas(Math.round(totalInterest));document.getElementById('total_amount').innerText=numberWithCommas(Math.round(totalInterest));document.getElementById('return_amount').innerText=numberWithCommas(Math.round(gains));myChart.data.datasets=[{borderRadius:{topLeft:10,topRight:10,},data:[totalInvested],backgroundColor:'#C6C2F9',stack:"stack 1",},{data:[totalInvested],backgroundColor:'#C6C2F9',stack:"stack 0",},{borderRadius:{topLeft:10,topRight:10,},data:[gains],stack:"stack 0",backgroundColor:'#5F40AF',}];myChart.update();}
slidersInit();function numberWithCommas(x){return x.toString().split('.')[0].length>3?x.toString().substring(0,x.toString().split('.')[0].length-3).replace(/\B(?=(\d{2})+(?!\d))/g,",")+","+x.toString().substring(x.toString().split('.')[0].length-3):x.toString();}
jQuery("#calc_dropdown").click(function(){jQuery(".dropdown-menu").toggleClass("show");});jQuery(function(){jQuery('.lyt-calculator .question-list a[href*=\\#]').click(function(){if(location.pathname.replace(/^\//,'')==this.pathname.replace(/^\//,'')&&location.hostname==this.hostname){var target=jQuery(this.hash);target=target.length?target:jQuery('[name='+this.hash.slice(1)+']');if(target.length){jQuery('html,body').animate({scrollTop:target.offset().top-100},1000);return false;}}});});