const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];


const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 300; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            //YOUR USER ID
            author: '631c2c01e0ee8b24b8f58bf0',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam dolores vero perferendis laudantium, consequuntur voluptatibus nulla architecto, sit soluta esse iure sed labore ipsam a cum nihil atque molestiae deserunt!',
            price,
            geometry: { 
                type: 'Point', 
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude,
                ] 
            },
            images: [
                {
                    url: 'https://res.cloudinary.com/dmith7lnk/image/upload/v1663673960/YelpCamp/q2glpklvgzpxzbx9yqcx.jpg',
                    filename: 'YelpCamp/q2glpklvgzpxzbx9yqcx'
                  },
                  {
                    url: 'https://res.cloudinary.com/dmith7lnk/image/upload/v1663673960/YelpCamp/cgmqnxbp9ancuuvr6ihn.jpg',
                    filename: 'YelpCamp/cgmqnxbp9ancuuvr6ihn'
                  }
                ],
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})