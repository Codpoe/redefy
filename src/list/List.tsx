import React from 'react';
import { CSSTransition } from 'react-transition-group';
import cx from 'classnames';
import throttle from 'lodash/throttle';
import Loading from '../loading/index';
import bem from '../utils/bem';
import { isYVisible } from '../utils/dom';

const b = bem('rdf-list');

export interface ListProps {
  loading?: boolean;
  finished?: boolean;
  error?: boolean;
  immediateCheck?: boolean;
  root?: Element | null;
  offset?: number;
  loadingLabel?: React.ReactNode;
  finishedLabel?: React.ReactNode;
  errorLabel?: React.ReactNode;
  onLoad?: () => void;
  className?: string;
  style?: React.CSSProperties;
}

export class List extends React.Component<ListProps> {
  static defaultProps: Partial<ListProps> = {
    loading: false,
    finished: false,
    error: false,
    immediateCheck: true,
    offset: 300,
  };

  observer?: IntersectionObserver;
  lineRef = React.createRef<HTMLDivElement>();

  componentDidMount() {
    if (typeof window === 'undefined') {
      return;
    }

    if (this.props.immediateCheck) {
      this.check();
    }

    document.addEventListener('scroll', this.handleScroll);
  }

  componentDidUpdate(prevProps: ListProps) {
    if (!prevProps.finished && this.props.finished) {
      document.removeEventListener('scroll', this.handleScroll);
    }

    if (prevProps.loading && !this.props.loading) {
      setTimeout(this.check, 200);
    }
  }

  componentWillUnmount() {
    document.removeEventListener('scroll', this.handleScroll);
  }

  check = () => {
    const { loading, finished, error, offset, onLoad } = this.props;

    if (
      loading ||
      finished ||
      error ||
      !onLoad ||
      !this.lineRef.current ||
      !isYVisible(this.lineRef.current, { marginBottom: offset })
    ) {
      return;
    }

    onLoad();
  };

  handleScroll = throttle(this.check, 200);

  renderFooter() {
    const {
      loading,
      finished,
      error,
      loadingLabel,
      finishedLabel,
      errorLabel,
    } = this.props;
    let content;
    let clickable = false;

    if (finished) {
      content = finishedLabel && (
        <div className={b('label')}>{finishedLabel}</div>
      );
    } else if (error) {
      content = errorLabel && <div className={b('label')}>{errorLabel}</div>;
      clickable = true;
    } else if (loading) {
      content = <Loading label={loadingLabel} />;
    }

    const cls = cx(b('footer'), {
      [b('footer', 'clickable')]: clickable,
    });

    return <div className={cls}>{content}</div>;
  }

  render() {
    const { finished, finishedLabel, children } = this.props;
    const footer = this.renderFooter();

    return (
      <div className={b()}>
        <div className={b('content')}>
          {children}
          <div className={b('line')} ref={this.lineRef} />
        </div>
        <CSSTransition
          classNames="rdf-list-footer-anim-"
          in={!finished || Boolean(finishedLabel)}
          timeout={0}
          appear
          mountOnEnter
          unmountOnExit
        >
          {footer}
        </CSSTransition>
      </div>
    );
  }
}

export default List;
