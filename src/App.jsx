import { Cabecalho } from './componentes/Cabecalho.jsx';
import { Contato } from './componentes/Contato.jsx';
import { FormacaoExperiencia } from './componentes/FormacaoExperiencia.jsx';
import { Hero } from './componentes/Hero.jsx';
import { PerfilCompetencias } from './componentes/PerfilCompetencias.jsx';
import { Projetos } from './componentes/Projetos.jsx';
import { Secao } from './componentes/Secao.jsx';
import { curriculo } from './dados/curriculo.js';

export function App() {
  return (
    <>
      <Cabecalho nome={curriculo.nome} />
      <main>
        <Hero curriculo={curriculo} />

        <Secao id="perfil" titulo="Sobre mim">
          <PerfilCompetencias
            resumo={curriculo.resumo}
            competencias={curriculo.competencias}
            idiomas={curriculo.idiomas}
          />
        </Secao>

        <Secao id="projetos" titulo="Projetos">
          <Projetos projetos={curriculo.projetos} />
        </Secao>

        <Secao id="formacao" titulo="Formação e experiência" variante="realce">
          <FormacaoExperiencia formacao={curriculo.formacao} experiencia={curriculo.experiencia} />
        </Secao>

        <Secao id="contato" titulo="Contato">
          <Contato curriculo={curriculo} />
        </Secao>
      </main>
      <footer className="rodape">
        <span>{curriculo.nome}</span>
        <span>Currículo Online / GitHub Pages</span>
      </footer>
    </>
  );
}
