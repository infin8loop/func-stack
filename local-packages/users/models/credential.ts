import { z } from "zod";
import type { EntityWriter} from "core";
import { zodEntityIdType } from "core";

const CredentialSchema = z.object({
  id: zodEntityIdType(),
  userId: zodEntityIdType(),
  password: z.string()
});

export type Credential = z.infer<typeof CredentialSchema>;

export interface CredentialReader {
  readByUserId(userId: string): Credential;
  readByEmail(email: string): Credential;
}

export interface CredentialWriter extends EntityWriter<Credential> {};

export type Password = { password: string };