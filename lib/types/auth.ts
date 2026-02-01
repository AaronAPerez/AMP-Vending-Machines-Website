// lib/types/auth.ts
export interface AdminUser {
  id: string;
  email: string;
  role: 'admin' | 'super_admin';
  name: string;
  avatar?: string;
  avatarUrl?: string;
  permissions: AdminPermission[];
  lastLogin?: Date;
  createdAt: Date;
  isActive: boolean;
}

export interface AdminPermission {
  id: string;
  name: string;
  resource: 'users' | 'content' | 'analytics' | 'settings' | 'business_profile';
  actions: ('read' | 'write' | 'delete' | 'publish')[];
}

export interface LoginCredentials {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface AuthSession {
  user: AdminUser;
  token: string;
  expiresAt: Date;
}