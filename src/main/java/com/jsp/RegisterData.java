package com.jsp;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.Statement;

import jakarta.servlet.GenericServlet;
import jakarta.servlet.RequestDispatcher;
import jakarta.servlet.ServletException;
import jakarta.servlet.ServletRequest;
import jakarta.servlet.ServletResponse;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@WebServlet("/reg")
public class RegisterData extends HttpServlet {

	

	@Override
	protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		resp.setContentType("text/html");

		String body = null;

		PrintWriter out = resp.getWriter();
		String name = req.getParameter("nm");
		String email = req.getParameter("email");
		String pass = req.getParameter("pw");
		int age = Integer.parseInt(req.getParameter("age"));
		String contry = req.getParameter("contry");
		
	
		  try{			  			           
              Class.forName("com.mysql.cj.jdbc.Driver");
              Connection con=DriverManager.getConnection("jdbc:mysql://localhost:3306/jdbc_01", "root", "Viraj@213");
              PreparedStatement ps = con.prepareStatement("Insert into user values(?,?,?,?,?)");
              ps.setString(1, name);
              ps.setString(2, email);
              ps.setString(3, pass);
              ps.setInt(4, age);
              ps.setString(5,contry); 
              
              int b = ps.executeUpdate();
              if(b>0)
              {
            	  out.println("<h3>Registration Successful You Want to register more??</h3>");
            	  RequestDispatcher rd = req.getRequestDispatcher("Registration.html");
                  rd.include(req, resp); 
              }
             
              con.close();
          }catch(Exception e){
              e.printStackTrace();
          }

	}

}
