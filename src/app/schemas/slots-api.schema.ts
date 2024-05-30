import { z } from 'zod';

export const imageSetSchema = z.object({
  blurhash: z.string().nullable(),
  original: z.string(),
  webp: z.string(),
});

export type ImageSet = z.infer<typeof imageSetSchema>;

// Define the game schema
export const gameSchema = z.object({
  game_id: z.string(),
  name: z.string(),
  provider: z.string(),
  providerName: z.string(),
  hasLargeImage: z.boolean().optional(),
  image: z.string(),
  imageSet: imageSetSchema.optional(),
  url: z.string(),
  order: z.number(),
  tags: z.array(z.string()),
  stats: z.array(z.any()).optional(), // Adjust this according to the actual type of stats
  favoriteCount: z.number(),
  gameId: z.string(),
  image2: z.string(),
  remoteId: z.string().optional(),
  group_name: z.string().optional().nullable(),
  platform: z.string().optional(),
});

export type Game = z.infer<typeof gameSchema>;

// Define the multi-language name schema
export const multiLangNameSchema = z.object({
  ka: z.string(),
  en: z.string(),
  ru: z.string(),
  tr: z.string(),
});

export type MultiLangName = z.infer<typeof multiLangNameSchema>;

// Define the slot schema
export const slotsApiCategorySchema = z.object({
  type: z.string(),
  category: z.string(),
  group: z.string().nullable().optional(),
  platform: z.string().nullable().optional(),
  name: z.string(),
  active: z.boolean().optional(),
  background: z.string().nullable().optional(),
  icon: z.string().nullable().optional(),
  multiLangName: multiLangNameSchema.optional(),
  order: z.number(),
  totalGames: z.number(),
  provider: z.string().optional(),
  games: z.array(gameSchema),
});

export type SlotsApiCategory = z.infer<typeof slotsApiCategorySchema>;

// Define the slots API schema
export const slotsApiCategoryResponseSchema = z.object({
  data: z.array(slotsApiCategorySchema),
});

export type SlotsApiCategoryResponse = z.infer<
  typeof slotsApiCategoryResponseSchema
>;

export const slotsApiProviderSchema = z.object({
  _id: z.string().regex(/^[a-f0-9]{24}$/),
  name: z.string(),
  iframeW: z.number().int(),
  iframeH: z.number().int(),
  vendor: z.string(),
  provider: z.string(),
  type: z.enum(['new', 'slot', 'popular', 'jackpot']),
  order: z.number().int(),
  enabled: z.boolean(),
  logo: z.string(),
  tags: z.array(z.string()),
  games: z.array(gameSchema),
  gamesCount: z.number().int(),
});

export type SlotsApiProvider = z.infer<typeof slotsApiProviderSchema>;

export const slotsApiProvidersResponseSchema = z.object({
  data: z.array(slotsApiProviderSchema),
});

export type SlotsApiProvidersResponse = z.infer<
  typeof slotsApiProvidersResponseSchema
>;

export const slotsApiSlotsResponseSchema = z.object({
  data: slotsApiProviderSchema,
});

export type SlotsApiSlotsResponse = z.infer<typeof slotsApiSlotsResponseSchema>;

export const slotsApiAllSlotsResponseSchema = z.object({
  data: z.array(slotsApiProviderSchema),
});

export type SlotsApiAllSlotsResponse = z.infer<
  typeof slotsApiAllSlotsResponseSchema
>;
