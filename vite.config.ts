
import path from "path";
import { defineConfig } from "vite";
import type { PluginOption, LibraryOptions } from "vite"
import react from '@vitejs/plugin-react'

const isExternal = (id: string) => !id.startsWith(".") && !path.isAbsolute(id);

type GetBaseConfig = {
    plugins?: PluginOption[]
    lib: LibraryOptions | false
}

export const getBaseConfig = ({ plugins = [], lib = false }: GetBaseConfig) =>
    defineConfig({
        plugins: [react({ jsxRuntime: "classic" }), ...plugins],
        optimizeDeps: { esbuildOptions: { jsx: "automatic" } },
        build: {
            lib,
            rollupOptions: {
                external: isExternal,
                output: {
                    globals: {
                        react: "React",
                    },
                },
            },
        },
    });