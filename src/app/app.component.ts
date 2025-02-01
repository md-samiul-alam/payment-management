import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PaymentListComponent } from "./payment-list/payment-list.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, PaymentListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'payment-management';
}
