import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PaymentListComponent } from "./payment-list/payment-list.component";
import { HttpClient } from '@angular/common/http';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';


@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    PaymentListComponent,
    MatToolbarModule,
    MatIconModule,
  ],
  providers: [HttpClient],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent {
  title = 'Payment Management';
}
