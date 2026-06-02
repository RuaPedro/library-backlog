import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

export interface UserSettings {
  displayName: string;
  email: string;
  language: string;
  darkMode: boolean;
  notifications: boolean;
  publicProfile: boolean;
}

@Component({
  selector: 'app-settings',
  imports: [
    CommonModule,
    FormsModule,
    MatIconModule,
    MatButtonModule,
    MatSlideToggleModule,
  ],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss'
})
export class SettingsComponent implements OnInit {
  @Input() initialSettings: Partial<UserSettings> = {};
  @Input() readOnly: boolean = false;

  @Output() settingsSaved = new EventEmitter<UserSettings>();
  @Output() settingsCancelled = new EventEmitter<void>();
  @Output() settingChanged = new EventEmitter<{ key: keyof UserSettings; value: unknown }>();

  public settings: UserSettings = {
    displayName: '',
    email: '',
    language: 'en',
    darkMode: false,
    notifications: true,
    publicProfile: false,
  };

  public languages = [
    { value: 'en', label: 'English' },
    { value: 'es', label: 'Spanish' },
    { value: 'pt', label: 'Portuguese' },
    { value: 'fr', label: 'French' },
  ];

  public isSaving: boolean = false;

  ngOnInit(): void {
    this.settings = { ...this.settings, ...this.initialSettings };
  }

  public onToggleChange(key: keyof UserSettings, value: boolean): void {
    (this.settings as unknown as Record<string, unknown>)[key] = value;
    this.settingChanged.emit({ key, value });
  }

  public onFieldChange(key: keyof UserSettings, value: string): void {
    (this.settings as unknown as Record<string, unknown>)[key] = value;
    this.settingChanged.emit({ key, value });
  }

  public onSave(): void {
    this.isSaving = true;
    setTimeout(() => {
      this.isSaving = false;
      this.settingsSaved.emit({ ...this.settings });
    }, 600);
  }

  public onCancel(): void {
    this.settings = { ...this.settings, ...this.initialSettings };
    this.settingsCancelled.emit();
  }
}
