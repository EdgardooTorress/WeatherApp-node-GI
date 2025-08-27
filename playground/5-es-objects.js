
const name = 'Edgardo'
const userAge = 27

const user = {
    name: name,
    age:userAge,
    location: 'Charlotte'
}

console.log(user)


// Onject destructuing

const product= {
    label: 'Red notebook',
    price: 3,
    stock: 201,
    salePrice: undefined
}

// const label = product.label
        //renaming label
const {label:productLabel, stock,rating = 5} = product


console.log(stock)
console.log(rating)
console.log(productLabel)


const trasnaction = (type, {label, stock}) => {
    console.log(type, label, stock)
}

trasnaction('order', product)