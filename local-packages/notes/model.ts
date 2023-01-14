import { z } from "zod";

const NoteSchema = z.object({
  id: z.string(),
  userId: z.string(),
  title: z.string(),
  body: z.string()
});

// extract the inferred type
export type Note = z.infer<typeof NoteSchema>;

// export interface NoteReader implements EntityReader<Note> {};
// export interface NoteWriter implements EntityWriter<Note> {};
// export interface NoteRepository implements Repository<Note> {};