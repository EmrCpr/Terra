products = [
    {"id": 1, "name": "Hakiki Nar Ekşisi (500ml)", "category": "Gıda", "short_info": "Doğal narlardan elde edilen geleneksel ekşi", "price": 180, "stock": 45, "criticalStockThreshold": 10},
    {"id": 2, "name": "Geleneksel Defne Sabunu", "category": "Kozmetik", "short_info": "Defne yaprağı özlü doğal sabun", "price": 65, "stock": 8, "criticalStockThreshold": 15},
    {"id": 3, "name": "Kahvaltılık Zahter", "category": "Gıda", "short_info": "Geleneksel kahvaltı baharatı", "price": 120, "stock": 32, "criticalStockThreshold": 10},
    {"id": 4, "name": "Kurutulmuş Biber (1kg)", "category": "Gıda", "short_info": "Katkısız, geleneksel yöntemlerle kurutulmuş acı biber", "price": 210, "stock": 5, "criticalStockThreshold": 20},
    {"id": 5, "name": "El İşlemesi Bez Çanta", "category": "Tekstil", "short_info": "El işi bez çanta", "price": 150, "stock": 18, "criticalStockThreshold": 5},
]

orders = [
    {"id": 1, "order_no": "SIP-1001", "customer_name": "Ahmet Yılmaz", "products": [1, 3], "status": "pending", "order_date": "2023-10-01", "total_price": 850},
    {"id": 2, "order_no": "SIP-1002", "customer_name": "Ayşe Kaya", "products": [2], "status": "shipped", "order_date": "2023-10-02", "total_price": 320},
    {"id": 3, "order_no": "SIP-1003", "customer_name": "Mehmet Demir", "products": [4, 5], "status": "delayed", "order_date": "2023-09-28", "total_price": 1200},
    {"id": 4, "order_no": "SIP-1004", "customer_name": "Elif Can", "products": [1, 2], "status": "delayed", "order_date": "2023-10-03", "total_price": 450},
    {"id": 5, "order_no": "SIP-1005", "customer_name": "Zeynep Şahin", "products": [3], "status": "shipped", "order_date": "2023-10-04", "total_price": 180},
]