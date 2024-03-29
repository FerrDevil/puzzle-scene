import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import svgr from "vite-plugin-svgr";
import tsconfigPaths from 'vite-tsconfig-paths'


const config = defineConfig({
  plugins: [react(), svgr(), tsconfigPaths()],
})

export default config