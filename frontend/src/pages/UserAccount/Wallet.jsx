import React, { useContext, useEffect, useState } from 'react';
import './walletpage.css';
import { Link, useParams } from 'react-router-dom';
import { UserAxios } from '../../axios_instances/Axios_instance';
import UserContext from '../../context/UserContext';

const Wallet = () => {
  const { id } = useParams();
  // const {userInfo} = useContext(UserContext)
  const [walletAmount, setWalletAmount] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWalletAmount = async () => {
      try {
        if (id) {
          const response = await UserAxios.get(`api/user/wallet/${id}/`);
          setWalletAmount(response.data.balance);
          setLoading(false);
        }
      } catch (error) {
        console.error('Error fetching wallet amount:', error);
        setLoading(false);
      }
    };
    fetchWalletAmount();
  }, [id]);

  return (
    <div className="wallet-container">
      <div className="wallet-box">
        <h2 className="wallet-heading">Wallet</h2>
        <div className="wallet-details">
          <div className="wallet-icon">
            <i className="fas fa-wallet"></i>
          </div>
          <div className="wallet-amount">
            {loading ? <div className="spinner"></div> : (walletAmount !== null ? `₹ ${walletAmount}` : 'No data')}
          </div>
        </div>
        <Link to={`/userAccount/wallet/${id}/transactions`} className="wallet-transactions-link">View Wallet Transactions</Link>
      </div>
    </div>
  );
};

export default Wallet;