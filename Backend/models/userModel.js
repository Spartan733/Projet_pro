const { sequelize } =  require ('sequelize')
const bcrypt = require ('bcryptjs')

const userSchema = new sequelize.Schema(
    {
        name: {
            type: String,
            required: [true, 'Name is required'],
            trim: true,
        },
        email: {
            type: String,
            required: [true, 'Email is required'],
            unique: true,
            lowercase: true,
            trim: true
        },
        password: {
            type: String,
            required: [true, 'Password is required'],
            minlenght: 6,
            select: false,
        },
        role: {
            type: String,
            enum: ('admin', 'user', 'owner'),
            default: 'user'
        }
    },
    {
        timestamps: true,
    },

    userSchema.pre('save', async function(){
        if(!this.isModified('password')) return;
        const salt = await bcrypt.genSalt(10)
        this.password = await bcrypt.hash(this.password, salt)
    }),

    userSchema.methods.comparePassword = async function (enteredPassword){
        return await bcrypt.compare(enteredPassword, this.password)
    }
)
module.exports = sequelize.model('User', userSchema)