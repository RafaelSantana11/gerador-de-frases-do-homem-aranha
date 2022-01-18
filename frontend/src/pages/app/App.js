import { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import spiderManImg from '../../images/spider-man.png';
import webSound from '../../sounds/web.mp3';
import { Quotes } from '../../components';
import { getQuote } from '../../services';

const audio = new Audio(webSound);

export function App() {
  const isMounted = useRef(true);
  const [quote, setQuote] = useState({
    speaker: 'Loading speaker...',
    quote: 'Loading Quote'
  });

  const onUpdate = async () => {
    const resQuote = await getQuote();

    if (isMounted.current) {
      setQuote(resQuote);
      audio.play();
    }
  };

  useEffect(() => {
    onUpdate();

    return () => {
      isMounted.current = false;
    };
  }, []);

  return (
    <Content>
      <Quotes {...quote} onUpdate={onUpdate} />
      <SpiderManImg alt="Spider man looks" src={spiderManImg} />
    </Content>
  );
}

const Content = styled.div`
  height: 100vh;
  box-sizing: border-box;
  padding: 0 50px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
`;

const SpiderManImg = styled.img`
  max-width: 50vw;
  align-self: flex-start;
`;
