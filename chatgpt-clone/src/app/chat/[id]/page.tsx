'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { Box, Typography, CircularProgress, IconButton } from '@mui/material';
import { Twitter } from '@mui/icons-material';
import ChatMessage from '@/components/ChatMessage';
import ChatPageInput from '@/components/ChatPageInput';
import { Message } from '@/types/chat';
import { v4 as uuidv4 } from 'uuid';
import { generateResponse } from '@/services/openai';
import { useRouter, useSearchParams } from 'next/navigation';

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const initialMessageProcessed = useRef(false);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleSendMessage = useCallback(async (content: string) => {
    // Create and add user message
    const userMessage: Message = {
      id: uuidv4(),
      content,
      role: 'user',
      timestamp: new Date(),
    };
    
    // Update messages state with user message
    setMessages(prevMessages => {
      const newMessages = [...prevMessages, userMessage];
      return newMessages;
    });

    setIsLoading(true);

    try {
      const response = await generateResponse(content);
      
      // Create and add AI message
      const assistantMessage: Message = {
        id: uuidv4(),
        content: response,
        role: 'assistant',
        timestamp: new Date(),
      };

      // Update messages state with AI response
      setMessages(prevMessages => {
        const newMessages = [...prevMessages, assistantMessage];
        return newMessages;
      });
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const scrollToBottom = () => {
    if (messagesEndRef.current && messagesContainerRef.current) {
      setTimeout(() => {
        const container = messagesContainerRef.current;
        const scrollHeight = container?.scrollHeight || 0;
        const extraScroll = 100;
        container?.scrollTo({
          top: scrollHeight + extraScroll,
          behavior: 'smooth'
        });
      }, 300);
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const message = searchParams.get('message');
    if (message && !initialMessageProcessed.current && !isLoading) {
      handleSendMessage(decodeURIComponent(message));
      initialMessageProcessed.current = true;
    }
  }, [searchParams, handleSendMessage, isLoading]);

  return (
    <Box sx={{ 
      height: '100vh',
      width: '100vw',
      display: 'flex',
      backgroundColor: '#ffffff',
      position: 'fixed',
      top: 0,
      left: 0,
    }}>
      <Box sx={{
        width: '60px',
        backgroundColor: '#202123',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '20px 0',
        gap: 2,
        zIndex: 2,
      }}>
        <Box
          component="img"
          src="/assets/profilepic.jpg"
          alt="Profile"
          sx={{
            width: 40,
            height: 40,
            borderRadius: '50%',
            cursor: 'pointer',
            objectFit: 'cover',
          }}
          onClick={() => router.push('/')}
        />
        <IconButton
          sx={{
            color: '#ffffff',
            mt: 2,
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
            },
          }}
          onClick={() => window.open('https://twitter.com', '_blank')}
        >
          <Twitter sx={{ fontSize: '1.5rem' }} />
        </IconButton>
      </Box>

      <Box sx={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        overflow: 'hidden',
        height: '100vh',
      }}>
        <Box sx={{
          padding: '8px 0',
          textAlign: 'center',
          backgroundColor: '#ffffff',
          borderBottom: '1px solid rgba(0,0,0,0.1)',
          position: 'sticky',
          top: 0,
          zIndex: 1,
        }}>
          <Typography sx={{ 
            color: '#666',
            fontSize: '0.875rem',
          }}>
            New chat
          </Typography>
        </Box>

        <Box 
          ref={messagesContainerRef}
          sx={{ 
            flex: 1,
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
            pb: '300px',
            pt: 4,
            '&::-webkit-scrollbar': {
              width: '8px',
            },
            '&::-webkit-scrollbar-track': {
              background: 'transparent',
            },
            '&::-webkit-scrollbar-thumb': {
              background: '#d1d5db',
              borderRadius: '4px',
            },
          }}
        >
          {messages.map((message) => (
            <ChatMessage key={message.id} message={message} />
          ))}
          {isLoading && (
            <Box sx={{ display: 'flex', justifyContent: 'center', p: 2 }}>
              <CircularProgress size={20} sx={{ color: '#666' }} />
            </Box>
          )}
          <div ref={messagesEndRef} style={{ float: 'left', clear: 'both', width: '100%', height: '50px' }} />
        </Box>

        <Box sx={{ 
          position: 'fixed',
          bottom: 0,
          left: '60px',
          right: 0,
          backgroundColor: '#ffffff',
          padding: '20px 0',
        }}>
          <ChatPageInput onSendMessage={handleSendMessage} disabled={isLoading} />
        </Box>
      </Box>
    </Box>
  );
}
