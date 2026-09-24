import type { Metadata, Viewport } from "next"
import { Geist_Mono, Lora } from "next/font/google"

import { LayoutGridHost } from "@/components/layout-grid/layout-grid"

import "./globals.css"

const lora = Lora({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-lora",
  display: "swap",
})

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
})

export const metadata: Metadata = {
  title: { default: "dfdl ui", template: "%s · dfdl ui" },
  description: "Dylan Fernandez de Lara's design standard: tokens, components, skill and lint policy for agent-built products.",
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
}

/* Runs before paint so the stored theme applies without a flash. */
const themeInitScript = `(function(){try{var t=localStorage.getItem('theme');var d=t==='dark'||(!t&&matchMedia('(prefers-color-scheme: dark)').matches);document.documentElement.classList.add(d?'dark':'light')}catch(e){}})()`

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${lora.variable} ${geistMono.variable} h-full`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        {/* Figma code-to-canvas capture hook. Development only; inert unless the page is opened with #figmacapture=. */}
        {process.env.NODE_ENV !== "production" ? <script src="https://mcp.figma.com/mcp/html-to-design/capture.js" async /> : null}
      </head>
      <body className="flex min-h-full flex-col">
        <LayoutGridHost>{children}</LayoutGridHost>
      </body>
    </html>
  )
}
