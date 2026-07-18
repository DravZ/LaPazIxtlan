import {
    createContext,
    useCallback,
    useContext,
    useMemo,
    useState,
} from "react";
import NotificationModal from "../../components/notificacionModal/NotificationModal"; 

export type NotificationType =
    | "success"
    | "warning"
    | "error";

interface NotificationData {
    type: NotificationType;
    title: string;
    description: string;
    buttonText?: string;
    onClose?: () => void;
}

interface NotificationContextType {
    showNotification: (
        notification: NotificationData
    ) => void;

    hideNotification: () => void;
}

const NotificationContext =
    createContext<NotificationContextType | null>(
        null
    );

export const NotificationProvider = ({
    children,
}: {
    children: React.ReactNode;
}) => {

    const [notification, setNotification] =
        useState<NotificationData | null>(
            null
        );

    const hideNotification =
        useCallback(() => {

            if (notification?.onClose) {
                notification.onClose();
            }

            setNotification(null);

        }, [notification]);

    const showNotification =
        useCallback(
            (
                data: NotificationData
            ) => {

                setNotification({
                    buttonText: "Aceptar",
                    ...data,
                });

            },
            []
        );

    const value = useMemo(
        () => ({
            showNotification,
            hideNotification,
        }),
        [showNotification, hideNotification]
    );

    return (
        <NotificationContext.Provider
            value={value}
        >
            {children}

            <NotificationModal
                notification={notification}
                onClose={hideNotification}
            />
        </NotificationContext.Provider>
    );
};

export const useNotification = () => {

    const context =
        useContext(NotificationContext);

    if (!context) {
        throw new Error(
            "useNotification debe utilizarse dentro de un NotificationProvider"
        );
    }

    return context;
};