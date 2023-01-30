// import arc from "@architect/functions";
import bcrypt from "bcryptjs";
import invariant from "tiny-invariant";
import { z } from "zod";
import type { EntityWriter} from "core";
import { entityId } from "core";
import type { Credential, CredentialReader, CredentialWriter, Password } from "./credential";

const UserSchema = z.object({
  id: z.string(),
  email: z.string().email(),
});

// extract the inferred type
export type User = z.infer<typeof UserSchema>;

export interface UserReader {
  readUserById(id: string): User;
  readUserByEmail(email: string): User;
}

export interface UserWriter extends EntityWriter<User> {};

export async function getUserById(userReader: UserReader, id: User["id"]): Promise<User | null> {
  return await userReader.readUserById(id);
}

export async function getUserByEmail(userReader: UserReader, email: User["email"]) {
  return await userReader.readUserByEmail(email);
}

export async function getUserPasswordByEmail(credentialReader: CredentialReader, email: User["email"]): Promise<Credential> {
  return await credentialReader.readByEmail(email);
}

export async function createUser(userReader: UserReader, userWriter: UserWriter, credentialWriter: CredentialWriter,
        email: User["email"],
        password: Password["password"]) {
  const hashedPassword = await bcrypt.hash(password, 10);

  const user: User = {
    id: entityId(),
    email: email
  }

  await credentialWriter.create({
    id: entityId(),
    userId: user.id,
    password: hashedPassword
  })

  await userWriter.create(user);

  const createdUser = await userReader.readUserByEmail(email);
  invariant(createdUser, `User not found after being created. This should not happen`);

  return createdUser;
}

export async function deleteUser(userReader:UserReader, 
  userWriter: UserWriter,  
  credentialReader: CredentialReader, 
  credentialWriter: CredentialWriter, 
  email: User["email"]) {

    const user: User = await userReader.readUserByEmail(email);
    await userWriter.delete(user.id);
    const credential: Credential = await credentialReader.readByUserId(user.id);
    await credentialWriter.delete(credential.id);
}

export async function verifyLogin(userReader: UserReader, 
  credentialReader: CredentialReader,
  email: User["email"],
  password: Password["password"]
) {
  const Credential = await credentialReader.readByEmail(email);

  if (!Credential) {
    return undefined;
  }

  const isValid = await bcrypt.compare(password, Credential.password);
  if (!isValid) {
    return undefined;
  }

  return await userReader.readUserByEmail(email);
}
