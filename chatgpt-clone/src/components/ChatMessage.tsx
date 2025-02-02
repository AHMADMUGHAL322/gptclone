import { Message } from '@/types/chat';
import { Typography, Box } from '@mui/material';
import Image from 'next/image';

interface ChatMessageProps {
  message: Message;
}

export default function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === 'user';

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        width: '100%',
        padding: '12px 0',
      }}
    >
      <Box
        sx={{
          width: '100%',
          maxWidth: '800px',
          display: 'flex',
          justifyContent: isUser ? 'flex-end' : 'flex-start',
          px: 4,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: isUser ? 'row-reverse' : 'row',
            gap: 2,
            maxWidth: '70%',
            alignItems: 'flex-start',
          }}
        >
          {!isUser && (
            <Box
              sx={{
                width: 45,
                height: 45,
                position: 'relative',
                flexShrink: 0,
                overflow: 'hidden',
                mt: 1.5, // Align with message
                backgroundColor: '#ffffff',
                border: '1px solid #202123',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '2px',
              }}
            >
              <Image
              src="/assets/profilepic.jpg"
              alt="Profile"
                fill
                style={{ objectFit: 'cover' }}
              />
            </Box>
          )}
          <Box
            sx={{
              backgroundColor: isUser ? '#1976d2' : 'transparent',
              padding: '12px 16px',
              borderRadius: isUser ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
              maxWidth: '100%',
              wordBreak: 'break-word',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Typography 
              variant="body1" 
              sx={{ 
                whiteSpace: 'pre-wrap',
                lineHeight: 1.7,
                fontSize: '0.95rem',
                color: isUser ? '#ffffff' : '#374151',
              }}
            >
              {message.content}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
