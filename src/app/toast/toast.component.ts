import { Component } from '@angular/core';
import { AppToastService } from './toast.service';

@Component({
  selector: 'app-toast',
  template: ' ... ',
  styleUrls: ['./toast.component.css']
})
export class ToastComponent {
  constructor(public toastService: AppToastService) {}

  
}
