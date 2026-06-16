import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';
import { ChecklistItem } from '../models/checklist-item.model';

/** Accès aux items de la checklist code review exposés par l'API. */
@Injectable({ providedIn: 'root' })
export class CodeReviewService {
  private http = inject(HttpClient);
  private readonly baseUrl = `${environment.apiBaseUrl}/code-review`;

  getChecklist(): Observable<ChecklistItem[]> {
    return this.http.get<ChecklistItem[]>(this.baseUrl);
  }
}
