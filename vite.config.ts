
import path from "path";
import { defineConfig } from "vite";
import type { PluginOption, LibraryOptions } from "vite"

const isExternal = (id: string) => !id.startsWith(".") && !path.isAbsolute(id);

type GetBaseConfig = {
    plugins?: PluginOption[]
    lib: LibraryOptions | false
}

export const getBaseConfig = ({ plugins = [], lib = false }: GetBaseConfig) =>
    defineConfig({
        plugins: [...plugins],
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