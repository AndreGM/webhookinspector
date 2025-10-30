import { z } from "zod";

export const webhookListItemSchema = z.object({
	id: z.string().uuid(),
	method: z.string(),
	pathname: z.string(),
	createdAt: z.coerce.date(),
});

export const webhookListSchema = z.object({
	webhooks: z.array(webhookListItemSchema),
	nextCursor: z.string().nullable(),
});

export const webhookDetailSchema = z.object({
	id: z.string().uuid(),
	method: z.string(),
	pathname: z.string(),
	ip: z.string(),
	statusCode: z.number(),
	contentType: z.string().nullable(),
	contentLength: z.number().nullable(),
	queryParams: z.record(z.string(), z.string()).nullable(),
	body: z.string().nullable(),
	headers: z.record(z.string(), z.string()),
	createdAt: z.coerce.date(),
});
