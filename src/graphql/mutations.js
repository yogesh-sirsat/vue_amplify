/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createPerson = /* GraphQL */ `
  mutation CreatePerson(
    $input: CreatePersonInput!
    $condition: ModelPersonConditionInput
  ) {
    createPerson(input: $input, condition: $condition) {
      id
      firstName
      lastName
      email
      gender
      city
      zip
      profilePicture {
        bucket
        region
        key
      }
      isBoxChecked
    }
  }
`;
export const updatePerson = /* GraphQL */ `
  mutation UpdatePerson(
    $input: UpdatePersonInput!
    $condition: ModelPersonConditionInput
  ) {
    updatePerson(input: $input, condition: $condition) {
      id
      firstName
      lastName
      email
      gender
      city
      zip
      profilePicture {
        bucket
        region
        key
      }
      isBoxChecked
    }
  }
`;
export const deletePerson = /* GraphQL */ `
  mutation DeletePerson(
    $input: DeletePersonInput!
    $condition: ModelPersonConditionInput
  ) {
    deletePerson(input: $input, condition: $condition) {
      id
      firstName
      lastName
      email
      gender
      city
      zip
      profilePicture {
        bucket
        region
        key
        __typename
      }
      isBoxChecked
      createdAt
      updatedAt
      __typename
    }
  }
`;
