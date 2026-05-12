from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List
from mock_data import products, orders
from ai_service import chat, product_description, customer_message

class Product(BaseModel):
    id: int
    name: str
    category: str
    short_info: str
    price: int
    stock: int

class Order(BaseModel):
    id: int
    customer_name: str
    products: List[int]
    status: str
    order_date: str

class Dashboard(BaseModel):
    total_products: int
    total_orders: int
    pending_orders: int
    shipped_orders: int
    delayed_orders: int
    critical_stock_count: int
    critical_products: List[dict]
    delayed_order_list: List[dict]

class ChatRequest(BaseModel):
    message: str

class ProductDescRequest(BaseModel):
    product_name: str
    category: str
    short_info: str
    price: int

class CustomerMsgRequest(BaseModel):
    order_id: int
    message_type: str

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {"message": "Terra API is running"}

@app.get("/products")
def get_products():
    return products

@app.get("/orders")
def get_orders():
    return orders

@app.get("/dashboard")
def get_dashboard():
    total_products = len(products)
    total_orders = len(orders)
    pending_orders = len([o for o in orders if o["status"] == "pending"])
    shipped_orders = len([o for o in orders if o["status"] == "shipped"])
    delayed_orders = len([o for o in orders if o["status"] == "delayed"])
    critical_stock_count = len([p for p in products if p["stock"] < 5])
    critical_products = [p for p in products if p["stock"] < 5]
    delayed_order_list = [o for o in orders if o["status"] == "delayed"]
    return {
        "total_products": total_products,
        "total_orders": total_orders,
        "pending_orders": pending_orders,
        "shipped_orders": shipped_orders,
        "delayed_orders": delayed_orders,
        "critical_stock_count": critical_stock_count,
        "critical_products": critical_products,
        "delayed_order_list": delayed_order_list,
    }

@app.post("/ai/chat")
def ai_chat(request: ChatRequest):
    return chat(request.message)

@app.post("/ai/product-description")
def ai_product_desc(request: ProductDescRequest):
    return product_description(request.product_name, request.category, request.short_info, request.price)

@app.post("/ai/customer-message")
def ai_customer_msg(request: CustomerMsgRequest):
    return customer_message(request.order_id, request.message_type)