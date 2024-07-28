import { User, UserPayload } from "../../types";

export const CreateUserPayload = ({
  id,
  name,
  phone,
  email,
  thumbnail,
  accountType,
}: User): UserPayload => ({
  id,
  name,
  phone,
  email,
  thumbnail,
  accountType,
});
