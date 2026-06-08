import { useEffect, useRef } from 'react';

const CONFIG_DESKTOP = {
  quantidade: 118,
  distanciaMaxima: 132,
  raio: 1.55,
  velocidade: 0.34,
};

const CONFIG_MOBILE = {
  quantidade: 54,
  distanciaMaxima: 0,
  raio: 1.25,
  velocidade: 0.22,
};

const CORES = {
  ponto: 'rgba(45, 106, 79, 0.35)',
  linha: '45, 106, 79',
  linhaMouse: '45, 106, 79',
};

function sortearPonto(largura, altura, velocidade) {
  return {
    x: Math.random() * largura,
    y: Math.random() * altura,
    vx: (Math.random() - 0.5) * velocidade,
    vy: (Math.random() - 0.5) * velocidade,
  };
}

function calcularDistancia(pontoA, pontoB) {
  const deltaX = pontoA.x - pontoB.x;
  const deltaY = pontoA.y - pontoB.y;

  return Math.sqrt(deltaX * deltaX + deltaY * deltaY);
}

export function FundoParticulas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const contexto = canvas?.getContext('2d');

    if (!canvas || !contexto) {
      return undefined;
    }

    const consultaMobile = window.matchMedia('(max-width: 768px)');
    const consultaReducaoMovimento = window.matchMedia('(prefers-reduced-motion: reduce)');
    const mouse = { x: null, y: null };
    let largura = window.innerWidth;
    let altura = window.innerHeight;
    let pontos = [];
    let frameId = 0;

    function obterConfig() {
      return consultaMobile.matches ? CONFIG_MOBILE : CONFIG_DESKTOP;
    }

    function redimensionar() {
      const escala = Math.min(window.devicePixelRatio || 1, 2);
      largura = window.innerWidth;
      altura = window.innerHeight;

      canvas.width = Math.floor(largura * escala);
      canvas.height = Math.floor(altura * escala);
      canvas.style.width = `${largura}px`;
      canvas.style.height = `${altura}px`;
      contexto.setTransform(escala, 0, 0, escala, 0, 0);

      const config = obterConfig();
      pontos = Array.from({ length: config.quantidade }, () =>
        sortearPonto(largura, altura, config.velocidade),
      );
    }

    function desenharPontos(config) {
      pontos.forEach((ponto) => {
        if (!consultaReducaoMovimento.matches) {
          ponto.x += ponto.vx;
          ponto.y += ponto.vy;

          if (ponto.x < 0 || ponto.x > largura) ponto.vx *= -1;
          if (ponto.y < 0 || ponto.y > altura) ponto.vy *= -1;
        }

        contexto.beginPath();
        contexto.arc(ponto.x, ponto.y, config.raio, 0, Math.PI * 2);
        contexto.fillStyle = CORES.ponto;
        contexto.fill();
      });
    }

    function desenharConexoes(config) {
      if (config.distanciaMaxima <= 0) {
        return;
      }

      for (let indice = 0; indice < pontos.length; indice += 1) {
        for (let proximoIndice = indice + 1; proximoIndice < pontos.length; proximoIndice += 1) {
          const distancia = calcularDistancia(pontos[indice], pontos[proximoIndice]);

          if (distancia < config.distanciaMaxima) {
            const opacidade = 0.12 * (1 - distancia / config.distanciaMaxima);

            contexto.beginPath();
            contexto.moveTo(pontos[indice].x, pontos[indice].y);
            contexto.lineTo(pontos[proximoIndice].x, pontos[proximoIndice].y);
            contexto.strokeStyle = `rgba(${CORES.linha}, ${opacidade})`;
            contexto.lineWidth = 0.8;
            contexto.stroke();
          }
        }
      }
    }

    function desenharConexoesMouse(config) {
      if (mouse.x === null || config.distanciaMaxima <= 0) {
        return;
      }

      pontos.forEach((ponto) => {
        const distancia = calcularDistancia(ponto, mouse);

        if (distancia < config.distanciaMaxima) {
          const opacidade = 0.42 * (1 - distancia / config.distanciaMaxima);

          contexto.beginPath();
          contexto.moveTo(ponto.x, ponto.y);
          contexto.lineTo(mouse.x, mouse.y);
          contexto.strokeStyle = `rgba(${CORES.linhaMouse}, ${opacidade})`;
          contexto.lineWidth = 0.8;
          contexto.stroke();
        }
      });
    }

    function desenhar() {
      const config = obterConfig();

      contexto.clearRect(0, 0, largura, altura);
      desenharPontos(config);
      desenharConexoes(config);
      desenharConexoesMouse(config);

      if (!consultaReducaoMovimento.matches) {
        frameId = window.requestAnimationFrame(desenhar);
      }
    }

    function reiniciar() {
      window.cancelAnimationFrame(frameId);
      redimensionar();
      desenhar();
    }

    function atualizarMouse(evento) {
      if (consultaMobile.matches) {
        return;
      }

      mouse.x = evento.clientX;
      mouse.y = evento.clientY;
    }

    function limparMouse() {
      mouse.x = null;
      mouse.y = null;
    }

    redimensionar();
    desenhar();

    window.addEventListener('resize', reiniciar);
    document.addEventListener('mousemove', atualizarMouse);
    document.addEventListener('mouseleave', limparMouse);
    consultaMobile.addEventListener('change', reiniciar);
    consultaReducaoMovimento.addEventListener('change', reiniciar);

    return () => {
      window.cancelAnimationFrame(frameId);
      window.removeEventListener('resize', reiniciar);
      document.removeEventListener('mousemove', atualizarMouse);
      document.removeEventListener('mouseleave', limparMouse);
      consultaMobile.removeEventListener('change', reiniciar);
      consultaReducaoMovimento.removeEventListener('change', reiniciar);
    };
  }, []);

  return <canvas className="fundo-particulas" ref={canvasRef} aria-hidden="true" />;
}
