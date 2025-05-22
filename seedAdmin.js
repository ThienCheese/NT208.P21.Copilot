// seedAdmin.js
require('dotenv').config();
const mongoose = require('mongoose');
const Admin = require('./models/Admin'); // Đường dẫn đến model Admin

const MONGODB_URI = process.env.MONGODB_URI;

mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(async () => {
    console.log('MongoDB Connected for seeding...');

    try {
        // Kiểm tra xem admin đã tồn tại chưa
        const existingAdmin = await Admin.findOne({ username: 'admin@gmail.com' });
        if (existingAdmin) {
            console.log('Admin user already exists.');
            mongoose.connection.close();
            return;
        }

        // Tạo admin mới
        const newAdmin = new Admin({
            username: 'admin@gmail.com', // Username bạn muốn
            password: 'password123' // Mật khẩu bạn muốn (sẽ được hash tự động bởi pre-save hook)
        });

        await newAdmin.save();
        console.log('Admin user created successfully!');

    } catch (error) {
        console.error('Error seeding admin user:', error);
    } finally {
        mongoose.connection.close();
        console.log('MongoDB connection closed.');
    }
}).catch(err => console.error('MongoDB connection error during seeding:', err));
