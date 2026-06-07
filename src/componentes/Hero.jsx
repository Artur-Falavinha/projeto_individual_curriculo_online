import { ArrowRight, Download, MapPin } from 'lucide-react';
import { BotaoLink } from './BotaoLink.jsx';

export function Hero({ curriculo }) {
  return (
    <section id="inicio" className="hero">
      <div className="hero__texto">
        <p className="hero__localizacao">
          <MapPin aria-hidden="true" size={18} />
          {curriculo.localizacao}
        </p>
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
            <Download aria-hidden="true" size={18} />
          </BotaoLink>
        </div>
      </div>

      <div className="hero__imagem" aria-label="Mesa de trabalho com codigo em monitores">
        <img
          src="https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=1200&q=85"
          alt="Ambiente de desenvolvimento com editor de codigo aberto"
        />
      </div>
    </section>
  );
}
