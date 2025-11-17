

# 🛒 E-Commerce Application (MEAN + Sequelize + Socket.IO)

A complete **E-Commerce backend** built using:

* **Node.js + Express.js**
* **Sequelize ORM**
* **MySQL Database**
* **JWT Authentication**
* **Socket.IO (Real-time order notifications)**
* **Modular MVC Structure**

This backend supports **User**, **Product**, **Cart**, **Order**, **Payment**, and **Real-Time Delivery Room** functionalities.

---

## 🚀 Features

### ✅ **Authentication**

* JWT-based login & signup
* Protected routes using middleware
* Role-based access (Admin / User)

### 🛍 **Product Module**

* Add / Update / Delete products
* Category filtering
* Image support
* Soft delete (optional)

### 🛒 **Cart Module**

* Add to cart
* Update cart quantity
* Remove items
* Clear cart on order placement
* Auto-calculate total price

### 📦 **Order Module**

* Place order (COD by default)
* Store order items
* Transaction safe (using Sequelize transactions)
* After order:

  * Cart auto-clears
  * Order items saved
  * Real-time notification sent to **delivery-room**

### 🔔 **Real-Time Delivery Room**

Using Socket.IO:

```js
io.to('delivery-room').emit('new-order', { ... })
```

Delivery staff instantly gets:

* Order ID
* Total Amount
* Address ID
* User Details
* Product list

---

## 📁 Project Structure

```
backend/
│── connection/
│     └── socketConn.js
│── controllers/
│     ├── authController.js
│     ├── productController.js
│     ├── cartController.js
│     └── orderController.js
│── middleware/
│     └── auth.js
│── models/
│     ├── user.js
│     ├── product.js
│     ├── cart.js
│     ├── order.js
│     ├── orderItem.js
│     └── index.js
│── routes/
│     ├── authRoutes.js
│     ├── productRoutes.js
│     ├── cartRoutes.js
│     └── orderRoutes.js
│── utils/
│     ├── error-success-res/
│     │     ├── errorRes.js
│     │     └── successRes.js
│── server.js
│── README.md
└── package.json
```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the repository

```bash
git clone <your-repo-url>
cd backend
```

### 2️⃣ Install dependencies

```bash
npm install
```

### 3️⃣ Create `.env` File

```env
PORT=5000
JWT_SECRET=your_secret_key
DB_NAME=ecommerce
DB_USER=root
DB_PASS=yourpassword
DB_HOST=localhost
```

### 4️⃣ Start MySQL Server

Create database:

```sql
CREATE DATABASE ecommerce;
```

### 5️⃣ Run migrations (if using sync)

Inside `models/index.js` ensure:

```js
sequelize.sync({ alter: true })
```

### 6️⃣ Start the server

```bash
npm start
```

---

## 🔥 Place Order API (with Transaction & Socket.IO)

### `POST /api/orders/place`

**Request Body:**

```json
{
  "addressId": 1
}
```

Real-Time event emitted:

```js
io.to('delivery-room').emit('new-order', {
  orderId,
  totalAmount,
  addressId,
  items: [...],
  user: { ... }
})
```

---

## 📡 Socket.IO Events

### Join Delivery Room

```js
socket.emit("join-room", "delivery-room");
```

### Listen for new orders

```js
socket.on("new-order", (data) => {
  console.log("New Order:", data);
});
```

---

## 🧪 Testing With Postman

### Available APIs

| Method | Endpoint             | Description   |
| ------ | -------------------- | ------------- |
| POST   | `/api/auth/register` | Register user |
| POST   | `/api/auth/login`    | Login user    |
| GET    | `/api/products`      | List products |
| POST   | `/api/products`      | Add product   |
| POST   | `/api/cart/add`      | Add to cart   |
| GET    | `/api/cart`          | Get cart      |
| POST   | `/api/orders/place`  | Place order   |

---

## 🧱 Tech Stack

| Tech       | Purpose                 |
| ---------- | ----------------------- |
| Node.js    | Runtime                 |
| Express.js | Server framework        |
| Sequelize  | ORM                     |
| MySQL      | Database                |
| Socket.IO  | Real-time notifications |
| JWT        | Auth                    |
| bcrypt     | Password hashing        |

---

## 🧑‍💻 Developer Notes

* All controllers follow a clean **service-like structure**
* Error & success responses use centralized utilities
* MySQL tables automatically sync using Sequelize
* Socket server integrated inside Express

---

## 📜 License

This project is licensed under **WorkWithShreesh**.



