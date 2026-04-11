import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Product } from '../models/product.model';

/**
 * Service for managing products (insurance products)
 *
 * TODO: Candidate must implement the following method:
 * - getProducts(): Observable<Product[]>
 *
 * Requirements:
 * - Use HttpClient for HTTP requests
 * - Use catchError operator to handle errors
 * - Base URL should be configurable via environment.apiUrl
 */
@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private readonly apiUrl = environment.apiUrl;
  private readonly endpoint = '/products';

  constructor(private http: HttpClient) {}

  /**
   * Get all available products
   * GET /api/products
   *
   * @returns Observable of array of products
   *
   * TODO: Implement this method
   * - GET from ${this.apiUrl}${this.endpoint}
   * - Handle errors with catchError
   */
  getProducts(): Observable<Product[]> {
    const url = `${this.apiUrl}${this.endpoint}`;
    return this.http.get<Product[]>(url).pipe(
    catchError(error => this.handleError(error))
    );
  }

  /**
   * Handle HTTP errors
   *
   * @param error The error object from HttpClient
   * @returns Observable that throws a user-friendly error message
   *
   * TODO: Implement error handling if needed
   */
  private handleError(error: any): Observable<never> {
    // Log pour le debug
    console.error('Product service error:', error);
    
    // Message par défaut (fallback)
    let errorMessage = 'Failed to load products';

    // 1. On cherche d'abord le message précis du backend
    if (error.error && typeof error.error.message === 'string') {
      errorMessage = error.error.message;
    } 
    // 2. On gère le cas 404 (URL introuvable ou endpoint désactivé)
    else if (error.status === 404) {
      errorMessage = 'Product list not found (404).';
    }

    // On retourne l'erreur avec la syntaxe exacte demandée
    return throwError(() => new Error(errorMessage));
  }
}
