import { ChangeDetectionStrategy, Component, ElementRef, Inject, inject, ViewChild } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatStepperModule } from '@angular/material/stepper';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { PopupMessageComponent } from '../popup-message/popup-message.component';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AutoCompleteService } from '../services/autocomplete.service';
import { CommonModule } from '@angular/common';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

interface Currency {
  name: string,
  currency: string,
  iso3: string,
}

@Component({
  selector: 'app-payment-form',
  imports: [
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatStepperModule,
    FormsModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    CommonModule,
    MatAutocompleteModule,
  ],
  templateUrl: './payment-form.component.html',
  styleUrl: './payment-form.component.css'
})
export class PaymentFormComponent {
  currencies: Currency[] = [];
  filteredCurrencies: Currency[] = [];

  firstFormGroup: FormGroup = new FormGroup({
    firstName: new FormControl(""),
    lastName: new FormControl("", [Validators.required]),
    email: new FormControl("", [Validators.required]),
    phoneNo: new FormControl(""),
    addrsLine1: new FormControl("", [Validators.required]),
    addrsLine2: new FormControl(""),
    city: new FormControl("", [Validators.required]),
    province: new FormControl(""),
    country: new FormControl("", [Validators.required]),
    postalCode: new FormControl("", [Validators.required]),
  });
  secondFormGroup = new FormGroup({
    dueAmount: new FormControl("", [Validators.required]),
    currency: new FormControl("", [Validators.required]),
    dueDate: new FormControl("",),
    discount: new FormControl(""),
    tax: new FormControl("",),
  });

  constructor(
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private autoCompleteService: AutoCompleteService,
  ) {
    if (data.mode == 'edit') {
      this.loadFormData(data.payment);
    }
    else if (data.mode == 'create') {
      this.loadFormAutoComplete();
    }
  }

  loadFormAutoComplete() {
    this.autoCompleteService.getCurrencyData().subscribe({
      next: (result: any) => {
        this.currencies = result.data;
        this.filteredCurrencies = result.data;

      },
      error: (error: any) => {
        this.currencies = [];
        console.error("Error fetching data:", error);
      }
    });
  }

  loadFormData(payment: any) {
    const data = {
      firstName: payment['payee_first_name'],
      lastName: payment['payee_last_name'],
      email: payment['payee_email'],
      phoneNo: payment['payee_email'],
      addrsLine1: payment['payee_address_line_1'],
      addrsLine2: payment['payee_address_line_2'],
      city: payment['payee_city'],
      province: payment['payee_province_or_state'],
      country: payment['payee_country'],
      postalCode: payment['payee_postal_code'],
    };
    this.firstFormGroup.setValue(data)
  }

  saveFormData() {
    this.dialog.open(PopupMessageComponent, {
      width: "500px",
      data: {
        message: "Sorry! This feature is still under construction.",
      },
    });
  }

  filter(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const filterValue = inputElement.value.toLowerCase();
    this.filteredCurrencies = this.currencies.filter(o => {
      return (o.currency.toLowerCase().includes(filterValue) || o.name.toLowerCase().includes(filterValue))
    });
  }
}

