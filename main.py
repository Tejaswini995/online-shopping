
from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI(title="ShopEasy Python API")

products = [
    {
        "name": "Headphones",
        "category": "Electronics",
        "price": 1499
    },
    {
        "name": "Smart Watch",
        "category": "Electronics",
        "price": 2499
    },
    {
        "name": "Backpack",
        "category": "Fashion",
        "price": 899
    }
]

@app.get("/")
def home():
    return {"message": "Python API running"}

@app.get("/recommendations")
def recommend(
    category: str = "Electronics",
    max_price: float = 3000
):
    results = [
        product
        for product in products
        if product["category"].lower()
           == category.lower()
        and product["price"] <= max_price
    ]

    return {"recommendations": results}
# Analytics API

class Sale(BaseModel):
    name: str
    price: float
    sold: int


@app.post("/analytics")
def analytics(sales: list[Sale]):

    total_units = sum(item.sold for item in sales)

    revenue = sum(
        item.price * item.sold
        for item in sales
    )

    return {
        "total_units_sold": total_units,
        "estimated_revenue": revenue
    }