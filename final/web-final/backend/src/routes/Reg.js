import User from '../models/User'
exports.Reg = async (req, res) => {
    const user_name = req.body.user_name
    const password = req.body.password
    const img_url = req.body.img_url
    const email = req.body.email
    const exist = await User.findOne({ user_name: user_name })
    if (exist) {
        const msg = 'user exists'
        // console.log('User exist');
        res.status(200).send({ message: 'error', contents: msg })
    }
    else { // add a new user if current user not exist
        // const New_User= new User({user_name:user_name,password:password})
        User.find({}, async (err, users) => {
            if (err) {
                console.log(err)
            }
            else {
                let id = users.length
                console.log(id)
                const new_user_contact = {
                    user_contact_email: (email) ? email : null,
                    user_contact_phone: null,
                    user_contact_address: null,
                    user_contact_links:{
                        ig_link: null,
                        yt_link: null,
                        tw_link: null,
                        fb_link: null,
                    }
                }
                
                let New_User;
                if (img_url == undefined) New_User = new User({ id: id, user_name: user_name, password: password, rating: 0, user_contact: new_user_contact })
                else New_User = new User({ id: id, user_name: user_name, password: password, img_url: img_url, rating: 0, user_contact: new_user_contact })
                
                try {
                    await New_User.save()
                    console.log('User created');
                    console.log(New_User) // checking
                    res.status(200).send({ message: 'success', contents: New_User });
                } catch (e) {
                    console.log("User create error", e)
                }
            }
        })
    }
}
exports.Login = async (req, res) => {
    const user_name = req.query.user_name
    const password = req.query.password
    console.log(user_name, password)
    const exist = await User.findOne({ user_name, password })
    if (exist) {
        console.log('user found');
        res.status(200).send({
            message: 'success', contents: {
                message: 'User found',
                id: exist.id
            }
        });
    }
    else {
        console.log('user dne');
        res.status(403).send({ message: 'error', contents: 'User not found' });
    }

}