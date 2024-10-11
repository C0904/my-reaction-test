'use client';

import React, {
  useState,
  useEffect,
  useCallback,
  forwardRef,
  useImperativeHandle,
  useRef,
} from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Share2 } from 'lucide-react';
import Logo from './Logo';

const ageRanges = {
  '10대': { min: 0, max: 250 },
  '20대': { min: 250, max: 300 },
  '30대': { min: 300, max: 350 },
  '40대': { min: 350, max: 400 },
  '50대': { min: 400, max: 450 },
  '60대 이상': { min: 450, max: Infinity },
};

type TestState = 'waiting' | 'ready' | 'go' | 'early' | 'done';

const getRandomColor = () => {
  const colors = ['#3b82f6', '#ef4444', '#eab308', '#8b5cf6', '#ec4899'];
  return colors[Math.floor(Math.random() * colors.length)];
};

// const redirectDomains = [
//   'https://naver.com',
//   'https://google.com',
//   'https://youtube.com',
// ];

type ReactionTestRef = {
  startTest: () => void;
};

type ReactionTestProps = {
  onUpdateGlobalBest: (time: number, name: string) => void;
  globalBestTime: number | null;
  globalBestName: string | null;
  isConnected: boolean;
};

const ReactionTest = forwardRef<ReactionTestRef, ReactionTestProps>(
  (props, ref) => {
    const { onUpdateGlobalBest, globalBestTime, globalBestName, isConnected } =
      props;
    const [state, setState] = useState<TestState>('waiting');
    const [startTime, setStartTime] = useState<number | null>(null);
    const [endTime, setEndTime] = useState<number | null>(null);
    const [reactionTime, setReactionTime] = useState<number | null>(null);
    const [bestTime, setBestTime] = useState<number>(
      Number(localStorage.getItem('bestTime')) || Infinity
    );
    const [showResult, setShowResult] = useState<boolean>(false);
    const [currentColor, setCurrentColor] = useState<string>('#3b82f6');
    const [isClickable, setIsClickable] = useState<boolean>(true);
    const colorChangeInterval = useRef<NodeJS.Timeout | null>(null);
    const goTimeout = useRef<NodeJS.Timeout | null>(null);

    const clearAllTimers = () => {
      if (colorChangeInterval.current) {
        clearInterval(colorChangeInterval.current);
        colorChangeInterval.current = null;
      }
      if (goTimeout.current) {
        clearTimeout(goTimeout.current);
        goTimeout.current = null;
      }
    };

    const startTest = useCallback(() => {
      if (!isClickable) return;
      clearAllTimers();
      setState('ready');
      setShowResult(false);
      setReactionTime(null);
      setIsClickable(true);
      colorChangeInterval.current = setInterval(() => {
        setCurrentColor(getRandomColor());
      }, 200);
      goTimeout.current = setTimeout(() => {
        if (colorChangeInterval.current) {
          clearInterval(colorChangeInterval.current);
        }
        setState('go');
        setCurrentColor('#22c55e');
        setStartTime(Date.now());
      }, Math.random() * 3000 + 1000);
    }, [isClickable]);

    useImperativeHandle(ref, () => ({
      startTest,
    }));

    const handleClick = () => {
      if (!isClickable) return;

      if (state === 'waiting' || state === 'done' || state === 'early') {
        startTest();
      } else if (state === 'ready') {
        clearAllTimers();
        setState('early');
        setShowResult(true);
        setIsClickable(false);
        setTimeout(() => setIsClickable(true), 1000);

        // 20% 확률로 다른 도메인으로 리다이렉트
        // if (Math.random() < 0.2) {
        //   const randomDomain =
        //     redirectDomains[Math.floor(Math.random() * redirectDomains.length)];
        //   window.open(randomDomain, '_blank');
        // }
      } else if (state === 'go') {
        setEndTime(Date.now());
        setState('done');
        setIsClickable(false);
        setTimeout(() => setIsClickable(true), 1000);
      }
    };

    useEffect(() => {
      if (state === 'done' && startTime && endTime) {
        const time = endTime - startTime;
        setReactionTime(time);
        if (time < bestTime) {
          setBestTime(time);
          localStorage.setItem('bestTime', time.toString());
          if (isConnected && time < (globalBestTime || Infinity)) {
            const name = prompt(
              '축하합니다! 새로운 최고 기록을 세우셨습니다. 이름을 입력해주세요:'
            );
            if (name) {
              onUpdateGlobalBest(time, name);
            }
          }
        }
        setShowResult(true);
      }
    }, [
      state,
      startTime,
      endTime,
      bestTime,
      globalBestTime,
      isConnected,
      onUpdateGlobalBest,
    ]);

    useEffect(() => {
      return () => {
        clearAllTimers();
      };
    }, []);

    const getAgeRange = (time: number): string => {
      for (const [age, range] of Object.entries(ageRanges)) {
        if (time >= range.min && time < range.max) {
          return age;
        }
      }
      return '60대 이상';
    };

    const shareResult = () => {
      if (navigator.share && reactionTime !== null) {
        navigator.share({
          title: '반응 속도 테스트 결과',
          text: `내 반응 속도: ${reactionTime}ms (${getAgeRange(
            reactionTime
          )} 수준)`,
          url: window.location.href,
        });
      } else {
        alert('공유 기능을 지원하지 않는 브라우저입니다.');
      }
    };

    return (
      <Card className="w-[350px] mx-auto mt-4">
        <CardHeader className="flex flex-row items-center space-x-4">
          <Logo className="w-12 h-12 flex-shrink-0" />
          <div>
            <CardTitle className="text-2xl">반응 속도 테스트</CardTitle>
            <CardDescription>
              화면이 초록색으로 변하면 클릭하세요!
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <motion.div
            className={`w-full h-40 flex items-center justify-center cursor-pointer mb-4 rounded-lg`}
            animate={{ backgroundColor: currentColor }}
            onClick={handleClick}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {state === 'waiting' && '클릭하여 시작'}
              {state === 'ready' && '기다리세요...'}
              {state === 'go' && '클릭!'}
              {state === 'early' && '너무 빨랐어요!'}
              {state === 'done' && `${reactionTime}ms`}
            </motion.span>
          </motion.div>
          <AnimatePresence>
            {showResult && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                {state === 'early' ? (
                  <motion.p
                    className="mt-2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    인내심이 부족하시군요. 다시 시도해주세요.
                  </motion.p>
                ) : (
                  reactionTime !== null && (
                    <>
                      <Progress
                        value={(reactionTime / 500) * 100}
                        className="w-full"
                      />
                      <motion.p
                        className="mt-2"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                      >
                        당신의 반응 속도는 {getAgeRange(reactionTime)}{' '}
                        수준입니다!
                      </motion.p>
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.7 }}
                      >
                        당신의 최고 기록: {bestTime}ms
                      </motion.p>
                      {isConnected && globalBestTime && globalBestName && (
                        <motion.p
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.9 }}
                        >
                          전체 최고 기록: {globalBestTime}ms ({globalBestName})
                        </motion.p>
                      )}
                      {!isConnected && (
                        <motion.p
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.9 }}
                          className="text-yellow-500"
                        >
                          현재 서버에 연결되지 않아 전체 최고 기록을 확인할 수
                          없습니다.
                        </motion.p>
                      )}
                    </>
                  )
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button
            variant="outline"
            onClick={startTest}
            disabled={!isClickable || state === 'ready' || state === 'go'}
          >
            다시 시도
          </Button>
          <Button
            onClick={shareResult}
            disabled={state === 'early' || reactionTime === null}
          >
            <Share2 className="mr-2 h-4 w-4" /> 결과 공유
          </Button>
        </CardFooter>
      </Card>
    );
  }
);

ReactionTest.displayName = 'ReactionTest';

export default ReactionTest;
