package com.jsp;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

import jakarta.servlet.RequestDispatcher;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@WebServlet("/log")
public class Login extends HttpServlet {
    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        resp.setContentType("text/html");
        PrintWriter out = resp.getWriter();

        String email = req.getParameter("email");
        String pass = req.getParameter("pw");

        try {
            Class.forName("com.mysql.cj.jdbc.Driver");
            Connection con = DriverManager.getConnection("jdbc:mysql://localhost:3306/jdbc_01", "root", "Viraj@213");
            PreparedStatement ps = con.prepareStatement("select * from user where email=?");
            ps.setString(1, email);

            ResultSet rs = ps.executeQuery();

            if (rs.next()) {
                String emailLogin = rs.getString("email");
                String passLogin = rs.getString("password");

                if (emailLogin.equals(email) && passLogin.equals(pass)) {
                    // Create cookies to remember the user
                    Cookie c1 = new Cookie("cookie1", email);
                    Cookie c2 = new Cookie("cookie2", pass);
                    c1.setMaxAge(60*60*24*3);  
                    c2.setMaxAge(60*60*24*3);  
                    resp.addCookie(c1);
                    resp.addCookie(c2);
                    

                    // Redirect to home page
                    resp.sendRedirect("home.html");
                } else {
                    RequestDispatcher dispatcher = req.getRequestDispatcher("Login.html");
                    dispatcher.include(req, resp);
                    out.println("<h2 align='center'>Incorrect password. Please try again.</h2>");
                    System.out.println("Adding H2 Tag");
                }
            } else {
                RequestDispatcher dispatcher = req.getRequestDispatcher("Login.html");
                dispatcher.include(req, resp);
                out.println("<h2 align='center'>Email not found. Please register first.</h2>");
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
