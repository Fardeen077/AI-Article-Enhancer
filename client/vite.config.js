import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
<<<<<<< HEAD
import tailwindcss from '@tailwindcss/vite'
=======
>>>>>>> e7d242a5046fea1bac6e50989c6b1a9474cadb60

// https://vite.dev/config/
export default defineConfig({
  plugins: [
<<<<<<< HEAD
    tailwindcss(),
=======
>>>>>>> e7d242a5046fea1bac6e50989c6b1a9474cadb60
    react({
      babel: {
        plugins: [['babel-plugin-react-compiler']],
      },
    }),
  ],
})
