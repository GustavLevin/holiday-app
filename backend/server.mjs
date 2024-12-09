import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

// JSON-server URL (din mock-server)
const JSON_SERVER_URL = 'http://localhost:5021';

// Lägg till en varukorg som hämtas från JSON-server
// Varukorgen hanteras direkt via json-server i products.json

// Hämta alla produkter
app.get('/products', async (req, res) => {
  try {
    const response = await fetch(`${JSON_SERVER_URL}/products`);
    if (response.ok) {
      const products = await response.json();
      res.status(200).json(products);
    } else {
      res.status(response.status).json({ error: 'Failed to fetch products' });
    }
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Hämta en specifik produkt
app.get('/products/:id', async (req, res) => {
  try {
    const response = await fetch(
      `${JSON_SERVER_URL}/products/${req.params.id}`
    );
    if (response.ok) {
      const product = await response.json();
      res.status(200).json(product);
    } else {
      res.status(404).json({ error: 'Product not found' });
    }
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Lägg till en produkt i varukorgen
app.post('/cart', async (req, res) => {
  const product = req.body;

  try {
    // Hämta befintlig varukorg från json-server
    const cartResponse = await fetch(`${JSON_SERVER_URL}/cart`);
    const cart = await cartResponse.json();

    // Kontrollera om produkten redan finns i varukorgen
    const existingProduct = cart.find((item) => item.id === product.id);

    if (existingProduct) {
      // Uppdatera kvantiteten om produkten redan finns
      existingProduct.quantity += 1;

      await fetch(`${JSON_SERVER_URL}/cart/${existingProduct.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(existingProduct),
      });
    } else {
      // Lägg till ny produkt med kvantitet 1
      const newProduct = { ...product, quantity: 1 };

      await fetch(`${JSON_SERVER_URL}/cart`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newProduct),
      });
    }

    // Skicka uppdaterad varukorg tillbaka
    const updatedCartResponse = await fetch(`${JSON_SERVER_URL}/cart`);
    const updatedCart = await updatedCartResponse.json();

    res.status(201).json({ success: true, cart: updatedCart });
  } catch (error) {
    console.error('Error adding product to cart:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Hämta varukorgen
app.get('/cart', async (req, res) => {
  try {
    const response = await fetch(`${JSON_SERVER_URL}/cart`);
    if (response.ok) {
      const cart = await response.json();
      res.status(200).json(cart);
    } else {
      res.status(response.status).json({ error: 'Failed to fetch cart' });
    }
  } catch (error) {
    console.error('Error fetching cart:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Ta bort en produkt från varukorgen
app.delete('/cart/:id', async (req, res) => {
  try {
    const response = await fetch(`${JSON_SERVER_URL}/cart/${req.params.id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      const updatedCartResponse = await fetch(`${JSON_SERVER_URL}/cart`);
      const updatedCart = await updatedCartResponse.json();
      res.status(200).json({ success: true, cart: updatedCart });
    } else {
      res
        .status(response.status)
        .json({ error: 'Failed to delete product from cart' });
    }
  } catch (error) {
    console.error('Error deleting product from cart:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.put('/cart/:id', async (req, res) => {
  try {
    const productId = req.params.id;
    const updatedProduct = req.body;

    // Uppdatera produkten i varukorgen
    cart = cart.map((item) =>
      item.id === productId ? { ...item, ...updatedProduct } : item
    );

    res.status(200).json({ success: true, cart });
  } catch (error) {
    console.error('Error updating cart:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Starta servern
app.listen(5020, () => {
  console.log('Server running on http://localhost:5020');
});
