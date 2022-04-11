# muinotify

#### Notification System with @MUI Alerts - ReactJs

Muinotify has an imperative API that makes it easy to display snackbars, without having to handle their open/close state. It also enables you to stack them on top of one another (although this is discouraged by the Material Design guidelines).



\*\* in near future you can add your own components to replacing Material UI Components if you want.

### Installing:

```
npm install rezvani-muinotifier
yarn add rezvani-muinotifier

```

### How to use:

React Component in render method:
You Don't have to use options

```
import React from "react";
import { NotifierProvider, withNotifier } from "rezvani-muinotify";

class App extends Component {

  render() {
    return (
      <div className="App_Wrapper">


      <NotifierProvider
        maxNotif={4}
        position="top-right"
        parentElement="section"
        parentName="amir-rezvani"
        StackProps={{ spacing: 1, direction: "row" }}
        TransitionProps={{ direction: "left" }}
        generalTimeOut={2000}
        defaultSeverity="error"
      >
        <Application />
      </NotifierProvider>

      </div>
    );
  }
}

export default App;


const Application = ({notifier}) => {
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

<hr>

### Available Props:   

Default values are into `[ ]`

| Name                    | Values                                                | Description                                                                                 | Sample or Support                                                                    |
| ----------------------- | ----------------------------------------------------- | ------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------ |
| **maxNotif**            | [3], 'NUMBER'                                         | maximum number of nofications on the screen                                                 | <NotifierProvider maxNotif={4} />                                                    |
| **position**            | "bottom-left" , 'STRING'                              | position of the list of notification on screen                                              | bottom-left, bottom-right, top-left, top-right                                       |
| **wrapperElement**      | [div], 'STRING'                                       | the wrapper element of list of notifications (this tag placed outside of application root)  | all notification goes inside of this tag                                             |
| **wrapperName**         | [rezvani-notify-wrapper], 'STRING'                    | class name of wrapper tag                                                                   | pass any string                                                                      |
| **TransitionComponent** | [Slide], 'COMPONENT'                                  | Slide, Glow, or other transition available in MUI                                           | - <NotifierProvider TransitionComponent={Glow} />                                    |
| **defaultSeverity**     | [error], 'STRING'                                     | type of alert- info, warning, error, success                                                | applied on MUI Alert component                                                       |
| **generalTimeOut**      | [3000], 'NUMBER'                                      | how long it takes to each notification leave the screen                                     | deafult value takes 3 seconed long                                                   |
| **StackProps**          | [{spacing: 1, direction: "column-reverse"}], 'OBJECT' | All Stack props of MUI stack can be pass through this                                       | children, direction, divider, spacing, [etc](https://mui.com/api/stack/)..           |
| **AlertProps**          | [{}], 'OBJECT'                                        | All Alert props of MUI Alert can be pass through this                                       | closeText, iconMapping, severity, variant, [etc](https://mui.com/api/alert/).        |
| **TransitionProps**     | [{}], 'OBJECT'                                        | All TRansition props base on selected transition of MUI Transition can be pass through this | choose Fade then have appear, easing, in, timeout, [etc](https://mui.com/api/fade/). |
| **customAlert**     | [], 'FUNCTION'                                        | you can pass any component as an alert | you have access to all options inside of this function [render props](https://reactjs.org/docs/render-props.html). |
| **preventDuplicate**     | [false], 'BOOL'                                        | prevent duplicate alert messages | just pass this no ignore same alert messages to show |
