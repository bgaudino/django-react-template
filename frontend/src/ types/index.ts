interface AuthenticatedUser {
  id: string;
  email: string;
  is_authenticated: true;
}

interface UnauthenticatedUser {
  is_authenticated: false;
}

export type User = AuthenticatedUser | UnauthenticatedUser;
