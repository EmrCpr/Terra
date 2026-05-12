products = [
    {"id": 1, "name": "Hatay Usulü Biber Salçası", "category": "Gıda", "short_info": "Katkısız, geleneksel yöntemlerle üretilmiş acı biber salçası", "price": 180, "stock": 5},
    {"id": 2, "name": "Nar Ekşisi", "category": "Gıda", "short_info": "Doğal narlardan elde edilen geleneksel ekşi", "price": 120, "stock": 10},
    {"id": 3, "name": "Defne Sabunu", "category": "Kişisel Bakım", "short_info": "Defne yaprağı özlü doğal sabun", "price": 50, "stock": 2},
    {"id": 4, "name": "El Yapımı Reçel", "category": "Gıda", "short_info": "Meyve bahçelerinden toplanan meyvelerle yapılan reçel", "price": 90, "stock": 15},
    {"id": 5, "name": "Zeytinyağı", "category": "Gıda", "short_info": "Soğuk sıkım zeytinyağı", "price": 200, "stock": 8},
    {"id": 6, "name": "Baharat Paketi", "category": "Gıda", "short_info": "Geleneksel baharat karışımı", "price": 70, "stock": 12},
]

orders = [
    {"id": 1, "customer_name": "Ayşe Yılmaz", "products": [1, 2], "status": "shipped", "order_date": "2023-10-01"},
    {"id": 2, "customer_name": "Fatma Kaya", "products": [3], "status": "pending", "order_date": "2023-10-02"},
    {"id": 3, "customer_name": "Emine Demir", "products": [4, 5], "status": "delayed", "order_date": "2023-09-28"},
    {"id": 4, "customer_name": "Zeynep Çelik", "products": [6], "status": "shipped", "order_date": "2023-10-03"},
    {"id": 5, "customer_name": "Hatice Aydın", "products": [1, 3], "status": "pending", "order_date": "2023-10-04"},
    {"id": 6, "customer_name": "Nurcan Öz", "products": [2, 4], "status": "delayed", "order_date": "2023-09-30"},
]