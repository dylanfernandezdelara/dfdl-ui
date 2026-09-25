import { defineCloudflareConfig } from "@opennextjs/cloudflare"

/* Static docs site: no ISR, so no incremental cache binding. */
export default defineCloudflareConfig({})
