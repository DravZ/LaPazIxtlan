# Documentación de Endpoints

**Nota sobre Seguridad:** Los endpoints que indican **[Protegido]** requieren enviar el token JWT en los headers de la petición HTTP.
**Header requerido:** `Authorization: <tu_token_aqui>`

---

## 1. Autenticación (Auth)

### Iniciar Sesión

* **URL:** `/auth/login`
* **Método:** `POST`
* **Body (Envía):**

```json
{
  "nombre_completo": "tu_usuario",
  "password": "tu_password"
}
```

* **Respuesta Exitosa:**

```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR..."
}
```

---

## 2. Menú

*Nota: Todos los endpoints de Menú están protegidos.*

### Crear un platillo [Protegido]

* **URL:** `/menu`
* **Método:** `POST`
* **Body (Envía):**

```json
{
  "nombre": "Tacos al Pastor",
  "descripcion": "Orden de 5 tacos con piña",
  "precio": 65.00,
  "id_categoria": 1
}
```

### Obtener todos los platillos [Protegido]

* **URL:** `/menu`
* **Método:** `GET`
* **Body:** Ninguno

### Obtener el menú completo (Agrupado) [Protegido]

* **URL:** `/menu/completo`
* **Método:** `GET`
* **Body:** Ninguno

### Obtener un platillo por ID [Protegido]

* **URL:** `/menu/{id}`
* **Método:** `GET`
* **Body:** Ninguno

### Actualizar un platillo [Protegido]

* **URL:** `/menu/{id}`
* **Método:** `PATCH`
* **Body (Envía):**

```json
{
  "precio": 70.00
}
```

### Eliminar un platillo [Protegido]

* **URL:** `/menu/{id}`
* **Método:** `DELETE`
* **Body:** Ninguno

---

## 3. Categorías del Menú

### Crear categoría

* **URL:** `/categorias-menu`
* **Método:** `POST`
* **Body (Envía):**

```json
{
  "nombre": "Bebidas Calientes",
  "descripcion": "Cafés y tés"
}
```

### Obtener todas las categorías

* **URL:** `/categorias-menu`
* **Método:** `GET`
* **Body:** Ninguno

### Obtener categoría por ID

* **URL:** `/categorias-menu/{id}`
* **Método:** `GET`
* **Body:** Ninguno

### Actualizar categoría

* **URL:** `/categorias-menu/{id}`
* **Método:** `PATCH`
* **Body (Envía):**

```json
{
  "nombre": "Bebidas Frías"
}
```

### Eliminar categoría

* **URL:** `/categorias-menu/{id}`
* **Método:** `DELETE`
* **Body:** Ninguno

---

## 4. Órdenes

### Crear orden

* **URL:** `/ordenes`
* **Método:** `POST`
* **Body (Envía):**

```json
{
  "mesa": 5,
  "notas": "Sin cebolla",
  "detalles": [
    {
      "id_platillo": 2,
      "cantidad": 2
    }
  ]
}
```

### Obtener todas las órdenes

* **URL:** `/ordenes`
* **Método:** `GET`
* **Body:** Ninguno

### Obtener orden por ID

* **URL:** `/ordenes/{id}`
* **Método:** `GET`
* **Body:** Ninguno

### Actualizar estado de orden

* **URL:** `/ordenes/{id}`
* **Método:** `PATCH`
* **Body (Envía):**

```json
{
  "estado": "Completada"
}
```

### Eliminar / Cancelar orden

* **URL:** `/ordenes/{id}`
* **Método:** `DELETE`
* **Body:** Ninguno

---

## 5. Usuarios

### Crear Usuario

* **URL:** `/usuarios`
* **Método:** `POST`
* **Body (Envía):**

```json
{
  "nombre_completo": "Juan Perez",
  "password": "password123",
  "id_rol": 2
}
```

### Obtener Usuarios

* **URL:** `/usuarios`
* **Método:** `GET`
* **Body:** Ninguno

### Obtener Usuario por ID

* **URL:** `/usuarios/{id}`
* **Método:** `GET`
* **Body:** Ninguno

### Actualizar Usuario

* **URL:** `/usuarios/{id}`
* **Método:** `PATCH`
* **Body (Envía):**

### Eliminar Usuario

* **URL:** `/usuarios/{id}`
* **Método:** `DELETE`
* **Body:** Ninguno

---

## 6. Estadísticas (Exclusivo Administrador)

### Ventas del Día [Protegido]

* **URL:** `/estadisticas/ventas-hoy`
* **Método:** `GET`
* **Body:** Ninguno

### Top Platillos [Protegido]

* **URL:** `/estadisticas/top-platillos`
* **Método:** `GET`
* **Body:** Ninguno

### Ventas por Método de Pago [ Protegido]

* **URL:** `/estadisticas/ventas-metodo`
* **Método:** `GET`
* **Body:** Ninguno
