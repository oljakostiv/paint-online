import React from "react";
import {Navigate, Route, Routes} from "react-router-dom";
import Components from "./allComponents";

const AppRouter = () => (
  <Routes>
    <Route path='/:id' element={
      <Components/>
    }/>
    <Route
      path='*'
      element={<Navigate to={`f${(+new Date).toString(16)}`} replace/>}
    />
  </Routes>
);

export default AppRouter;
