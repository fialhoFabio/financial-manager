// deno-fmt-ignore-file
// biome-ignore format: generated types do not need formatting
// prettier-ignore
import type { PathsForPages, GetConfigResponse } from 'waku/router';

// prettier-ignore
import type { getConfig as File_AuthIndex_getConfig } from './pages/auth/index';
// prettier-ignore
import type { getConfig as File_AuthOtp_getConfig } from './pages/auth/otp';
// prettier-ignore
import type { getConfig as File_Index_getConfig } from './pages/index';
// prettier-ignore
import type { getConfig as File_OpenFinanceIndex_getConfig } from './pages/open-finance/index';

// prettier-ignore
type Page =
| ({ path: '/auth' } & GetConfigResponse<typeof File_AuthIndex_getConfig>)
| ({ path: '/auth/otp' } & GetConfigResponse<typeof File_AuthOtp_getConfig>)
| ({ path: '/' } & GetConfigResponse<typeof File_Index_getConfig>)
| ({ path: '/open-finance' } & GetConfigResponse<typeof File_OpenFinanceIndex_getConfig>);

// prettier-ignore
declare module 'waku/router' {
  interface RouteConfig {
    paths: PathsForPages<Page>;
  }
  interface CreatePagesConfig {
    pages: Page;
  }
}
