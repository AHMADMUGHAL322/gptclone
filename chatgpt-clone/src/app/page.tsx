'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Box, Container, Typography, CircularProgress, IconButton } from '@mui/material';
import { Twitter } from '@mui/icons-material';
import ChatMessage from '@/components/ChatMessage';
import ChatInput from '@/components/ChatInput';
import { Message } from '@/types/chat';
import { v4 as uuidv4 } from 'uuid';
import { generateResponse } from '@/services/openai';

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (content: string) => {
    const chatId = uuidv4();
    router.push(`/chat/${chatId}?message=${encodeURIComponent(content)}`);
  };

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
      {/* Vertical Navbar */}
      <Box sx={{
        width: '60px',
        borderRight: '1px solid #e0e0e0',
        backgroundColor: '#202123',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '20px 0',
        gap: 2,
        zIndex: 2,
      }}>
        {/* Profile Icon */}
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
          onClick={() => window.location.href = '/'}
        />
        {/* Twitter Icon */}
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

      {/* Main Content */}
      <Box sx={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
      }}>
        {messages.length === 0 ? (
          // Centered content for empty state
          <Box sx={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 4
          }}>
            <ChatInput onSendMessage={handleSendMessage} disabled={isLoading} />
          </Box>
        ) : (
          // Regular chat layout when messages exist
          <>
            <Box sx={{
              borderBottom: '1px solid #e0e0e0',
              padding: '16px 0',
              textAlign: 'center',
              backgroundColor: '#ffffff',
              position: 'sticky',
              top: 0,
              zIndex: 1,
            }}>
              <Typography variant="h6" sx={{ color: '#666', fontWeight: 500 }}>
                New chat
              </Typography>
            </Box>
            <Box sx={{ 
              flex: 1, 
              overflowY: 'auto',
              display: 'flex',
              flexDirection: 'column',
              gap: 2
            }}>
              {messages.map((message) => (
                <ChatMessage key={message.id} message={message} />
              ))}
              {isLoading && (
                <Box sx={{ display: 'flex', justifyContent: 'center', p: 2 }}>
                  <CircularProgress size={24} />
                </Box>
              )}
              <div ref={messagesEndRef} />
            </Box>
            <Box sx={{ 
              borderTop: '1px solid #e0e0e0',
              backgroundColor: '#ffffff',
              padding: 2
            }}>
              <ChatInput onSendMessage={handleSendMessage} disabled={isLoading} />
            </Box>
          </>
        )}
      </Box>
    </Box>
  );
}
