import React from "react";
import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Link, NavLink, useLoaderData } from "@remix-run/react";
import type { Note } from "../models/note";
import { listNotes } from "../models/note";
import { requireUserId } from "users";
import type { EntityList } from "core";

type LoaderData = {
  noteListItems: Awaited<ReturnType<typeof listNotes>>;
};

export const loader = (noteReader: EntityList<Note>): LoaderFunction => async ({ request }) => {
  const userId = await requireUserId(request);
  const noteListItems = await listNotes(noteReader, userId);
  return json<LoaderData>({ noteListItems });
};

export function Notes() {
  const data = useLoaderData() as LoaderData;

  return (
    <div className="h-full w-80 border-r bg-gray-50">
      <Link to="new" className="block p-4 text-xl text-blue-500">
        + New Note
      </Link>

      <hr />

      {data.noteListItems.length === 0 ? (
        <p className="p-4">No notes yet</p>
      ) : (
        <ol>
          {data.noteListItems.map((note) => (
            <li key={note.id}>
              <NavLink
                className={({ isActive }) =>
                  `block border-b p-4 text-xl ${isActive ? "bg-white" : ""}`
                }
                to={note.id}
              >
                📝 {note.title}
              </NavLink>
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}
