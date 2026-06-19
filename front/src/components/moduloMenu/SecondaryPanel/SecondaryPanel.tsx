// components/SecondaryPanel.tsx
import { ChevronDown, Minus, Plus, ShoppingCart } from 'lucide-react';
import styles from './SecondaryPanel.module.css'
import PedidoCard from '../PedidoCard/PedidoCard';

interface Props {
  viewType?: string
}

const SecondaryPanel = ({
  viewType
}: Props) => {
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
            <PedidoCard
              productName='Tacos al Pastor'
              img='/menu/tacos.jpg'
              price={290}
              hasToppings={false}
              quantity={1000} />
            <PedidoCard
              productName='Tacos al Pastor'
              img='/menu/tacos.jpg'
              price={290}
              hasToppings={false}
              quantity={1} />
            <PedidoCard
              productName='Tacos al Pastor'
              img='/menu/tacos.jpg'
              price={290}
              hasToppings={false}
              quantity={1} />
            <PedidoCard
              productName='Tacos al Pastor'
              img='/menu/tacos.jpg'
              price={290}
              hasToppings={false}
              quantity={1} />
            <PedidoCard
              productName='Tacos al Pastor'
              img='/menu/tacos.jpg'
              price={290}
              hasToppings={false}
              quantity={1} />
            <PedidoCard
              productName='Tacos al Pastor'
              img='/menu/tacos.jpg'
              price={290}
              hasToppings={true}
              quantity={1000} />
          </main>
        </div>
        
      </div>

      <footer className={`${styles.panelFooter} p-4`}>
        <div className={styles.divider}></div>

        <div className="d-flex justify-content-between my-3">
          <span className={styles.summaryLabel}>Subtotal</span>
          <span className={styles.summaryValue}>$145</span>
        </div>

        <div className="d-flex justify-content-between mb-4">
          <span className={styles.totalLabel}>Total</span>
          <span className={styles.totalValue}>$145</span>
        </div>

        <button className={`${styles.orderBtn} btn w-100 d-flex align-items-center justify-content-center`}>
          <span className='me-2'> <ShoppingCart size={20} /></span> Ordenar
        </button>
      </footer>
    </div>
  );
};

export default SecondaryPanel;