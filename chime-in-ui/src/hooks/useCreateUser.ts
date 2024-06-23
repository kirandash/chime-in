import { gql, useMutation } from "@apollo/client";
import { User } from "../models/User";

interface CreateUserInput {
  createUserInput: {
    email: string;
    password: string;
  };
}

// gql is a helper function that allows us to write GraphQL queries using a template string.
// ! means that the field is required.
const CREATE_USER = gql`
  mutation CreateUser($createUserInput: CreateUserInput!) {
    createUser(createUserInput: $createUserInput) {
      _id
      email
    }
  }
`;

const useCreateUser = () => {
  // useMutation is a hook that allows us to run a mutation in our component.
  return useMutation<User, CreateUserInput>(CREATE_USER);
};

export { useCreateUser };
