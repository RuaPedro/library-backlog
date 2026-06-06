import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-badge',
  imports: [CommonModule],
  templateUrl: './badge.component.html',
  styleUrl: './badge.component.scss',
})
export class BadgeComponent {
  @Input() public variant: 'primary' | 'secondary' | 'warning' | 'success' | 'danger' = 'primary';

  get classes(): string {
    const base =
      'flex flex-row gap-2 items-center rounded-full px-2 py-1 text-xs font-medium inset-ring';

    const variants = {
      primary: 'bg-blue-100 text-blue-600 inset-ring-blue-600/10',
      secondary: 'bg-gray-100 text-gray-600 inset-ring-gray-600/10',
      warning: 'bg-yellow-100 text-yellow-600 inset-ring-yellow-600/10',
      success: 'bg-green-100 text-green-600 inset-ring-green-600/10',
      danger: 'bg-red-100 text-red-600 inset-ring-red-600/10',
    };

    return `${base} ${variants[this.variant]}`;
  }
}
