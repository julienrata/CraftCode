import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';
import { Tool } from '../models/tool.model';

/** Accès au registre des outils exposé par l'API. */
@Injectable({ providedIn: 'root' })
export class ToolService {
  private http = inject(HttpClient);
  private readonly baseUrl = `${environment.apiBaseUrl}/tools`;

  getTools(): Observable<Tool[]> {
    return this.http.get<Tool[]>(this.baseUrl);
  }
}
