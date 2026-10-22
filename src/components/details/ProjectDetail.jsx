import { useState } from 'react';

function Highlight({ text, mark }) {
  const start = mark ? text.indexOf(mark) : -1;
  if (start < 0) return text;
  return (
    <>
      {text.slice(0, start)}
      <mark className="hl">{mark}</mark>
      {text.slice(start + mark.length)}
    </>
  );
}

function Gallery({ images }) {
  const [current, setCurrent] = useState(0);
  const image = images[current];
  return (
    <div className="gallery">
      <figure className="screen">
        <img src={image.src} alt={image.alt} width="1440" height="810" />
        <figcaption>{image.caption}</figcaption>
      </figure>
      <div className="gallery-thumbs" role="group" aria-label="화면 선택">
        {images.map((item, index) => (
          <button
            type="button"
            key={item.src}
            onClick={() => setCurrent(index)}
            aria-pressed={index === current}
            aria-label={item.caption}
          >
            <img src={item.src} alt="" width="160" height="90" />
          </button>
        ))}
      </div>
    </div>
  );
}

function Sprites({ names }) {
  return (
    <ul className="sprites" aria-label="Develo 펫 상태 애니메이션">
      {names.map((name) => (
        <li key={name}>
          <img src={`/images/developet/${name}.gif`} alt="" width="96" height="104" />
          <span>{name}</span>
        </li>
      ))}
    </ul>
  );
}

function Terminal({ terminal }) {
  return (
    <div className="terminal">
      <p className="terminal-command">
        <span aria-hidden="true">$ </span>
        {terminal.command}
      </p>
      <table>
        <caption>결과 요약</caption>
        <thead>
          <tr>
            <th scope="col">App</th>
            <th scope="col">Version</th>
            <th scope="col">Result</th>
          </tr>
        </thead>
        <tbody>
          {terminal.results.map((row) => (
            <tr key={row.app}>
              <th scope="row">{row.app}</th>
              <td>{row.version}</td>
              <td className={`status-${row.status}`}>
                {row.status}
                {row.note && <small>{row.note}</small>}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Surface({ project }) {
  if (project.images) return <Gallery images={project.images} />;
  if (project.sprites) return <Sprites names={project.sprites} />;
  if (project.terminal) return <Terminal terminal={project.terminal} />;
  if (project.image) {
    return (
      <figure className="screen">
        <img src={project.image.src} alt={project.image.alt} width="1440" height="900" />
        <figcaption>{project.image.caption}</figcaption>
      </figure>
    );
  }
  return null;
}

// 프로젝트 하나를 층(layer)으로 분해합니다: 화면 → 개요 → 구현 기록들 → 코드
function layersOf(project) {
  const layers = [
    { code: 'SURFACE', title: '화면', body: <Surface project={project} /> },
    { code: 'BRIEF', title: '개요', body: <p>{project.intro}</p> },
    ...project.fields.map((field) => ({
      code: 'LOG',
      title: field.label,
      body: (
        <p>
          <Highlight text={field.text} mark={field.highlight} />
        </p>
      ),
    })),
  ];
  if (project.snippet) {
    layers.push({
      code: 'CODE',
      title: project.snippet.file,
      body: (
        <pre className="snippet">
          <code>{project.snippet.code}</code>
        </pre>
      ),
    });
  }
  return layers;
}

export default function ProjectDetail({ project }) {
  const layers = layersOf(project);
  return (
    <article className="project" aria-labelledby={`${project.id}-title`}>
      <header className="title-block">
        <h2 id={`${project.id}-title`}>{project.name}</h2>
        <p className="assy-subtitle">{project.subtitle}</p>
        <dl className="assy-meta">
          <div>
            <dt>Period</dt>
            <dd>{project.period}</dd>
          </div>
          <div>
            <dt>Role</dt>
            <dd>{project.role}</dd>
          </div>
          <div>
            <dt>Parts</dt>
            <dd>{layers.length} layers</dd>
          </div>
        </dl>
        <ul className="chips" aria-label="사용 기술">
          {project.stack.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        {project.links.length > 0 && (
          <p className="assy-links">
            {project.links.map((link) => (
              <a key={link.href} className="button primary small" href={link.href} target="_blank" rel="noopener noreferrer">
                {link.label} ↗
              </a>
            ))}
          </p>
        )}
        <p className="assy-note">{project.note}</p>
        {project.result && <p className="assy-result">{project.result}</p>}
      </header>

      <ol className="layers">
        {layers.map((layer, layerIndex) => (
          <li key={`${layer.code}-${layer.title}`} className="layer" style={{ '--i': layerIndex }}>
            <p className="layer-label">
              <span className="callout">{String(layerIndex + 1).padStart(2, '0')}</span>
              <span className="layer-code">{layer.code}</span>
              {layer.title}
            </p>
            <div className="layer-body">{layer.body}</div>
          </li>
        ))}
      </ol>
    </article>
  );
}
