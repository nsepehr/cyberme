import React from 'react';
import { Chat } from '@progress/kendo-react-conversational-ui';


class CyberMe extends React.Component {
  constructor(props) {
      super(props);
      this.user = {
          id: 1,                     
          name: 'You',               
          //avatarUrl: '/profile.png'
      };
      this.bot = {
        id: 0,
        name: "Cyber Nima",
        //avatarUrl: '/profile.png'
      };
      this.state = {
        messages: [
          {
            author: this.bot,
            text: "Hello, I'm Cyber Nima. Tell me what's going on?",
            timestamp: new Date(),
          }
        ]  // Will hold the array of messages between user & bot
      }
  }

  addNewMessage = (event) => {
    this.setState((prevState) => {
      return {
        messages: [...prevState.messages, event.message]
      };
    });
  }

  render() {
      return (
          <div>
              <Chat className="k-widget k-chat" 
                user={this.user}
                messages={this.state.messages}
                onMessageSend={this.addNewMessage}
                width={400}>
              </Chat>
          </div>
      );
  }
}

export default CyberMe;