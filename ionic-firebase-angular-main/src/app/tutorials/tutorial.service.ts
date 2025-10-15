import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { Tutorial, TutorialPayload } from './tutorial.model';

interface TutorialResponse {
  _id: string;
  title: string;
  description?: string;
  published: boolean;
  createdAt?: string;
  updatedAt?: string;
}

@Injectable({
  providedIn: 'root',
})
export class TutorialService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = `${environment.apiUrl}/tutorials`;

  getAll(): Observable<Tutorial[]> {
    return this.http
      .get<TutorialResponse[]>(this.baseUrl)
      .pipe(map((tutorials) => tutorials.map((tutorial) => this.mapTutorial(tutorial))));
  }

  get(id: string): Observable<Tutorial> {
    return this.http
      .get<TutorialResponse>(`${this.baseUrl}/${id}`)
      .pipe(map((tutorial) => this.mapTutorial(tutorial)));
  }

  create(payload: TutorialPayload): Observable<Tutorial> {
    return this.http
      .post<TutorialResponse>(this.baseUrl, payload)
      .pipe(map((tutorial) => this.mapTutorial(tutorial)));
  }

  update(id: string, payload: Partial<TutorialPayload>): Observable<void> {
    return this.http
      .put(`${this.baseUrl}/${id}`, payload)
      .pipe(map(() => void 0));
  }

  delete(id: string): Observable<void> {
    return this.http
      .delete(`${this.baseUrl}/${id}`)
      .pipe(map(() => void 0));
  }

  private mapTutorial(tutorial: TutorialResponse): Tutorial {
    return {
      id: tutorial._id,
      title: tutorial.title,
      description: tutorial.description,
      published: tutorial.published,
      createdAt: tutorial.createdAt,
      updatedAt: tutorial.updatedAt,
    };
  }
}
