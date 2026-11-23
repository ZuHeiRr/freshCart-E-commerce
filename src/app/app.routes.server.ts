import { RenderMode, ServerRoute } from '@angular/ssr';

// This app relies on browser localStorage for authentication and fetches page
// data from APIs at runtime. Render all routes client-side instead of trying to
// prerender them on Vercel, where user-specific tokens and data are unavailable.
export const serverRoutes: ServerRoute[] = [
  {
    path: '**',
    renderMode: RenderMode.Client,
  },
];
