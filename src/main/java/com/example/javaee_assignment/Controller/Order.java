package com.example.javaee_assignment.Controller;

import com.example.javaee_assignment.db.OrderDBProcess;
import com.example.javaee_assignment.dto.OrderDTO;
import jakarta.json.bind.Jsonb;
import jakarta.json.bind.JsonbBuilder;
import jakarta.json.bind.JsonbException;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebInitParam;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.naming.InitialContext;
import javax.naming.NamingException;
import javax.sql.DataSource;
import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.Arrays;
import java.util.List;

@WebServlet(name = "orders",urlPatterns = "/orders",
        initParams = {
                @WebInitParam(name = "db-user",value = "root"),
                @WebInitParam(name = "db-pw",value = "1234"),
                @WebInitParam(name = "db-url",value = "jdbc:mysql://localhost:3306/javaeeassignment?createDatabaseIfNotExist=true"),
                @WebInitParam(name = "db-class",value = "com.mysql.cj.jdbc.Driver"),

        }
)

public class Order extends HttpServlet {
    Connection connection;
    final static Logger logger = LoggerFactory.getLogger(Order.class);

    @Override
    public void init() throws ServletException {
        try {
            InitialContext ctx = new InitialContext();
            DataSource pool = (DataSource) ctx.lookup("java:comp/env/jdbc/pos");
            System.out.println(pool);
            this.connection = pool.getConnection();

        } catch (SQLException | NamingException e) {
            e.printStackTrace();
        }
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        if (req.getContentType() == null || !req.getContentType().toLowerCase().startsWith("application/json")) {
            resp.sendError(HttpServletResponse.SC_BAD_REQUEST);

        } else {
            Jsonb jsonb = JsonbBuilder.create();
            OrderDTO orderDTO = jsonb.fromJson(req.getReader(), new OrderDTO() {
            }.getClass().getGenericSuperclass());
            var dbProcess = new OrderDBProcess();

            dbProcess.saveOrder(orderDTO, connection);
            jsonb.toJson(orderDTO, resp.getWriter());

        }
    }
}