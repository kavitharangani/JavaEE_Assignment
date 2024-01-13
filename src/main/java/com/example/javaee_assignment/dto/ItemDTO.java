package com.example.javaee_assignment.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@AllArgsConstructor
@NoArgsConstructor
@Data

public class ItemDTO implements Serializable {
    private String code;
    private String description;
    private int qty;
    private double unitPrice;

    public void clear() {
        this.code = null;
        this.description = null;
        this.qty = Integer.parseInt(null);
        this.unitPrice = Double.parseDouble(null);
    }

}
