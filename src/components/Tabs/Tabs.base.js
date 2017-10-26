import React from 'react';
import PropTypes from 'prop-types';
//import { PropsType } from './PropsType';
//import { Models } from './Models';

const propTypes = {
    /** tabs data */
    tabs: PropTypes.any, //必须的
    /** TabBar's position | default: top */
    tabBarPosition: PropTypes.oneOf(['top', 'bottom', 'left', 'right']),
    /** render for TabBar */
    renderTabBar: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
    /** initial Tab, index or key */
    initialPage: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    /** current tab, index or key */
    page: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    /** whether to switch tabs with swipe gestrue in the content | default: true */
    swipeable: PropTypes.bool,
    /** use scroll follow pan | default: true */
    useOnPan: PropTypes.bool,
    /** pre-render nearby # sibling, Infinity: render all the siblings, 0: render current page | default: 1 */
    prerenderingSiblingsNumber: PropTypes.number,
    /** whether to change tabs with animation | default: true */
    animated: PropTypes.bool,
    /** callback when tab is switched */
    onChange: PropTypes.func,
    /** on tab click */
    onTabClick: PropTypes.func,
    /** destroy inactive tab | default: false */
    destroyInactiveTab: PropTypes.bool,
    /** distance to change tab, width ratio | default: 0.3 */
    distanceToChangeTab: PropTypes.number,
    /** use paged | default: true */
    usePaged: PropTypes.bool,
    /** tab paging direction | default: horizontal */
    tabDirection: PropTypes.oneOf(["horizontal", "vertical"]),
    /** tabBar underline style */
    tabBarUnderlineStyle: PropTypes.object,
    /** tabBar background color */
    tabBarBackgroundColor: PropTypes.string,
    /** tabBar active text color */
    tabBarActiveTextColor: PropTypes.string,
    /** tabBar inactive text color */
    tabBarInactiveTextColor: PropTypes.string,
    /** tabBar text style */
    tabBarTextStyle: PropTypes.object
}

const defaultProps = {
    tabBarPosition: 'top',
    initialPage: 0,
    swipeable: true,
    animated: true,
    prerenderingSiblingsNumber: 1,
    tabs: [],
    destroyInactiveTab: false,
    usePaged: true,
    tabDirection: 'horizontal',
    distanceToChangeTab: .3,
}


export class Tabs extends React.PureComponent {
    //props: P
    constructor(props) {
        super(props);
        // this.currentTab = PropTypes.number;
        // this.minRenderIndex = PropTypes.number;
        //第二个参数ass
        this.state = this.getPrerenderRange(props.prerenderingSiblingsNumber, {
            currentTab: this.getTabIndex(props),
            minRenderIndex: props.tabs.length - 1,
            maxRenderIndex: 0,
        });
        this.nextCurrentTab = this.state.currentTab;
        this.prevCurrentTab;
        /** compatible for different between react and preact in `setState`. */
        this.nextCurrentTab;
        // private tabCache: { [key: string]: React.ReactNode } = {};
    }

    //nextProps: P
    componentWillReceiveProps(nextProps) {
        if (this.props.page !== nextProps.page && nextProps.page !== undefined) {
            this.goToTab(this.getTabIndex(nextProps), true);
        }
        if (this.props.prerenderingSiblingsNumber !== nextProps.prerenderingSiblingsNumber) {
            this.setState(this.getPrerenderRange(
                nextProps.prerenderingSiblingsNumber, {
                    minRenderIndex: this.state.minRenderIndex,
                    maxRenderIndex: this.state.maxRenderIndex,
                },
                nextProps.page !== undefined ? this.getTabIndex(nextProps) : this.state.currentTab
            ));
        }
    }

    componentDidMount() {
        this.prevCurrentTab = this.state.currentTab;
    }

    componentDidUpdate() {
        this.prevCurrentTab = this.state.currentTab;
    }


    //props: P
    getTabIndex(props) {
        const {
            page,
            initialPage,
            tabs
        } = props;
        const param = (page !== undefined ? page : initialPage) || 0;

        let index = 0;
        //param as any
        if (typeof (param) === 'string') {
            tabs.forEach((t, i) => {
                if (t.key === param) {
                    index = i;
                }
            });
        } else {
            index = param || 0;
        }
        return index < 0 ? 0 : index;
    }

    //preRenderNumber = 0, state?: S, currentTab = -1
    getPrerenderRange = (preRenderNumber = 0, state, currentTab = -1) => {
        let {
            minRenderIndex,
            maxRenderIndex
        } = (state || this.state);
        state = state || {};
        if (currentTab === -1) {
            currentTab = state.currentTab !== undefined ? state.currentTab : this.state.currentTab;
        }
        //...state as any
        return {
            ...state,
            minRenderIndex: Math.min(minRenderIndex, currentTab - preRenderNumber),
            maxRenderIndex: Math.max(maxRenderIndex, currentTab + preRenderNumber),
        };
    }

    //this.props as PropsType
    isTabVertical = (direction = (this.props).tabDirection) => direction === 'vertical';

    //idx: number
    shouldRenderTab = (idx) => {
        const {
            destroyInactiveTab,
            prerenderingSiblingsNumber = 0
        } = this.props;
        const {
            minRenderIndex,
            maxRenderIndex,
            currentTab = 0
        } = this.state;

        if (destroyInactiveTab) {
            return currentTab - prerenderingSiblingsNumber <= idx && idx <= currentTab + prerenderingSiblingsNumber;
        }
        return minRenderIndex <= idx && idx <= maxRenderIndex;
    }

    //idx: number
    shouldUpdateTab = (idx) => {
        const {
            currentTab = 0
        } = this.state;
        return currentTab === idx;
    }

    //current: number, width: number, threshold = this.props.distanceToChangeTab || 0
    getOffsetIndex = (current, width, threshold = this.props.distanceToChangeTab || 0) => {
        const ratio = Math.abs(current / width);
        const direction = ratio > this.state.currentTab ? '<' : '>';
        const index = Math.floor(ratio);
        switch (direction) {
            case '<':
                return ratio - index > threshold ? index + 1 : index;
            case '>':
                return 1 - ratio + index > threshold ? index : index + 1;
            default:
                return Math.round(ratio);
        }
    }

    //index: number, force = false, newState: any = {}
    goToTab(index, force = false, newState = {}) {
        if (!force && this.nextCurrentTab === index) {
            return false;
        }
        this.nextCurrentTab = index;
        const {
            tabs,
            onChange,
            prerenderingSiblingsNumber
        } = this.props;
        if (index >= 0 && index < tabs.length) {
            if (!force) {
                onChange && onChange(tabs[index], index);
                if (this.props.page !== undefined) {
                    return false;
                }
            }

            this.setState({
                currentTab: index,
                ...this.getPrerenderRange(prerenderingSiblingsNumber, undefined, index),
                ...newState,
            });
        }
        return true;
    }

    tabClickGoToTab(index) {
        this.goToTab(index);
    }

    getTabBarBaseProps() {
        const { currentTab } = this.state;
        const {
            animated,
            onTabClick,
            tabBarActiveTextColor,
            tabBarBackgroundColor,
            tabBarInactiveTextColor,
            tabBarPosition,
            tabBarTextStyle,
            tabBarUnderlineStyle,
            tabs,
        } = this.props;
        return {
            activeTab: currentTab,
            animated: !!animated,
            goToTab: this.tabClickGoToTab.bind(this),
            onTabClick,
            tabBarActiveTextColor,
            tabBarBackgroundColor,
            tabBarInactiveTextColor,
            tabBarPosition,
            tabBarTextStyle,
            tabBarUnderlineStyle,
            tabs,
        };
    }

    //tabBarProps: any, DefaultTabBar: React.ComponentClass
    renderTabBar(tabBarProps, DefaultTabBar) {
        const { renderTabBar } = this.props;
        if (renderTabBar === false) {
            return null;
        } else if (renderTabBar) {
            // return React.cloneElement(this.props.renderTabBar(props), props);
            return renderTabBar(tabBarProps);
        } else {
            return <DefaultTabBar { ...tabBarProps } />;
        }
    }

    getSubElements = () => {
        const { children } = this.props;
        //let subElements: { [key: string]: React.ReactNode } = {};
        let subElements = {};
        //defaultPrefix: string = '$i$-', allPrefix: string = '$ALL$'
        return (defaultPrefix = '$i$-', allPrefix = '$ALL$') => {
            if (Array.isArray(children)) {
                children.forEach((child, index) => {
                    if (child.key) {
                        subElements[child.key] = child;
                    }
                    subElements[`${defaultPrefix}${index}`] = child;
                });
            } else if (children) {
                subElements[allPrefix] = children;
            }
            return subElements;
        };
    }
    //tab: PropTypes.object,index:PropTypes.number,subElements: (defaultPrefix, allPrefix) => { [key: string]: any },subElements:PropTypes.object,defaultPrefix= '$i$-',allPrefix= '$ALL$'
    getSubElement(tab, index, subElements, defaultPrefix = '$i$-', allPrefix = '$ALL$') {
        const key = tab.key || `${defaultPrefix}${index}`;
        const elements = subElements(defaultPrefix, allPrefix);
        let component = elements[key] || elements[allPrefix];
        if (component instanceof Function) {
            component = component(tab, index);
        }
        return component || null;
    }
}


Tabs.propTypes = propTypes;
Tabs.defaultProps = defaultProps;
