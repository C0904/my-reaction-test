'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import ReactionTest from './ReactionTest';
import Logo from './Logo';
import { io, Socket } from 'socket.io-client';
import Footer from './Footer';

export default function ReactionTestPage() {
  const [showTest, setShowTest] = useState<boolean>(false);
  const reactionTestRef = useRef<{ startTest: () => void } | null>(null);
  const [globalBestTime, setGlobalBestTime] = useState<number | null>(null);
  const [globalBestName, setGlobalBestName] = useState<string | null>(null);
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [socket, setSocket] = useState<Socket | null>(null);

  const connectSocket = useCallback(() => {
    const newSocket = io(process.env.NEXT_PUBLIC_SERVER_DOMAIN, {
      path: '/ws',
      transports: ['websocket'],
      upgrade: false,
    });

    newSocket.on('connect', () => {
      setIsConnected(true);
      console.log('WebSocket Connected');
    });

    newSocket.on('globalBest', (data) => {
      console.log('Global Best:', data);
      if (
        data &&
        typeof data.time === 'number' &&
        typeof data.name === 'string'
      ) {
        setGlobalBestTime(data.time);
        setGlobalBestName(data.name);
      }
    });

    newSocket.on('disconnect', () => {
      setIsConnected(false);
      console.log('WebSocket Disconnected');
    });

    setSocket(newSocket);

    return newSocket;
  }, []);

  useEffect(() => {
    const newSocket = connectSocket();

    return () => {
      if (newSocket) newSocket.disconnect();
    };
  }, [connectSocket]);

  const handleUpdateGlobalBest = useCallback(
    (time: number, name: string) => {
      if (socket && socket.connected) {
        console.log('Emitting updateGlobalBest:', { time, name });
        socket.emit('updateGlobalBest', { time, name });
      } else {
        console.log('Socket not connected. Reconnecting...');
        const newSocket = connectSocket();
        newSocket.once('connect', () => {
          console.log('Reconnected. Emitting updateGlobalBest:', {
            time,
            name,
          });
          newSocket.emit('updateGlobalBest', { time, name });
        });
      }
    },
    [socket, connectSocket]
  );

  const handleStart = () => {
    if (showTest && reactionTestRef.current) {
      reactionTestRef.current.startTest();
    } else {
      setShowTest(true);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow container mx-auto p-4">
        <Card className="w-[350px] mx-auto">
          <CardHeader className="flex flex-row items-center space-x-4">
            <Logo className="w-12 h-12 flex-shrink-0" />
            <div>
              <CardTitle className="text-2xl">반응 속도 테스트</CardTitle>
              <CardDescription>
                당신의 반응 속도를 측정해보세요!
              </CardDescription>
            </div>
          </CardHeader>
          <CardFooter className="flex justify-center">
            <Button onClick={handleStart}>시작</Button>
          </CardFooter>
        </Card>
        {showTest && (
          <ReactionTest
            ref={reactionTestRef}
            onUpdateGlobalBest={handleUpdateGlobalBest}
            globalBestTime={globalBestTime}
            globalBestName={globalBestName}
            isConnected={isConnected}
          />
        )}
      </main>
      <Footer />
    </div>
  );
}
