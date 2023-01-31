import { Component } from '@angular/core';
import {ToastComponent} from './toast/toast.component'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent {
  title = 'appKnownlegdeJE';
    constructor(private toast:ToastComponent){
      
    }
}
