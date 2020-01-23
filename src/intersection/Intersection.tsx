import React from 'react';
import bem from '../utils/bem';

const b = bem('rdf-intersection');

export interface IntersectionProps {
  root: IntersectionObserverInit['root'];
  rootMargin: IntersectionObserverInit['rootMargin'];
  threshold: IntersectionObserverInit['threshold'];
  onEnter: (entry: IntersectionObserverEntry) => void;
  onLeave: (entry: IntersectionObserverEntry) => void;
}

// export class Intersection extends React.Component<IntersectionProps> {
//   ref = React.createRef<HTMLDivElement>();
//   observer?: IntersectionObserver;

//   componentDidMount() {
//     if (
//       typeof window === 'undefined' ||
//       typeof IntersectionObserver === 'undefined' ||
//       !this.ref.current
//     ) {
//       return;
//     }

//     const { root, rootMargin, threshold, onEnter, onLeave } = this.props;

//     this.observer = new IntersectionObserver(
//       entries => {
//         if (entries[0].isIntersecting) {
//           onEnter(entries[0]);
//         } else {
//           onLeave(entries[0]);
//         }
//       },
//       { root, rootMargin, threshold }
//     );

//     this.observer.observe(this.ref.current);
//   }

//   componentWillUnmount() {
//     if (this.observer) {
//       this.observer.disconnect();
//     }
//   }

//   render() {
//     const { children } = this.props;

//     if (children) {
//       return (
//         <div className={b()} ref={this.ref}>
//           {children}
//         </div>
//       );
//     }

//     return <span className={b()} ref={this.ref} style={{ fontSize: 0 }} />;
//   }
// }

export const Intersection: React.FC<IntersectionProps> = props => {
  const { root, rootMargin, threshold, onEnter, onLeave, children } = props;
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (
      typeof window === 'undefined' ||
      typeof IntersectionObserver === 'undefined' ||
      !ref.current
    ) {
      return;
    }

    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting) {
          onEnter(entries[0]);
        } else {
          onLeave(entries[0]);
        }
      },
      { root, rootMargin, threshold }
    );

    observer.observe(ref.current);

    return () => observer.disconnect();
  }, []);

  if (children) {
    return (
      <div className={b()} ref={ref}>
        {children}
      </div>
    );
  }

  return <span className={b()} ref={ref} style={{ fontSize: 0 }} />;
};

export default Intersection;
