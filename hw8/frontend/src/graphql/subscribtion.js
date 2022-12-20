import { gql } from '@apollo/client';
const MESSAGE_SUBSCRIPTION= gql`
subscription message{
    message(from:"Ben",to:"Mary"){
      sender
      body
    }
    
  }
`
;
export {MESSAGE_SUBSCRIPTION}