
from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI(title="ShopEasy Python API")


class Sale(BaseModel):
    name: str
    price: float
    sold: int

@app.post("/analytics")
def analytics(sales: list[Sale]):
    total_units = sum(
        item.sold for item in sales
    )

    revenue = sum(
        item.price * item.sold
        for item in sales
    )

    return {
        "total_units_sold": total_units,
        "estimated_revenue": revenue
    }
