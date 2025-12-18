/**
 * Mock agent service that simulates AI agent responses
 * Returns mock responses based on user input patterns
 */

export async function generateAgentResponse(userMessage: string): Promise<string> {
  // Simulate network delay (200-500ms)
  const delay = Math.random() * 300 + 200;
  await new Promise(resolve => setTimeout(resolve, delay));

  const lowerMessage = userMessage.toLowerCase().trim();

  // Pattern matching for different query types
  if (lowerMessage.includes('invoice') && (lowerMessage.includes('complete') || lowerMessage.includes('arrange') || lowerMessage.includes('organize'))) {
    return "I'll help you organize the completed invoices. Let me gather the relevant documents and arrange them for you.";
  }

  if (lowerMessage.includes('contract') && (lowerMessage.includes('rename') || lowerMessage.includes('rename'))) {
    return "I can help you rename completed contracts. Which contracts would you like to rename?";
  }

  if (lowerMessage.includes('what can you do') || lowerMessage.includes('what do you do') || lowerMessage.includes('help')) {
    return "I can help you with various tasks like organizing documents, managing invoices, renaming contracts, and answering questions about your workspace. What would you like to do?";
  }

  if (lowerMessage.includes('organize') || lowerMessage.includes('arrange')) {
    return "I'll help you organize your documents. Let me check what needs to be organized and get started.";
  }

  // Default response
  return "I understand. Let me help you with that. Could you provide a bit more detail about what you'd like me to do?";
}

/**
 * Streams an agent response character by character to simulate real-time streaming
 * @param fullResponse The complete response text to stream
 * @param onChunk Callback called with each chunk of text
 * @param chunkDelay Delay between chunks in milliseconds (default: 5ms)
 */
export async function streamAgentResponse(
  fullResponse: string,
  onChunk: (chunk: string, isComplete: boolean) => void,
  chunkDelay: number = 5
): Promise<void> {
  // Simulate initial network delay (50-150ms)
  const initialDelay = Math.random() * 100 + 50;
  await new Promise(resolve => setTimeout(resolve, initialDelay));

  let currentIndex = 0;
  
  const streamNext = () => {
    if (currentIndex < fullResponse.length) {
      // Stream 2-5 characters at a time for faster, more natural feel
      const chunkSize = Math.random() < 0.5 ? 2 : Math.random() < 0.7 ? 3 : Math.random() < 0.9 ? 4 : 5;
      const endIndex = Math.min(currentIndex + chunkSize, fullResponse.length);
      const chunk = fullResponse.slice(currentIndex, endIndex);
      
      currentIndex = endIndex;
      onChunk(chunk, currentIndex >= fullResponse.length);
      
      if (currentIndex < fullResponse.length) {
        setTimeout(streamNext, chunkDelay);
      }
    }
  };

  streamNext();
}

