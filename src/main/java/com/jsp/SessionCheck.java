package com.jsp;

import java.io.IOException;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@WebServlet("/checkSession")
public class SessionCheck extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        boolean loggedIn = false;
        String email = null;

        // Check for cookies
        Cookie[] cookies = req.getCookies();
        if (cookies != null) {
            for (Cookie cookie : cookies) {
                if ("cookie1".equals(cookie.getName())) {
                    email = cookie.getValue();
                    loggedIn = true;
                    break;
                }
            }
        }

        // If logged in and email cookie exists, respond OK (status 200)
        if (loggedIn && email != null) {
            resp.setStatus(HttpServletResponse.SC_OK);  // User is authenticated
        } else {
            // If not logged in, redirect to Login page
            resp.sendRedirect("Login.html");
        }
    }
}

