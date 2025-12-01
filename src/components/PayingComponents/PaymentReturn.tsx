import { useEffect, useState, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { getTransactionHistory } from '../../services/payment.service';
import type { Transaction } from '../../types/api';
import './PaymentReturn.css';

const PaymentReturn = () => {
    const [status, setStatus] = useState<string | null>(null);
    const [transaction, setTransaction] = useState<Transaction | null>(null);
    const [showReceipt, setShowReceipt] = useState(false);
    const [searchParams] = useSearchParams();
    const sessionId = searchParams.get('session_id');
    const navigate = useNavigate();

    const { refreshUser } = useAuth();

    const processingRef = useRef(false);

    const handleManualRefresh = () => {
        if (refreshUser) refreshUser();
        window.dispatchEvent(new CustomEvent('userCoinsUpdated'));
    };

    const handlePrint = () => {
        window.print();
    };

    useEffect(() => {
        const verifyAndRefresh = async () => {
            if (sessionId && !processingRef.current) {
                processingRef.current = true; // Marcar como procesando para evitar dobles llamadas
                try {
                    // 1. Verificar la sesión con el backend manualmente
                    const { verifyPaymentSession } = await import('../../services/payment.service');
                    await verifyPaymentSession(sessionId);

                    // 2. Obtener la última transacción para el comprobante
                    try {
                        const history = await getTransactionHistory(1, 1);
                        if (history && history.transactions && history.transactions.length > 0) {
                            setTransaction(history.transactions[0]);
                        }
                    } catch (txError) {
                    }

                } catch (error) {
                } finally {
                    setStatus('success');

                    // 3. Actualizar datos del usuario inmediatamente
                    if (refreshUser) refreshUser();
                    window.dispatchEvent(new CustomEvent('userCoinsUpdated'));
                    setTimeout(() => {

                        if (refreshUser) refreshUser();
                        window.dispatchEvent(new CustomEvent('userCoinsUpdated'));
                    }, 3000);
                }
            }
        };

        verifyAndRefresh();
    }, [sessionId, refreshUser]);

    if (status === 'success') {
        return (
            <div className="container mt-5 text-center">
                {showReceipt && transaction ? (
                    <div className="card border-0 shadow-lg p-5 mx-auto receipt-container receipt-card">
                        <div className="text-center mb-4">
                            <h3 className="fw-bold text-uppercase receipt-title">Comprobante de Pago</h3>
                            <p className="text-muted small">ID: {transaction.id}</p>
                            <hr />
                        </div>

                        <div className="row mb-3 text-start">
                            <div className="col-6 text-muted">Fecha:</div>
                            <div className="col-6 text-end fw-bold">
                                {new Date(transaction.createdAt).toLocaleDateString()} {new Date(transaction.createdAt).toLocaleTimeString()}
                            </div>
                        </div>

                        <div className="row mb-3 text-start">
                            <div className="col-6 text-muted">Concepto:</div>
                            <div className="col-6 text-end fw-bold">{transaction.pack?.nombre || 'Compra de AstroCoins'}</div>
                        </div>

                        <div className="row mb-3 text-start">
                            <div className="col-6 text-muted">Cantidad:</div>
                            <div className="col-6 text-end fw-bold text-primary">{transaction.coins} Monedas</div>
                        </div>

                        <div className="row mb-4 text-start">
                            <div className="col-6 text-muted">Total Pagado:</div>
                            <div className="col-6 text-end fw-bold fs-5">S/. {transaction.amount.toFixed(2)}</div>
                        </div>

                        <div className="mt-4 pt-3 border-top no-print">
                            <button className="btn btn-dark w-100 mb-2" onClick={handlePrint}>
                                <i className="bi bi-printer me-2"></i> Imprimir Comprobante
                            </button>
                            <button className="btn btn-outline-secondary w-100" onClick={() => setShowReceipt(false)}>
                                Cerrar
                            </button>
                        </div>

                        <div className="mt-4 text-center small text-muted d-none d-print-block">
                            <p>Gracias por tu compra.</p>
                            <p>Este es un comprobante generado electrónicamente.</p>
                        </div>
                    </div>
                ) : (
                    <div className="card border-0 shadow-sm p-5 bg-dark text-white">
                        <div className="mb-4">
                            <i className="bi bi-check-circle-fill text-success success-icon"></i>
                        </div>
                        <h2 className="mb-3">¡Pago Exitoso!</h2>
                        <p className="lead mb-4">
                            Tus AstroCoins se han añadido a tu cuenta.
                        </p>
                        <div className="d-flex justify-content-center gap-3 flex-wrap">
                            <button
                                className="btn btn-primary btn-lg"
                                onClick={() => navigate('/payment')}
                            >
                                Volver a la Billetera
                            </button>

                            {transaction && (
                                <button
                                    className="btn btn-outline-info btn-lg"
                                    onClick={() => setShowReceipt(true)}
                                >
                                    <i className="bi bi-receipt me-2"></i>
                                    Ver Comprobante
                                </button>
                            )}

                            <button
                                className="btn btn-outline-light btn-lg"
                                onClick={handleManualRefresh}
                            >
                                <i className="bi bi-arrow-clockwise me-2"></i>
                                Actualizar Saldo
                            </button>
                        </div>
                    </div>
                )}
            </div>
        );
    }

    return null;
}

export default PaymentReturn;
