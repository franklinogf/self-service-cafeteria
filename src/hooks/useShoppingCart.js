import { useContext } from "react";
import { ShoppingCartContext } from "../context/ShoppingCartContext";
import { useStudent } from "./useStudent";
import { SCHOOLSOFT_PAYMENT_API_URL } from "../constants/school";
import Swal from "sweetalert2";

export function useShoppingCart() {
  const { resetStudent } = useStudent();
  const { doneShopping, setDoneShopping } = useContext(ShoppingCartContext);
  const resetShoppingCart = ({ withOrderMade = true } = {}) => {
    if (withOrderMade) {
      setDoneShopping(true);
      setTimeout(() => {
        setDoneShopping(false);
      }, 5000);
    }
    resetStudent();
  };
  const makeOrder = async ({ items, total, studentID }) => {
    fetch(SCHOOLSOFT_PAYMENT_API_URL, {
      method: "POST",
      body: JSON.stringify({ items, total, studentID }),
    })
      .then(() => {
        resetShoppingCart();
      })
      .catch((error) => {
        console.error("Error making order:", error);
        Swal.fire({
          title: "Error al realizar el pedido",
          text: "Por favor, comuniquese con el administrador del sistema",
          icon: "warning",
          confirmButtonColor: "var(--chakra-colors-blue-500)",
          confirmButtonText: "Continuar",
          allowOutsideClick: false,
          allowEscapeKey: false,
        }).then((result) => {
          if (result.isConfirmed) {
            resetShoppingCart({ withOrderMade: false });
          }
        });
      });
  };
  return { resetShoppingCart, doneShopping, setDoneShopping, makeOrder };
}
