var winWidth=jQuery(window).width();var loadedInitially=false
var myChart;accordion();function footerAcc(){jQuery(".popular-links .title").click(function(){jQuery(this).next(".links-wrap").stop(true,true).slideToggle();jQuery(this).toggleClass("active")})}
function mobMenu(){jQuery(".cp-header .menu-btn").on("click",function(){jQuery(this).toggleClass("open");jQuery(".cp-header nav").toggleClass("open")})}
jQuery(function(){if(winWidth<767){footerAcc();mobMenu()}
if(jQuery(".scroll-to-tab").length){var topPos=jQuery(".scroll-to-tab").offset().top;scrollToSection();}
var windowScrollPos;jQuery(window).on("scroll",function(e){windowScrollPos=jQuery(window).scrollTop();if(jQuery(this).scrollTop()>=70){jQuery(".cp-header").addClass("sticky")}else{jQuery(".cp-header").removeClass("sticky")}
if(winWidth>767){if(windowScrollPos>topPos){jQuery(".scroll-to-tab").addClass("sticky-me");}else{jQuery(".scroll-to-tab").removeClass("sticky-me");}}})});function accordion(){jQuery('.acc-head').click(function(e){var jQuerythis=jQuery(this);var parentElm=jQuerythis.closest(".acc-item");if(jQuerythis.hasClass("active")){parentElm.find(".acc-cont").removeClass("active");jQuerythis.removeClass("active");parentElm.find(".acc-cont").slideUp()}else{jQuery(".cp-accordion").find(".acc-cont").removeClass("active");jQuery(".cp-accordion").find(".acc-head").removeClass("active");jQuery(".cp-accordion").find(".acc-cont").slideUp();parentElm.find(".acc-cont, .acc-head").addClass("active");parentElm.find(".acc-cont").slideDown()}})}
function updateHraFieldValues(){var basicSalary=0;var hraReceived=0;var dearnessAllowance=0;var rentPaid=0;var cityType='';setTimeout(function(){basicSalary=document.getElementById('basicSalary').value;hraReceived=document.getElementById('hraReceived').value;dearnessAllowance=document.getElementById('dearnessAllowance').value;rentPaid=document.getElementById('rentPaid').value;cityType=document.querySelector('input[name="cityType"]:checked').value;calculateHra(basicSalary,hraReceived,dearnessAllowance,rentPaid,cityType)},500)}
function calculateHra(salary,hra,allowance,rent,city){var actualHraReceived=parseInt(hra);var basicSalary=parseInt(salary)+parseInt(allowance);var excessRentPaid=parseInt(rent)-parseInt(basicSalary/10);var basicSalaryMetro=parseInt(basicSalary/2);var basicSalaryNonMetro=parseInt(basicSalary*(40/100));var minHraExempted=city=='metro'?Math.min(actualHraReceived,excessRentPaid,basicSalaryMetro):Math.min(actualHraReceived,excessRentPaid,basicSalaryNonMetro);var taxableHRA=0;taxableHRA=(actualHraReceived-minHraExempted)>0?(actualHraReceived-minHraExempted):0;document.getElementById('total_amount').innerText=taxableHRA;document.getElementById('hra_taxable').innerText=taxableHRA;document.getElementById('hra_exempted').innerText=minHraExempted;createDoughnutChart(minHraExempted,taxableHRA)}
function createDoughnutChart(exemptedHRA,taxableHRA){var ctx=document.getElementById("doughnutChart").getContext('2d');if(loadedInitially){myChart.destroy()}
myChart=new Chart(ctx,{type:'doughnut',data:{labels:["Exempted HRA","Taxable HRA"],datasets:[{data:[exemptedHRA,taxableHRA],borderColor:['#5F40AF','#C6C2F9',],backgroundColor:['#5F40AF','#C6C2F9'],borderWidth:1}]},options:{plugins:{legend:{display:false}},responsive:true,aspectRatio:1,cutoutPercentage:80,}});loadedInitially=true;}
function numberWithCommas(x){return x.toString().split('.')[0].length>3?x.toString().substring(0,x.toString().split('.')[0].length-3).replace(/\B(?=(\d{2})+(?!\d))/g,",")+","+x.toString().substring(x.toString().split('.')[0].length-3):x.toString();}
jQuery("#calc_dropdown").click(function(){jQuery(".dropdown-menu").toggleClass("show");});jQuery(function(){jQuery('.lyt-calculator .question-list a[href*=\\#]').click(function(){if(location.pathname.replace(/^\//,'')==this.pathname.replace(/^\//,'')&&location.hostname==this.hostname){var target=jQuery(this.hash);target=target.length?target:jQuery('[name='+this.hash.slice(1)+']');if(target.length){jQuery('html,body').animate({scrollTop:target.offset().top-100},1000);return false;}}});updateHraFieldValues();createDoughnutChart();});