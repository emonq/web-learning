var startTime;
var formData;
var timer;
function validate() {
    var fields=new Array("q01","q02","q03");
    for(var i in fields){
        flag=false;
        q=document.getElementsByName(fields[i]);
        for(var j=0;j<q.length;j++){
            if(q[j].checked) {
                flag=true;
                break;
            }
        }
        if(flag==false) {
            q[q.length-1].focus();
            document.getElementById(fields[i]).classList.add("illegal");
            document.getElementById("warnmsg").style.visibility="visible";
            return false;
        }
        document.getElementById(fields[i]).classList.remove("illegal");
    }
    blanks=new Array("username","q04");
    for(var i in blanks) {
        if(document.forms[0][blanks[i]].value==null || document.forms[0][blanks[i]].value=="") {
            document.getElementById(blanks[i]).classList.add("illegal");
            document.getElementById("warnmsg").style.visibility="visible";
            document.forms[0][blanks[i]].focus();
            return false;
        }
    }
    return true;
}
function showResult(data) {
    var endTime=new Date();
    var totalTime=endTime-startTime;
    var resFields=new Array("info01","info02","info03","info04");
    var q;
    for(var i=0;i<4;i++) {
        q=document.getElementById(resFields[i]);
        if(data[i]==25) {
            q.classList.add("AC");
            q.getElementsByTagName("span")[0].innerHTML="正确<br/>";
        }
        else {
            q.classList.add("WA");
            q.getElementsByTagName("span")[0].innerHTML="错误<br/>";
            document.getElementById("q0"+String(i+1)).classList.add("WA");
        }
        q.getElementsByTagName("span")[1].innerHTML="得分<br/>"+data[i]+"/25";
    }
    q=document.getElementById("testinfo");
    q.style.visibility="visible";
    q.innerHTML=data[5]+"，你的"+"得分为："+data[4]+"分<br/>用时："+Math.round(totalTime/60000)+"分"+Math.round(totalTime/1000)%60+"秒<br/>提交时间："+data[6]+"<br/>你可以在下方查看你的答题情况，也可以点击<a href=\".\/scoreboard.aspx\">这里</a>查看分数榜";
    document.body.scrollTop = document.documentElement.scrollTop = 0;
    var msg="你的得分为："+data[4]+"。";
    if(data[4]==100) msg+="太强啦！！";
    alert(msg);
}
function submitForm() {
    if(validate()){
        clearInterval(timer);
        document.getElementById("currentTime").innerHTML="";
        document.getElementById("timer").innerHTML="";
        var fields=new Array("q01","q02");
        var q;
        for(var i in fields){
            q=document.getElementsByName(fields[i]);
            for(var j=0;j<q.length;j++){
                q[j].disabled = true;
                if(q[j].checked) {
                    formData.append(fields[i],q[j].value);
                }
            }
            document.getElementById(fields[i]).classList.remove("illegal");
        }
        q=document.getElementsByName("q03");
        var data="";
        for(var j=0;j<q.length;j++){
            q[j].disabled = true;
            if(q[j].checked) {
                data+=q[j].value;
            }
        }
        formData.append("q03",data);
        document.getElementById("q03").classList.remove("illegal");
        blanks=new Array("q04","username");
        for(var i in blanks){
            document.forms[0][blanks[i]].disabled = true;
            formData.append(blanks[i],document.forms[0][blanks[i]].value);
            document.getElementById(blanks[i]).classList.remove("illegal");
            document.getElementById("warnmsg").style.visibility="hidden";
            document.getElementById("submit-button").disabled = true;
        }
        var xhr = new XMLHttpRequest();
        xhr.onload= function() {
            responseData=this.responseText.split(',');
            showResult(responseData);
            return false;
        };
        xhr.open("POST","./checktest.aspx");
        xhr.send(formData);
    }
    return false;
}
function greeting() {
    var username;
    formData= new FormData();
    while(true) {
        username=prompt("开始测试之前请输入您的名字");
        if(username==="") {
            alert("必须输入您的名字才能开始！");
            continue;
        }
        else if(username==null) {
            alert("您已取消参与测试！");
            window.location.href='/';
            return;
        }
        else break;
    }
    document.getElementById("viewhistory").href+=username;
    var myTime=new Date();
    var msg=username;
    if(myTime.getHours()<12) msg+="，早上好，";
    else if(myTime.getHours()<18) msg+="，下午好，";
    else msg+="，晚上好，";
    alert(msg+"欢迎参加这个简单的测试！");
    document.getElementsByTagName("body")[0].setAttribute('style','');
    console.log(username);
    document.forms[0]['username'].value=username;
    document.forms[0]['username'].disabled=true;
    startTime=new Date();
    timer=setInterval(setCurrentTime,1);
}

function setCurrentTime() {
    var myTime=new Date();
    YYYY=myTime.getFullYear();
    MM=myTime.getMonth()+1;
    DD=myTime.getDate();
    h=myTime.getHours()>9?myTime.getHours():'0'+myTime.getHours();
    m=myTime.getMinutes()>9?myTime.getMinutes():'0'+myTime.getMinutes();
    s=myTime.getSeconds()>9?myTime.getSeconds():'0'+myTime.getSeconds();
    document.getElementById("currentTime").innerHTML="当前时间："+YYYY+"年"+MM+"月"+DD+"日 "+h+":"+m+":"+s;
    totalTime=myTime-startTime;
    document.getElementById("timer").innerHTML="已用时：<br/>"+(Math.round(totalTime/60000)>9?Math.round(totalTime/60000):('0'+Math.round(totalTime/60000)))+"分"+(Math.round(totalTime/1000)%60>9?Math.round(totalTime/1000)%60:('0'+Math.round(totalTime/1000)%60))+"秒";
}