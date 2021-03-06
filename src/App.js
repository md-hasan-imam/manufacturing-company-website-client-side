import { Route, Routes } from 'react-router-dom';
import './App.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from './Pages/Home/Home';
import Login from './Pages/Login/Login';
import Purchase from './Pages/Purchase/Purchase';
import Footer from './Pages/Shared/Footer/Footer';
import Header from './Pages/Shared/Header/Header';
import SignUp from './Pages/SignUp/SignUp';
import RequireAuth from './Pages/Login/RequireAuth';
import Blogs from './Pages/Blogs/Blogs';
import Portfolio from './Pages/Portfolio/Portfolio';
import NotFoundPage from './Pages/NotFoundPage/NotFoundPage';
import Dashboard from './Pages/Dashboard/Dashboard';
import MyOrders from './Pages/Dashboard/MyOrders';
import AddAReview from './Pages/Dashboard/AddAReview';
import MyProfile from './Pages/Dashboard/MyProfile';
import ManageAllOreders from './Pages/Dashboard/ManageAllOreders';
import AddAProduct from './Pages/Dashboard/AddAProduct';
import MakeAdmin from './Pages/Dashboard/MakeAdmin';
import ManageProducts from './Pages/Dashboard/ManageProducts';
import Payment from './Pages/Dashboard/Payment';
import RequireAdmin from './Pages/Login/RequireAdmin';


function App() {
  return (
    <div className="App mx-auto">
      <Header></Header>
      <Routes>
        <Route path='/' element={<Home></Home>}></Route>
        <Route path='/part/:id' element={
          <RequireAuth>
            <Purchase></Purchase>
          </RequireAuth>
        }></Route>
        <Route path='/dashboard' element={<RequireAuth><Dashboard></Dashboard></RequireAuth>}>
           <Route index element={<MyOrders></MyOrders>}></Route>
           <Route path="review" element={<AddAReview></AddAReview>}></Route>
           <Route path="payment/:id" element={<Payment></Payment>}></Route>
           <Route path="profile" element={<MyProfile></MyProfile>}></Route>
           <Route path="orders" element={<RequireAdmin><ManageAllOreders></ManageAllOreders></RequireAdmin>}></Route>
           <Route path="addaproduct" element={<RequireAdmin><AddAProduct></AddAProduct></RequireAdmin>}></Route>
           <Route path="makeadmin" element={<RequireAdmin><MakeAdmin></MakeAdmin></RequireAdmin>}></Route>
           <Route path="manageproducts" element={<RequireAdmin><ManageProducts></ManageProducts></RequireAdmin>}></Route>
        </Route>
        <Route path='/blogs' element={<Blogs></Blogs>}></Route>
        <Route path='/portfolio' element={<Portfolio></Portfolio>}></Route>
        <Route path='/login' element={<Login></Login>}></Route>
        <Route path='/signup' element={<SignUp></SignUp>}></Route>
        <Route path='*' element={<NotFoundPage></NotFoundPage>}></Route>
      </Routes>
      <Footer></Footer>
      <ToastContainer></ToastContainer>
    </div>
  );
}

export default App;
