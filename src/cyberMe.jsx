import React from 'react';
import { Chat } from '@progress/kendo-react-conversational-ui';
import ElizaBot from 'elizabot';
import './css/all.css';
import RobotPNG from './assets/img/robot.png';
import UserPNG from './assets/img/rubber-duck.png';

class CyberMe extends React.Component {
  constructor(props) {
      super(props);
      // Elizabot initialization
      this.eliza = new ElizaBot();
      
      this.user = {
          id: 1,                     
          name: 'You',               
          avatarUrl: UserPNG
      };
      this.bot = {
        id: 0,
        name: "Cyber Nima",
        avatarUrl: RobotPNG
      };
      this.state = {
        messages: [
          {
            author: this.bot,
            text: this.eliza.getInitial(),
            timestamp: new Date(),
          }
        ]  // Will hold the array of messages between user & bot
      }
  }

  // It retruns to you the count of the number of words in the text
  // Anything with whitespace is considered a word
  getWordCount(text) {
    return text.split(/\s+/).length;
  }

  // This will replace the thinking dots with the robot's reply
  // it gives the user a more natural feeling
  _replaceThinkingDots(textMessage, timeout) {
    setTimeout(() => {
      this.setState((prevState) => {
        let newStateMessages = prevState.messages;
        let robotReply = {
          author: this.bot,
          text: textMessage,
          timestamp: new Date()
        };
        
        newStateMessages[newStateMessages.length - 1] = robotReply;
        //console.log("My state messages: ", newStateMessages);
        return {
          messages: newStateMessages
        }
      });
    }, timeout);
  }

  // We'll insert some thinking dots like a normal chat 
  addElizobotResponse(textMessage) {
    const timeout = 120;
    const thinkingDots = '...';
    let reply = this.eliza.transform(textMessage);
    let wordCount = this.getWordCount(reply);
    this.setState((prevState) => {
      let newMessagesState = [...prevState.messages, {
        author: this.bot,
        text: thinkingDots,
        timestamp: new Date()
      }];
      return {
        messages: newMessagesState
      }
    }, () => this._replaceThinkingDots(reply, timeout * wordCount));
  }

  addNewMessage = (event) => {
    const textMessage = event.message.text;

    this.setState((prevState) => {
      return {
        messages: [...prevState.messages, event.message]
      };
    }, () => this.addElizobotResponse(textMessage));
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