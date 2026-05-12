# Project Architecture

## Folder tree

```
project/
├── components/
│   └── ui/                        ← shadcn, do not modify
│       ├── button.tsx
│       ├── input.tsx
│       ├── card.tsx
│       ├── table.tsx
│       └── ...
│
├── shared/
│   ├── components/                ← reusable organisms with no business logic
│   │   ├── data-table/
│   │   │   ├── index.tsx
│   │   │   ├── data-table.types.ts
│   │   │   └── data-table.test.tsx
│   │   ├── file-uploader/
│   │   │   ├── index.tsx
│   │   │   ├── file-uploader.types.ts
│   │   │   └── file-uploader.test.tsx
│   │   └── confirm-modal/
│   │       ├── index.tsx
│   │       └── confirm-modal.types.ts
│   └── layouts/
│       ├── dashboard-layout.tsx
│       └── auth-layout.tsx
│
└── features/
    ├── auth/
    │   ├── components/
    │   │   ├── login-form.tsx
    │   │   └── oauth-button.tsx
    │   ├── actions/
    │   │   └── auth.actions.ts
    │   ├── schemas/
    │   │   └── auth.schema.ts
    │   ├── types/
    │   │   └── auth.types.ts
    │   ├── hooks/
    │   │   └── use-auth.ts
    │   └── index.ts
    │
    ├── products/
    │   ├── components/
    │   │   ├── product-card.tsx
    │   │   └── product-list.tsx
    │   ├── actions/
    │   │   └── product.actions.ts
    │   ├── schemas/
    │   │   └── product.schema.ts
    │   ├── types/
    │   │   └── product.types.ts
    │   ├── hooks/
    │   │   └── use-product-filter.ts
    │   └── index.ts
    │
    └── dashboard/
        ├── components/
        │   ├── stats-widget.tsx
        │   └── activity-feed.tsx
        ├── actions/
        │   └── dashboard.actions.ts
        ├── schemas/
        │   └── dashboard.schema.ts
        ├── types/
        │   └── dashboard.types.ts
        ├── hooks/
        │   └── use-dashboard-stats.ts
        └── index.ts
```

## Dependency rules

- `features/` imports from `shared/` and `components/ui/`
- `features/` never imports from other `features/`
- `shared/components/` imports from `components/ui/` only
- `components/ui/` is shadcn territory — never edit directly
- If a component inside a feature is needed by another feature, move it up to `shared/components/`

## Naming convention

Always use kebab-case like naming convetion in all files created

| Type      | File                    | Export                                  |
| --------- | ----------------------- | --------------------------------------- |
| Component | `product-card.tsx`      | `export function ProductCard()`         |
| Hook      | `use-product-filter.ts` | `export function useProductFilter()`    |
| Action    | `product.actions.ts`    | `export async function createProduct()` |
| Schema    | `product.schema.ts`     | `export const productSchema`            |
| Types     | `product.types.ts`      | `export type Product`                   |

## Hard rules

- Never import between features directly
- Always use named exports, never default exports
