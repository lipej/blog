import blog from "https://deno.land/x/blog@0.4.2/blog.tsx";

blog({
  title: "dev blog",
  description: "things from my logs",
  avatar: "./assets/avatar.png",
  avatarClass: "rounded-full",
  author: "lipe",
  links: [
    { title: "Email", url: "mailto:lipej@pm.me" },
    { title: "GitHub", url: "https://github.com/lipej" },
    { title: "Instagram", url: "https://instagram.com/liipejose" },
  ],
});
