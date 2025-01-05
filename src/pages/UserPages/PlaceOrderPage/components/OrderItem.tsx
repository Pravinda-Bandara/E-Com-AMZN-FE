import React from "react";
import { Link } from "react-router-dom";

interface CartItem {
    _id: string | undefined;  // Ensure this is a non-optional string
    name: string;
    image: any;
    slug: string;
    quantity: number;
    price: number;
}

interface OrderItemsProps {
    cartItems: CartItem[];  // cartItems should be an array of CartItem
}

export function OrderItems({ cartItems }: OrderItemsProps) {
    return (
        <div className="mb-4 p-6 bg-white rounded-lg border-1">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-gray-800">Items</h2>
                <Link
                    to="/cart"
                    className="text-sm font-medium text-blue-600 hover:text-blue-500 transition-colors"
                >
                    Edit
                </Link>
            </div>
            <div className="space-y-4">
                {cartItems.map((item) => (
                    <div key={item._id} className="flex justify-between items-center">
                        <div className="flex items-center space-x-4">
                            <img
                                src={item.image}
                                alt={item.name}
                                className="w-16 h-16 object-cover rounded-lg"
                            />
                            <Link
                                to={`/product/${item.slug}`}
                                className="text-sm font-medium text-gray-800 hover:text-gray-600 transition-colors"
                            >
                                {item.name}
                            </Link>
                        </div>
                        <div className="flex space-x-8 w-60 justify-between">
                            <div className="flex items-center space-x-2">
                                <div className="text-sm font-semibold text-gray-700">Quantity:</div>
                                <div className="text-sm font-semibold text-gray-700">{item.quantity}</div>
                            </div>
                            <div className="flex items-center space-x-2">
                                <div className="text-sm font-semibold text-gray-700">Price:</div>
                                <div className="text-sm font-semibold text-gray-700">${item.price.toFixed(2)}</div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
