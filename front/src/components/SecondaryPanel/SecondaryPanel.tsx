// components/SecondaryPanel.tsx
import { Minus, Plus, ShoppingCart } from 'lucide-react';
import styles from './SecondaryPanel.module.css'

interface Props{
  viewType?: string
}

const SecondaryPanel = ({
    viewType
}: Props) => {
  return (
    <div className={styles.secondaryPanel}>
      
      <div className="p-4">
        <header className="mb-4">
          <span className={`${styles.subTitle} d-block`}>RESUMEN</span>
          <h2 className={styles.title}>Tu Pedido</h2>
        </header>

        <div className={styles.divider}></div>

        <main className="my-4">
          <div className={`${styles.orderCard} d-flex align-items-center p-3`}>
            <img 
              src="/menu/tacos.jpg" // Reemplaza con la ruta de tu imagen
              alt="Tacos al Pastor" 
              className={styles.dishImage} 
            />
            <div className="ms-3 flex-grow-1">
              <p className={styles.dishName}>Tacos al Pastor</p>
              <p className={styles.dishPrice}>$145</p>
            </div>
            <div className="d-flex align-items-center">
              <button className={`${styles.counterBtn} ${styles.btnMinus}`}>
                <Minus size={20}/> {/* Necesitarás Bootstrap Icons */}
              </button>
              <span className={`${styles.countValue} mx-2`}>1</span>
              <button className={`${styles.counterBtn} ${styles.btnPlus}`}>
                <Plus size={20}/>
              </button>
            </div>
          </div>
        </main>
      </div>

      <footer className={`${styles.panelFooter} p-4 mt-auto`}>
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
          <span className='me-2'> <ShoppingCart size={20}/></span> Ordenar
        </button>
      </footer>
    </div>
  );
};

export default SecondaryPanel;