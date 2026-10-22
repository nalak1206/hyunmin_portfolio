import { fieldTrip } from '../../data/activities.js';

export default function FieldDetail() {
  return (
    <article className="field">
      <p className="badge">{fieldTrip.award}</p>
      <h2>{fieldTrip.title}</h2>
      <p className="field-meta">{fieldTrip.meta}</p>
      <p className="field-heading">{fieldTrip.heading}</p>
      <div className="field-photos">
        {fieldTrip.photos.map((photo) => (
          <figure key={photo.src}>
            <img
              src={photo.src}
              width={photo.w}
              height={photo.h}
              decoding="async"
              alt={`Agent Field Trip · ${photo.caption}. 본인 외 참가자 얼굴은 모자이크 처리했습니다.`}
            />
            <figcaption>{photo.caption}</figcaption>
          </figure>
        ))}
      </div>
      {fieldTrip.paragraphs.map((text) => (
        <p key={text.slice(0, 20)} className="field-text">
          {text}
        </p>
      ))}
      <p className="text-links">
        {fieldTrip.links.map((link) => (
          <a key={link.href} href={link.href} target="_blank" rel="noopener noreferrer">
            {link.label} ↗
          </a>
        ))}
      </p>
    </article>
  );
}
