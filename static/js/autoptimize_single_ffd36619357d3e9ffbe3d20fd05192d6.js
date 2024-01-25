var winWidth=jQuery(window).width();accordion();function footerAcc(){jQuery(".popular-links .title").click(function(){jQuery(this).next(".links-wrap").stop(true,true).slideToggle();jQuery(this).toggleClass("active")})}
function mobMenu(){jQuery(".cp-header .menu-btn").on("click",function(){jQuery(this).toggleClass("open");jQuery(".cp-header nav").toggleClass("open")})}
jQuery(function(){if(winWidth<767){footerAcc();mobMenu()}
if(jQuery(".scroll-to-tab").length){var topPos=jQuery(".scroll-to-tab").offset().top;scrollToSection();}
var windowScrollPos;jQuery(window).on("scroll",function(e){windowScrollPos=jQuery(window).scrollTop();if(jQuery(this).scrollTop()>=70){jQuery(".cp-header").addClass("sticky")}else{jQuery(".cp-header").removeClass("sticky")}
if(winWidth>767){if(windowScrollPos>topPos){jQuery(".scroll-to-tab").addClass("sticky-me");}else{jQuery(".scroll-to-tab").removeClass("sticky-me");}}})});function accordion(){jQuery('.acc-head').click(function(e){var jQuerythis=jQuery(this);var parentElm=jQuerythis.closest(".acc-item");if(jQuerythis.hasClass("active")){parentElm.find(".acc-cont").removeClass("active");jQuerythis.removeClass("active");parentElm.find(".acc-cont").slideUp()}else{jQuery(".cp-accordion").find(".acc-cont").removeClass("active");jQuery(".cp-accordion").find(".acc-head").removeClass("active");jQuery(".cp-accordion").find(".acc-cont").slideUp();parentElm.find(".acc-cont, .acc-head").addClass("active");parentElm.find(".acc-cont").slideDown()}})}
function showTabContent(id){jQuery('.'+id.id).toggle();jQuery('#'+id.id).toggleClass('open');}
function calculateHra(salary,hra,allowance,rent,city){var actualHraReceived=parseInt(hra);var basicSalary=parseInt(salary)+parseInt(allowance);var excessRentPaid=parseInt(rent)-parseInt(basicSalary/10);var basicSalaryMetro=parseInt(basicSalary/2);var basicSalaryNonMetro=parseInt(basicSalary*(40/100));var minHraExempted=city=='metro'?Math.min(actualHraReceived,excessRentPaid,basicSalaryMetro):Math.min(actualHraReceived,excessRentPaid,basicSalaryNonMetro);var taxableHRA=0;taxableHRA=(actualHraReceived-minHraExempted)>0?(actualHraReceived-minHraExempted):0;return taxableHRA}
function taxApplicable(age,amount){let totalTax=0;let taxApplicable=0;if(age=='below 60'){if(amount>250000){if(amount<=500000){taxApplicable=(5/100)*(amount-250000)
totalTax+=taxApplicable;}
if(amount>500000){totalTax+=12500;if(amount<750000)
{taxApplicable=(10/100)*(amount-500000)
totalTax+=taxApplicable;}
if(amount>750000){totalTax+=25000;if(amount<1000000){taxApplicable=(15/100)*(amount-750000)
totalTax+=taxApplicable;}
if(amount>1000000){totalTax+=37500;if(amount<=125000)
{taxApplicable=(20/100)*(amount-1000000)
totalTax+=taxApplicable;}
if(amount>1250000){totalTax+=50000;if(amount<=1500000){taxApplicable=(25/100)*(amount-1250000)
totalTax+=taxApplicable;}
if(amount>1500000){totalTax+=62500;taxApplicable=(30/100)*(amount-1500000)
totalTax+=taxApplicable;}}}}}}}
else if(age=='above 60'){if(amount>300000){if(amount<=500000){taxApplicable=(5/100)*(amount-300000)
totalTax+=taxApplicable;}
if(amount>500000){totalTax+=10000;if(amount<1000000)
{taxApplicable=(20/100)*(amount-500000)
totalTax+=taxApplicable;}
if(amount>1000000){totalTax+=100000;taxApplicable=(30/100)*(amount-1000000)
totalTax+=taxApplicable;}}}}
else if(age=='above 80'){if(amount>500000){if(amount<=1000000){taxApplicable=(20/100)*(amount-500000)
totalTax+=taxApplicable;}
if(amount>1000000){totalTax+=100000;taxApplicable=(30/100)*(amount-1000000)
totalTax+=taxApplicable;}}}
return totalTax;}
function calculateItr(){let age=document.getElementById('age').value;console.log(age);let grossSalary=document.getElementById('gross-salary').value;let otherIncome=document.getElementById('other-income').value;let interestIncome=document.getElementById('interest-income').value;let rentIncome=document.getElementById('rent-income').value;let homeLoanInterest=document.getElementById('home-loan-interest').value;let homeLoanInterest2=document.getElementById('home-loan-interest2').value;let totalIncome=parseInt(grossSalary)+parseInt(otherIncome)+parseInt(interestIncome)+parseInt(rentIncome);console.log(totalIncome);let basicSalary=document.getElementById('salary').value;let dearnessAllowance=document.getElementById('dearness-allowance').value;let hraReceived=document.getElementById('hra').value;let rentPaid=document.getElementById('rent').value;let cityType=document.querySelector('input[name="cityType"]:checked').value;let hra=calculateHra(basicSalary,hraReceived,dearnessAllowance,rentPaid,cityType)
if(hra>240000)
{hra=hra-240000;}
let maxAllowedDeduction=(totalIncome*0.1)
let maxAllowedDeductionOld=150000;let basicDeduction=document.getElementById('basic-deduction').value;let npsDeduction=document.getElementById('nps').value;let medicalInsurance=document.getElementById('medical-ins').value;let donation=document.getElementById('donation').value;let eduLoan=document.getElementById('education-loan').value;let accInterest=document.getElementById('account-interest').value;let totalDeductionOld=parseInt(hra)+parseInt(basicDeduction)+parseInt(npsDeduction)+parseInt(medicalInsurance)+parseInt(donation)+parseInt(eduLoan)+parseInt(accInterest)+parseInt(homeLoanInterest);+parseInt(homeLoanInterest2);let totalDeduction=parseInt(npsDeduction);if(totalDeduction>maxAllowedDeduction)
{totalDeduction=maxAllowedDeduction;}
if(totalDeduction>maxAllowedDeductionOld)
{totalDeductionOld=maxAllowedDeductionOld;}
totalDeduction=totalDeduction-50000;let taxableIncome=totalIncome-totalDeduction;let taxableIncomeOld=totalIncome-totalDeductionOld;if(taxableIncome>5000000&&taxableIncome<10000000){taxableIncome=taxableIncome-((10/100)*(taxableIncome-5000000));}
if(taxableIncome>10000000){taxableIncome=taxableIncome-((15/100)*(taxableIncome-10000000));}
let taxApplied=taxApplicable(age,taxableIncome);let taxApplcableOld=taxApplicable(age,taxableIncomeOld)
console.log('tax Applied'+taxApplied);document.getElementById('tax_new').innerText=taxApplied;document.getElementById('tax_old').innerText=taxApplcableOld;}
function numberWithCommas(x){return x.toString().split('.')[0].length>3?x.toString().substring(0,x.toString().split('.')[0].length-3).replace(/\B(?=(\d{2})+(?!\d))/g,",")+","+x.toString().substring(x.toString().split('.')[0].length-3):x.toString();}
jQuery("#calc_dropdown").click(function(){jQuery(".dropdown-menu").toggleClass("show");});jQuery(function(){jQuery('.lyt-calculator .question-list a[href*=\\#]').click(function(){if(location.pathname.replace(/^\//,'')==this.pathname.replace(/^\//,'')&&location.hostname==this.hostname){var target=jQuery(this.hash);target=target.length?target:jQuery('[name='+this.hash.slice(1)+']');if(target.length){jQuery('html,body').animate({scrollTop:target.offset().top-100},1000);return false;}}});jQuery('.tab-content').hide();});