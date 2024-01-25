var winWidth=$(window).width();var loadedInitially=false
var myChart;var monthlyIncome,age,AvgIncrement,empContribution,currentBalance;const retirementAge=60;const employerContribution=3.67;const currentInterstRate=8.1;var amountSlider=document.getElementById('amount-rangslider');var ageSlider=document.getElementById('age-rangslider');var expectedIncrementSlider=document.getElementById('exp-increment-rangslider');var employeeContributionSlider=document.getElementById('emp-contribution-rangslider');var currentBalanceSlider=document.getElementById('current-balance-rangslider');accordion();function footerAcc(){$(".popular-links .title").click(function(){$(this).next(".links-wrap").stop(true,true).slideToggle();$(this).toggleClass("active")})}
function mobMenu(){$(".cp-header .menu-btn").on("click",function(){$(this).toggleClass("open");$(".cp-header nav").toggleClass("open")})}
$(function(){if(winWidth<767){footerAcc();mobMenu()}
if($(".scroll-to-tab").length){var topPos=$(".scroll-to-tab").offset().top;scrollToSection();}
var windowScrollPos;$(window).on("scroll",function(e){windowScrollPos=$(window).scrollTop();if($(this).scrollTop()>=70){$(".cp-header").addClass("sticky")}else{$(".cp-header").removeClass("sticky")}
if(winWidth>767){if(windowScrollPos>topPos){$(".scroll-to-tab").addClass("sticky-me");}else{$(".scroll-to-tab").removeClass("sticky-me");}}})});function accordion(){$('.acc-head').click(function(e){var $this=$(this);var parentElm=$this.closest(".acc-item");if($this.hasClass("active")){parentElm.find(".acc-cont").removeClass("active");$this.removeClass("active");parentElm.find(".acc-cont").slideUp()}else{$(".cp-accordion").find(".acc-cont").removeClass("active");$(".cp-accordion").find(".acc-head").removeClass("active");$(".cp-accordion").find(".acc-cont").slideUp();parentElm.find(".acc-cont, .acc-head").addClass("active");parentElm.find(".acc-cont").slideDown()}})}
function slidersInit(){noUiSlider.create(amountSlider,{start:25000,connect:'lower',range:{'min':0,'max':200000},format:{to:(v)=>parseFloat(v).toFixed(0),from:(v)=>parseFloat(v).toFixed(0)}});noUiSlider.create(ageSlider,{start:24,connect:'lower',range:{'min':18,'max':60},format:{to:(v)=>parseFloat(v).toFixed(0),from:(v)=>parseFloat(v).toFixed(0)}});noUiSlider.create(expectedIncrementSlider,{start:10,connect:'lower',range:{'min':0,'max':15},format:{to:(v)=>parseFloat(v).toFixed(0),from:(v)=>parseFloat(v).toFixed(0)}});noUiSlider.create(employeeContributionSlider,{start:12,connect:'lower',range:{'min':12,'max':20},format:{to:(v)=>parseFloat(v).toFixed(0),from:(v)=>parseFloat(v).toFixed(0)}});noUiSlider.create(currentBalanceSlider,{start:100000,connect:'lower',range:{'min':0,'max':5000000},format:{to:(v)=>parseFloat(v).toFixed(0),from:(v)=>parseFloat(v).toFixed(0)}});amountSlider.noUiSlider.on('update',function(values,handle){monthlyIncome=Number(values[handle]);document.getElementById("amt-val").value=values[handle];calculatePf(monthlyIncome,age,AvgIncrement,empContribution,currentBalance)});ageSlider.noUiSlider.on('update',function(values,handle){age=Number(values[handle]);document.getElementById("age-val").value=values[handle];calculatePf(monthlyIncome,age,AvgIncrement,empContribution,currentBalance)});expectedIncrementSlider.noUiSlider.on('update',function(values,handle){AvgIncrement=Number(values[handle]);document.getElementById("exp-increment-val").value=values[handle];calculatePf(monthlyIncome,age,AvgIncrement,empContribution,currentBalance)});employeeContributionSlider.noUiSlider.on('update',function(values,handle){empContribution=Number(values[handle]);document.getElementById("emp-contribution-val").value=values[handle];calculatePf(monthlyIncome,age,AvgIncrement,empContribution,currentBalance)});currentBalanceSlider.noUiSlider.on('update',function(values,handle){currentBalance=Number(values[handle]);document.getElementById("current-balance-val").value=values[handle];calculatePf(monthlyIncome,age,AvgIncrement,empContribution,currentBalance)});calculatePf(monthlyIncome,age,AvgIncrement,empContribution,currentBalance)}
function inputChange(value){monthlyIncome=Number(document.getElementById("amt-val").value);age=Number(document.getElementById("age-val").value);AvgIncrement=Number(document.getElementById("exp-increment-val").value);empContribution=Number(document.getElementById("emp-contribution-val").value);currentBalance=Number(document.getElementById("current-balance-val").value);switch(value){case 1:if(monthlyIncome!=0&&monthlyIncome!=''){setTimeout(()=>{amountSlider.noUiSlider.set(monthlyIncome);},3000);}
break;case 2:if(age!=0&&age!=''){setTimeout(()=>{ageSlider.noUiSlider.set(age);},2000);}
break;case 3:if(AvgIncrement!=0&&AvgIncrement!=''){setTimeout(()=>{expectedIncrementSlider.noUiSlider.set(AvgIncrement);},2000);}
break;case 4:if(empContribution!=0&&empContribution!=''){setTimeout(()=>{employeeContributionSlider.noUiSlider.set(empContribution);},2000);}
break;case 5:if(currentBalance!=0&&currentBalance!=''){setTimeout(()=>{currentBalanceSlider.noUiSlider.set(currentBalance);},2000);}
break;}}
var barChartData={labels:[""],datasets:[{backgroundColor:"#C6C2F9",stack:'Stack 1',data:[3]},{backgroundColor:"#C6C2F9",stack:'Stack 0',data:['',4]},{backgroundColor:"#5F40AF",stack:'Stack 0',data:['',10]},]};var ctx=document.getElementById('myChart').getContext('2d');myChart=new Chart(ctx,{type:'bar',data:barChartData,options:{responsive:true,scaleShowLabels:false,plugins:{legend:{display:false},title:{display:false,text:''},tooltip:{enabled:false},},scales:{xAxes:[{gridLines:{show:false,stacked:true,lineWidth:0}}],yAxes:{display:false,stacked:true,}}}});function calculatePf(salary,age,incrementExpectedPerYear,pfContribution,currentBalance){let maturityValue;let totalInvestment=0;let tenure=retirementAge-age;let previousBalance=currentBalance;let interest;let closingBalance;let currentSalary=salary;let totalInterestEarned;let totalEmployeeContribution=0;let totalEmployerContribution=0;let returnPercentage=0;let maturityPercentage=0;for(let i=0;i<=tenure;i++){let employeeContribution=((pfContribution/100)*currentSalary)*12;totalEmployeeContribution+=employeeContribution;let emplContribution=parseInt(currentSalary*(employerContribution/100))*12;totalEmployerContribution+=emplContribution;totalInvestment+=(employeeContribution+emplContribution);interest=(currentInterstRate/100)*(previousBalance+employeeContribution+emplContribution);closingBalance=interest+employeeContribution+emplContribution
previousBalance+=closingBalance;console.log({'salary':currentSalary,'age':age,'Expected Increment':incrementExpectedPerYear,'Employee Contribution':employeeContribution,'Employer Contribution':emplContribution,'Current Balance':previousBalance,'tenure':tenure,'current interest rate':currentInterstRate,'employer contribution rate':employerContribution});currentSalary=currentSalary+((incrementExpectedPerYear/100)*currentSalary);}
totalInvestment+=currentBalance;maturityValue=previousBalance;totalInterestEarned=maturityValue-totalInvestment;maturityPercentage=(maturityValue/totalInvestment)*100;returnPercentage=(totalInterestEarned/totalInvestment)*100;document.getElementById('invest_amount').innerText=numberWithCommas(Math.round(totalInvestment));document.getElementById('total_amount_pill').innerText=numberWithCommas(Math.round(maturityValue));document.getElementById('total_amount').innerText=numberWithCommas(Math.round(maturityValue));document.getElementById('interest_earned_amount').innerText=numberWithCommas(Math.round(totalInterestEarned));document.getElementById('employer_contribution').innerText=numberWithCommas(Math.round(totalEmployerContribution));document.getElementById('your_contribution').innerText=numberWithCommas(Math.round(totalEmployeeContribution));document.getElementById('your_contribution_perc').innerText=pfContribution;document.getElementById('current_epf_rate').innerText=currentInterstRate;myChart.data.datasets=[{borderRadius:{topLeft:10,topRight:10,},data:[totalInvestment],backgroundColor:'#C6C2F9',stack:"stack 1",},{data:[totalInvestment],backgroundColor:'#C6C2F9',stack:"stack 0",},{borderRadius:{topLeft:10,topRight:10,},data:[totalInterestEarned],stack:"stack 0",backgroundColor:'#5F40AF',}];myChart.update();}
slidersInit();function numberWithCommas(x){return x.toString().split('.')[0].length>3?x.toString().substring(0,x.toString().split('.')[0].length-3).replace(/\B(?=(\d{2})+(?!\d))/g,",")+","+x.toString().substring(x.toString().split('.')[0].length-3):x.toString();}
$("#calc_dropdown").click(function(){$(".dropdown-menu").toggleClass("show");});$(function(){$('.lyt-calculator .question-list a[href*=\\#]').click(function(){if(location.pathname.replace(/^\//,'')==this.pathname.replace(/^\//,'')&&location.hostname==this.hostname){var target=$(this.hash);target=target.length?target:$('[name='+this.hash.slice(1)+']');if(target.length){$('html,body').animate({scrollTop:target.offset().top-100},1000);return false;}}});});