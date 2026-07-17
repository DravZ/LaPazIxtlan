import { useEffect } from "react";
import { AlertTriangle, Check, X } from "lucide-react";
import styles from "./NotificationModal.module.css";

interface NotificationData {
    type: "success" | "warning" | "error";
    title: string;
    description: string;
    buttonText?: string;
    onClose?: () => void;
}

interface Props {
    notification: NotificationData | null;
    onClose: () => void;
}

const NotificationModal = ({
    notification,
    onClose,
}: Props) => {

    useEffect(() => {

        if (!notification) return;

        const handleKeyDown = (e: KeyboardEvent) => {

            if (e.key === "Escape") {
                onClose();
            }

        };

        window.addEventListener("keydown", handleKeyDown);

        return () =>
            window.removeEventListener(
                "keydown",
                handleKeyDown
            );

    }, [notification, onClose]);

    if (!notification) return null;

    const renderIcon = () => {

        switch (notification.type) {

            case "success":
                return (
                    <div
                        className={`${styles.iconCircle} ${styles.success}`}
                    >
                        <Check
                            size={42}
                            className={styles.icon}
                        />
                    </div>
                );

            case "warning":
                return (
                    <div
                        className={`${styles.iconCircle} ${styles.warning}`}
                    >
                        <AlertTriangle
                            size={42}
                            className={styles.icon}
                        />
                    </div>
                );

            case "error":
                return (
                    <div
                        className={`${styles.iconCircle} ${styles.error}`}
                    >
                        <X
                            size={42}
                            className={styles.icon}
                        />
                    </div>
                );

        }

    };

    return (
        <div
            className={styles.overlay}
            onClick={onClose}
        >
            <div
                className={styles.modal}
                onClick={(e) =>
                    e.stopPropagation()
                }
            >

                {renderIcon()}

                <h2 className={styles.title}>
                    {notification.title}
                </h2>

                <p className={styles.description}>
                    {notification.description}
                </p>

                <button
                    className={styles.button}
                    onClick={onClose}
                >
                    {notification.buttonText}
                </button>

            </div>
        </div>
    );

};

export default NotificationModal;