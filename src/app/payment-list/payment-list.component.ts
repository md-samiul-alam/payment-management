import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaymentService } from '../services/payment.service';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatRippleModule } from '@angular/material/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';

import { ViewUserDialogComponent } from '../view-user-dialog/view-user-dialog.component';


@Component({
  selector: 'app-payment-list',
  imports: [
    CommonModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatDatepickerModule,
    MatRippleModule,
    MatPaginator,
  ],
  templateUrl: './payment-list.component.html',
  styleUrl: './payment-list.component.css'
})
export class PaymentListComponent implements OnInit {
  readonly panelOpenState = signal(false);
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

  paginationLength = 100;
  pageSize = 5;
  pageSizeOptions: number[] = [5, 10, 25, 100];

  paymentData: any[] = [];

  constructor(private paymentService: PaymentService, public dialog: MatDialog) { }

  ngOnInit() {
    this.paymentService.getPaymentData(this.pageSize, 0).subscribe({
      next: (data: any) => {
        this.paginationLength = data.count;
        this.paymentData = data.payments;
        this.paymentData.forEach(payment => {
          payment = this.sanitizePaymentObj(payment);
        });
      },
      error: (error) => {
        this.paymentData = [];
        console.error("Error fetching data:", error);
      }
    });
  }

  viewUserProfile(payment: any) {
    this.paymentService.getPaymentDataById(payment["_id"]).subscribe({
      next: (payment: any) => {
        payment = this.sanitizePaymentObj(payment);

        this.dialog.open(ViewUserDialogComponent, {
          width: '500px',
          data: payment
        });
      },
      error: (error: any) => {
        this.paymentData = [];
        console.error("Error fetching data:", error);
      }
    });
  }

  onPageChange(event: PageEvent) {
    const startIndex = event.pageIndex * event.pageSize;
    this.pageSize = event.pageSize
    this.paymentService.getPaymentData(this.pageSize, startIndex).subscribe({
      next: (data: any) => {
        this.paginationLength = data.count;
        this.paymentData = data.payments;
        this.paymentData.forEach(payment => {
          payment = this.sanitizePaymentObj(payment);
        });
      },
      error: (error) => {
        this.paymentData = [];
        console.error("Error fetching data:", error);
      }
    });
  }

  sanitizePaymentObj(payment: any) {
    payment["payee_added_date_utc"] = new Date(payment["payee_added_date_utc"]["_Timestamp__inc"] * 1000)
      .toLocaleDateString();
    payment["payee_due_date"] = new Date(payment["payee_due_date"])
      .toLocaleDateString();
    payment["discount_percent"] = payment["discount_percent"].toFixed(2);
    payment["tax_percent"] = payment["tax_percent"].toFixed(2);
    payment["due_amount"] = payment["due_amount"].toFixed(2);
    payment["total_due"] = payment["total_due"].toFixed(2);
    return payment;
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
