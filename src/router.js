import React from 'react';
import { HashRouter, Route, Switch,Redirect } from 'react-router-dom'
import home from './home'
import Demo1 from './DemoPage/demo1'
import Demo2 from './DemoPage/demo2'

const RouterList = () => (
    <HashRouter>
      <Switch>
        <Route exact path="/" component={home}></Route>
        <Route exact path="/Demo1" component={Demo1}></Route>
        <Route exact path="/Demo2" component={Demo2}></Route>
      </Switch>
    </HashRouter>
);

export default RouterList;