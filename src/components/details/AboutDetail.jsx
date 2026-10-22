import { devLog, skills, timeline } from '../../data/activities.js';
import { profile } from '../../data/profile.js';

export default function AboutDetail() {
  return (
    <article className="about">
      <h2 className="sr-only">About</h2>
      <div className="about-intro">
        {profile.intro.map((text) => (
          <p key={text.slice(0, 20)}>{text}</p>
        ))}
        <p className="now">
          <span className="dot" aria-hidden="true" />
          {profile.now}
        </p>
      </div>

      <section className="panel" aria-labelledby="spec-title">
        <h3 className="panel-label" id="spec-title">
          Spec sheet
        </h3>
        <dl className="spec">
          {skills.map((skill) => (
            <div key={skill.name}>
              <dt>{skill.name}</dt>
              <dd>{skill.note}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="panel" aria-labelledby="timeline-title">
        <h3 className="panel-label" id="timeline-title">
          Timeline
        </h3>
        <ol className="timeline">
          {timeline.map((item) => (
            <li key={item.what}>
              <span>{item.when}</span>
              <p>{item.what}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="panel" aria-labelledby="patch-title">
        <h3 className="panel-label" id="patch-title">
          Patch notes
        </h3>
        <ul className="patch-notes">
          {devLog.map((item) => (
            <li key={item.title}>
              <span>{item.category}</span>
              {item.title}
            </li>
          ))}
        </ul>
      </section>
    </article>
  );
}
