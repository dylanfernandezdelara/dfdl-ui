/** Where the site and its registry live. ui.dylanfdl.com replaces this once the zone is on Cloudflare. */
export const SITE_URL = "https://dfdl-ui.fernandezdelaradylan.workers.dev"
export const GITHUB_URL = "https://github.com/dylanfernandezdelara/dfdl-ui"

export const SKILL_COMMAND = "npx skills add dylanfernandezdelara/dfdl-ui --skill dfdl-ui"

export const addCommand = (item: string) => `npx shadcn@latest add ${SITE_URL}/r/${item}.json`
