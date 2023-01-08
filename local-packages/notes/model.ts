import cuid from "cuid";
import type { User } from "~/models/user.server";
import { CosmosNoteRepository } from "./cosmos";
import invariant from "tiny-invariant";
import { z } from "zod";

invariant(process.env.COSMOS_NOTES_CONNECTION);
invariant(process.env.COSMOS_NOTES_DATABASE);
invariant(process.env.COSMOS_NOTES_CONTAINER);

const noteRepository = new CosmosNoteRepository(
  process.env.COSMOS_NOTES_CONNECTION,
  process.env.COSMOS_NOTES_DATABASE,
  process.env.COSMOS_NOTES_CONTAINER);

// export type Note = {
//   id: ReturnType<typeof cuid>;
//   userId: User["id"];
//   title: string;
//   body: string;
// };

const NoteSchema = z.object({
  id: z.string(),
  userId: z.string(),
  title: z.string(),
  body: z.string()
});

// extract the inferred type
export type Note = z.infer<typeof NoteSchema>;

type NoteItem = {
  pk: User["id"];
  sk: `note#${Note["id"]}`;
};

export async function getNote({
  id,
  userId,
}: Pick<Note, "id" | "userId">): Promise<Note | null> {
  const result: Note | null = await noteRepository.read(id);
  return result;
}

export async function getNoteListItems({
  userId,
}: Pick<Note, "userId">): Promise<Array<Pick<Note, "id" | "title">>> {
  
  const result: Note | null = await noteRepository.list({ where { userId { equals: userId } } });

  const result = await db.note.query({
    KeyConditionExpression: "pk = :pk",
    ExpressionAttributeValues: { ":pk": userId },
  });

  return result.Items.map((n: any) => ({
    title: n.title,
    id: skToId(n.sk),
  }));
}

export async function createNote({
  body,
  title,
  userId,
}: Pick<Note, "body" | "title" | "userId">): Promise<Note> {
  
  const result = await noteRepository.create({
    id: cuid(),
    userId: userId,
    title: title,
    body: body,
  });
  return result;
}

export async function deleteNote({ id, userId }: Pick<Note, "id" | "userId">) {
  const db = await arc.tables();
  return db.note.delete({ pk: userId, sk: idToSk(id) });
}
