<%@ Page language="javascript" aspcompat=true Debug=true %>
<%
var username=Request.QueryString("username")
var flag
if( username=="" || username==null ){
    flag=false;
}
else flag=true;
var db="./data.mdb";
var conn=Server.CreateObject("ADODB.Connection");
var c=0;
conn.Provider="Microsoft.Jet.OLEDB.4.0";
conn.open(Server.MapPath(db));
var rs = Server.CreateObject("ADODB.recordset");
var sql="SELECT s_score,s_time FROM score WHERE s_name="+"'"+username+"'";
rs.open(sql,conn);
if(rs.EOF) flag=false;
%>
<html>
    <head>
        <title>�ύ��ʷ</title>
        <link rel="stylesheet" href="./css/style.css">
        <link rel="icon" href="./resources/icons/scoreboard.ico">
    </head>
    <body>
        <header>
            <nav>
                <ul>
                    <li><a href="./aboutme.html">About</a></li>
                    <li><a href=".">Home</a></li>
                    <li><a href="./onlinetest.html">Test</a></li>
                    <li><a href="./scoreboard.aspx">Score</a></li>
                </ul>
            </nav>
            <h1 class="titles"><%
            if(flag){
                Response.Write(username+"���ύ��ʷ");
            }
            else Response.Write("����δ�й��ύ");
            %></h1>
        </header>
        <main>

            <%if(flag) {
                Response.Write("<table id=\"scoreboard\"><tr><th>�÷�<\/th><th>�ύʱ��<\/th><\/tr>");
            }%>
            <%
            while(!rs.EOF) {
                Response.Write("<tr>");
                for(var i=0;i<rs.Fields.Count;i++) {
                    Response.Write("<td>"+rs.Fields[i].value+"<\/td>");
                }
                rs.MoveNext();
                Response.Write("<\/tr>");
            }
            %>
            <%if(flag)Response.Write("<\/table>");%>
            <%conn.close();%>
        </main>
    </body>
</html>