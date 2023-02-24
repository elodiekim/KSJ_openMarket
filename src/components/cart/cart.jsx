import styles from "./cart.module.css";
import { CartHeader } from "./cartHeader";
import { CartList } from "./cartList";
import { CartTotal } from "./cartTotal";

export const Cart = ({cart, setCart, convertPrice}) => {
 //장바구니 안 수량 조절
  const handleQuantity =( type, id, quantity) => {
    const found = cart.filter((el)=> el.id === id)[0]
    const idx = cart.indexOf(found)
    const cartItem= {
      id: found.id,
      image:found.image,
      name : found.name,
      price: found.price,
      quantity: quantity,
      provider: found.provider,
    }
    if(type === "plus"){
      setCart([...cart.slice(0,idx), cartItem, ...cart.slice(idx+1)])
    }else {
      if(quantity ===0) return ;
      setCart([...cart.slice(0,idx),cartItem, ...cart.slice(idx+1)])
    }
  }
  //장바구니 안 상품 삭제
  const handleRemove= (id)=> {
    setCart(cart.filter((el)=> el.id != id))

  }
  return (
    <>
      <header className={styles.header}>
        <h1>장바구니</h1>
      </header>
      <CartHeader />
      {cart.length === 0? (
        <div className = {styles.not}>
          <h2>장바구니에 담긴 상품이 없습니다.</h2>
          <p>상품을 장바구니에 담아주세요!</p>
        </div>
      ):(
        cart.map((cart)=>{
          return <CartList key={`key-${cart.id}`} 
          cart={cart} setCart={setCart} 
          convertPrice={convertPrice} handleQuantity={handleQuantity}
          handleRemove={handleRemove}
          />
        })
      )}
      {cart.length === 0 ? "": <CartTotal />}
    </>
  );
};
