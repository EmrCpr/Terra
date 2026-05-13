from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from ai_service import chat, customer_message, product_description
from mock_data import orders, products
from schemas import (
    ChatRequest,
    ChatResponse,
    CustomerMsgRequest,
    CustomerMessageResponse,
    Dashboard,
    Order,
    Product,
    ProductDescRequest,
    ProductDescriptionResponse,
    RootResponse,
)

app = FastAPI(title="Terra API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://127.0.0.1:3000",
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/", response_model=RootResponse)
def root():
    return {"message": "Terra API is running"}

@app.get("/products", response_model=list[Product])
def get_products():
    return products

@app.get("/orders", response_model=list[Order])
def get_orders():
    return orders

@app.get("/dashboard", response_model=Dashboard)
def get_dashboard():
    total_products = len(products)
    total_orders = len(orders)
    pending_orders = len([o for o in orders if o["status"] == "pending"])
    shipped_orders = len([o for o in orders if o["status"] == "shipped"])
    delayed_orders = len([o for o in orders if o["status"] == "delayed"])
    critical_products = [p for p in products if p["stock"] <= p["criticalStockThreshold"]]
    delayed_order_list = [o for o in orders if o["status"] == "delayed"]

    return {
        "total_products": total_products,
        "total_orders": total_orders,
        "pending_orders": pending_orders,
        "shipped_orders": shipped_orders,
        "delayed_orders": delayed_orders,
        "critical_stock_count": len(critical_products),
        "critical_products": critical_products,
        "delayed_order_list": delayed_order_list,
    }

@app.post("/ai/chat", response_model=ChatResponse)
def ai_chat(request: ChatRequest):
    return chat(request.message)

@app.post("/ai/product-description", response_model=ProductDescriptionResponse)
def ai_product_desc(request: ProductDescRequest):
    return product_description(
        request.product_name,
        request.category,
        request.short_info,
        request.price,
    )

@app.post("/ai/customer-message", response_model=CustomerMessageResponse)
def ai_customer_msg(request: CustomerMsgRequest):
    return customer_message(request.order_id, request.message_type)
