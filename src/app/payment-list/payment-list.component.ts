import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaymentService } from '../services/payment.service';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-payment-list',
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './payment-list.component.html',
  styleUrl: './payment-list.component.css'
})
export class PaymentListComponent implements OnInit {
  loading: boolean = true;
  error: boolean = true;

  paymentData: any[] = [];

  constructor(private paymentService: PaymentService) { }

  ngOnInit() {
    this.paymentService.getData().subscribe({
      next: (data) => {
        this.paymentData = data;
        this.paymentData.forEach(payment => {
          payment["payee_added_date_utc"] = new Date(payment["payee_added_date_utc"]["_Timestamp__inc"] * 1000)
            .toLocaleDateString();
          payment["payee_due_date"] = new Date(payment["payee_due_date"])
            .toLocaleDateString();
          payment["discount_percent"] = payment["discount_percent"].toFixed(2);
          payment["tax_percent"] = payment["tax_percent"].toFixed(2);
          payment["due_amount"] = payment["due_amount"].toFixed(2);
          payment["total_due"] = payment["total_due"].toFixed(2);
        });
        this.loading = false;
        this.error = false;
      },
      error: (error) => {
        this.loading = false;
        this.error = error.message;
        this.paymentData = [];
        console.error('Error fetching data:', error);
      }
    });
  }

  applyFilters() {
    // Implement filter functions here
    console.log("Implement filter functions here");
  }

  createNewPayment() {
    // Implement create new payment logic here
    console.log("Create new payment clicked");
  }

  editPayment(payment: any) {
    // Implement edit payment logic here
    console.log("Edit payment clicked for ID:", payment.id);
  }

  deletePayment(payment: any) {
    // Implement delete payment logic here
    console.log("Delete payment clicked for ID:", payment.id);
  }

}