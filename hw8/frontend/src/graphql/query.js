import { gql } from '@apollo/client';
const CHATBOX_QUERY = gql`
    query Chatbox($name1:String!,$name2:String!){
        Chatbox(name1:$name1,name2:$name2){
        messages{
            sender
            body
        }
        }
    }
`
;
export {CHATBOX_QUERY}