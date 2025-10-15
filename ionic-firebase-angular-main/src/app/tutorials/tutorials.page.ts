import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import type { RefresherCustomEvent } from '@ionic/angular';
import {
  IonBadge,
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonNote,
  IonRefresher,
  IonRefresherContent,
  IonSpinner,
  IonTextarea,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { firstValueFrom } from 'rxjs';

import { Tutorial } from './tutorial.model';
import { TutorialService } from './tutorial.service';

type RefresherEvent = RefresherCustomEvent;

@Component({
  selector: 'app-tutorials',
  templateUrl: './tutorials.page.html',
  styleUrls: ['./tutorials.page.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
    IonBadge,
    IonButton,
    IonButtons,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardTitle,
    IonContent,
    IonHeader,
    IonInput,
    IonItem,
    IonLabel,
    IonList,
    IonNote,
    IonRefresher,
    IonRefresherContent,
    IonSpinner,
    IonTextarea,
    IonTitle,
    IonToolbar,
  ],
})
export class TutorialsPage {
  private readonly tutorialService = inject(TutorialService);
  private readonly fb = inject(FormBuilder);

  readonly tutorials = signal<Tutorial[]>([]);
  readonly loading = signal(false);
  readonly error = signal<string | null>(null);
  readonly editingTutorialId = signal<string | null>(null);

  readonly tutorialForm = this.fb.nonNullable.group({
    title: ['', [Validators.required, Validators.minLength(3)]],
    description: [''],
  });

  readonly editForm = this.fb.nonNullable.group({
    title: ['', [Validators.required, Validators.minLength(3)]],
    description: [''],
  });

  constructor() {
    this.fetchTutorials();
  }

  async fetchTutorials() {
    this.loading.set(true);
    this.error.set(null);
    try {
      const tutorials = await firstValueFrom(this.tutorialService.getAll());
      this.tutorials.set(tutorials);
    } catch (error) {
      console.error('Error loading tutorials', error);
      this.error.set('No se pudieron obtener los tutoriales.');
    } finally {
      this.loading.set(false);
    }
  }

  async refresh(event: RefresherEvent) {
    try {
      await this.fetchTutorials();
    } finally {
      event.detail.complete();
    }
  }

  trackByTutorialId(_: number, tutorial: Tutorial) {
    return tutorial.id;
  }

  isEditing(tutorial: Tutorial) {
    return this.editingTutorialId() === tutorial.id;
  }

  async createTutorial() {
    if (this.tutorialForm.invalid || this.loading()) {
      return;
    }

    this.loading.set(true);
    this.error.set(null);

    try {
      await firstValueFrom(
        this.tutorialService.create({
          title: this.tutorialForm.controls.title.value,
          description: this.tutorialForm.controls.description.value,
          published: false,
        })
      );
      this.tutorialForm.reset({ title: '', description: '' });
      await this.fetchTutorials();
    } catch (error) {
      console.error('Error creating tutorial', error);
      this.error.set('No se pudo crear el tutorial.');
    } finally {
      this.loading.set(false);
    }
  }

  async togglePublished(tutorial: Tutorial) {
    if (this.loading()) {
      return;
    }

    this.loading.set(true);
    this.error.set(null);

    try {
      await firstValueFrom(
        this.tutorialService.update(tutorial.id, {
          published: !tutorial.published,
        })
      );
      await this.fetchTutorials();
    } catch (error) {
      console.error('Error updating tutorial', error);
      this.error.set('No se pudo actualizar el tutorial.');
    } finally {
      this.loading.set(false);
    }
  }

  startEdit(tutorial: Tutorial) {
    if (this.loading()) {
      return;
    }

    this.editingTutorialId.set(tutorial.id);
    this.editForm.setValue({
      title: tutorial.title,
      description: tutorial.description ?? '',
    });
  }

  cancelEdit() {
    this.editingTutorialId.set(null);
    this.editForm.reset({ title: '', description: '' });
  }

  async saveEdit(tutorial: Tutorial) {
    if (
      !this.isEditing(tutorial) ||
      this.editForm.invalid ||
      this.loading()
    ) {
      this.editForm.markAllAsTouched();
      return;
    }

    this.loading.set(true);
    this.error.set(null);

    try {
      await firstValueFrom(
        this.tutorialService.update(tutorial.id, {
          title: this.editForm.controls.title.value,
          description: this.editForm.controls.description.value,
        })
      );
      this.cancelEdit();
      await this.fetchTutorials();
    } catch (error) {
      console.error('Error updating tutorial', error);
      this.error.set('No se pudo actualizar el tutorial.');
    } finally {
      this.loading.set(false);
    }
  }

  async removeTutorial(tutorial: Tutorial) {
    if (this.loading()) {
      return;
    }

    this.loading.set(true);
    this.error.set(null);

    try {
      await firstValueFrom(this.tutorialService.delete(tutorial.id));
      await this.fetchTutorials();
    } catch (error) {
      console.error('Error deleting tutorial', error);
      this.error.set('No se pudo eliminar el tutorial.');
    } finally {
      this.loading.set(false);
    }
  }
}
