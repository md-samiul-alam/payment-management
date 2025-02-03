import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDatepicker } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelect } from '@angular/material/select';


@Component({
  selector: 'app-update-payment',
  imports: [
    MatDatepicker,
    MatFormFieldModule,
    MatSelect,
  ],
  templateUrl: './update-payment.component.html',
  styleUrl: './update-payment.component.css'
})
export class UpdatePaymentComponent {
  payeeForm!: FormGroup;
  showProvinceOrState: boolean = false; // Initialize to false

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.payeeForm = this.fb.group({
      payee_first_name: [''],
      payee_last_name: ['', Validators.required],
      payee_added_date_utc: [''], // Consider using a date adapter for formatting
      payee_due_date: [''], // Consider using a date adapter for formatting
      payee_address_line_1: ['', Validators.required],
      payee_address_line_2: [''],
      payee_city: ['', Validators.required],
      payee_country: ['', Validators.required],
      payee_province_or_state: [''], // Conditional, controlled by showProvinceOrState
      payee_postal_code: ['', Validators.required],
      payee_phone_number: ['', Validators.required], // Add validation for E.164 format
      payee_email: ['', [Validators.required, Validators.email]],
      currency: ['', Validators.required], // Add validation for ISO 4217 format
      discount_percent: [''], // Add validation for 2 decimal points
      tax_percent: [''],      // Add validation for 2 decimal points
      due_amount: ['', [Validators.required, Validators.min(0)]] // Add validation for 2 decimal points and non-negative
    });

    // Example: Show province/state based on country selection
    this.payeeForm.get('payee_country')?.valueChanges.subscribe(country => {
      this.showProvinceOrState = this.shouldShowProvinceOrState(country); // Implement logic
    });
  }

  onSubmit(): void {
    if (this.payeeForm.valid) {
      console.log(this.payeeForm.value); // Process form data
      // Here you would typically send the data to a service
    }
  }

  // Example logic to determine if province/state should be shown
  shouldShowProvinceOrState(country: any): boolean {
    // Replace with your actual logic based on country codes or data
    return country === 'US' || country === 'CA'; // Example: Show for US and Canada
  }
}
