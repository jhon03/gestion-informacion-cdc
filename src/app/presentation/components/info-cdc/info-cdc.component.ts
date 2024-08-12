import { Component } from '@angular/core';
import { MaterialModule } from '../../modules/material/material/material.module';

@Component({
  selector: 'app-info-cdc',
  standalone: true,
  imports: [
    MaterialModule
  ],
  templateUrl: './info-cdc.component.html',
  styleUrl: './info-cdc.component.css'
})
export class InfoCdcComponent {

}
