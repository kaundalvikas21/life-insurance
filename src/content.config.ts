// src/content.config.ts
import { defineCollection, z } from 'astro:content';
import { file } from 'astro/loaders';

const faqs = defineCollection({
  loader: file('src/content/faqs/index.json'),
  schema: z.object({
    question: z.string(),
    answer:   z.string(),
  }),
});

export const collections = { faqs };
