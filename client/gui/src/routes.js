import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from "./user/login/Login"

const BaseRouter = () => {
    return(
        <div>
            <Switch>
                <Route path="/login"> <Login /> </Route>
            </Switch>

        </div>
    )
    
}

export default BaseRouter;