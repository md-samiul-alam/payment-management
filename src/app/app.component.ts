import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PaymentListComponent } from "./payment-list/payment-list.component";
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, PaymentListComponent],
  providers: [HttpClient],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'payment-management';
}
