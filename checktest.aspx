<%@ language="javascript" aspcompat=true %>

<%
var ans=new Array("d","c","acd","中日甲午战争");
var correct=new Array();
var myTime=new Date();
var YYYY=myTime.getFullYear();
var MM=myTime.getMonth()+1;
var DD=myTime.getDate();
var h=myTime.getHours()>9?myTime.getHours():'0'+myTime.getHours();
var m=myTime.getMinutes()>9?myTime.getMinutes():'0'+myTime.getMinutes();
var s=myTime.getSeconds()>9?myTime.getSeconds():'0'+myTime.getSeconds();
var timeString=YYYY+"年"+MM+"月"+DD+"日 "+h+":"+m+":"+s;
var db="./data.mdb";
var conn=Server.CreateObject("ADODB.Connection");
conn.Provider="Microsoft.Jet.OLEDB.4.0";
conn.Open(Server.MapPath(db));
var rs = Server.CreateObject("ADODB.recordset");
if(Request.Form.Count<5) {
    Response.Write("illegal!");
    Response.End();
}
var score=0;
for(var i=0;i<4;i++){
    if(Request.Form[i]==ans[i]) {
        correct.push(25);
        score+=25;
    }
    else correct.push(0)
}
var sql="INSERT INTO score (s_score,s_name,s_time) VALUES ("+score+",'"+Request.Form[4]+"'"+","+"'"+timeString+"'"+")";
rs.open(sql,conn);
conn.close();
Response.Write(correct+',');
Response.Write(score+',');
Response.Write(Request.Form[4]+',');
Response.Write(timeString);
%>
