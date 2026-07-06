import { BrowserRouter, Routes, Route } from 'react-router-dom';

import PageNotFound from '@/components/PageNotFound';
import NavbarLeft from '@/components/App/NavbarLeft';

import { Main } from './AppStyles';

const Router = () => (
  <BrowserRouter>
    <Main>
      <NavbarLeft />
      <Routes>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Main>
  </BrowserRouter>
);

export default Router;
