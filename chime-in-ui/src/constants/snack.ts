import { makeVar } from "@apollo/client";
import { Snack } from "../types/snack.type";

export const snackVar = makeVar<Snack | undefined>(undefined);
