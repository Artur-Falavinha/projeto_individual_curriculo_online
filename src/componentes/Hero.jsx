import { ArrowRight, MapPin, TerminalSquare } from 'lucide-react';
import { BotaoLink } from './BotaoLink.jsx';

export function Hero({ curriculo }) {
  const tecnologiasPrincipais = curriculo.competencias;

  return (
    <section id="inicio" className="hero">
      <div className="hero__texto">
        <div className="hero__status">
          <p className="hero__localizacao">
            <MapPin aria-hidden="true" size={18} />
            {curriculo.localizacao}
          </p>
          <span>{curriculo.status}</span>
        </div>
        <h1>{curriculo.nome}</h1>
        <p className="hero__titulo">{curriculo.titulo}</p>
        <p className="hero__resumo">{curriculo.apresentacao}</p>

        <div className="hero__acoes">
          <BotaoLink href="#projetos">
            Ver projetos
            <ArrowRight aria-hidden="true" size={18} />
          </BotaoLink>
          <BotaoLink href="#contato" variante="secundario">
            Contato
            <ArrowRight aria-hidden="true" size={18} />
          </BotaoLink>
        </div>
      </div>

      <div className="hero__painel" aria-label="Resumo visual do currículo online">
        <div className="painel-terminal">
          <div className="painel-terminal__barra">
            <TerminalSquare aria-hidden="true" size={22} />
            <span>artur@portfolio:~</span>
          </div>
          <pre>{`$ whoami
Artur Lachoman Falavinha

$ cat formacao.txt
Análise e Desenvolvimento de Sistemas / UFPR

$ cat stack.txt
Full Stack Developer · React · Node.js · SQL · Python · Git · GitHub

$ status
${curriculo.status.toLowerCase()}`}</pre>
        </div>

        <div className="painel-marcadores" aria-label="Tecnologias principais">
          {tecnologiasPrincipais.map((tecnologia, indice) => (
            <span key={tecnologia}>
              <strong>{String(indice + 1).padStart(2, '0')}</strong>
              {tecnologia}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
