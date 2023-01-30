import type { Entity, EntityList, EntityReader, EntityWriter } from "core";
import { entityId } from "core";
import { z } from "zod";

const NoteSchema = z.object({
  id: z.string(),
  userId: z.string(),
  title: z.string(),
  body: z.string()
});

export type Note = z.infer<typeof NoteSchema>;  // extract the inferred type

export async function readNote(reader: EntityReader<Note>, id: Entity["id"]): Promise<Note> {
  return await reader.read(id);
}
export async function createNote(writer: EntityWriter<Note>, note: Note): Promise<Note> {
    note.id = entityId();
    return await writer.create(note);
}

export async function deleteNote(writer: EntityWriter<Note>, id: Note["id"]): Promise<Note> {
  return await writer.delete(id);
}

export async function listNotes(reader: EntityList<Note>, userId: string): Promise<Note[]> {
  return await reader.list({ userId });
}