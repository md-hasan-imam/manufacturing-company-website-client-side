import { useAuthState } from 'react-firebase-hooks/auth';
import { Link, useNavigate, } from 'react-router-dom';
import auth from '../../firebase.init';
import { toast } from 'react-toastify';
import Loading from '../Loading';
import { useQuery } from 'react-query';

const MyOrders = () => {

    const [user] = useAuthState(auth);
    const navigate = useNavigate();

    const email = user.email;

    const { data: myOrders, isLoading, refetch } = useQuery(['myOrders', email], () => fetch(`https://rocky-reef-55202.herokuapp.com/myorder/${email}`, {
        method: "GET",
        headers: {
            'authorization': `Bearer ${localStorage.getItem('accessToken')}`
        }
    })
        .then(res => {
            if (res.status === 401 || res.status === 403) {
                navigate('/');
            }
            return res.json()
        })
    )
    if (isLoading) {
        <Loading></Loading>
    }


    // deleting order 
    const handleDeleteOrder = id => {

        const proceed = window.confirm('Do you really want to cancel order?');

        if (proceed) {
            const url = `https://rocky-reef-55202.herokuapp.com/myorder?id=${id}`;
            fetch(url, {
                method: "DELETE",
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data)
                    if (data.deletedCount) {
                        toast.success(`Order Deleted successfully`)
                        refetch();
                    }
                    else {
                        toast.error('action failed')
                    }
                }
                )
                console.log(url)
        }
    }


    return (
        <div className='mt-10 container'>
            <div class="overflow-x-auto">
                <table class="table w-full text-center">
                    <thead >
                        <tr >
                            <th></th>
                            <th className='text-xl'>Product Name</th>
                            <th className='text-xl'>Price</th>
                            <th className='text-xl'>Quantity</th>
                            <th className='text-xl'>Payment Status</th>
                            <th className='text-xl'>Cancel Order</th>
                        </tr>
                    </thead>
                    <tbody>
                        
                        {
                            myOrders?.map((order, index) => <tr
                                key={index}
                                order={order}
                                class="hover"
                            >
                                <th className='text-lg font-bold'>{index + 1}</th>
                                <td className='text-lg font-bold'>{order.name}</td>
                                <td className='text-lg font-bold'>{order.price}</td>
                                <td className='text-lg font-bold '>{order.orderQuantity}</td>
                                <td className='text-xl font-bold'>
                                    {(!order.paid) && <Link to={`/dashboard/payment/${order._id}`}><button className='btn btn-md mx-auto btn-success text-black'>Pay Now</button>
                                    </Link>}
                                    {(order.paid) && <button className='btn btn-md mx-auto btn-success text-black'>Paid</button>}
                                </td>
                                <td className='text-xl font-bold'>
                                    <button onClick={() => handleDeleteOrder(order._id)} className='btn btn-md mx-auto btn-error text-black'>Cancel</button>
                                </td>
                                
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyOrders;