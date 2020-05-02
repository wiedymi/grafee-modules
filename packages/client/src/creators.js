import {
  useSubscription,
  useLazyQuery,
  useMutation,
  useQuery,
  useApolloClient
} from "@apollo/react-hooks";

const creator = fn => {
  return query => {
    return (opts = {}) => fn(query, opts);
  };
};

export const createSubscription = creator(useSubscription);
export const createQuery = creator(useQuery);
export const createMutation = creator(useMutation);
export const createLazyQuery = creator(useLazyQuery);

export const getClient = useApolloClient;
