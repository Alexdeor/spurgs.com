import { hash } from 'bcryptjs';
import { prisma } from '@/lib/prisma'; 
import { NextApiRequest, NextApiResponse } from 'next';
type RegisterBody = { email: string; username: string; password: string };

export default async function handler(req: NextApiRequest, res: NextApiResponse){
    if(req.method !== 'POST') return res.status(405).end(); 
const { email, username, password} = req.body as RegisterBody; 

//Check for the request and return error if missing the data's field
if (!email || !username || !password) return res.status(400).json({message: "Missing fields"});

// Check the user's email through my DB
const existingUser = await prisma.user.findUnique({
    where: {email}
});

if(existingUser) return res.status(400).json({message:'User already exists'});

//Hash password before storing it
const hashedPassword = await hash(password, 10); 

//Create an object user data to store it in my user's table 
const user = await prisma.user.create({
    data: {
        email,
        username,
        password: hashedPassword,
    },
});

res.status(201).json({message: 'User Created', user: {id: user.id, email: user.email}});



}