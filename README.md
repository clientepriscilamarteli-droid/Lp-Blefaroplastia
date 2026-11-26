# MARTELLI CARE CLINIC — Blefaroplastia

Landing page em React, TypeScript e Vite. A página inicial abre diretamente a LP; `/blefaroplastia/` também funciona.

## Desenvolvimento

```sh
npm ci
npm run dev
npm run build
```

Na Vercel: framework Vite, build `npm run build`, saída `dist`, branch de produção `main`.

## Conteúdo

Hero com uma única foto de máscara. Fotografias de avaliação e planejamento fornecidas pelo cliente, preparadas em WebP. A seção de marcação usa um frame estático; não há reprodução de vídeos. CTAs de avaliação usam o WhatsApp da clínica. O link do institucional aponta para o site publicado da empresa.

A identidade visual segue o institucional: Cormorant Garamond, Poppins, preto, marrom e marfim.

Componentes: Media Accordion de Shadcn Space (MIT), referência no 21st.dev; ShimmerButton adaptado do exemplo público do 21st.dev; MoltenMetal utilizado no projeto institucional. Os avisos de atribuição acompanham os componentes.
