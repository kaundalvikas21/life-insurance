import { defineCollection, z } from "astro:content";
import { file } from "astro/loaders";

const faqs = defineCollection({
  loader: file("src/content/faqs/index.json"),
  schema: z.object({
    id: z.string(),
    question: z.string(),
    answer: z.string(),
  }),
});

const testimonials = defineCollection({
  loader: file("src/content/testimonials/index.json"),
  schema: z.object({
    id: z.string(),
    name: z.string(),
    location: z.string(),
    rating: z.number(),
    text: z.string(),
    plan_type: z.string(),
    age: z.number(),
  }),
});

const team = defineCollection({
  loader: file("src/content/team/index.json"),
  schema: z.object({
    id: z.string(),
    name: z.string(),
    role: z.string(),
    bio: z.string(),
    states: z.number(),
    years_exp: z.number(),
  }),
});

export const collections = { faqs, testimonials, team };
