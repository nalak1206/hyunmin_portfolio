import { highlights, profile } from '../../data/profile.js';

export default function IntroDetail() {
  return (
    <article className="intro">
      <p className="eyebrow">
        <span className="dot" aria-hidden="true" />
        {profile.role}
      </p>
      <h2 className="intro-statement">
        처음 쓰는 사람도 <em>헤매지 않는</em> 화면을 만듭니다.
      </h2>
      <p className="intro-lead">{profile.headline}</p>
      <ul className="stats" aria-label="주요 성과">
        {highlights.map((item) => (
          <li key={item.label}>
            <strong>{item.value}</strong>
            <span>{item.label}</span>
          </li>
        ))}
      </ul>
      <a className="button primary" href="#/whoislilpa">
        첫 프로젝트 보기 →
      </a>
      <div className="how-to">
        <p className="panel-label">How to use</p>
        <dl>
        <div>
          <dt>이동</dt>
          <dd>왼쪽 목록을 누르거나 ← → 키를 쓰세요. 주소(#/developet 등)로 바로 들어올 수도 있습니다.</dd>
        </div>
        <div>
          <dt>조형물</dt>
          <dd>이동할 때마다 조각이 흩어졌다가 그 프로젝트를 닮은 모양으로 다시 조립됩니다. 클릭하면 분해됩니다.</dd>
        </div>
        <div>
          <dt>연출 끄기</dt>
          <dd>오른쪽 위 Motion Off를 누르면 모든 애니메이션이 멈춥니다.</dd>
        </div>
        </dl>
      </div>
    </article>
  );
}
