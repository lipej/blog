import blog from 'https://deno.land/x/blog@0.4.2/blog.tsx';
import { unocss_opts } from './unocss.ts';

blog({
  title: 'dev blog',
  description: 'things from my logs',
  avatar: './assets/avatar.png',
  avatarClass: 'rounded-full',
  author: 'lipe',
  links: [
    { title: 'Email', url: 'mailto:lipej@pm.me' },
    { title: 'GitHub', url: 'https://github.com/lipej' },
    { title: 'Instagram', url: 'https://instagram.com/liipejose' },
  ],
  theme: 'light',
  favicon: 'https://avatars.githubusercontent.com/u/80367187?v=4',
  dateStyle: 'full',
  unocss: unocss_opts,
});

