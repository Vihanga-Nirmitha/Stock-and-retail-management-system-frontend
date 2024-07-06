import { Component,OnInit, ViewChild  ,ElementRef, AfterViewInit,} from '@angular/core';

import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-admin-page',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './admin-page.component.html',
  styleUrl: './admin-page.component.css'
})
export class AdminPageComponent {
  

  
    
    isAddItem : Boolean = true;
    isEditItem : Boolean = false;
    isAddStock : Boolean = false;
    isAddCategory : Boolean = false;
    
    
}
