import React from 'react';
import { HashRouter, Route, Switch,Redirect } from 'react-router-dom'
import home from './home'
import Demo1 from './DemoPage/demo1'
import Demo2 from './DemoPage/demo2'
import Demo3 from './DemoPage/demo3'
import Demo4 from './DemoPage/demo4'
import Demo5 from './DemoPage/demo5'
import Demo6 from './DemoPage/demo6'
import Demo7 from './DemoPage/demo7'
import Demo8 from './DemoPage/demo8'
import Demo9 from './DemoPage/demo9'

const RouterList = () => (
    <HashRouter>
      <Switch>
        <Route exact path="/" component={home}></Route>
        <Route exact path="/Demo1" component={Demo1}></Route>
        <Route exact path="/Demo2" component={Demo2}></Route>
        <Route exact path="/Demo3" component={Demo3}></Route>
        <Route exact path="/Demo4" component={Demo4}></Route>
        <Route exact path="/Demo5" component={Demo5}></Route>
        <Route exact path="/Demo6" component={Demo6}></Route>
        <Route exact path="/Demo7" component={Demo7}></Route>
        <Route exact path="/Demo8" component={Demo8}></Route>
        <Route exact path="/Demo9" component={Demo9}></Route>
      </Switch>
    </HashRouter>
);

export default RouterList;