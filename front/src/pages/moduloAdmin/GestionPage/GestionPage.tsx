import { useState } from 'react';
import styles from './GestionPage.module.css'
import MenuSection from './MenuSection/MenuSection';
import PersonalSection from './PersonalSection/PersonalSection';
const GestionPage = () => {
    const [seccion, setSeccion] = useState<"menu" | "personal">("menu");

    return (
        <div className="row d-block m-0 p-0">
            <div className={`${styles.containerBtnSection} row d-flex`}>
                <button
                    className={
                        seccion === "menu"
                            ? styles.btnSectionSelected
                            : styles.btnSection
                    }
                    onClick={() => setSeccion("menu")}
                >
                    Menú Digital
                </button>

                <button
                    className={
                        seccion === "personal"
                            ? styles.btnSectionSelected
                            : styles.btnSection
                    }
                    onClick={() => setSeccion("personal")}
                >
                    Personal
                </button>
            </div>

            <div className='row m-0 p-0'>
                {seccion === "menu" && (
                    <MenuSection/>
                )}
                {seccion === "personal" && (
                    <PersonalSection/>
                )}
            </div>
        </div>
    );
}

export default GestionPage;