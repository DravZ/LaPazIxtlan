import { Minus, Plus, ShoppingCart } from "lucide-react";
import styles from "./ProductModal.module.css";
import { useEffect, useMemo, useState } from "react";
import { getProductDetailsById } from "../../../controllers/menu.controller";
import { useOrderMenu } from "../../../context/moduloMenu/OrderMenuContext";

interface ProductModalProps {
  productId: number | null;
  onClose: () => void;
}

const ProductModal = ({ productId, onClose }: ProductModalProps) => {

  const [product, setProduct] = useState<any>(null);
  const [cantidad, setCantidad] = useState(1);
  const [toppings, setToppings] = useState(product?.toppings || []);
  const { addProduct } = useOrderMenu();

  useEffect(() => {
    if (productId !== null) {
      const loadProduct = async () => {
        try {
          const data = await getProductDetailsById(productId);
          console.log("Producto:", data);
          setProduct(data);
        } catch (error) {
          console.error(error);
        }
      };

      loadProduct();
    } else {
      setProduct(null);
    }
  }, [productId]);

  useEffect(() => {
    setCantidad(1);
    setToppings(product?.toppings || []);
  }, [product]);

  const precio = useMemo(() => {
    if (!product) return 0;

    let precioUnitario = Number(product.precio);

    // Sumar toppings que están en modo "Extra"
    const extras = toppings.reduce((total: number, topping: any) => {
      if (topping.quantity === 2) {
        return total + Number(topping.precio_extra);
      }

      return total;
    }, 0);

    // Precio del producto + extras de toppings
    const precioConToppings = precioUnitario + extras;

    // Multiplicar por cantidad de productos
    return precioConToppings * cantidad;

  }, [product, toppings, cantidad]);

  if (!product) return null;

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
          <img src={product.imagen_url} alt={product.nombre_producto} />
        </div>

        <div className={styles.body}>
          <div className={styles.content}>
            <span className={styles.category}>
              {product.categoria?.nombre_categoria?.toUpperCase()}
            </span>

            <h2 className={styles.productName}>{product.nombre_producto}</h2>

            <p className={styles.description}>{product.descripcion}</p>

            {product.hasToppings && (
              <>
                <h4 className={styles.toppingsTitle}>Personaliza tu orden</h4>

                <div className={styles.toppingsContainer}>
                  {toppings.map((topping: any) => (
                    <div key={topping.id_topping} className={styles.toppingRow}>
                      <span>{topping.nombre}</span>

                      <div className={styles.toppingControls}>
                        <button
                          className={styles.toppingButton}
                          onClick={() => {
                            setToppings((prev: any) =>
                              prev.map((t: any) =>
                                t.nombre === topping.nombre
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
                            setToppings((prev: any) =>
                              prev.map((t: any) =>
                                t.nombre === topping.nombre
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
              <span className={styles.price}>${precio}</span>

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

            <button className={styles.addButton}
              onClick={() => {

                const orden = {
                  id_producto: product.id_producto,
                  nombre_producto: product.nombre_producto,
                  descripcion: product.descripcion,
                  imagen_url: product.imagen_url,
                  categoria: product.categoria,
                  precio_unitario: Number(product.precio),
                  cantidad,
                  toppings,
                };

                addProduct(orden);

                onClose();
              }}
            >
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
