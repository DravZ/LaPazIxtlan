import type { ProductMenu } from "../../interfaces/ProductMenu";
import styles from './ProductModal.module.css';

interface ProductModalProps {
    product: ProductMenu | null;
    onClose: () => void;
}

const ProductModal = ({
    product,
    onClose
}: ProductModalProps) => {

    if (!product) return null;

    return (
        <div className={styles.overlay} onClick={onClose}>
            <div
                className={styles.modal}
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    className={styles.closeButton}
                    onClick={onClose}
                >
                    ✕
                </button>

                <div className={styles.imageContainer}>
                    <img
                        src={product.img}
                        alt={product.productName}
                    />
                </div>

                {/* Scroll */}
                <div className={styles.body}>

                    <div className={styles.content}>
                        <span className={styles.category}>
                            ESPECIALES
                        </span>

                        <h2>{product.productName}</h2>

                        <p>{product.description}</p>

                        {product.toppings ? product.hasToppings &&
                            product.toppings?.length > 0 && (
                                <>
                                    <h4>
                                        Personaliza tu orden
                                    </h4>

                                    <div className={styles.toppings}>
                                        {product.toppings.map(
                                            (topping) => (
                                                <button
                                                    key={topping}
                                                    className={
                                                        styles.topping
                                                    }
                                                >
                                                    {topping}
                                                </button>
                                            )
                                        )}
                                    </div>
                                </>
                            ) : (<></>)}
                    </div>

                    {/* Footer fijo */}
                    <div className={styles.footer}>
                        <div className={styles.priceRow}>
                            <span className={styles.price}>
                                ${product.price}
                            </span>

                            <div className={styles.quantity}>
                                <button>-</button>

                                <span>1</span>

                                <button>+</button>
                            </div>
                        </div>

                        <button className={styles.addButton}>
                            Añadir al Pedido · $
                            {product.price}
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default ProductModal;