import express from 'express';
import cors from 'cors';
import http from 'http';
import { WebSocketServer } from 'ws';
import { PrismaClient } from '@prisma/client';

// Importa tus rutas y servicios
import authRoutes from './routes/auth.routes';
import dataRoutes from './routes/data.routes';
import userRoutes from './routes/user.routes';
import panelRoutes from './routes/panel.routes';
import paymentRoutes from './routes/payment.routes';
import internalRoutes from './routes/internal.routes';
import { handleWebSocketConnection } from './services/websocket.service';
import { authMiddleware } from './middleware/auth.middleware';
import { streamerRoleMiddleware } from './middleware/role.middleware';

const app = express();
const server = http.createServer(app);
const wss = new WebSocketServer({ server });

export const prisma = new PrismaClient();

// Middlewares globales
app.use(cors());
app.use(express.json());

// --- Rutas de API ---
app.use('/api/auth', authRoutes);
app.use('/api/data', dataRoutes);
app.use('/api/user', authMiddleware, userRoutes);
app.use('/api/panel', authMiddleware, streamerRoleMiddleware, panelRoutes);
app.use('/api/payment', authMiddleware, paymentRoutes);
app.use('/api/internal', internalRoutes); // Rutas para Nginx (on_publish, on_done)

// --- Servidor WebSocket ---
wss.on('connection', handleWebSocketConnection);

// --- Iniciar Servidorn ---
const PORT = process.env.PORT || 8081;
server.listen(PORT, () => {
  console.log(`🚀 Servidor HTTP y WebSocket corriendo en http://localhost:${PORT}`);
});