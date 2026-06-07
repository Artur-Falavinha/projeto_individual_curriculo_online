import { Github, Linkedin, Mail, MapPin, Phone } from 'lucide-react';

export function Contato({ curriculo }) {
  const contatos = [
    {
      rotulo: curriculo.email,
      href: `mailto:${curriculo.email}`,
      Icone: Mail,
    },
    {
      rotulo: curriculo.telefone,
      href: `tel:${curriculo.telefone.replace(/\D/g, '')}`,
      Icone: Phone,
    },
    {
      rotulo: curriculo.localizacao,
      href: '#inicio',
      Icone: MapPin,
    },
    {
      rotulo: 'GitHub',
      href: curriculo.github,
      Icone: Github,
    },
    {
      rotulo: 'LinkedIn',
      href: curriculo.linkedin,
      Icone: Linkedin,
    },
  ].filter((contato) => contato.rotulo && contato.href);

  return (
    <address className="contatos">
      {contatos.map(({ rotulo, href, Icone }) => (
        <a key={rotulo} href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noreferrer">
          <Icone aria-hidden="true" size={20} />
          <span>{rotulo}</span>
        </a>
      ))}
    </address>
  );
}
