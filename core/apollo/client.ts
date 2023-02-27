import {ApolloClient, ApolloLink, InMemoryCache} from '@apollo/client'
import {RestLink} from "apollo-link-rest";
import {DDRAGON_REST_URL} from "@/utils/config";

const dataDragonLink = new RestLink({ uri: DDRAGON_REST_URL })
const communityDragonLink = new RestLink({ uri: "https://raw.communitydragon.org/" })
const client = new ApolloClient(
  { cache: new InMemoryCache(),
      link: ApolloLink.split(
          operation => operation.getContext().clientName === ApiEndpoint.DATA_DRAGON,
          dataDragonLink,
          communityDragonLink
      )}
)

export enum ApiEndpoint {
    DATA_DRAGON = 'data_dragon',
    COMMUNITY_DRAGON = 'community_dragon'
}

export default client
