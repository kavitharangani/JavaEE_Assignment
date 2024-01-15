package com.example.javaee_assignment.main;

import com.example.javaee_assignment.db.CustomerDBProcess;
import com.example.javaee_assignment.db.ItemDBProcess;
import com.example.javaee_assignment.dto.CustomerDTO;
import com.example.javaee_assignment.dto.ItemDTO;
import jakarta.json.bind.Jsonb;
import jakarta.json.bind.JsonbBuilder;
import jakarta.servlet.RequestDispatcher;
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
import java.sql.Connection;
import java.sql.SQLException;

@WebServlet(name = "customer",urlPatterns = "/customer",
        initParams = {
                @WebInitParam(name = "db-user",value = "root"),
                @WebInitParam(name = "db-pw",value = "1234"),
                @WebInitParam(name = "db-url",value = "jdbc:mysql://localhost:3306/javaeeassignment?createDatabaseIfNotExist=true"),
                @WebInitParam(name = "db-class",value = "com.mysql.cj.jdbc.Driver"),

        }
        )


public class Customer extends HttpServlet {
    Connection connection;
    final  static Logger logger = LoggerFactory.getLogger(Customer.class);

    @Override
    public void init() throws ServletException {
        try {
            InitialContext ctx = new InitialContext();
            DataSource pool = (DataSource) ctx.lookup("java:comp/env/jdbc/pos");
            System.out.println(pool);
            this.connection = pool.getConnection();

        } catch (NamingException | SQLException e) {
            e.printStackTrace();
        }
    }


    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        if (req.getContentType() == null || !req.getContentType().toLowerCase().startsWith("application/json")) {
            resp.sendError(HttpServletResponse.SC_BAD_REQUEST);

        } else {
            Jsonb jsonb = JsonbBuilder.create();
            CustomerDTO customerDTO = jsonb.fromJson(req.getReader(), new CustomerDTO() {
            }.getClass().getGenericSuperclass());
            var dbProcess = new CustomerDBProcess();

            dbProcess.saveCustomer(customerDTO, connection);
            jsonb.toJson(customerDTO, resp.getWriter());
        }
    }


    @Override
    protected void doPut(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        if (req.getContentType() == null || !req.getContentType().toLowerCase().startsWith("application/json")) {
            resp.sendError(HttpServletResponse.SC_BAD_REQUEST);

        } else {
            Jsonb jsonb = JsonbBuilder.create();
            CustomerDTO customerDTO = jsonb.fromJson(req.getReader(), new CustomerDTO() {
            }.getClass().getGenericSuperclass());
            var dbProcess = new CustomerDBProcess();

            dbProcess.updateCustomer(customerDTO, connection);
            jsonb.toJson(customerDTO, resp.getWriter());

        }
    }


    @Override
    protected void doDelete(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        String customerId = req.getParameter("customer_id");

        if (customerId == null || customerId.isEmpty()) {
            resp.sendError(HttpServletResponse.SC_BAD_REQUEST, "Customer ID is missing in the request.");
            return;
        }

        var dbProcess = new CustomerDBProcess();
        dbProcess.deleteCustomer(customerId, connection);
        resp.getWriter().write("Customer deleted successfully.");
    }


    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        String customerId = req.getParameter("customer_id");

        if (customerId == null || customerId.isEmpty()) {
            resp.sendError(HttpServletResponse.SC_BAD_REQUEST, "Missing customer_id parameter");
            return;
        }

        try {
            CustomerDTO customerDTO = CustomerDBProcess.getCustomerById(customerId, connection);

            if (customerDTO != null) {
                Jsonb jsonb = JsonbBuilder.create();
                resp.getWriter().write(jsonb.toJson(customerDTO));
            } else {
                resp.sendError(HttpServletResponse.SC_NOT_FOUND, "Customer not found");
            }
        } catch (Exception e) {
            resp.sendError(HttpServletResponse.SC_INTERNAL_SERVER_ERROR, "Error processing request");
        }
    }
}

