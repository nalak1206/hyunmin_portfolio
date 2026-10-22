import { profile } from '../../data/profile.js';

const word = 'REBUILD';

export default function ContactDetail() {
  return (
    <article className="contact">
      <p className="rebuild" aria-hidden="true">
        {[...word].map((letter, index) => (
          <span key={index} style={{ '--i': index }}>
            {letter}
          </span>
        ))}
      </p>
      <h2 className="contact-title">흩어진 조각을 함께 다시 조립할 분을 찾습니다.</h2>
      <a className="contact-email" href={`mailto:${profile.email}`}>
        {profile.email}
      </a>
      <ul className="contact-links">
        {profile.links.map((link) => (
          <li key={link.href}>
            <a className="button" href={link.href} target="_blank" rel="noopener noreferrer">
              {link.label} ↗
            </a>
          </li>
        ))}
      </ul>
      <p className="copyright">© 2026 {profile.nameEn} · React, Three.js</p>
    </article>
  );
}
