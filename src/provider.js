import React from "react";
import { createPortal } from "react-dom";
import Notifier from "./context";
import NotifyWrapper from "./notifyWrapper";
import { Slide } from "@mui/material";

// TODO
// 1 - custom Components --> Done
// 2 - exit animation --> Done
// 3 - prevent duplicate --> Done
// 4 - seprate persist unlimited persist
// 5 - use Queue from the begining all things go to queue and then extraced them

class NotifyerProvider extends React.PureComponent {
  constructor(props) {
    super(props);

    const { wrapperElement, wrapperName } = this.props;
    // make a place for puting notifys
    const rezvaniNotifyWrapper = document.createElement(
      wrapperElement || "div"
    );
    rezvaniNotifyWrapper.className = wrapperName || "rezvani-notify-wrapper";
    document.body.appendChild(rezvaniNotifyWrapper);
    this.renderPortal = rezvaniNotifyWrapper;

    this.actionQueue = [];
    this.isStateBlocked = false;

    this.state = {
      notifyList: [],
    };
  }

  getList = () => {
    return [...this.state.notifyList];
  };

  // seconed arg is for blocking or unblocking setState
  // more description below
  commitState = (notifyList, isBlocked) => {
    this.isStateBlocked = isBlocked;
    this.setState({ notifyList }, () => {
      if (!isBlocked) this.proccessQueue();
    });
  };

  proccessQueue = () => {
    const action = this.actionQueue.shift();
    if (action) action();
  };

  notifier = (message, options) => {
    const { maxNotif, preventDuplicate } = this.props;
    const ID = Math.random().toString(16).slice(2);
    const newData = {
      message,
      options,
      isEntered: true,
      id: ID,
    };

    const list = this.getList();

    // prevent duplicate
    if (
      list.findIndex((item) => item.message === message) >= 0 &&
      preventDuplicate
    )
      return;

    if (this.isStateBlocked) {
      this.actionQueue.push(() => this.notifier(message, options));
      return;
    }

    if (list.length >= maxNotif) {
      list[0].isEntered = false;
      list.push(newData);
      this.commitState(list, true);
    } else {
      list.push(newData);
      this.commitState(list, false);
    }

    return ID;
  };

  removeNofityById = (ID) => {
    const notifyList = [...this.state.notifyList];
    const newList = notifyList.filter((elem) => elem.id !== ID);
    // seconed arg is just for telling the state that after removing notif from list
    // i want to set new state but before that every thing goes to queue
    this.commitState(newList, false);
  };

  removeNotifierAnimationById = (ID) => {
    const list = this.getList();
    const index = list.findIndex((item) => item.id === ID);
    if (index >= 0) list[index].isEntered = false;
    this.commitState(list, false);
  };

  render() {
    const { notifyList } = this.state;
    const { children, ...restProps } = this.props;

    return (
      <Notifier.Provider
        value={{
          notifier: this.notifier,
          removeNotifier: this.removeNotifierAnimationById,
        }}
      >
        {children}
        {createPortal(
          <NotifyWrapper
            notifyList={notifyList}
            remove={this.removeNofityById}
            {...restProps}
          />,
          this.renderPortal
        )}
      </Notifier.Provider>
    );
  }
}

NotifyerProvider.defaultProps = {
  customAlert: null,
  preventDuplicate: false,
  position: "bottom-left",
  wrapperElement: "div",
  wrapperName: "rezvani-notify-wrapper",
  maxNotif: 3,
  defaultSeverity: "info",
  generalTimeOut: 3000,
  TransitionComponent: Slide,
  TransitionProps: {},
  AlertProps: {},
  StackProps: { spacing: 1, direction: "column-reverse" },
};

export default NotifyerProvider;
