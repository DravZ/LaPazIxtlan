import {
    createContext,
    useContext,
    useEffect,
    useState,
} from "react";

interface OrderContextType {

    orden: any[];

    addProduct: (product: any) => void;

    getProduct: (id: string) => any;

    calculatePrice: (product: any) => number;

    increaseQuantity: (id: string) => void;

    decreaseQuantity: (id: string) => void;

    removeProduct: (id: string) => void;

}

const OrderContext = createContext<OrderContextType | null>(null);

export const OrderMenuProvider = ({
    children,
}: {
    children: React.ReactNode;
}) => {

    const [orden, setOrden] = useState<any[]>(() => {
        const pedido = localStorage.getItem("pedido");
        return pedido ? JSON.parse(pedido) : [];
    });

    useEffect(() => {
        localStorage.setItem("pedido", JSON.stringify(orden));
    }, [orden]);

    const addProduct = (product: any) => {
        setOrden((prev) => {
            const nuevaOrden = [...prev];

            const index = nuevaOrden.findIndex((item: any) => {

                if (item.id_producto !== product.id_producto) return false;

                if (item.toppings.length !== product.toppings.length) return false;

                return item.toppings.every((t: any, i: number) =>
                    t.id_topping === product.toppings[i].id_topping &&
                    t.quantity === product.toppings[i].quantity
                );

            });

            if (index !== -1) {

                nuevaOrden[index].cantidad += product.cantidad;

            } else {

                nuevaOrden.push({
                    ...product,
                    id_carrito: crypto.randomUUID(),
                });

            }

            return nuevaOrden;
        });
    };

    const getProduct = (idCarrito: string) => {
        return orden.find(item => item.id_carrito === idCarrito);
    };

    const increaseQuantity = (idCarrito: string) => {

        setOrden(prev =>
            prev.map(item =>
                item.id_carrito === idCarrito
                    ? {
                        ...item,
                        cantidad: item.cantidad + 1
                    }
                    : item
            )
        );

    };

    const decreaseQuantity = (idCarrito: string) => {

        setOrden(prev =>
            prev.map(item =>
                item.id_carrito === idCarrito
                    ? {
                        ...item,
                        cantidad: item.cantidad - 1
                    }
                    : item
            )
        );

    };

    const removeProduct = (idCarrito: string) => {

        setOrden(prev =>
            prev.filter(item => item.id_carrito !== idCarrito)
        );

    };
    const calculatePrice = (producto: any) => {

        let precio = producto.precio_unitario;

        const extras = producto.toppings.reduce(
            (total: number, topping: any) => {

                if (topping.quantity === 2)
                    return total + Number(topping.precio_extra);

                return total;

            },
            0
        );

        return (precio + extras) * producto.cantidad;

    };

    return (
        <OrderContext.Provider
            value={{
                orden,
                addProduct,
                getProduct,
                calculatePrice,
                increaseQuantity,
                decreaseQuantity,
                removeProduct
            }}
        >
            {children}
        </OrderContext.Provider>
    );
};

export const useOrderMenu = () => {

    const context = useContext(OrderContext);

    if (!context) {
        throw new Error("useOrder debe utilizarse dentro de un OrderProvider");
    }

    return context;

};