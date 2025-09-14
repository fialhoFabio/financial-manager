# Import Organization Guidelines

This project uses ESLint with custom rules to maintain consistent import organization.

## Import Order Rules

All imports must follow this order:

1. **External libraries** (React, npm packages)
2. **Internal modules** using `@/` alias (components, utils, types)
3. **Relative imports** (same directory files)

### Example:
```tsx
// ✅ Correct order
import { useState } from 'react';
import { useAtom } from 'jotai';

import { sessionAtom } from '@/utils/jotai';
import { TAuthOption } from '@/types/auth.types';

import { Dropdown } from './dropdown';
```

## ESLint Commands

- `npm run lint` - Check for linting issues
- `npm run lint:fix` - Auto-fix issues where possible
- `npm run lint:check` - Check with zero warnings allowed (for CI)

## VS Code Integration

The project includes VS Code settings that will:
- Auto-fix import order on save
- Show ESLint errors in the editor
- Use TypeScript formatter for code formatting

## Key Rules

- **Single quotes** for strings
- **No unused variables** (prefix with `_` if intentionally unused)
- **Organized imports** with proper grouping and alphabetical sorting
- **React hooks** dependency warnings
- **Console statements** warnings (use sparingly)

## Path Alias

Use `@/` for internal imports instead of relative paths:
- ✅ `import { Header } from '@/components/header';`
- ❌ `import { Header } from '../../../components/header';`