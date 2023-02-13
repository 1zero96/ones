import React from "react";
import CartItem from "../components/CartItem";
import { AiFillPlusCircle } from "react-icons/ai";
import { FaEquals } from "react-icons/fa";
import PriceCard from "../components/PriceCard";
import Button from "../components/ui/Button";
import useCart from "../hooks/uesCart";

const SHIPPING = 3000; // 배송비

export default function MyCart() {
  const {
    cartQuery: { isLoading, data: products },
  } = useCart();

  if (isLoading) return <p>Loading...</p>;
  const hasProducts = products && products.length > 0;
  const totalPrice = products && products.reduce((prev, current) => prev + parseInt(current.price) * current.quantity, 0);

  return (
    <section className="p-8 flex flex-col h-screen">
      <p className="text-2xl text-center font-bold pb-4 border-b border-gray-300">내 장바구니</p>
      {!hasProducts && <p>장바구니에 상품이 없습니다.</p>}
      {hasProducts && (
        <>
          <ul className="border-b border-gray-300 mb-8 p-4 px-8">{products && products.map((product) => <CartItem key={product} product={product} />)}</ul>
          <div className="flex justify-between items-center mb-6 px-2 md:p-8 lg:px-16">
            <PriceCard text="총 주문금액" price={totalPrice} />
            <AiFillPlusCircle className="shrink-0" />
            <PriceCard text="배송비" price={SHIPPING} />
            <FaEquals className="shrink-0" />
            <PriceCard text="총 결제금액" price={totalPrice + SHIPPING} />
          </div>
          <Button text="결제하기" />
        </>
      )}
    </section>
  );
}
