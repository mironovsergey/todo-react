import { z } from 'zod';

// Field rules follow the API specification, so invalid input is rejected before a request.

const TITLE_MAX_LENGTH = 200;
const DESCRIPTION_MAX_LENGTH = 1000;
const TAG_MAX_LENGTH = 30;

const titleSchema = z
  .string()
  .min(1, 'Title is required')
  .max(TITLE_MAX_LENGTH, `Maximum ${TITLE_MAX_LENGTH} characters`);

const descriptionSchema = z
  .string()
  .max(DESCRIPTION_MAX_LENGTH, `Maximum ${DESCRIPTION_MAX_LENGTH} characters`);

const prioritySchema = z.enum(['low', 'medium', 'high']);

/** Splits a comma-separated tags field into trimmed, non-empty tags. */
const parseTags = (value: string): string[] =>
  value
    .split(',')
    .map((tag) => tag.trim())
    .filter(Boolean);

/** Validates a comma-separated tags field and converts it into an array of tags. */
const tagsFieldSchema = z
  .string()
  .refine(
    (value) => parseTags(value).every((tag) => tag.length <= TAG_MAX_LENGTH),
    `Each tag cannot exceed ${TAG_MAX_LENGTH} characters`,
  )
  .transform(parseTags);

/** The create form renders description, priority and tags only when expanded. */
export const createTodoSchema = z.object({
  title: titleSchema,
  description: descriptionSchema.optional(),
  priority: prioritySchema.optional(),
  tags: tagsFieldSchema.optional(),
});

export const updateTodoSchema = z.object({
  title: titleSchema,
  description: descriptionSchema,
  priority: prioritySchema,
});
