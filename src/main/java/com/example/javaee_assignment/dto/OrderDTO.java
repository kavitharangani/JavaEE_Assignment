package com.example.javaee_assignment.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class OrderDTO {
        private  String order_id ;
        private String description;
        private int qtyOnHand;
        private double total;


}


