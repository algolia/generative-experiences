
import * as path from "path";
import { getBaseConfig } from "../../vite.config";
import dts from 'vite-plugin-dts'

export default getBaseConfig({
    plugins: [dts({
        outDir: ['dist'],
        rollupTypes: true,
    })],
    lib: {
        entry: path.resolve(__dirname, "src/index.ts"),
        name: "@algolia/generative-experiences-api-client",
        fileName: "index",
    },
});