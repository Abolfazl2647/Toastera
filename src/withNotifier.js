import Notifier from "./context";

const withNotifier = (WrapperComponent) => {
  class NotifierConsumer extends React.PureComponent {
    render() {
      return (
        <Notifier.Consumer>
          {(data) => <WrapperComponent {...this.props} {...data} />}
        </Notifier.Consumer>
      );
    }
  }
  return NotifierConsumer;
};

export default withNotifier;
