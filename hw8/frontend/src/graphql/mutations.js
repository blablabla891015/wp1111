import { gql } from '@apollo/client';
const CREATE_CHATBOX_MUTATION = gql`
    mutation createChatbox($name1:String!,$name2:String!){
        createChatbox(name1:$name1,name2:$name2){
        name
        messages {
            sender
            body
            }
        
        }
    }
`
;
const MESSAGE_MUTATION=gql`
mutation createMessage($from:String!,$to:String!,$body:String!){
    createMessage(name:$from,to:$to,body:$body){
      sender
      body
    }
  }
`
export {CREATE_CHATBOX_MUTATION,MESSAGE_MUTATION}