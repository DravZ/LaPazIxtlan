import { LogOut } from "lucide-react";
import styles from './LogOutBtn.module.css'
import { clearSession } from "../../services/session.service";
import { useNavigate } from "react-router-dom";

function LogOutBtn() {
    const navigate = useNavigate();
    return (
        <div className={styles.btn}>
            <LogOut size={20}
                onClick={() => {
                    clearSession();
                    navigate("/login");
                }}
            />
        </div>
    );
}

export default LogOutBtn;