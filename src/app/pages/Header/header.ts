import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, ButtonModule],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {

  title = 'GYM TRACKER'
  startedDate = '16/June/2025'

  @Input() weight: string = ''
  @Input() height: string = ''
  @Input() age: string = ''
  @Output() editProfileClick = new EventEmitter<void>();

  today = new Date();

  editProfile() {
    this.editProfileClick.emit();
  }
}
