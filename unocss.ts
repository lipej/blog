import presetUno from "https://deno.land/x/aleph@1.0.0-alpha.41/lib/@unocss/preset-uno.ts";

export const unocss_opts = {
  presets: [
    presetUno(),
  ],
  preflights: [
    {
      getCSS: () => `
      @import url('https://fonts.googleapis.com/css2?family=Fira+Code:wght@300;400;500;600;700&display=swap');
        html {
            font-family: 'Fira Code', monospace;
        }
        body {
            font-family: 'Fira Code', monospace;
        }
        p {
            font-family: 'Fira Code', monospace;
        }
        h1, h2, h3, h4, h5 {
            font-family: 'Fira Code', monospace;
        }
        
        .light h1, h2, h3, h4, h5 {
            color: rgba(140, 110, 108, 1) !important;
        }

        .markdown-body { 
          text-align: justify 
        }
      `,
    },
  ],
};