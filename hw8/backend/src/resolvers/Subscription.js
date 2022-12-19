import { makeName } from "./functions";
const Subscription = {
    message: {
    subscribe: (parent, { from, to }, { pubsub }) => {
    const chatBoxName = makeName(from, to);
    return pubsub.subscribe(`Chatbox ${chatBoxName}`);
    },
    },
   };
export default Subscription