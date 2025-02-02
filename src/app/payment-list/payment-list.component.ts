import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaymentService } from '../services/payment.service';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { ViewUserDialogComponent } from '../view-user-dialog/view-user-dialog.component';


@Component({
  selector: 'app-payment-list',
  imports: [
    CommonModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './payment-list.component.html',
  styleUrl: './payment-list.component.css'
})
export class PaymentListComponent implements OnInit {
  loading: boolean = true;
  error: boolean = true;

  displayedColumns: string[] = [
    'view-profile',
    'name',
    'email',
    'phone',
    'added-date',
    'due-date',
    'due-amount',
    'discount',
    'tax',
    'total-due',
    'currency',
    'payment-status',
    'action'
  ];

  paymentData: any[] = [];

  constructor(private paymentService: PaymentService, public dialog: MatDialog) { }

  ngOnInit() {
    this.paymentService.getPaymentData().subscribe({
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
        console.error("Error fetching data:", error);
      }
    });
  }

  viewUserProfile(payment: any) {
    this.paymentService.getPaymentDataById(payment["_id"]).subscribe({
      next: (payment: any) => {
        payment["payee_added_date_utc"] = new Date(payment["payee_added_date_utc"]["_Timestamp__inc"] * 1000)
          .toLocaleDateString();
        payment["payee_due_date"] = new Date(payment["payee_due_date"])
          .toLocaleDateString();
        payment["discount_percent"] = payment["discount_percent"].toFixed(2);
        payment["tax_percent"] = payment["tax_percent"].toFixed(2);
        payment["due_amount"] = payment["due_amount"].toFixed(2);
        payment["total_due"] = payment["total_due"].toFixed(2);

        this.dialog.open(ViewUserDialogComponent, {
          width: '500px',
          data: payment
        });
      },
      error: (error: any) => {
        this.loading = false;
        this.error = error.message;
        this.paymentData = [];
        console.error("Error fetching data:", error);
      }
    });
    console.log("View user profile clicked");
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
    alert(payment["_id"] + " is going to be deleted");
    console.log("Edit payment clicked for ID:", payment.id);
  }

  deletePayment(payment: any) {
    alert(payment["_id"] + " is going to be deleted");
    console.log("Delete payment clicked for ID:", payment.id);
  }

}