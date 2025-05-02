# Changelog - Modifications du dossier shared

## 1. Configuration initiale du package shared

### Création de la structure
```bash
packages/shared/
├── src/
│   ├── types/
│   │   ├── index.ts
│   │   └── user.dtos.ts
│   └── index.ts
├── package.json
└── tsconfig.json
```

### Configuration du package.json
```json
{
  "name": "@gazette/shared",
  "version": "0.0.0",
  "private": true,
  "main": "./dist/index.js",
  "module": "./dist/index.mjs",
  "types": "./dist/index.d.ts",
  "files": [
    "dist/**",
    "src/**"
  ],
  "scripts": {
    "build": "tsup src/index.ts --format cjs,esm --dts --out-dir dist --clean --external @nestjs/common",
    "dev": "tsup src/index.ts --format cjs,esm --dts --out-dir dist --watch --external @nestjs/common",
    "lint": "eslint src/",
    "clean": "rm -rf .turbo && rm -rf node_modules && rm -rf dist"
  },
  "dependencies": {
    "zod": "^3.24.2"
  },
  "devDependencies": {
    "typescript": "^5.0.0",
    "tsup": "^8.0.0",
    "@types/node": "^20.0.0"
  }
}
```

### Configuration du tsconfig.json
```json
{
  "extends": "../../tsconfig.json",
  "compilerOptions": {
    "outDir": "./dist",
    "rootDir": "./src",
    "composite": true,
    "module": "ESNext",
    "moduleResolution": "bundler",
    "allowSyntheticDefaultImports": true,
    "declaration": true
  },
  "include": ["src/**/*"]
}
```

## 2. Définition des types et schémas

### Création de user.dtos.ts
```typescript
import { z } from 'zod';

export interface UserDto {
  pseudo: string;
  email: string;
  password: string;
  createdAt?: Date;
}

export interface SignInDto {
  pseudo: string;
  password: string;
}

export interface LoginDto {
  email: string;
  password: string;
}

export const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export const CreateUserSchema = z
  .object({
    pseudo: z.string().min(3),
    email: z.string().email(),
    password: z.string().min(6),
    confirmPassword: z.string().min(6),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Les mots de passe ne correspondent pas',
    path: ['confirmPassword'],
  });

export type CreateUserDto = z.infer<typeof CreateUserSchema>;
```

### Configuration de l'export dans types/index.ts
```typescript
export * from './user.dtos';
```

### Configuration de l'export principal dans index.ts
```typescript
export * from './types';
```

## 3. Modifications de la configuration TypeScript globale

### tsconfig.json (racine)
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "declaration": true,
    "removeComments": true,
    "emitDecoratorMetadata": true,
    "experimentalDecorators": true,
    "allowSyntheticDefaultImports": true,
    "sourceMap": true,
    "outDir": "./dist",
    "baseUrl": ".",
    "skipLibCheck": true,
    "strictNullChecks": false,
    "noImplicitAny": false,
    "strictBindCallApply": false,
    "forceConsistentCasingInFileNames": false,
    "noFallthroughCasesInSwitch": false,
    "paths": {
      "@gazette/shared": ["packages/shared/src"]
    }
  },
  "include": ["**/*.ts", "**/*.tsx"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
```

## 4. Configuration de Vite pour le frontend

### apps/web/vite.config.ts
```typescript
import { defineConfig } from 'vite';
import viteReact from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import { TanStackRouterVite } from '@tanstack/router-plugin/vite';
import path from 'path';

export default defineConfig({
  plugins: [TanStackRouterVite(), viteReact(), tsconfigPaths()],
  resolve: {
    alias: {
      '@': '/src',
      '@gazette/shared': path.resolve(__dirname, '../../packages/shared/dist'),
    },
  },
});
```

## 5. Corrections des composants frontend

### FormSignUpCC.tsx
```typescript
// Avant
const onSubmit = async (data: {
  pseudo: string;
  email: string;
  password: string;
  confirmPassword: string;
}) => {
  // ...
};

// Après
const onSubmit = async (data: CreateUserDto) => {
  // ...
};
```

### input-group.tsx
```typescript
// Avant
const child = React.Children.only<React.ReactElement<InputElementProps>>(children);

// Après
const child = React.Children.only<React.ReactElement>(children);
```

### explore.lazy.tsx
```typescript
// Avant
const newUser = createUser();
const users = getAllUsers();

// Après
const [users, setUsers] = useState<CreateUserDto[]>([]);

useEffect(() => {
  const fetchUsers = async () => {
    try {
      const usersData = await getAllUsers();
      setUsers(usersData);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  fetchUsers();
}, []);
```

### api.ts
```typescript
// Avant
export async function getAllUsers(): Promise<CreateUserDto> {
  return await api.get('users').json();
}

// Après
export async function getAllUsers(): Promise<CreateUserDto[]> {
  return await api.get('users').json();
}
```

## 6. Commandes de nettoyage et reconstruction

```bash
# Nettoyage
rm -rf node_modules packages/shared/node_modules apps/backend/node_modules apps/web/node_modules
rm -rf packages/shared/dist apps/backend/dist apps/web/dist

# Installation des dépendances
pnpm install

# Construction
pnpm run build
```

## 7. Résumé des changements clés

1. **Structure du package shared**
   - Organisation en modules avec séparation des types
   - Configuration correcte des exports
   - Utilisation de Zod pour la validation

2. **Configuration TypeScript**
   - Harmonisation des paramètres de module et de résolution
   - Configuration correcte des chemins d'import
   - Gestion des types et des déclarations

3. **Configuration de build**
   - Utilisation de tsup pour la construction
   - Gestion des formats CJS et ESM
   - Génération des fichiers de déclaration

4. **Intégration frontend**
   - Configuration de Vite pour la résolution des imports
   - Corrections des types dans les composants
   - Gestion correcte des états et des effets

5. **Nettoyage et maintenance**
   - Scripts de nettoyage et de construction
   - Gestion des dépendances
   - Configuration des caches 