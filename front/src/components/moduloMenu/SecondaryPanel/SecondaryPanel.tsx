// components/SecondaryPanel.tsx
import { ShoppingCart } from 'lucide-react';
import { useMemo } from 'react';
import styles from './SecondaryPanel.module.css';
import PedidoCard from '../PedidoCard/PedidoCard';
import { useOrderMenu } from '../../../context/moduloMenu/OrderMenuContext';

interface Props {
  viewType?: string;
  onOrder?: () => void;
}

const SecondaryPanel = ({
  viewType,
  onOrder
}: Props) => {

  const { orden, calculatePrice } = useOrderMenu();

  const subtotal = useMemo(() => {
    return orden.reduce(
      (total: number, item: any) => total + calculatePrice(item),
      0
    );
  }, [orden, calculatePrice]);

  return (
    <div className={styles.secondaryPanel}>

      <div className={`${styles.content} pt-4 px-4 pb-0`}>
        <header className="mb-4">
          <span className={`${styles.subTitle} d-block`}>RESUMEN</span>
          <h2 className={styles.title}>Tu Pedido</h2>
        </header>

        <div className={styles.divider}></div>

        <div className={styles.orderListContainer}>
          <main className={styles.orderList + " my-4"}>

            {
              orden.map((item: any) => (
                <PedidoCard
                  key={item.id_carrito}
                  idCarrito={item.id_carrito}
                />
              ))
            }

          </main>
        </div>

      </div>

      <footer className={`${styles.panelFooter} p-4`}>

        <div className={styles.divider}></div>

        <div className="d-flex justify-content-between my-3">
          <span className={styles.summaryLabel}>Subtotal</span>
          <span className={styles.summaryValue}>
            ${subtotal.toFixed(2)}
          </span>
        </div>

        <div className="d-flex justify-content-between mb-4">
          <span className={styles.totalLabel}>Total</span>
          <span className={styles.totalValue}>
            ${subtotal.toFixed(2)}
          </span>
        </div>

        <button
          className={`${styles.orderBtn} btn w-100 d-flex 
          align-items-center justify-content-center`}
          onClick={() => {
            console.log("SecondaryPanel");
            onOrder?.();
          }}
        >
          <span className='me-2'>
            <ShoppingCart size={20} />
          </span>

          Ordenar
        </button>

      </footer>

    </div>
  );
};

export default SecondaryPanel;