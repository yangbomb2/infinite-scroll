export const EVENT_SCROLL = 'event:scroll';
const scroll = (scrollVal) => (
  {
    type: EVENT_SCROLL,
    scrollVal,
  }
);

export const EVENT_RESIZE = 'event:resize';
const resize = (windowSize) => (
  {
    type: EVENT_RESIZE,
    windowSize,
  }
);

export const EVENT_BP_CHANGE = 'event:breakPointChange';
const breakPointChange = (bp) => (
  {
    type: EVENT_BP_CHANGE,
    bp,
  }
);

export const EVENT_TOGGLE_SIDEBAR = 'event:toggleSideBar';
const toggleSideBar = (show) => (
  {
    type: EVENT_TOGGLE_SIDEBAR,
    show,
  }
);

export {
  scroll,
  resize,
  breakPointChange,
  toggleSideBar,
};
