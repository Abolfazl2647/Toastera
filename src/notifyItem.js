import React from "react";
import { useRef, useState, useEffect, useCallback, memo } from "react";
import Alert from "@mui/material/Alert";

function useIsMounted() {
  const isMounted = useRef(false);

  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  return useCallback(() => isMounted.current, []);
}

const NotifyItem = (props) => {
  const { message, options = {}, id, isEntered, notifyItemProps } = props;

  const {
    defaultSeverity,
    TransitionComponent,
    TransitionProps,
    AlertProps,
    generalTimeOut,
    remove,
    customAlert,
  } = notifyItemProps;

  const { timeOut = generalTimeOut, isPersist } = options;
  const [open, setOpen] = useState(true);
  const isMounted = useIsMounted();

  let timer = useRef(null);

  // after an amount of time we remove the notif from the view
  useEffect(() => {
    clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      if (isMounted && !isPersist) setOpen(false);
    }, timeOut);
    return () => clearTimeout(timer.current);
  }, [timeOut, isPersist, isMounted]);

  useEffect(() => {
    if (!isEntered) setOpen(false);
  }, [isEntered, id]);

  const handleExited = () => {
    if (!open && remove) remove(id);
  };

  return (
    <TransitionComponent
      in={open}
      mountOnEnter
      unmountOnExit
      onExited={handleExited}
      {...TransitionProps}
      //   addEndListener={handleListener(target, event)}
    >
      {customAlert ? (
        <div className="Custom-Alert">{customAlert(props)}</div>
      ) : (
        <Alert
          id={id}
          severity={(options && options.variant) || defaultSeverity}
          {...AlertProps}
        >
          {message + id}
        </Alert>
      )}
    </TransitionComponent>
  );
};

export default memo(NotifyItem);
