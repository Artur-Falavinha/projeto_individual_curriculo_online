import { BriefcaseBusiness, GraduationCap } from 'lucide-react';

export function FormacaoExperiencia({ formacao, experiencia }) {
  return (
    <div className="linha-do-tempo">
      <div className="linha-do-tempo__coluna">
        <div className="linha-do-tempo__titulo">
          <GraduationCap aria-hidden="true" size={28} />
          <h3>Formação</h3>
        </div>

        {formacao.map((item) => (
          <article className="item-tempo" key={`${item.curso}-${item.periodo}`}>
            <h4>{item.curso}</h4>
            <p>{item.instituicao}</p>
            <span>{item.periodo}</span>
            <p>{item.detalhes}</p>
          </article>
        ))}
      </div>

      <div className="linha-do-tempo__coluna">
        <div className="linha-do-tempo__titulo">
          <BriefcaseBusiness aria-hidden="true" size={28} />
          <h3>Experiencia</h3>
        </div>

        {experiencia.map((item) => (
          <article className="item-tempo" key={`${item.cargo}-${item.periodo}`}>
            <h4>{item.cargo}</h4>
            <span>{item.periodo}</span>
            <ul>
              {item.atividades.map((atividade) => (
                <li key={atividade}>{atividade}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </div>
  );
}
