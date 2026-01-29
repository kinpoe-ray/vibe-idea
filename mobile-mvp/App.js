import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  Animated,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import ideaEngine from './utils/ideaEngine';

const { width, height } = Dimensions.get('window');

// Pixel Art Character Component
const IdeaBuddy = ({ mood = 'neutral', size = 80 }) => {
  const pixelSize = size / 4;
  
  // Simple pixel art representation using View components
  return (
    <View style={[styles.pixelCharacter, { width: size, height: size }]}>
      {/* Head */}
      <View style={[
        styles.pixelBlock, 
        styles.head, 
        { width: pixelSize * 2, height: pixelSize * 2, top: 0, left: pixelSize }
      ]} />
      
      {/* Eyes - change based on mood */}
      <View style={[
        styles.pixelBlock, 
        mood === 'excited' ? styles.eyeExcited : styles.eyeNormal,
        { width: pixelSize * 0.5, height: pixelSize * 0.5, top: pixelSize, left: pixelSize * 1.2 }
      ]} />
      <View style={[
        styles.pixelBlock, 
        mood === 'excited' ? styles.eyeExcited : styles.eyeNormal,
        { width: pixelSize * 0.5, height: pixelSize * 0.5, top: pixelSize - pixelSize * 1.5, left: pixelSize * 2.3 }
      ]} />
      
      {/* Mouth - changes based on mood */}
      <View style={[
        styles.pixelBlock,
        mood === 'happy' ? styles.mouthHappy : 
        mood === 'excited' ? styles.mouthExcited : 
        styles.mouthNeutral,
        { width: pixelSize * 0.8, height: pixelSize * 0.3, top: pixelSize * 1.5, left: pixelSize * 1.6 }
      ]} />
      
      {/* Body */}
      <View style={[
        styles.pixelBlock, 
        styles.body,
        { width: pixelSize * 2, height: pixelSize * 1.5, top: pixelSize * 2, left: pixelSize }
      ]} />
      
      {/* Arms - animate based on mood */}
      <Animated.View style={[
        styles.pixelBlock,
        styles.arm,
        { 
          width: pixelSize * 0.5, 
          height: pixelSize,
          top: pixelSize * 2.2,
          left: mood === 'excited' ? pixelSize * 0.2 : pixelSize * 0.3,
          transform: mood === 'excited' ? [{ rotate: '20deg' }] : [{ rotate: '5deg' }]
        }
      ]} />
      <Animated.View style={[
        styles.pixelBlock,
        styles.arm,
        { 
          width: pixelSize * 0.5, 
          height: pixelSize,
          top: pixelSize * 1.7,
          left: mood === 'excited' ? pixelSize * 3.3 : pixelSize * 3.2,
          transform: mood === 'excited' ? [{ rotate: '-20deg' }] : [{ rotate: '-5deg' }]
        }
      ]} />
    </View>
  );
};

// Message Bubble Component
const MessageBubble = ({ text, isUser, mood = 'neutral' }) => (
  <View style={[styles.messageContainer, isUser ? styles.userMessage : styles.systemMessage]}>
    {!isUser && <IdeaBuddy mood={mood} size={40} />}
    <View style={[styles.bubble, isUser ? styles.userBubble : styles.systemBubble]}>
      <Text style={[styles.bubbleText, isUser ? styles.userBubbleText : styles.systemBubbleText]}>
        {text}
      </Text>
    </View>
    {isUser && <IdeaBuddy mood={mood} size={40} />}
  </View>
);

// Main App Component
export default function App() {
  const [messages, setMessages] = useState([
    { id: 1, text: "你好！我是你的创意伙伴，今天想探索什么有趣的想法？", isUser: false, mood: 'happy' }
  ]);
  const [inputText, setInputText] = useState('');
  const [currentMood, setCurrentMood] = useState('neutral');
  const [isTyping, setIsTyping] = useState(false);

  // Simulate typing indicator and response
  useEffect(() => {
    if (isTyping) {
      const timer = setTimeout(() => {
        handleResponse(inputText);
        setIsTyping(false);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [isTyping]);

  // Handle user input changes and provide real-time feedback
  const handleInputChange = (text) => {
    setInputText(text);
    
    // Real-time mood detection based on input
    if (text.length > 10) {
      if (text.toLowerCase().includes('creative') || text.toLowerCase().includes('idea')) {
        setCurrentMood('excited');
      } else if (text.toLowerCase().includes('help') || text.toLowerCase().includes('want')) {
        setCurrentMood('thinking');
      } else {
        setCurrentMood('listening');
      }
    } else {
      setCurrentMood('neutral');
    }
  };

  // Generate AI response using the idea engine
  const handleResponse = (userInput) => {
    // Use the idea engine to generate a proper response
    const response = ideaEngine.generateResponse(userInput);
    
    // Format the response message
    let formattedResponse = response.responseText + "\n\n";
    
    // Add generated ideas
    if (response.ideas.length > 0) {
      formattedResponse += "💡 我为你想到了这些想法:\n";
      response.ideas.forEach((idea, index) => {
        formattedResponse += `${index + 1}. ${idea.text}\n`;
      });
      formattedResponse += "\n";
    }
    
    // Add follow-up questions
    if (response.followupQuestions.length > 0) {
      formattedResponse += "❓ 为了更好地帮助你，我想了解更多:\n";
      response.followupQuestions.forEach((question, index) => {
        formattedResponse += `• ${question}\n`;
      });
    }
    
    setMessages(prev => [
      ...prev,
      { id: Date.now(), text: userInput, isUser: true, mood: "neutral" },
      { id: Date.now() + 1, text: formattedResponse, isUser: false, mood: response.mood }
    ]);
  };

  const handleSendMessage = () => {
    if (inputText.trim()) {
      setIsTyping(true);
      // Clear input immediately to show responsive UI
      setInputText('');
      setCurrentMood('neutral');
    }
  };

  return (
    <View style={styles.container}>
      {/* Header with animated character */}
      <View style={styles.header}>
        <Animated.View style={[
          styles.animatedHeader,
          { transform: [{ translateY: new Animated.Value(0) }] }
        ]}>
          <IdeaBuddy mood={currentMood} size={60} />
          <Text style={styles.headerText}>Vibe Idea</Text>
        </Animated.View>
      </View>

      {/* Messages Container */}
      <ScrollView 
        style={styles.messagesContainer}
        ref={ref => this.scrollView = ref}
        onContentSizeChange={() => this.scrollView.scrollToEnd({ animated: true })}
      >
        {messages.map((msg) => (
          <MessageBubble 
            key={msg.id} 
            text={msg.text} 
            isUser={msg.isUser} 
            mood={msg.mood} 
          />
        ))}
        
        {isTyping && (
          <View style={styles.typingIndicator}>
            <IdeaBuddy mood="thinking" size={30} />
            <Text style={styles.typingText}>正在思考想法...</Text>
          </View>
        )}
      </ScrollView>

      {/* Input Area */}
      <View style={styles.inputContainer}>
        <TextInput
          style={[styles.input, { borderColor: currentMood === 'excited' ? '#4CAF50' : '#ddd' }]}
          placeholder="分享你的兴趣或问题..."
          value={inputText}
          onChangeText={handleInputChange}
          multiline
          maxLength={200}
        />
        <TouchableOpacity 
          style={[styles.sendButton, !inputText.trim() && styles.sendButtonDisabled]} 
          onPress={handleSendMessage}
          disabled={!inputText.trim()}
        >
          <Text style={styles.sendButtonText}>发送</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#fff',
    padding: 15,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  animatedHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 10,
    color: '#333',
  },
  messagesContainer: {
    flex: 1,
    padding: 10,
  },
  messageContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginVertical: 5,
  },
  userMessage: {
    justifyContent: 'flex-end',
  },
  systemMessage: {
    justifyContent: 'flex-start',
  },
  bubble: {
    maxWidth: '75%',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 20,
  },
  userBubble: {
    backgroundColor: '#007AFF',
    borderBottomRightRadius: 5,
  },
  systemBubble: {
    backgroundColor: '#fff',
    border: 1,
    borderColor: '#eee',
    borderBottomLeftRadius: 5,
  },
  bubbleText: {
    fontSize: 16,
  },
  userBubbleText: {
    color: '#fff',
  },
  systemBubbleText: {
    color: '#333',
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#eee',
    alignItems: 'flex-end',
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginRight: 10,
    maxHeight: 100,
    fontSize: 16,
  },
  sendButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 20,
  },
  sendButtonDisabled: {
    backgroundColor: '#ccc',
  },
  sendButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  typingIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  typingText: {
    marginLeft: 10,
    color: '#888',
  },
  
  // Pixel Art Styles
  pixelCharacter: {
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  pixelBlock: {
    position: 'absolute',
  },
  head: {
    backgroundColor: '#FFD700', // Yellow skin tone
    borderRadius: 5,
  },
  body: {
    backgroundColor: '#4CAF50', // Green shirt
  },
  arm: {
    backgroundColor: '#FFD700',
  },
  eyeNormal: {
    backgroundColor: '#000',
    borderRadius: 2,
  },
  eyeExcited: {
    backgroundColor: '#000',
    transform: [{ scaleY: 0.3 }],
  },
  mouthNeutral: {
    backgroundColor: '#000',
    borderRadius: 2,
  },
  mouthHappy: {
    backgroundColor: '#000',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  mouthExcited: {
    backgroundColor: '#FF0000',
    borderRadius: 5,
  },
});