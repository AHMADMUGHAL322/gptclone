import { useState, KeyboardEvent } from 'react';
import { Paper, InputBase, IconButton, Box, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';
import { ArrowUpward } from '@mui/icons-material';
import Image from 'next/image';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  disabled?: boolean;
}

export default function ChatInput({ onSendMessage, disabled }: ChatInputProps) {
  const [message, setMessage] = useState('');
  const [model, setModel] = useState('ye-2');

  const handleModelChange = (
    event: React.MouseEvent<HTMLElement>,
    newModel: string,
  ) => {
    if (newModel !== null) {
      setModel(newModel);
    }
  };

  const handleSend = () => {
    if (message.trim()) {
      onSendMessage(message.trim());
      setMessage('');
    }
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      <Box sx={{
        position: 'fixed',
        left: '50%',
        top: '30%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        zIndex: 1,
      }}>
        <Box sx={{
          width: '65px',
          height: '65px',
          overflow: 'hidden',
        }}>
          <Image
            src="/assets/logo.jpg"
            alt="Kanye Logo"
            fill
            style={{ 
              objectFit: 'contain',
            }}
          />
        </Box>
      </Box>

      <Box sx={{ 
        padding: 2, 
        maxWidth: '800px', 
        margin: '0 auto', 
        width: '100%',
        position: 'relative',
      }}>
        <Typography
          variant="body1"
          sx={{
            color: '#000000',
            textAlign: 'center',
            mb: 2,
            fontSize: '0.95rem',
          }}
        >
          Welcome to YeezyGPT, how can I help you?
        </Typography>

        <Paper
          elevation={1}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            border: '1px solid #e0e0e0',
            borderRadius: '32px',
            backgroundColor: '#ffffff',
            boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)',
            padding: '16px 24px',
            width: '100%',
          }}
        >
          <InputBase
            sx={{ 
              flex: 1,
              '& .MuiInputBase-input': {
                fontSize: '0.95rem',
                lineHeight: 2,
                color: '#000000',
                caretColor: '#000000',
              }
            }}
            placeholder="Message Kanye"
            multiline
            maxRows={4}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            disabled={disabled}
          />

          <Box sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            pt: 1.5,
          }}>
            <ToggleButtonGroup
              value={model}
              exclusive
              onChange={handleModelChange}
              aria-label="model selection"
              size="small"
              sx={{
                gap: 1.5,
                '& .MuiToggleButton-root': {
                  border: '1.5px solid #e0e0e0',
                  borderRadius: '24px !important',
                  px: 2,
                  py: 0.5,
                  color: '#666',
                  textTransform: 'none',
                  backgroundColor: '#ffffff',
                  fontSize: '0.8rem',
                  minWidth: '60px',
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    backgroundColor: '#ffffff',
                    borderColor: '#1976d2',
                    color: '#1976d2',
                  },
                  '&.Mui-selected': {
                    backgroundColor: '#ffffff',
                    color: '#1976d2',
                    borderColor: '#1976d2',
                    borderWidth: '1.5px',
                    fontWeight: 500,
                    '&:hover': {
                      backgroundColor: '#ffffff',
                      borderColor: '#1976d2',
                    },
                  },
                },
              }}
            >
              <ToggleButton value="ye-2" aria-label="Ye-2">
                Ye-2
              </ToggleButton>
              <ToggleButton value="ye-1" aria-label="Ye-1">
                Ye-1
              </ToggleButton>
            </ToggleButtonGroup>

            <Box sx={{
              display: 'flex',
              gap: 1,
            }}>
              <IconButton 
                sx={{ 
                  p: 0,
                  backgroundColor: message.trim() ? '#1976d2' : '#e0e0e0',
                  borderRadius: '50%',
                  width: 32,
                  height: 32,
                  minWidth: 32,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  '& .MuiSvgIcon-root': {
                    color: 'white',
                    fontSize: '1.5rem',
                  },
                  '&.Mui-disabled': {
                    backgroundColor: '#e0e0e0',
                    '& .MuiSvgIcon-root': {
                      color: 'white',
                    },
                  },
                }} 
                onClick={handleSend}
                disabled={disabled || !message.trim()}
              >
                <ArrowUpward />
              </IconButton>
            </Box>
          </Box>
        </Paper>
      </Box>
    </>
  );
}
