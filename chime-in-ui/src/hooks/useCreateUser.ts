import { useMutation } from "@apollo/client";
import { graphql } from "../gql";

// gql is a helper function that allows us to write GraphQL queries using a template string.
// ! means that the field is required.
const CREATE_USER = graphql(`
  mutation CreateUser($createUserInput: CreateUserInput!) {
    createUser(createUserInput: $createUserInput) {
      _id
      email
    }
  }
`);

const useCreateUser = () => {
  // useMutation is a hook that allows us to run a mutation in our component.
  return useMutation(CREATE_USER);
};

export { useCreateUser };
