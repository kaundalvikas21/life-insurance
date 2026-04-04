import { defineCollection, z } from "astro:content";
import { file } from "astro/loaders";

const faqs = defineCollection({
  loader: file("src/content/faqs/index.json"),
  schema: z.object({
    id: z.string(),
    question: z.string(),
    answer: z.string(),
    category: z.enum(['Coverage', 'Costs', 'Application', 'Claims']),
  }),
});

const testimonials = defineCollection({
  loader: file("src/content/testimonials/index.json"),
  schema: z.object({
    id: z.string(),
    name: z.string(),
    location: z.string(),
    rating: z.number().int().min(1).max(5),
    text: z.string(),
    plan_type: z.string(),
    age: z.number().int().min(18).max(120),
  }),
});

const team = defineCollection({
  loader: file("src/content/team/index.json"),
  schema: z.object({
    id: z.string(),
    name: z.string(),
    role: z.string(),
    bio: z.string(),
    states: z.number().int().min(1).max(51),
    years_exp: z.number().int().min(0).max(60),
  }),
});

export const collections = { faqs, testimonials, team };
