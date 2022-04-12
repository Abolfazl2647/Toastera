# muinotify

#### Notification System with @MUI Alerts - ReactJs

Muinotify has an imperative API that makes it easy to display snackbars, without having to handle their open/close state. It also enables you to stack them on top of one another (although this is discouraged by the Material Design guidelines).

\*\* in near future you can add your own components to replacing Material UI Components if you want.

### Installing:

you need to install @MUI first so:

```
// with npm
npm install @mui/material @emotion/react @emotion/styled

// with yarn
yarn add @mui/material @emotion/react @emotion/styled

```

and then

```
npm install muinotify
yarn add muinotify

```

### How to use:

React Component in render method:
You Don't have to use options

wrap MuiNotifyProvider over your App.

```
import React from "react";
import { MuiNotifyProvider } from "muinotify";

class App extends Component {

  render() {
    return (
      <div className="App_Wrapper">
      <MuiNotifyProvider
         maxNotif={4}
        // preventDuplicate
        position="top-right"
        wrapperElement="section"
        wrapperName="amir-rezvani"
        StackProps={{ spacing: 1, direction: "column-reverse" }}
        TransitionProps={{ direction: "left" }}
        generalTimeOut={2000}
        defaultSeverity="error"
        customAlert={(data) => <CustomAlert {...data} />}
      >
        <Application />
      </MuiNotifyProvider>

      </div>
    );
  }
}

export default App;
```

then use withNotifier or useNotifier to fire up you alert

```
// with hooks
import React from "react";
import { useNotifier } from "muinotify";

const Application = () => {
const { notifier } = useNotifier();
  return (
    <button
        onClick={() => {
          notifier(`hello world`, {
            isPersist: false,
            variant: "success",
          });
        }}
      >
        Click to show Alert
      </button>
  )
};
```

```
// with HOC
import React from "react";
import { withNotifier } from "muinotify";

const Application = ({ notifier }) => {
  return (
    <button
        onClick={() => {
          notifier(`hello world`, {
            isPersist: false,
            variant: "success",
          });
        }}
      >
        Click to show Alert
      </button>
  )
};

export defautl withNotifier(Application);
```

<hr>

### Available Props:

Default values are into `[ ]`

| Name                    | Values                                                | Description                                                                                 | Sample or Support                                                                                                  |
| ----------------------- | ----------------------------------------------------- | ------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| **maxNotif**            | [3], 'NUMBER'                                         | maximum number of nofications on the screen                                                 | <NotifierProvider maxNotif={4} />                                                                                  |
| **position**            | "bottom-left" , 'STRING'                              | position of the list of notification on screen                                              | bottom-left, bottom-right, top-left, top-right                                                                     |
| **wrapperElement**      | [div], 'STRING'                                       | the wrapper element of list of notifications (this tag placed outside of application root)  | all notification goes inside of this tag                                                                           |
| **wrapperName**         | [rezvani-notify-wrapper], 'STRING'                    | class name of wrapper tag                                                                   | pass any string                                                                                                    |
| **TransitionComponent** | [Slide], 'COMPONENT'                                  | Slide, Glow, or other transition available in MUI                                           | - <NotifierProvider TransitionComponent={Glow} />                                                                  |
| **defaultSeverity**     | [error], 'STRING'                                     | type of alert- info, warning, error, success                                                | applied on MUI Alert component                                                                                     |
| **generalTimeOut**      | [3000], 'NUMBER'                                      | how long it takes to each notification leave the screen                                     | deafult value takes 3 seconed long                                                                                 |
| **StackProps**          | [{spacing: 1, direction: "column-reverse"}], 'OBJECT' | All Stack props of MUI stack can be pass through this                                       | children, direction, divider, spacing, [etc](https://mui.com/api/stack/)..                                         |
| **AlertProps**          | [{}], 'OBJECT'                                        | All Alert props of MUI Alert can be pass through this                                       | closeText, iconMapping, severity, variant, [etc](https://mui.com/api/alert/).                                      |
| **TransitionProps**     | [{}], 'OBJECT'                                        | All TRansition props base on selected transition of MUI Transition can be pass through this | choose Fade then have appear, easing, in, timeout, [etc](https://mui.com/api/fade/).                               |
| **customAlert**         | [], 'FUNCTION'                                        | you can pass any component as an alert                                                      | you have access to all options inside of this function [render props](https://reactjs.org/docs/render-props.html). |
| **preventDuplicate**    | [false], 'BOOL'                                       | prevent duplicate alert messages                                                            | just pass this no ignore same alert messages to show                                                               |
