const jwt = require('jsonwebtoken')
const { findUserByEmail, createUser, findUserById, updateUser } = require('../models/userModel')
const bcrypt = require('bcryptjs')
const validator = require('validator')
const supabase = require("../services/supabaseStorage");
const crypto = require("crypto");

const JWT_SECRET = process.env.JWT_SECRET
const JWT_EXPIRES_IN = '364d'

const generateToken = (id) => {
    const secret =process.env.JWT_SECRET;

    if (!secret) {
        throw new Error("JWT_SECRET est manquant dans le fichier .env")
    }

    return jwt.sign(
        { id },
        secret,
        { expiresIn: JWT_EXPIRES_IN}
    );
    // return jwt.sign({ id }, JWT_SECRET, {
    //     expiresIn: JWT_EXPIRES_IN
    // })
    
}

const register = async (req, res) => {
    try {
        const { name, email, password } = req.body

        if (!name || !email || !password) {
            return res.status(400).json({ message: 'Please, provide a name, an email and a password' })
        }

        const isPasswordOk = validator.isStrongPassword(password, {
            minLength: 6,
            minLowercase: 1,
            minUppercase: 1,
            minNumbers: 1,
            minSymbols: 1
        })

        if (!isPasswordOk) {
            return res.status(400).json({ message: 'Password must have 1 lower, 1 upper, 1 number and 1 symbol and must be at least 6 characters long' })
        }

        const isEmailOk = validator.isEmail(email)

        if (!isEmailOk) {
            return res.status(400).json({ message: 'You must provide a valid email' })
        }

        const existingUser = await findUserByEmail(email)
        if (existingUser) {
            return res.status(400).json({ message: 'Email already used' })
        }

        const user = await createUser({ name, email, password })

        const token = generateToken(user.id)

        res.status(201).json({
            message: 'User registered successfully',
            token,
            user: {
                id: user.id,
                name: user.username,
                email: user.email
            }
        })

    } catch (err) {
        res.status(500).json({ message: 'Server error during registration', error: err.message })
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body

        if (!email || !password) {
            return res.status(400).json({message: 'Invalid username or password'})
        }
        
        // Get user from token payload
        const user = await findUserByEmail( email )
        if(!user){
            return res.status(401).json({ message: 'Invalid credentials'})
        }

        //Verifie if password is match
        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch){
            return res.status(401).json({ message: 'Login and/or password incorect'})
        }
        const token =  generateToken(user.id)

        res.status(200).json({
            message: 'Login succesfully',
            token,
            user: {
                id: user.id,
                name: user.username,
                email: user.email,
                role: user.role
            }
        })

    // } catch (err) {
    //     res.status(500).json({ message : 'Error during connection', error: err.message})
    // }
    } catch (err) {
    console.error("ERREUR LOGIN :", err);

    res.status(500).json({
        message: "Error during connection"
    });
}
}


const getProfile = async (req, res) => {
  try {
    const user = await findUserById(req.user.id);

    if (!user) {
      return res.status(404).json({
        message: "Utilisateur introuvable"
      });
    }

    res.status(200).json({
      id: user.id,
      name: user.username,
      email: user.email,
      role: user.role,
      city: user.city_user,
      description: user.description_user,
      avatar_url: user.avatar_url
    });

  } catch (error) {
    console.error("ERREUR PROFIL :", error);

    res.status(500).json({
      message: "Erreur lors du chargement du profil"
    });
  }
};


const updateProfile = async (req, res) => {
  try {
    const user = await findUserById(req.user.id);

    if (!user) {
      return res.status(404).json({
        message: "Utilisateur introuvable"
      });
    }

    const { name, email, city, description } = req.body;

    if (
      typeof name !== "string" ||
      typeof email !== "string" ||
      typeof city !== "string" ||
      typeof description !== "string"
    ) {
      return res.status(400).json({
        message: "Données du profil invalides"
      });
    }

    const cleanName = name.trim();
    const cleanEmail = email.trim().toLowerCase();
    const cleanCity = city.trim();
    const cleanDescription = description.trim();

    if (
      !cleanName ||
      cleanName.length > 100 ||
      cleanCity.length > 100 ||
      cleanDescription.length > 1000 ||
      !validator.isEmail(cleanEmail)
    ) {
      return res.status(400).json({
        message: "Vérifie les informations saisies"
      });
    }

    const existingUser = await findUserByEmail(cleanEmail);

    if (
      existingUser &&
      String(existingUser.id) !== String(req.user.id)
    ) {
      return res.status(409).json({
        message: "Cet email est déjà utilisé"
      });
    }

    let avatarUrl = user.avatar_url;

    if (req.file) {
      const extensions = {
        "image/jpeg": "jpg",
        "image/png": "png",
        "image/webp": "webp"
      };

      const extension = extensions[req.file.mimetype];

      const filePath =
        `${req.user.id}/${crypto.randomUUID()}.${extension}`;

      const { error } = await supabase.storage
        .from("avatars")
        .upload(filePath, req.file.buffer, {
          contentType: req.file.mimetype,
          upsert: false
        });

      if (error) {
        console.error("ERREUR STORAGE :", {
          message: error.message,
          status: error.status,
          statusCode: error.statusCode,
          code: error.code
        });
        throw error;
      }

      const { data } = supabase.storage
        .from("avatars")
        .getPublicUrl(filePath);

      avatarUrl = data.publicUrl;
    }

    const updatedUser = await updateUser(req.user.id, {
      name: cleanName,
      email: cleanEmail,
      city: cleanCity,
      description: cleanDescription,
      avatar_url: avatarUrl
    });

    return res.status(200).json({
      message: "Profil modifié avec succès",
      user: {
        id: updatedUser.id,
        name: updatedUser.username,
        email: updatedUser.email,
        role: updatedUser.role,
        city: updatedUser.city,
        description: updatedUser.description,
        avatar_url: updatedUser.avatar_url
      }
    });

  } catch (error) {
    console.error("ERREUR PROFIL :", error);

    if (error.code === "23505") {
      return res.status(409).json({
        message: "Cet email est déjà utilisé"
      });
    }

    return res.status(500).json({
      message: "Erreur lors de la modification du profil"
    });
  }
};


module.exports = { register, generateToken, login, getProfile, updateProfile }