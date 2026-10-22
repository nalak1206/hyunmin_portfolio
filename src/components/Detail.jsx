import { forwardRef } from 'react';
import IntroDetail from './details/IntroDetail.jsx';
import ProjectDetail from './details/ProjectDetail.jsx';
import FieldDetail from './details/FieldDetail.jsx';
import AboutDetail from './details/AboutDetail.jsx';
import ContactDetail from './details/ContactDetail.jsx';

const panels = {
  intro: IntroDetail,
  field: FieldDetail,
  about: AboutDetail,
  contact: ContactDetail,
};

// 오른쪽 상세 패널. key로 정거장마다 새로 그려서 등장 애니메이션이 매번 다시 재생됩니다.
const Detail = forwardRef(function Detail({ station, next }, ref) {
  const Panel = station.project ? ProjectDetail : panels[station.id];
  return (
    <section id="detail" className="detail" ref={ref} tabIndex={-1} aria-label={`${station.label} 상세`}>
      <div className="detail-inner" key={station.id}>
        <Panel project={station.project} />
        {station.id !== 'contact' && (
          <a className="next-link" href={`#/${next.id}`}>
            <span>Next</span>
            {next.label} →
          </a>
        )}
      </div>
    </section>
  );
});

export default Detail;
