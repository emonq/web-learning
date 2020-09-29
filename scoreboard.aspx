<%@ Page aspcompat=true %>
<html>
    <head>
        <title>得分榜</title>
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
                    <li><a class="active" href="#">Score</a></li>
                </ul>
            </nav>
            <h1 class="titles">近代史测试得分排行榜</h1>
        </header>
        <main>
            <%
            dim db="./data.mdb"
            dim conn=Server.CreateObject("ADODB.Connection")
            dim c=0
            conn.Provider="Microsoft.Jet.OLEDB.4.0"
            conn.Open(Server.Mappath(db))
            dim rs = Server.CreateObject("ADODB.recordset")
            dim sql="SELECT s_name,s_score FROM score ORDER BY s_score DESC"
            rs.open(sql,conn)
            %>
            <table id="scoreboard">
            <tr>
                <th>排名</th>
                <th>用户名</th>
                <th>得分</th>
            </tr>
            <%do until rs.EOF%>
                <tr>
                <%c+=1%>
                <td><%Response.Write(c)%></td>
                <%for each x in rs.Fields%>
                <td><%Response.Write(x.value)%></td>
                <%next
                rs.MoveNext%>
                </tr>
            <%loop%>
            </table>
            <%conn.close%>
        </main>

    </body>
</html>