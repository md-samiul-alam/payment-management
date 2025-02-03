import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
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
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';


import { ViewUserDialogComponent } from '../view-user-dialog/view-user-dialog.component';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { PaymentFormComponent } from '../payment-form/payment-form.component';
import { PopupMessageComponent } from '../popup-message/popup-message.component';


@Component({
  selector: 'app-payment-list',
  imports: [
    FormsModule,
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
    MatSnackBarModule,
    MatProgressSpinnerModule,
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

  loading: boolean = false;

  paginationLength = 100;
  startIndex = 0;
  pageSize = 5;
  pageSizeOptions: number[] = [5, 10, 25, 100];

  paymentData: any[] = [];

  firstName = "";
  lastName = "";
  dueDateStart = null;
  dueDateEnd = null;

  constructor(
    private paymentService: PaymentService,
    public dialog: MatDialog,
    public snackbar: MatSnackBar,
  ) { }

  ngOnInit() {
    this.fetchPaymentList();
  }

  openPaymentForm() {
    this.dialog.open(PaymentFormComponent, {
      width: "500px",
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
    this.startIndex = event.pageIndex * event.pageSize;
    this.pageSize = event.pageSize
    this.fetchPaymentList();
  }

  private preparePaymentSearchCriteria() {
    return {
      "limit": this.pageSize,
      "skip": this.startIndex,
      "payee_first_name": this.firstName,
      "payee_last_name": this.lastName,
      "payee_due_date_s": this.dueDateStart,
      "payee_due_date_e": this.dueDateEnd,
    }
  }

  fetchPaymentList() {
    const filterPayLoad = this.preparePaymentSearchCriteria();
    this.loading = true;
    this.paymentService.getPaymentData(filterPayLoad).subscribe({
      next: (data: any) => {
        this.loading = false;
        this.paginationLength = data.count;
        this.paymentData = data.payments;
        this.paymentData.forEach(payment => {
          payment = this.sanitizePaymentObj(payment);
        });
      },
      error: (error) => {
        this.loading = false;
        this.paymentData = [];
        console.error("Error fetching data:", error);
      }
    });
  }

  private sanitizePaymentObj(payment: any) {
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
    const filterPayLoad = this.preparePaymentSearchCriteria();
    this.loading = true;
    this.paymentService.getPaymentData(filterPayLoad).subscribe({
      next: (data: any) => {
        this.loading = false;
        this.paginationLength = data.count;
        this.paymentData = data.payments;
        this.paymentData.forEach(payment => {
          payment = this.sanitizePaymentObj(payment);
        });
      },
      error: (error) => {
        this.loading = false;
        this.paymentData = [];
        console.error("Error fetching data:", error);
      }
    });
  }

  createNewPayment() {
    // Implement create new payment logic here
    console.log("Create new payment clicked");
  }

  editPayment(payment: any) {
    const dialogRef = this.dialog.open(PaymentFormComponent, {
      width: "500px",
      panelClass: "my-dialog-class",
    });
  }

  deletePayment(payment: any) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: "375px",
      panelClass: "my-dialog-class",
      data: {
        message: "Are you sure you want to delete this record?",
        id: payment["_id"]
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result == true) {
        this.paymentService.deletePaymentDataById(payment["_id"]).subscribe({
          next: (result: any) => {
            if (result["status"] == 200) {
              this.snackbar.open('Record deleted successfully', 'Dismiss', {
                duration: 3000,
                horizontalPosition: 'center',
                verticalPosition: 'bottom',
                panelClass: ['my-snackbar-class']
              });
              this.fetchPaymentList();

            }
          },
          error: (error: any) => {
            this.paymentData = [];
            console.error("Error fetching data:", error);
          }
        });
      }
    });
  }

}
