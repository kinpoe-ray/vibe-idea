import ideaEngine from './ideaEngine.js';

// DOM elements
const rootElement = document.getElementById('root');
const messagesContainer = document.createElement('div');
messagesContainer.className = 'messages-container';

const inputArea = document.createElement('div');
inputArea.className = 'input-area';

const textarea = document.createElement('textarea');
textarea.placeholder = '分享你的兴趣或问题...';

const sendButton = document.createElement('button');
sendButton.className = 'send-button';
sendButton.innerHTML = '➤';
sendButton.type = 'button';

// State
let messages = [
  { 
    id: 1, 
    text: "你好！我是你的创意伙伴，今天想探索什么有趣的想法？", 
    isUser: false, 
    mood: 'happy' 
  }
];

// Render functions
function renderPixelCharacter(mood = 'neutral') {
  const characterDiv = document.createElement('div');
  characterDiv.className = 'pixel-character';
  
  // Create pixel art elements
  const head = document.createElement('div');
  head.className = 'pixel-head';
  
  const leftEye = document.createElement('div');
  leftEye.className = 'pixel-eye left';
  
  const rightEye = document.createElement('div');
  rightEye.className = 'pixel-eye right';
  
  const mouth = document.createElement('div');
  mouth.className = 'pixel-mouth';
  
  const body = document.createElement('div');
  body.className = 'pixel-body';
  
  const leftArm = document.createElement('div');
  leftArm.className = 'pixel-arm left';
  
  const rightArm = document.createElement('div');
  rightArm.className = 'pixel-arm right';
  
  characterDiv.appendChild(head);
  characterDiv.appendChild(leftEye);
  characterDiv.appendChild(rightEye);
  characterDiv.appendChild(mouth);
  characterDiv.appendChild(body);
  characterDiv.appendChild(leftArm);
  characterDiv.appendChild(rightArm);
  
  return characterDiv;
}

function renderMessage(message) {
  const messageElement = document.createElement('div');
  messageElement.className = `message ${message.isUser ? 'user' : 'system'}`;
  
  const avatar = document.createElement('div');
  avatar.className = `avatar ${message.isUser ? 'user' : 'system'}`;
  avatar.textContent = message.isUser ? 'YOU' : 'VI';
  
  const bubble = document.createElement('div');
  bubble.className = 'message-bubble';
  
  // Process message text - split by newlines and create paragraphs
  const textParts = message.text.split('\n');
  textParts.forEach(part => {
    if (part.trim() !== '') {
      const p = document.createElement('p');
      p.textContent = part;
      bubble.appendChild(p);
    }
  });
  
  messageElement.appendChild(avatar);
  messageElement.appendChild(bubble);
  
  return messageElement;
}

function renderTypingIndicator() {
  const typingElement = document.createElement('div');
  typingElement.className = 'message system';
  
  const avatar = document.createElement('div');
  avatar.className = 'avatar system';
  avatar.textContent = 'VI';
  
  const indicator = document.createElement('div');
  indicator.className = 'typing-indicator';
  indicator.innerHTML = '<span>思考中</span><span>.</span><span>.</span><span>.</span>';
  
  typingElement.appendChild(avatar);
  typingElement.appendChild(indicator);
  
  return typingElement;
}

function scrollToBottom() {
  messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function renderApp() {
  // Clear the root
  rootElement.innerHTML = '';
  
  // Create header
  const header = document.createElement('div');
  header.className = 'header';
  header.innerHTML = `
    <h1>Vibe Idea</h1>
    <p>你的AI创意伙伴</p>
  `;
  header.appendChild(renderPixelCharacter());
  
  // Create messages container
  messagesContainer.innerHTML = '';
  messages.forEach(msg => {
    messagesContainer.appendChild(renderMessage(msg));
  });
  
  // Add typing indicator if needed
  if (window.isTyping) {
    messagesContainer.appendChild(renderTypingIndicator());
  }
  
  // Create input area
  inputArea.innerHTML = '';
  inputArea.appendChild(textarea);
  inputArea.appendChild(sendButton);
  
  // Assemble the app
  const appContainer = document.createElement('div');
  appContainer.className = 'app-container';
  appContainer.appendChild(header);
  appContainer.appendChild(messagesContainer);
  appContainer.appendChild(inputArea);
  
  rootElement.appendChild(appContainer);
  
  // Scroll to bottom
  scrollToBottom();
}

// Event handlers
function handleSend() {
  const input = textarea.value.trim();
  if (!input) return;
  
  // Add user message
  const userMessage = {
    id: Date.now(),
    text: input,
    isUser: true,
    mood: 'neutral'
  };
  
  messages.push(userMessage);
  textarea.value = '';
  
  // Show typing indicator
  window.isTyping = true;
  renderApp();
  
  // Simulate AI response
  setTimeout(() => {
    window.isTyping = false;
    
    // Generate response using the idea engine
    const response = ideaEngine.generateResponse(input);
    
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
    
    // Add system response
    const systemMessage = {
      id: Date.now() + 1,
      text: formattedResponse,
      isUser: false,
      mood: response.mood
    };
    
    messages.push(systemMessage);
    renderApp();
  }, 1500);
}

function handleTextareaInput() {
  // Auto-resize textarea
  textarea.style.height = 'auto';
  textarea.style.height = Math.min(textarea.scrollHeight, 150) + 'px';
}

// Initialize the app
function initApp() {
  renderApp();
  
  // Event listeners
  sendButton.addEventListener('click', handleSend);
  textarea.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  });
  textarea.addEventListener('input', handleTextareaInput);
}

// Start the app when DOM is loaded
document.addEventListener('DOMContentLoaded', initApp);

// Also start if DOM is already loaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}