import { Minus, Plus } from 'lucide-react';
import { useMemo, useState } from 'react';
import styles from './PedidoCard.module.css';
import { useOrderMenu } from '../../../context/moduloMenu/OrderMenuContext';

interface PedidoCardProps {
    idCarrito: string;
}

const PedidoCard = ({
    idCarrito
}: PedidoCardProps) => {

    const {
        getProduct,
        increaseQuantity,
        decreaseQuantity,
        removeProduct,
        calculatePrice
    } = useOrderMenu();

    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const producto = getProduct(idCarrito);
    const precio = calculatePrice(producto);

    if (!producto) return null;

    const toppingsText = useMemo(() => {

        if (!producto.toppings?.length)
            return "";

        return producto.toppings
            .map((topping: any) => {

                let estado = "";

                if (topping.quantity === 0)
                    estado = "Sin";

                if (topping.quantity === 2)
                    estado = "Extra";

                return estado
                    ? `${topping.nombre} (${estado})`
                    : topping.nombre;

            })
            .join(", ");

    }, [producto]);

    return (
        <>
            <div className={styles.mainContainer + " w-100"}>

                <div
                    className={`${styles.orderCard} mb-2 w-100`}
                >

                    <img
                        src={producto.imagen_url || "/menu/tacos.jpg"}
                        alt={producto.nombre_producto}
                        className={styles.dishImage}
                    />

                    <div className={styles.infoOrderContainer}>

                        <div className="ms-3 flex-grow-1 w-100">

                            <p className={styles.dishName}>
                                {producto.nombre_producto}
                            </p>

                            <p className={styles.dishPrice}>
                                ${precio}
                            </p>

                            <div className={styles.toppingsText}>
                                {toppingsText}
                            </div>

                        </div>

                        <div className={styles.quantityContainer}>

                            <button
                                className={`${styles.counterBtn} ${styles.btnMinus}`}
                                onClick={() => {

                                    if (producto.cantidad === 1) {

                                        setShowDeleteModal(true);

                                    } else {

                                        decreaseQuantity(idCarrito);

                                    }

                                }}
                            >
                                <Minus size={20} />
                            </button>

                            <span
                                className={`${styles.countValue} mx-2`}
                            >
                                {producto.cantidad}
                            </span>

                            <button
                                className={`${styles.counterBtn} ${styles.btnPlus}`}
                                onClick={() => {
                                    increaseQuantity(idCarrito);
                                }}
                            >
                                <Plus size={20} />
                            </button>

                        </div>

                    </div>

                </div>

            </div>

            {
                showDeleteModal && (

                    <div
                        className="modal d-block"
                        tabIndex={-1}
                    >
                        <div className="modal-dialog modal-dialog-centered">

                            <div className="modal-content">

                                <div className="modal-header">
                                    <h5 className="modal-title">
                                        Eliminar producto
                                    </h5>
                                </div>

                                <div className="modal-body">
                                    ¿Deseas eliminar este producto del pedido?
                                </div>

                                <div className="modal-footer">

                                    <button
                                        className="btn btn-secondary"
                                        onClick={() => setShowDeleteModal(false)}
                                    >
                                        Cancelar
                                    </button>

                                    <button
                                        className="btn btn-danger"
                                        onClick={() => {

                                            removeProduct(idCarrito);

                                            setShowDeleteModal(false);

                                        }}
                                    >
                                        Eliminar
                                    </button>

                                </div>

                            </div>

                        </div>
                    </div>

                )
            }

        </>
    );
};

export default PedidoCard;