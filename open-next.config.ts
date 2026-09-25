import { defineCloudflareConfig } from "@opennextjs/cloudflare"
import staticAssetsIncrementalCache from "@opennextjs/cloudflare/overrides/incremental-cache/static-assets-incremental-cache"

/*
  Static docs site with no revalidation. Pages prerendered from generateStaticParams (/components/[slug]) are read
  from the incremental cache, so it needs one; the read-only static-assets cache serves them from Workers assets.
*/
export default defineCloudflareConfig({ incrementalCache: staticAssetsIncrementalCache })
