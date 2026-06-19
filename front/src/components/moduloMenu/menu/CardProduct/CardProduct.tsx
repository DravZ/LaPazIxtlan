// components/MainContent.tsx
import styles from "./CardProduct.module.css";
import { Plus } from "lucide-react";
interface Topping {
    name: string;
    quantity: number;
}

interface CardProductProps {
    productName: string;
    description: string;
    price: number;
    hasToppings: boolean;
    toppings?: Topping[];
    img: string;
    onClick?: () => void;
}

const CardProduct = ({
    productName,
    description,
    price,
    img,
    hasToppings = false,
    toppings,
    onClick
}: CardProductProps) => {
    return (
        <div className="row mx-2 mt-4 px-0">
            <div
                className={styles.cardContainer + " p-0"}
                onClick={onClick}
                style={{ cursor: "pointer" }}
            >
                {/* Contenido */}
                <div className="row m-0 p-0">
                    <div className="p-4 col-md-12 col-6 m-0 p-0">
                        <h3 className={styles.titleProduct}>
                            {productName || "Nombre del producto"}
                        </h3>

                        <p className={styles.descriptionProduct + " mb-0"}>
                            {description || "Descripcion del producto"}
                        </p>

                        <div className="d-flex justify-content-between align-items-center mt-lg-3 mt-md-2 
                            mt-1">
                            <span className={styles.priceProduct}
                            >
                                {"$" + price || "$0.00"}
                            </span>

                            <button className={styles.addButton}>
                                <Plus size={24} />
                            </button>
                        </div>
                    </div>

                    {/* Imagen */}
                    <div className="col-md-12 col-6 m-0 p-0">
                        <img
                            src={img}
                            alt="Tacos al pastor"
                            className={styles.imageProduct}
                        />

                    </div>
                </div>
            </div>
        </div>
    );
};

export default CardProduct;