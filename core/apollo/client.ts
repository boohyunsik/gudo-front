import { ApolloClient, InMemoryCache } from '@apollo/client'
import {RestLink} from "apollo-link-rest";
import {DDRAGON_REST_URL} from "@/utils/config";

const dataDragonLink = new RestLink({ uri: DDRAGON_REST_URL })
const client = new ApolloClient(
  { cache: new InMemoryCache(), link: dataDragonLink }
)

export default client
