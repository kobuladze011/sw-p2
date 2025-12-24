import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { removeFromCart, updateQuantity, clearCart } from '../store/cartSlice';
import { animalsApi } from '../api/apiService';
import CurrencyToggle from '../components/CurrencyToggle';
import styles from './Cart.module.css';

const Cart: React.FC = () => {
  const cartItems = useAppSelector((state) => state.cart.items);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [currencyRate, setCurrencyRate] = useState(1);
  const [currency, setCurrency] = useState('USD');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleCurrencyChange = (rate: number, curr: string) => {
    setCurrencyRate(rate);
    setCurrency(curr);
  };

  const handleRemove = (id: number, name: string) => {
    dispatch(removeFromCart(id));
    toast.success(`${name} removed from cart`);
  };

  const handleQuantityChange = (id: number, quantity: number) => {
    if (quantity < 1) return;
    dispatch(updateQuantity({ id, quantity }));
  };

  const handleBuyNow = async () => {
    if (cartItems.length === 0) {
      toast.error('Your cart is empty');
      return;
    }

    setIsProcessing(true);

    try {
      // Decrease stock for each item in the cart
      const promises = cartItems.map((item) =>
        animalsApi.decreaseStock(item.id, item.quantity)
      );

      await Promise.all(promises);

      // Clear the cart
      dispatch(clearCart());
      toast.success('Purchase completed successfully!');
      navigate('/animals');
    } catch (error) {
      toast.error('Failed to complete purchase. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const calculateTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  const formatPrice = (price: number) => {
    const convertedPrice = price * currencyRate;
    return currency === 'GEL'
      ? `₾${convertedPrice.toFixed(2)}`
      : `$${convertedPrice.toFixed(2)}`;
  };

  if (cartItems.length === 0) {
    return (
      <div className={styles.container}>
        <h1 className={styles.title}>Shopping Cart</h1>
        <div className={styles.empty}>
          <p>Your cart is empty</p>
          <button
            className={styles.shopButton}
            onClick={() => navigate('/animals')}
          >
            Start Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Shopping Cart ({cartItems.length})</h1>
        <CurrencyToggle onRateChange={handleCurrencyChange} />
      </div>

      <div className={styles.cartContent}>
        <div className={styles.cartItems}>
          {cartItems.map((item) => (
            <div key={item.id} className={styles.cartItem}>
              <div className={styles.itemInfo}>
                <h3 className={styles.itemName}>{item.name}</h3>
                <p className={styles.itemDescription}>{item.description}</p>
                <div className={styles.itemPrice}>
                  {formatPrice(item.price)} each
                </div>
              </div>

              <div className={styles.itemActions}>
                <div className={styles.quantityControl}>
                  <button
                    className={styles.quantityButton}
                    onClick={() =>
                      handleQuantityChange(item.id, item.quantity - 1)
                    }
                  >
                    -
                  </button>
                  <span className={styles.quantity}>{item.quantity}</span>
                  <button
                    className={styles.quantityButton}
                    onClick={() =>
                      handleQuantityChange(item.id, item.quantity + 1)
                    }
                  >
                    +
                  </button>
                </div>

                <div className={styles.itemTotal}>
                  Total: {formatPrice(item.price * item.quantity)}
                </div>

                <button
                  className={styles.removeButton}
                  onClick={() => handleRemove(item.id, item.name)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.cartSummary}>
          <h2 className={styles.summaryTitle}>Order Summary</h2>

          <div className={styles.summaryRow}>
            <span>Subtotal:</span>
            <span>{formatPrice(calculateTotal())}</span>
          </div>

          <div className={styles.summaryRow}>
            <span>Items:</span>
            <span>{cartItems.length}</span>
          </div>

          <div className={`${styles.summaryRow} ${styles.total}`}>
            <span>Total:</span>
            <span>{formatPrice(calculateTotal())}</span>
          </div>

          <button
            className={styles.buyButton}
            onClick={handleBuyNow}
            disabled={isProcessing}
          >
            {isProcessing ? 'Processing...' : 'Buy Now'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
