import express from "express";
import pagesRoutes from "./src/routes/pages.routes.js";
import path from "path";

const app = express();

// Middleware de archivos estáticos
app.use(express.static(path.join(process.cwd(), "src/views")));

// Rutas
app.use("/", pagesRoutes);

// Puerto
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});
