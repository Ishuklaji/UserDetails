import React from 'react';
import { Route, Navigate } from 'react-router-dom';

function PrivateRoute({ element: Element, authenticated, ...rest }) {
    return (
        <Route
            {...rest}
            element={authenticated ? <Element /> : <Navigate to="/login" />}
        />
    );
}

export default PrivateRoute;
