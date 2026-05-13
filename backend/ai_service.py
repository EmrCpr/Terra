import json
import os
from pathlib import Path
from dotenv import load_dotenv
from fastapi import HTTPException
import google.generativeai as genai
from mock_data import orders, products

BASE_DIR = Path(__file__).resolve().parent
load_dotenv(BASE_DIR / ".env")

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
GEMINI_MODEL = "gemini-3.1-flash-lite-preview"


def configure_gemini() -> None:
    if not GEMINI_API_KEY:
        raise HTTPException(
            status_code=500,
            detail="GEMINI_API_KEY ayarlanmadı. .env dosyanıza anahtarınızı ekleyin ve uygulamayı yeniden başlatın.",
        )
    genai.configure(api_key=GEMINI_API_KEY)


def create_gemini_response(prompt: str) -> str:
    configure_gemini()
    try:
        model = genai.GenerativeModel(GEMINI_MODEL)
        chat = model.start_chat()
        response = chat.send_message(prompt)
        return response.text.strip()
    except Exception as exc:
        raise HTTPException(
            status_code=502,
            detail=f"Gemini API çağrısı sırasında bir hata oluştu: {exc}",
        )


def parse_json_response(text: str) -> dict:
    try:
        return json.loads(text)
    except json.JSONDecodeError as exc:
        raise HTTPException(
            status_code=502,
            detail=f"Gemini yanıtı geçerli JSON değil: {exc}. Yanıt: {text}",
        )


def _chat_context() -> str:
    products_json = json.dumps(products, ensure_ascii=False, indent=2)
    orders_json = json.dumps(orders, ensure_ascii=False, indent=2)
    
    return (
        "Senin rolün Terra, kadın kooperatifleri için dijital satış ve operasyon asistanıdır.\n"
        "Müşteriye sadece aşağıdaki veriye dayanan ve doğru bilgi üretecek şekilde cevap ver.\n"
        "Veriyi uydurma, eğer bilgi yoksa 'Sistemimizde bu bilgiyle kayıt bulamadım' de.\n\n"
        "ÜRÜNLER VERİSİ:\n"
        f"{products_json}\n\n"
        "SİPARİŞLER VERİSİ:\n"
        f"{orders_json}\n\n"
        "KURALLAR:\n"
        "- Kullanıcı sipariş numarası soruyorsa, orders içinde id, order_no alanlarını ara.\n"
        "- '128 numaralı sipariş', 'Sipariş 1', 'SIP-3' gibi formatları tanı.\n"
        "- Ürün sorusu varsa products içinde ada göre ara.\n"
        "- Her zaman Türkçe, kısa ve profesyonel cevap ver.\n"
        "- Kadın kooperatifi müşterilerine saygılı ve nazik bir ton kullan.\n"
        "- Teknik durum terimlerini Türkçeye çevir: pending → hazırlanıyor, shipped → kargoya verildi, delayed → gecikmede.\n"
        "- Eğer bu terimleri kullanırsan, İngilizce olanı parantez içinde ekle."
    )


def _normalize_status_terms(text: str) -> str:
    import re

    replacements = {
        r"\bpending\b": "hazırlanıyor (pending)",
        r"\bshipped\b": "kargoya verildi (shipped)",
        r"\bdelayed\b": "gecikmede (delayed)",
    }
    result = text
    for pattern, replacement in replacements.items():
        result = re.sub(pattern, replacement, result, flags=re.IGNORECASE)
    return result


def chat(message: str) -> dict:
    system_context = _chat_context()
    
    prompt = (
        system_context
        + "\n\n"
        + f"Müşteri sorusu: {message}\n\n"
        + "Sadece verilen veriyi kullanarak ve yukarıdaki kuralları takip ederek net bir cevap ver."
    )
    answer = create_gemini_response(prompt)
    answer = _normalize_status_terms(answer)
    return {"answer": answer}


def product_description(product_name: str, category: str, short_info: str, price: int) -> dict:
    prompt = (
        "Sen Terra için ürün açıklaması hazırlayan bir asistansın."
        " Kadın kooperatifleri, yerel üretim ve doğal ürünler bağlamında etkileyici bir metin oluştur."
        f"\nÜrün: {product_name}"
        f"\nKategori: {category}"
        f"\nKısa bilgi: {short_info}"
        f"\nFiyat: {price} TL"
        "\n\nLütfen sadece aşağıdaki JSON formatında yanıt ver:\n"
        '{"description": "<ürün açıklaması>", "instagram_text": "<instagram metni>", "whatsapp_text": "<whatsapp mesajı>"}'
    )

    response_text = create_gemini_response(prompt)
    result = parse_json_response(response_text)
    return {
        "description": result.get("description", ""),
        "instagram_text": result.get("instagram_text", ""),
        "whatsapp_text": result.get("whatsapp_text", ""),
    }


def _find_order_by_id(order_id: str) -> dict | None:
    """Farklı order_id formatlarından (SIP-1004, 1004, 1004 int) sipariş bulur."""
    import re
    
    # Önce order_no ile tam eşleşme dene
    order = next((item for item in orders if item.get("order_no") == order_id), None)
    if order:
        return order
    
    # String içinden sayıları çıkar (SIP-1004 → 1004, 1004 → 1004)
    match = re.search(r'\d+', str(order_id))
    if match:
        order_num = int(match.group())
        return next((item for item in orders if item["id"] == order_num), None)
    
    return None


def customer_message(order_id: str, message_type: str) -> dict:
    order = _find_order_by_id(order_id)
    
    if not order:
        return {"message": f"Bu sipariş numarasıyla kayıt bulunamadı: {order_id}"}
    
    # Siparişteki ürünlerin detaylarını bul
    order_products = [p for p in products if p["id"] in order["products"]]
    
    order_data = {
        "id": order["id"],
        "order_no": order["order_no"],
        "customer_name": order["customer_name"],
        "status": order["status"],
        "order_date": order["order_date"],
        "total_price": order["total_price"],
        "products": order_products,
    }
    
    order_json = json.dumps(order_data, ensure_ascii=False, indent=2)
    
    prompt = (
        "Sen Terra kadın kooperatifleri müşteri hizmetleri asistanısın.\n"
        "Aşağıda verilen sipariş bilgisine dayarak müşteriye profesyonel ve nazik bir cevap oluştur.\n\n"
        "KURALLAR:\n"
        "- 'Sistem hatası', 'ulaşamıyoruz', 'kontrol edemiyoruz' gibi olumsuz ifadeler KULLANMA.\n"
        "- Mevcut sipariş durumuna (status) göre müşteri mesajı oluştur:\n"
        "  * Durum 'delayed' ise: Gecikme nedeniyle özür dile ve kargo şirketinden takip ettiklerini söyle.\n"
        "  * Durum 'pending' ise: Siparişin hazırlanmakta olduğunu ve kısa sürede çıkacağını söyle.\n"
        "  * Durum 'shipped' ise: Kargo kodu veya adrese gönderildiğini söyle.\n"
        "- Müşteri ismini (CUSTOMER_NAME) uygun yerde kullan.\n"
        "- Kısa, açık ve samimi bir ton kullan.\n"
        "- Sadece aşağıdaki JSON formatında yanıt ver:\n"
        '{"message": "<müşteri mesajı>"}\n\n'
        f"SİPARİŞ BİLGİSİ:\n{order_json}\n\n"
        f"CUSTOMER_NAME: {order['customer_name']}\n"
        f"MESSAGE_TYPE: {message_type}"
    )
    
    response_text = create_gemini_response(prompt)
    result = parse_json_response(response_text)
    return {"message": result.get("message", "")}

