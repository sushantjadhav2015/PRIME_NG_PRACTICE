import { environment } from '../../environments/environment';

const allApiEndPoints: any = {
  USERS: {
    SIGN_UP: (): string => {
      return 'signUp';
    },
    LOGIN: (): string => {
        return 'signInWithPassword'
    },
    LOGOUT: (): string => {
      return '/users/logout';
    },
    UPDATE(userId: string): string {
      return `users/${userId}`;
    },
    CHANGE_PASSWORD(): string {
      return 'users/change_password';
    },
    LIST_BY_SEARCH: () => {
      return 'users/search';
    }
  },
  TENANT: {
    AUTHORIZE: (): string => {
      return 'users/authorize';
    },
  },
};

// export function api(endpointName: string, id?: number): string {
//   const endpointPath = endpointName.split('.');
//   let currentEndpoint = allApiEndPoints;

//   for (const part of endpointPath) {
//     if (!(currentEndpoint = currentEndpoint[part])) {
//       return '';
//     }
//   }

//   return `${environment.api.baseUrl}:${currentEndpoint(id)}`;
// }

export function api(endpointName: string, id?: number): string {
    const endpointPath = endpointName.split('.');
    let currentEndpoint: any = allApiEndPoints;
  
    for (const part of endpointPath) {
      if (!(currentEndpoint = currentEndpoint[part])) {
        return '';
      }
    }
  
    // Constructing the final URL
    let baseUrl = environment.api.baseUrl;
    let endpointUrl = currentEndpoint();
  
    // Check if the endpoint requires an id parameter
    if (endpointName === 'USERS.UPDATE' && id !== undefined) {
      endpointUrl += `/${id}`;
    }
  
    console.log('url will be --', `${baseUrl}:${endpointUrl}?key=${environment.apiKey}`);
    
    return `${baseUrl}:${endpointUrl}?key=${environment.apiKey}`;
  }
  