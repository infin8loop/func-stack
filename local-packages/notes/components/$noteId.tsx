import type { ActionFunction, LoaderFunction } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Form, useCatch, useLoaderData } from "@remix-run/react";
import invariant from "tiny-invariant";
import type { Note} from "../models/note";
import { readNote, deleteNote } from "../models/note";
import React from "react";
import type { EntityReader, EntityWriter } from "core";

// TODO: add userId as parameter
export const loader = (reader : EntityReader<Note>): LoaderFunction => {
  return (
    async ({ request, params })  => {
      // const userId = await requireUserId(request);
      invariant(params.noteId, "noteId not found");
    
      // const note = await getNote({ userId, id: params.noteId });
      const note = await readNote(reader, params.noteId);
      if (!note) {
        throw new Response("Not Found", { status: 404 });
      }
      return json<Note>(note);
    }
  );
};

// TODO: add userId as parameter
export const action = (writer : EntityWriter<Note>, redirectUrl: string = "/notes"): ActionFunction => { 
  return (
    async ({ request, params }) => {
      // const userId = await requireUserId(request);  // TODO: include userId (in ID?)
      invariant(params.noteId, "noteId not found");

      await deleteNote(writer, params.noteId);

      return redirect(redirectUrl);
  }
)};

export function NoteDeatilsPage() {
  const note = useLoaderData() as Note;

  return (
    <div>
      <h3 className="text-2xl font-bold">{note.title}</h3>
      <p className="py-6">{note.body}</p>
      <hr className="my-4" />
      <Form method="post">
        <button
          type="submit"
          className="rounded bg-blue-500  py-2 px-4 text-white hover:bg-blue-600 focus:bg-blue-400"
        >
          Delete
        </button>
      </Form>
    </div>
  );
}

export function ErrorBoundary({ error }: { error: Error }) {
  console.error(error);
  
  return <div>An unexpected error occurred: {error.message}</div>;
}

export function CatchBoundary() {
  const caught = useCatch();

  if (caught.status === 404) {
    return <div>Note not found</div>;
  }

  throw new Error(`Unexpected caught response with status: ${caught.status}`);
}
