import { FC } from "react";
import PaymentDelivery from "@/screens/PaymentDelivery/PaymentDelivery";

const PagePaymentDelivery: FC = () => {
  return (
    <>
      <PaymentDelivery />
      <h1>Signout</h1>
      <p>Are you sure you want to sign out?</p>
      {/* <form action="http://localhost:3000/api/auth/signout" method="POST"> */}
      <form action="http://localhost:3000/api/test" method="POST">
        <input
          type="hidden"
          name="csrfToken"
          value="a558a3fffa64a68bd9d2740a0b035dc9f04d0e1658f38979127a7c977c2b9465"
        />
        <button id="submitButton" type="submit">
          Sign out
        </button>
      </form>
    </>
  );
};

export default PagePaymentDelivery;
