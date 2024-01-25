$(document).ready(function(){calc1(1);calc1(2);calc1(3);calc1(4);$('body').on('keyup','.eq_intraday',function(){calc1(1);});$('body').on('change','.eq_intraday',function(){calc1(1);});$('body').on('keyup','.eq_delivery',function(){calc1(2);});$('body').on('change','.eq_delivery',function(){calc1(2);});$('body').on('keyup','.futures',function(){calc1(3);});$('body').on('change','.futures',function(){calc1(3);});$('body').on('keyup','.options',function(){calc1(4);});$('body').on('change','.options',function(){calc1(4);});});function numbersonly(e)
{var charCode=(e.which)?e.which:e.keyCode
if((charCode>=48&&e.which<=57)||(charCode==46)||(charCode==8)||(charCode==0))
{return true;}
else
return false;}
function numbersWithoutDot(e)
{var charCode=(e.which)?e.which:e.keyCode
if((charCode>=48&&e.which<=57)||(charCode==8)||(charCode==0))
{return true;}
else
return false;}
var turn;function calc1(i)
{var sellquanti="sellQty"+i;var sellquantity=$('#'+sellquanti).val();var stockmarket="stockmarket"+i;var radios=document.getElementsByName(stockmarket);for(var p=0,length=radios.length;p<length;p++)
{if(radios[p].checked)
{stockmarket=radios[p].value;}}
var turn1="buyprice"+i;var turn=$('#'+turn1).val()*sellquantity;document.getElementById("turnover"+i).innerHTML=turn;document.getElementById("fisdom_turnover"+i).innerHTML=turn;var sellpricee="sellprice"+i;var sellpriceturnover=$('#'+sellpricee).val()*sellquantity;var mtmmtm=sellpriceturnover-turn;var totalturnover=(turn+sellpriceturnover).toFixed(parseInt(2));document.getElementById("turnover"+i).innerHTML=totalturnover;document.getElementById("fisdom_turnover"+i).innerHTML=totalturnover;if(i==4||i=='d4')
{var lot_brokerge="lot_brokerge"+i;var lot_size=parseFloat($('#lotSize'+i).val());if(!lot_size)
lot_size=1;lot_brokerge=parseFloat($('#'+lot_brokerge).val().replace('/lot',''));var brokerge_val=(sellquantity/lot_size)*2*lot_brokerge;document.getElementById("brokerage"+i).innerHTML=brokerge_val.toFixed(parseInt(2));}
else
{var percent_brokerge="percent_brokerge"+i;percent_brokerge=parseFloat($('#'+percent_brokerge).val().replace('%',''));var brokerge_val=((percent_brokerge/100)*totalturnover).toFixed(parseInt(2));document.getElementById("brokerage"+i).innerHTML=brokerge_val;}
if(i==1||i=='d1')
{var sellbroker=((0.02/100)*sellpriceturnover);var buybroker=((0.02/100)*turn);if(sellbroker>20)
{sellbroker=20;}
if(buybroker>20)
{buybroker=20;}
var fisdom_broker=sellbroker+buybroker;document.getElementById("fisdom_brokerage"+i).innerHTML=fisdom_broker.toFixed(parseInt(2));}
if(i==2||i=='d2')
{var sellbroker=((0.20/100)*sellpriceturnover);var buybroker=((0.20/100)*turn);if(sellbroker>20)
{sellbroker=20;}
if(buybroker>20)
{buybroker=20;}
var fisdom_broker=sellbroker+buybroker;document.getElementById("fisdom_brokerage"+i).innerHTML=fisdom_broker.toFixed(parseInt(2));}
if(i==3||i=='d3')
{var sellbroker=((0.02/100)*sellpriceturnover);var buybroker=((0.02/100)*turn);if(sellbroker>20)
{sellbroker=20;}
if(buybroker>20)
{buybroker=20;}
var fisdom_broker=sellbroker+buybroker;document.getElementById("fisdom_brokerage"+i).innerHTML=fisdom_broker.toFixed(parseInt(2));}
if(i==4||i=='d4')
{if(turn==0)
buybroker=0;else
buybroker=20;if(sellpriceturnover==0)
sellbroker=0;else
sellbroker=20;var fisdom_broker=sellbroker+buybroker;document.getElementById("fisdom_brokerage"+i).innerHTML=fisdom_broker.toFixed(parseInt(2));}
if(i==1||i=='d1')
{var stt=(0.00025*sellpriceturnover).toFixed(parseInt(0));document.getElementById("stttotal"+i).innerHTML=parseFloat(stt);document.getElementById("fisdom_stttotal"+i).innerHTML=parseFloat(stt);}
if(i==2||i=='d2')
{var stt=((0.1*totalturnover)/100).toFixed(parseInt(0));document.getElementById("stttotal"+i).innerHTML=parseFloat(stt);document.getElementById("fisdom_stttotal"+i).innerHTML=parseFloat(stt);}
if(i==3||i=='d3')
{var stt=(0.0001*sellpriceturnover).toFixed(parseInt(0));document.getElementById("stttotal"+i).innerHTML=parseFloat(stt);document.getElementById("fisdom_stttotal"+i).innerHTML=parseFloat(stt);}
if(i==4||i=='d4')
{var stt=(0.0005*sellpriceturnover).toFixed(parseInt(0));document.getElementById("stttotal"+i).innerHTML=parseFloat(stt);document.getElementById("fisdom_stttotal"+i).innerHTML=parseFloat(stt);}
var sebi=(20*totalturnover/10000000).toFixed(parseFloat(2));document.getElementById("sebi"+i).innerHTML=parseFloat(sebi);document.getElementById("fisdom_sebi"+i).innerHTML=parseFloat(sebi);var state=$('#select_state'+i).val();if(state==state){for(var j=0;j<stamp_duty.length;j++){if(stamp_duty[j].State==state){if(i==1||i=='d1')
{var stamp_duty_percent=0.015;var stamp_duty_max=stamp_duty_percent;}
if(i==2||i=='d2')
{var stamp_duty_percent=0.15;var stamp_duty_max=stamp_duty_percent;}
if(i==3||i=='d3')
{var stamp_duty_percent=0.02;var stamp_duty_max=stamp_duty_percent;}
if(i==4||i=='d4')
{var stamp_duty_percent=0.03;var stamp_duty_max=stamp_duty_percent;}}}}
var sd=((stamp_duty_percent/1000)*totalturnover).toFixed(parseInt(2));if(i!=1){sd=sd/2;}
document.getElementById("stampduty"+i).innerHTML=parseFloat(sd);document.getElementById("fisdom_stampduty"+i).innerHTML=parseFloat(sd);var etc=(totalturnover*stockmarket).toFixed(parseInt(2));document.getElementById("exchangetranscharges"+i).innerHTML=parseFloat(etc);document.getElementById("fisdom_exchangetranscharges"+i).innerHTML=parseFloat(etc);var totalst=(parseFloat(etc)+parseFloat(brokerge_val)).toFixed(parseInt(2));var fisdom_totalst=(parseFloat(etc)+parseFloat(fisdom_broker)).toFixed(parseInt(2));var service=(totalst*0.18).toFixed(parseInt(2));var fisdom_service=(fisdom_totalst*0.18).toFixed(parseInt(2));document.getElementById("servicetax"+i).innerHTML=service;document.getElementById("fisdom_servicetax"+i).innerHTML=fisdom_service;var totaltax=(parseFloat(brokerge_val)+parseFloat(stt)+parseFloat(sebi)+parseFloat(sd)+parseFloat(etc)+parseFloat(service)).toFixed(parseInt(2));var fisdom_totaltax=(parseFloat(fisdom_broker)+parseFloat(stt)+parseFloat(sebi)+parseFloat(sd)+parseFloat(etc)+parseFloat(fisdom_service)).toFixed(parseInt(2));document.getElementById("totaltaxandcharges"+i).innerHTML=parseFloat(totaltax);document.getElementById("fisdom_totaltaxandcharges"+i).innerHTML=parseFloat(fisdom_totaltax);var pob=(parseFloat(totaltax)/parseFloat(sellquantity)).toFixed(parseInt(2));var fisdom_pob=(parseFloat(fisdom_totaltax)/parseFloat(sellquantity)).toFixed(parseInt(2));document.getElementById("pointstobreakeven"+i).innerHTML=parseFloat(pob);document.getElementById("fisdom_pointstobreakeven"+i).innerHTML=parseFloat(fisdom_pob);var netpl=(parseFloat(sellpriceturnover-turn)-parseFloat(totaltax)).toFixed(parseInt(2));var fisdom_netpl=(parseFloat(sellpriceturnover-turn)-parseFloat(fisdom_totaltax)).toFixed(parseInt(2));document.getElementById("netpl"+i).innerHTML=parseFloat(netpl);document.getElementById("fisdom_netpl"+i).innerHTML=parseFloat(fisdom_netpl);if(netpl<0||fisdom_netpl<0)
{document.getElementById("netpl_txt"+i).innerHTML=" Net Loss";$("#netpl_txt"+i).addClass("total_loss").removeClass("total1");}
else
{document.getElementById("netpl_txt"+i).innerHTML=" Net Profit";$("#netpl_txt"+i).addClass("total1").removeClass("total_loss");$("#netpl"+i).addClass("total1").removeClass("total_loss");$("#fisdom_netpl"+i).addClass("total1").removeClass("total_loss");}
if(netpl<0)
$("#netpl"+i).addClass("total_loss").removeClass("total1");else
$("#netpl"+i).addClass("total1").removeClass("total_loss");if(fisdom_netpl<0)
$("#fisdom_netpl"+i).addClass("total_loss").removeClass("total1");else
$("#fisdom_netpl"+i).addClass("total1").removeClass("total_loss");var savingwithfisdom=(fisdom_netpl-netpl).toFixed(parseInt(2));;document.getElementById("savingwithfisdom"+i).innerHTML=parseFloat(savingwithfisdom).toFixed(parseInt(2));var reductionwithfisdom=((1-(fisdom_pob/pob))*100).toFixed(parseInt(2));;document.getElementById("reductionwithfisdom"+i).innerHTML=parseFloat(reductionwithfisdom).toFixed(parseInt(2))+'%';}