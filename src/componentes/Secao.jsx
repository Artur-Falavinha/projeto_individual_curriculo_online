export function Secao({ id, titulo, children, variante = 'padrao' }) {
  return (
    <section id={id} className={`secao secao--${variante}`}>
      <div className="secao__conteudo">
        <h2>{titulo}</h2>
        {children}
      </div>
    </section>
  );
}
