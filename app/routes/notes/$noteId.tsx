import type { ActionFunction, LoaderFunction } from "@remix-run/server-runtime";
import { NoteDetails, CosmosNoteRepository } from "notes";
import invariant from "tiny-invariant";

invariant(process.env.COSMOS_NOTES_CONNECTION);
invariant(process.env.COSMOS_NOTES_DATABASE);
invariant(process.env.COSMOS_NOTES_CONTAINER);

const noteRepository = new CosmosNoteRepository(
  process.env.COSMOS_NOTES_CONNECTION,
  process.env.COSMOS_NOTES_DATABASE,
  process.env.COSMOS_NOTES_CONTAINER
);

export const loader: LoaderFunction = NoteDetails.loader(noteRepository);
export const action: ActionFunction = NoteDetails.action(noteRepository);
export default NoteDetails.NoteDeatilsPage;