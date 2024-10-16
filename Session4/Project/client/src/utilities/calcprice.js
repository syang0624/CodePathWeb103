export const calculatePrice = (basePrice, options) => {
    let totalPrice = basePrice;
    options.forEach((option) => {
        totalPrice += option.price;
    });
    return totalPrice;
};
