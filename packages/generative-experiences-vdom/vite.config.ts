
import * as path from "path";
import { getBaseConfig } from "../../vite.config";
import dts from 'vite-plugin-dts'
// import react from '@vitejs/plugin-react'

export default getBaseConfig({
    plugins: [dts({
        outDir: ['dist'],
        rollupTypes: true,
    })],
    lib: {
        entry: path.resolve(__dirname, "src/index.ts"),
        name: "@algolia/generative-experiences-vdom",
        fileName: "index",
    },
});