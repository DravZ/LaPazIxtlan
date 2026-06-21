import { ArrowLeft } from "lucide-react";
import styles from "./AboutPage.module.css";
import { useNavigate } from "react-router-dom";

export default function AboutPage() {
    const navigate = useNavigate();
    return (
        <div className={styles.container}>
            {/* HERO */}
            <section
                className={styles.hero}
                style={{
                    backgroundImage:
                        "url('https://images.unsplash.com/photo-1513456852971-30c0b8199d4d')",
                }}
            >
                <div className={styles.overlay} />

                <button className={styles.backButton}
                    onClick={
                        () => navigate("/")
                    }>
                    <ArrowLeft size={18} />
                    Volver
                </button>

                <div className={styles.heroContent}>
                    <span className={styles.subtitle}>NUESTRA HISTORIA</span>

                    <h1 className={styles.title}>
                        La Paz
                        <br />
                        Ixtlan
                    </h1>
                </div>
            </section>

            {/* CONTENIDO */}
            <section className={styles.content}>
                <div className="row d-flex justify-content-center">
                    <div className="col-11 col-md-10 col-lg-9">
                        <div className={styles.separator}>
                            <div className={styles.line}></div>

                            <div className={styles.star}>✦</div>

                            <div className={styles.line}></div>
                        </div>
                    </div>
                </div>

                <div className="row d-flex justify-content-center m-0 p-0 h-auto">
                    <div className="col-11 col-md-10 col-lg-9 m-0 p-0 h-auto">
                        <h2 className={styles.textTitle}>Raíces, fuego y sabor</h2>
                        <p className={styles.textInfo}>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
                            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                            aliquip ex ea commodo consequat.
                        </p>

                        <p className={styles.textInfo}>
                            Duis aute irure dolor in reprehenderit in voluptate velit esse
                            cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                            cupidatat non proident, sunt in culpa qui officia deserunt mollit
                            anim id est laborum.
                        </p>

                        <p className={styles.textInfo}>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum
                            veritatis cumque molestias illum quos neque officia deleniti
                            perspiciatis. Cum, molestias.
                        </p>

                        <div className={styles.cardContainer + " row mx-1"}>
                            <h2 className={styles.cardTitle}>Nuestra filosofía</h2>
                            <p className={styles.cardInfo}>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
                                ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                                aliquip ex ea commodo consequat.
                            </p>
                        </div>

                        <br />
                        <h2 className={styles.textTitle}>Nuestra filosofía</h2>
                        <p className={styles.textInfo}>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
                            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                            aliquip ex ea commodo consequat.
                        </p>

                        <div className={styles.volverButton}
                            onClick={
                                () => navigate("/")
                            }>
                            <span><ArrowLeft size={20} className="me-2" /></span>
                            Volver al Menú
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}