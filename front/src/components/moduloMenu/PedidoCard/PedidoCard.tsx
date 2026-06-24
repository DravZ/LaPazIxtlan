import { Minus, Plus } from 'lucide-react';
import { useState } from 'react';
import styles from './PedidoCard.module.css';

interface Topping {
    name: string;
    quantity: number;
}

interface PedidoCardProps {
    productName: string;
    price: number;
    hasToppings: boolean;
    toppings?: Topping[];
    quantity: number;
    img: string;
}

const PedidoCard = ({
    productName,
    price,
    hasToppings = false,
    toppings,
    quantity,
    img
}: PedidoCardProps) => {

    const [cantidad, setCantidad] = useState(quantity);

    return (
        <div className={styles.mainContainer + " w-100"}>
            <div
                className={`${styles.orderCard} mb-2 w-100`}
            >
                {/*Imagen*/}
                <img
                    src={img || "/menu/tacos.jpg"}
                    alt={productName}
                    className={styles.dishImage}
                />
                <div className={styles.infoOrderContainer}>
                    {/*Datos de la orden */}
                    <div className="ms-3 flex-grow-1 w-100">
                        <p className={styles.dishName}>
                            {productName || "Nombre"}
                        </p>

                        <p className={styles.dishPrice}>
                            ${price || "00.00"}
                        </p>

                        <div className={styles.toppingsText}>
                            {
                                hasToppings
                                    ? "Toppingsssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss"
                                    : ""
                            }
                        </div>
                    </div>

                    {/*Botones de cantidad */}
                    <div className={styles.quantityContainer}>
                        <button
                            className={`${styles.counterBtn} ${styles.btnMinus}`}
                            onClick={() => {
                                if (cantidad > 0) {
                                    setCantidad(prev => prev - 1);
                                }
                            }}
                        >
                            <Minus size={20} />
                        </button>

                        <span
                            className={`${styles.countValue} mx-2`}
                        >
                            {cantidad}
                        </span>

                        <button
                            className={`${styles.counterBtn} ${styles.btnPlus}`}
                            onClick={() => {
                                setCantidad(prev => prev + 1);
                            }}
                        >
                            <Plus size={20} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PedidoCard;