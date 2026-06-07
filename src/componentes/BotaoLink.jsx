export function BotaoLink({ children, href, variante = 'primario' }) {
  return (
    <a className={`botao botao--${variante}`} href={href}>
      {children}
    </a>
  );
}
