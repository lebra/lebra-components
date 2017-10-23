/// <reference types="react" />

import PropTypes from 'prop-types';

export const TabBarPropsType = {
    /** call this function to switch tab */
    goToTab: PropTypes.func, //必须的
    /** tabs data */
    tabs: PropTypes.object, //必须的，key与title
    /** current active tab */
    activeTab: PropTypes.number, //必须的
    /** use animate | default: true */
    animated: PropTypes.boolean, //必须的
    /** render the tab of tabbar */
    renderTab: PropTypes.func,
    /** page size of tabbar's tab | default: 5 */
    page: PropTypes.number,
    /** on tab click */
    onTabClick: PropTypes.func,
    /** tabBar's position | defualt: top */
    tabBarPosition: PropTypes.oneOf(['top', 'bottom', 'left', 'right']),
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

export const PropsType = {
    /** tabs data */
    tabs: PropTypes.object, //必须的
    /** TabBar's position | default: top */
    tabBarPosition: PropTypes.oneOf(['top', 'bottom', 'left', 'right']),
    /** render for TabBar */
    renderTabBar: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.boolean
    ]),
    /** initial Tab, index or key */
    initialPage: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string
    ]),
    /** current tab, index or key */
    page: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string
    ]),
    /** whether to switch tabs with swipe gestrue in the content | default: true */
    swipeable: PropTypes.boolean,
    /** use scroll follow pan | default: true */
    useOnPan: PropTypes.boolean,
    /** pre-render nearby # sibling, Infinity: render all the siblings, 0: render current page | default: 1 */
    prerenderingSiblingsNumber: PropTypes.number,
    /** whether to change tabs with animation | default: true */
    animated: PropTypes.boolean,
    /** callback when tab is switched */
    onChange: PropTypes.func,
    /** on tab click */
    onTabClick: PropTypes.func,
    /** destroy inactive tab | default: false */
    destroyInactiveTab: PropTypes.boolean,
    /** distance to change tab, width ratio | default: 0.3 */
    distanceToChangeTab: PropTypes.number,
    /** use paged | default: true */
    usePaged: PropTypes.boolean,
    /** tab paging direction | default: horizontal */
    tabDirection: PropTypes.oneOfType([
        "horizontal",
        "vertical"
    ]),
    /** tabBar underline style */
    tabBarUnderlineStyle: PropTypes.object,
    /** tabBar background color */
    tabBarBackgroundColor: PropTypes.string,
    /** tabBar active text color */
    tabBarActiveTextColor: PropTypes.string,
    /** tabBar inactive text color */
    tabBarInactiveTextColor: PropTypes.string,
    /** tabBar text style */
    tabBarTextStyle: PropTypes.object,
}
