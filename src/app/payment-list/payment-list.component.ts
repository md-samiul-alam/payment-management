import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';


interface Payment {
  id: string;
  name: string;
  age: number;
  email: string;
  city: string;
  country: string;
}

@Component({
  selector: 'app-payment-list',
  imports: [CommonModule],
  templateUrl: './payment-list.component.html',
  styleUrl: './payment-list.component.css'
})
export class PaymentListComponent implements OnInit {
  paymentData: Payment[] = [
    { id: '1', name: 'John Doe', age: 30, email: 'john.doe@example.com', city: 'New York', country: 'USA' },
    { id: '2', name: 'Jane Smith', age: 25, email: 'jane.smith@example.com', city: 'London', country: 'UK' },
    { id: '3', name: 'Peter Jones', age: 40, email: 'peter.jones@example.com', city: 'Paris', country: 'France' },
  ];

  ngOnInit() {

  }

  applyFilters() {
    // Implement filter functions here
    console.log("Implement filter functions here");
  }

  createNewPayment() {
    // Implement create new payment logic here
    console.log("Create new payment clicked");
  }

  editPayment(payment: Payment) {
    // Implement edit payment logic here
    console.log("Edit payment clicked for ID:", payment.id);
  }

  deletePayment(payment: Payment) {
    // Implement delete payment logic here
    console.log("Delete payment clicked for ID:", payment.id);
  }

}