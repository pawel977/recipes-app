import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import {throwError} from 'rxjs';
import {error} from '@angular/compiler/src/util';

export interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({providedIn: 'root'})
export class AuthService {
  constructor(private http: HttpClient) {
  }

  signup(email: string, password: string) {
    return this.http.post<AuthResponseData>(
      'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyClj8yc26sp_t1RKg9yu16Xn8zkfHSBFcs',
      {
        email: email,
        password: password,
        returnSecureToken: true
      }
    ).pipe(catchError(this.hadleError));
  }

  login(email: string, password: string) {
    return this.http.post<AuthResponseData>(
      'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyClj8yc26sp_t1RKg9yu16Xn8zkfHSBFcs',
      {
        email: email,
        password: password,
        returnSecureToken: true
      }
    ).pipe(catchError(this.hadleError));
  }

  private hadleError(errorRes: HttpErrorResponse) {
    let errorMessage = 'An unknown error occured!';
    if (!errorRes.error || !errorRes.error.error) {
      return throwError(errorMessage);
    }
    switch (errorRes.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage = 'this email exissts already';
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'this email doesn\'t exist';
        break;
      case 'INVALID_PASSWORD':
        errorMessage = 'this password is not correct';
        break;
    }
    return throwError(errorMessage);
  }

}
