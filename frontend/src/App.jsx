import React from 'react';
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import EditProfile from './pages/EditProfile';
import Browse from './pages/Browse';
import Landing from './pages/Landing';
import Admin from './pages/Admin';

function Layout() {
    return (
        <>
            <Navbar />
            <Outlet />
            <Footer />
        </>
    );
}

function App() {
    return (
        <BrowserRouter
            future={{
                v7_startTransition: true,
                v7_relativeSplatPath: true,
            }}
        >
            <Routes>
                <Route path="/login" element={<Login />} />

                <Route path="/" element={<Layout />}>
                    <Route index element={<Landing />} />
                    <Route path="browse" element={<Browse />} />
                    <Route path="dashboard" element={<Dashboard />} />
                    <Route path="profile" element={<Profile />} />
                    <Route path="profile/:id" element={<Profile />} />
                    <Route path="profile/edit" element={<EditProfile />} />
                    <Route path="admin" element={<Admin />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
