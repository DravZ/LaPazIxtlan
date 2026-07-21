import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, LogIn, HelpCircle } from 'lucide-react';
import styles from './LoginPage.module.css';
import { login } from '../../controllers/auth.controller';
import axios from 'axios';
import { useNotification } from '../../context/notifications/NotificationContext';

export const LoginPage: React.FC = () => {
    const [usuario, setUsuario] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [showPassword, setShowPassword] = useState<boolean>(false);

    const { showNotification } = useNotification();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const res = await login({
                username: usuario,
                password: password,
            });

            showNotification({
                type: "success",
                title: "Bienvenido!",
                description: `Sesión inciada correctamente`,
            });

            console.log(res);
        } catch (error) {
            if (axios.isAxiosError(error)) {
                if (error.response?.status === 401) {
                    showNotification({
                        type: "error",
                        title: "Credenciales Incorrectas",
                        description: `Ingrese su usuario y contraseña.`,
                    });
                } else {

                    showNotification({
                        type: "error",
                        title: "Error",
                        description: error.response?.data,
                    });

                }
            } else {
                showNotification({
                    type: "error",
                    title: "Error",
                    description: `${error}`,
                });
            }
        }
    };

    return (
        <div className={styles.pageContainer}>
            {/* Contenedor Principal Centralizado */}
            <div className={styles.loginWrapper}>

                {/* Header con Logo y Título del Restaurante */}
                <div className={styles.brandHeader}>
                    <div className={styles.logoBadge}>LP</div>
                    <span className={styles.brandSub}>RESTAURANTE</span>
                    <h1 className={styles.brandTitle}>La Paz Ixtlan</h1>
                </div>

                {/* Tarjeta Formulario */}
                <div className={styles.card}>
                    <div className={styles.cardHeader}>
                        <h2 className={styles.cardTitle}>Iniciar Sesión</h2>
                        <p className={styles.cardSubtitle}>Ingresa tus credenciales para continuar</p>
                    </div>

                    <form onSubmit={handleSubmit} className={styles.form}>
                        {/* Input Usuario / Email */}
                        <div className={styles.inputGroup}>
                            <label className={styles.label}>USUARIO</label>
                            <div className={styles.inputWrapper}>
                                <Mail className={styles.inputIcon} size={18} />
                                <input
                                    type="text"
                                    className={styles.input}
                                    placeholder="User_Example"
                                    value={usuario}
                                    onChange={(e) => setUsuario(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        {/* Input Contraseña */}
                        <div className={styles.inputGroup}>
                            <label className={styles.label}>CONTRASEÑA</label>
                            <div className={styles.inputWrapper}>
                                <Lock className={styles.inputIcon} size={18} />
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    className={styles.input}
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                                <button
                                    type="button"
                                    className={styles.togglePasswordBtn}
                                    onClick={() => setShowPassword(!showPassword)}
                                    tabIndex={-1}
                                >
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                        </div>

                        {/* Botón Iniciar Sesión */}
                        <button type="submit" className={styles.submitBtn}>
                            <LogIn size={18} />
                            Iniciar Sesión
                        </button>
                    </form>
                </div>
            </div>

            {/* Botón flotante de ayuda inferior derecho */}
            <button className={styles.helpFloatingBtn} title="Ayuda">
                <HelpCircle size={20} />
            </button>
        </div>
    );
};