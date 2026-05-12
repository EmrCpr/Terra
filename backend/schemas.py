from pydantic import BaseModel
from typing import List

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
    critical_products: List[Product]
    delayed_order_list: List[Order]

class ChatRequest(BaseModel):
    message: str

class ChatResponse(BaseModel):
    answer: str

class ProductDescRequest(BaseModel):
    product_name: str
    category: str
    short_info: str
    price: int

class ProductDescriptionResponse(BaseModel):
    description: str
    instagram_text: str
    whatsapp_text: str

class CustomerMsgRequest(BaseModel):
    order_id: str
    message_type: str

class CustomerMessageResponse(BaseModel):
    message: str

class RootResponse(BaseModel):
    message: str
