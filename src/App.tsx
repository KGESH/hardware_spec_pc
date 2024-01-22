import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from '@/pages/Home.tsx';
import Layout from '@/Layout.tsx';
import QueryProvider from '@/lib/reactQuery.tsx';
import AboutPage from '@/pages/About.tsx';
import NotFoundPage from '@/pages/NotFound.tsx';

export default function App() {
  return (
    <QueryProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="about" element={<AboutPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </Router>
    </QueryProvider>
  );
}
