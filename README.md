# Terra Koop

### Takım 294 - Yapay Zeka 5. Dönem

Terra Koop, kadın kooperatiflerinin dijital operasyon süreçlerini daha verimli yönetebilmesi için geliştirilen yapay zeka destekli bir kooperatif yönetim platformudur.

Özellikle deprem sonrası üretim ve satış süreçlerinde dijitalleşme ihtiyacının arttığı kadın kooperatifleri için; stok takibi, sipariş yönetimi, müşteri iletişimi ve içerik üretimi süreçlerini tek merkezden yönetilebilir hale getirmeyi amaçlamaktadır.

---

# Proje Amacı

Kadın kooperatifleri çoğu zaman üretim süreçlerine odaklanırken;

* stok takibi,
* sipariş yönetimi,
* müşteri bilgilendirmeleri,
* sosyal medya içerik üretimi

gibi operasyonel süreçlerde ciddi zaman kaybı yaşayabilmektedir.

Terra Koop, bu süreçleri sadeleştirerek kooperatiflerin dijital dönüşümünü desteklemek amacıyla geliştirilmiştir.

---

# Öne Çıkan Özellikler

## Yapay Zeka Destekli Dashboard

Sistem, mevcut sipariş ve stok verilerini analiz ederek kullanıcıya öneriler sunar.

Örnek:

* Kritik stok uyarıları
* Ön plana çıkarılabilecek ürün önerileri
* Operasyonel bilgilendirmeler

---

## Akıllı Stok Yönetimi

* Ürün listeleme
* Kritik stok kontrolü
* Stok durum takibi
* Ürün kategorilendirme

---

## Sipariş Yönetimi

* Sipariş görüntüleme
* Sipariş durum takibi
* Geciken sipariş kontrolü
* Toplam sipariş analizi

---

## AI Destekli Müşteri Mesajları

Sistem; geciken siparişler veya bilgilendirme süreçleri için müşterilere gönderilebilecek mesajları otomatik olarak oluşturabilir.

---

## İçerik Sihirbazı

Ürün bilgilerine göre:

* ürün açıklaması,
* Instagram gönderi metni,
* WhatsApp tanıtım mesajı

otomatik olarak oluşturulabilir.

---

# Kullanılan Teknolojiler

## Backend

* Python
* FastAPI
* Gemini API
* Uvicorn

## Frontend

* React
* Vite
* JavaScript
* CSS

---

# Sistem Mimarisi

```text
Frontend (React/Vite)
        ↓
Backend API (FastAPI)
        ↓
Gemini AI Servisi
```

Tüm yapay zeka işlemleri backend üzerinden gerçekleştirilmektedir.

---

# Kurulum Adımları

## Backend

```bash
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

`.env` dosyası oluşturun:

```env
GEMINI_API_KEY=YOUR_API_KEY
```

Backend'i çalıştırın:

```bash
uvicorn main:app --reload
```

---

## Frontend

```bash
cd frontend
npm install
npm run dev
```

---

# API Endpointleri

## Dashboard

```http
GET /dashboard
```

## Ürünler

```http
GET /products
```

## Siparişler

```http
GET /orders
```

## AI Chat

```http
POST /ai/chat
```

## AI İçerik Üretimi

```http
POST /ai/product-description
```

## AI Müşteri Mesajı

```http
POST /ai/customer-message
```

---

# Proje Vizyonu

Terra Koop’un hedefi; yerel üreticilerin ve kadın kooperatiflerinin dijital araçlara daha kolay erişebilmesini sağlayarak üretim süreçlerini desteklemek ve operasyonel yüklerini azaltmaktır.

Uzun vadede farklı kooperatif yapılarına uyarlanabilir, ölçeklenebilir ve erişilebilir bir dijital yönetim platformu haline gelmesi hedeflenmektedir.

---

# Takım

Takım 294 - Yapay Zeka 5. Dönem

* Backend & AI Development
* Frontend Development
* UI/UX & Product Design

---

# Not

Bu proje hackathon süreci kapsamında geliştirilmiştir.
