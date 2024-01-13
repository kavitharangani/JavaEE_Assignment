package com.example.javaee_assignment.db;


import com.example.javaee_assignment.dto.ItemDTO;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

public class ItemDBProcess {
    Connection connection;

    private static final String SAVE_ITEM_DATA = "INSERT INTO item(code,description,qty,unitPrice) VALUES (?,?,?,?)";
    private static final String UPDATE_ITEM_DATA = "UPDATE item SET description = ?, qty = ?, unitPrice = ? WHERE code = ?";
    private static final String DELETE_ITEM_DATA = "DELETE FROM item WHERE code = ?";


    final  static Logger logger = LoggerFactory.getLogger(CustomerDBProcess.class);

    public void saveItem(ItemDTO items, Connection connection) {
        ArrayList<ItemDTO> itemDTOS = new ArrayList<>();
        itemDTOS.add(items);
        for (ItemDTO itemData : itemDTOS) {
            try {
                System.out.println(connection);
                var ps = connection.prepareStatement(SAVE_ITEM_DATA);
                ps.setString(1, itemData.getCode());
                ps.setString(2, itemData.getDescription());
                ps.setInt(3, itemData.getQty());
                ps.setDouble(4, itemData.getUnitPrice());

                if (ps.executeUpdate() != 0) {
                    logger.info("Data Saved");
                    System.out.println("Data saved");
                } else {
                    logger.info("Save Failed");
                    System.out.println("Failed to save");
                }

            } catch (SQLException e) {
                throw new RuntimeException(e);
            }
            items.clear();
        }
    }


    public void updateItem(ItemDTO item, Connection connection) {
        try {
            PreparedStatement ps = connection.prepareStatement(UPDATE_ITEM_DATA);

            ps.setString(1, item.getDescription());
            ps.setInt(2, item.getQty());
            ps.setDouble(3, item.getUnitPrice());
            ps.setString(4, item.getCode());

            int rowsAffected = ps.executeUpdate();
            if (rowsAffected != 0) {
                logger.info("Data Updated");
                System.out.println("Data updated");
            } else {
                logger.info("Update Failed. Item not found.");
                System.out.println("Failed to update");
            }
        } catch (SQLException e) {
            throw new RuntimeException("Error updating item data", e);
        }
        item.clear();
    }


    public void deleteItem(String itemId, Connection connection) {
        try {
            PreparedStatement ps = connection.prepareStatement(DELETE_ITEM_DATA);
            ps.setString(1, itemId);

            int rowsAffected = ps.executeUpdate();
            if (rowsAffected != 0) {
                logger.info("Data Deleted");
                System.out.println("Data deleted");
            } else {
                logger.error("Failed to delete. Customer not found.");
                System.out.println("Failed to delete");
            }
        } catch (SQLException e) {
            throw new RuntimeException("Error deleting customer data", e);
        }
    }

}

