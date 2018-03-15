import React, { Component } from 'react';
import './fullpage.css';

let isIE = (/MSIE/i.test(navigator.userAgent)) || (/Trident.*rv\:11\./i.test(navigator.userAgent));
let isFirefox = (/Firefox/i.test(navigator.userAgent));

class Fullpage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentIndex: 0
        };
        this.delta = 0;
        this.pageSize = props.children && props.children.length;
        this.isScrolling = false;
        this.onWheel = this.onWheel.bind(this);
        this.onTouchStart = this.onTouchStart.bind(this);
        this.onTouchEnd = this.onTouchEnd.bind(this);
        this.onFullpageTouchStart = this.onFullpageTouchStart.bind(this);
        this.onIndicatorClick = this.onIndicatorClick.bind(this);
    }

    componentDidMount() {
        window.addEventListener('wheel', (ev) => {
            this.delta = this.calcDelta(ev);
            if (this.delta < -this.props.sensitivity && !this.isScrolling && this.state.currentIndex < this.pageSize - 1) {
                this.setState((prevState, props) => ({
                    currentIndex: ++prevState.currentIndex
                }));
                this.isScrolling = true;
                setTimeout(() => {
                    this.isScrolling = false;
                }, this.props.duration);
            }
            if (this.delta > this.props.sensitivity && !this.isScrolling && this.state.currentIndex > 0) {
                this.setState((prevState, props) => ({
                    currentIndex: --prevState.currentIndex
                }));
                this.isScrolling = true;
                setTimeout(() => {
                    this.isScrolling = false;
                }, this.props.duration);
            }
        });
    }

    onWheel(ev) {
        ev.preventDefault();
    }

    onTouchStart(ev) {
        this.delta = ev.touches[0].clientY;
    }

    onTouchEnd(ev) {
        this.delta -= ev.changedTouches[0].clientY;
        if (this.delta > 0 && !this.isScrolling && this.state.currentIndex < this.pageSize - 1) {
            this.setState((prevState, props) => ({
                currentIndex: ++prevState.currentIndex
            }));
            this.isScrolling = true;
            setTimeout(() => {
                this.isScrolling = false;
            }, this.props.duration);
        }
        if (this.delta < 0 && !this.isScrolling && this.state.currentIndex > 0) {
            this.setState((prevState, props) => ({
                currentIndex: --prevState.currentIndex
            }));
            this.isScrolling = true;
            setTimeout(() => {
                this.isScrolling = false;
            }, this.props.duration);
        }
    }

    onIndicatorClick(index) {
        this.setState({
            currentIndex: index
        });
    }

    calcDelta(ev) {
        if (isFirefox) {
            return -ev.deltaY;
        } else {
            return ev.wheelDelta;
        }
    }

    onFullpageTouchStart(ev) {
        if (this.state.currentIndex !== 0) {
            ev.preventDefault();
            ev.stopPropagation();
        }
    }

    render() {
        return (
            <div className="fullpage"
                onTouchStart={this.onFullpageTouchStart}>
                <ul className="wrapper"
                    style={{
                        transform: `translateY(${-this.state.currentIndex * 100}vh)`,
                        transition: `transform ${this.props.duration / 1000}s cubic-bezier(0.6, 0.5, 0.3, 1)`
                    }}
                    onWheel={this.onWheel}
                    onTouchStart={this.onTouchStart}
                    onTouchMove={this.onTouchMove}
                    onTouchEnd={this.onTouchEnd}
                    onMouseDown={this.onMouseDown}
                    onMouseUp={this.onMouseUp}>
                    {this.props.children && this.props.children.map((child, index) => (
                        <li className="page" key={index}>{child}</li>
                    ))}
                </ul>

                {this.props.showIndicator &&
                    <ul className="indicator"
                        style={{ transform: `translateY(-50%)` }}>
                        {this.props.children && this.props.children.map((child, index) => (
                            <li className={`point ${index === this.state.currentIndex ? 'point--active' : ''}`}
                                key={index}
                                onClick={this.onIndicatorClick.bind(this, index)}>
                            </li>
                        ))}
                    </ul>
                }
            </div>
        )
    }
}

Fullpage.defaultProps = {
    sensitivity: 30,
    duration: 800,
    showIndicator: false
}

export default Fullpage;
