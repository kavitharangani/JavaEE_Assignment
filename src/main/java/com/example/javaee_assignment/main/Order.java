package com.example.javaee_assignment.main;

import com.example.javaee_assignment.dto.OrderDTO;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;

public class Order extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {

        try {
            Class.forName("com.mysql.cj.jdbc.Driver");

            Connection connection = DriverManager.getConnection("jdbc:mysql://localhost:3306/javaeeassignment", "root", "1234");
            ResultSet rst = connection.prepareStatement("select * from orders").executeQuery();

            String allRecords = "";
            while (rst.next()) {
                String orderId = rst.getString("order_id");
                String description = rst.getString("description");
                int qtyOnHand = rst.getInt("qtyOnHand");
                double total = rst.getDouble("total");
                System.out.println(orderId + "" + description + "" + qtyOnHand + "" + total);

                OrderDTO order = new OrderDTO(orderId,description,qtyOnHand,total);
                String orderJson = "{\"orderId\":\"" + order.getOrder_id() + "\",\"description\":\"" + order.getDescription() +
                        "\",\"qtyOnHand\":" + order.getQtyOnHand() + ",\"total\":" + order.getTotal() + "},";
                allRecords = allRecords + orderJson;
            }

            String finalJson = "[" + allRecords.substring(0, allRecords.length() - 1) + "]";
            PrintWriter writer = resp.getWriter();
            writer.write(finalJson);
            resp.setContentType("application/json");
        } catch (ClassNotFoundException | SQLException e) {
            e.printStackTrace();
//            writer.write("{\"error\":\"An error occurred while processing the request\"}");
        }

    }
}