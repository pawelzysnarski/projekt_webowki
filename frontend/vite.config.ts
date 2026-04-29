import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

export default defineConfig({
    plugins: [react()],
    test: {
        globals: true,
        environment: 'jsdom',
        pool: 'forks',
        transformMode: {
            web: [/\.[jt]sx$/],
        },
        deps: {
            inline: [/vite-test-utils/],
        },
        fileParallelism: false,
        isolate: true,
    },
    server: {
        host: '0.0.0.0',
        port: 5173,
        watch: {
            usePolling: true,
            interval: 1000
        },
        proxy: {
            '/api': {
                target: 'http://backend:3000',
                changeOrigin: true,
                secure: false
            }
        }
    }
})
