import styled from "@emotion/styled";
import Stack from "@mui/material/Stack";
import NotifyItem from "./notifyItem";

const NotifyWrapperStyled = styled.div`
  position: fixed;
  z-index: 100000;
  height: auto;
  max-width: 50%;

  ${({ position }) =>
    position.split("-").map((item) => {
      return `${item}: 10px`;
    })}
`;

const NotifyWrapper = ({ notifyList, remove, ...restProps }) => {
  const {
    position,
    defaultSeverity,
    generalTimeOut,
    TransitionComponent,
    TransitionProps,
    AlertProps,
    StackProps,
    customAlert,
  } = restProps;

  const notifyItemProps = {
    defaultSeverity,
    TransitionComponent,
    TransitionProps,
    AlertProps,
    generalTimeOut,
    remove,
    customAlert,
  };

  return (
    <NotifyWrapperStyled position={position}>
      <Stack spacing={2} {...StackProps}>
        {notifyList.map((item) => {
          return (
            <NotifyItem
              key={item.id}
              notifyItemProps={notifyItemProps}
              {...item}
            />
          );
        })}
      </Stack>
    </NotifyWrapperStyled>
  );
};

export default NotifyWrapper;
