import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';


const EMAIL_TOKEN_EXPIRATION_MINUTES = 10;
const AUTHENTICATION_EXPIRATION_HOURS = 12
const JWT_SECRET = "secret"

const router = Router();
const prisma = new PrismaClient();

// gemerate a random 6 digit number for email verification
function generateEmailToken(): string {
    //generate token
    return Math.floor(100000 + Math.random() * 900000).toString();
}

function generateAuthToken (tokenId: number): string {
    const jwtPayload = {
        tokenId,
    }

    return jwt.sign(jwtPayload, JWT_SECRET, {
        algorithm: 'HS256',
        noTimestamp: true,
        // expiresIn: `${AUTHENTICATION_EXPIRATION_HOURS}h`,  since we manage expiration on database layer, we don't need this
    });
}

 //endpoint for login & signup where new user will be created user does not exist and generate the token to be sent via mail or SMS.
 router.post('/login', async (req, res) => {
    const { email } = req.body;

    //generate token
    const emailtoken = generateEmailToken();
    
    const expiration = new Date(new Date().getTime() + EMAIL_TOKEN_EXPIRATION_MINUTES * 60000);


try {
    const createdToken = await prisma.token.create({
        data: {
            type: 'EMAIL', 
            emailToken: emailtoken,
            expires: expiration,
            user: {
                connectOrCreate: {
                    where: { email },
                    create: { email},
                    }
        },
    },
},
);

// console.log(createdToken);
res.sendStatus(200);
} 
catch (error) {
    console.log(error);
    res.sendStatus(500).json({error: 'Something went wrong'});
}
});

//Validate the token and generate a long-lived JWT to be used for subsequent requests
router.post('/authenticate', async (req, res) => {

    const { email, emailToken } = req.body;
    

    const dbEmailToken = await prisma.token.findUnique({
        where: {
            emailToken,
        },
        include: {
            user: true,
        },
    });

    //console.log(dbEmailToken);

    if (!dbEmailToken || !dbEmailToken.valid) {
        return res.status(401);
        
    }

    if (dbEmailToken.expires < new Date()) {
        return res.status(401).json({error: 'Token expired'});  
    }

    if (dbEmailToken.user.email !== email) {
        return res.status(401).json({error: 'Email does not match'});
    }

    // const expiration = new Date(new Date().getTime() + AUTHENTICATION_EXPIRATION_HOURS * 60 * 60 * 1000);

   // generate an API token
  const expiration = new Date(
    new Date().getTime() + AUTHENTICATION_EXPIRATION_HOURS * 60 * 60 * 1000
  );
  const apiToken = await prisma.token.create({
    data: {
      type: 'API',
      expires: expiration,
      user: {
        connect: {
          email,
        },
      },
    },
  });

  // Invalidate the email
  await prisma.token.update({
    where: { id: dbEmailToken.id },
    data: { valid: false },
  });

  // generate the JWT token
    const authToken = generateAuthToken(apiToken.id);

    res.json({ authToken });
    // res.sendStatus(200);


});



export default router;