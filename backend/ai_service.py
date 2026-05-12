import os
from dotenv import load_dotenv

load_dotenv()

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

# Daha sonra Gemini entegrasyonu için

def chat(message: str) -> dict:
    # Mock response
    return {"answer": f"Mock AI response to: {message}"}

def product_description(product_name: str, category: str, short_info: str, price: int) -> dict:
    # Mock
    description = f"{product_name} - {category}. {short_info}. Fiyat: {price} TL."
    instagram_text = f"✨ Yeni ürünümüz: {product_name}! {short_info} #KadınKooperatifi"
    whatsapp_text = f"Merhaba! {product_name} ürünümüz hakkında bilgi almak ister misiniz? {short_info} Fiyat: {price} TL."
    return {"description": description, "instagram_text": instagram_text, "whatsapp_text": whatsapp_text}

def customer_message(order_id: int, message_type: str) -> dict:
    # Mock
    if message_type == "cargo_delay":
        message = f"Sayın müşteri, {order_id} numaralı siparişinizde kargo gecikmesi yaşanmaktadır. En kısa sürede bilgilendirileceksiniz."
    else:
        message = f"Genel mesaj için {order_id} siparişi."
    return {"message": message}