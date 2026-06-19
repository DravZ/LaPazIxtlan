import { Minus, Plus, ShoppingCart } from "lucide-react";
import type { ProductMenu } from "../../../interfaces/ModuloMenu/ProductMenu";
import styles from "./ProductModal.module.css";
import { useEffect, useState } from "react";

interface ProductModalProps {
  product: ProductMenu | null;
  onClose: () => void;
}

const ProductModal = ({ product, onClose }: ProductModalProps) => {
  const [cantidad, setCantidad] = useState(1);

  const [toppings, setToppings] = useState(product?.toppings || []);

  useEffect(() => {
    setCantidad(1);
    setToppings(product?.toppings || []);
  }, [product]);

  if (!product) return null;

  const precio = Number(product.price) * cantidad;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button
          className={styles.closeButton}
          onClick={() => {
            setCantidad(1);
            onClose();
          }}
        >
          ✕
        </button>

        <div className={styles.imageContainer}>
          <img src={product.img} alt={product.productName} />
        </div>

        <div className={styles.body}>
          <div className={styles.content}>
            <span className={styles.category}>ESPECIALES</span>

            <h2 className={styles.productName}>{product.productName}</h2>

            <p className={styles.description}>{product.description}</p>

            {product.hasToppings && (
              <>
                <h4 className={styles.toppingsTitle}>Personaliza tu orden</h4>

                <div className={styles.toppingsContainer}>
                  {toppings.map((topping) => (
                    <div key={topping.name} className={styles.toppingRow}>
                      <span>{topping.name}</span>

                      <div className={styles.toppingControls}>
                        <button
                          className={styles.toppingButton}
                          onClick={() => {
                            setToppings((prev) =>
                              prev.map((t) =>
                                t.name === topping.name
                                  ? {
                                      ...t,
                                      quantity: Math.max(0, t.quantity - 1),
                                    }
                                  : t,
                              ),
                            );
                          }}
                        >
                          <Minus size={20} />
                        </button>

                        <span className={styles.toppingValue}>
                          {topping.quantity === 0
                            ? "Sin"
                            : topping.quantity === 1
                              ? "Normal"
                              : "Extra"}
                        </span>

                        <button
                          className={styles.toppingButton}
                          onClick={() => {
                            setToppings((prev) =>
                              prev.map((t) =>
                                t.name === topping.name
                                  ? {
                                      ...t,
                                      quantity: Math.min(2, t.quantity + 1),
                                    }
                                  : t,
                              ),
                            );
                          }}
                        >
                          <Plus size={20} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>

          <div className={styles.footer}>
            <div className={styles.priceRow}>
              <span className={styles.price}>${product.price}</span>

              <div className={styles.quantity}>
                <button
                  className={styles.quantityMinus}
                  onClick={() => {
                    if (cantidad > 1) {
                      setCantidad((prev) => prev - 1);
                    }
                  }}
                >
                  <Minus size={24} />
                </button>

                <span className={styles.numberQuantity}>{cantidad}</span>

                <button
                  className={styles.quantityPlus}
                  onClick={() => setCantidad((prev) => prev + 1)}
                >
                  <Plus size={24} />
                </button>
              </div>
            </div>

            <button className={styles.addButton}>
              <ShoppingCart size={20} />
              <span className="my-0 py-0 mx-2"></span>
              Añadir al Pedido · ${precio}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
